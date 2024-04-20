import React, { useState, useEffect } from 'react';
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import axios from 'axios';
import Calendar from './Calendar';

function EtudiantsList() {
  const [etudiants, setEtudiants] = useState([]);
  const [groupes, setGroupes] = useState([]);
  const [selectedGroupe, setSelectedGroupe] = useState('');

  const filteredEtudiants = selectedGroupe
    ? etudiants.filter(etudiant => etudiant.Groupe === selectedGroupe)
    : etudiants;

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/etudiants')
      .then(response => {
        setEtudiants(response.data);

        const uniqueGroupes = [...new Set(response.data.map(etudiant => etudiant.Groupe))];
        setGroupes(uniqueGroupes);
      })
      .catch(error => {
        console.error('Error fetching etudiants:', error);
      });
  }, []);

  const updateAbsence = (id, absenceValue) => {
    axios.patch(`http://127.0.0.1:8000/api/etudiants/${id}/updateAbsence`, { absence: absenceValue })
      .then(response => {
        console.log(response.data);
        const updatedEtudiants = etudiants.map(etudiant => {
          if (etudiant.id === id) {
            return { ...etudiant, Absence: absenceValue };
          }
          return etudiant;
        });
        setEtudiants(updatedEtudiants);
      })
      .catch(error => {
        console.error('Error updating absence:', error);
      });
  };

  const deleteAbsence = (id) => {
    axios.patch(`http://127.0.0.1:8000/api/etudiants/${id}/deleteAbsence`)
      .then(response => {
        console.log(response.data);
        const updatedEtudiants = etudiants.map(etudiant => {
          if (etudiant.id === id) {
            return { ...etudiant, Absence: null };
          }
          return etudiant;
        });
        setEtudiants(updatedEtudiants);
      })
      .catch(error => {
        console.error('Error deleting absence:', error);
      });
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">Liste des Étudiants</h1>
      <div className="d-flex flex-column flex-md-row">
        <div className="mr-md-4">
          <div className="mb-3">
            <label htmlFor="groupeSelect" className="form-label">Choisir un groupe :</label>
            <select
              id="groupeSelect"
              value={selectedGroupe}
              onChange={(e) => setSelectedGroupe(e.target.value)}
              className="form-select"
              style={{ backgroundColor: '#f8f9fa', color: '#495057' }}
            >
              <option value="">Tous les groupes</option>
              {groupes.map(groupe => (
                <option key={groupe} value={groupe}>{groupe}</option>
              ))}
            </select>
          </div>
          <table className="table table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th>ID</th>
                <th>Groupe</th>
                <th>CEF</th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>ABSENCE</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEtudiants.map(etudiant => (
                <tr key={etudiant.id}>
                  <td>{etudiant.id}</td>
                  <td>{etudiant.Groupe}</td>
                  <td>{etudiant.CEF}</td>
                  <td>{etudiant.Nom}</td>
                  <td>{etudiant.Prenom}</td>
                  <td>
                    <label className="mr-2">
                      <input
                        type="radio"
                        value="A"
                        checked={etudiant.Absence === 'A'}
                        onChange={() => updateAbsence(etudiant.id, 'A')}
                      /> A
                    </label>
                    <label>
                      <input
                      className='bg-danger'
                        type="radio"
                        value="AJ"
                        checked={etudiant.Absence === 'AJ'}
                        onChange={() => updateAbsence(etudiant.id, 'AJ')}
                      /> AJ
                    </label>
                  </td>
                  <td>
                    <button className="btn btn-danger" onClick={() => deleteAbsence(etudiant.id)}>
                      <TbAdjustmentsHorizontal />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <Calendar />
        </div>
      </div>
    </div>
  );
}

export default EtudiantsList;
