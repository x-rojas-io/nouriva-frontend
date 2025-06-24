import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MealPage from "./pages/MealPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <HomePage />
      <MealPage />
    </>
  );
}

export default App;