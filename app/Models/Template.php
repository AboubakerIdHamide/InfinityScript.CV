<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Template extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'rules',
        'preview_img',
        'url',
        'user_id',
    ];

    public function users(){
        return $this->belongsToMany(User::class, "resumes", "user_id", "template_id");
    }
}
