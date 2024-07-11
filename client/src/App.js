import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import Home from './pages/Home'
import Saved from './pages/Saved'


export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route index element={<Home/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/saved' element={<Saved/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}


