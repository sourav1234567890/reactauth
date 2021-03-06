import React, { useState } from 'react';
import axios from 'axios';
import { Redirect, useHistory } from 'react-router-dom';

export default () => {
    const history = useHistory();
    const [user, setUser] = useState({ email: '', password: '', name: '' });
    const [error, setError] = useState({});
    const [isLoading, setLoading] = useState(false);

    const onHandleRegister = async event => {
        event.preventDefault();
        const error = {};
        if (user.name.trim() == '') {
            error.name = "Name is required.";
        }
        if (user.email.trim() == '') {
            error.email = "Email is required.";
        }
        if (user.password.trim() == '') {
            error.password = "Password is required.";
        }
        if (Object.keys(error).length === 0) {
            axios.post('http://localhost:8000/api/auth/register', user).then((res) => {
                console.log({ res });
                const token = res.data.token;
                const user = res.data.user;
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                window.location.href = "/";
            }).catch(error => console.error({ error }))
        }
        setError(error);
    }

    const token = localStorage.getItem('token');
    const isLoggedIn = !!token;

    if (isLoggedIn) return <Redirect to="/" />

    return (
        <div className="center">
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <h3 className="medium mb-3">Register</h3>
                            <form className="needs-validation" onSubmit={onHandleRegister}>
                                <div className="form-group mb-4">
                                    <label htmlFor="name" className="loca-label">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder=""
                                        value={user.name}
                                        onChange={({ target }) => setUser(prevState => ({ ...prevState, name: target.value }))}
                                    />
                                </div>
                                <div className="form-group mb-4">
                                    <label htmlFor="email" className="loca-label">Email</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder=""
                                        value={user.email}
                                        onChange={({ target }) => setUser(prevState => ({ ...prevState, email: target.value }))}
                                    />
                                </div>
                                <div className="form-group mb-4">
                                    <label htmlFor="password" className="loca-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder=""
                                        value={user.password}
                                        onChange={({ target }) => setUser(prevState => ({ ...prevState, password: target.value }))}
                                    />
                                </div>
                                <button type="submit"
                                    className="btn btn-primary btn-lg btn-block z-depth-0 rounded-lg"
                                    disabled={isLoading} className="btn btn-primary">{isLoading ? 'Loading…' : 'Continue'}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}