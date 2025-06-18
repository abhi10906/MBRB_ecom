import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  addProductAsync,
  resetProductAddStatus,
  selectProductAddStatus,
} from "../../products/ProductSlice";
import { useForm, useFieldArray } from "react-hook-form";
import { selectBrands } from "../../brands/BrandSlice";
import { selectCategories } from "../../categories/CategoriesSlice";
import { toast } from "react-toastify";
import CloudinaryUploadWidget from "../../products/components/CloudinaryUploadWidget";
import { Button } from "@material-tailwind/react";

export const AddProduct = () => {
  const [thumbnailPublicId, setThumbnailPublicId] = useState("");
  const [imagesPublicIds, setImagesPublicIds] = useState([]);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [imageUrls, setImageUrls] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "weightOptions",
  });

  const dispatch = useDispatch();
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const productAddStatus = useSelector(selectProductAddStatus);
  const navigate = useNavigate();

  useEffect(() => {
    if (productAddStatus === "fullfilled") {
      reset();
      toast("New product added");
      navigate("/admin/dashboard");
    } else if (productAddStatus === "rejected") {
      toast.error("Error adding product, please try again later");
    }
  }, [productAddStatus]);

  useEffect(() => {
    return () => {
      dispatch(resetProductAddStatus());
    };
  }, []);

  const handleAddProduct = (data) => {

    if (data.weightOptions.length === 0) {
      toast.error("At least one weight option is required.");
      return;
    }

    const newProduct = {
      ...data,
      images: imagesPublicIds,
      thumbnail: thumbnailPublicId,
    };

    dispatch(addProductAsync(newProduct));
  };

  const handleThumbnailUpload = (imgUrl) => {
    setThumbnailPublicId(imgUrl);
    setThumbnailUrl(imgUrl);
  };

  const handleImageUpload = (imgUrl) => {
    setImagesPublicIds((prev) => [...prev, imgUrl]);
    setImageUrls((prev) => [...prev, imgUrl]);
  };

  const handleDeleteThumbnail = () => {
    setThumbnailPublicId("");
    setThumbnailUrl("");
  };

  const handleDeleteImage = (index) => {
    const updatedImages = imagesPublicIds.filter((_, i) => i !== index);
    const updatedImageUrls = imageUrls.filter((_, i) => i !== index);
    setImagesPublicIds(updatedImages);
    setImageUrls(updatedImageUrls);
  };

  return (
    <div className="flex justify-center p-4">
      <form
        className="w-full max-w-4xl space-y-6"
        onSubmit={handleSubmit(handleAddProduct)}
      >
        {/* Title */}
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Brand and Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Brand
            </label>
            <select
              {...register("brand", { required: "Brand is required" })}
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
            >
              <option value="">Select Brand</option>
              {brands.map((brand) => (
                <option key={brand._id} value={brand._id}>
                  {brand.name}
                </option>
              ))}
            </select>
            {errors.brand && (
              <p className="text-red-500 text-sm">{errors.brand.message}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Category
            </label>
            <select
              {...register("category", { required: "Category is required" })}
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            rows="4"
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Weight Options */}
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Weight Options
          </label>
          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center space-x-4">
                <input
                  {...register(`weightOptions[${index}].weight`, {
                    required: "Weight is required",
                  })}
                  placeholder="Weight (e.g., 250g)"
                  className="w-1/2 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
                />
                <input
                  {...register(`weightOptions[${index}].price`, {
                    required: "Price is required",
                  })}
                  placeholder="Price (e.g., 500)"
                  type="number"
                  className="w-1/2 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
                />
                <button
                  type="button"
                  className="px-3 py-1 text-white bg-red-500 rounded-md"
                  onClick={() => remove(index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <Button
              type="button"
              className="mt-2 px-4 py-2 "
              onClick={() => append({ weight: "", price: "" })}
            >
              Add Weight Option
            </Button>
          </div>
        </div>

        {/* Stock and Discount */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Stock Quantity
            </label>
            <input
              type="number"
              {...register("stockQuantity", {
                required: "Stock Quantity is required",
              })}
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
            />
            {errors.stockQuantity && (
              <p className="text-red-500 text-sm">
                {errors.stockQuantity.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Discount Percentage
            </label>
            <input
              type="number"
              {...register("discountPercentage", {
                required: "Discount percentage is required",
              })}
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
            />
            {errors.discountPercentage && (
              <p className="text-red-500 text-sm">
                {errors.discountPercentage.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Rating
            </label>
            <input
              type="number"
              {...register("rating", {
                required: "rating is required",
              })}
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
            />
            {errors.rating && (
              <p className="text-red-500 text-sm">{errors.rating.message}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Ingredients
            </label>
            <input
              type="text"
              {...register("ingredients", {
                required: "ingredients is required",
              })}
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
            />
            {errors.ingredients && (
              <p className="text-red-500 text-sm">
                {errors.ingredients.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Shelf Life
            </label>
            <input
              type="text"
              {...register("shelfLife", {
                required: "shelfLife is required",
              })}
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
            />
            {errors.shelfLife && (
              <p className="text-red-500 text-sm">{errors.shelfLife.message}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Pieces/Kg
            </label>
            <input
              type="string"
              {...register("piecesPerKg", {
                required: "piecesPerKg is required",
              })}
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
            />
            {errors.piecesPerKg && (
              <p className="text-red-500 text-sm">
                {errors.piecesPerKg.message}
              </p>
            )}
          </div>
        </div>

        {/* Thumbnail Image */}
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Thumbnail Image
          </label>
          <CloudinaryUploadWidget onUpload={handleThumbnailUpload} />
          {thumbnailUrl && (
            <div className="mt-2">
              <img
                src={thumbnailUrl}
                alt="Thumbnail"
                className="w-32 h-32 object-cover"
              />
              <button
                type="button"
                onClick={handleDeleteThumbnail}
                className="text-red-500 mt-2"
              >
                Delete Thumbnail
              </button>
            </div>
          )}
        </div>

        {/* Product Images */}
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Product Images
          </label>
          <CloudinaryUploadWidget onUpload={handleImageUpload} />
          <div className="mt-2">
            {imageUrls.map((url, index) => (
              <div key={index} className="flex items-center space-x-4">
                <img
                  src={url}
                  alt={`Product Image ${index + 1}`}
                  className="w-32 h-32 object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteImage(index)}
                  className="text-red-500"
                >
                  Delete Image
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-4">
          <Button type="submit" className="w-full text-white py-2 rounded-md">
            Add Product
          </Button>
        </div>
      </form>
    </div>
  );
};
