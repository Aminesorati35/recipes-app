import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faPlus,
  faTag,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import authService from "../../auth/authService";

const ListCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/categories/index"
      );
      setCategories(response.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setMessage({
        type: "error",
        text: "Failed to load categories. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

   const handleDelete = async (id) => {
    

    try {
      const response = await authService.authenticatedRequest(
        `http://127.0.0.1:8000/api/categories/destroy/${id}`,{
          method:'DELETE'
        }
      );
      setCategories(categories.filter((category) => category.id !== id));
      console.log(response)
    } catch (error) {
      console.error("Delete failed", error);
    }
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center w-full">
        <FontAwesomeIcon
          icon={faSpinner}
          className="text-4xl text-blue-500 animate-spin mb-4"
        />
        <p className="text-xl font-semibold text-gray-700">
          Loading categories...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-10 flex justify-center">
      <div className="w-8/10">
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Categories
          </h1>
          <p className="text-gray-600 text-lg">
            Browse all available recipe categories
          </p>
        </div>

        {message.text && (
          <div
            className={`mb-6 p-4 rounded-xl ${
              message.type === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="mb-8 flex justify-end">
          <Link
            to="/admin/categories/create"
            className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition shadow-lg hover:shadow-xl"
          >
            <FontAwesomeIcon icon={faPlus} />
            Add New Category
          </Link>
        </div>

        {categories.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <FontAwesomeIcon
              icon={faTag}
              className="text-6xl text-gray-300 mb-4"
            />
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              No Categories Found
            </h3>
            <p className="text-gray-500 mb-6">
              Start by adding your first category
            </p>
            <Link
              to="/admin/categories/create"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
            >
              <FontAwesomeIcon icon={faPlus} />
              Add Category
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-100"
              >
                <div className="relative h-56 w-full overflow-hidden group">
                  <img
                    src={`http://127.0.0.1:8000/storage/${category.image}`}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="absolute top-4 right-4 flex gap-2">
                    <Link
                      to={`/admin/categories/${category.id}`}
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600 transition transform hover:scale-105 shadow-lg"
                      aria-label="Edit category"
                    >
                      <FontAwesomeIcon icon={faEdit} size="sm" />
                    </Link>
                    <button
                      onClick={() => handleDelete(category.id)}
                      disabled={deletingId === category.id}
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Delete category"
                    >
                      {deletingId === category.id ? (
                        <FontAwesomeIcon
                          icon={faSpinner}
                          className="animate-spin"
                        />
                      ) : (
                        <FontAwesomeIcon icon={faTrash} size="sm" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <FontAwesomeIcon
                      icon={faTag}
                      className="text-blue-500 text-sm"
                    />
                    <h2 className="text-xl font-bold text-gray-900 capitalize line-clamp-1">
                      {category.name}
                    </h2>
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {category.description || "No description provided"}
                  </p>

                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex justify-between text-sm text-gray-500">
                      <span className="font-medium">Recipes</span>
                      <span>{category.recipes_count || 0}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListCategories;
