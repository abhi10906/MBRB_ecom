import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../Modals/modalSlice";
import { Brush, Search, TrendingUp, X } from "lucide-react";
import { duration } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export function SearchModal() {
  const { isOpen, type, props } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const closeDrawer = () => dispatch(closeModal());
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/sweets?search=${search}`);
    closeDrawer();
    setSearch("");
  };

  return (
    <>
      <Dialog
        open={isOpen && type == "search"}
        handler={closeDrawer}
        animate={{
          mount: { scale: 1, y: -120 },
          unmount: { scale: 0.9, y: -200 },
        }}
        className="bg-primary"
      >
        <DialogHeader>
          <div className="flex justify-between w-full">
            <p className="pt-2">Search your Cravings</p>
            <button onClick={closeDrawer}>
              <X size={35} />
            </button>
          </div>
        </DialogHeader>
        <DialogBody>
          <form onSubmit={handleSubmit} class="w-full">
            <label
              for="default-search"
              class="mb-2 text-sm font-medium text-black sr-only"
            >
              Search
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <Search className="text-ternary" />
              </div>
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                id="default-search"
                class="block w-full p-4 ps-10 text-sm text-black border border-ternary rounded-lg bg-transparent focus:ring-ternary focus:border-ternary focus:outline-none placeholder:text-gray-700"
                placeholder="Rasgulla,Barfi,Laddoo..."
                required
              />
              <div className="absolute end-1.5 bottom-[0.45rem] flex gap-2">
                <button
                  type="button"
                  className={search ? "visible" : "invisible"}
                  onClick={() => setSearch("")}
                >
                  <X className="text-black" size={22} />
                </button>
                <button
                  type="submit"
                  class="text-white bg-ternary font-medium rounded text-sm px-4 py-2.5 "
                >
                  Search
                </button>
              </div>
            </div>
          </form>
          <div className="border-t border-secondary mt-5 p-2">
            <p className="text-black">Popular Searches</p>
            <ul className="mt-3 flex gap-x-7 flex-wrap">
              {[
                "Kaju Barfi",
                "Gulaab Jamun",
                "Rasgulla",
                "Rasmalai",
                "Dodha Barfi",
                "Kaju Katli",
                "Peda",
                "Laddoo",
                "Jalebi",
                "Sohan Papdi",
                "Petha",
              ].map((val, index) => {
                return (
                  <li
                    key={index}
                    className="text-sm my-1 whitespace-nowrap hover-underline-animation-black"
                  >
                    <a
                      href={`/sweets?search=${val}`}
                      className="text-black flex items-center gap-1"
                    >
                      <p>{val}</p>
                      <TrendingUp size={15} />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}
