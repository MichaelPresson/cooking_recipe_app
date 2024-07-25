import React, { useState } from 'react';
import { Link, useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios'
import '../styles/Header.css';

export default function Header({ login, setLogged, setUser, user}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation()
  const navigate = useNavigate()
  const buttonText = location.pathname === '/saved' ? 'Home' :'Saved'
  const loginText = user !== '' ? user : 'Log in'
  
  function toggleDropdown() {
    setDropdownOpen(!dropdownOpen);
  };
  function handleClick() {
    const to = location.pathname === '/saved' ? '/home' : '/saved'
    navigate(to)
  }
  async function handleLogout() {
    try {
      await axios.post('http://localhost:3001/logout', {}, { withCredentials: true });
      setLogged(false)
      setUser('')
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  }

  return (
    <header className="header">
      <h1>Coded Cuisine</h1>
      <nav>
        <ul>
          <li className="dropdown">
            <button onClick={handleClick} className="dropbtn">{ buttonText }</button>
            <button className='dropbtn'>{ loginText }</button>
            <div className={`dropdown-content ${dropdownOpen ? 'show' : ''}`}>
              <Link to="/profile">Profile</Link>
              <Link to="/settings">Settings</Link>
              <Link to="/login" onClick={handleLogout}>Logout</Link>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}
