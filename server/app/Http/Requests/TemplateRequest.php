<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class TemplateRequest extends FormRequest
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
        $isStore = $this->method() == "POST";
        return [
            "name"=> "required|string",
            "rules" => "required|json",
            "preview_img" => $isStore ? "required|image|mimes:jpeg,png,jpg,gif|max:2048":"nullable",
            "url" => $isStore ? "required|file|mimes:html,htm" : "nullable",
            "user_id" => "required|exists:users,id",
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     */
    public function messages(){
        return [
            "name.required" => __("template.name_required"),
            "name.string" => __("template.name_string"),
            "rules.required" => __("template.rules_required"),
            "rules.json" => __("template.rules_json"),
            "preview_img.required" => __("template.preview_img_required"),
            "preview_img.image" => __("template.preview_img_image"),
            "preview_img.mimes" => __("template.preview_img_invalid_type"),
            "preview_img.max" => __("template.preview_img_max_size"),
            "url.required" => __("template.url_required"),
            "url.file" => __("template.url_file"),
            "url.mimes" => __("template.url_invalid_type"),
            "user_id.required" => __("template.user_id_required"),
            "user_id.exists" => __("template.user_not_exists"),
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
