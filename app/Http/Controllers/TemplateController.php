<?php

namespace App\Http\Controllers;

use App\Http\Requests\TemplateRequest;
use App\Models\Template;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TemplateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $templates = Template::all();
        return response()->json([
            'success' => true,
            'message' => 'Templates retrieved successfully.',
            'data' => $templates
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TemplateRequest $request)
    {
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
                'message' => 'Error while uploading files.',
            ]);
        }
        $template = Template::create($data);
        return response()->json([
            'success' => true,
            'message' => 'Template created successfully.',
            'data' => $template
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $template = Template::find($id);
        if (!$template) {
            return response()->json([
                'success' => false,
                'message' => 'Template not found',
                'data' => null
            ]);
        } else {
            return response()->json([
                'success' => true,
                'message' => 'Template retrieved successfully.',
                'data' => $template
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(TemplateRequest $request, string $id)
    {
        $template = Template::find($id);
        if (!$template) {
            return response()->json([
                'success' => false,
                'message' => 'Template not found',
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
                    'message' => 'Error while uploading files.',
                ]);
            }
            $template->update($data);
            return response()->json([
                'success' => true,
                'message' => 'Template updated successfully.',
                'data' => $template
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $template = Template::find($id);
        if (!$template) {
            return response()->json([
                'success' => false,
                'message' => 'Template not found',
                'data' => null
            ]);
        } else {
            try{
                Storage::delete($template->preview_img);
                Storage::delete($template->url);
                $template->delete();
                return response()->json([
                    'success' => true,
                    'message' => 'Template deleted successfully.',
                    'data' => null
                ]);
            }catch(Exception $e){
                return response()->json([
                    'success' => false,
                    'message' => 'Error while deleting template.',
                    'data' => null
                ]);
            }
        }
    }
}
