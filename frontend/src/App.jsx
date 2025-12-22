import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./pages/Home";
import { Route, Routes, useLocation } from "react-router";
import { SingleRecipe } from "./pages/SingleRecipe";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import AddRecipe from "./pages/admin/recipes/AddRecipe";
import ListRecipes from "./pages/admin/recipes/ListRecipes";
import ModifyRecipe from "./pages/admin/recipes/ModifyRecipe";
import AdminLayout from "./pages/admin/layout/AdminLayout";
import Recipes from "./pages/Recipes";
import AddCategory from "./pages/admin/categories/AddCategory";
import ListCategories from "./pages/admin/categories/ListCategories";
import ModifyCategory from "./pages/admin/categories/ModifyCategory";
import RecipesByCategory from "./pages/RecipesByCategory";
import Login from "./pages/auth/login";
import Register from "./pages/auth/Register";

function App() {
  const Location = useLocation()
  const path = location.pathname
  const isAdminRoute = path.startsWith('/admin') || path.startsWith('/Admin')
  return (
    <>
    {!isAdminRoute && <Navbar />}
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/recipes" element={<Recipes />}></Route>
      <Route path="/recipe/:id" element={<SingleRecipe />}></Route>
      <Route path="/recipes/category/:id" element={<RecipesByCategory />}></Route>
      <Route path="/admin/recipes" element={<AdminLayout><ListRecipes /></AdminLayout>}></Route>
      <Route path="/admin/recipes/create" element={<AdminLayout><AddRecipe /></AdminLayout>}></Route>
      <Route path="/admin/recipes/:id" element={<AdminLayout><ModifyRecipe /></AdminLayout>}></Route>
      <Route path="/admin/categories" element={<AdminLayout><ListCategories /></AdminLayout>}></Route>
      <Route path="/admin/categories/create" element={<AdminLayout><AddCategory /></AdminLayout>}></Route>
      <Route path="/admin/categories/:id" element={<AdminLayout><ModifyCategory /></AdminLayout>}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
    </Routes>
    {!isAdminRoute && <Footer />}
    </>
    
  );
}

export default App;
