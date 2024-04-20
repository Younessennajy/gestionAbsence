<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Etudiant extends Model
{
    // protected $primaryKey = 'id_etudiant';

    protected $fillable = [ 'Groupe', 'CEF', 'Nom', 'Prenom', 'Absence'];

    // Define relationships or other methods here
}
