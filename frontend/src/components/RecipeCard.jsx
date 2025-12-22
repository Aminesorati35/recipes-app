import React from "react";
import { Link } from "react-router";

const RecipeCard = ({recipe,handleDelete}) => {
  return (
    <div className="bg-blue-50 rounded-2xl md:rounded-3xl overflow-hidden hover:shadow-lg transition-shadow relative">
      <span className="absolute right-5 top-3 bg-blue-300 px-7 py-1 z-90 rounded-2xl font-semibold text-gray-600">{recipe.category.name}</span>

     
      <div className="w-full h-48 sm:h-56 md:h-64 lg:h-72">
        <img
          src={`http://127.0.0.1:8000/storage/${recipe.image}`}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          alt="Recipe"
        />
      </div>
      <div className="flex flex-col p-4 md:p-6">
        <h2 className="font-bold text-lg md:text-xl mb-3 md:mb-4">
          {recipe.title}
        </h2>
        <p className="text-gray-400 font-semibold pb-3">
          {recipe.description}
        </p>
        <div className="w-full flex gap-4 p-3">
          <button onClick={()=>handleDelete(recipe.id)} className="px-5 py-2 text-white bg-red-400 rounded-2xl font-semibold cursor-pointer hover:bg-red-500 transition duration-300">Delete</button>
          <Link to={`/admin/recipes/${recipe.id}`} className="px-5 py-2 text-white bg-yellow-400 rounded-2xl font-semibold cursor-pointer hover:bg-yellow-500 transition duration-300">Modify</Link>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
