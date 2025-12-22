import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  Home,
  LayoutDashboard,
  Menu,
  Calendar,
  Users,
  ArrowRight,
  ListOrderedIcon,
  FolderOpenDot,
  Utensils,
  Icon,
  HdIcon,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../context/authContext";

const navItems = [
  { icon: Home, label: "Home", href: "/" },
  {
    icon: Utensils,
    label: "Recipes",
    href: "/admin/recipes",
  },
  {
    icon: Calendar,
    label: "Categories",
    href: "/admin/categories",
  },
];

const AdminNavbar = () => {
  const navigate = useNavigate()
  const {logout} = useAuth();
  const [showAdminNavbar, setShowAdminNavbar] = useState(true);
  return (
    <>
      {showAdminNavbar ? (
        <nav className="fixed top-0 left-0 flex flex-col w-20 h-screen border-r shadow-2xl z-99 bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 xl:w-70 border-blue-700/50 backdrop-blur-xl ">
          <div className="flex items-center justify-center p-6 border-b border-blue-700/30 bg-gradient-to-r from-blue-800/50 to-blue-700/30">
            <div className="flex items-center xl:space-x-4 ">
              <div className="relative group">
                <div className="absolute transition duration-300 opacity-25 -inset-1 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl blur group-hover:opacity-75"></div>
                <div className="relative flex items-center justify-center transition-all duration-300 transform shadow-xl w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl hover:shadow-2xl hover:scale-105">
                  <LayoutDashboard className="text-white w-7 h-7" />
                </div>
              </div>
              <div className="hidden xl:block">
                <h1 className="text-2xl font-bold text-transparent bg-gradient-to-r from-white to-blue-100 bg-clip-text">
                  Admin Panel
                </h1>
                <p className="mt-1 text-sm font-medium text-blue-300">
                  Management Dashboard
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 px-4 py-8">
            <ul className="space-y-2">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <li key={index}>
                    <Link
                      to={item.href}
                      className="relative flex flex-col items-center p-4 overflow-hidden text-blue-200 transition-all duration-300 group xl:flex-row xl:space-x-4 rounded-2xl hover:text-white hover:bg-gradient-to-r hover:from-blue-700/50 hover:to-blue-600/30 hover:shadow-lg"
                    >
                      <div className="absolute inset-0 transition-all duration-500 opacity-0 bg-gradient-to-r from-blue-400/10 to-cyan-500/10 group-hover:opacity-100 rounded-2xl"></div>

                      <div className="absolute inset-0 transition-all duration-300 opacity-0 bg-gradient-to-r from-blue-300/5 to-cyan-400/5 group-hover:opacity-100 rounded-2xl blur-sm"></div>

                      <div className="relative z-10 flex items-center justify-center w-12 h-12 transition-all duration-300 border rounded-xl bg-blue-700/50 group-hover:bg-gradient-to-br group-hover:from-blue-500/20 group-hover:to-cyan-600/20 group-hover:shadow-lg group-hover:scale-110 border-blue-600/30 group-hover:border-blue-400/30">
                        <Icon className="w-6 h-6 transition-all duration-300 group-hover:text-blue-200" />
                      </div>

                      <span className="relative z-10 hidden mt-3 text-sm font-semibold transition-all duration-300 xl:inline-block xl:mt-0 group-hover:text-white">
                        {item.label}
                      </span>

                      <div className="absolute right-0 w-1.5 h-10 transition-all duration-300 -translate-y-1/2 rounded-l-full opacity-0 top-1/2 bg-gradient-to-b from-blue-300 to-cyan-400 group-hover:opacity-100 shadow-lg shadow-blue-400/50"></div>

                      <div className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100">
                        <div className="absolute inset-0 transition-transform duration-700 ease-in-out -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:translate-x-full"></div>
                      </div>
                    </Link>
                  </li>
                );
              })}
               <li>
                <span
                  onClick={()=>logout(navigate)}
                  className="relative flex flex-col items-center p-4 overflow-hidden text-blue-200 transition-all duration-300 group xl:flex-row xl:space-x-4 rounded-2xl hover:text-white hover:bg-gradient-to-r hover:from-blue-700/50 hover:to-blue-600/30 hover:shadow-lg"
                >
                  <div className="absolute inset-0 transition-all duration-500 opacity-0 bg-gradient-to-r from-blue-400/10 to-cyan-500/10 group-hover:opacity-100 rounded-2xl"></div>

                  <div className="absolute inset-0 transition-all duration-300 opacity-0 bg-gradient-to-r from-blue-300/5 to-cyan-400/5 group-hover:opacity-100 rounded-2xl blur-sm"></div>

                  <div className="relative z-10 flex items-center justify-center w-12 h-12 transition-all duration-300 border rounded-xl bg-blue-700/50 group-hover:bg-gradient-to-br group-hover:from-blue-500/20 group-hover:to-cyan-600/20 group-hover:shadow-lg group-hover:scale-110 border-blue-600/30 group-hover:border-blue-400/30">
                    <LogOut className="w-6 h-6 transition-all duration-300 group-hover:text-blue-200" />
                  </div>

                  <span className="relative z-10 hidden mt-3 text-sm font-semibold transition-all duration-300 xl:inline-block xl:mt-0 group-hover:text-white">
                    Logout
                  </span>

                  <div className="absolute right-0 w-1.5 h-10 transition-all duration-300 -translate-y-1/2 rounded-l-full opacity-0 top-1/2 bg-gradient-to-b from-blue-300 to-cyan-400 group-hover:opacity-100 shadow-lg shadow-blue-400/50"></div>

                  <div className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100">
                    <div className="absolute inset-0 transition-transform duration-700 ease-in-out -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:translate-x-full"></div>
                  </div>
                </span>
              </li>
            </ul>
          </div>
        </nav>
      ) : (
        <button onClick={() => setShowAdminNavbar(true)}>Show</button>
      )}
    </>
  );
};

export default AdminNavbar;
