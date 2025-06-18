import React from "react";
import { Link } from "react-router-dom";
const USPbanner = () => {
  return (
    <section className="text-gray-600 body-font bg-gray-50">
      <div className="container px-5 py-24 mx-auto">
        <div className="text-center mb-20">
          <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">
            Why Choose Us?
          </h1>
          <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500">
            At MBRB, we bring you the finest handcrafted sweets made with love,
            tradition, and the choicest ingredients. Indulge in delicacies that
            tell stories of heritage, flavor, and joy.
          </p>
          <div className="flex mt-6 justify-center">
            <div className="w-16 h-1 rounded-full bg-secondary inline-flex"></div>
          </div>
        </div>
        <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
          <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
            <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-yellow-100 text-secondary mb-5 flex-shrink-0">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-10 h-10"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.86L12 17.77l-6.18 3.23L7 14.14l-5-4.87 6.91-1.01L12 2z"></path>
              </svg>
            </div>
            <div className="flex-grow">
              <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                Premium Ingredients
              </h2>
              <p className="leading-relaxed text-base">
                We use only the finest ingredients, from pure desi ghee to
                organic sugar, ensuring every bite is a celebration of quality
                and taste.
              </p>
            </div>
          </div>
          <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
            <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-yellow-100 text-secondary mb-5 flex-shrink-0">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-10 h-10"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 2v20M2 12h20"></path>
              </svg>
            </div>
            <div className="flex-grow">
              <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                Artisanal Craftsmanship
              </h2>
              <p className="leading-relaxed text-base">
                Each sweet is handcrafted by skilled artisans, preserving
                traditional recipes passed down through generations.
              </p>
            </div>
          </div>
          <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
            <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-yellow-100 text-secondary mb-5 flex-shrink-0">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-10 h-10"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c3.866 0 7-3.134 7-7S15.866 1 12 1 5 4.134 5 8s3.134 7 7 7z"></path>
                <path d="M12 12v7"></path>
                <path d="M9 18h6"></path>
              </svg>
            </div>
            <div className="flex-grow">
              <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                Unforgettable Taste
              </h2>
              <p className="leading-relaxed text-base">
                From melt-in-your-mouth laddoos to rich kaju katlis, our sweets
                are designed to make every occasion memorable.
              </p>
            </div>
          </div>
        </div>
        <Link
          to={"/sweets"}
          className="w-max flex mx-auto mt-16 text-white bg-secondary border-0 py-2 px-8 focus:outline-none hover:bg-secondary/70 rounded text-lg"
        >
          Explore Our Range
        </Link>
      </div>
    </section>
  );
};

export default USPbanner;
