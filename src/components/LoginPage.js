import React from 'react';
import Header from './Header';
import Contents from './Contents';
import './LoginPage.css';
function LoginPage() {
    return (
        <div className='login-page'>
            <Header/>
            <Contents/>
        </div>
    );
}

export default LoginPage;
