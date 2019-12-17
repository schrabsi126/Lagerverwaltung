<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Entry extends Model
{
    protected $fillable=['number,date,user_id,storage_id,component_id'];

    public function User()
    {
        return $this->belongsTo('App\User');
    }
    public function Storage()
    {
        return $this->belongsTo('App\Storage');
    }
    public function Component()
    {
        return $this->belongsTo('App\Component')->get();
    }
}
