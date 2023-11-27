<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class RegisterRequest extends FormRequest
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
            "email" => "email|required|unique:users,email",
            "password" => "required|min:6|confirmed",
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
            "email.required" => __("auth.email_required"),
            "email.email" => __("auth.invalide_email"),
            "email.unique" => __("auth.email_already_taken"),
            "password.required" => __("auth.password_required"),
            "password.min" => __("auth.password_min"),
            "password.confirmed" => __("auth.password_confirmed"),
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
                "message" => __("auth.validation_error"),
                "data" => $validator->errors(),
            ]),
            422
        );
    }
}
