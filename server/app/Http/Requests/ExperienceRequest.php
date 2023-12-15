<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator as ValidationValidator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Validator;

class ExperienceRequest extends FormRequest
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
            "title"=>"required",
            "company_name"=>"required",
            "employement_type"=>"required",
            "location"=>"required",
            "location_type"=>"required",
            "start_date"=>"required",
            "end_date"=>"required",
            "description"=>"required",
            "user_id"=>"exists:users,id",
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
            "title.required" => __("experience.title_required"),
            "company_name.required" => __("experience.company_name_required"),
            "employement_type.required" => __("experience.employement_type_required"),
            "location.required" => __("experience.location_required"),
            "location_type.required" => __("experience.location_type_required"),
            "start_date.required" => __("experience.start_date_required"),
            "end_date.required" => __("experience.end_date_required"),
            "description.required" => __("experience.description_required"),
            "user_id.exists" => __("experience.user_id_invalid")
        ];
    }

     /**
     * Handle a failed validation attempt.
     *
     * @param \Illuminate\Contracts\Validation\Validator $validator
     *
     * @throws \Illuminate\Http\Exceptions\HttpResponseException
     */
    
     protected function failedValidation(ValidationValidator $validator)
     {
        throw new HttpResponseException(
            response()->json([
                "success" => false,
                "message" => __("experience.validation_error"),
                "data" => $validator->errors(),
            ]),
            422
        );
     }

}
