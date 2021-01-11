import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
    const token = localStorage.getItem('token');
    const isLoggedIn = !!token;
    const logout = () => {
        localStorage.clear();
        window.location.href = "/";
    }
    return (
        <header>
            <nav>
                <h1><Link to="/">LMS</Link></h1>
                <ul>
                    {isLoggedIn ? <><li>
                        <Link to="/profile">Profile</Link>
                    </li>
                        <li>
                            <button onClick={logout}>Logout</button>
                        </li></> : <>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                            <li>
                                <Link to="/register">Register</Link>
                            </li>
                        </>}
                </ul>
            </nav>
        </header>
    )
}