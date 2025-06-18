import React from "react";
import { Link } from "react-router-dom";
import MBRBLogo from "../../../assets/images/MBRBLogo.webp";
const Logo = () => {
  return (
    <Link href="/" className="w-48 md:w-56 lg:w-1/2 xl:w-1/3" to="/">
      <img src={MBRBLogo} className="w-full h-auto" />
    </Link>
  );
};

export default Logo;
