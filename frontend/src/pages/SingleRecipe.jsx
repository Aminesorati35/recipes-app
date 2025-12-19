import { faClock, faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useParams } from "react-router";

export const SingleRecipe = () => {
  const { id } = useParams();
  
  return (
    <main className="w-full flex items-center flex-col min-h-screen px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      {/* Header Section */}
      <div className="w-full max-w-7xl p-4 md:p-6 lg:p-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 md:gap-8">
        <div className="w-full lg:w-4/5 flex flex-col gap-6 md:gap-8 px-0 lg:px-4">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Healthy Japanese Fried Rice
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

      {/* Main Image and Nutrition Section */}
      <div className="flex flex-col lg:flex-row justify-center w-full max-w-7xl p-4 md:p-6 lg:p-10 gap-6 md:gap-8">
        <div className="w-full lg:w-3/5 rounded-2xl md:rounded-3xl lg:rounded-4xl overflow-hidden">
          <img 
            src="/images/recipes/2.png" 
            alt="Japanese Fried Rice" 
            className="w-full h-64 sm:h-80 md:h-96 lg:h-auto object-cover"
          />
        </div>
        <div className="w-full lg:w-2/5 p-6 md:p-8 lg:p-10 bg-blue-50 rounded-2xl md:rounded-3xl lg:rounded-4xl flex flex-col justify-between gap-6">
          <div>
            <h1 className="font-bold text-lg md:text-xl lg:text-2xl">Nutrition Information</h1>
            <div className="mt-4 md:mt-6 space-y-3 md:space-y-4">
              {[
                { label: "Calories", value: "219.9 kcal" },
                { label: "Protein", value: "8.5g" },
                { label: "Carbs", value: "32.4g" },
                { label: "Fat", value: "6.2g" },
                { label: "Fiber", value: "3.1g" }
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center border-b border-gray-300 pb-2 md:pb-3">
                  <span className="text-sm md:text-base lg:text-lg font-medium text-gray-600">
                    {item.label}
                  </span>
                  <span className="font-semibold text-sm md:text-base lg:text-lg">{item.value}</span>
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

      {/* Description Section */}
      <div className="w-full max-w-4xl p-4 md:p-6 mt-4 md:mt-8">
        <p className="text-gray-600 text-sm md:text-base lg:text-lg leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>

      {/* Ingredients and Other Recipes Section */}
      <div className="w-full max-w-7xl p-4 md:p-6 lg:p-10 flex flex-col lg:flex-row gap-8 md:gap-10">
        <div className="w-full lg:w-3/5 p-4 md:p-6 lg:p-8 flex flex-col gap-6 md:gap-8">
          <h1 className="text-2xl md:text-3xl font-bold">Ingredients</h1>
          
          <div className="flex flex-col gap-4 md:gap-6">
            <h2 className="text-xl md:text-2xl font-semibold">For Main Dish</h2>
            <div className="flex flex-col gap-3 md:gap-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex gap-3 items-center pb-3 md:pb-4 border-b border-gray-200">
                  <div className="w-6 h-6 flex items-center justify-center bg-blue-100 rounded-full text-blue-600 font-bold">
                    ✓
                  </div>
                  <p className="text-gray-700 text-sm md:text-base">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 md:gap-6">
            <h2 className="text-xl md:text-2xl font-semibold">For the Sauce</h2>
            <div className="flex flex-col gap-3 md:gap-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex gap-3 items-center pb-3 md:pb-4 border-b border-gray-200">
                  <div className="w-6 h-6 flex items-center justify-center bg-green-100 rounded-full text-green-600 font-bold">
                    ✓
                  </div>
                  <p className="text-gray-700 text-sm md:text-base">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-2/5 p-4 md:p-6 lg:p-8 flex flex-col gap-6 md:gap-8 bg-gray-50 rounded-2xl md:rounded-3xl">
          <h1 className="text-2xl md:text-3xl font-bold">Other Recipes</h1>
          <div className="flex flex-col gap-4 md:gap-6">
            {[1, 2, 3].map((recipe) => (
              <div key={recipe} className="flex gap-3 md:gap-4 p-3 md:p-4 hover:bg-white rounded-xl transition-colors cursor-pointer">
                <div className="w-24 h-24 md:w-28 md:h-28 flex-shrink-0">
                  <img
                    src={`/images/recipes/${recipe}.png`}
                    alt="Recipe"
                    className="w-full h-full object-cover rounded-xl md:rounded-2xl"
                  />
                </div>
                <div className="flex flex-col gap-1 md:gap-2 flex-1">
                  <h2 className="font-semibold text-base md:text-lg lg:text-xl leading-tight">
                    Chicken Meatball with Creamy Cheese
                  </h2>
                  <p className="text-gray-500 font-medium text-sm md:text-base">By Andreas Paula</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Directions Section */}
      <div className="w-full max-w-7xl p-4 md:p-6 lg:p-10 lg:p-20 flex flex-col gap-6 md:gap-8">
        <h1 className="text-2xl md:text-3xl font-bold">Directions</h1>
        <div className="flex flex-col gap-6 md:gap-8 w-full lg:w-4/5">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex flex-col gap-4 md:gap-6">
              <h2 className="font-semibold text-xl md:text-2xl">
                {step}. Lorem Ipsum dolor sit
              </h2>
              <p className="text-gray-600 font-medium text-sm md:text-base leading-relaxed mb-4">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum
                doloribus repellendus obcaecati ab ipsam maiores, saepe itaque,
                assumenda rerum ad voluptatem officiis neque exercitationem
                perspiciatis consectetur sed tempore recusandae eligendi? Lorem ipsum
                dolor sit amet consectetur adipisicing elit.
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