// src/pages/Register.js
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value,
    });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
        const response = await axios.post('http://127.0.0.1:8000/api/register', formData);
        localStorage.setItem('token', response.data.token);
        console.log('Registration successful!');
        navigate('/login'); 
    } catch (error) {
        console.error(error.response);  
        setError('Registration failed. Please try again.');
    }
    };

    return (
    <div className="container">
        <h2>Register</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            />
        </div>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            />
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            />
        </div>
        <div className="mb-3">
            <label htmlFor="password_confirmation" className="form-label">Confirm Password</label>
            <input
            type="password"
            className="form-control"
            id="password_confirmation"
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleChange}
            required
            />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
        </form>
    </div>
    );
};

export default Register;
