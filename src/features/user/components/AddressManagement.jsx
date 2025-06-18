import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  selectAddresses,
  selectAddressAddStatus,
  selectAddressUpdateStatus,
  selectAddressDeleteStatus,
  selectAddressStatus,
  addAddressAsync,
  resetAddressAddStatus,
  resetAddressUpdateStatus,
  resetAddressDeleteStatus,
} from "../../address/AddressSlice";
import { toast } from "react-toastify";
import { Button, Radio } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "../UserSlice";
import { Plus } from "lucide-react";
import { Address } from "../../address/components/Address";
const AddressManagement = ({ checkout, setAddress }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const userInfo = useSelector(selectUserInfo);
  const addresses = useSelector(selectAddresses);
  const addressAddStatus = useSelector(selectAddressAddStatus);
  const addressUpdateStatus = useSelector(selectAddressUpdateStatus);
  const addressDeleteStatus = useSelector(selectAddressDeleteStatus);

  const [addAddress, setAddAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    if (addressAddStatus === "fulfilled") {
      toast.success("Address added successfully");
    } else if (addressAddStatus === "rejected") {
      toast.error("Error adding address, please try again later");
    }
  }, [addressAddStatus]);

  useEffect(() => {
    if (addressUpdateStatus === "fulfilled") {
      toast.success("Address updated successfully");
    } else if (addressUpdateStatus === "rejected") {
      toast.error("Error updating address, please try again later");
    }
  }, [addressUpdateStatus]);

  useEffect(() => {
    if (addressDeleteStatus === "fulfilled") {
      toast.success("Address deleted successfully");
    } else if (addressDeleteStatus === "rejected") {
      toast.error("Error deleting address, please try again later");
    }
  }, [addressDeleteStatus]);

  useEffect(() => {
    return () => {
      dispatch(resetAddressAddStatus());
      dispatch(resetAddressUpdateStatus());
      dispatch(resetAddressDeleteStatus());
    };
  }, [dispatch]);

  const handleAddAddress = (data) => {
    const address = { ...data, user: userInfo._id };
    dispatch(addAddressAsync(address));
    setAddAddress(false);
    reset();
  };

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
    setAddress(address);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          {checkout ? "Select Address" : "Manage Addresses"}
        </h2>
        <Button
          onClick={() => setAddAddress(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 text-white rounded-lg transition-all duration-200"
        >
          <Plus className="w-5 h-5" />
          <span>Add Address</span>
        </Button>
      </div>

      {/* Add Address Form */}
      {addAddress && (
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <form
            onSubmit={handleSubmit(handleAddAddress)}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {[
              {
                name: "type",
                label: "Type",
                placeholder: "e.g., Home, Office",
              },
              { name: "name", label: "Full Name" },
              { name: "street", label: "Street" },
              { name: "postalCode", label: "Postal Code" },
              { name: "country", label: "Country" },
              { name: "phoneNumber", label: "Phone Number" },
              { name: "state", label: "State" },
              { name: "city", label: "City" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label}
                </label>
                <input
                  type="text"
                  placeholder={field.placeholder}
                  {...register(field.name, { required: true })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            ))}
            <div className="md:col-span-2 flex flex-col sm:flex-row justify-end gap-3 mt-4">
              <Button
                type="submit"
                className="w-full sm:w-auto bg-black text-white px-6"
              >
                Add Address
              </Button>
              <Button
                type="button"
                onClick={() => setAddAddress(false)}
                className="w-full sm:w-auto bg-gray-500 hover:bg-gray-600 text-white px-6"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Address List */}
      {checkout && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {addresses.length > 0 ? (
            addresses.map((address) => (
              <div
                key={address._id}
                className={`w-full bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden p-4 sm:p-6 space-y-4 ${
                  selectedAddress?._id === address._id
                    ? "border-2 border-black"
                    : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="bg-blue-50 text-blue-700 font-medium px-3 py-1 text-sm capitalize rounded-lg">
                      {address.type}
                    </span>
                    <span className="font-medium text-gray-900">
                      {address.name}
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="text-gray-600">
                    <p className="text-sm">{address.street}</p>
                    <p className="text-sm">
                      {address.city}, {address.state} {address.postalCode}
                    </p>
                    <p className="text-sm">{address.country}</p>
                  </div>
                  <div className="text-gray-600">
                    <p className="text-sm">{address.phoneNumber}</p>
                  </div>
                  {checkout && (
                    <div className="flex items-center gap-3">
                      <Radio
                        id={address._id}
                        name="address"
                        value={address._id}
                        checked={selectedAddress?._id === address._id}
                        onChange={() => handleSelectAddress(address)}
                        color="black"
                        label="Select this address"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="lg:col-span-2 text-center py-8">
              <p className="text-gray-500">
                You haven't added any addresses yet.
              </p>
            </div>
          )}
        </div>
      )}

      {!checkout && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {addresses.length > 0 ? (
            addresses.map((address) => (
              <Address
                key={address._id}
                {...address}
                checkout={checkout}
                setAddAddress={setAddAddress}
              />
            ))
          ) : (
            <div className="lg:col-span-2 text-center py-8">
              <p className="text-gray-500">
                You haven't added any addresses yet.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AddressManagement;
