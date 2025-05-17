import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function EmployeeDashboard() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (!user || user.role !== 'employee') {
            navigate('/login');
        } else {
            fetchProducts();
        }
    }, [user, navigate]);

    const fetchProducts = () => {
        const token = localStorage.getItem('auth_token');
        axios.get('http://127.0.0.1:8000/api/employee/products', {
            headers: {
                'Authorization': `Bearer ${token}` 
            }
        })
        .then(response => {
            setProducts(response.data);
        })
        .catch(error => {
            setError('Failed to fetch products.');
            console.error(error);
        });
    };

    const handleAddProduct = () => {
        const token = localStorage.getItem('auth_token');
        axios.post('http://127.0.0.1:8000/api/employee/products', {
            name,
            price,
            stock,
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(() => {
            setName('');
            setPrice('');
            setStock('');
            fetchProducts();
        })
        .catch(error => {
            setError('Failed to add product.');
            console.error(error);
        });
    };

    const handleDelete = (productId) => {
        const token = localStorage.getItem('auth_token');
        axios.delete(`http://127.0.0.1:8000/api/employee/products/${productId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(() => fetchProducts())
        .catch(error => {
            setError('Failed to delete product.');
            console.error(error);
        });
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            
            <div className="mb-4">
                <h4>Add New Product</h4>
                <input type="text" className="form-control mb-2" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
                <input type="number" className="form-control mb-2" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
                <input type="number" className="form-control mb-2" placeholder="Stock" value={stock} onChange={e => setStock(e.target.value)} />
                <button className="btn btn-primary" onClick={handleAddProduct}>Add Product</button>
            </div>

            <h4>Existing Products</h4>
            <ul className="list-group">
                {products.map(product => (
                    <li className="list-group-item d-flex justify-content-between" key={product.id}>
                        <div>
                            {product.name} - ${product.price} ({product.stock} pcs)
                        </div>
                        <button className="btn btn-danger" onClick={() => handleDelete(product.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default EmployeeDashboard;
