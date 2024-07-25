import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import './App.css';
import Header from './components/Header'
import Home from './pages/Home'
import Saved from './pages/Saved'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

export default function App() {
  const [ login, setLogged ] = useState(false)
  const [ user, setUser ] = useState('')

  
  return (
    <div>
      <BrowserRouter>
      <Header login={login} setLogged={setLogged} setUser={ setUser } user={ user }/>
        <Routes>
            <Route index element={<LoginPage setLogged={ setLogged } setUser={ setUser }/>}/>
            <Route path='/login' element={<LoginPage setLogged={ setLogged } setUser={ setUser }/>}/>
            <Route path='/home' element={<Home user={ user }/>}/>
            <Route path='/saved' element={<Saved user={ user }/>}/>
            <Route path='/Register' element={<RegisterPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}


