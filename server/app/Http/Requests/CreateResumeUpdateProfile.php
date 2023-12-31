<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateResumeUpdateProfile extends FormRequest
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
            "update"=> "string",
            "user_id"=> "exists:users,id",
            "template_id"=> "exists:templates,id",
            "informations"=> "json",
            "picture"=> "nullable",
            "skills"=> "json",
            "educations"=> "json",
            "experiences"=> "json"
        ];
    }
}
