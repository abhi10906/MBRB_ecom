import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
  Typography,
  Radio,
  IconButton,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  addAddressAsync,
  selectAddressAddStatus,
  selectAddressStatus,
  selectAddresses,
} from "../../address/AddressSlice";
import { selectLoggedInUser } from "../../auth/AuthSlice";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  createOrderAsync,
  selectCurrentOrder,
  selectOrderStatus,
} from "../../order/OrderSlice";
import { resetCartByUserIdAsync, selectCartItems } from "../../cart/CartSlice";

import { SHIPPING, TAXES } from "../../../constants";
import { motion } from "framer-motion";
import { Cart } from "../../cart/components/Cart";
import {
  clearSelectedProduct,
  fetchProductByIdAsync,
  selectSelectedProduct,
} from "../../products/ProductSlice";
import { toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";
import AddressManagement from "../../user/components/AddressManagement";

export const Checkout = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isSingleCheckout = searchParams.get("single") === "true";
  const productId = searchParams.get("product");
  const queryQuantity = parseInt(searchParams.get("quantity"), 10);
  const queryWeightOption = searchParams.get("weightOption");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedInUser = useSelector(selectLoggedInUser);
  const product = useSelector(selectSelectedProduct);
  const cartItems = useSelector(selectCartItems);
  const orderStatus = useSelector(selectOrderStatus);
  const currentOrder = useSelector(selectCurrentOrder);
  const [selectedAddress, setSelectedAddress] = useState();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("COD");
  const [singleProductItem, setSingleProductItem] = useState(null);

  // Calculate order total for single product or cart
  const orderTotal = isSingleCheckout
    ? singleProductItem?.total || 0
    : cartItems.reduce(
        (acc, item) => item.selectedWeightOption.price * item.quantity + acc,
        0
      );

  useEffect(() => {
    if (isSingleCheckout && productId) {
      dispatch(fetchProductByIdAsync(productId));
    }
  }, [dispatch, isSingleCheckout, productId]);

  useEffect(() => {
    if (product && isSingleCheckout) {
      const weightOption = product.weightOptions.find(
        (option) => option._id === queryWeightOption
      );
      if (weightOption) {
        setSingleProductItem({
          product,
          selectedWeightOption: weightOption,
          quantity: queryQuantity,
          total: weightOption.price * queryQuantity, // Ensure total is calculated
          user: loggedInUser._id,
        });
      }
    }
  }, [product, isSingleCheckout, queryQuantity, queryWeightOption]);

  useEffect(() => {
    if (currentOrder && currentOrder?._id) {
      dispatch(resetCartByUserIdAsync(loggedInUser?._id));
      navigate(`/order-success/${currentOrder?._id}`);
    }
  }, [currentOrder, dispatch, loggedInUser, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch]);
  console.log(selectedAddress);
  const handleCreateOrder = () => {
    if (!selectedAddress) {
      toast.error("Please select an address");
      return;
    }
    if (cartItems.length === 0) {
      toast.error("Please add items to cart and then proceed to checkout");
      navigate("/sweets");
      return;
    }
    const order = {
      user: loggedInUser._id,
      item: cartItems,
      address: selectedAddress,
      paymentMode: selectedPaymentMethod,
      total: orderTotal + SHIPPING + TAXES, // Add shipping and taxes
    };
    dispatch(createOrderAsync(order));
  };

  return (
    <div className="w-full flex md:justify-center flex-wrap p-2 md:p-6 gap-10 mb-20 mt-6 overflow-hidden">
      {/* Left Section */}
      <div className="flex flex-col gap-6 w-full md:w-auto">
        {/* Heading */}
        <div className="flex items-center gap-4 justify-center w-full relative">
          <motion.div
            whileHover={{ x: -5 }}
            className="flex items-center gap-4 justify-between w-full absolute left-2"
          >
            <IconButton>
              <Link to="/cart">
                <ArrowLeft />
              </Link>
            </IconButton>
          </motion.div>
          <Typography
            className="w-max whitespace-nowrap text-center"
            variant="h4"
          >
            Shipping Information
          </Typography>
        </div>

        {/* Address Management */}
        <AddressManagement checkout={true} setAddress={setSelectedAddress} />

        {/* Payment Methods */}
        <div className="flex flex-col gap-4">
          <Typography variant="h6">Payment Methods</Typography>
          <Typography variant="small" color="gray">
            Please select a payment method
          </Typography>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <Radio
                name="paymentMethod"
                value="COD"
                checked={selectedPaymentMethod === "COD"}
                onChange={() => setSelectedPaymentMethod("COD")}
              />
              <Typography>Cash On Delivery (COD)</Typography>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col gap-4 w-full md:w-auto">
        <Typography variant="h4">Order Summary</Typography>

        <Cart checkout={true} />

        <Button
          fullWidth
          onClick={handleCreateOrder}
          disabled={orderStatus === "pending"}
        >
          Pay and Order
        </Button>
      </div>
    </div>
  );
};
