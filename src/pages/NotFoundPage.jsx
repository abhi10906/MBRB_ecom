import React from "react";
import { Link } from "react-router-dom";
import { Typography, Button, Card, CardBody } from "@material-tailwind/react";
import Lottie from "lottie-react";
import { notFoundPageAnimation } from "../assets";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
      <Card className="shadow-lg p-6 max-w-lg text-center">
        {/* Animation */}
        <div className="w-64 mx-auto">
          <Lottie animationData={notFoundPageAnimation} loop={true} />
        </div>

        <CardBody>
          {/* Heading */}
          <Typography variant="h4" className="font-semibold text-gray-800">
            404 Not Found
          </Typography>

          {/* Subheading */}
          <Typography variant="paragraph" className="text-gray-600 mt-2">
            Sorry, we couldn't find the page you were looking for.
          </Typography>

          {/* Button */}
          <Link to={"/"}>
            <Button
              className="mt-6 text-white font-medium px-6 py-2 rounded-lg"
              size="lg"
              as={Link}
            >
              Go back to Homepage
            </Button>
          </Link>
        </CardBody>
      </Card>
    </div>
  );
};

export default NotFoundPage;
