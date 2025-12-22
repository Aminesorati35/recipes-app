import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link, useParams } from "react-router";

const RecipesByCategory = () => {
  const { id } = useParams();
  const [category, setCategory] = useState({});
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(
        `http://localhost:8000/api/recipesByCategory/${id}`
      );

      if (response.data?.recipes) {
        setRecipes(response.data.recipes);
      } else {
        setRecipes([]);
      }
    } catch (err) {
      console.error("Error fetching recipes:", err);
      setError(
        err.response?.data?.message ||
          "Failed to fetch recipes. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };
  const fetchCategory = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/categories/${id}`
      );
      setCategory(response.data.category);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategory();
    fetchRecipes();
  }, []);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">Loading recipes...</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Error Loading Recipes
          </h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchRecipes}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      );
    }

    if (recipes.length === 0) {
      return (
        <div className="text-center py-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
            <span className="text-2xl">📝</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No Recipes Found
          </h3>
          <p className="text-gray-600">Add some recipes to get started!</p>
        </div>
      );
    }

    return (
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-3 capitalize text-blue-500">
          {category.name}
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {category.description}
        </p>
      </div>
      {renderContent()}
    </div>
  );
};

const RecipeCard = ({ recipe }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col relative">
      <span className="absolute right-5 top-3 bg-blue-300 px-7 py-1 z-90 rounded-2xl font-semibold text-gray-600">
        {recipe.category.name}
      </span>
      <div className="relative h-48 overflow-hidden">
        <img
          src={`http://localhost:8000/storage/${recipe.image}`}
          alt={recipe.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/400x250?text=No+Image";
          }}
        />
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
          {recipe.title}
        </h2>

        <p className="text-gray-600 mb-4 line-clamp-2 flex-1">
          {recipe.description || "No description available"}
        </p>

        {recipe.ingredients?.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">
              Ingredients:
            </h4>
            <div className="flex flex-wrap gap-2">
              {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
                <span
                  key={`${recipe.id}-ingredient-${index}`}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700"
                  title={`${ingredient.name} (${ingredient.quantity})`}
                >
                  <span className="truncate max-w-[100px]">
                    {ingredient.name}
                  </span>
                  <span className="ml-1 text-blue-600">
                    ({ingredient.quantity})
                  </span>
                </span>
              ))}
              {recipe.ingredients.length > 3 && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                  +{recipe.ingredients.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        <div className="mt-auto pt-4">
          <Link
            to={`/recipe/${recipe.id}`}
            className="inline-flex items-center bg-blue-400 p-3 px-5 rounded-3xl text-white hover:bg-blue-500 font-medium group transition duration-300"
          >
            <span>View Full Recipe</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecipesByCategory;
