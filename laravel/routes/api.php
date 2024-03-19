<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\TodolistController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
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

