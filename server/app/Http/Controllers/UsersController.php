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
}
