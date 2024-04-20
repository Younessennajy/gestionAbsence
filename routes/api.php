

<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EtudiantsController;

Route::get('/etudiants', [EtudiantsController::class, 'index']);
Route::patch('/etudiants/{id}/updateAbsence', [EtudiantsController::class, 'updateAbsence']);
Route::patch('/etudiants/{id}/deleteAbsence', [EtudiantsController::class, 'deleteAbsence']);
Route::get('/etudiants/date/{date}', [EtudiantsController::class, 'getStudentsByDate']);

