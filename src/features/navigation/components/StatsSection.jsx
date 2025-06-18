import { Typography, Card } from "@material-tailwind/react";

function StatsCard({ count, title, description }) {
  return (
    <Card color="transparent" shadow={false}>
      <Typography
        variant="gradient"
        className="text-4xl font-bold"
        color="blue-gray"
      >
        {count}
      </Typography>
      <hr className="mt-2 mb-4 max-w-sm" />
      <Typography variant="h5" color="blue-gray" className="mt-1 font-bold">
        {title}
      </Typography>
      <Typography className="text-base max-w-xs font-normal leading-7 !text-gray-500">
        {description}
      </Typography>
    </Card>
  );
}

const stats = [
  {
    count: "50,000+",
    title: "Orders Delivered",
    description:
      "Bringing smiles to our customers with timely delivery of delightful sweets.",
  },
  {
    count: "200+",
    title: "Unique Sweet Varieties",
    description: "From traditional delicacies to modern favorites, we have it all.",
  },
  {
    count: "98%",
    title: "Customer Satisfaction",
    description: "Our customers love the quality, taste, and freshness of our sweets.",
  },
  {
    count: "5",
    title: "Delivery Cities Covered",
    description:
      "Expanding our reach to deliver sweetness to more people every day.",
  },
];

export function StatsSection() {
  return (
    <section className="lg:py-28 py-10 px-8 container mx-auto">
      <div className="lg:mb-24 mb-10">
        <Typography
          color="blue-gray"
          className="mb-4 !text-2xl font-bold lg:!text-4xl"
        >
          Sweeten Every Moment with MBRB
        </Typography>
        <Typography variant="lead" className="w-w-full !text-gray-500 max-w-xl">
          At MBRB, we craft each sweet with love and care to make your moments special. Order online and indulge in the finest sweets delivered to your doorstep.
        </Typography>
      </div>
      <div className="grid gap-10 lg:grid-cols-1 lg:gap-24 xl:grid-cols-2 items-center">
        <Card className="bg-gray-100/50 py-24 text-center" shadow={false}>
          <Typography
            variant="h1"
            className="!text-cta !leading-snug text-5xl"
          >
            10,000+
          </Typography>
          <Typography variant="h5" color="blue-gray" className="mt-2 font-bold">
            Happy Customers
          </Typography>
          <Typography
            variant="h4"
            color="blue-gray"
            className="mt-10 font-bold"
          >
            Taste Happiness, One Sweet at a Time
          </Typography>
          <Typography
            variant="lead"
            className="mt-1 text-base mx-auto !text-gray-500 lg:w-8/12"
          >
            Thank you for trusting MBRB to make your celebrations sweeter. We are committed to serving you better every day!
          </Typography>
        </Card>
        <div>
          <div className="grid lg:grid-cols-2 gap-10 gap-x-20">
            {stats.map((props, key) => (
              <StatsCard key={key} {...props} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default StatsSection;
