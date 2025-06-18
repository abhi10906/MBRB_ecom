import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectUserInfo } from "../UserSlice";
import { LogOut, Package, Plus, User } from "lucide-react";
import { Link } from "react-router-dom";
import { logoutAsync } from "../../auth/AuthSlice";
import AddressManagement from "./AddressManagement";

export const UserProfile = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const handleLogout = () => {
    dispatch(logoutAsync());
  };

  return (
    <div className="min-h-screen bg-gray-50 py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            My Account
          </h1>
          <div className="hidden lg:flex flex-col sm:flex-row w-full sm:w-auto gap-3">
            <Link
              to="/orders"
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
            >
              <Package className="w-5 h-5" />
              <span>My Orders</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-ternary text-white rounded-lg hover:bg-red-600 transition-all duration-200"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* User Profile Card */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white flex items-center justify-center">
              <User className="w-12 h-12" />
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold text-gray-900">
                {userInfo?.name}
              </h2>
              <p className="text-gray-500 mt-1">{userInfo?.email}</p>
            </div>
          </div>
        </div>
        <div className="flex lg:hidden flex-col sm:flex-row w-full sm:w-auto gap-3">
          <Link
            to="/orders"
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
          >
            <Package className="w-5 h-5" />
            <span>My Orders</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>

        {/* Addresses Section */}
        <AddressManagement />
      </div>
    </div>
  );
};
