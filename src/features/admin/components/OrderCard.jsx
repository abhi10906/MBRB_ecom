import { format } from "date-fns";
import {
  Copy,
  Eye,
  EyeOff,
  IndianRupee,
  Link2,
  MoveUpRight,
  Package2,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Button,
} from "@material-tailwind/react";
import { OrderStatusBadge } from "./OrderStatusBadge";
import { Link } from "react-router-dom";
import { useCategoryMap } from "../../../hooks/categories/useCategoryMap.js";
import { useDispatch, useSelector } from "react-redux";
import {
  resetOrderUpdateStatus,
  selectOrderUpdateStatus,
  updateOrderByIdAsync,
} from "../../order/OrderSlice.jsx";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export function OrderCard({ order }) {
  const dispatch = useDispatch();
  const categoryMap = useCategoryMap();

  useEffect(() => {
    return () => {
      dispatch(resetOrderUpdateStatus());
    };
  }, []);
  const [open, setOpen] = useState(false);

  const handleUpdateOrder = (newStatus) => {
    const update = { ...order, _id: order._id, status: newStatus };
    dispatch(updateOrderByIdAsync(update, newStatus));
  };
  const onUpdate = (newStatus) => {
    if (!newStatus) return;
    if (newStatus === order.status) return;

    const confirm = window.confirm(
      `Are you sure you want to mark the order as ${newStatus}? once updated it cannot be undone`
    );
    if (!confirm) return;
    else {
      handleUpdateOrder(newStatus);
    }
  };
  const handleCopy = () => {
    navigator.clipboard
      .writeText(order._id)
      .then(() => {
        toast(`Order ID #${order._id} copied!`);
      })
      .catch((error) => {
        toast.error("Failed to copy order ID.");
      });
  };

  return (
    <Card className="w-full">
      <CardHeader
        color="blue-gray"
        className="relative h-16 flex items-center px-6 my-4"
      >
        <div className="flex items-center gap-4">
          <Package2 className="h-8 w-8" />
          <div>
            <Typography
              variant="h6"
              color="white"
              className="flex gap-x-2 items-center cursor-pointer"
            >
              Order #{order._id} <Copy onClick={handleCopy} size={16} />
            </Typography>
            <Typography variant="small" color="white" className="opacity-80">
              {format(new Date(order.createdAt), "PPPppp")}
            </Typography>
          </div>
        </div>
        <div className="absolute right-6 flex gap-x-2">
          <OrderStatusBadge onUpdate={onUpdate} status={order.status} />
          <div>
            <Button onClick={() => setOpen(!open)} className="rounded-full">
              {open ? <Eye size={15} /> : <EyeOff size={15} />}
            </Button>
          </div>
        </div>
      </CardHeader>
      {open && (
        <CardBody>
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-2">
              {order.item.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 border p-4 rounded"
                >
                  <Avatar
                    src={item.product.thumbnail}
                    alt={item.product.title}
                    size="lg"
                  />
                  <div className="flex-1">
                    <Typography
                      variant="h6"
                      className="flex gap-x-2 items-center"
                    >
                      {item.product.title}
                      <Link
                        to={`/sweets/${item.product._id}`}
                        className="hover:text-ternary transition-all duration-300"
                      >
                        <Link2 color="blue" />
                      </Link>
                    </Typography>
                    <Typography
                      variant="small"
                      color="gray"
                      className="font-normal"
                    >
                      Description: {item.product.description}
                    </Typography>
                    <Typography
                      variant="small"
                      color="gray"
                      className="font-normal"
                    >
                      Category:{" "}
                      {categoryMap.get(item.product.category) ||
                        "Unknown Category"}
                    </Typography>
                    <Typography
                      variant="small"
                      color="gray"
                      className="font-normal"
                    >
                      Brand: {item.product.brand.name}
                    </Typography>
                    <Typography
                      variant="small"
                      color="gray"
                      className="font-normal"
                    >
                      Weight: {item.selectedWeightOption.weight} ×{" "}
                      {item.quantity}
                    </Typography>
                    <Typography
                      variant="small"
                      color="gray"
                      className="font-normal flex items-center gap-x-1"
                    >
                      Price per unit: <IndianRupee size={15} />
                      {item.selectedWeightOption.price}
                    </Typography>
                  </div>
                  <Typography variant="h6" className="flex items-center">
                    <IndianRupee size={18} />
                    {item.selectedWeightOption.price * item.quantity}
                  </Typography>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center">
                <Typography variant="h6">Total Amount</Typography>
                <Typography variant="h6" className="flex items-center">
                  <IndianRupee size={16} />
                  {order.total}
                </Typography>
              </div>
              <Typography variant="small" color="gray" className="font-normal">
                Payment Mode: {order.paymentMode}
              </Typography>
            </div>

            <div className="border-t pt-4">
              <Typography variant="h6" className="mb-2">
                User Information #{order.user._id}
              </Typography>
              <div className="space-y-2">
                <Typography variant="small" className="font-semibold">
                  Name: <span className="font-normal">{order.user.name}</span>
                </Typography>
                <Typography variant="small" className="font-semibold">
                  Email: <span className="font-normal">{order.user.email}</span>
                </Typography>
              </div>
            </div>

            <div className="border-t pt-4">
              <Typography variant="h6" className="mb-2 flex gap-x-2">
                Shipping Address{" "}
                {order.address[0] && (
                  <Chip
                    value={order.address[0].type}
                    className="bg-blue-50 text-blue-700 font-medium px-3 py-1 text-sm capitalize w-max"
                  />
                )}
              </Typography>
              {order.address[0] && (
                <div className="space-y-2">
                  <Typography variant="small" className="font-semibold">
                    Customer Name:{" "}
                    <span className="font-normal">{order.address[0].name}</span>
                  </Typography>
                  <Typography
                    variant="small"
                    color="gray"
                    className="font-normal"
                  >
                    Street: {order.address[0].street}
                  </Typography>
                  <Typography
                    variant="small"
                    color="gray"
                    className="font-normal"
                  >
                    City: {order.address[0].city}, State:{" "}
                    {order.address[0].state}
                  </Typography>
                  <Typography
                    variant="small"
                    color="gray"
                    className="font-normal"
                  >
                    Pin Code: {order.address[0].postalCode}
                  </Typography>
                  <Typography
                    variant="small"
                    color="gray"
                    className="font-normal"
                  >
                    Phone: {order.address[0].phoneNumber}
                  </Typography>
                </div>
              )}
            </div>
          </div>
        </CardBody>
      )}
    </Card>
  );
}
