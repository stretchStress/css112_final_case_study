import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Cart() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
    if (!user) {
        navigate('/login');
    } else {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(storedCart);
    }
    }, [user, navigate]);

    const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const goToCheckout = () => {
    navigate('/checkout');
    };

    return (
    <div>
        <h1>My Cart</h1>
        {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
        ) : (
        <>
            <ul className="list-group mb-3">
            {cartItems.map(item => (
                <li className="list-group-item d-flex justify-content-between" key={item.id}>
                <div>
                    <h6>{item.name}</h6>
                    <p>${item.price}</p>
                </div>
                <button className="btn btn-danger" onClick={() => removeFromCart(item.id)}>Remove</button>
                </li>
            ))}
            </ul>
            <button className="btn btn-primary" onClick={goToCheckout}>Proceed to Checkout</button>
        </>
        )}
    </div>
    );
}

export default Cart;
