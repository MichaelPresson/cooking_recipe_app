import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/register', { username, password });
            if (response.status === 201) {
                alert('User registered successfully');
            }
        } catch (error) {
            alert('Registration failed');
        }
    };

    return (
        <div className='register-container'>
            <form className='register-form' onSubmit={handleRegister}>
                <p className='centered-text'>
                    Register and enjoy the benefits!
                </p>
                <input className='register-input' type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
                <input className='register-input' type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                <button className='register-button' type="submit">Register</button>
                <p className='centered-text'>
                    Back to login? <Link to="/login">Click here</Link>
                </p>
            </form>
        </div>
    );
}


