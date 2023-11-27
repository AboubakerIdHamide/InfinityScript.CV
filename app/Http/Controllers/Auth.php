<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Auth\Events\Login;
use Illuminate\Http\Request;

class Auth extends Controller
{
    function register(RegisterRequest $request){
        $data = $request->validated();
        $data['password'] = bcrypt($data['password']);
        $new_user= User::create($data);
        $token = $new_user->createToken('auth_token')->plainTextToken;
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
}
