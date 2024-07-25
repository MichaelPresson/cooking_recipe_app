import { useState } from 'react';
import { useNavigate, Link} from 'react-router-dom'
import axios from 'axios';

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
        <div>
            <form onSubmit={handleLogin}>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                <button type="submit">Login</button>
            </form>
            <p>
                Not signed up? <Link to="/register">Click here</Link>
            </p>
        </div>

    );
}