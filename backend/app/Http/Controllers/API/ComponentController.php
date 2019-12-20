<?php

namespace App\Http\Controllers\API;

use App\Component;
use App\Delivery;
use App\Storage;
use App\Storage_shift;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ComponentController extends Controller
{
    function index()
    {
        $components=Component::all();
        foreach ($components as $component)
        {
            $entries=$component->Entries();
            foreach ($entries as $entry)
            {
                $component['number']+=$entry->number;
            }
        }
        return response()->json($components);
    }

    public  function  store(Request $request)
    {
        try {
            $this->validate($request, [
                'name'=> 'required' ,
                'price'=> 'required',
                'part_number'=> 'required',
                'state'=> 'required',
                'VP_unit'=> 'required',
                'description'=> 'required',
                'category_id'=> 'required',]);
            $component = new Component();
            $component->name=$request->name;
            $component->price=$request->price;
            $component->part_number=$request->part_number;
            $component->VP_unit=$request->VP_unit;
            $component->description=$request->description;
            $component->category_id=$request->category_id;
            $component->state=$request->state;

            $component->save();

            if ($component) {
                return response()->success($component, 200);
            } else {
                return response()->error($component, 400);
            }
        } catch (Exception $e) {
            Debugbar::addThrowable($e);
            return response()->exception($e->getMessage(), $e->getCode());
        }
    }

    public function destroy($id)
    {
        $component = Component::findOrfail($id);

        if($component->delete())
            return response()->json([],202);
        return response()->json(["msg"=>"an error occured"],404);
    }

    public function show($id)
    {
        $component=Component::find($id);

        $entries=$component->Entries();
        foreach ($entries as $entry)
        {
            $entry['storage']=$entry->Storage()->first()->name;
            $entry['user']=$entry->User()->first()->name;
            $component['number']+=$entry->number;
        }
        $component['entries']=$entries;
        $entries=$entries->groupBy('storage');
        $componentAtStorages=array();
        foreach ($entries as $storage_entries) {
            $temp['count']=0;
            foreach ($storage_entries as $entry)
            {
                $temp['storage']=$entry->storage;
                $temp['count']+=$entry->number;
                $temp['storage_id']=$entry->storage_id;

            }
            array_push($componentAtStorages, $temp);
        }
        $shifts=$component->StorageShifts();
        foreach ($shifts as $shift)
        {

            $shift['delivery']=$shift->Delivery()->first();
            $shift['delivery_date']=$shift['delivery']->date;
            $shift['deliver_to']=$shift['delivery']->ToStorage()->first()->name;
            $shift['deliver_from']=$shift['delivery']->FromStorage()->first()->name;
            $shift['deliver_user']=$shift['delivery']->User()->first()->name;
            if(!collect($componentAtStorages)->contains('storage_id',$shift['delivery']->to_id))
            {
                $temp2['storage']=$shift['delivery']->ToStorage()->first()->name;
                $temp2['count']=$shift->number;
                $temp2['storage_id']=$shift['delivery']->to_id;
                array_push($componentAtStorages, $temp2);
            }
            else{
                for ($i=0; $i<count($componentAtStorages);$i++)
                {
                    if ($shift['delivery']->to_id == $componentAtStorages[$i]['storage_id']) {
                        $componentAtStorages[$i]['count'] += $shift->number;
                    }
                }
            }

            for ($i=0; $i<count($componentAtStorages);$i++)
            {

                if ($shift['delivery']->from_id == $componentAtStorages[$i]['storage_id']) {
                    $componentAtStorages[$i]['count'] -= $shift->number;
                }
            }
        }
        $component['storages']=$componentAtStorages;
        $component['shifts']=$shifts->toArray();
        $component['category']=$component->Category()->first()->name;
        return response()->json($component);
    }
}
