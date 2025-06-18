import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

export default function ProductImageSwiper({ images }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Main Swiper */}
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="swiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={image}
              className="object-cover w-full h-56 md:h-64 lg:h-72 rounded"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail Swiper */}
      <div className="mt-4">
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="productImageSwiper2"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                className="object-cover w-16 h-12 md:w-20 md:h-16 rounded"
                src={image}
                alt={image}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
