<?php

namespace App\Http\Controllers\API;

use App\Entry;
use App\Storage;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class StorageController extends Controller
{
    public function index()
    {
        return response()->json(Storage::all());
    }

    public function show($id)
    {
        $storage=Storage::find($id);
        $entries=$storage->Entries()->groupby('component_id');
        $callculations=array();
        foreach ($entries as $entry)
        {
            $sum=0;
            $component='';
            foreach ($entry as $com)
            {
                $sum+=$com->number;
                $component=$com->component_id;
            }
            $temp['sum']=$sum;
            $temp['component_id']=$component;
            $deliveries=$storage->ToStorage();
            foreach ($deliveries as $delivery)
            {
                $shifts=$delivery->StorageShifts();
                foreach ($shifts as $shift)
                {
                        if($temp['component_id']==$shift['component_id'])
                        {
                            $temp['sum']+=$shift['number'];
                        }
                }
            }
            array_push($callculations,$temp);
        }
        $deliveries=$storage->ToStorage();
        foreach ($deliveries as $delivery)
        {
            $shifts=$delivery->StorageShifts();
            foreach ($shifts as $shift)
            {

            }
        }
        array_push($callculations,$temp);

        $storage['entries']=$callculations;
        return response()->json($storage);
    }

    public function store(Request $request)
    {
        try {
            $this->validate($request,[
                'name' => 'required',
                'location'=> 'required'
            ]);
            $storage = new Storage();
            $storage->name=$request->name;
            $storage->location=$request->location;
            $storage->save();

            if ($storage) {
                return response()->success($storage, 200);
            } else {
                return response()->error($storage, 400);
            }
        } catch (Exception $e) {
            Debugbar::addThrowable($e);
            return response()->exception($e->getMessage(), $e->getCode());
        }
    }
}
