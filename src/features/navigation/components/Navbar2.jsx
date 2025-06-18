import React from "react";
import { Link } from "react-router-dom";
import { Menu, Search, ShoppingBag, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../Modals/modalSlice";
import { selectLoggedInUser } from "../../auth/AuthSlice";
import TopBanner from "./TopBanner";
import Logo from "./Logo";
import { Tooltip } from "@material-tailwind/react";

// NavItem Component
const NavItem = ({ to, children }) => (
  <li className="hover-underline-animation">
    <Link
      to={to}
      className="text-white whitespace-nowrap transition-colors hover:text-white/75"
    >
      {children}
    </Link>
  </li>
);

// NavLinks Component
const NavLinks = ({ isAdmin }) => (
  <ul className="flex items-center gap-4 lg:gap-6 text-sm">
    <NavItem to="/">Home</NavItem>
    <NavItem to="/sweets">Our Products</NavItem>
    <NavItem to="/branches">Branches</NavItem>
    <NavItem to="/about">About</NavItem>
    <NavItem to="/contact">Contact Us</NavItem>

    {isAdmin && (
      <>
        <NavItem to="/admin/dashboard">Dashboard</NavItem>
        <NavItem to="/admin/add-product">New Product</NavItem>
        <NavItem to="/admin/orders">Orders</NavItem>
      </>
    )}
  </ul>
);

// NavActions Component
const NavActions = ({
  isLoggedIn,
  onSearchClick,
  onLoginClick,
  onMenuClick,
}) => (
  <div className="flex items-center gap-3 md:gap-4">
    {isLoggedIn && (
      <Tooltip content="Your Cart" placement="bottom">
        <Link to="/cart" className="relative  hidden md:block">
          <ShoppingBag size={20} className="text-white" />
          <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-cta" />
        </Link>
      </Tooltip>
    )}

    <Tooltip content="Search Sweets" placement="bottom">
      <button
        onClick={onSearchClick}
        className="hover:opacity-80 transition-opacity"
        aria-label="Search"
      >
        <Search size={20} className="text-white" />
      </button>
    </Tooltip>

    {!isLoggedIn ? (
      <button
        onClick={onLoginClick}
        className="flex items-center gap-2 rounded-md bg-cta px-2 lg:px-4 py-2 text-xs lg:text-md font text-white shadow hover:opacity-90 transition-opacity"
      >
        <User size={18} />
        <span>Login</span>
      </button>
    ) : (
      <Tooltip content="Profile" placement="bottom">
        <Link
          to="/profile"
          className="hover:opacity-80 transition-opacity hidden md:block"
        >
          <User size={20} className="text-white" />
        </Link>
      </Tooltip>
    )}

    <button
      onClick={onMenuClick}
      className="md:hidden hover:opacity-80 transition-opacity"
      aria-label="Menu"
    >
      <Menu size={20} className="text-white" />
    </button>
  </div>
);

// Main Navbar Component
const Navbar2 = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectLoggedInUser);

  const openMobileNav = () => {
    window.scrollTo(0, 0);
    dispatch(openModal({ type: "mobileNav" }));
  };

  const openSearchModal = () => {
    window.scrollTo(0, 0);
    dispatch(openModal({ type: "search" }));
  };

  const openLoginModal = () => {
    window.scrollTo(0, 0);
    dispatch(openModal({ type: "login" }));
  };

  return (
    <>
      <TopBanner />
      <header className="bg-ternary sticky top-0 z-50">
        <div className="mx-auto max-w-screen-xl px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Logo />
            </div>

            <div className="flex items-center">
              <div className="hidden md:block border-r-2 mr-2 pr-2">
                <nav aria-label="Global">
                  <NavLinks isAdmin={loggedInUser?.isAdmin} />
                </nav>
              </div>

              <NavActions
                isLoggedIn={!!loggedInUser}
                onSearchClick={openSearchModal}
                onLoginClick={openLoginModal}
                onMenuClick={openMobileNav}
              />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar2;
