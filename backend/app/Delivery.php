<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Delivery extends Model
{
   protected $fillable=['date,user_id,from_id,to_id'];

   public function User()
   {
       return $this->belongsTo('App\User');
   }

   public function StorageShifts()
   {
       return $this->hasMany('App\Storage_shift')->get();
   }
}
