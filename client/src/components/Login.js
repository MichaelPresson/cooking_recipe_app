import { useState } from 'react';
import { useNavigate, Link} from 'react-router-dom'
import axios from 'axios';
import '../styles/Login.css'

export default function Login({ setLogged, setUser }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/login', { username, password }, { withCredentials: true });
            if (response.status === 200) {
                setLogged(true)
                setUser(username)
                navigate('/home')
            }
        } catch (error) {
            alert('Invalid username or password');
        }
    };

    return (
        <div className='login-container'>
            <form className='login-form' onSubmit={handleLogin}>
                <p className='centered-text'>
                    Login to view your saved recipes
                </p>
                <input className='login-input' type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
                <input className='login-input' type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                <button className='login-button' type="submit">Login</button>
                <p className='centered-text'>
                    Not signed up? <Link to="/register">Click here.</Link> Continue as <Link to="/home">guest</Link>
                </p>
            </form>
        </div>

    );
}