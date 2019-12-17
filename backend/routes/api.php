<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */
Route::post('register', 'API\RegisterController@register');
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::group(['middleware' => ['cors','auth:api']], function () {
	Route::get('me','API\UserController@getMe');
    Route::get('components','API\ComponentController@index');
    Route::post('component','API\ComponentController@store');
    Route::get('users','API\UserController@index');
    Route::get('categories','API\CategoryController@index');
    Route::post('category','API\CategoryController@store');
    Route::get('storages','API\StorageController@index');
    Route::post('storage','API\StorageController@store');
    Route::get('entries','API\EntryController@index');
    Route::post('entry','API\EntryController@store');
    Route::get('deliveries','API\DeliveryController@index');
    Route::post('delivery','API\DeliveryController@store');
    Route::get('storageShifts','API\StorageShiftController@index');
    Route::post('storageShift','API\StorageShiftController@store');
    Route::post('storageShifts','API\StorageShiftController@storeRange');
});
Route::get('storage/{id}','API\StorageController@show');