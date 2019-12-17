<?php

namespace App\Http\Controllers\API;

use App\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CategoryController extends Controller
{
    public function index()
    {
        return response()->json(Category::all());
    }

    public function store(Request $request)
    {
        try {
            $this->validate($request,[
                'name' => 'required',
                'short_name'=> 'required'
            ]);
            $category = new Category();
            $category->name=$request->name;
            $category->short_name=$request->short_name;
            $category->save();

            if ($category) {
                return response()->success($category, 200);
            } else {
                return response()->error($category, 400);
            }
        } catch (Exception $e) {
            Debugbar::addThrowable($e);
            return response()->exception($e->getMessage(), $e->getCode());
        }
    }
}
