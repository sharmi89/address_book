<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

// Load application layout from back-end
Route::get('/', function () {
  return view('app');
});

// contacts routes
Route::post('contact/search', 'ContactController@search');
Route::put('contact', 'ContactController@update');
Route::resource('contact', 'ContactController');

// get current user details
Route::get('user/currentUser', 'UserController@getCurrentUser');

// Authentication routes...
Route::post('auth/login', 'Auth\AuthController@postLogin');
Route::get('auth/logout', 'Auth\AuthController@getLogout');

// Registration routes...
Route::post('auth/register', 'Auth\AuthController@postRegister');
