import React from "react";

const Quantity = ({
  productQuantity,
  handleDecreaseQty,
  handleIncreaseQty,
}) => {
  
  return (
    <div className="flex gap-x-5 items-center text-black">
      <div>Quantity</div>
      <div className="flex items-center">
        <button
          onClick={handleDecreaseQty}
          className="border border-secondary rounded-l px-3 py-1 hover:bg-secondary hover:text-white"
        >
          -
        </button>
        <p className="border-y border-secondary px-3 py-1">{productQuantity}</p>
        <button
          onClick={handleIncreaseQty}
          className="border border-secondary rounded-r px-3 py-1 hover:bg-secondary hover:text-white"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Quantity;
