import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Verify from './pages/Verify';
import Income from './pages/Income';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Cookies from 'js-cookie';


function App() {

  const {user} = useContext(AuthContext)

console.log("user=> ", user)
console.log("token=> ", Cookies.get('token'))
  const [count, setCount] = useState(0)

  return (
 <>
 
   <Routes>
        <Route path='/'element={  user ? <Navigate to={"/add"} /> :  <LandingPage />}  />
        <Route path='/Login' element={<Login />}  />
        <Route path='/signup' element={<SignUp />}  />
        <Route path='/verify' element={<Verify />}/>
        <Route path='/add' element={<Income />} />
      </Routes>
 </>
    
  
  )
}

export default App


// color theme
// Primary Mint (#A8E6CF) → Buttons, highlights, icons.
// Forest Green (#2E7D32) → Headers, call-to-action text, important sections.
// Light Green (#D0F0C0) → Background highlights, cards, subtle accents.
// Off-White (#F5F5F5) → Page background, clean whitespace.
// Dark Gray (#333333) → Main body text for readability. that is the color theme build




