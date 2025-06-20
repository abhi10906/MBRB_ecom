import React from "react";
import MBRBOwner from "../../../assets/images/MBRBOwner.jpeg";
const OurStory = () => {
  return (
    <section class="text-gray-600 body-font bg-gray-50 py-14">
      <div className="grid place-items-center w-full">
        <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
          Our Story
        </h1>
      </div>
      <div class="container mx-auto flex px-5 md:flex-row flex-col items-center">
        <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <section class="text-gray-600 body-font">
            <div class="container px-5 pt-10 pb-24 mx-auto">
              <div class="w-full mx-auto text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  class="inline-block w-8 h-8 text-cta mb-8"
                  viewBox="0 0 975.036 975.036"
                >
                  <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                </svg>
                <p class="leading-relaxed text-lg">
                  Edison bulb retro cloud bread echo park, helvetica stumptown
                  taiyaki taxidermy 90's cronut +1 kinfolk. Single-origin coffee
                  ennui shaman taiyaki vape DIY tote bag drinking vinegar cronut
                  adaptogen squid fanny pack vaporware. Man bun next level
                  coloring book skateboard four loko knausgaard. Kitsch keffiyeh
                  master cleanse direct trade indigo juice before they sold out
                  gentrify plaid gastropub normcore XOXO 90's pickled cindigo
                  jean shorts. Slow-carb next level shoindigoitch ethical
                  authentic, yr scenester sriracha forage franzen organic
                  drinking vinegar.
                </p>
                <span class="inline-block h-1 w-10 rounded bg-cta mt-8 mb-6"></span>
                <h2 class="text-gray-900 font-medium title-font tracking-wider text-sm">
                  MAMA BHANJA
                </h2>
                <p class="text-gray-500">Owner @MBRB</p>
              </div>
            </div>
          </section>
        </div>
        <div class="-mt-20 md:-mt-0 border lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <img
            class="object-cover object-center rounded"
            alt="hero"
            src={MBRBOwner}
          />
        </div>
      </div>
      <div class="flex justify-center pt-5 md:pt-0">
        <button class="inline-flex text-white bg-secondary border-0 py-2 px-6 focus:outline-none hover:bg-secondary/70 rounded text-lg">
          About Us
        </button>
      </div>
    </section>
  );
};

export default OurStory;
