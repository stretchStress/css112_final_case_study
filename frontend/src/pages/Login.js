import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', { email, password });
            login(response.data.user);
            localStorage.setItem('auth_token', response.data.token); 
            navigate('/');
        } catch (error) {
            setError('Invalid credentials or server error');
        }
    };

    return (
        <div className="row justify-content-center">
            <div className="col-md-6">
                <h2>Login</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="Email" className="form-control mb-2" value={email} onChange={e => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" className="form-control mb-2" value={password} onChange={e => setPassword(e.target.value)} />
                    <button className="btn btn-primary">Login</button>
                </form>
                <p>
                    Don't have an account? <Link to="/register">Register here</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
