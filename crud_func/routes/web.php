<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MovieController;

Route::get('/', fn() => redirect('/movies'));
Route::resource('movies', MovieController::class);
