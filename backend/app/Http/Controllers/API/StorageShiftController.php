<?php

namespace App\Http\Controllers\API;

use App\Storage_shift;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class StorageShiftController extends Controller
{
    public function index()
    {
        return response()->json(Storage_shift::all());
    }

    public function store(Request $request)
    {
        try {
            $this->validate($request,[
                'component_id'=> 'required',
                'delivery_id'=> 'required',
                'number'=> 'required'
            ]);
            $storage_sift = new Storage_shift();
            $storage_sift->component_id=$request->component_id;
            $storage_sift->delivery_id=$request->delivery_id;
            $storage_sift->number=$request->number;

            $storage_sift->save();

            if ($storage_sift) {
                return response()->success($storage_sift, 200);
            } else {
                return response()->error($storage_sift, 400);
            }
        } catch (Exception $e) {
            Debugbar::addThrowable($e);
            return response()->exception($e->getMessage(), $e->getCode());
        }
    }

    public function storeRange(Request $request){
        $storage_shifts=$request->all();
        $storge_shiftsArray=array();
        foreach ($storage_shifts as $storage_shift){
            $temp = new Storage_shift();
            $temp->component_id=$storage_shift->component_id;
            $temp->delivery_id=$storage_shift->delivery_id;
            $temp->number=$storage_shift->number;
            $temp->save();
            array_push($storge_shiftsArray,$temp);
        }

        return response()->json($storge_shiftsArray,200);
    }
}
