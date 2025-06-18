import React from "react";
import {
  MapPin,
  Award,
  Truck,
  Users,
  ArrowRight,
  Star,
  Clock,
  Shield,
  Leaf,
  Phone,
  Mail,
  Users2,
  Heart,
  Utensils,
  Gift,
  Coffee,
} from "lucide-react";
import aboutUsGulabJamun from "./../assets/images/abousUsGulabJamun.jpg";
import aboutUsChef from "./../assets/images/aboutUsChep.jpg";
import aboutUsBanner from "./../assets/images/aboutUsBanner2.jpg";
import { Link } from "react-router-dom";
import aboutDeliver from "./../assets/images/aboutdelivery.jpeg";
import aboutCraftsmen from "./../assets/images/aboutcraftsmen.jpeg";
import about15yrs from "./../assets/images/about15yrs.jpeg";
import aboutShop from "./../assets/images/MBRBBranch5.jpg";
import aboutsweet1 from "./../assets/images/aboutsweet1.jpeg";
import aboutsweet2 from "./../assets/images/aboutsweet2.jpeg";
import aboutsweet3 from "./../assets/images/aboutsweet3.jpeg";
import aboutsweet4 from "./../assets/images/aboutsweet4.jpeg";

function About() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div
        className="relative h-[600px] bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url("${aboutUsBanner}")`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
            <div className="text-white max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Crafting Sweet Moments Since 2008
              </h1>
              <p className="text-xl md:text-2xl mb-8 leading-relaxed">
                From the heart of Rajasthan to homes across India, we bring you
                authentic sweets made with time-honored recipes and the finest
                ingredients.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to={"/sweets"}
                  className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-8 rounded-full inline-flex items-center transition-all"
                >
                  Explore Our Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-orange-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "15+", label: "Years of Excellence" },
              { number: "50+", label: "Sweet Varieties" },
              { number: "10K+", label: "Happy Customers" },
              { number: "25+", label: "Cities Served" },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-sm uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Legacy Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our Legacy of Authenticity & Excellence
              </h2>
              <div className="space-y-6 text-lg text-gray-600">
                <p>
                  Since our humble beginnings in 2008, MBRB Sweets has been more
                  than just a sweets manufacturer – we've been creators of
                  moments, memories, and traditions.
                </p>
                <p>
                  Our journey began in a small kitchen in Jaipur, where our
                  founder's passion for preserving authentic Rajasthani recipes
                  met with a vision to share these delicacies with the world.
                  Today, we stand as one of Rajasthan's most trusted names in
                  traditional sweets and premium raw materials.
                </p>
                <p>
                  Every sweet that leaves our kitchen carries with it the warmth
                  of tradition, the excellence of craftsmanship, and our
                  commitment to quality that has earned us the trust of
                  thousands of families across India.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="border border-orange-200 rounded-lg p-4 bg-orange-50">
                  <Star className="h-8 w-8 text-orange-600 mb-2" />
                  <h3 className="font-semibold text-gray-900">
                    Premium Quality
                  </h3>
                  <p className="text-sm text-gray-600">
                    Only the finest ingredients make it to our kitchen
                  </p>
                </div>
                <div className="border border-orange-200 rounded-lg p-4 bg-orange-50">
                  <Shield className="h-8 w-8 text-orange-600 mb-2" />
                  <h3 className="font-semibold text-gray-900">Food Safety</h3>
                  <p className="text-sm text-gray-600">
                    FSSAI certified facilities and processes
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-12 lg:mt-0 grid grid-cols-1 gap-8">
              <div className="aspect-[4/3] overflow-hidden rounded-lg shadow-xl">
                <img
                  src={aboutUsChef}
                  alt="Traditional sweets display"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[4/3] overflow-hidden rounded-lg shadow-xl">
                <img
                  src={aboutUsGulabJamun}
                  alt="Chef preparing sweets"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Process Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Our Commitment to Excellence
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <Leaf className="h-12 w-12 text-orange-600" />,
                title: "Ingredient Selection",
                description:
                  "We source the finest ingredients directly from trusted farmers and suppliers, ensuring every component meets our strict quality standards.",
              },
              {
                icon: <Clock className="h-12 w-12 text-orange-600" />,
                title: "Traditional Methods",
                description:
                  "Our master craftsmen follow time-honored recipes and techniques, taking no shortcuts in the pursuit of authentic taste.",
              },
              {
                icon: <Shield className="h-12 w-12 text-orange-600" />,
                title: "Quality Control",
                description:
                  "Every batch undergoes rigorous quality checks before reaching our customers, ensuring consistent excellence in every bite.",
              },
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-6">{process.icon}</div>
                <h3 className="text-2xl font-semibold mb-4">{process.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {process.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="grid grid-cols-2 gap-6">
              {[
                {
                  icon: <Award className="h-8 w-8 text-orange-600" />,
                  title: "15+ Years of Expertise",
                  description: "A legacy built on trust and quality.",
                  image: about15yrs,
                },
                {
                  icon: <Users2 className="h-8 w-8 text-orange-600" />,
                  title: "Master Craftsmen",
                  description: "Generations of expertise in every creation.",
                  image: aboutCraftsmen,
                },
                {
                  icon: <MapPin className="h-8 w-8 text-orange-600" />,
                  title: "10+ Premium Outlets",
                  description: "Conveniently located across Rajasthan.",
                  image: aboutShop,
                },
                {
                  icon: <Truck className="h-8 w-8 text-orange-600" />,
                  title: "Pan-India Delivery",
                  description: "Swift delivery to your doorstep.",
                  image: aboutDeliver,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-xl shadow-lg"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="bg-orange-200 p-2 rounded-full w-max flex items-center justify-center mb-2">
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                    <p className="text-sm opacity-90">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-8">
              <h3 className="text-3xl font-bold text-gray-900">
                Excellence in Every Bite
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our commitment to quality and tradition has made us one of
                Rajasthan's most trusted names in traditional sweets. We combine
                age-old recipes with modern techniques to create sweets that are
                not just delicious but also a testament to our rich culinary
                heritage.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {[
                  {
                    icon: <Heart className="h-6 w-6" />,
                    title: "Made with Love",
                    value: "100%",
                  },
                  {
                    icon: <Utensils className="h-6 w-6" />,
                    title: "Quality Ingredients",
                    value: "Premium",
                  },
                  {
                    icon: <Gift className="h-6 w-6" />,
                    title: "Perfect for Gifts",
                    value: "Always",
                  },
                  {
                    icon: <Coffee className="h-6 w-6" />,
                    title: "Fresh Daily",
                    value: "24/7",
                  },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="bg-orange-50 rounded-lg p-4 flex items-center space-x-4"
                  >
                    <div className="bg-orange-100 rounded-full p-3 text-orange-600">
                      {stat.icon}
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{stat.title}</p>
                      <p className="text-lg font-bold text-orange-600">
                        {stat.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 bg-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                text: "The best Rajasthani sweets I've ever had! Their attention to detail and quality is unmatched. Every celebration at our home is incomplete without MBRB Sweets.",
                author: "Priya Sharma",
                position: "Regular Customer",
              },
              {
                text: "As a business owner, I appreciate their professionalism and consistency. Their bulk order handling and timely delivery have made them our go-to supplier for corporate gifts.",
                author: "Rajesh Kumar",
                position: "Business Client",
              },
              {
                text: "The authentic taste of their sweets reminds me of my childhood in Rajasthan. It's heartwarming to find such quality and tradition being maintained so beautifully.",
                author: "Amit Singhania",
                position: "Food Critic",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg">
                <div className="flex items-center mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="h-5 w-5 text-orange-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div>
                  <p className="font-semibold text-gray-900">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-gray-500">
                    {testimonial.position}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section - Enhanced with visual elements */}
      <div className="py-20 bg-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">
                Visit Our Store
              </h2>
              <div className="bg-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                  <p className="text-lg text-gray-800 mb-8">
                    Experience our sweets in person at our flagship store:
                  </p>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <MapPin className="h-6 w-6 text-orange-600 flex-shrink-0 mt-1" />
                      <p className="text-gray-600">
                        GVM Road, Girdhar Market,
                        <br />
                        Near Bus Stand Sardarshaher,
                        <br />
                        Churu, Rajasthan, 331403
                      </p>
                    </div>
                    <a
                      href="tel:6350127930"
                      className="flex items-center space-x-4 text-orange-600 hover:text-orange-700 transition-colors"
                    >
                      <Phone className="h-6 w-6" />
                      <span>+91 6350127930</span>
                    </a>
                    <a
                      href="mailto:enquiry@mbrb.in"
                      className="flex items-center space-x-4 text-orange-600 hover:text-orange-700 transition-colors"
                    >
                      <Mail className="h-6 w-6" />
                      <span>enquiry@mbrb.in</span>
                    </a>
                  </div>
                  <div className="mt-8 pt-8 border-t border-gray-100">
                    <p className="text-gray-600">
                      <span className="font-semibold">Business Hours:</span>
                      <br />
                      Monday - Sunday, 8:00 AM - 9:00 PM
                    </p>
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100 rounded-full -mr-32 -mt-32 opacity-20"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-100 rounded-full -ml-24 -mb-24 opacity-20"></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[aboutsweet1, aboutsweet2, aboutsweet3, aboutsweet4].map(
                (image, index) => (
                  <div
                    key={index}
                    className={`rounded-lg overflow-hidden shadow-lg ${
                      index === 1 || index === 2 ? "translate-y-8" : ""
                    }`}
                  >
                    <img
                      src={image}
                      alt="Store and products"
                      className="w-full h-48 object-cover transform hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
