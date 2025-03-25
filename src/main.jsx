import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from "react-router";
import Register from './auth/Register.jsx';
import Login from './auth/Login.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <Routes>
        <Route path='home' element={<App />} />
        <Route path="login" element={<Login />} />
        <Route index element={<Register />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </StrictMode>
  </BrowserRouter>,
)
