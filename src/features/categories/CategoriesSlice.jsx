import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createCategory,
  deleteCategory,
  updateCategory,
  fetchAllCategories,
} from "./CategoriesApi";

const initialState = {
  status: "idle",
  categories: [],
  errors: null,
};

export const fetchAllCategoriesAsync = createAsyncThunk(
  "categories/fetchAllCategoriesAsync",
  async () => {
    const categories = await fetchAllCategories();
    return categories;
  }
);

export const createCategoryAsync = createAsyncThunk(
  "categories/createCategoryAsync",
  async ({ name }) => {
    const newCategory = await createCategory(name);
    return newCategory;
  }
);

export const deleteCategoryAsync = createAsyncThunk(
  "categories/deleteCategoryAsync",
  async ({ id }) => {
    const category = await deleteCategory(id);
    return category;
  }
);

export const updateCategoryAsync = createAsyncThunk(
  "categories/updateCategoryAsync",
  async ({ id, name }) => {
    const category = await updateCategory(id, name);
    console.log("updated Category", category);
    return category;
  }
);

const categorySlice = createSlice({
  name: "categorySlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategoriesAsync.pending, (state) => {
        state.status = "idle";
      })
      .addCase(fetchAllCategoriesAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.categories = action.payload;
      })
      .addCase(fetchAllCategoriesAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.errors = action.error;
      })
      .addCase(createCategoryAsync.pending, (state) => {
        state.status = "idle";
      })
      .addCase(createCategoryAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.categories = [...state.categories, action.payload];
      })
      .addCase(createCategoryAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.errors = action.error;
      })
      .addCase(deleteCategoryAsync.pending, (state) => {
        state.status = "idle";
      })
      .addCase(deleteCategoryAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.categories = state.categories.filter(
          (category) => category._id !== action.payload._id
        );
      })
      .addCase(deleteCategoryAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.errors = action.error;
      })
      .addCase(updateCategoryAsync.pending, (state) => {
        state.status = "idle";
      })
      .addCase(updateCategoryAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.categories = state.categories.map((category) =>
          category._id === action.payload._id ? action.payload : category
        );
      })
      .addCase(updateCategoryAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.errors = action.error;
      });
  },
});

// exporting selectors
export const selectCategoryStatus = (state) => state.CategoriesSlice.status;
export const selectCategories = (state) => state.CategoriesSlice.categories;
export const selectCategoryErrors = (state) => state.CategoriesSlice.errors;

export default categorySlice.reducer;
