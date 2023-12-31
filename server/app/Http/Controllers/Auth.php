<?php

namespace App\Http\Controllers;

use App\Http\Requests\ForgotPasswordRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\ResetPasswordRequest;
use App\Http\Requests\VerifyEmailRequest;
use App\Models\User;
use App\Notifications\RegisterOTP;
use App\Notifications\ResetPassOTP;
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
        $new_user->notify(new RegisterOTP());
        return response()->json([
                "success" => true,
                "message" => __("auth.register_success"),
                "data" => [
                    "user"=>$new_user,
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
            ], 200);
        }
    }

    function verifyEmail(VerifyEmailRequest $request){
        $otpObj= $this->otp->validate($request->email, $request->otp);
        if(!$otpObj->status){
            return response()->json([
                "success" => false,
                "message" => __("auth.invalide_credentials"),
                "data" => null,
            ], 200);
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

    function forgotPassword(ForgotPasswordRequest $request){
        $email = $request->email;
        $user = User::where("email", $email)->first();
        $user->notify(new ResetPassOTP());
        return response()->json([
            "success" => true,
            "message" => __("auth.otp_sended"),
            "data" => [
                "user" => $user,
            ],
        ], 200);
    }

    function resetPassword(ResetPasswordRequest $request){
        $otpObj= $this->otp->validate($request->email, $request->otp);
        if(!$otpObj->status){
            return response()->json([
                "success" => false,
                "message" => __("auth.invalide_credentials"),
                "data" => null,
            ], 200);
        }
        $user = User::where('email', $request->email)->first();
        $user->password= bcrypt($request->password);
        $user->save();
        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json([
            "success" => true,
            "message" => __("auth.password_reseted"),
            "data" => [
                "user" => $user,
                "token" => $token
            ],
        ], 200);
    }

    function notAuthenticated(){
        return response()->json([
            "success" => false,
            "message" => __("auth.unautorized")
        ], 200);
    }
}
