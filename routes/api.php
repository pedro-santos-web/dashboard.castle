<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ServerController;
use App\Http\Controllers\StatusController;

Route::get('/status', [StatusController::class, 'index']);
Route::apiResource('servers', ServerController::class);
