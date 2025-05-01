import React from 'react';
import Header from './Header';
import LoginForm from './LoginForm';
import './LoginPage.css';
function LoginPage() {
    return (
        <div className='login-page'>
            <Header />
            <LoginForm />
        </div>
    );
}

export default LoginPage;
