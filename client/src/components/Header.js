import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios'
import '../styles/Header.css';


export default function Header({ login, setLogged, setUser, user}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation()
  const navigate = useNavigate()
  const buttonText = location.pathname === '/saved' ? 'Home' :'Saved'
  const loginText = user !== '' ? user : 'Log in'

  const dropdownRef = useRef(null)

  function loginClick() {
   
    if (user) {
      toggleDropdown()
    } else {
      navigate('/login')
    }

  }

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

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    
  
    document.addEventListener('mousedown', handleClickOutside);
    
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <div className='spacer'></div>
      <h1>Coded Cuisine</h1>
      <nav>
        <ul>
          <li className="dropdown" ref={dropdownRef}>
            <button onClick={handleClick} className="dropbtn">{ buttonText }</button>
            <button onClick={loginClick} className='dropbtn'>{ loginText }</button>
            <div className={`dropdown-content ${dropdownOpen ? 'show' : ''}`}>
              <Link to="/login" onClick={handleLogout}>Logout</Link>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}
