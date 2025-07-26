<?php

namespace Modules\Taxido\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Modules\Taxido\Repositories\Front\RideRepository;

class RideController extends Controller
{
    public $repository;

    public function __construct(RideRepository $repository)
    {
        $this->repository = $repository;
    }

    public function create()
    {
        return view('taxido::front.ride.create');
    }

    public function show(Request $request)
    {
        return $this->repository->show($request);
    }

    public function history()
    {
        return $this->repository->history();
    }

    public function store(Request $request)
    {

    }

    public function getInvoice($invoice_id, Request $request)
    {
        return $this->repository->getInvoice($request->merge(['invoice_id' => $invoice_id]));
    }
}
