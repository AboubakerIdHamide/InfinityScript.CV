<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'company_name',
        'employement_type',
        'location',
        'location_type',
        'start_date',
        'end_date',
        'description',
        'user_id',
    ];
}
