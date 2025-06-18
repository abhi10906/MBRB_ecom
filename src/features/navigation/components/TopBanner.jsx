import React, { useState } from "react";
import { X } from "lucide-react";
const TopBanner = () => {
  const [show, setShow] = useState(true);
  return (
    <>
      {show && (
        <div className="p-2 bg-secondary relative">
          <p className="text-sm text-center">
            Enjoy PAN INDIA FREE delivery 🔥{" "}
          </p>
          <div className="absolute top-1.5 right-2">
            <button className="" onClick={() => setShow(false)}>
              <X />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TopBanner;
