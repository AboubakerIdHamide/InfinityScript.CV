<?php

use App\Http\Controllers\Auth;
use App\Http\Controllers\TemplateController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'auth'], function () {
    Route::post('/register', [Auth::class, 'register']);
    Route::post('/login', [Auth::class, 'login']);
    Route::post('/verifiy-email', [Auth::class, 'verifyEmail'])->middleware('auth:sanctum');
    Route::post('/forgot-password', [Auth::class, 'forgotPassword']);
    Route::post('/reset-password', [Auth::class, 'resetPassword']);
});

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::resource('templates', TemplateController::class)->except(['create', 'edit']);
});

Route::fallback(function () {
    return response()->json([
        'success' => false,
        'message' => __("auth.not_found"),
    ], 404);
});