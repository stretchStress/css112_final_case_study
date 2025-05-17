import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MedicalRecordManagement.css';

const MedicalRecordManagement = ({ patientId }) => {
const [records, setRecords] = useState([]);
const [newRecord, setNewRecord] = useState({ visit_date: '', diagnosis: '', prescription: '' });
const [editRecord, setEditRecord] = useState(null);

    const fetchRecords = async () => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/patients/${patientId}/records`);
        setRecords(response.data);
    } catch (error) {
        console.error('Error fetching medical records:', error);
    }
    };

    useEffect(() => {
    if (patientId) fetchRecords();
    }, [patientId]);

    const handleAddRecord = async (e) => {
    e.preventDefault();
    if (!patientId) return alert('No patient selected');
    try {
        await axios.post('http://127.0.0.1:8000/api/records', {
        ...newRecord,
        patient_id: patientId,
        });
        setNewRecord({ visit_date: '', diagnosis: '', prescription: '' });
        fetchRecords();
    } catch (error) {
        console.error('Error adding medical record:', error.response?.data || error.message);
    }
    };

    const handleEditRecord = async (e) => {
    e.preventDefault();
    try {
        await axios.put(`http://127.0.0.1:8000/api/records/${editRecord.id}`, editRecord);
        setEditRecord(null);
        fetchRecords();
    } catch (error) {
        console.error('Error editing medical record:', error);
    }
    };

    const handleDeleteRecord = async (id) => {
    try {
        await axios.delete(`http://127.0.0.1:8000/api/records/${id}`);
        fetchRecords();
    } catch (error) {
        console.error('Error deleting medical record:', error);
    }
    };

    return (
    <div className="record-container">
        <h2>Medical Records for Patient #{patientId}</h2>
        <form onSubmit={editRecord ? handleEditRecord : handleAddRecord} className="record-form">
        <div>
            <label>Date:</label>
            <input
            type="date"
            value={editRecord ? editRecord.visit_date : newRecord.visit_date}
            onChange={(e) =>
                editRecord
                ? setEditRecord({ ...editRecord, visit_date: e.target.value })
                : setNewRecord({ ...newRecord, visit_date: e.target.value })
            }
            required
            />
        </div>
        <div>
            <label>Diagnosis:</label>
            <input
            type="text"
            value={editRecord ? editRecord.diagnosis : newRecord.diagnosis}
            onChange={(e) =>
                editRecord
                ? setEditRecord({ ...editRecord, diagnosis: e.target.value })
                : setNewRecord({ ...newRecord, diagnosis: e.target.value })
            }
            required
            />
        </div>
        <div>
            <label>Prescription:</label>
            <textarea
            value={editRecord ? editRecord.prescription : newRecord.prescription}
            onChange={(e) =>
                editRecord
                ? setEditRecord({ ...editRecord, prescription: e.target.value })
                : setNewRecord({ ...newRecord, prescription: e.target.value })
            }
            required
            />
        </div>
        <button type="submit">
            {editRecord ? 'Save Changes' : 'Add Record'}
        </button>
        </form>

        <h3>Records List</h3>
        <div className="table-wrapper">
        <table className="record-table">
            <thead>
            <tr>
                <th>Date</th>
                <th>Diagnosis</th>
                <th>Prescription</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {records.map((record) => (
                <tr key={record.id}>
                <td>{record.visit_date}</td>
                <td>{record.diagnosis}</td>
                <td>{record.prescription}</td>
                <td>
                    <button onClick={() => setEditRecord(record)}>Edit</button>
                    <button onClick={() => handleDeleteRecord(record.id)}>Delete</button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    </div>
    );
    };

export default MedicalRecordManagement;
