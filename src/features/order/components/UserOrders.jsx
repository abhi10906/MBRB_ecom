import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderByUserIdAsync,
  resetOrderFetchStatus,
  selectOrderFetchStatus,
  selectOrders,
} from "../OrderSlice";
import { selectLoggedInUser } from "../../auth/AuthSlice";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
  IconButton,
  Spinner,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import {
  addToCartAsync,
  resetCartItemAddStatus,
  selectCartItemAddStatus,
  selectCartItems,
} from "../../cart/CartSlice";
import Lottie from "lottie-react";
import { loadingAnimation, noOrdersAnimation } from "../../../assets";
import { toast } from "react-toastify";
import { ArrowLeft, IndianRupee } from "lucide-react";
import { format, addDays } from "date-fns";

export const UserOrders = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectLoggedInUser);
  const orders = useSelector(selectOrders);
  const cartItems = useSelector(selectCartItems);
  const orderFetchStatus = useSelector(selectOrderFetchStatus);
  const cartItemAddStatus = useSelector(selectCartItemAddStatus);
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    dispatch(getOrderByUserIdAsync(loggedInUser?._id));
  }, [dispatch, loggedInUser]);

  useEffect(() => {
    if (cartItemAddStatus === "fulfilled") {
      toast.success("Product added to cart");
    } else if (cartItemAddStatus === "rejected") {
      toast.error("Error adding product to cart, please try again later");
    }
  }, [cartItemAddStatus]);

  useEffect(() => {
    if (orderFetchStatus === "rejected") {
      toast.error("Error fetching orders, please try again later");
    }
  }, [orderFetchStatus]);

  useEffect(() => {
    return () => {
      dispatch(resetOrderFetchStatus());
      dispatch(resetCartItemAddStatus());
    };
  }, [dispatch]);

  const handleAddToCart = (product) => {
    const item = {
      user: loggedInUser._id,
      product: product.product._id,
      quantity: 1,
      selectedWeightOption: product.selectedWeightOption,
    };
    dispatch(addToCartAsync(item));
  };

  return (
    <div className="flex flex-col items-center">
      {orderFetchStatus === "pending" ? (
        <div className="w-80 h-screen flex justify-center items-center">
          <Lottie animationData={loadingAnimation} />
        </div>
      ) : (
        <div className="w-full max-w-5xl p-4">
          {/* Heading and Navigation */}
          <div className="flex items-center gap-4 mb-6">
            <IconButton
              onClick={() => navigate("/")}
              variant="text"
              component={Link}
              to="/"
            >
              <ArrowLeft className="h-6 w-6" />
            </IconButton>
            <div>
              <Typography variant="h4" className="font-semibold">
                Order History
              </Typography>
              <Typography variant="paragraph" className="text-gray-600">
                Check the status of recent orders, manage returns, and discover
                similar products.
              </Typography>
            </div>
          </div>

          {/* Orders */}
          <div className="space-y-6">
            {orders && orders.length > 0 ? (
              orders.map((order) => (
                <Card
                  className="shadow-lg border border-gray-200"
                  key={order._id}
                >
                  <CardBody>
                    {/* Order Details */}
                    <div className="flex flex-wrap justify-between mb-4">
                      <div>
                        <Typography variant="paragraph" className="font-medium">
                          Order Number:
                        </Typography>
                        <Typography className="text-gray-600">
                          {order._id}
                        </Typography>
                      </div>
                      <div>
                        <Typography variant="paragraph" className="font-medium">
                          Date Placed:
                        </Typography>
                        <Typography className="text-gray-600">
                          {new Date(order.createdAt).toDateString()}
                        </Typography>
                      </div>
                      <div>
                        <Typography variant="paragraph" className="font-medium">
                          Total Amount:
                        </Typography>
                        <Typography className="text-gray-600">
                          ${order.total}
                        </Typography>
                      </div>
                      <div>
                        <Typography variant="paragraph" className="font-medium">
                          Items:
                        </Typography>
                        <Typography className="text-gray-600">
                          {order.item.length}
                        </Typography>
                      </div>
                    </div>

                    {/* Products */}
                    <div className="space-y-4">
                      {order.item.map((product) => (
                        <div
                          key={product.product._id}
                          className="flex flex-wrap items-start gap-4 border-t pt-4"
                        >
                          <img
                            src={product.product.thumbnail}
                            alt={product.product.title}
                            className="sm:w-32 sm:h-32 object-contain"
                          />
                          <div className="flex-1">
                            <Typography variant="h6" className="font-medium">
                              {product.product.title}
                            </Typography>
                            <Typography className="text-gray-600">
                              Brand: {product.product.brand.name}
                            </Typography>
                            <Typography className="text-gray-600">
                              Qty: {product.quantity}
                            </Typography>
                            <Typography className="text-gray-600">
                              Weight: {product.selectedWeightOption.weight}g
                            </Typography>
                            <Typography className="flex items-center">
                              <IndianRupee className="w-4 h-4" />
                              {product.selectedWeightOption.price}
                            </Typography>
                            <div className="mt-2 flex gap-2">
                              <Link to={`/sweets/${product.product._id}`}>
                                <Button size="sm" variant="outlined">
                                  View Product
                                </Button>
                              </Link>
                              {cartItems.some(
                                (cartItem) =>
                                  cartItem.product._id === product.product._id
                              ) ? (
                                <Button size="sm" component={Link} to="/cart">
                                  Already in Cart
                                </Button>
                              ) : (
                                <Button
                                  size="sm"
                                  onClick={() => handleAddToCart(product)}
                                >
                                  Buy Again
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardBody>
                  <CardFooter className="flex justify-between">
                    <Typography className="text-gray-600">
                      Status: {order.status}
                    </Typography>

                    <Typography className="text-gray-600">
                      Estimated Delivery:{" "}
                      {format(
                        addDays(new Date(order.createdAt), 10), // Add 10 days to the order creation date
                        "MMMM d, yyyy" // Format the date
                      )}
                    </Typography>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="flex flex-col items-center space-y-4">
                <Lottie
                  animationData={noOrdersAnimation}
                  className="w-80 h-80"
                />
                <Typography variant="h6" className="text-gray-600 text-center">
                  Oh! Looks like you haven't been shopping lately.
                </Typography>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
