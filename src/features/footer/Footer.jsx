import React from "react";
import {
  Home,
  Info,
  Phone,
  Mail,
  MapPin,
  Image,
  Building,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-ternary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Quick Menu Section */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Quick Menu</h3>
            <ul className="space-y-3">
              {[
                {
                  icon: <Home className="h-4 w-4" />,
                  label: "Home",
                  path: "/",
                },
                {
                  icon: <Info className="h-4 w-4" />,
                  label: "About",
                  path: "/about",
                },
                {
                  icon: <Phone className="h-4 w-4" />,
                  label: "Contact",
                  path: "/contact",
                },
                {
                  icon: <Image className="h-4 w-4" />,
                  label: "Gallery",
                  path: "/gallery",
                },
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className="inline-flex items-center text-white hover:text-gray-300 transition-colors"
                  >
                    {item.icon}
                    <span className="ml-2">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Branches Section */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Our Branches</h3>
            <ul className="space-y-3">
              {[
                "Shree Dungargarh",
                "Sidhamukha",
                "Tarangar Near Post Office",
                "Beniwal Market Bhaleri",
              ].map((branch, index) => (
                <li key={index} className="flex items-start">
                  <Building className="h-4 w-4 text-white mt-1 flex-shrink-0" />
                  <span className="ml-2 text-white">{branch}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Get in Touch</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Phone className="h-4 w-4 text-white" />
                <a
                  href="tel:6350127930"
                  className="ml-2 text-white hover:text-gray-300 transition-colors"
                >
                  +91 6350127930
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 text-white" />
                <a
                  href="mailto:enquiry@mbrb.in"
                  className="ml-2 text-white hover:text-gray-300 transition-colors"
                >
                  enquiry@mbrb.in
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="h-4 w-4 text-white mt-1 flex-shrink-0" />
                <span className="ml-2 text-white">
                  GVM Road, Girdhar Market,
                  <br />
                  Near Bus Stand Sardarshaher,
                  <br />
                  Churu, Rajasthan, 331403
                </span>
              </li>
            </ul>
          </div>

      
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white text-sm text-center md:text-left">
              Copyright © 2025 MAMA BHANJA RASGULLA BHANDAR - All rights
              reserved.
            </p>
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <span className="text-white text-sm">
                Developed by{" "}
                <a
                  href="https://web2tech.co/"
                  target="_blank"
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  Web Tech
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
