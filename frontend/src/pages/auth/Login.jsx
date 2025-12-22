import React, { useState } from "react";
import { Mail, Lock, Eye, CircleAlert } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../context/authContext";
import { useEffect } from "react";
import axios from "axios";

const FormError = ({ error }) => {
  return (
    <>
      {error && (
        <p className="w-[100%]  text-sm pl-5 rounded mt-2 text-red-600  bg-red-100">
          {error}
        </p>
      )}
    </>
  );
};

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [formErrors, setFromErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const changePasswordType = () => {
    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };
  useEffect(() => {
    if (formData.password === "") {
      setPasswordType("password");
    }
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    setLoading(true);

    const response = await login(formData.email, formData.password);
    console.log(response);
    if (response.success) {
      navigate("/admin/recipes");
    } else {
      setLoading(false);
      if (response.error) {
        setError(response.error);
        setFromErrors(response.formErrors);
      }
    }
  };

  return (
    <div className="flex justify-center w-full min-h-screen p-4 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
      <div className="w-full max-w-md mt-40 space-y-8">
        <div className="p-8 border shadow-2xl bg-white/90 backdrop-blur-sm rounded-xl border-blue-200/50">
          <div className="mb-8 text-center">
            <h2 className="mt-4 text-3xl font-bold text-gray-800">Login </h2>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 mb-4 border border-red-200 rounded-lg bg-red-50">
              <span>
                <CircleAlert className="text-red-400" />
              </span>
              <span className="text-sm text-red-600">{error}</span>
            </div>
          )}

          <div className="flex flex-col space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 pl-10 text-gray-700 placeholder-gray-400 transition-all duration-300 border-2 border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <FormError error={formErrors?.email} />
            </div>

            <div className="">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative ">
                <Lock className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
                {formData.password !== "" && (
                  <Eye
                    className={`absolute w-5 h-5 cursor-pointer right-3 top-3 ${
                      passwordType === "password"
                        ? "text-gray-400 "
                        : "text-blue-400 "
                    } `}
                    onClick={changePasswordType}
                  />
                )}
                <input
                  id="password"
                  name="password"
                  type={`${passwordType}`}
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 pl-10 text-gray-700 placeholder-gray-400 transition-all duration-300 border-2 border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <FormError error={formErrors?.password} />
            </div>

            <button
              type="button"
              onClick={handleLogin}
              disabled={loading}
              className={`flex self-center  ${
                loading
                  ? " bg-gray-400  cursor-not-allowed text-white"
                  : " cursor-pointer bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:ring-blue-500 text-white"
              } justify-center w-[90%] px-4 py-3 text-sm font-medium  transition-all duration-200 transform border border-transparent rounded-lg shadow-lg  focus:outline-none   disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 hover:shadow-xl`}
            >
              {loading ? (
                <div
                  className="flex items-center justify-center gap-2"
                  role="status"
                >
                  <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                  Processing...
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </div>
          <div className="mt-6 text-center">
            <Link
              to="/register"
              className="text-sm font-medium text-blue-400 transition-colors hover:text-blue-300"
            >
              Don't have an account? Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
