<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Storage_shift extends Model
{
    protected $fillable=['number,delviery_id,component_id'];

    public function Delivery()
    {
        return $this->belongsTo('App\Delivery');
    }
    public function Component()
    {
        return $this->belongsTo('App\Component');
    }
}
