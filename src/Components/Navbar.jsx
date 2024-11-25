import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const NavBar = () => {
    const { usuario, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <a className="navbar-brand" href="/">RECLAMOS</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item" > 
                    <Link className='nav-link' to="/menu">Menu</Link>
                </li>
                <li className="nav-item">
                {usuario && (
                    <li className="nav-item" >
                        <button  className='nav-link' onClick={handleLogout}>Logout</button>
                    </li>
                )}
                </li>

            </ul>
            </div>
        </div>
        </nav>

    );
};

export default NavBar;