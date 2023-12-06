<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserInfosRequest;
use App\Models\UserInfos;
use Illuminate\Http\Request;

class UserInfosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user_infos_all = UserInfos::all();
        return response()->json([
            "success" => true,
            "message" => __("user_infos.user_infos_fetched"),
            "data" => [
                "user-infos"=>$user_infos_all,
            ],
    ], 200);
    }


    /**
     * créer un nouveau user_infos
     */
    public function store(UserInfosRequest $request)
    {
        $data = $request->validated();
        $user_info = UserInfos::create($data);
        return response()->json([
            "success" => true,
            "message" => __("user_infos.user_infos_store"),
            "data" => [
                "user-infos"=>$user_info,
            ],
        ], 200);
        
        }

    /**
     * return one user info.
     */
    public function show(string $id)
    {
        $user_info = UserInfos::findOrFail($id);
        return response()->json([
            "success" => true,
            "message" => __("user_infos.user_infos_fetched"),
            "data" => [
                "user-infos"=>$user_info,
                ],
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserInfosRequest $request, string $id)
    {
        $data = $request->validated();
        $user_info = UserInfos::find($id);
        if($user_info){
            $user_info->update($data);
            return response()->json([
                "success" => true,
                "message" => __("user_infos.user_infos_update"),
                "data" => [
                    "user-infos"=>$user_info,
                    ],
            ], 200);
        }else{
            return response()->json([
                "success" => false,
                "message" => __("user_infos.user_not_exists"),
                "data"=>null
            ], 404);
        }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $deleted = UserInfos::destroy($id);
        if($deleted)
        {
            return response()->json([
                "success" => true,
                "message" => __("user_infos.delete_success"),
                "data" => [
                    "deleted"=>$deleted,
                    ],
            ], 200);
        }
        else
        {
            return response()->json([
                "success" => false,
                "message" => __("user_infos.delete_erreur"),
                "data" => [
                    "deleted"=>$deleted,
                    ],
            ], 200);
        }
    }
}
