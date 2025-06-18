import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsAsync, selectProducts } from "../ProductSlice";
import { Option, Select } from "@material-tailwind/react";
import { selectLoggedInUser } from "../../auth/AuthSlice";

const sortOptions = [
  { name: "Price: low to high", sort: "price", order: "asc" },
  { name: "Price: high to low", sort: "price", order: "desc" },
];

const Filter = ({ searchText }) => {
  const [sort, setSort] = useState(null);
  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectLoggedInUser);
  const products = useSelector(selectProducts);

  // Ref to track the previous filters
  const prevFilters = useRef({ sort, searchText });
  const initialRender = useRef(true); // Track if it's the initial render

  useEffect(() => {
    // If it's the initial render, don't call the API again
    if (initialRender.current) {
      const finalFilters = {
        sort,
        searchText,
        user: loggedInUser ? loggedInUser.isAdmin : false,
      };
      dispatch(fetchProductsAsync(finalFilters));
      initialRender.current = false;
      return;
    }

    // Only call the API if the filters have actually changed
    if (
      prevFilters.current.sort !== sort ||
      prevFilters.current.searchText !== searchText
    ) {
      const finalFilters = {
        sort,
        searchText,
        user: loggedInUser ? loggedInUser.isAdmin : false,
      };
      dispatch(fetchProductsAsync(finalFilters));

      // Update the previous filters
      prevFilters.current = { sort, searchText };
    }
  }, [sort, searchText, loggedInUser, dispatch]);

  return (
    <div className="lg:ml-5 mb-6 max-w-48">
      <Select
        onChange={(value) => {
          // Store only the necessary values (sort and order)
          setSort(sortOptions[value]);
        }}
        variant="outlined"
        label="Sort by"
        className="text-black"
      >
        <Option value={null}>Reset</Option>
        <Option value={0}>Price: low to high</Option>
        <Option value={1}>Price: high to low</Option>
      </Select>
    </div>
  );
};

export default Filter;
