import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faImage,
  faList,
  faAlignLeft,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router";
import authService from "../../auth/authService";

const AddRecipe = () => {
   const navigate = useNavigate();
  const [recipeData, setRecipeData] = useState({ title: "", description: "",category_id:"" });
  const [ingredients, setIngredients] = useState([{ name: "", quantity: "" }]);
  const [informations, setInformations] = useState([{ name: "", quantity: "" }]);
  const [steps, setSteps] = useState([{ description: "" }]);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: "", text: "" });
  const [categories, setCategories] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipeData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: "" }]);
  };

  const removeIngredient = (index) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((_, i) => i !== index));
    }
  };

  const updateIngredient = (index, field, value) => {
    const updated = [...ingredients];
    updated[index][field] = value;
    setIngredients(updated);
  };

  const addStep = () => {
    setSteps([...steps, { description: "" }]);
  };

  const removeStep = (index) => {
    if (steps.length > 1) {
      setSteps(steps.filter((_, i) => i !== index));
    }
  };
  const addInformation = () => {
    setInformations([...informations, { name: "",quantity:"" }]);
  };

  const removeInformation = (index) => {
    if (informations.length > 1) {
      setInformations(informations.filter((_, i) => i !== index));
    }
  };
  const updateInformations = (index, field, value) => {
    const updated = [...informations];
    updated[index][field] = value;
    setInformations(updated);
  };

  const updateStep = (index, value) => {
    const updated = [...steps];
    updated[index].description = value;
    setSteps(updated);
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

    const formData = new FormData();
    formData.append("title", recipeData.title.trim());
    formData.append("description", recipeData.description.trim());

    if (image) {
      formData.append("image", image);
    }
    formData.append("category_id", recipeData.category_id);

    ingredients.forEach((ing, index) => {
      formData.append(`ingredients[${index}][name]`, ing.name.trim());
      formData.append(`ingredients[${index}][quantity]`, ing.quantity.trim());
    });

    informations.forEach((inf, index) => {
      formData.append(`informations[${index}][name]`, inf.name.trim());
      formData.append(`informations[${index}][quantity]`, inf.quantity.trim());
    });
    

    steps.forEach((step, index) => {
      formData.append(`steps[${index}][step_number]`, index + 1);
      formData.append(`steps[${index}][description]`, step.description.trim());
    });

    try {
      const response = await authService.authenticatedRequest(
        "http://localhost:8000/api/recipes/store",
        {
          method: "POST",
          body: formData,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setSubmitMessage({
        type: "success",
        text: "Recipe created successfully!",
      });
      navigate("/admin/recipes");
      console.log("Response:", response.data);
    } catch (error) {
      if (error.response?.data?.errors) {
        setFormErrors(error.response.data.errors);
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
  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/categories/index"
        );
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    getCategories();
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 w-full md:w-7/10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Add New Recipe
          </h1>
          <p className="text-gray-600 text-lg">
            Fill out the form below to share your delicious recipe
          </p>
        </div>

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
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <label className="block text-lg font-semibold text-gray-800 mb-3">
              Recipe Title *
            </label>
            <input
              type="text"
              name="title"
              value={recipeData.title}
              onChange={handleInputChange}
              placeholder="e.g. Spicy Chicken Wings"
              className={`w-full p-4 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                formErrors.title
                  ? "border-red-300 bg-red-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              aria-invalid={!!formErrors.title}
              aria-describedby={formErrors.title ? "title-error" : undefined}
            />
            {formErrors.title && (
              <p id="title-error" className="mt-2 text-sm text-red-600">
                {formErrors.title}
              </p>
            )}
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <label className="block text-lg font-semibold text-gray-800 mb-3">
              Recipe Cateogry *
            </label>
            <select
              name="category_id"
              id=""
              onChange={handleInputChange}
              className={`w-full p-4 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                formErrors.category
                  ? "border-red-300 bg-red-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <option value="">None</option>
              {categories.map((cat)=>(
                <option value={cat.id}>{cat.name}</option>
              ))}
            </select>
            {formErrors.category && (
              <p id="title-error" className="mt-2 text-sm text-red-600">
                {formErrors.category}
              </p>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <label className="block text-lg font-semibold text-gray-800 mb-3">
              Description *
            </label>
            <textarea
              name="description"
              value={recipeData.description}
              onChange={handleInputChange}
              rows="4"
              placeholder="Share what makes this recipe special..."
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

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <label className="block text-lg font-semibold text-gray-800 mb-3">
              Recipe Image
            </label>
            <div className="space-y-4">
              {imagePreview ? (
                <div className="relative rounded-xl overflow-hidden group">
                  <img
                    src={imagePreview}
                    alt="Recipe preview"
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
                  htmlFor="image-upload"
                  className="flex flex-col items-center justify-center border-3 border-dashed border-gray-300 rounded-2xl p-10 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition group"
                >
                  <FontAwesomeIcon
                    icon={faImage}
                    className="text-5xl text-gray-400 group-hover:text-blue-400 mb-4 transition"
                  />
                  <span className="text-gray-600 font-medium text-lg">
                    Click to upload an image
                  </span>
                  <span className="text-gray-500 text-sm mt-2">
                    JPEG, PNG, or WebP (Max 5MB)
                  </span>
                </label>
              )}
              <input
                id="image-upload"
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

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                <FontAwesomeIcon icon={faList} className="text-blue-500" />
                Ingredients
              </h2>
              <button
                type="button"
                onClick={addIngredient}
                className="cursor-pointer px-5 py-2.5 bg-blue-50 text-blue-600 rounded-xl font-semibold hover:bg-blue-100 transition flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faPlus} />
                Add Ingredient
              </button>
            </div>

            <div className="space-y-4">
              {ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start"
                >
                  <div className="flex flex-col">
                    <input
                      type="text"
                      value={ingredient.name}
                      onChange={(e) =>
                        updateIngredient(index, "name", e.target.value)
                      }
                      placeholder="Ingredient name"
                      className={`w-full p-4 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                        formErrors[`ingredients.${index}.name`]
                          ? "border-red-300"
                          : "border-gray-200"
                      }`}
                    />
                    {formErrors[`ingredients.${index}.name`] && (
                      <p className="mt-1 text-sm text-red-600">
                        {formErrors[`ingredients.${index}.name`]}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col ">
                    <div className="flex gap-5">
                      <input
                        type="text"
                        value={ingredient.quantity}
                        onChange={(e) =>
                          updateIngredient(index, "quantity", e.target.value)
                        }
                        placeholder="Quantity (e.g., 200g, 2 cups)"
                        className={`w-full p-4 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition hover:border-gray-300 ${
                          formErrors[`ingredients.${index}.quantity`]
                            ? "border-red-300"
                            : "border-gray-200"
                        }`}
                      />
                      {ingredients.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeIngredient(index)}
                          className="w-12 flex-shrink-0 flex items-center justify-center rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition"
                          aria-label="Remove ingredient"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      )}
                    </div>
                    {formErrors[`ingredients.${index}.quantity`] && (
                      <p className="mt-1 text-sm text-red-600">
                        {formErrors[`ingredients.${index}.quantity`]}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {formErrors.ingredients && (
              <p className="text-sm text-red-600">{formErrors.ingredients}</p>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                <FontAwesomeIcon
                  icon={faAlignLeft}
                  className="text-green-500"
                />
                Cooking Steps
              </h2>
              <button
                type="button"
                onClick={addStep}
                className="cursor-pointer px-5 py-2.5 bg-green-50 text-green-600 rounded-xl font-semibold hover:bg-green-100 transition flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faPlus} />
                Add Step
              </button>
            </div>

            <div className="space-y-6">
              {steps.map((step, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-700">
                      Step {index + 1}
                    </span>
                    {steps.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeStep(index)}
                        className="text-sm text-red-600 hover:text-red-700 flex items-center gap-2"
                        aria-label="Remove step"
                      >
                        <FontAwesomeIcon icon={faTrash} size="sm" />
                        Remove
                      </button>
                    )}
                  </div>
                  <div>
                    <textarea
                      value={step.description}
                      onChange={(e) => updateStep(index, e.target.value)}
                      rows="3"
                      placeholder="Describe this step in detail..."
                      className={`w-full p-4 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-y min-h-[100px] ${
                        formErrors[`steps.${index}.description`]
                          ? "border-red-300"
                          : "border-gray-200"
                      }`}
                    />
                    {formErrors[`steps.${index}.description`] && (
                      <p className="mt-1 text-sm text-red-600">
                        {formErrors[`steps.${index}.description`]}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                <FontAwesomeIcon icon={faList} className="text-blue-500" />
                Informations
              </h2>
              <button
                type="button"
                onClick={addInformation}
                className="cursor-pointer px-5 py-2.5 bg-blue-50 text-blue-600 rounded-xl font-semibold hover:bg-blue-100 transition flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faPlus} />
                Add Information
              </button>
            </div>

            <div className="space-y-4">
              {informations.map((information, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start"
                >
                  <div className="flex flex-col">
                    <input
                      type="text"
                      value={information.name}
                      onChange={(e) =>
                        updateInformations(index, "name", e.target.value)
                      }
                      placeholder="Information name"
                      className={`w-full p-4 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                        formErrors[`ingredients.${index}.name`]
                          ? "border-red-300"
                          : "border-gray-200"
                      }`}
                    />
                    {formErrors[`ingredients.${index}.name`] && (
                      <p className="mt-1 text-sm text-red-600">
                        {formErrors[`ingredients.${index}.name`]}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col ">
                    <div className="flex gap-5">
                      <input
                        type="text"
                        value={information.quantity}
                        onChange={(e) =>
                          updateInformations(index, "quantity", e.target.value)
                        }
                        placeholder="Quantity (e.g., 210.9 kcal, 8.5g)"
                        className={`w-full p-4 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition hover:border-gray-300 ${
                          formErrors[`ingredients.${index}.quantity`]
                            ? "border-red-300"
                            : "border-gray-200"
                        }`}
                      />
                      {informations.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeInformation(index)}
                          className="w-12 flex-shrink-0 flex items-center justify-center rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition"
                          aria-label="Remove ingredient"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      )}
                    </div>
                    {formErrors[`ingredients.${index}.quantity`] && (
                      <p className="mt-1 text-sm text-red-600">
                        {formErrors[`ingredients.${index}.quantity`]}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {formErrors.ingredients && (
              <p className="text-sm text-red-600">{formErrors.ingredients}</p>
            )}
          </div>

          <div className="text-center pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`inline-flex items-center gap-3 px-10 py-4 rounded-2xl font-semibold text-lg transition ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : " cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              }`}
            >
              <FontAwesomeIcon icon={faPlus} />
              {isSubmitting ? "Creating..." : "Create Recipe"}
            </button>
            <p className="text-gray-500 text-sm mt-4">* Required fields</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;
