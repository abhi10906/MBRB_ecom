import { axiosi } from "../../config/axios";

export const createOrder = async (order) => {
  try {
    const res = await axiosi.post("/orders", order);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getOrderByUserId = async (id) => {
  try {
    const res = await axiosi.get(`/orders/user/${id}`);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getOrderByText = async (text) => {
  try {
    const res = await axiosi.get(`/orders/${text}`);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getAllOrders = async (page) => {
  try {
    const res = await axiosi.get(`/orders?page=${page}`);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateOrderById = async (update) => {
  try {
    const res = await axiosi.patch(`/orders/${update._id}`, update);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
