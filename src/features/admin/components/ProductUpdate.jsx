import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  clearSelectedProduct,
  fetchProductByIdAsync,
  resetProductUpdateStatus,
  selectProductUpdateStatus,
  selectSelectedProduct,
  updateProductByIdAsync,
} from "../../products/ProductSlice";
import { useForm, useFieldArray } from "react-hook-form";
import { selectBrands } from "../../brands/BrandSlice";
import { selectCategories } from "../../categories/CategoriesSlice";
import { toast } from "react-toastify";
import CloudinaryUploadWidget from "../../products/components/CloudinaryUploadWidget";
import {
  Button,
  Input,
  Select,
  Textarea,
  Typography,
} from "@material-tailwind/react";

export const ProductUpdate = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    control,
  } = useForm();
  const { id } = useParams();
  const dispatch = useDispatch();
  const selectedProduct = useSelector(selectSelectedProduct);
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const productUpdateStatus = useSelector(selectProductUpdateStatus);
  const navigate = useNavigate();
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "weightOptions",
  });

  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [imageUrls, setImageUrls] = useState([""]);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductByIdAsync(id));
    }
  }, [id]);

  useEffect(() => {
    if (productUpdateStatus === "fullfilled") {
      toast("Product Updated");
      navigate("/admin/dashboard");
    } else if (productUpdateStatus === "rejected") {
      toast.error("Error updating product, please try again later");
    }
  }, [productUpdateStatus]);

  useEffect(() => {
    return () => {
      dispatch(clearSelectedProduct());
      dispatch(resetProductUpdateStatus());
    };
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      setValue("title", selectedProduct.title);
      setValue("brand", selectedProduct.brand._id);
      setValue("category", selectedProduct.category._id);
      setValue("description", selectedProduct.description);
      setValue("price", selectedProduct.price);
      setValue("discountPercentage", selectedProduct.discountPercentage);
      setValue("stockQuantity", selectedProduct.stockQuantity);
      setValue("thumbnail", selectedProduct.thumbnail);
      setValue("rating", selectedProduct.rating);
      setValue("ingredients", selectedProduct.ingredients);
      setValue("shelfLife", selectedProduct.shelfLife);
      setValue("piecesPerKg", selectedProduct.piecesPerKg);

      setThumbnailUrl(selectedProduct.thumbnail);
      setImageUrls(selectedProduct.images);

      // Set weight options from the selected product
      if (selectedProduct.weightOptions && !fields.length > 0) {
        selectedProduct.weightOptions.forEach((option) => {
          append({ weight: option.weight, price: option.price });
        });
      }
    }
  }, [selectedProduct, append]);

  const handleProductUpdate = (data) => {
    if (data.weightOptions.length === 0) {
      toast.error("At least one weight option is required.");
      return;
    }
    const productUpdate = {
      ...data,
      _id: selectedProduct._id,
      images: imageUrls,
      thumbnail: thumbnailUrl,
    };
    dispatch(updateProductByIdAsync(productUpdate));
  };

  const handleThumbnailUpload = (imgUrl) => {
    setThumbnailUrl(imgUrl);
  };

  const handleImageUpload = (imgUrl) => {
    setImageUrls((prev) => [...prev, imgUrl]);
  };

  const handleDeleteThumbnail = () => {
    setThumbnailUrl("");
  };

  const handleDeleteImage = (index) => {
    const updatedImages = imageUrls.filter((_, i) => i !== index);
    setImageUrls(updatedImages);
  };

  console.log(selectedProduct);

  return (
    <div className="p-6 flex justify-center items-center">
      {selectedProduct && (
        <form
          onSubmit={handleSubmit(handleProductUpdate)}
          className="w-full max-w-4xl space-y-6"
        >
          {/* Field Area */}
          <div className="space-y-4">
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
                  defaultValue={selectedProduct.brand._id}
                  placeholder={selectedProduct.brand.name}
                  {...register("category", {
                    required: "Category is required",
                  })}
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
                  <p className="text-red-500 text-sm">
                    {errors.category.message}
                  </p>
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
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
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
                  <p className="text-red-500 text-sm">
                    {errors.rating.message}
                  </p>
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
                  <p className="text-red-500 text-sm">
                    {errors.shelfLife.message}
                  </p>
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

            {/* Weight Options */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Weight Options
              </label>
              <div className="space-y-4">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-center space-x-4">
                    <input
                      {...register(`weightOptions[${index}].weight`)}
                      className="w-1/2 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
                      placeholder="Weight"
                    />
                    <input
                      {...register(`weightOptions[${index}].price`)}
                      className="w-1/2 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
                      placeholder="Price"
                    />
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => append({ weight: "", price: "" })}
                className="text-blue-500"
              >
                Add Weight Option
              </button>
            </div>
            <div>
              <Typography variant="h6" className="font-semibold mb-2">
                Thumbnail
              </Typography>
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

            <div>
              <Typography variant="h6" className="font-semibold mb-2">
                Product Images
              </Typography>
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
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Button type="button" onClick={() => navigate("/admin/dashboard")}>
              Cancel
            </Button>
            <Button type="submit">Update Product</Button>
          </div>
        </form>
      )}
    </div>
  );
};
