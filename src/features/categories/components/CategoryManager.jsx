import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  IconButton,
  Alert,
} from "@material-tailwind/react";
import { Plus, Pencil, Trash2, X, AlertCircle } from "lucide-react";
import {
  fetchAllCategoriesAsync,
  createCategoryAsync,
  updateCategoryAsync,
  deleteCategoryAsync,
  selectCategories,
  selectCategoryStatus,
  selectCategoryErrors,
} from "../CategoriesSlice";

const CategoryManager = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const status = useSelector(selectCategoryStatus);
  const errors = useSelector(selectCategoryErrors);

  const [open, setOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    dispatch(fetchAllCategoriesAsync());
  }, [dispatch]);

  const handleOpen = () => {
    setOpen(!open);
    setNewCategory("");
    setEditingId(null);
  };

  const addOrUpdateCategory = async () => {
    if (newCategory.trim()) {
      const confirmationMessage =
        editingId !== null
          ? "You are about to update a category. This is a crucial change. Are you sure you want to proceed?"
          : "You are about to create a new category. This is a crucial change. Are you sure you want to proceed?";

      if (window.confirm(confirmationMessage)) {
        if (editingId !== null) {
          dispatch(updateCategoryAsync({ id: editingId, name: newCategory }));
          setEditingId(null);
          alert("Category updated successfully.");
        } else {
          dispatch(createCategoryAsync({ name: newCategory }));
          alert("Category created successfully.");
        }
        setNewCategory("");
      }
    }
  };

  const deleteCategory = async (id) => {
    const confirmationMessage =
      "You are about to delete a category. This is a crucial change. Are you sure you want to proceed?";
    if (window.confirm(confirmationMessage)) {
      dispatch(deleteCategoryAsync({ id }));
      alert("Category deleted successfully.");
    }
  };

  const startEdit = (category) => {
    setEditingId(category._id);
    setNewCategory(category.name);
  };

  const isLoading = status === "idle";

  return (
    <>
      <Button
        onClick={handleOpen}
        className="flex items-center gap-2 transition-colors h-[3rem]"
      >
        <Plus size={20} />
        Manage Categories
      </Button>

      <Dialog
        size="sm"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardHeader
            variant="gradient"
            className="grid h-16 place-items-center mb-4 bg-black"
          >
            <Typography
              variant="h5"
              color="white"
              className="flex items-center gap-2"
            >
              <Plus size={20} />
              {editingId ? "Edit Category" : "Add Category"}
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            {errors && (
              <Alert
                color="red"
                icon={<AlertCircle className="h-6 w-6" />}
                className="mb-4"
              >
                {errors.message}
              </Alert>
            )}

            <div className="flex gap-2">
              <Input
                label="Category Name"
                size="lg"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="flex-1"
                disabled={isLoading}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addOrUpdateCategory();
                  }
                }}
              />
              <Button
                size="sm"
                onClick={addOrUpdateCategory}
                disabled={isLoading || !newCategory.trim()}
              >
                {editingId !== null ? "Update" : "Add"}
              </Button>
            </div>

            <div className="mt-4 space-y-2 max-h-[300px] overflow-y-auto">
              {categories.map((category, ind) => (
                <div
                  key={ind}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Typography className="font-medium">
                    {category.name}
                  </Typography>
                  <div className="flex gap-2">
                    <IconButton
                      variant="text"
                      color="black"
                      onClick={() => startEdit(category)}
                      disabled={isLoading}
                      className="hover:bg-blue-50"
                    >
                      <Pencil size={16} />
                    </IconButton>
                    <IconButton
                      variant="text"
                      color="red"
                      onClick={() => deleteCategory(category._id)}
                      disabled={isLoading}
                      className="hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                    </IconButton>
                  </div>
                </div>
              ))}
              {categories.length === 0 && (
                <Typography
                  variant="small"
                  color="gray"
                  className="text-center py-4"
                >
                  No categories found. Add one to get started.
                </Typography>
              )}
            </div>
          </CardBody>
          <CardFooter className="pt-0 flex justify-end">
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="flex items-center gap-2"
              disabled={isLoading}
            >
              <X size={16} />
              Close
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
};

export default CategoryManager;
