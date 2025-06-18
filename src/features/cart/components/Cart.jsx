import React, { useEffect } from "react";
import { CartItem } from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  resetCartItemRemoveStatus,
  selectCartItemRemoveStatus,
  selectCartItems,
  selectCartStatus,
} from "../CartSlice";
import { CartItemSkeleton } from "../../products/components/Skeletons";
import { SHIPPING, TAXES } from "../../../constants";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Button } from "@material-tailwind/react";
import { IndianRupee } from "lucide-react";

export const Cart = ({ checkout }) => {
  const items = useSelector(selectCartItems);
  const subtotal = items.reduce(
    (acc, item) => item.selectedWeightOption.price * item.quantity + acc,
    0
  );
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const navigate = useNavigate();
  const cartItemRemoveStatus = useSelector(selectCartItemRemoveStatus);
  const dispatch = useDispatch();
  const cartFetchStatus = useSelector(selectCartStatus); // Cart fetch status

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    if (cartItemRemoveStatus === "fulfilled") {
      toast.success("Product removed from cart", { autoClose: 2000 });
    } else if (cartItemRemoveStatus === "rejected") {
      toast.error("Error removing product from cart. Please try again later.");
    }
  }, [cartItemRemoveStatus]);

  useEffect(() => {
    return () => {
      dispatch(resetCartItemRemoveStatus());
    };
  }, []);

  const handleCheckoutClick = () => {
    if (items.length == 0) {
      toast("Your cart is empty.");
      return;
    }
    navigate("/checkout");
  };

  return (
    <div
      className={`flex flex-col items-center ${checkout ? "py-0" : "pb-24"}`}
    >
      <div className={`w-full ${checkout ? "px-0" : "px-4"} mt-4 max-w-4xl`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white shadow-xl rounded-lg p-6 space-y-6"
        >
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Your Shopping Cart
          </h2>

          {/* Cart items */}
          <div className="space-y-6">
            {cartFetchStatus === "pending" ? (
              Array.from({ length: 3 }).map((_, index) => (
                <CartItemSkeleton key={index} />
              ))
            ) : items.length ? (
              items.map((item) => (
                <CartItem
                  key={item._id}
                  id={item._id}
                  title={item.product.title}
                  brand={item.product.brand.name}
                  category={item.product.category}
                  selectedWeightOption={item.selectedWeightOption}
                  quantity={item.quantity}
                  thumbnail={item.product.thumbnail}
                  stockQuantity={item.product.stockQuantity}
                  productId={item.product._id}
                  isCheckout={checkout}
                />
              ))
            ) : (
              <p className="text-gray-500 text-center">Your cart is empty.</p>
            )}
          </div>

          {/* Subtotal */}
          <div className="flex flex-col space-y-4">
            {checkout ? (
              <div className="space-y-4">
                <div className="flex justify-between text-lg">
                  <span>Subtotal</span>
                  <span>
                    <IndianRupee size={20} className="inline" />
                    {subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-lg">
                  <span>Shipping</span>
                  <span>
                    <IndianRupee size={20} className="inline" />
                    {SHIPPING.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-lg">
                  <span>Taxes</span>
                  <span>
                    <IndianRupee size={20} className="inline" />
                    {TAXES.toFixed(2)}
                  </span>
                </div>
                <hr />
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>
                    <IndianRupee size={20} className="inline" />
                    {(subtotal + SHIPPING + TAXES).toFixed(2)}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-medium">Subtotal</p>
                  <p>Total items in cart: {totalItems}</p>
                  <p className="text-gray-500 text-sm">
                    Shipping and taxes will be calculated at checkout.
                  </p>
                </div>
                <div>
                  <p className="text-xl font-bold flex items-center">
                    <IndianRupee size={20} />
                    {subtotal.toFixed(2)}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Checkout or Continue Shopping */}
          {!checkout && (
            <div className="flex flex-col md:flex-row gap-5 justify-between items-center mt-8">
              <button
                onClick={handleCheckoutClick}
                className="w-full py-3 px-6 bg-cta text-white font-semibold rounded-lg shadow hover:bg-cta/70 transition duration-300"
              >
                Proceed to Checkout
              </button>

              <Link to="/sweets" className="ml-4">
                <Button
                  className="w-max py-3 px-6 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition duration-300"
                  variant="outlined"
                >
                  Continue Shopping
                </Button>
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
