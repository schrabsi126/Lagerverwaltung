<?php

namespace App\Http\Controllers\API;

use App\Entry;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class EntryController extends Controller
{
    public function index()
    {
        return response()->json(Entry::all());
    }

    public function store(Request $request)
    {
        try {
            $this->validate($request,[
                'number' => 'required',
                'user_id'=> 'required',
                'storage_id'=> 'required',
                'component_id'=> 'required',
                'date'=> 'required',
            ]);
            $entry = new Entry();
            $entry->user_id=$request->user_id;
            $entry->storage_id=$request->storage_id;
            $entry->component_id=$request->component_id;
            $entry->number=$request->number;
            $entry->date=$request->date;

            $entry->save();

            if ($entry) {
                return response()->success($entry, 200);
            } else {
                return response()->error($entry, 400);
            }
        } catch (Exception $e) {
            Debugbar::addThrowable($e);
            return response()->exception($e->getMessage(), $e->getCode());
        }
    }
}
