<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\VerifyEmailRequest;
use App\Models\User;
use App\Notifications\RegisterOTP;
use Illuminate\Http\Request;
use Otp;

class Auth extends Controller
{
    private $otp;

    public function __construct()
    {
        $this->otp = new Otp;
    }

    function register(RegisterRequest $request){
        $data = $request->validated();
        $data['password'] = bcrypt($data['password']);
        $new_user= User::create($data);
        $token = $new_user->createToken('auth_token')->plainTextToken;
        $new_user->notify(new RegisterOTP());
        return response()->json([
                "success" => true,
                "message" => __("auth.register_success"),
                "data" => [
                    "user"=>$new_user,
                    "token"=>$token
                ],
        ], 200);
    }

    function login(LoginRequest $request){
        $data = $request->validated();
        if(auth()->attempt($data)){
            $user= auth()->user();
            $user->tokens()->delete();
            $token = $user->createToken('auth_token')->plainTextToken;
            return response()->json([
                "success" => true,
                "message" => __("auth.login_success"),
                "data" => [
                    "user" => $user,
                    "token" => $token
                ],
            ], 200);
        }else{
            return response()->json([
                "success" => false,
                "message" => __("auth.invalide_credentials"),
                "data" => null,
            ], 422);
        }
    }

    function verifyEmail(VerifyEmailRequest $request){
        $otpObj= $this->otp->validate($request->email, $request->otp);
        if(!$otpObj->status){
            return response()->json([
                "success" => false,
                "message" => __("auth.invalide_credentials"),
                "data" => null,
            ], 422);
        }
        $user = User::where('email', $request->email)->first();
        $user->email_verified_at= now();
        $user->save();
        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json([
            "success" => true,
            "message" => __("auth.email_verified"),
            "data" => [
                "user" => $user,
                "token" => $token
            ],
        ], 200);
    }
}
