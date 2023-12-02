<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Skill;
use App\Http\Requests\SkillRequest;

class SkillController extends Controller
{
    public function store(SkillRequest $request){
        $data=$request->validated();
        $new_skill=Skill::create($data);
        return response()->json([
                "success" => true,
                "message" => __("skill.added_success"),
                "data" => [
                    "skill"=>$new_skill
                ],
            ], 200);
    }

    public function index(){
        $skills=Skill::all();
        return response()->json([
                "success" => true,
                "message" => __("skill.skills_fetched"),
                "data" => [
                    "skills"=>$skills
                ],
            ], 200);
    }
    
    public function show(string $id){
        $user=User::find($id);
        $skill=$user->skills;
        return response()->json([
            "skills"=>$skill->skills,
            "hobbies"=>$skill->hobbies,
            "languages"=>$skill->languages,
        ], 200);
    }

    public function update(SkillRequest $request, string $id){
        $skill=Skill::findOrFail($id);
        $data=$request->validated();
        $skill->skills=$data["skills"];
        $skill->hobbies=$data["hobbies"];
        $skill->languages=$data["languages"];
        $skill->save();
        return response()->json([
                "success" => true,
                "message" => __("skill.skill_updated"),
                "data" => [
                    "skill"=>$skill
                    ],
            ], 200);
    }

    public function destroy($id){
        $skill=Skill::findOrFail($id);
        $skill->delete();
        return response()->json([
                "success" => true,
                "message" => __("skill.skill_deleted")
            ], 200);
    }

}
