<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MedicalRecord extends Model
{
    use HasFactory;

    protected $fillable = ['patient_id', 'visit_date', 'diagnosis', 'prescription'];

    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }

}
