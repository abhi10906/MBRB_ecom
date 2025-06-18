import { useState } from "react";
import { Button, Badge } from "@material-tailwind/react";
import { Edit2, Check } from "lucide-react";

const STATUS_CONFIG = {
  Pending: {
    color: "blue",
    bgColor: "bg-blue-50",
    textColor: "text-blue-800",
  },
  Dispatched: {
    color: "amber",
    bgColor: "bg-amber-50",
    textColor: "text-amber-800",
  },
  Delivered: {
    color: "green",
    bgColor: "bg-green-50",
    textColor: "text-green-800",
  },
  Cancelled: {
    color: "red",
    bgColor: "bg-red-50",
    textColor: "text-red-800",
  },
};

const AVAILABLE_STATUSES = Object.keys(STATUS_CONFIG);

export function OrderStatusBadge({ status, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(status);

  // Fallback to 'Pending' if selectedStatus is not valid
  const currentStatus = STATUS_CONFIG[selectedStatus]
    ? selectedStatus
    : "Pending";

  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="min-w-[140px] bg-black text-white rounded px-2 py-2"
          size="sm"
        >
          {AVAILABLE_STATUSES.map((statusOption) => (
            <option
              key={statusOption}
              value={statusOption}
              className={STATUS_CONFIG[statusOption].textColor}
            >
              {statusOption}
            </option>
          ))}
        </select>
        <Button
          variant="text"
          size="sm"
          color="green"
          onClick={() => {
            setIsEditing(false);
            onUpdate(selectedStatus);
          }}
          className="p-2 transition-all duration-200 bg-green-100 hover:bg-green-200 focus:ring focus:ring-green-300 rounded-md"
        >
          <Check className="h-6 w-6" strokeWidth={4} />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Badge
        content={currentStatus}
        color={STATUS_CONFIG[currentStatus].color}
        className={`px-4 py-1 mr-12 ${STATUS_CONFIG[currentStatus].bgColor} ${STATUS_CONFIG[currentStatus].textColor}`}
      />
      <Button
        variant="text"
        size="sm"
        onClick={() => setIsEditing(true)}
        className="p-2 transition-all duration-200 hover:bg-gray-100 focus:ring focus:ring-gray-300 rounded-md"
      >
        <Edit2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
