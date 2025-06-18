import React from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import {
  ArrowLeft,
  Menu,
  MoveLeft,
  ShoppingBag,
  House,
  X,
  Dessert,
  Building2,
  User,
  Store,
  SearchCheck,
  Headset,
  Power,
  ShoppingCart,
  ShieldEllipsis,
  Plus,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "../../Modals/modalSlice";
import { Link } from "react-router-dom";
import { logoutAsync, selectLoggedInUser } from "../../auth/AuthSlice";

export function MobileNavigation() {
  const { isOpen, type, props } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const closeDrawer = () => dispatch(closeModal());
  const loggedInUser = useSelector(selectLoggedInUser);

  const openLoginModal = () => {
    window.scrollTo(0, 0);
    dispatch(openModal({ type: "login" }));
  };
  return (
    <React.Fragment>
      <Drawer
        placement="left"
        open={isOpen && type === "mobileNav"}
        onClose={closeDrawer}
        className="p-4 bg-primary"
      >
        <div class="relative flex h-[calc(100vh-20rem)] w-full max-w-[20rem] flex-col rounded-xl bg-clip-border p-4 text-black">
          <div class="absolute right-0 top-0">
            <button
              onClick={closeDrawer}
              class="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-black"
            >
              <X size={40} />
            </button>
          </div>
          <nav class="mt-10 flex min-w-[240px] flex-col gap-1 p-2 font-sans text-xl font-medium text-black">
            <Link
              onClick={closeDrawer}
              to={"/"}
              class="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-black focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-black active:bg-blue-gray-50 active:bg-opacity-80 active:text-black"
            >
              <div class="grid mr-4 place-items-center">
                <Store />
              </div>
              Home
            </Link>
            <Link
              onClick={closeDrawer}
              to={"/sweets"}
              class="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-black focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-black active:bg-blue-gray-50 active:bg-opacity-80 active:text-black"
            >
              <div class="grid mr-4 place-items-center">
                <Dessert />
              </div>
              Our Products
            </Link>
            <Link
              onClick={closeDrawer}
              to={"/branches"}
              class="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-black focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-black active:bg-blue-gray-50 active:bg-opacity-80 active:text-black"
            >
              <div class="grid mr-4 place-items-center">
                <Building2 />
              </div>
              Branches
            </Link>
            <Link
              onClick={closeDrawer}
              to={"/about"}
              class="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-black focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-black active:bg-blue-gray-50 active:bg-opacity-80 active:text-black"
            >
              <div class="grid mr-4 place-items-center">
                <SearchCheck />
              </div>
              Aboust Us
            </Link>

            <Link
              onClick={closeDrawer}
              to={"/contact"}
              class="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-black focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-black active:bg-blue-gray-50 active:bg-opacity-80 active:text-black"
            >
              <div class="grid mr-4 place-items-center">
                <Headset />
              </div>
              Contact Us
            </Link>

            {loggedInUser && loggedInUser.isAdmin && (
              <>
                <Link
                  onClick={closeDrawer}
                  to={"/admin/dashboard"}
                  class="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-black focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-black active:bg-blue-gray-50 active:bg-opacity-80 active:text-black"
                >
                  <div class="grid mr-4 place-items-center">
                    <ShieldEllipsis />
                  </div>
                  Dashboard
                </Link>
                <Link
                  onClick={closeDrawer}
                  to={"/admin/add-product"}
                  class="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-black focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-black active:bg-blue-gray-50 active:bg-opacity-80 active:text-black"
                >
                  <div class="grid mr-4 place-items-center">
                    <Plus />
                  </div>
                  Add Product
                </Link>
              </>
            )}

            {loggedInUser && (
              <>
                <Link
                  onClick={closeDrawer}
                  to={"/cart"}
                  class="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-black focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-black active:bg-blue-gray-50 active:bg-opacity-80 active:text-black"
                >
                  <div class="grid mr-4 place-items-center">
                    <ShoppingCart />
                  </div>
                  Cart
                </Link>
                <Link
                  onClick={closeDrawer}
                  to={"/profile"}
                  class="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-black focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-black active:bg-blue-gray-50 active:bg-opacity-80 active:text-black"
                >
                  <div class="grid mr-4 place-items-center">
                    <User />
                  </div>
                  Account
                </Link>
                <Button
                  onClick={() => {
                    dispatch(logoutAsync());
                    closeDrawer();
                  }}
                  className="bg-ternary flex items-center w-11/12 text-white p-3 leading-tight transition-all rounded-lg outline-none text-start  hover:bg-opacity-80 "
                >
                  <div class="grid mr-4 place-items-center">
                    <Power />
                  </div>
                  Log Out
                </Button>
              </>
            )}

            {!loggedInUser && (
              <button
                onClick={openLoginModal}
                className="rounded-md bg-cta px-2 md:px-4 py-3 text-lg font-bold text-white justify-center mt-3 shadow flex items-center gap-x-1"
              >
                <User strokeWidth={3} /> Login
              </button>
            )}
          </nav>
        </div>
      </Drawer>
    </React.Fragment>
  );
}
