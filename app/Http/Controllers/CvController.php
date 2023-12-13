<?php

namespace App\Http\Controllers;

use Barryvdh\DomPDF\Facade\Pdf;
use App\Http\Requests\CvRequest;
use App\Models\Template;
use App\Models\User;
use Exception;

class CvController extends Controller
{
    public function download(CvRequest $request){
        try{
            $data= $request->validated();
            $user = User::find($data["user_id"]);
            $template = Template::find($data["template_id"]);

            $view_data = [
                "user" => $user,
                "informations" => $user->userinfos,
                "educations" => $user->educations,
                "skills" => $user->skills,
                "experiences" => $user->experiences,
            ];

            $pdf = Pdf::loadView($template->url, $view_data);
            return $pdf->download($view_data["user"]["email"] . ".pdf");

        }catch(Exception $e){
            return response()->json([
                "success" => false,
                "message" => __("cv.download_error"),
                "data" => $e->getMessage(),
            ], 422);
        }
    }
}
