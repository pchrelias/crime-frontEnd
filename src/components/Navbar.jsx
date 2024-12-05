import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">LA Crime</Link>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/register">Register</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/query-form">QueryForm</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/add-report">Add Crime Report</Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
);

export default Navbar;
