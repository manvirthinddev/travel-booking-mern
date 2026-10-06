import { useEffect, useState } from "react";

const testimonials = [
  {
    name: "Sophia Martinez",
    role: "Travel Blogger",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    text: "Absolutely incredible experience! The booking process was seamless, and the destinations were breathtaking.",
  },
  {
    name: "Daniel Lee",
    role: "Entrepreneur",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "Beautiful interface and extremely easy booking process. It feels like a real premium travel platform.",
  },
  {
    name: "Ava Johnson",
    role: "Photographer",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    text: "Luxury stays, smooth payments, and amazing support. Traveling has never been this stress-free!",
  },
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">

      {/* Soft floating shapes */}
      <div className="absolute w-60 h-60 bg-white rounded-full blur-3xl top-10 left-10 opacity-40"></div>
      <div className="absolute w-60 h-60 bg-gray-300 rounded-full blur-3xl bottom-10 right-10 opacity-40"></div>

      {/* Heading */}
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
        Loved by Travelers 
      </h2>

      <div className="flex justify-center px-4">

        {/* SMALL PREMIUM CARD */}
        <div
          key={index}
          className="
            max-w-xl
            bg-white/70
            backdrop-blur-lg
            border border-gray-200
            p-6
            rounded-2xl
            shadow-[0_10px_40px_rgba(0,0,0,0.08)]
            text-center
            transition
            duration-700
          "
        >
          {/* Review */}
          <p className="text-gray-700 text-base leading-relaxed mb-4">
            “{testimonials[index].text}”
          </p>

          {/* Stars */}
          <div className="text-yellow-500 text-lg mb-4">
            ⭐⭐⭐⭐⭐
          </div>

          {/* Profile */}
          <div className="flex items-center justify-center gap-3">
            <img
              src={testimonials[index].image}
              alt={testimonials[index].name}
              className="w-12 h-12 rounded-full object-cover"
            />

            <div className="text-left">
              <h4 className="font-semibold text-gray-900 text-sm">
                {testimonials[index].name}
              </h4>

              <p className="text-gray-500 text-xs">
                {testimonials[index].role}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Slider dots */}
      <div className="flex justify-center mt-6 gap-2">
        {testimonials.map((_, i) => (
          <div
            key={i}
            className={`h-2 w-2 rounded-full transition ${
              i === index ? "bg-gray-800 scale-125" : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
