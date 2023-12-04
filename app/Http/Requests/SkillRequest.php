<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class SkillRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "skills" => "required",
            "hobbies" => "required",
            "languages" => "required|json",
            "user_id"   => "exists:users,id",
        ];
    }
    /**
   * Get the error messages for the defined validation rules.
   *
   * @return array<string, string>
   */
    public function messages(): array
    {
        return [
            "skills.required" => __("skill.skills_required"),
            "hobbies.required" => __("skill.hobbies_required"),
            "languages.required" => __("skill.languages_required"),
            "languages.json" => __("skill.invalid_json"),
            "user_id.exists" => __("skill.user_does_not_exist"),
        ];
    }

    /**
    * Handle a failed validation attempt.
    *
    * @param \Illuminate\Contracts\Validation\Validator $validator
    *
    * @throws \Illuminate\Http\Exceptions\HttpResponseException
    */
    protected function failedValidation(Validator $validator){
    throw new HttpResponseException(
            response()->json([
                "success" => false,
                "message" => __("skill.validation_error"),
                "data" => $validator->errors(),
                ]),
                422);
    }
}
