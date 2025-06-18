import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  deleteAddressByIdAsync,
  selectAddressErrors,
  selectAddressStatus,
  updateAddressByIdAsync,
} from "../AddressSlice";
import {
  Badge,
  Chip,
  IconButton,
  SpeedDial,
  SpeedDialAction,
  SpeedDialContent,
  SpeedDialHandler,
  Typography,
} from "@material-tailwind/react";
import {
  Building2,
  EllipsisVertical,
  MapPin,
  PencilLine,
  Phone,
  Trash,
  X,
} from "lucide-react";

export const Address = ({
  _id,
  name,
  type,
  street,
  postalCode,
  country,
  phoneNumber,
  state,
  city,
  checkout,
}) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const status = useSelector(selectAddressStatus);
  const error = useSelector(selectAddressErrors);

  const handleRemoveAddress = () => {
    setOpen(false);
    dispatch(deleteAddressByIdAsync(_id));
  };

  const handleUpdateAddress = (data) => {
    dispatch(updateAddressByIdAsync({ ...data, _id }));
    setEdit(false);
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <div className="p-4 sm:p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Chip
              value={type}
              className="bg-blue-50 text-blue-700 font-medium px-3 py-1 text-sm capitalize"
            />
            <span className="font-medium text-gray-900">{name}</span>
          </div>
          <SpeedDial
            open={open}
            handler={setOpen}
            placement={checkout ? "bottom" : "left"}
          >
            <SpeedDialHandler>
              <IconButton
                size="sm"
                className="rounded-full bg-gray-50 hover:bg-gray-100 ml-1"
              >
                {open ? (
                  <X className="h-4 w-4 text-gray-600" />
                ) : (
                  <EllipsisVertical className="h-4 w-4 text-gray-600" />
                )}
              </IconButton>
            </SpeedDialHandler>
            <SpeedDialContent className={checkout ? "" : "flex-row"}>
              <SpeedDialAction
                onClick={() => {
                  setOpen(false);
                  setEdit(true);
                }}
                className="bg-blue-50 hover:bg-blue-100 border-none"
              >
                <PencilLine className="h-4 w-4 text-blue-600" />
                <Typography className="text-xs text-blue-600">Edit</Typography>
              </SpeedDialAction>
              <SpeedDialAction
                onClick={handleRemoveAddress}
                className="bg-red-50 hover:bg-red-100 border-none"
              >
                <Trash className="h-4 w-4 text-red-600" />
                <Typography className="text-xs text-red-600">Delete</Typography>
              </SpeedDialAction>
            </SpeedDialContent>
          </SpeedDial>
        </div>

        {/* Content */}
        <form
          onSubmit={handleSubmit(handleUpdateAddress)}
          className="space-y-4"
        >
          {edit ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: "type", label: "Type", value: type },
                { name: "street", label: "Street", value: street },
                { name: "postalCode", label: "Postal Code", value: postalCode },
                { name: "country", label: "Country", value: country },
                {
                  name: "phoneNumber",
                  label: "Phone Number",
                  value: phoneNumber,
                },
                { name: "state", label: "State", value: state },
                { name: "city", label: "City", value: city },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label}
                  </label>
                  <input
                    type="text"
                    {...register(field.name, {
                      required: true,
                      value: field.value,
                    })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              ))}
              <div className="sm:col-span-2 flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setEdit(false);
                    reset();
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-gray-600">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <p className="text-sm">{street}</p>
                  <p className="text-sm">
                    {city}, {state} {postalCode}
                  </p>
                  <p className="text-sm">{country}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <p className="text-sm">{phoneNumber}</p>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
