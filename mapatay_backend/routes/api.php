<?php

use Illuminate\Http\Request;
use App\Http\Controllers\API\PatientController;
use App\Http\Controllers\API\MedicalRecordController;
use Illuminate\Support\Facades\Route;

Route::get('/test', function () {
    return response()->json(['message' => 'API route working']);
});

// Test route (for checking API)
Route::get('/test', function () {
    return response()->json(['message' => 'API route working']);
});

// Patient routes (CRUD)
Route::apiResource('patients', PatientController::class);

// Medical Record routes (CRUD)
Route::apiResource('records', MedicalRecordController::class);

// Route to get all records for a specific patient
Route::get('/patients/{id}/records', [PatientController::class, 'records']);
