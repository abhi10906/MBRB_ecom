import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createOrder,
  getAllOrders,
  getOrderByText,
  getOrderByUserId,
  updateOrderById,
} from "./OrderApi";

const initialState = {
  status: "idle",
  orderUpdateStatus: "idle",
  orderFetchStatus: "idle",
  orders: [],
  currentOrder: null,
  errors: null,
  successMessage: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalOrders: 0,
    itemsPerPage: 5,
    statusCounts: {},
  },
};

export const getAllOrdersAsync = createAsyncThunk(
  "orders/getAllOrdersAsync",
  async (page) => {
    const response = await getAllOrders(page);
    return response;
  }
);

export const createOrderAsync = createAsyncThunk(
  "orders/createOrderAsync",
  async (order) => {
    const createdOrder = await createOrder(order);
    return createdOrder;
  }
);

export const getOrderByUserIdAsync = createAsyncThunk(
  "orders/getOrderByUserIdAsync",
  async (id) => {
    const orders = await getOrderByUserId(id);
    return orders;
  }
);

export const updateOrderByIdAsync = createAsyncThunk(
  "orders/updateOrderByIdAsync",
  async (update) => {
    const updatedOrder = await updateOrderById(update);
    return updatedOrder;
  }
);

export const getOrderByTextAsync = createAsyncThunk(
  "orders/getOrderByTextAsync",
  async (update) => {
    const updatedOrder = await getOrderByText(update);
    return updatedOrder;
  }
);

const orderSlice = createSlice({
  name: "orderSlice",
  initialState,
  reducers: {
    resetCurrentOrder: (state) => {
      state.currentOrder = null;
    },
    resetOrderUpdateStatus: (state) => {
      state.orderUpdateStatus = "idle";
    },
    resetOrderFetchStatus: (state) => {
      state.orderFetchStatus = "idle";
    },
    setCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.orders.push(action.payload);
        state.currentOrder = action.payload;
      })
      .addCase(createOrderAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.errors = action.error;
      })

      .addCase(getAllOrdersAsync.pending, (state) => {
        state.orderFetchStatus = "pending";
      })
      .addCase(getAllOrdersAsync.fulfilled, (state, action) => {
        state.orderFetchStatus = "fulfilled";
        state.orders = action.payload.orders;
        state.pagination = action.payload.pagination;
      })
      .addCase(getAllOrdersAsync.rejected, (state, action) => {
        state.orderFetchStatus = "rejected";
        state.errors = action.error;
      })

      .addCase(getOrderByUserIdAsync.pending, (state) => {
        state.orderFetchStatus = "pending";
      })
      .addCase(getOrderByUserIdAsync.fulfilled, (state, action) => {
        state.orderFetchStatus = "fulfilled";
        state.orders = action.payload;
      })
      .addCase(getOrderByUserIdAsync.rejected, (state, action) => {
        state.orderFetchStatus = "rejected";
        state.errors = action.error;
      })
      .addCase(getOrderByTextAsync.pending, (state) => {
        state.orderFetchStatus = "pending";
      })
      .addCase(getOrderByTextAsync.fulfilled, (state, action) => {
        state.orderFetchStatus = "fulfilled";
        state.orders = action.payload;
      })
      .addCase(getOrderByTextAsync.rejected, (state, action) => {
        state.orderFetchStatus = "rejected";
        state.errors = action.error;
      })

      .addCase(updateOrderByIdAsync.pending, (state) => {
        state.orderUpdateStatus = "pending";
      })
      .addCase(updateOrderByIdAsync.fulfilled, (state, action) => {
        state.orderUpdateStatus = "fulfilled";
        const index = state.orders.findIndex(
          (order) => order._id === action.payload._id
        );
        state.orders[index] = action.payload;
      })
      .addCase(updateOrderByIdAsync.rejected, (state, action) => {
        state.orderUpdateStatus = "rejected";
        state.errors = action.error;
      });
  },
});

// exporting reducers
export const {
  resetCurrentOrder,
  resetOrderUpdateStatus,
  resetOrderFetchStatus,
  setCurrentPage,
} = orderSlice.actions;

// exporting selectors
export const selectOrderStatus = (state) => state.OrderSlice.status;
export const selectPagination = (state) => state.OrderSlice.pagination;
export const selectOrders = (state) => state.OrderSlice.orders;
export const selectOrdersErrors = (state) => state.OrderSlice.errors;
export const selectOrdersSuccessMessage = (state) =>
  state.OrderSlice.successMessage;
export const selectCurrentOrder = (state) => state.OrderSlice.currentOrder;
export const selectOrderUpdateStatus = (state) =>
  state.OrderSlice.orderUpdateStatus;
export const selectOrderFetchStatus = (state) =>
  state.OrderSlice.orderFetchStatus;

export default orderSlice.reducer;
