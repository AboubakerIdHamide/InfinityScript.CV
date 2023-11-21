<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Education extends Model
{
    use HasFactory;
    protected $fillable = [
        'school',
        'degree',
        'start_date',
        'end_date',
        'description',
        'user_id',
    ];
}
