<?php

namespace Modules\Taxido\Http\Controllers\Api;

use Exception;
use Carbon\Carbon;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use App\Mail\ForgotPassword;
use Kreait\Firebase\Factory;
use Modules\Taxido\Models\Rider;
use App\Http\Traits\MessageTrait;
use Modules\Taxido\Enums\RoleEnum;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Exceptions\ExceptionHandler;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Modules\Taxido\Emails\VerifyEmail;
use Illuminate\Support\Facades\Validator;
use Modules\Taxido\Http\Requests\Api\SocialLoginRequest;
use Modules\Taxido\Http\Resources\Riders\SelfResource;

class AuthController extends Controller
{
    use MessageTrait;

    public function self()
    {
        try {

            $rider_id = getCurrentUserId();
            $rider = Rider::without(['reviews'])?->findOrFail($rider_id);
            $rider?->setAppends([
                'total_active_rides',
            ]);

            return new SelfResource($rider);

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function login(Request $request)
    {
        try {

            $req = $request->validate([
                'email_or_phone' => 'required|string',
                'country_code' => 'nullable|required_if:email_or_phone,phone|string',
            ]);

            return filter_var($req['email_or_phone'], FILTER_VALIDATE_EMAIL)
                ? $this->sendEmailToken($req['email_or_phone'])
                : $this->sendPhoneToken($req['country_code'] ?? null, $req['email_or_phone']);

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }


    private function sendEmailToken($email)
    {
        $token = $this->generateToken(null, null, $email);

        if (!isDemoMode()) {
            Mail::to($email)->queue(new VerifyEmail($token));
        }

        return response()->json([
            'message' => __('OTP sent successfully to your email!'),
            'success' => true
        ], 200);
    }

    private function sendPhoneToken($country_code, $phone)
    {
        if (! $country_code) {
            throw new Exception('Country code is required for login as a phone.', 422);
        }

        $token = $this->generateToken($country_code, $phone);
        if(!isDemoMode()) {
            sendSMS('+' . $country_code . $phone, 'Your OTP is ' . $token);
        }
        return response()->json(['message' => __('OTP sent successfully to your phone!'), 'success' => true], 200);
    }

    public function generateToken($country_code = null, $phone = null, $email = null)
    {
        $token = rand(111111, 999999);

        if (isDemoMode()) {
            $token = 123456;
        }

        DB::table('auth_tokens')->insert([
            'token' => $token,
            'phone' => '+' . $country_code . $phone,
            'email' => $email,
            'created_at' => Carbon::now()
        ]);

        return $token;
    }

    public function forgotPassword(Request $request)
    {
        try {

            $validator = Validator::make($request->all(), [
                'email' => 'required|email|exists:users,email,deleted_at,NULL|string',
            ]);

            if ($validator->fails()) {
                throw new Exception($validator->messages()->first(), 422);
            }

            $token = rand(11111, 99999);
            if (!isDemoMode()) {
                $token = 123456;
            }
            DB::table('password_resets')->insert([
                'email' => $request->email,
                'token' => $token,
                'created_at' => Carbon::now()
            ]);

            if(!isDemoMode()) {
                Mail::to($request->email)->send(new ForgotPassword($token));
            }

            return [
                'message' => __('auth.email_verification_sent'),
                'success' => true
            ];
        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }


    public function verifyRiderToken(Request $request)
    {
        try {

            $validator = Validator::make($request->all(), [
                'token' => 'required|string',
                'email_or_phone' => 'required|string',
                'country_code' => 'nullable|required_if:email_or_phone,phone|string',
                'fcm_token' => 'nullable|string',
            ]);

            if ($validator->fails()) {
                throw new Exception($validator->messages()->first(), 422);
            }

            $isEmail = filter_var($request->email_or_phone, FILTER_VALIDATE_EMAIL);
            $authToken = DB::table('auth_tokens')->where('token', $request->token)?->where('created_at', '>', Carbon::now()->subHours(1));
            if($request->country_code && !$isEmail) {
                if(str_contains($request->country_code, '+')) {
                    $country_code = str_replace('+', '', $request->country_code) ;
                } else {
                    $country_code = $request->country_code;
                }

                $verify_otp = $authToken->where('phone', '+' .$country_code.$request->email_or_phone)?->first();

            } elseif($isEmail) {

                $verify_otp = $authToken->where('email', $request->email_or_phone)?->first();
            } else {
                if (empty($request->country_code) && !$isEmail) {
                    throw new Exception(__('Country code is required for phone login'), 422);
                }

                throw new Exception(__('Bad Request'), 400);
            }

            if (!$verify_otp) {
                throw new Exception(__('Invalid token'), 400);
            }

            $rider = Rider::whereNull('deleted_at');
            if($isEmail) {
                $rider = $rider->where('email', $request->email_or_phone)?->first();
            } else {
                $rider = $rider->where('phone', $request->email_or_phone)?->first();
                if($rider) {
                    if(str_contains($rider->country_code, '+')) {
                        $riderCountryCode = str_replace('+', '', $rider->country_code);
                    } else {
                        $riderCountryCode = $rider->country_code;
                    }

                    if($riderCountryCode == $country_code) {
                        if ($rider) {
                            if ($rider->role->name != RoleEnum::RIDER) {
                                throw new Exception(__('Only Riders are allowed'), 403);
                            }

                            if (!$rider->status) {
                                throw new Exception(__('Account is disabled'), 403);
                            }

                            $token = $rider->createToken('auth_token')->plainTextToken;
                            $rider->tokens()->update([
                                'role_type' => $rider->getRoleNames()->first(),
                            ]);

                            $rider->update([
                                'fcm_token' => $request->fcm_token,
                            ]);

                            return response()->json([
                                'access_token' => $token,
                                'is_registered' => true,
                                'success' => true,
                            ], 200);
                        }
                    }
                }
            }

            return response()->json([
                'message' => __('Token verified successfully'),
                'is_registered' => false,
                'success' => true,
            ], 200);


        } catch (Exception $e) {
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function socialLogin(SocialLoginRequest $request)
    {
        $loginMethod = $request->input('login_type');
        $user = (object) $request->input('user');

        DB::beginTransaction();
        try {
            $rider = $this->createOrGetUser($loginMethod, $user);
            if ($request->fcm_token) {
                $rider->fcm_token = $request->fcm_token;
                $rider->save();
            }

            DB::commit();

            if ($rider->status) {
                $token = $rider->createToken('auth_token')->plainTextToken;
                $rider->tokens()->update([
                    'role_type' => $rider->getRoleNames()->first(),
                ]);

                return response()->json([
                    'success' => true,
                    'access_token' => $token,
                ], 200);
            }

            throw new Exception(__('auth.user_deactivated'), 403);
        } catch (Exception $e) {
            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    private function createOrGetUser($loginMethod, $user)
    {
        if ($loginMethod === 'phone') {
            $phone = $user->phone;
            $code = $user->code;

            $existingRider = Rider::where('phone', $phone)->whereNull('deleted_at')->first();

            if ($existingRider) {
                return $existingRider;
            }

            $newRider = Rider::create([
                'status' => true,
                'phone' => $phone,
                'country_code' => $code,
                'name' => $user->name ?? null,
                'email' => $user->email ?? null,
                'referral_code' => getReferralCodeByName($user->name ?? 'Rider'),
            ]);

        } else {
            $email = $user->email;
            $name = $user->name;

            $existingRider = Rider::where('email', $email)->whereNull('deleted_at')->first();

            if ($existingRider) {
                return $existingRider;
            }

            $newRider = Rider::create([
                'status' => true,
                'email' => $email ?? null,
                'name' => $name ?? null,
                'referral_code' => getReferralCodeByName($name ?? 'Rider'),
            ]);
        }

        $riderRole = Role::where('name', RoleEnum::RIDER)->first();
        if ($riderRole) {
            $newRider->assignRole($riderRole);
        }

        if (riderWalletIsEnable()) {
            $newRider->wallet()->create();
        }

        return $newRider;
    }

    public function verifyFirebaseAuthToken(Request $request)
    {
        DB::beginTransaction();
        try {

            $validator = Validator::make($request->all(), [
                'country_code' => 'required',
                'phone' => 'required|min:6|max:15',
                'firebase_token' => 'nullable|string',
            ]);

            if ($validator->fails()) {
                throw new Exception($validator->messages()->first(), 422);
            }

            $firebaseToken = $request->firebase_token;
            $firebaseAuth = (new Factory)->withServiceAccount(config('services.firebase.credentials'))?->createAuth();
            $verifiedToken = $firebaseAuth->verifyIdToken($firebaseToken);
            $rider = Rider::where('phone', $request->phone)?->where('country_code', $request->country_code)?->whereNull('deleted_at')?->first();
            if($verifiedToken){
                if(!$rider) {
                    return response()->json([
                        'is_registered' => false,
                        'success' => true,
                    ], 200);
                }

                $token = $rider->createToken('auth_token')?->plainTextToken;
                return response()->json([
                    'access_token'  => $token,
                    'is_registered' => true,
                    'success' => true,
                ], 200);
            }

            throw new Exception("Token Not found", 422);

        } catch (Exception $e) {

            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function riderRegister(Request $request)
    {
        DB::beginTransaction();
        try {

            $validator = Validator::make($request->all(), [
                'email' => 'required|string|email|max:255|unique:users,email,NULL,id,deleted_at,NULL',
                'password' => 'nullable|string|min:8|confirmed',
                'password_confirmation' => 'nullable',
                'country_code' => 'required',
                'phone' => 'required|min:6|max:15|unique:users,phone,NULL,id,deleted_at,NULL',
                'referral_code' => 'nullable|string|exists:users,referral_code,deleted_at,NULL',
            ]);

            if ($validator->fails()) {
                throw new Exception($validator->messages()->first(), 422);
            }

            $rider = Rider::create([
                'name' => $request->name,
                'email' => $request->email,
                'country_code' => $request->country_code,
                'phone' => (string) $request->phone,
                'fcm_token' => $request->fcm_token,
                'password' => Hash::make($request->password),
                'referral_code' => getReferralCodeByName($request->name)
            ]);

            $rider->assignRole(RoleEnum::RIDER);
            if (riderWalletIsEnable()) {
                $rider->wallet()->create();
                $rider->wallet;
            }

            DB::commit();
            if ($request->referral_code) {
                $referred_by_id = $this->getReferredRiderId($request->referral_code);
                if ($referred_by_id) {
                    $rider->referred_by_id = $referred_by_id;
                    $rider->save();
                }
            }

            $token = $rider->createToken('auth_token')->plainTextToken;
            $rider->tokens()->update([
                'role_type' => $rider->getRoleNames()->first(),
            ]);

            return [
                'access_token' => $token,
                'success' => true,
            ];
        } catch (Exception $e) {

            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function updatePassword(Request $request)
    {
        DB::beginTransaction();
        try {

            $validator = Validator::make($request->all(), [
                'token' => 'required',
                'email' => 'required|email|max:255|exists:users,email,deleted_at,NULL|strings',
                'password' => 'required|min:8|confirmed',
                'password_confirmation' => 'required'
            ]);

            if ($validator->fails()) {
                throw new Exception($validator->messages()->first(), 422);
            }

            $user = DB::table('password_resets')
                ->where('token', $request->token)
                ->where('email', $request->email)
                ->where('created_at', '>', Carbon::now()->subHours(1))
                ->first();

            if (!$user) {
                throw new Exception(__('auth.invalid_email_token'), 400);
            }

            User::where('email', $request->email)
                ->update(['password' => Hash::make($request->password)]);

            DB::table('password_resets')->where('email', $request->email)->delete();
            DB::commit();

            return [
                'message' => __('auth.password_changed'),
                'success' => true
            ];
        } catch (Exception $e) {

            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function getReferredRiderId($referral_code)
    {
        return Rider::where('referral_code', $referral_code)?->whereNull('deleted_at')?->pluck('id');
    }

    public function deleteAccount()
    {
        DB::beginTransaction();
        try{

            $rider = Rider::findOrFail(auth('sanctum')->user()->id);
            $rider->forceDelete(auth('sanctum')->user()->id);
            DB::commit();
            return [
                'message' => __('static.users.user_delete'),
            ];

        } catch(Exception $e) {

            DB::rollback();
            throw new ExceptionHandler($e->getMessage(),$e->getCode());
        }
    }
}
