<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Education extends Model
{
    use HasFactory;

    protected $table = "educations";

    protected $fillable = [
        'school',
        'degree',
        'start_date',
        'end_date',
        'description',
        'user_id',
    ];

    public function user(){
        return $this->belongsTo(User::class, "user_id", "id");
    }
}
