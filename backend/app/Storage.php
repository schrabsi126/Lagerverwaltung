<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Storage extends Model
{
    protected $fillable=['name,location'];

    public function Entries()
    {
        return $this->hasMany('App\Entry')->get();
    }

    public function ToStorage()
    {
        return $this->hasMany('App\Delivery','to_id')->get();
    }

    public function FromStorage()
    {
        return $this->hasMany('App\Delivery','from_id')->get();
    }
}
