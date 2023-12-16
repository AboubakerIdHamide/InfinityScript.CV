<?php

namespace App\Http\Controllers;

use Barryvdh\DomPDF\Facade\Pdf;
use App\Http\Requests\CvRequest;
use App\Models\Resume;
use App\Models\Template;
use App\Models\User;
use Exception;
use stdClass;

class CvController extends Controller
{
    public function download(CvRequest $request){
        try{
            $data= $request->validated();
            $user = User::find($data["user_id"]);
            $template = Template::find($data["template_id"]);
            $informations = $user->userinfos;
            $informations->picture = storage_path("app/" . $informations->picture);
            $view_data = [
                "user" => $user,
                "informations" => $informations,
                "skills" => [
                    "skills" => explode(",", $user->skills->skills),
                    "hobbies" => explode(",", $user->skills->hobbies),
                    "languages" => json_decode($user->skills->languages),
                ],
                "educations" => $user->educations,
                "experiences" => $user->experiences,
            ];
            $pdf = Pdf::loadView($template->url, $view_data);
            $resume = Resume::create([
                "user_id" => $user->id,
                "template_id" => $template->id,
            ]);
            if(!$resume){
                return response()->json([
                    "success" => false,
                    "message" => __("cv.download_error"),
                    "data" => null,
                ], 422);
            }
            $fullname = $informations->first_name . "_" . $informations->last_name;
            return $pdf->download($fullname . ".pdf");

        }catch(Exception $e){
            return response()->json([
                "success" => false,
                "message" => __("cv.download_error"),
                "data" => $e->getMessage(),
            ], 422);
        }
    }

    public function demo(){
        $user = User::find(1);
        $template = Template::find(1);
        $informations = $user->userinfos;
        $view_data = [
            "user" => $user,
            "informations" => $informations,
            "skills" => [
                "skills" => explode(",", $user->skills->skills),
                "hobbies" => explode(",", $user->skills->hobbies),
                "languages" => json_decode($user->skills->languages),
            ],
            "educations" => $user->educations,
            "experiences" => $user->experiences,
        ];
        
        return view($template->url, $view_data);
    }
}
