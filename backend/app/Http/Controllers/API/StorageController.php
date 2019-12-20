<?php

namespace App\Http\Controllers\API;

use App\Component;
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
            $component_id='';
            $component='';
            foreach ($entry as $com)
            {
                $sum+=$com->number;
                $component_id=$com->component_id;
                $component=$com->Component();
            }
            $temp['sum']=$sum;
            $temp['component_id']=$component_id;
            $temp['component']=$component->first();
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
            $deliveriesfrom=$storage->FromStorage();
            foreach ($deliveriesfrom as $delivery)
            {
                $shiftsfrom=$delivery->StorageShifts();
                foreach ($shiftsfrom as $shift)
                {
                    if($temp['component_id']==$shift['component_id'])
                    {
                        $temp['sum']-=$shift['number'];
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
                if(!collect($callculations)->contains('component_id', $shift->component_id))
                {
                    $temp['sum']=$shift['number'];
                    $temp['component_id']=$shift['component_id'];
                    $temp['component']= $shift->Component()->first();
                    $deliveriesfrom=$storage->FromStorage();
                    foreach ($deliveriesfrom as $delivery)
                    {
                        $shiftsfrom=$delivery->StorageShifts();
                        foreach ($shiftsfrom as $shiftform)
                        {
                            if($temp['component_id']==$shiftform['component_id'])
                            {
                                $temp['sum']-=$shiftform['number'];
                            }
                        }
                    }
                    array_push($callculations, $temp);
                }
            }
        }
        $storage['components']=collect($callculations);
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
