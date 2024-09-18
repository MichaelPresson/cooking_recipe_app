import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';
import './styles/Universal.css'
import Header from './components/Header'
import Home from './pages/Home'
import Saved from './pages/Saved'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

export default function App() {
  const [ login, setLogged ] = useState(false)
  const [ user, setUser ] = useState('')
  const [ savedRecipes, setSavedRecipes] = useState([])

  useEffect( () => {
    if(user) {
      const fetchRecipes = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/getSavedRecipes?savedBy=${user}`)
          setSavedRecipes(response.data)
        } catch (error) {
          console.error('Error fetching saved recipes:', error);
        }
    };

    fetchRecipes();
    }
  },[user])

  const updateSavedRecipes = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/getSavedRecipes?savedBy=${user}`);
      setSavedRecipes(response.data);
    } catch (error) {
      console.error('Error updating saved recipes:', error);
    }
  };

  return (
    <div>
      <BrowserRouter>
      <Header login={login} setLogged={setLogged} setUser={ setUser } user={ user }/>
        <Routes>
            <Route index element={<LoginPage setLogged={ setLogged } setUser={ setUser }/>}/>
            <Route path='/login' element={<LoginPage setLogged={ setLogged } setUser={ setUser }/>}/>
            <Route path='/home' element={<Home user={ user } savedRecipes={ savedRecipes } updateSavedRecipes={ updateSavedRecipes }/>}/>
            <Route path='/saved' element={<Saved user={ user }/>}/>
            <Route path='/Register' element={<RegisterPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}


