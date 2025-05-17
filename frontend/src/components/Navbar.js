import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">eShop</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            {user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/cart">Cart</Link>
                </li>
                {user.role === 'employee' && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin">Admin</Link>
                  </li>
                )}
                <li className="nav-item">
                  <button className="btn btn-outline-danger" onClick={logout}>Logout</button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="btn btn-outline-primary" to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
