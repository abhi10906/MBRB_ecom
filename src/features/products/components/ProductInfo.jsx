import React, { useEffect, useState } from "react";
import { Button, Rating } from "@material-tailwind/react";
import Quantity from "./Quantity";
import ProductImageSwiper from "./ProductImageSwiper";
import { Truck, Clock, IndianRupee, Share2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import ProductList2 from "./ProductList2";
import {
  clearSelectedProduct,
  fetchProductByIdAsync,
  resetProductFetchStatus,
  selectProductFetchStatus,
  selectSelectedProduct,
} from "../ProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "../../auth/AuthSlice";
import { add, format } from "date-fns";
import {
  addToCartAsync,
  deleteCartItemByIdAsync,
  resetCartItemAddStatus,
  resetCartItemRemoveStatus,
  selectCartItemAddStatus,
  selectCartItemRemoveStatus,
  selectCartItems,
  updateCartItemByIdAsync,
} from "../../cart/CartSlice";
import {
  fetchReviewsByProductIdAsync,
  resetReviewFetchStatus,
} from "../../review/ReviewSlice";
import {
  resetWishlistItemAddStatus,
  resetWishlistItemDeleteStatus,
} from "../../wishlist/WishlistSlice";
import { toast } from "react-toastify";
import { ProductInfoSkeleton } from "./Skeletons";
import { openModal } from "../../Modals/modalSlice";
const ProductInfo = () => {
  const { id } = useParams();
  const product = useSelector(selectSelectedProduct);
  const loggedInUser = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  console.log(cartItems);
  const cartItemAddStatus = useSelector(selectCartItemAddStatus);
  const cartItemRemoveStatus = useSelector(selectCartItemRemoveStatus);
  const [productQuantity, setQuantity] = useState(1);
  const [selectedWeightOption, setSelectedWeightOption] = useState({});
  const [cartItemId, setCartItemId] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    if (product && product.weightOptions?.length > 0) {
      setSelectedWeightOption(product.weightOptions[0]);
    }
  }, [product]);

  const isProductAlreadyInCart = !!cartItemId; // True if cartItemId is found

  const productFetchStatus = useSelector(selectProductFetchStatus);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);
  console.log(productFetchStatus);
  let isMounted = true;
  useEffect(() => {
    if (id && isMounted) {
      dispatch(fetchProductByIdAsync(id));
    }

    return () => {
      isMounted = false;
    };
  }, [id, dispatch]);

  useEffect(() => {
    if (cartItemAddStatus === "fulfilled") {
      toast("Product added to cart");
    } else if (cartItemAddStatus === "rejected") {
      toast.error("Error adding product to cart, please try again later");
    }
  }, [cartItemAddStatus]);

  useEffect(() => {
    if (product && cartItems.length > 0 && selectedWeightOption) {
      const cartItem = cartItems.find(
        (item) =>
          item.product._id === product._id &&
          item.selectedWeightOption._id === selectedWeightOption._id
      );

      if (cartItem) {
        setCartItemId(cartItem._id);
      } else {
        setCartItemId(null);
      }
    } else {
      setCartItemId(null);
    }
  }, [cartItems, product, selectedWeightOption]);

  useEffect(() => {
    if (cartItemRemoveStatus === "fulfilled") {
      toast("Product removed from cart");
      setCartItemId(null); // Reset the cart item ID
    } else if (cartItemRemoveStatus === "rejected") {
      toast.error("Error removing product from cart, please try again later");
    }
  }, [cartItemRemoveStatus]);

  useEffect(() => {
    if (productFetchStatus === "rejected") {
      toast.error("Error fetching product details, please try again later");
    }
  }, [productFetchStatus]);
  useEffect(() => {
    return () => {
      dispatch(clearSelectedProduct());
      dispatch(resetProductFetchStatus());
      dispatch(resetReviewFetchStatus());
      dispatch(resetWishlistItemDeleteStatus());
      dispatch(resetWishlistItemAddStatus());
      dispatch(resetCartItemAddStatus());
      dispatch(resetCartItemRemoveStatus());
      dispatch(resetCartItemAddStatus());
    };
  }, []);

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!loggedInUser) {
      toast("Please login to add items to cart");
      dispatch(openModal({ type: "login" }));
      return;
    }
    const item = {
      user: loggedInUser._id,
      product: id,
      quantity: productQuantity,
      selectedWeightOption: selectedWeightOption,
    };
    dispatch(addToCartAsync(item));
    setQuantity(1);
  };

  const handleAddQty = () => {
    const update = { _id: cartItemId, quantity: productQuantity + 1 };
    dispatch(updateCartItemByIdAsync(update));
    setQuantity((prev) => prev + 1);
  };
  const handleRemoveQty = () => {
    if (productQuantity === 1) {
      dispatch(deleteCartItemByIdAsync(cartItemId));
    } else {
      const update = { _id: cartItemId, quantity: productQuantity - 1 };
      dispatch(updateCartItemByIdAsync(update));
      setQuantity((prev) => prev - 1);
    }
  };

  const handleProductRemove = () => {
    if (cartItemId) {
      dispatch(deleteCartItemByIdAsync(cartItemId));
    }
  };

  const handleWeightChange = (weightOptionId) => {
    const weightOption = product.weightOptions.find(
      (opt) => opt._id === weightOptionId
    );
    setSelectedWeightOption(weightOption);
  };

  const handleBuyNowClick = () => {
    navigate(
      `/checkout?single=true&product=${id}&quantity=${productQuantity}&weightOption=${selectedWeightOption._id}`
    );
  };
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: product.title,
          text: `Check out this amazing product: ${product.title}`,
          url: window.location.href,
        })
        .then(() => toast("Product shared successfully"))
        .catch((error) => console.log("Error sharing product:", error));
    } else {
      // Fallback for desktop: Copy URL to clipboard
      navigator.clipboard.writeText(window.location.href).then(() => {
        toast("Product link copied to clipboard!");
      });
    }
  };

  return (
    <section class="text-gray-600 body-font overflow-hidden">
      {productFetchStatus === "fulfilled" && product && (
        <div class="px-5 py-5 md:py-10 lg:py-16 xl:py-24">
          <div class="xl:w-4/5 mx-auto lg:flex">
            <div>
              <ProductImageSwiper
                images={[product.thumbnail, ...product.images]}
              />
            </div>
            <div className="flex-1 lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 class="text-sm title-font text-gray-500 tracking-widest">
                {product.category.name}
              </h2>
              <div className="flex items-center justify-between">
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                  {product.title}
                </h1>
                <button
                  onClick={handleShare}
                  className="flex items-center justify-center bg-primary p-2 rounded-full hover:bg-primary-dark transition duration-200"
                >
                  <Share2 color="black" />
                </button>
              </div>
              <div class="flex mb-4">
                <span class="flex items-center">
                  <Rating value={4} readonly />
                  <span class="text-gray-600 ml-3">
                    {product.rating} Reviews
                  </span>
                </span>
              </div>

              {/* Product Pricing and weight section */}

              <div class="flex mt-5 p-3 pb-5">
                <p class="title-font font-medium text-2xl text-gray-900 flex items-center">
                  <IndianRupee /> {selectedWeightOption.price}
                </p>
                <select
                  onChange={(e) => handleWeightChange(e.target.value)}
                  class="ml-5 lg:ml-auto text-sm border-2 border-secondary w-3/4 bg-transparent rounded"
                >
                  {product.weightOptions.map((opt, ind) => {
                    return (
                      <option key={ind} value={opt._id}>
                        {opt.weight}gm - {opt.price}Rs
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className=" border-b pb-5 border-cta">
                <div className="flex gap-x-5 items-center text-black">
                  <div>Quantity</div>
                  <div className="flex items-center">
                    <button
                      onClick={handleRemoveQty}
                      className="border border-secondary rounded-l px-3 py-1 hover:bg-secondary hover:text-white"
                    >
                      -
                    </button>
                    <p className="border-y border-secondary px-3 py-1">
                      {productQuantity}
                    </p>
                    <button
                      onClick={handleAddQty}
                      className="border border-secondary rounded-r px-3 py-1 hover:bg-secondary hover:text-white"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row gap-2 mt-5 w-full">
                {isProductAlreadyInCart ? (
                  <div className="flex flex-1 gap-x-2">
                    <Button
                      onClick={() => navigate("/cart")}
                      className="flex-1 w-full ml-auto text-center text-white bg-secondary border-0 py-4 tracking-widest px-6 rounded"
                    >
                      View Cart
                    </Button>
                    <Button
                      onClick={handleProductRemove}
                      className="flex-1 w-full ml-auto text-center text-white bg-ternary border-0 py-4 tracking-widest px-6 rounded"
                    >
                      Remove from Cart
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={handleAddToCart}
                    className="flex-1 w-full ml-auto text-center text-white bg-ternary border-0 py-4 tracking-widest px-6 rounded"
                  >
                    Add to Cart
                  </Button>
                )}
              </div>
              <p class="leading-relaxed mt-5">{product.description}</p>
              <ul className="py-3">
                <li className="py-2">
                  <span className="font-semibold">Ingredients</span>:{" "}
                  {product.ingredients}
                </li>
                <li className="py-2">
                  <span className="font-semibold">Shelf Life</span>:
                  {product.shelfLife}
                </li>
                <li className="py-2">
                  <span className="font-semibold">Pieces(1kg)</span>:{" "}
                  {product.piecesPerKg}
                </li>
              </ul>
              <div className="flex flex-col items-center justify-center gap-y-2 border-t border-cta pt-4 mt-4 text-center text-ternary">
                <div className="flex items-center gap-x-2 text-lg font-medium">
                  <Clock className="text-secondary h-6 w-6" />
                  <p className="text-slate-700">
                    Order now to get it delivered by{" "}
                    <span className="font-semibold text-secondary">
                      {format(add(new Date(), { days: 12 }), "do MMMM, yyyy")}
                    </span>
                  </p>
                  <Truck className="text-secondary h-6 w-6" />
                </div>
                <p className="text-sm text-gray-500 italic">
                  Delivery dates are estimated and may vary.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {productFetchStatus === "idle" && (
        <div class="px-5 py-5 md:py-10 lg:py-16 xl:py-24">
          <ProductInfoSkeleton />
        </div>
      )}
      <ProductList2 isHome={false} />
    </section>
  );
};

export default ProductInfo;
