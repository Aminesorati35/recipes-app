import { faClock, faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

export const SingleRecipe = () => {
  const { id } = useParams();
  const [myRecipe,setMyRecipe]=useState({})
  const [recipes,setRecipes]=useState([])
  useEffect(()=>{
    const getRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/showRecipe/${id}`
        );
        setMyRecipe(response.data.recipe);
        console.log(response.data.recipe)
      } catch (e) {
        console.error(e);
      }
    };
    getRecipe()
  },[id])
  useEffect(()=>{
     if (!myRecipe.category_id) return;
    const getRecipesByCategory = async ()=>{
      try {
        const response = await axios.get(
          `http://localhost:8000/api/getFiveRecipeByCategory/${myRecipe.category_id}`
        );
        setRecipes(response.data.recipes);
        console.log("response.data.recipes",response.data.recipes)
      } catch (e) {
        console.error(e);
      }
    }
    getRecipesByCategory()
  },[myRecipe.category_id])
  
  return (
    <main className="w-full flex items-center flex-col min-h-screen px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      <div className="w-full max-w-7xl p-4 md:p-6 lg:p-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 md:gap-8">
        <div className="w-full lg:w-4/5 flex flex-col gap-6 md:gap-8 px-0 lg:px-4">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {myRecipe.title}
            </h1>
          </div>
          <div className="flex flex-wrap gap-4 md:gap-6">
            <div className="flex gap-3 items-center pr-3 md:pr-4 border-r border-gray-300">
              <img
                src="/images/men.png"
                alt="John Smith"
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full object-cover"
              />
              <div>
                <h3 className="font-bold capitalize text-sm sm:text-base">John Smith</h3>
                <span className="text-gray-600 text-xs sm:text-sm">15 March 2025</span>
              </div>
            </div>
            <div className="flex items-center gap-2 pr-3 md:pr-4 border-r border-gray-300">
              <div className="text-gray-600">
                <FontAwesomeIcon icon={faClock} className="text-sm sm:text-base" />
              </div>
              <div className="flex flex-col">
                <span className="uppercase text-xs sm:text-sm font-medium">PREP TIME</span>
                <span className="text-gray-400 text-xs sm:text-sm">15 Minutes</span>
              </div>
            </div>
            <div className="flex items-center gap-2 pr-3 md:pr-4 border-r border-gray-300">
              <div className="text-gray-600">
                <FontAwesomeIcon icon={faClock} className="text-sm sm:text-base" />
              </div>
              <div className="flex flex-col">
                <span className="uppercase text-xs sm:text-sm font-medium">COOK TIME</span>
                <span className="text-gray-400 text-xs sm:text-sm">20 Minutes</span>
              </div>
            </div>
            <div className="flex items-center gap-2 pr-3 md:pr-4">
              <div className="text-gray-600">
                <FontAwesomeIcon icon={faClock} className="text-sm sm:text-base" />
              </div>
              <div className="flex flex-col">
                <span className="uppercase text-xs sm:text-sm font-medium">TOTAL TIME</span>
                <span className="text-gray-400 text-xs sm:text-sm">35 Minutes</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-auto flex justify-center lg:justify-end px-0 lg:px-4">
          <button className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full flex justify-center items-center bg-blue-100 hover:bg-blue-200 transition-colors shadow-sm">
            <span className="text-xl sm:text-2xl md:text-3xl text-blue-600">
              <FontAwesomeIcon icon={faShare} />
            </span>
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-center w-full max-w-7xl p-4 md:p-6 lg:p-10 gap-6 md:gap-8">
        <div className="w-full lg:w-3/5 rounded-2xl md:rounded-3xl lg:rounded-4xl overflow-hidden">
          <img 
            src={`http://localhost:8000/storage/${myRecipe.image}`}
            alt="Japanese Fried Rice" 
            className="w-full h-64 sm:h-80 md:h-96 lg:h-auto object-cover"
          />
        </div>
        <div className="w-full lg:w-2/5 p-6 md:p-8 lg:p-10 bg-blue-50 rounded-2xl md:rounded-3xl lg:rounded-4xl flex flex-col justify-between gap-6">
          <div>
            <h1 className="font-bold text-lg md:text-xl lg:text-2xl">Nutrition Information</h1>
            <div className="mt-4 md:mt-6 space-y-3 md:space-y-4">
              {myRecipe?.informations?.map((item, index) => (
                <div key={index} className="flex justify-between items-center border-b border-gray-300 pb-2 md:pb-3">
                  <span className="text-sm md:text-base lg:text-lg font-medium text-gray-600">
                    {item.name}
                  </span>
                  <span className="font-semibold text-sm md:text-base lg:text-lg">{item.quantity}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-center text-gray-500 text-sm md:text-base">
              adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-4xl p-4 md:p-6 mt-4 md:mt-8">
        <p className="text-gray-600 text-sm md:text-base lg:text-lg leading-relaxed">
          {myRecipe.description}
        </p>
      </div>

      <div className="w-full max-w-7xl p-4 md:p-6 lg:p-10 flex flex-col lg:flex-row gap-8 md:gap-10">
        <div className="w-full lg:w-3/5 p-4 md:p-6 lg:p-8 flex flex-col gap-6 md:gap-8">
          <h1 className="text-2xl md:text-3xl font-bold">Ingredients</h1>
          <div className="flex flex-col gap-4 md:gap-6">
            <h2 className="text-xl md:text-2xl font-semibold">For Main Dish</h2>
            <div className="flex flex-col gap-3 md:gap-4">
              {myRecipe?.ingredients?.map((item) => (
                <div key={item.id} className="flex gap-3 items-center pb-3 md:pb-4 border-b border-gray-200">
                  <div className="w-6 h-6 flex items-center justify-center bg-blue-100 rounded-full text-blue-600 font-bold">
                    ✓
                  </div>
                  <div className="flex justify-between w-full">
                    <p className="text-gray-700 text-sm md:text-base">
                    {item.name}
                  </p>
                  <span className="font-semibold text-blue-400">{item.quantity}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

         
        </div>

        <div className="w-full lg:w-2/5 p-4 md:p-6 lg:p-8 flex flex-col gap-6 md:gap-8 bg-gray-50 rounded-2xl md:rounded-3xl">
          <h1 className="text-2xl md:text-3xl font-bold">Other Recipes</h1>
          <div className="flex flex-col gap-4 md:gap-6">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="flex gap-3 md:gap-4 p-3 md:p-4 hover:bg-white rounded-xl transition-colors cursor-pointer">
                <div className="w-24 h-24 md:w-28 md:h-28 flex-shrink-0">
                  <img
                   src={`http://127.0.0.1:8000/storage/${recipe.image}`}
                    alt="Recipe"
                    className="w-full h-full object-cover rounded-xl md:rounded-2xl"
                  />
                </div>
                <div className="flex flex-col gap-1 md:gap-2 flex-1">
                  <h2 className="font-semibold text-base md:text-lg lg:text-xl leading-tight">
                    {recipe.title}
                  </h2>
                  <p className="text-gray-500 font-medium text-sm md:text-base">By Andreas Paula</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full max-w-7xl p-4 md:p-6 lg:p-10 lg:p-20 flex flex-col gap-6 md:gap-8">
        <h1 className="text-2xl md:text-3xl font-bold">Steps</h1>
        <div className="flex flex-col gap-6 md:gap-8 w-full lg:w-4/5">
          {myRecipe?.steps?.map((step) => (
            <div key={step.id} className="flex flex-col gap-4 md:gap-6">
              <h2 className="font-semibold text-xl md:text-2xl">
                {step.step_number} : Lorem Ipsum dolor sit
              </h2>
              <p className="text-gray-600 font-medium text-sm md:text-base leading-relaxed mb-4">
                {step.description}
              </p>
              {step === 1 && (
                <div className="w-full">
                  <img 
                    src="/images/ingredients/1.png" 
                    alt="Step illustration" 
                    className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover rounded-xl md:rounded-2xl"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};