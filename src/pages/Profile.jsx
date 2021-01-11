import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

export default () => {
    const token = localStorage.getItem('token');
    const isLoggedIn = !!token;

    if (!isLoggedIn) return <Redirect to="/login" />

    const [user, setUser] = useState();
    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('http://localhost:8000/api/auth/me', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then((res) => {
            console.log({ res });
            setUser(res.data.user);
        }).catch(error => console.error({ error }))
    }, [])

    return (
        <div className="center">
            <div>
                {user && <ul>
                    <li>Name: {user.name}</li>
                    <li>Email: {user.email}</li>
                </ul>}
            </div>
        </div>
    )
}