import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MoveRight, Package } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Alert,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import ProductCard2 from "./ProductCard2";
import {
  selectProductFetchStatus,
  selectProducts,
  fetchRandomProductsAsync,
  resetProductFetchStatus,
} from "../ProductSlice";
import { ProductSkeleton } from "./Skeletons";

export const ProductFetchSkeletonLoader = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {[...Array(4)].map((_, index) => (
      <ProductSkeleton key={index} />
    ))}
  </div>
);

const ProductList2 = ({ isHome = true }) => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  let productFetchStatus = useSelector(selectProductFetchStatus);

  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      if (!products || products.length < 4) {
        dispatch(fetchRandomProductsAsync());
      }
      productFetchStatus = true;
      hasFetched.current = true; // Mark as fetched
    }
  }, [dispatch]);

  const renderContent = () => {
    switch (productFetchStatus) {
      case "pending":
        return <ProductFetchSkeletonLoader />;
      case "rejected":
        return (
          <Alert
            variant="gradient"
            color="red"
            className="mx-auto max-w-md text-center mt-8"
            icon={<Package className="h-6 w-6" />}
          >
            <Typography variant="h6" color="white">
              Failed to load products. Kindly refresh to try again.
            </Typography>
          </Alert>
        );
      case "fulfilled":
        return (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4">
              {products &&
                products.slice(0,4).map((product) => (
                  <ProductCard2 key={product._id} product={product} />
                ))}
            </div>

            <div className="mt-8 text-center xl:hidden">
              <Link
                to="/sweets"
                className="inline-flex items-center gap-2 text-lg font-medium text-gray-900 hover:text-blue-500 transition-all duration-300 border-b border-transparent hover:border-blue-500 pb-1"
              >
                View All Products
                <MoveRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </>
        );
      case "idle":
        return (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4">
              {products &&
                products.map((product) => (
                  <ProductCard2 key={product._id} product={product} />
                ))}
            </div>

            <div className="mt-8 text-center xl:hidden">
              <Link
                to="/sweets"
                className="inline-flex items-center gap-2 text-lg font-medium text-gray-900 hover:text-blue-500 transition-all duration-300 border-b border-transparent hover:border-blue-500 pb-1"
              >
                View All Products
                <MoveRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <section className="py-10 px-2 md:py-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4 md:mb-5 lg:mb-8 xl:mb-12 border-b border-gray-200 pb-2">
          <Typography
            variant="h2"
            className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
          >
            {isHome ? "Our Best Sellers" : "Related Products"}
          </Typography>

          <Link
            to="/sweets"
            className="hidden xl:inline-flex items-center gap-3 text-lg font-medium text-gray-900 hover:text-blue-500 transition-all duration-300 group"
          >
            View Collection
            <MoveRight className="h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-2" />
          </Link>
        </div>

        {renderContent()}
      </div>
    </section>
  );
};

export default ProductList2;
