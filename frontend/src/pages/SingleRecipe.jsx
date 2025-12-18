import { faClock, faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useParams } from "react-router";

export const SingleRecipe = () => {
  const { id } = useParams();
  return (
    <main className="w-[100%] flex items-center flex-col min-h-screen">
      <div className="w-8/10 p-10 flex justify-between items-center ">
        <div className="flex flex-col gap-10 px-10">
          <div>
            <h1 className="text-6xl font-bold">Health Japanese Fried Rice</h1>
          </div>
          <div className=" flex gap-13 ">
            <div className="flex gap-3 items-center border-r-1 border-gray-300 pr-3">
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
            <div className="flex items-center gap-2  border-r-1 border-gray-300 pr-3">
              <div>
                <span>
                  <FontAwesomeIcon icon={faClock} />
                </span>
              </div>
              <div className="flex flex-col">
                <span className="uppercase">PREP TIME</span>
                <span className="text-gray-400">15 Minutes</span>
              </div>
            </div>
            <div className="flex items-center gap-2  border-r-1 border-gray-300 pr-3">
              <div>
                <span>
                  <FontAwesomeIcon icon={faClock} />
                </span>
              </div>
              <div className="flex flex-col">
                <span className="uppercase">PREP TIME</span>
                <span className="text-gray-400">15 Minutes</span>
              </div>
            </div>
            <div className="flex items-center gap-2  border-r-1 border-gray-300 pr-3">
              <div>
                <span>
                  <FontAwesomeIcon icon={faClock} />
                </span>
              </div>
              <div className="flex flex-col">
                <span className="uppercase">PREP TIME</span>
                <span className="text-gray-400">15 Minutes</span>
              </div>
            </div>
          </div>
        </div>
        <div className="px-10">
            <div className="w-[90px] h-[90px] rounded-full flex justify-center items-center bg-blue-100">
                <span className="text-3xl"><FontAwesomeIcon icon={faShare} /></span>
            </div>
        </div>
      </div>
      <div className="flex justify-center w-8/10 p-10 gap-10">
        <div className="w-6/10 rounded-4xl overflow-hidden">
            <img src="/images/recipes/2.png" alt="" className="w-full" />
        </div>
        <div className="flex flex-col justify-between w-3/10 p-10 bg-blue-50 rounded-4xl overflow-hidden">
            <div>
                <h1 className="font-bold text-[20px]">Nutrition Information</h1>
                <div className="mt-4">
                    <div className="flex justify-between items-center border-b-1 border-gray-300 pb-3">
                        <span className="text-[19px] font-semibold text-gray-400">Calories</span>
                        <span className="font-semibold">219.9 kcal</span>
                    </div>
                </div>
            </div>
            <div>
                <p className="text-center text-gray-500">
                    adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                </p>
            </div>
        </div>
      </div>
      <div className="w-7/10 ">
        <p className="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
    </main>
  );
};
