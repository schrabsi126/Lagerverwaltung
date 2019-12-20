<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Storage_shift extends Model
{
    protected $fillable=['number,delviery_id,component_id'];

    public function Delivery()
    {
        return $this->belongsTo('App\Delivery')->get();
    }
    public function Component()
    {
        return $this->belongsTo('App\Component')->get();
    }

}
