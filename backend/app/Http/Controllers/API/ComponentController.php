<?php

namespace App\Http\Controllers\API;

use App\Component;
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
}
