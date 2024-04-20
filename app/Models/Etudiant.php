<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Database\Eloquent\Model;

class Etudiant extends Model
{
    // protected $table = 'etudiants';:
    // protected $primaryKey = 'id';
    protected $fillable = [ 'Groupe', 'CEF', 'Nom', 'Prenom', 'Absence'];
      use HasFactory;


}
