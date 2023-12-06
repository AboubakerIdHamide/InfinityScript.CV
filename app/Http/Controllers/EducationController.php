<?php

namespace App\Http\Controllers;

use App\Http\Requests\EducationRequest;
use App\Models\Education;
use Illuminate\Http\Request;

class EducationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $education_all = Education::all();
        return response()->json([
            "success" => true,
            "message" => __("education.education_fetched"),
            "data" => [
                "education"=>$education_all,
            ],
    ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(EducationRequest $request)
    {
        $data = $request->validated();
        $education = Education::create($data);
        return response()->json([
            "success" => true,
            "message" => __("education.educaton_store"),
            "data" => [
                "educations"=>$education,
            ],
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $education = Education::findOrFail($id);
        return response()->json([
            "success" => true,
            "message" => __("education.education_show"),
            "data" => [
                "educations"=>$education,
                ],
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(EducationRequest $request, string $id)
    {
        $data = $request->validated();
        $education = Education::find($id);
        if($education){
            $education->update($data);
            return response()->json([
                "success" => true,
                "message" => __("education.education_update"),
                "data" => [
                    "educations"=>$education,
                    ],
            ], 200);
        }else{
            return response()->json([
                "success" => false,
                "message" => __("education.user_not_exists"),
                "data"=>null
            ], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $deleted = Education::destroy($id);
        if($deleted)
        {
            return response()->json([
                "success" => true,
                "message" => __("education.delete_success"),
                "data" => [
                    "deleted"=>$deleted,
                    ],
            ], 200);
        }
        else
        {
            return response()->json([
                "success" => false,
                "message" => __("education.delete_erreur"),
                "data" => [
                    "deleted"=>$deleted,
                    ],
            ], 200);
        }
    }
}
