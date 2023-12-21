<?php

namespace App\Http\Controllers;

use App\Http\Requests\TemplateRequest;
use App\Models\Template;
use Exception;
use Illuminate\Support\Facades\Storage;

class TemplateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try{
            $templates = Template::all();
            foreach ($templates as $template) {
                $template->preview_img = str_replace('public', 'storage', $template->preview_img);
            }
            return response()->json([
                'success' => true,
                'message' => __("template.retrieved_successfully"),
                'data' => $templates
            ]);
        }catch(Exception $e){
            return response()->json([
                'success' => true,
                'message' => __("template.error_occured"),
                'data' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TemplateRequest $request)
    {
        try{
            $data = $request->validated();
            try {
                if ($request->hasFile('preview_img')) {
                    $data['preview_img'] = $request->file('preview_img')->store('public/templates/images');
                }

                if ($request->hasFile('url')) {
                    $data['url'] = $request->file('url')->store('public/templates/files');
                }
            } catch (\Exception $e) {
                return response()->json([
                    'success' => false,
                    'message' => __("template.error_uploading_files"),
                    'data' => $e->getMessage(),
                ]);
            }
            $template = Template::create($data);
            return response()->json([
                'success' => true,
                'message' => __("template.created_successfully"),
                'data' => $template
            ]);
        }catch(Exception $e){
            return response()->json([
                'success' => true,
                'message' => __("template.error_occured"),
                'data' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try{
            $template = Template::find($id);
            if (!$template) {
                return response()->json([
                    'success' => false,
                    'message' => __("template.not_found"),
                    'data' => null
                ]);
            } else {
                return response()->json([
                    'success' => true,
                    'message' => __("template.retrieved_successfully"),
                    'data' => $template
                ]);
            }
        }catch(Exception $e){
            return response()->json([
                'success' => true,
                'message' => __("template.error_occured"),
                'data' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(TemplateRequest $request, string $id)
    {
        try{
            $template = Template::find($id);
            if (!$template) {
                return response()->json([
                    'success' => false,
                    'message' => __("template.not_found"),
                    'data' => null
                ]);
            } else {
                $data = $request->validated();
                try {
                    if ($request->hasFile('preview_img')) {
                        Storage::delete($template->preview_img);
                        $data['preview_img'] = $request->file('preview_img')->store('public/templates/images');
                    }

                    if ($request->hasFile('url')) {
                        Storage::delete($template->url);
                        $data['url'] = $request->file('url')->store('public/templates/files');
                    }
                } catch (\Exception $e) {
                    return response()->json([
                        'success' => false,
                        'message' => __("template.error_uploading_files"),
                    ]);
                }
                $template->update($data);
                return response()->json([
                    'success' => true,
                    'message' => __("template.updated_successfully"),
                    'data' => $template
                ]);
            }
        }catch(Exception $e){
            return response()->json([
                'success' => true,
                'message' => __("template.error_occured"),
                'data' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try{
            $template = Template::find($id);
            if (!$template) {
                return response()->json([
                    'success' => false,
                    'message' => __("template.not_found"),
                    'data' => null
                ]);
            } else {
                try {
                    Storage::delete($template->preview_img);
                    Storage::delete($template->url);
                    $template->delete();
                    return response()->json([
                        'success' => true,
                        'message' => __("template.deleted_successfully"),
                        'data' => null
                    ]);
                } catch (Exception $e) {
                    return response()->json([
                        'success' => false,
                        'message' => __("template.error_occured"),
                        'data' => null
                    ]);
                }
            }
        }catch(Exception $e){
            return response()->json([
                'success' => true,
                'message' => __("template.error_occured"),
                'data' => $e->getMessage(),
            ]);
        }
    }
}
