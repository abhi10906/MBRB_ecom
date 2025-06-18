import { IndianRupee, Star, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCartAsync,
  deleteCartItemByIdAsync,
  selectCartItems,
} from "../../cart/CartSlice";
import { toast } from "react-toastify";
import { selectLoggedInUser } from "../../auth/AuthSlice";
import {
  deleteProductByIdAsync,
  removeProductByIdAsync,
  undeleteProductByIdAsync,
} from "../ProductSlice";
import { Button, Tooltip } from "@material-tailwind/react";
import { openModal } from "../../Modals/modalSlice";

const ProductCard2 = ({ product, isAdmin }) => {
  const navigate = useNavigate();
  const loggedInUser = useSelector(selectLoggedInUser);
  const { _id, title, price, thumbnail, rating, weightOptions } = product;
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const [selectedWeightOption, setSelectedWeightOption] = useState(
    weightOptions[0] || {}
  );
  const [isInCart, setIsInCart] = useState(false);
  const [cartItemId, setCartItemId] = useState(null);
  const [adminExpanded, setAdminExpanded] = useState(false); // Toggle admin actions

  // Check if product is already in the cart
  useEffect(() => {
    const cartItem = cartItems.find(
      (item) =>
        item.product._id === _id &&
        item.selectedWeightOption._id === selectedWeightOption._id
    );

    if (cartItem) {
      setIsInCart(true);
      setCartItemId(cartItem._id);
    } else {
      setIsInCart(false);
      setCartItemId(null);
    }
  }, [cartItems, _id, selectedWeightOption]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!loggedInUser) {
      toast("Please login to add items to cart");
      dispatch(openModal({ type: "login" }));
      return;
    }
    const item = {
      user: loggedInUser?._id,
      product: _id,
      quantity: 1,
      selectedWeightOption: selectedWeightOption,
    };
    dispatch(addToCartAsync(item));
  };

  const handleRemoveFromCart = (e) => {
    e.preventDefault();
    if (cartItemId) {
      dispatch(deleteCartItemByIdAsync(cartItemId));
      toast(`${title} removed from cart`);
    }
  };

  const handleWeightChange = (e) => {
    const weightOption = weightOptions.find(
      (opt) => opt._id === e.target.value
    );
    setSelectedWeightOption(weightOption);
  };

  const handleProductRemove = (e) => {
    e.preventDefault();
    const userResponse = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (userResponse) {
      dispatch(removeProductByIdAsync(product._id));
    }
  };

  const handleProductDelete = (e) => {
    e.preventDefault();
    dispatch(deleteProductByIdAsync(product._id));
  };

  const handleProductUnDelete = (e) => {
    e.preventDefault();
    dispatch(undeleteProductByIdAsync(product._id));
  };

  return (
    <Link to={`/sweets/${_id}`}>
      <div className="relative w-full text-black flex flex-col overflow-hidden rounded border border-transparent transition duration-200 hover:bg-secondary/10 hover:border-secondary px-2 py-2 md:py-3 md:px-3">
        {/* Product Image */}
        <div className="relative flex h-48 sm:h-60 md:h-72 lg:h-80 overflow-hidden rounded border">
          <img
            className={`${
              product.isDeleted ? "grayscale" : ""
            } w-full object-cover`}
            src={thumbnail || "https://via.placeholder.com/535x535.png"} // Fallback image if no image is provided
            alt={title}
          />
          <span className="absolute top-0 left-0 m-2 rounded-full bg-cta text-center text-xs sm:text-sm font-medium text-white flex items-center gap-x-1 p-1 px-2 sm:p-2 sm:px-3">
            {rating} <Star className="h-4 w-4 sm:h-5 sm:w-5" />
          </span>
        </div>

        {/* Product Info */}
        <div className="mt-1 md:mt-4">
          <div className="px-[1px]">
            <h5 className="sm:text-lg md:text-xl font-medium tracking-tight text-slate-900">
              {title || "Product Name"}
            </h5>
          </div>

          {!isAdmin && (
            <div className="mt-1 font-semibold flex items-center justify-between">
              <p className="flex items-center text-slate-900">
                <span className="text-base sm:text-lg md:text-xl tracking-tighter flex items-center">
                  <IndianRupee className="h-4 w-4 sm:h-5 sm:w-5" />
                  {selectedWeightOption.price || price || 0}
                </span>
              </p>
            </div>
          )}

          {/* Weight Selector */}
          <div className="my-3" onClick={(e) => e.preventDefault()}>
            <select
              className="border text-xs sm:text-sm bg-secondary/20 border-secondary rounded text-black w-full p-2 cursor-pointer"
              onChange={handleWeightChange}
              value={selectedWeightOption._id}
            >
              {weightOptions &&
                weightOptions.map((opt, index) => (
                  <option key={index} value={opt._id}>
                    {opt.weight + "gm : " + opt.price + "Rs"}
                  </option>
                ))}
            </select>
          </div>

          {/* Add/Remove from Cart Button */}
          {!isAdmin &&
            (isInCart ? (
              <Button
                onClick={handleRemoveFromCart}
                className="w-full flex items-center justify-center rounded bg-ternary px-3 py-2 sm:px-4 sm:py-2.5 text-center text-xs sm:text-sm font-medium text-white"
              >
                Remove from Cart
              </Button>
            ) : (
              <Button
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center rounded bg-secondary px-3 py-2 sm:px-4 sm:py-2.5 text-center text-xs sm:text-sm font-medium text-white "
              >
                Add to Cart
              </Button>
            ))}

          {/* Admin Actions */}
          {isAdmin && (
            <>
              <div className="flex items-center justify-between">
                <Tooltip content="Update">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/admin/product-update/${product._id}`);
                    }}
                    className="text-white w-full bg-secondary grid place-items-center mx-1 py-2 rounded-lg"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                </Tooltip>
                {product.isDeleted ? (
                  <Tooltip content="Show">
                    <button
                      onClick={handleProductUnDelete}
                      className="text-white w-full bg-secondary grid place-items-center mx-1 py-2 rounded-lg"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                  </Tooltip>
                ) : (
                  <Tooltip content="Hide">
                    <button
                      onClick={handleProductDelete}
                      className="text-white w-full bg-secondary grid place-items-center mx-1 py-2 rounded-lg"
                    >
                      <EyeOff className="h-5 w-5" />
                    </button>
                  </Tooltip>
                )}
                <Tooltip content="Delete">
                  <button
                    onClick={handleProductRemove}
                    className="text-white w-full bg-secondary grid place-items-center mx-1 py-2 rounded-lg"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </Tooltip>
              </div>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard2;
