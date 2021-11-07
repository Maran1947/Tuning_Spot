import React from 'react';
import './Login.css';
import { loginUrl } from './spotify';

function Login() {
    return (
        <div className="login_container">
            <div className="login_box">
                <h1 className="heading">Tuning Spot</h1>
                <a href={loginUrl} className="btn_login">Login with Spotify</a>
            </div>
        </div>
    )
}

export default Login;
