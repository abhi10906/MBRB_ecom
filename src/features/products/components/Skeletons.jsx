import { Card, CardHeader, CardBody } from "@material-tailwind/react";

export const ProductSkeleton = () => {
  return (
    <Card className="animate-pulse">
      <CardHeader shadow={false} floated={false} className="h-64 bg-gray-200" />
      <CardBody>
        <div className="space-y-3">
          <div className="h-3 bg-gray-200 rounded-full w-3/4" />
          <div className="h-3 bg-gray-200 rounded-full w-1/2" />
          <div className="flex justify-between items-center mt-4">
            <div className="h-6 bg-gray-200 rounded-full w-24" />
            <div className="h-4 bg-gray-200 rounded-full w-16" />
          </div>
          <div className="h-10 bg-gray-200 rounded-md w-full mt-4" />
        </div>
      </CardBody>
    </Card>
  );
};

export const ProductInfoSkeleton = () => {
  return (
    <div className="xl:w-4/5 mx-auto lg:flex animate-pulse">
      {/* Image Section Skeleton */}
      <div className="lg:w-1/2">
        <div className="h-96 bg-gray-200 rounded-lg" />
        <div className="grid grid-cols-4 gap-2 mt-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 rounded" />
          ))}
        </div>
      </div>

      {/* Content Section Skeleton */}
      <div className="flex-1 lg:w-1/2 lg:pl-10 lg:py-6 mt-6 lg:mt-0">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-4" />
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4" />
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-8" />

        <div className="h-10 bg-gray-200 rounded w-1/3 mb-6" />
        <div className="h-12 bg-gray-200 rounded mb-6" />

        <div className="flex gap-4 mb-8">
          <div className="h-12 bg-gray-200 rounded flex-1" />
          <div className="h-12 bg-gray-200 rounded flex-1" />
        </div>

        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-4 bg-gray-200 rounded" />
          ))}
        </div>
      </div>
    </div>
  );
};
export const CartItemSkeleton = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center bg-gray-50 p-4 md:p-4 rounded-lg shadow animate-pulse">
      {/* Thumbnail and Product Info */}
      <div className="flex items-center space-x-4 md:space-x-6 w-full md:w-2/3">
        <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-300 rounded-lg"></div>
        <div className="flex flex-col space-y-2 w-full">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-3 bg-gray-300 rounded w-1/2"></div>
          <div className="h-3 bg-gray-300 rounded w-1/2"></div>
          <div className="h-3 bg-gray-300 rounded w-1/2"></div>
          <div className="h-3 bg-gray-300 rounded w-1/4"></div>
        </div>
      </div>

      {/* Quantity and Actions */}
      <div className="flex md:flex-row items-center justify-between w-full md:w-1/3 mt-4 md:mt-0">
        <div className="flex gap-x-2 items-center">
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          <div className="h-4 bg-gray-300 rounded w-12"></div>
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        </div>
        <div className="h-4 bg-gray-300 rounded w-16"></div>
        <div className="h-6 bg-gray-300 rounded w-8"></div>
      </div>
    </div>
  );
};
