<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Skill;
use App\Http\Requests\SkillRequest;
use Exception;

class SkillController extends Controller
{
    public function store(SkillRequest $request){
        try{
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
        catch(Exception $e){
            return response()->json([
                "success" => false,
                "message" => __("skill.validation_error"),
                "data" => $e->getMessage(),
            ], 422);
        }
    }

    public function index(){
        try{
            $skills=Skill::all();
                return response()->json([
                    "success" => true,
                    "message" => __("skill.skills_fetched"),
                    "data" => [
                        "skills"=>$skills
                    ],
                ], 200);
            }
            catch(Exception $e){
                return response()->json([
                    "success" => false,
                    "message" => __("skill.skills_not_fetched"),
                    "data" => $e->getMessage(),
                ], 422);
            }
        }
    
    
    public function show(string $id){
        try{
            $skill=Skill::find($id);
            return response()->json([
                "success" => true,
                "message" => __("skill.skills_fetched"),
                "data" => [
                    "skill"=>$skill
                ],
            ], 200);
        }
        catch(Exception $e){
            return response()->json([
                "success" => false,
                "message" => __("skill.skill_not_fetched"),
                "data" => $e->getMessage(),
            ], 422);
        }
    }

    public function update(SkillRequest $request, string $id){
        try{
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
        catch(Exception $e){
            return response()->json([
                "success" => false,
                "message" => __("skill.skills_not_updated"),
                "data" => $e->getMessage(),
            ], 422);
        }
    }

    public function destroy($id){
        try{
            $skill=Skill::findOrFail($id);
            $skill->delete();
            return response()->json([
                    "success" => true,
                    "message" => __("skill.skill_deleted")
                ], 200);
        }
        catch(Exception $e){
            return response()->json([
                "success" => false,
                "message" => __("skill.skills_not_deleted"),
                "data" => $e->getMessage(),
            ], 422);
        }
    }

}
