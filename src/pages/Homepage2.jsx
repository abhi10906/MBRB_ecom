import React, { useEffect, lazy, Suspense } from "react";
import HeroCarousel from "../features/navigation/components/HeroCarousel";
import USPbanner from "../features/navigation/components/USPbanner";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import { ProductFetchSkeletonLoader } from "../features/products/components/ProductList2";

// Lazy load components that are not immediately visible
const ProductList2 = lazy(() =>
  import("../features/products/components/ProductList2")
);
const StatsSection = lazy(() =>
  import("../features/navigation/components/StatsSection")
);
const OurStory = lazy(() =>
  import("../features/navigation/components/OurStory")
);
const JoinUs = lazy(() => import("../features/navigation/components/JoinUs"));

// Loading components for different sections
const ProductListLoader = () => <ProductFetchSkeletonLoader />;

const SectionLoader = () => (
  <div className="w-full h-48 bg-primary animate-pulse flex items-center justify-center">
    <div className="text-lg text-gray-600">Loading...</div>
  </div>
);

const Homepage2 = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });

    // Preload components that will likely be needed soon
    const preloadComponents = async () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Preload the next sections when user scrolls near them
              import("../features/navigation/components/StatsSection");
              import("../features/navigation/components/OurStory");
              import("../features/navigation/components/JoinUs");
              observer.disconnect();
            }
          });
        },
        { threshold: 0.1 }
      );

      // Start observing the USP banner
      const uspBanner = document.querySelector("#usp-banner");
      if (uspBanner) {
        observer.observe(uspBanner);
      }
    };

    preloadComponents();
  }, []);

  return (
    <div className="w-full bg-primary">
      <FloatingWhatsApp
        phoneNumber="919352361119"
        accountName="MBRB"
        allowEsc
        statusMessage="Online"
        allowClickAway
      />

      {/* Critical above-the-fold content loaded immediately */}
      <HeroCarousel />
      <Suspense fallback={<ProductListLoader />}>
        <ProductList2 isHome={true} />
      </Suspense>

      <USPbanner id="usp-banner" />

      {/* Lazy loaded components with individual suspense boundaries */}

      <Suspense fallback={<SectionLoader />}>
        <StatsSection />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <OurStory />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <JoinUs />
      </Suspense>
    </div>
  );
};

export default Homepage2;
