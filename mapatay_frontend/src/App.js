// src/App.js
import React, { useState } from 'react';
import PatientManagement from './components/PatientManagement';
import MedicalRecordManagement from './components/MedicalRecordManagement';
import './App.css';

function App() {
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  const handleSelectPatient = (patientId) => {
    setSelectedPatientId(patientId);
  };

  const handleBackToPatients = () => {
    setSelectedPatientId(null);
  };

  return (
    <div className="container">
      <header>
        <h1>Mapatay Medical Clinic</h1>
      </header>

      {selectedPatientId ? (
        <div>
          <button onClick={handleBackToPatients}>Back to Patients</button>
          <MedicalRecordManagement patientId={selectedPatientId} />
        </div>
      ) : (
        <PatientManagement onSelectPatient={handleSelectPatient} />
      )}
    </div>
  );
}

export default App;
