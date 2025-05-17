import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Checkout() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [address, setAddress] = useState('');

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(storedCart);
    }, [user, navigate]);

    const handleCheckout = async () => {
    try {
        await axios.post('http://127.0.0.1:8000/api/checkout', {
        items: cartItems,
        address: address,
        });
        localStorage.removeItem('cart');
        alert('Order placed successfully!');
        navigate('/');
    } catch (error) {
        console.error(error);
        alert('Failed to checkout.');
    }
    };

    return (
    <div>
        <h1>Checkout</h1>
        <div className="mb-3">
        <label>Delivery Address</label>
        <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <ul className="list-group mb-3">
        {cartItems.map(item => (
            <li className="list-group-item" key={item.id}>
            {item.name} - ${item.price}
            </li>
        ))}
        </ul>
        <button className="btn btn-success" onClick={handleCheckout}>Place Order</button>
    </div>
    );
}

export default Checkout;
