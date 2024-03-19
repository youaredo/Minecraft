<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [\App\Http\Controllers\MessageController::class,'index']);
Route::get('/test', function(){
    dd('test');
});

Route::post("login",[\App\Http\Controllers\UserController::class,'login']);
Route::post("register",[\App\Http\Controllers\UserController::class,'register']);
Route::get("message_all",[\App\Http\Controllers\MessageController::class,'index']);


Route::middleware(['auth:sanctum'])->group(function () {
    Route::patch("updateUser",[\App\Http\Controllers\UserController::class,'updateUser']);
    Route::get("logout",[\App\Http\Controllers\UserController::class,'logout']);
    Route::post("get_self",[\App\Http\Controllers\UserController::class,'get_self']);

    Route::apiResource('message', MessageController::class);

    Route::apiResource('todolist', TodolistController::class);
    Route::get('/todo_list/check/{id}', [TodolistController::class, "change_list"]);
    Route::delete('todo_list/completed/all', [TodolistController::class, "delete_list"]);
});
