// src/components/product/ProductDetails.jsx
import { Rating, Typography } from "@material-tailwind/react";
import { IndianRupee } from "lucide-react";

export const ProductDetails = ({
  product,
  selectedWeightOption,
  onWeightChange,
}) => {
  return (
    <div>
      <Typography variant="small" color="gray" className="font-normal">
        {product.category.name}
      </Typography>

      <Typography variant="h2" color="blue-gray" className="mb-2">
        {product.title}
      </Typography>

      <div className="flex items-center gap-4 mb-6">
        <Rating value={product.rating} readonly />
        <Typography color="gray">{product.rating} Reviews</Typography>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <Typography
          variant="h4"
          color="blue-gray"
          className="flex items-center"
        >
          {/* <IndianRupee /> {selectedWeightOption.price} */}
        </Typography>

        <select
          onChange={(e) => onWeightChange(e.target.value)}
          className="w-full max-w-xs border-2 border-gray-300 rounded-lg px-3 py-2"
        >
          {product.weightOptions.map((opt) => (
            <option key={opt._id} value={opt._id}>
              {opt.weight}gm - {opt.price}Rs
            </option>
          ))}
        </select>
      </div>

      <Typography className="mb-8">{product.description}</Typography>

      <div className="space-y-4 mb-8">
        <div>
          <strong>Ingredients:</strong> {product.ingredients}
        </div>
        <div>
          <strong>Shelf Life:</strong> {product.shelfLife}
        </div>
        <div>
          <strong>Pieces(1kg):</strong> {product.piecesPerKg}
        </div>
      </div>
    </div>
  );
};
