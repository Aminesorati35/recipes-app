import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faImage,
  faTag,
  faAlignLeft,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router";
import authService from "../../auth/authService";

const AddCategory = () => {
  const navigate = useNavigate()
  const [categoryData, setCategoryData] = useState({
    name: "",
    description: "",
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: "", text: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear errors for this field
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    setImagePreview(imageUrl);
    setImage(file);
    setFormErrors((prev) => ({ ...prev, image: null }));
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitMessage({ type: "", text: "" });
    setIsSubmitting(true);
    setFormErrors({});

    const formData = new FormData();
    formData.append("name", categoryData.name.trim());
    formData.append("description", categoryData.description.trim());

    if (image) {
      formData.append("image", image);
    }

    try {
      const response =  await authService.authenticatedRequest(
        "http://localhost:8000/api/categories/store",
        {
          method: "POST",
          body: formData,
          headers: { "Content-Type": "multipart/form-data" },
        });
      console.log(response)
      navigate('/admin/categories')
    } catch (error) {
      if (error.response?.data?.errors) {
        // Convert Laravel validation errors format to match our structure
        const errors = {};
        Object.keys(error.response.data.errors).forEach(key => {
          errors[key] = error.response.data.errors[key][0];
        });
        setFormErrors(errors);
        setSubmitMessage({
          type: "error",
          text: "Please fix the errors above",
        });
      } else {
        setSubmitMessage({
          type: "error",
          text: "An error occurred. Please try again.",
        });
      }
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 w-full md:w-7/10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Add New Category
          </h1>
          <p className="text-gray-600 text-lg">
            Create a new category to organize your content
          </p>
        </div>

        {/* Submit Message */}
        {submitMessage.text && (
          <div
            className={`mb-6 p-4 rounded-xl ${
              submitMessage.type === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {submitMessage.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Category Name */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <label className="block text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <FontAwesomeIcon icon={faTag} className="text-blue-500" />
              Category Name *
            </label>
            <input
              type="text"
              name="name"
              value={categoryData.name}
              onChange={handleInputChange}
              placeholder="e.g. Appetizers, Desserts, Main Course"
              className={`w-full p-4 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                formErrors.name
                  ? "border-red-300 bg-red-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              aria-invalid={!!formErrors.name}
              aria-describedby={formErrors.name ? "name-error" : undefined}
            />
            {formErrors.name && (
              <p id="name-error" className="mt-2 text-sm text-red-600">
                {formErrors.name}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <label className="block text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <FontAwesomeIcon icon={faAlignLeft} className="text-green-500" />
              Description *
            </label>
            <textarea
              name="description"
              value={categoryData.description}
              onChange={handleInputChange}
              rows="4"
              placeholder="Describe what this category includes..."
              className={`w-full p-4 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-y min-h-[120px] ${
                formErrors.description
                  ? "border-red-300 bg-red-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              aria-invalid={!!formErrors.description}
              aria-describedby={
                formErrors.description ? "description-error" : undefined
              }
            />
            {formErrors.description && (
              <p id="description-error" className="mt-2 text-sm text-red-600">
                {formErrors.description}
              </p>
            )}
          </div>

          {/* Image Upload */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <label className="block text-lg font-semibold text-gray-800 mb-3">
              Category Image
            </label>
            <div className="space-y-4">
              {imagePreview ? (
                <div className="relative rounded-xl overflow-hidden group">
                  <img
                    src={imagePreview}
                    alt="Category preview"
                    className="w-full h-64 md:h-80 object-cover rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition transform hover:scale-105 shadow-lg"
                    aria-label="Remove image"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="category-image-upload"
                  className="flex flex-col items-center justify-center border-3 border-dashed border-gray-300 rounded-2xl p-10 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition group"
                >
                  <FontAwesomeIcon
                    icon={faImage}
                    className="text-5xl text-gray-400 group-hover:text-blue-400 mb-4 transition"
                  />
                  <span className="text-gray-600 font-medium text-lg">
                    Click to upload a category image
                  </span>
                  <span className="text-gray-500 text-sm mt-2">
                    JPEG, PNG, or WebP (Max 5MB)
                  </span>
                </label>
              )}
              <input
                id="category-image-upload"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageChange}
                className="hidden"
              />
              {formErrors.image && (
                <p className="text-sm text-red-600">{formErrors.image}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`inline-flex items-center gap-3 px-10 py-4 rounded-2xl font-semibold text-lg transition ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              }`}
            >
              <FontAwesomeIcon icon={faPlus} />
              {isSubmitting ? "Creating..." : "Create Category"}
            </button>
            <p className="text-gray-500 text-sm mt-4">* Required fields</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;