<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class UserInfosRequest extends FormRequest
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
            "first_name" => "required",
            "last_name"=> "required",
            "phone"=> "required|numeric",
            "address"=> "required",
            "proffesion"=> "required",
            "picture"=> "required",
            "biography"=> "required",
            "linkedin_url"=> "nullable",
            "website_url"=> "nullable",
            "biography"=> "required",
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
            "first_name.required" => __("user_infos.first_name_required"),
            "last_name.required"=> __("user_infos.last_name_required"),
            "phone.numeric"=> __("user_infos.phone_isnumeric"),
            "phone.required"=> __("user_infos.phone_required"),
            "address.required"=> __("user_infos.address_required"),
            "proffesion.required"=> __("user_infos.proffesion_required"),
            "picture.required"=> __("user_infos.picture_required"),
            "biography.required"=> __("user_infos.biography_required"),
            "user_id.exists"=> __("user_infos.user_not_exists"),
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
