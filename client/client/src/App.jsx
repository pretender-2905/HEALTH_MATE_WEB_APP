import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';

function App() {
  const [count, setCount] = useState(0)

  return (
 <>
 
   <Routes>
        <Route path='/' element={<LandingPage />}  />
        <Route path='/Login' element={<Login />}  />
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




