<?php

namespace App\Http\Controllers\API;

use App\Delivery;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class DeliveryController extends Controller
{
    public function index()
    {
        return response()->json(Delivery::all());
    }

    public function store(Request $request)
    {
        try {
            $this->validate($request,[
                'user_id'=> 'required',
                'from_id'=> 'required',
                'to_id'=> 'required',
                'date'=> 'required',
            ]);
            $delivery = new Delivery();
            $delivery->user_id=$request->user_id;
            $delivery->from_id=$request->from_id;
            $delivery->to_id=$request->to_id;
            $delivery->date=$request->date;

            $delivery->save();

            if ($delivery) {
                return response()->success($delivery, 200);
            } else {
                return response()->error($delivery, 400);
            }
        } catch (Exception $e) {
            Debugbar::addThrowable($e);
            return response()->exception($e->getMessage(), $e->getCode());
        }
    }
}
