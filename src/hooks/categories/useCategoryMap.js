import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectCategories } from "../../features/categories/CategoriesSlice";

export const useCategoryMap = () => {
  const categories = useSelector(selectCategories);
  const categoryMap = useMemo(() => {
    return new Map(categories.map((category) => [category._id, category.name]));
  }, [categories]);

  return categoryMap;
};
