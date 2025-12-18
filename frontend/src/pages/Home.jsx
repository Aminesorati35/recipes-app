import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils, faClock } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  return (
    <div className="w-full capitalize">
      
      {/* Hero Section */}
      <section className="w-full flex justify-center items-center px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="w-full max-w-7xl bg-[#e7fafe] rounded-2xl md:rounded-4xl flex flex-col-reverse lg:flex-row justify-between items-center overflow-hidden">
          <div className="w-full lg:w-1/2 p-6 md:p-8 lg:p-12 flex flex-col gap-6 md:gap-8">
            <div>
              <div className="bg-white rounded-2xl md:rounded-3xl font-semibold p-3 w-fit px-6 flex justify-center">
                Hot Recipes
              </div>
            </div>
            <div className="flex flex-col gap-4 md:gap-6">
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold lg:w-[90%] xl:w-[70%]">
                  Spicy delicious chicken wings
                </h1>
              </div>
              <div>
                <p className="w-full lg:w-[90%] xl:w-[70%] text-gray-600">
                  Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqut
                  enim ad minim
                </p>
              </div>
              <div className="flex flex-wrap gap-3 items-center justify-start">
                <div className="rounded-2xl md:rounded-3xl bg-gray-100 p-3 px-4 w-fit flex justify-center items-center">
                  <p className="flex items-center justify-center gap-2 text-sm md:text-base">
                    <span className="font-black">
                      <FontAwesomeIcon icon={faClock} />
                    </span>
                    30 Minutes
                  </p>
                </div>
                <div className="rounded-2xl md:rounded-3xl bg-gray-100 p-3 px-4 w-fit flex justify-center items-center">
                  <p className="flex items-center justify-center gap-2 text-sm md:text-base">
                    <span className="font-black">
                      <FontAwesomeIcon icon={faUtensils} />
                    </span>
                    Chicken
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mt-4">
              <div className="flex gap-3 items-center">
                <img 
                  src="/images/men.png" 
                  alt="John Smith" 
                  className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-bold capitalize">John Smith</h3>
                  <span className="text-gray-600 text-sm">15 March 2025</span>
                </div>
              </div>
              <div className="w-full sm:w-auto">
                <button className="text-white p-3 md:p-4 bg-black rounded-xl md:rounded-2xl w-full sm:w-40 hover:bg-gray-800 transition-colors">
                  View Recipes
                </button>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 h-64 sm:h-80 md:h-96 lg:h-auto">
            <img 
              src="/images/hero.png" 
              className="w-full h-full object-cover lg:rounded-r-4xl" 
              alt="Delicious chicken wings" 
            />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="w-full flex flex-col justify-center items-center py-8 md:py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0 p-4 md:p-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center md:text-left">
            Categories
          </h2>
          <button className="bg-blue-200 p-3 px-6 rounded-xl md:rounded-2xl font-semibold hover:bg-blue-300 transition-colors w-full md:w-auto">
            View All Categories
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 w-full max-w-7xl p-4">
          {[1, 2, 3, 4, 5, 6].map((el) => (
            <div 
              key={el} 
              className="flex flex-col justify-center items-center gap-3 py-4 md:py-6 h-48 md:h-60 rounded-xl md:rounded-2xl bg-green-50 hover:bg-green-100 transition-colors cursor-pointer"
            >
              <img 
                src={`images/categories/1.png`} 
                alt="Category" 
                className="w-16 h-16 md:w-20 md:h-20 object-contain"
              />
              <span className="font-semibold text-sm md:text-base">Breakfast</span>
            </div>
          ))}
        </div>
      </section>

      {/* Recipes Section */}
      <section className="w-full flex justify-center items-center flex-col gap-8 md:gap-12 py-8 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl flex justify-center items-center flex-col gap-4 md:gap-6 text-center">
          <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl">
            Simple and tasty recipes
          </h1>
          <p className="text-gray-500 text-sm md:text-base lg:w-4/5">
            Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqut enim ad minim
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full max-w-7xl">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((el) => (
            <div 
              key={el} 
              className="bg-blue-50 rounded-2xl md:rounded-3xl overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="w-full h-48 sm:h-56 md:h-64 lg:h-72">
                <img
                  src={`/images/recipes/1.png`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  alt="Recipe"
                />
              </div>
              <div className="flex flex-col p-4 md:p-6">
                <h2 className="font-bold text-lg md:text-xl mb-3 md:mb-4">
                  Big and Juicy Wagyu Beef Cheeseburger
                </h2>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  <span className="bg-blue-100 px-3 py-1.5 md:px-4 md:py-2 rounded-xl font-semibold text-sm">
                    30 Minutes
                  </span>
                  <span className="bg-blue-100 px-3 py-1.5 md:px-4 md:py-2 rounded-xl font-semibold text-sm">
                    Snack
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;