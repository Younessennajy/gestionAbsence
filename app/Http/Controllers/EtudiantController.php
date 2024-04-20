<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Etudiant;

class EtudiantController extends Controller
{
    public function index(Request $request)
    {
        // Récupérer les étudiants en fonction de la date et de l'absence sélectionnées
        $etudiants = Etudiant::all();

        return view('form', compact('etudiants'));
    }

    public function updateAbsence(Request $request, $id)
    {
        $etudiant = Etudiant::findOrFail($id);

        $etudiant->Absence = $request->absence;
        $etudiant->save();

        return redirect()->back()->with('success', 'Absence mise à jour avec succès.');
    }
    public function deleteAbsence(Request $request,$id ){
        $etudiant = Etudiant::findOrFail($id);
        $etudiant->Absence =null;
        $etudiant->save();

        return redirect()->back()->with('success', 'Absence mise à jour avec succès.');
    }
    public function getStudentsByDate($date)
{
    $students = Etudiant::whereDate('created_at', $date)
                        ->select('Nom', 'Prenom', 'Absence')
                        ->get();

    return response()->json($students);
}

}
