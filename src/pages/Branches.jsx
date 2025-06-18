import React, { useState } from "react";
import { MapPin, Phone, Mail, MapPinned } from "lucide-react";
import {
  Card,
  CardBody,
  CardFooter,
  Button,
  Typography,
} from "@material-tailwind/react";
import MBRBBranch1 from "./../assets/images/MBRBBranch1.jpeg";
import MBRBBranch2 from "./../assets/images/MBRBBranch2.jpg";
import MBRBBranch3 from "./../assets/images/MBRBBranch3.jpg";

const BranchesData = [
  {
    address: {
      addressLine1: "Main bus stand Beniwal market Bhaleri",
    },
    phone: "+91 6350127930",
    email: "enquiry@mbrb.in",
    locationUrl: "https://maps.app.goo.gl/17SWHiihQBPmqCQv5",
  },
  {
    address: {
      addressLine1: "Pilaniya school ke pass, Post office ke pass, Tarangar",
    },
    phone: "+91 6350127930",
    email: "enquiry@mbrb.in",
    locationUrl: "https://maps.app.goo.gl/QTJgvm2jERbfDGPC6",
  },
  {
    address: {
      addressLine1: "Bus stand piche Sekha supar market Rajgrah (sadulpur)",
    },
    phone: "+91 6350127930",
    email: "enquiry@mbrb.in",
    locationUrl: "https://maps.app.goo.gl/gV45QRr4Qd1yw7rr9",
  },
  {
    address: {
      addressLine1: "Mamta bus stand Jagdmba frut bhandar ke pass Pallu",
    },
    phone: "+91 6350127930",
    email: "enquiry@mbrb.in",
    locationUrl: "https://maps.app.goo.gl/Uv8Pq5nMZXoajARr8",
  },
  {
    address: {
      addressLine1: "Sidhamukha",
    },
    phone: "+91 6350127930",
    email: "enquiry@mbrb.in",
    locationUrl: "https://maps.app.goo.gl/WQZ6xLBVKynodQnk7",
  },
  {
    address: {
      addressLine1: "Shree Dungargarh",
    },
    phone: "+91 6350127930",
    email: "enquiry@mbrb.in",
    locationUrl: "https://maps.app.goo.gl/oSTSehc4QxNz5kz67",
  },
  {
    address: {
      addressLine1: "Suratgarh",
    },
    phone: "+91 6350127930",
    email: "enquiry@mbrb.in",
    locationUrl: "https://maps.app.goo.gl/PJgDLBKuh8PuuwVV8",
  },
  {
    address: {
      addressLine1: "Post office ke pass Chapar",
    },
    phone: "+91 6350127930",
    email: "enquiry@mbrb.in",
    locationUrl: "https://maps.app.goo.gl/skUkQGVLXpDG6ck7A",
  },
];

function BranchCard({ branch }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="hover:shadow-xl shadow-blue-50 transform transition-all duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      <div className="relative h-56 overflow-hidden rounded-t-lg">
        <img
          src={MBRBBranch1} // Use the same image for all branches
          alt={branch.address.addressLine1}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isHovered ? "opacity-0" : "opacity-100"
          }`}
        />
        <img
          src={MBRBBranch2} // Use the same hover image for all branches
          alt={`${branch.address.addressLine1} hover`}
          className={`absolute top-0 w-full h-full object-cover transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <Typography
          variant="h5"
          color="white"
          className="absolute bottom-4 left-4 font-bold drop-shadow-lg"
        >
          {branch.address.addressLine1}
        </Typography>
      </div>

      {/* Details Section */}
      <CardBody className="space-y-4">
        {/* Phone */}
        <div className="flex items-center space-x-3">
          <Phone className="w-6 h-6 text-blue-500" />
          <Typography variant="small" color="blue-gray" className="font-medium">
            {branch.phone}
          </Typography>
        </div>

        {/* Email */}
        <div className="flex items-center space-x-3">
          <Mail className="w-6 h-6 text-blue-500" />
          <Typography variant="small" color="blue-gray" className="font-medium">
            {branch.email}
          </Typography>
        </div>
      </CardBody>

      {/* Footer Section */}
      <CardFooter className="pt-0">
        <Button
          fullWidth
          className="flex items-center justify-center gap-2"
          onClick={() => window.open(branch.locationUrl, "_blank")}
        >
          <MapPinned className="w-5 h-5" />
          View Location
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function Branches() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Branches
          </h1>
          <p className="text-lg text-gray-600">
            Visit us at any of our locations for a delightful experience.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BranchesData.map((branch, index) => (
            <BranchCard key={index} branch={branch} />
          ))}
        </div>
      </div>
    </div>
  );
}
