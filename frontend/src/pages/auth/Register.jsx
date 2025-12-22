import React, { useEffect, useState } from "react";
import { Lock, User, Mail, Phone, MapPin, Eye } from "lucide-react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { useAuth } from "../../context/authContext";

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

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formErrors, setFromErrors] = useState();
  const [passwordTypes, setPasswordTypes] = useState({
    password: "password",
    password_confirmation: "password",
  });
  const changePasswordType = (field) => {
    setPasswordTypes((prev) => ({
      ...prev,
      [field]: prev[field] === "password" ? "text" : "password",
    }));
  };
  useEffect(() => {
    if (formData.password === "") {
      setPasswordTypes((prev) => ({
        ...prev,
        password: "password",
      }));
    }
    if (formData.password_confirmation === "") {
      setPasswordTypes((prev) => ({
        ...prev,
        password_confirmation: "password",
      }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    setLoading(true);
    const response = await register(formData);
    console.log(response);
    if (response.success) {
      navigate("/");
    } else {
      setLoading(false);
      if (response?.error?.response?.data?.errors) {
        setFromErrors(response.error.response.data.errors);
      } else {
        setError("Registration failed");
      }
    }
  };

  return (
    <div className="flex justify-center w-full min-h-screen p-4 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
      <div className="w-full max-w-4xl space-y-8 mt-30">
        <div className="p-3 px-5 border shadow-2xl bg-white/90 backdrop-blur-sm rounded-xl border-blue-200/50">
          <div className="mb-8 text-center">
            <h2 className="mt-4 text-3xl font-bold text-gray-800">Register</h2>
            <p className="mt-2 text-sm text-gray-600">Create your account</p>
          </div>

          {error && (
            <div className="flex items-center p-3 mb-6 border border-red-200 rounded-lg bg-red-50">
              <span className="text-sm text-red-600">{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <div className="relative">
                <User className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-3 py-2 pl-10 text-gray-700 placeholder-gray-400 transition-all duration-300 border-2 border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <FormError error={formErrors?.username?.[0]} />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
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
              <FormError error={formErrors?.email?.[0]} />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
                {formData.password !== "" && (
                  <Eye
                    className={`absolute w-5 h-5 cursor-pointer right-3 top-3 ${
                      passwordTypes.password === "password"
                        ? "text-gray-400 "
                        : "text-blue-400 "
                    } `}
                    onClick={() => changePasswordType("password")}
                  />
                )}
                <input
                  id="password"
                  name="password"
                  type={passwordTypes.password}
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 pl-10 text-gray-700 placeholder-gray-400 transition-all duration-300 border-2 border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <FormError error={formErrors?.password?.[0]} />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password_confirmation"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div className="relative">
                {formData.password_confirmation !== "" && (
                  <Eye
                    className={`absolute w-5 h-5 cursor-pointer right-3 top-3 ${
                      passwordTypes.password_confirmation === "password"
                        ? "text-gray-400 "
                        : "text-blue-400 "
                    } `}
                    onClick={() => changePasswordType("password_confirmation")}
                  />
                )}

                <Lock className="absolute w-5 h-5 text-gray-400 left-3 top-3" />

                <input
                  type={passwordTypes.password_confirmation}
                  id="password_confirmation"
                  name="password_confirmation"
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  className="w-full px-3 py-2 pl-10 text-gray-700 placeholder-gray-400 transition-all duration-300 border-2 border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white"
                  placeholder="Confirm your password"
                  required
                />
              </div>
              <FormError error={formErrors?.password?.[0]} />
            </div>
          </div>

          <div className="flex justify-center mt-8 ">
            <button
              type="button"
              onClick={handleRegister}
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
                "Sign Up"
              )}
            </button>
          </div>

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-800"
            >
              Already have an account? Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
