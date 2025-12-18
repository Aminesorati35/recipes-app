import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./pages/Home";
import { Route, Routes } from "react-router";
import { SingleRecipe } from "./pages/SingleRecipe";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/recipe/:id" element={<SingleRecipe />}></Route>
    </Routes>
    <Footer/>
    </>
    
  );
}

export default App;
