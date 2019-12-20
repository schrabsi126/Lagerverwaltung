<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Delivery extends Model
{
   protected $fillable=['date,user_id,from_id,to_id'];

   public function User()
   {
       return $this->belongsTo('App\User')->get();
   }

   public function StorageShifts()
   {
       return $this->hasMany('App\Storage_shift')->get();
   }

   public  function ToStorage()
   {
       return $this->belongsTo('App\Storage','to_id')->get();
   }
    public  function FromStorage()
    {
        return $this->belongsTo('App\Storage','from_id')->get();
    }
}
