<?php

use App\Http\Controllers\Auth;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\CvController;
use App\Http\Controllers\EducationController;
use App\Http\Controllers\UserInfosController;
use App\Http\Controllers\TemplateController;
use App\Http\Controllers\ExperienceController;
use App\Http\Controllers\SkillController;
use App\Http\Controllers\UsersController;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Route;

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

Route::group(['middleware'=> 'setapplang', 'prefix' => '{locale}'], function(){
    Route::post('/contact', [ContactController::class, 'contact']);
    Route::group(['prefix' => 'auth'], function () {
        Route::post('/register', [Auth::class, 'register']);
        Route::post('/login', [Auth::class, 'login']);
        Route::post('/verifiy-email', [Auth::class, 'verifyEmail']);
        Route::post('/forgot-password', [Auth::class, 'forgotPassword']);
        Route::post('/reset-password', [Auth::class, 'resetPassword']);
    });

    Route::group(['prefix' => 'users', 'middleware' => 'auth:sanctum'], function () {
        Route::get('{id}/resumes', [UsersController::class, 'getResumes']);
        Route::get('{id}/picture', [UsersController::class, 'getPicture']);
        Route::get('{id}/data', [UsersController::class, 'getData']);
    });
    
    Route::group(['middleware' => 'auth:sanctum'], function () {
        Route::resource('/templates', TemplateController::class)->except(['create', 'edit']);
        Route::resource('/user-infos', UserInfosController::class)->except(['edit', 'create']);
        Route::resource('/educations', EducationController::class)->except(['edit', 'create']);
        Route::resource('/experiences', ExperienceController::class)->except(['edit', 'create']);
        Route::resource('/skills', SkillController::class)->except(['edit', 'create']);
        Route::post("/download", [CvController::class, "download"]);
        Route::post("/create-resume-update-profile", [CvController::class, "createResumeUpdateProfile"]);
    });
});


Route::get("not_authenticated", [Auth::class, 'notAuthenticated'])->name('not_authenticated');

Route::fallback(function () {
    return response()->json([
        'success' => false,
        'message' => __("auth.not_found"),
    ], 404);
});
