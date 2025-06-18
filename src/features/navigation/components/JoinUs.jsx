import React from "react";
import { Link } from "react-router-dom";
import MBRBJoinus from "../../../assets/images/MBRBJoingus.webp";
const JoinUs = () => {
  return (
    <section class="text-gray-600 body-font mt-10">
      <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
          <img
            class="object-cover object-center rounded"
            alt="hero"
            src={MBRBJoinus}
          />
        </div>
        <div class="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
          <h1 class="title-font sm:text-4xl text-3xl mb-4 font-semibold text-gray-900">
            Join MBRB
            <br class="hidden lg:inline-block" />
            grow with us
          </h1>
          <p class="mb-8 leading-relaxed">
            Expand your business with Khaosa! Join us as a distributor and
            access top-quality products and support. Grow with us and unlock new
            opportunities for success. Join now and thrive!
          </p>
          <div class="flex justify-center">
            <Link
              to={"/contact"}
              class="inline-flex text-white bg-secondary border-0 py-2 px-6 focus:outline-none hover:bg-secondary/70 rounded text-lg"
            >
              Become a Distributor
            </Link>
            <Link
              to={"/contact"}
              class="ml-4 inline-flex text-gray-700 bg-primary border border-secondary py-2 px-6 focus:outline-none hover:bg-secondary/20 rounded text-lg"
            >
              Outlet Enquiry
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinUs;
