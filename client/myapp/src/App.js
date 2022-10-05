import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Homechat from './components/Homechat'
import Login from './components/Login'
import Register from './components/Register'
import './App.css'

const App = () => {
  return (
<div>
<BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />}/>
        <Route path="/login"  element={<Login />}/>
        <Route path="/chatHome" element={<Homechat />}/>
        <Route path="/" element={<Homechat />}/>
      </Routes>
    </BrowserRouter>
</div>
  )
}

export default App