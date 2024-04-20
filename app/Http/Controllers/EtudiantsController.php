<?php
namespace App\Http\Controllers;

use App\Models\Etudiant;
use Illuminate\Http\Request;

class EtudiantsController extends Controller
{
    public function index()
    {
        $etudiants = Etudiant::all();
        return response()->json($etudiants);
    }

    public function updateAbsence(Request $request, $id)
    {
        $etudiant = Etudiant::findOrFail($id);
        $etudiant->Absence = $request->absence;
        $etudiant->save();
        return response()->json(['message' => 'Absence mise à jour avec succès']);
    }

    public function deleteAbsence(Request $request, $id)
    {
        $etudiant = Etudiant::findOrFail($id);
        $etudiant->Absence = null;
        $etudiant->save();
        return response()->json(['message' => 'Absence réinitialisée avec succès']);
    }

    public function getStudentsByDate($date)
    {
        $students = Etudiant::whereDate('created_at', $date)
                            ->select('Nom', 'Prenom', 'Absence')
                            ->get();
        return response()->json($students);
    }
}
