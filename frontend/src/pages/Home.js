import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');  

    axios.get('http://127.0.0.1:8000/api/products', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      setProducts(response.data);
    })
    .catch(error => {
      console.error("There was an error fetching the products!", error);
    });
  }, []);

  return (
    <div>
        <h1>Products</h1>
        <div className="row">
        {products.map(product => (
            <div className="col-md-4" key={product.id}>
            <div className="card mb-4">
                <img src={`http://127.0.0.1:8000/storage/products/${product.image}`} className="card-img-top" alt={product.name} />
                <div className="card-body">
                <h5>{product.name}</h5>
                <p>${product.price}</p>
                <Link to="/cart" className="btn btn-primary">Add to Cart</Link>
                </div>
            </div>
            </div>
        ))}
        </div>
    </div>
  );
}

export default Home;
