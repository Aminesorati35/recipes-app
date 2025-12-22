import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen, faSpinner, faTag, faPlus } from "@fortawesome/free-solid-svg-icons";
import RecipeCard from "../../../components/RecipeCard";
import { Link } from "react-router";
import authService from "../../auth/authService";

const ListRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/index");
        setRecipes(res.data.recipes);
        
      } catch (error) {
        console.error("Error fetching recipes", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const handleDelete = async (id) => {
    

    try {
      const response = await authService.authenticatedRequest(
        `http://127.0.0.1:8000/api/recipes/destroy/${id}`,{
          method:'DELETE'
        }
      );
      setRecipes(recipes.filter((recipe) => recipe.id !== id));
      console.log(response)
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center w-full">
              <FontAwesomeIcon
                icon={faSpinner}
                className="text-4xl text-blue-500 animate-spin mb-4"
              />
              <p className="text-xl font-semibold text-gray-700">
                Loading categories...
              </p>
            </div>
    );
  }


  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-10 flex justify-center">
      <div className="w-8/10  flex flex-col gap-8">

       <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Recipes
          </h1>
          <p className="text-gray-600 text-lg">
            Browse all available recipes 
          </p>
        </div>
        <div className="mb-8 flex justify-end">
                  <Link
                    to="/admin/recipes/create"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition shadow-lg hover:shadow-xl"
                  >
                    <FontAwesomeIcon icon={faPlus} />
                    Add New Recipe
                  </Link>
                </div>

        {recipes.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <FontAwesomeIcon
              icon={faTag}
              className="text-6xl text-gray-300 mb-4"
            />
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              No Recipes Found
            </h3>
            <p className="text-gray-500 mb-6">
              Start by adding your first Recipe
            </p>
            <Link
              to="/admin/recipes/create"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
            >
              <FontAwesomeIcon icon={faPlus} />
              Add Category
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} handleDelete={handleDelete}/>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListRecipes;
