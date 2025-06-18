import React, { useEffect, useState } from "react";
import Filter from "../../products/components/Filter";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProductFetchStatus,
  selectProducts,
  selectProductTotalResults,
} from "../../products/ProductSlice";
import ProductCard2 from "../../products/components/ProductCard2";
import CategoryManager from "../../categories/components/CategoryManager";
export const AdminDashBoard = () => {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({});
  const dispatch = useDispatch();

  // Redux state selectors
  const products = useSelector(selectProducts);
  const totalResults = useSelector(selectProductTotalResults);
  const productFetchStatus = useSelector(selectProductFetchStatus);

  return (
    <div className="py-10 lg:px-5">
      <div className="px-5 mt-5 flex justify-between gap-x-2">
        <Filter />
        <CategoryManager />
      </div>
      <div className="lg:px-20 w-full mt-5">
        <div>
          {/* Loading Spinner */}
          {productFetchStatus === "pending" && (
            <div className="flex justify-center mt-4">
              <div className="animate-spin rounded-full border-t-4 border-blue-500 w-12 h-12" />
            </div>
          )}

          {/* Product Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-2 md:gap-x-5 gap-y-7 mt-5">
            {productFetchStatus === "fulfilled" &&
              products.map((product) => (
                <ProductCard2
                  key={product._id}
                  product={product}
                  isAdmin={true}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
