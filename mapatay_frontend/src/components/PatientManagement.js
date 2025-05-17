import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PatientManagement = ({ onSelectPatient }) => {
    const [patients, setPatients] = useState([]);
    const [newPatient, setNewPatient] = useState({ first_name: '', last_name: '' });
    const [editPatient, setEditPatient] = useState(null);

    const fetchPatients = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/patients');
        setPatients(response.data);
    } catch (error) {
        console.error('Error fetching patients:', error);
    }
    };

    useEffect(() => {
    fetchPatients();
    }, []);

    const handleAddPatient = async (e) => {
    e.preventDefault();
    try {
        await axios.post('http://127.0.0.1:8000/api/patients', newPatient);
        setNewPatient({ first_name: '', last_name: '' });
        fetchPatients();
    } catch (error) {
        console.error('Error adding patient:', error);
    }
    };

    const handleEditPatient = async (e) => {
    e.preventDefault();
    try {
        await axios.put(`http://127.0.0.1:8000/api/patients/${editPatient.id}`, editPatient);
        setEditPatient(null);
        fetchPatients();
    } catch (error) {
        console.error('Error editing patient:', error);
    }
    };

    const handleDeletePatient = async (id) => {
    try {
        await axios.delete(`http://127.0.0.1:8000/api/patients/${id}`);
        fetchPatients();
    } catch (error) {
        console.error('Error deleting patient:', error);
    }
    };

    return (
    <div>
        <h2>Patient Management</h2>
        <form onSubmit={editPatient ? handleEditPatient : handleAddPatient}>
        <div className="form-group">
            <input
            type="text"
            placeholder="First Name"
            value={editPatient ? editPatient.first_name : newPatient.first_name}
            onChange={(e) =>
                editPatient
                ? setEditPatient({ ...editPatient, first_name: e.target.value })
                : setNewPatient({ ...newPatient, first_name: e.target.value })
            }
            required
            />
            <input
            type="text"
            placeholder="Last Name"
            value={editPatient ? editPatient.last_name : newPatient.last_name}
            onChange={(e) =>
                editPatient
                ? setEditPatient({ ...editPatient, last_name: e.target.value })
                : setNewPatient({ ...newPatient, last_name: e.target.value })
            }
            required
            />
        </div>
        <button type="submit">{editPatient ? 'Save Changes' : 'Add Patient'}</button>
        </form>

        <h3>Patient List</h3>
        <table>
        <thead>
            <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {patients.map((patient) => (
            <tr key={patient.id}>
                <td>{patient.first_name}</td>
                <td>{patient.last_name}</td>
                <td>
                <button onClick={() => onSelectPatient(patient.id)}>View Medical Records</button>
                <button onClick={() => setEditPatient(patient)}>Edit</button>
                <button onClick={() => handleDeletePatient(patient.id)}>Delete</button>
                </td>
            </tr>
            ))}
        </tbody>
        </table>
    </div>
    );
};

export default PatientManagement;
