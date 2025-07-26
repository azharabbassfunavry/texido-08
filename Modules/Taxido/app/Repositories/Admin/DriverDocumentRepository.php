<?php

namespace Modules\Taxido\Repositories\Admin;

use Exception;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use App\Http\Traits\FireStoreTrait;
use Maatwebsite\Excel\Facades\Excel;
use App\Exceptions\ExceptionHandler;
use Illuminate\Support\Facades\Http;
use Modules\Taxido\Models\Document;
use Modules\Taxido\Models\DriverDocument;
use Modules\Taxido\Enums\DocumentStatusEnum;
use Modules\Taxido\Events\DriverVerificationEvent;
use Prettus\Repository\Eloquent\BaseRepository;
use Modules\Taxido\Imports\DriverDocumentImport;
use Modules\Taxido\Exports\DriverDocumentsExport;
use Modules\Taxido\Notifications\NotifyDriverDocStatusNotification;

class DriverDocumentRepository extends BaseRepository
{
    use FireStoreTrait;

    function model()
    {
        return DriverDocument::class;
    }

    public function index($driverDocumentTable)
    {
        if (request()['action']) {
            return redirect()->back();
        }

        return view('taxido::admin.driver-document.index', ['tableConfig' => $driverDocumentTable]);
    }

    public function store($request)
    {
        DB::beginTransaction();

        try {
            $driverDocument = $this->model->create([
                'driver_id' => $request->driver_id,
                'document_id' => $request->document_id,
                'expired_at' => Carbon::createFromFormat('m/d/Y', $request->expired_at)->format('Y-m-d'),
                'document_image_id' => $request->document_image_id,
                'status' => $request->status,
            ]);

            DB::commit();

            if ($request->has('save')) {
                return to_route('admin.driver-document.edit', ['driver_document' => $driverDocument->id])
                    ->with('success', __('taxido::static.driver_documents.create_successfully'));
            }

            return to_route('admin.driver-document.index')->with('success', __('taxido::static.driver_documents.create_successfully'));

        } catch (Exception $e) {

            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function update($request, $id)
    {
        DB::beginTransaction();
        try {
            $driverDocument = $this->model->findOrFail($id);
            $oldStatus = $driverDocument->status;
            $driverDocument->update($request);
            if ($oldStatus !== $request['status']) {
                $driver = $driverDocument->driver;
                if ($driver) {
                    $driver->notify(new NotifyDriverDocStatusNotification($driverDocument, $request['status']));
                }
            }

            DB::commit();
            $driverDocument = $driverDocument->fresh();
            $isVerified = 0;
            if($this->isDriverAllDocumentsApproved($driverDocument?->driver_id)) {
                $isVerified = 1;
            }
            $data = [
                'is_verified' => $isVerified
            ];

            $this->fireStoreUpdateDocument('driverTrack', $driverDocument?->driver_id, $data, true);
            $driver = $driverDocument?->driver;
            $driver->update([
                'is_verified' => $isVerified,
            ]);
            if ($driver) {
                event(new DriverVerificationEvent($driver, $isVerified ? DocumentStatusEnum::APPROVED : DocumentStatusEnum::REJECTED));
            }

            if (array_key_exists('save', $request)) {
                return to_route('admin.driver-document.edit', ['driver_document' => $driverDocument->id])?->with('success', __('taxido::static.driver_documents.update_successfully'));
            }

            return to_route('admin.driver-document.index')->with('success', __('taxido::static.driver_documents.update_successfully'));

        } catch (Exception $e) {

            DB::rollBack();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function isDriverAllDocumentsApproved($driver_id)
    {
        $totalReqDocument = Document::where('is_required', true)?->whereNull('deleted_at')?->count();
        $totalDriverDocuments = $this->model->where('driver_id', $driver_id)?->whereNull('deleted_at')?->count();
        if($totalDriverDocuments) {
            if($totalReqDocument) {
                $totalReqApprovedDocuments = $this->model->whereHas('document', function ($document)  {
                    $document->where('is_required', true);
                })->where('driver_id', $driver_id)?->whereNull('deleted_at')
                ?->where('status', DocumentStatusEnum::APPROVED)
                ?->count();
            }

            if(!$totalReqDocument) {
                $totalReqApprovedDocuments = $this->model->where('driver_id', $driver_id)?->whereNull('deleted_at')
                ?->where('status', DocumentStatusEnum::APPROVED)
                ?->count();
            }

            if($totalReqApprovedDocuments) {
                if($totalReqDocument > 0) {
                    return ($totalReqDocument == $totalReqApprovedDocuments);
                }

                if ($totalReqDocument == 0) {
                    return ($totalDriverDocuments == $totalReqApprovedDocuments);
                }
            }
        }

        return false;
    }

    public function destroy($id)
    {
        try {
            $driverDocument = $this->model->findOrFail($id);
            $driverDocument->destroy($id);

            return redirect()->route('admin.driver-document.index')->with('success', __('taxido::static.driver_documents.delete_successfully'));
        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function status($id, $status)
    {
        try {

            $driverDocument = $this->model->findOrFail($id);
            $driverDocument->update(['status' => $status]);

            return json_encode(["resp" => $driverDocument]);
        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function restore($id)
    {
        try {

            $driverDocument = $this->model->onlyTrashed()->findOrFail($id);
            $driverDocument->restore();

            return redirect()->back()->with('success', __('taxido::static.driver_documents.restore_successfully'));
        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function forceDelete($id)
    {
        try {

            $driverDocument = $this->model->onlyTrashed()->findOrFail($id);
            $driverDocument->forceDelete();

            return redirect()->back()->with('success', __('taxido::static.driver_documents.permanent_delete_successfully'));
        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function export($request)
    {
        try {

            $format = $request->get('format', 'csv');
            switch ($format) {
                case 'excel':
                    return $this->exportExcel();
                case 'csv':
                default:
                    return $this->exportCsv();
            }

        } catch (Exception $e) {
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public  function exportExcel()
    {
        return Excel::download(new DriverDocumentsExport, 'driver_documents.xlsx');
    }

    public function exportCsv()
    {
        return Excel::download(new DriverDocumentsExport, 'driver_documents.csv');
    }

    public function import($request)
    {
        try {
            $activeTab = $request->input('active_tab');

            $tempFile = null;

            if ($activeTab === 'direct-link') {

                $googleSheetUrl = $request->input('google_sheet_url');

                if (!$googleSheetUrl) {
                    throw new Exception(__('static.import.no_url_provided'));
                }

                if (!filter_var($googleSheetUrl, FILTER_VALIDATE_URL)) {
                    throw new Exception(__('static.import.invalid_url'));
                }

                $parsedUrl = parse_url($googleSheetUrl);
                preg_match('/\/d\/([a-zA-Z0-9-_]+)/', $parsedUrl['path'], $matches);
                $sheetId = $matches[1] ?? null;
                parse_str($parsedUrl['query'] ?? '', $queryParams);
                $gid = $queryParams['gid'] ?? 0;

                if (!$sheetId) {
                    throw new Exception(__('static.import.invalid_sheet_id'));
                }

                $csvUrl = "https://docs.google.com/spreadsheets/d/{$sheetId}/export?format=csv&gid={$gid}";

                $response = Http::get($csvUrl);

                if (!$response->ok()) {
                    throw new Exception(__('static.import.failed_to_fetch_csv'));
                }

                $tempFile = tempnam(sys_get_temp_dir(), 'google_sheet_') . '.csv';
                file_put_contents($tempFile, $response->body());
            } elseif ($activeTab === 'local-file') {
                $file = $request->file('fileImport');
                if (!$file) {
                    throw new Exception(__('static.import.no_file_uploaded'));
                }

                if ($file->getClientOriginalExtension() != 'csv') {
                    throw new Exception(__('static.import.csv_file_allow'));
                }


                $tempFile = $file->getPathname();
            } else {
                throw new Exception(__('static.import.no_valid_input'));
            }

            Excel::import(new DriverDocumentImport(), $tempFile);

            if ($activeTab === 'google_sheet' && file_exists($tempFile)) {
                unlink($tempFile);
            }

            return redirect()->back()->with('success', __('static.import.csv_file_import'));
        } catch (Exception $e) {
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function updateStatus($request, $id)
    {
        DB::beginTransaction();
        try {
            $driverDocument = $this->model->findOrFail($id);
            $oldStatus = $driverDocument->status;
            
            $driverDocument->update([
                'status' => $request['status']
            ]);

            if ($oldStatus !== $request['status']) {
                $driver = $driverDocument->driver;
                if ($driver) {
                    $driver->notify(new NotifyDriverDocStatusNotification($driverDocument, $request['status']));
                }
            }

            DB::commit();
            $document = $driverDocument->fresh();
            $isVerified = 0;
            
            if ($this->isDriverAllDocumentsApproved($document?->driver_id)) {
                $isVerified = 1;
            }

            $data = [
                'is_verified' => $isVerified
            ];

            $this->fireStoreUpdateDocument('driverTrack', $document?->driver_id, $data, true);
            
            $driver = $document?->driver;
            $driver->update([
                'is_verified' => $isVerified,
            ]);

            if ($driver) {
                event(new DriverVerificationEvent($driver, $isVerified ? DocumentStatusEnum::APPROVED : DocumentStatusEnum::REJECTED));
            }

            return redirect()->back()->with('success', __('taxido::static.documents.status_update_successfully'));

        } catch (Exception $e) {
            DB::rollBack();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }
}


