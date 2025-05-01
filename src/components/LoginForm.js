import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUserShield } from 'react-icons/fa';
import './LoginForm.css';
import { login } from '../services/authService';

function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const data = await login(email, password);
            console.log('Login successful:', data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="form" onSubmit={handleSubmit} autoComplete="off">
            <div className="input-wrapper">
                <FaEnvelope className="icon left" />
                <input
                    placeholder="Email"
                    className="input-field"
                    type="email"
                    name="email"
                    value={email}
                    autoComplete='off'
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <div className="input-wrapper">
                <FaLock className="icon left" />
                <input
                    placeholder="Password"
                    className="input-field"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    name="password"
                    autoComplete='new-password'
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <span
                    className="icon right toggle-password"
                    onClick={() => setShowPassword((prev) => !prev)}
                >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
            </div>

            <p className="p">
                Admin access is for system administrators who manage all organizations and users.
            </p>

            {error && <p className="error">{error}</p>}

            <button type="submit" className="login-button" disabled={loading}>
                <FaUserShield className="btn-icon" />
                {loading ? 'Logging in...' : 'Login as Admin'}
            </button>
        </form>
    );
}

export default LoginForm;
