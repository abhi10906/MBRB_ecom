import { axiosi } from "../../config/axios";

export const fetchAllCategories = async () => {
  try {
    const res = await axiosi.get("/categories");
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createCategory = async (name) => {
  try {
    const res = await axiosi.post("/categories", { name });
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteCategory = async (id) => {
  try {
    const res = await axiosi.delete(`/categories/${id}`);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateCategory = async (id, name) => {
  try {
    const res = await axiosi.patch(`/categories/${id}`, { name });
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};