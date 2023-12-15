<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class EducationRequest extends FormRequest
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
            "school" => "required",
            "degree"=> "required",
            "start_date"=> "required|date",
            "end_date"=> "required|date",
            "description" => "required",
            "user_id"=> "exists:users,id",
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
            "school.required" => __("education.school_required"),
            "degree.required"=> __("education.degree_required"),
            "start_date.required"=> __("education.start_date_required"),
            "start_date.date"=> __("education.start_date_isdate"),
            "end_date.required"=> __("education.end_date_required"),
            "end_date.date"=> __("education.end_date_isdate"),
            "description.required"=> __("education.description_required"),
            "user_id.exists"=> __("education.user_not_exists"),
        ];
    }

    /**
     * Handle a failed validation attempt.
     *
     * @param \Illuminate\Contracts\Validation\Validator $validator
     *
     * @throws \Illuminate\Http\Exceptions\HttpResponseException
     */
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            response()->json([
                "success" => false,
                "message" => __("user_infos.validation_error"),
                "data" => $validator->errors(),
            ]),
            422
        );
    }
}
