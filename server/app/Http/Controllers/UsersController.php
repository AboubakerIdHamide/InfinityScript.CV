<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    public function getResumes($lang, $id)
    {
        try {
            $user = User::find($id);
            foreach ($user->templates as $template) {
                $template->preview_img = str_replace("public", "storage", $template->preview_img);
            }
            return response()->json([
                "success" => true,
                "message" => __("template.retrieved_successfully"),
                "data" =>  $user->templates,
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                "success" => false,
                "message" => __("template.error_occured"),
                "data" => $e->getMessage(),
            ], 422);
        }
    }

    public function getPicture($lang, $id)
    {
        try {
            $user = User::find($id);
            if(isset($user->userinfos->picture)){
                $user["picture"] = str_replace("public", "storage", $user->userinfos->picture);
            }else{
                $user["picture"] = "storage/pictures/default.png";
            }
            return response()->json([
                "success" => true,
                "message" => __("template.retrieved_successfully"),
                "data" =>  [
                    "picture" => $user["picture"]
                ],
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                "success" => false,
                "message" => __("template.error_occured"),
                "data" => $e->getMessage(),
            ], 200);
        }
    }

    public function getData($lang, $id){
        try {
            $user = User::find($id);
            
            $informations = $user->userinfos;
            $informations->picture = str_replace("public", "storage", $user->userinfos->picture);

            $user->skills->skills;
            $user->educations;
            $user->experiences;

            $data = [
                "user" => $user,
            ];
            return response()->json([
                "success" => true,
                "message" => __("user_infos.user_infos_fetched"),
                "data" => $data,
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                "success" => false,
                "message" => __("user_infos.user_infos_not_fetched"),
                "data" => $e->getMessage(),
            ], 200);
        }
    }
}
