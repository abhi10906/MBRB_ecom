import React from "react";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import BannerImage1 from "../../../assets/images/AboutUsBanner.webp";
import BannerImage2 from "../../../assets/images/homeGulabJamun.jpeg";
import BannerImage3 from "../../../assets/images/BannerImage2.webp";
import { ChevronLeft, ChevronRight } from "lucide-react";
const carouselData = {
  pcImages: [BannerImage3, BannerImage2, BannerImage1],
  mobileImages: [BannerImage3, BannerImage2, BannerImage1],
  slides: [
    {
      title: "Experience Nature",
      description: "Discover breathtaking landscapes",
    },
    {
      title: "Urban Adventures",
      description: "Explore city life and architecture",
    },
    {
      title: "Peaceful Moments",
      description: "Find tranquility in every corner",
    },
  ],
};

const CarouselSlide = ({ pcImage, mobileImage, title, description, index }) => (
  <div className="relative h-[30vh] lg:h-[90vh] w-full">
    <div className="absolute inset-0 hidden" />
    <picture>
      <source media="(min-width: 768px)" srcSet={pcImage} />
      <img
        className="h-full w-full object-fit"
        alt={`Slide ${index + 1}`}
        src={mobileImage}
        loading={index === 0 ? "eager" : "lazy"}
      />
    </picture>
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-xl text-center text-white hidden">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="text-lg md:text-xl">{description}</p>
        </div>
      </div>
    </div>
  </div>
);

const arrows = {
  prevArrow: (
    <div className="group absolute left-0 top-0 flex h-full items-center">
      <button className="bg-transparent lg:bg-black/30 p-2 lg:backdrop-blur-sm transition-all duration-300 lg:hover:bg-black/50 group-hover:translate-x-2">
        <ChevronLeft className="text-white" size={24} strokeWidth={2} />
      </button>
    </div>
  ),
  nextArrow: (
    <div className="group absolute right-0 top-0 flex h-full items-center">
      <button className="bg-transparent lg:bg-black/30 p-2 lg:backdrop-blur-sm transition-all duration-300 lg:hover:bg-black/50 group-hover:-translate-x-2">
        <ChevronRight className="text-white" size={24} strokeWidth={2} />
      </button>
    </div>
  ),
};

const HeroCarousel = () => {
  return (
    <div className="relative overflow-hidden">
      <Fade
        scale={1}
        autoplay={true}
        infinite
        arrows
        duration={5000}
        transitionDuration={800}
        canSwipe={true}
        pauseOnHover={true}
        indicators={(index) => (
          <div className="indicator mx-1 h-2 w-2 cursor-pointer rounded-full bg-white/50 transition-all duration-300 hover:bg-white/80" />
        )}
        {...arrows}
      >
        {carouselData.slides.map((slide, index) => (
          <CarouselSlide
            key={index}
            pcImage={carouselData.pcImages[index]}
            mobileImage={carouselData.mobileImages[index]}
            title={slide.title}
            description={slide.description}
            index={index}
          />
        ))}
      </Fade>
    </div>
  );
};

export default HeroCarousel;
