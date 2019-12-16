<?php

namespace App\Http\Controllers\API;

use App\Storage;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class StorageController extends Controller
{
    public function index()
    {
        return response()->json(Storage::all());
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
