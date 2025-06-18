import { useState, useEffect } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import {
  Package2,
  Truck,
  CheckCircle2,
  XCircle,
  Search,
  X,
  MoveLeft,
} from "lucide-react";
import { OrderCard } from "./OrderCard";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersAsync,
  resetOrderUpdateStatus,
  selectOrderUpdateStatus,
  selectOrders,
  getOrderByTextAsync,
  selectPagination,
  setCurrentPage,
} from "../../order/OrderSlice";
import { toast } from "react-toastify";
import { Spinner } from "@material-tailwind/react";

const TABS = [
  {
    label: "Pending",
    value: "Pending",
    icon: Package2,
  },
  {
    label: "Dispatched",
    value: "Dispatched",
    icon: Truck,
  },
  {
    label: "Delivered",
    value: "Delivered",
    icon: CheckCircle2,
  },
  {
    label: "Cancelled",
    value: "Cancelled",
    icon: XCircle,
  },
];

export const AdminOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const orderFetchStatus = useSelector(selectOrderUpdateStatus);
  const pagination = useSelector(selectPagination);

  const [activeTab, setActiveTab] = useState("Pending");
  const [searchText, setSearchText] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [currentPage, setCurrentPageState] = useState(1);
  const [loadingPage, setLoadingPage] = useState(false); // Loading state for page changes

  useEffect(() => {
    if (!isSearching) {
      setLoadingPage(true); // Set loading state to true
      dispatch(getAllOrdersAsync(currentPage)).finally(() => {
        setLoadingPage(false); // Reset loading state after fetch
      });
    }
  }, [dispatch, isSearching, currentPage]);

  // Reset to first page when changing tabs
  useEffect(() => {
    setCurrentPageState(1);
    dispatch(setCurrentPage(1));
  }, [activeTab, dispatch]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchText) {
      toast.error("Please enter order ID to search");
      return;
    }
    setIsSearching(true);
    setCurrentPageState(1);
    dispatch(resetOrderUpdateStatus());
    dispatch(getOrderByTextAsync(searchText));
  };

  const handlePageChange = (newPage) => {
    setCurrentPageState(newPage);
    setLoadingPage(true); // Set loading state to true
    dispatch(setCurrentPage(newPage));
  };

  const filteredOrders = isSearching
    ? orders
    : orders.filter((order) => order.status === activeTab);

  return (
    <div className="min-h-screen bg-gray-50 p-6 py-8 relative">
      <div className="max-w-7xl mx-auto">
        <Typography
          variant="h3"
          className="mb-8 flex w-full items-center justify-between"
        >
          <div>Order Management</div>
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center border-b border-black gap-x-2 px-2 text-sm ml-5"
          >
            <Search />
            <input
              placeholder="Enter Order ID"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              type="text"
              className="focus:outline-none bg-transparent py-2 w-[200px]"
            />
            <div className={searchText ? "visible" : "invisible"}>
              <X
                onClick={() => {
                  setSearchText("");
                  setIsSearching(false);
                  dispatch(getAllOrdersAsync(1));
                }}
              />
            </div>
            <button
              type="submit"
              className={searchText ? "visible" : "invisible"}
            >
              Search
            </button>
          </form>
        </Typography>
        {isSearching && (
          <Button
            onClick={() => setIsSearching(false)}
            className="flex gap-x-3 items-center py-1"
          >
            <MoveLeft size={40} /> Back
          </Button>
        )}

        <Tabs value={activeTab} className="mb-8">
          {!isSearching && (
            <TabsHeader>
              {TABS.map(({ label, value, icon: Icon }) => (
                <Tab
                  key={value}
                  value={value}
                  onClick={() => {
                    setActiveTab(value);
                    setIsSearching(false);
                  }}
                >
                  <div className="flex items-center gap-2 py-2">
                    <Icon className="h-4 w-4" />
                    <p>{label}</p>
                  </div>
                </Tab>
              ))}
            </TabsHeader>
          )}
          <TabsBody>
            <TabPanel value={activeTab}>
              {orderFetchStatus === "pending" || loadingPage ? (
                <div className="flex justify-center items-center py-12">
                  <Spinner color="blue" size="xl" />
                </div>
              ) : filteredOrders.length > 0 ? (
                <>
                  <div className="flex flex-col gap-y-5">
                    {filteredOrders.map((order) => (
                      <OrderCard key={order._id} order={order} />
                    ))}
                  </div>
                </>
              ) : (
                <div className="col-span-2 text-center py-12">
                  <Typography variant="h6" color="gray">
                    {isSearching
                      ? "No orders found for the given search"
                      : `No ${activeTab.toLowerCase()} orders found`}
                  </Typography>
                </div>
              )}
            </TabPanel>
          </TabsBody>
        </Tabs>
        {/* Pagination Controls */}
      </div>
      <div className="flex items-center gap-4 justify-center absolute bottom-0 pb-5 w-full ">
        <Button
          variant="text"
          className="flex items-center gap-2"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <div className="flex items-center gap-2">
          {[...Array(pagination.totalPages).keys()].map((_, index) => (
            <IconButton
              key={index + 1}
              variant={currentPage === index + 1 ? "filled" : "text"}
              color={currentPage === index + 1 ? "blue" : "gray"}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </IconButton>
          ))}
        </div>
        <Button
          variant="text"
          className="flex items-center gap-2"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === pagination.totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
