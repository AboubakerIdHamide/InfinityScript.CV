<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Experience;
use App\Http\Requests\ExperienceRequest;

class ExperienceController extends Controller
{
    /**

     * Store a newly created resource in storage.
     */

    public function index(){
        $experiences = Experience::all();
        return response()->json([
                "success" => true,
                "message" => __("experience.experiences_fetched"),
                "data" => [
                    "experiences"=>$experiences
                ],
        ], 200);
    }
    public function store(ExperienceRequest $request)
    {
        $data=$request->validated();
        $new_experience=Experience::create($data);
        return response()->json([
                "success" => true,
                "message" => __("experience.added_success"),
                "data" => [
                    "experience"=>$new_experience
                ],
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user=User::find($id);
        $experience=$user->experiences;
        return response()->json([
            "title"=>$experience->title,
            "company_name"=>$experience->company_name,
            "employement_type"=>$experience->employement_type,
            "location"=>$experience->location,
            "location_type"=>$experience->location_type,
            "start_date"=>$experience->start_date,
            "end_date"=>$experience->end_date,
            "description"=>$experience->description,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ExperienceRequest $request, string $id)
    {
        $experience=Experience::findOrFail($id);
        $data=$request->validated();
        $experience->title=$data["title"];
        $experience->company_name=$data["company_name"];
        $experience->employment_type=$data["employment_type"];
        $experience->location=$data["location"];
        $experience->location_type=$data["location_type"];
        $experience->start_date=$data["start_date"];
        $experience->end_date=$data["end_date"];
        $experience->description=$data["description"];
        $experience->save();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $experience=Experience::findOrFail($id);
        $experience->delete();
    }
}
