import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteCartItemByIdAsync, updateCartItemByIdAsync } from "../CartSlice";
import { IndianRupee, Trash2 } from "lucide-react";
import { useCategoryMap } from "../../../hooks/categories/useCategoryMap";

export const CartItem = ({
  id,
  thumbnail,
  title,
  category,
  brand,
  quantity,
  stockQuantity,
  productId,
  selectedWeightOption,
  isCheckout,
}) => {
  const dispatch = useDispatch();
  const categoryMap = useCategoryMap();
  const handleAddQty = () => {
    const update = { _id: id, quantity: quantity + 1 };
    dispatch(updateCartItemByIdAsync(update));
  };

  const handleRemoveQty = () => {
    if (quantity === 1) {
      dispatch(deleteCartItemByIdAsync(id));
    } else {
      const update = { _id: id, quantity: quantity - 1 };
      dispatch(updateCartItemByIdAsync(update));
    }
  };

  const handleProductRemove = () => {
    dispatch(deleteCartItemByIdAsync(id));
  };

  return (
    <div className="flex flex-wrap justify-between items-center bg-gray-50 p-4 pr-6 rounded-lg shadow hover:shadow-lg transition duration-300">
      {/* Thumbnail and Product Info */}
      <div className="flex items-center w-full md:w-2/3">
        <Link to={`/sweets/${productId}`} className="w-20 h-20 mr-2">
          <img
            src={thumbnail}
            alt={`${title} image`}
            className="w-full h-full object-cover rounded-lg"
          />
        </Link>
        <div className="flex flex-col w-full">
          {/* Product Title */}
          <Link
            to={`/sweets/${productId}`}
            className="text-base font-semibold text-gray-800 hover:underline truncate"
          >
            {title}
          </Link>
          {/* Brand and Category */}
          <p className="text-sm text-gray-500">
            Brand: <span className="text-gray-700">{brand}</span>
          </p>
          <p className="text-sm text-gray-500">
            Category:{" "}
            <span className="text-gray-700">{categoryMap.get(category)}</span>
          </p>
          {/* Selected Weight Option */}
          <p className="text-sm text-gray-500">
            Weight:{" "}
            <span className="text-gray-700">
              {selectedWeightOption.weight}g
            </span>
          </p>
          <p className="text-sm text-gray-500">
            Price per unit:{" "}
            <span className="text-gray-700">
              <IndianRupee size={16} className="inline" />{" "}
              {selectedWeightOption.price.toFixed(2)}
            </span>
          </p>
        </div>
      </div>

      {/* Quantity and Actions */}
      <div className="flex flex-wrap items-center justify-between w-full md:w-1/3 mt-4 md:mt-0">
        <div className="flex gap-x-2 items-center w-full md:w-auto">
          {/* Quantity Controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleRemoveQty}
              className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
            >
              -
            </button>
            <span className="font-semibold">{quantity}</span>
            <button
              onClick={handleAddQty}
              className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
            >
              +
            </button>
          </div>

          {/* Total Price */}
          <p className="text-base font-semibold flex items-center md:mt-0 pr-6">
            <IndianRupee size={18} className="inline" />
            <span className="ml-1">
              {selectedWeightOption.price * quantity}
            </span>
          </p>
        </div>
        {/* Remove Icon */}
        <div className="w-full md:w-auto ml-auto mt-2 flex justify-end">
          <button
            onClick={handleProductRemove}
            className="text-red-500 hover:text-red-600 transition duration-300"
          >
            <Trash2 size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};
