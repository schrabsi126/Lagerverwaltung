<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Component extends Model
{
    protected $fillable=['name,price,part_number,state,VP_unit,descripton'];

    public function Category()
    {
        return $this->belongsTo('App\Category');
    }

    public function Entries()
    {
        return $this->hasMany('App\Entry')->get();
    }
}
