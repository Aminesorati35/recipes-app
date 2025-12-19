import React from 'react'
import { Link } from 'react-router'

export const Navbar = () => {
  return (
    <nav className="w-full  py-5">
        <h1 className="font-agbalumo text-2xl text-center">
          <Link to="/">Foodieland<span className="text-[#FF7426]">.</span></Link>
        </h1>
        <div className="h-[1px] w-full bg-gray-200 mt-5" />
      </nav>
  )
}
