import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx'
import './index.css'
import MealPage from './pages/MealPage';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/meal/:mealId" element={<MealPage />} />
    </Routes>
  </BrowserRouter>
)
