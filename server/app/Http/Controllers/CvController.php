<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateResumeUpdateProfile;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Http\Requests\CvRequest;
use App\Models\Resume;
use App\Models\Template;
use App\Models\User;
use App\Models\UserInfos;
use Exception;
use GuzzleHttp\Psr7\Request;
use Illuminate\Support\Facades\Storage;

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
            $resume = Resume::where("user_id", $user->id)->where("template_id", $template->id)->first();
            if(!$resume){
                $resume = Resume::create([
                    "user_id" => $user->id,
                    "template_id" => $template->id,
                ]);
            }
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

    public function createResumeUpdateProfile(CreateResumeUpdateProfile $request){
        try {
            $data = $request->validated();
            $user = User::find($data["user_id"]);
            $template = Template::find($data["template_id"]);

            // Decode JSON DATA
            $data["informations"] = json_decode($data["informations"]);
            $data["skills"] = json_decode($data["skills"], true);
            $data["educations"] = json_decode($data["educations"]);
            $data["experiences"] = json_decode($data["experiences"]);

            // DATA for PDF
            $view_data = [
                "user" => $user,
                "informations" => $data["informations"],
                "skills" => $data["skills"],
                "educations" => $data["educations"],
                "experiences" => $data["experiences"],
            ];

            // Uploading User IMG
            $old_picture = isset($user->userinfos) ? $user->userinfos->picture : "";
            if($request->hasFile("picture")){
                $data["informations"]->picture = $request->file('picture')->store('public/pictures');
            }else{
                if($old_picture!=""){
                    $data["informations"]->picture = $old_picture;
                }else{
                    $data["informations"]->picture = "public/pictures/default.png"; 
                }
            }

            // Updating user info if update == true
            if ($data["update"]=="true") {
                // User Infos
                $user->userinfos()->updateOrcreate([
                    "user_id" => $user->id,
                ], [
                    "first_name" => $data["informations"]->first_name,
                    "last_name" => $data["informations"]->last_name,
                    "phone" => $data["informations"]->phone,
                    "address" => $data["informations"]->address,
                    "proffesion" => $data["informations"]->proffesion,
                    "linkedin_url" => $data["informations"]->linkedin_url,
                    "website_url" => $data["informations"]->website_url,
                    "picture" => $data["informations"]->picture,
                    "biography" => $data["informations"]->biography,
                ]);

                // Skills
                $user->skills()->updateOrcreate([
                    "user_id" => $user->id,
                ], [
                    "skills" => implode(",", $data["skills"]["skills"]),
                    "hobbies" => implode(",", $data["skills"]["hobbies"]),
                    "languages" => json_encode($data["skills"]["languages"]),
                ]);

                // Educations
                foreach ($data["educations"] as $education) {
                    $user->educations()->updateOrcreate([
                        "user_id" => $user->id,
                        "id" => isset($education->id) ? $education->id : 0,
                    ], [
                        "school" => $education->school,
                        "degree" => $education->degree,
                        "start_date" => $education->start_date,
                        "end_date" => $education->end_date,
                        "description" => $education->description,
                    ]);
                }

                // Experiences
                foreach ($data["experiences"] as $experience) {
                    $user->experiences()->updateOrcreate([
                        "user_id" => $user->id,
                        "id" => isset($experience->id) ? $experience->id : 0,
                    ], [
                        "title" => $experience->title,
                        "company_name" => $experience->company_name,
                        "employement_type" => $experience->employement_type,
                        "location" => $experience->location,
                        "location_type" => $experience->location_type,
                        "start_date" => $experience->start_date,
                        "end_date" => $experience->end_date,
                        "description" => $experience->description,
                    ]);
                }

                // Creating the resume
                $resume = Resume::where("user_id", $user->id)->where("template_id", $template->id)->first();
                if (!$resume) {
                    $resume = Resume::create([
                        "user_id" => $user->id,
                        "template_id" => $template->id,
                    ]);
                }
                if (!$resume) {
                    return response()->json([
                        "success" => false,
                        "message" => __("cv.download_error"),
                        "data" => null,
                    ], 422);
                }
            }

            // picture for pdf
            $view_data["informations"]->picture = storage_path("app/" . $data["informations"]->picture);
            $pdf = Pdf::loadView($template->url, $view_data);
            $fullname = $data["informations"]->first_name . "_" . $data["informations"]->last_name;

            return $pdf->download($fullname . ".pdf");
        } catch (Exception $e) {
            return response()->json([
                "success" => false,
                "message" => __("cv.download_error"),
                "data" => $e->getMessage(),
            ], 422);
        }
    }
}



