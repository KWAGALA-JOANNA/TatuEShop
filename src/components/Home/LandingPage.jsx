import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const products = [
  { id: 1, name: "Macbook", price: "$29.99", img: "src/assets/category/macbook.png" },
  { id: 2, name: "PS-5", price: "$34.99", img: "src/assets/category/gaming.png" },
  { id: 3, name: "Smart Watch", price: "$39.99", img: "src/assets/category/smartwatch2-removebg-preview.png" },
];

const LandingPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer); // Cleanup timeout
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section with Video */}
      <section className="relative h-[90vh] flex items-center justify-center text-center px-4">
        <motion.video
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="src/assets/video/hero-video.mp4" type="video/mp4" />
        </motion.video>

        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="relative z-10 text-white">
          <h1 className="text-5xl font-extrabold">Discover the Best Deals</h1>
          <p className="mt-3 text-lg text-gray-200">Shop the latest tech with unbeatable prices.</p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg"
          >
            Shop Now
          </motion.button>
        </div>
      </section>

      {/* Featured Products with Images */}
      <section className="py-16 px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800">Featured Products</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {products.map((product) => (
            <motion.div
              key={product.id}
              className="p-6 bg-white shadow-md rounded-lg"
              whileHover={{ scale: 1.05 }}
            >
              {loading ? (
                <div className="animate-pulse">
                  <div className="h-48 bg-gray-300 rounded-lg"></div>
                  <div className="mt-4 h-6 bg-gray-300 w-3/4 rounded"></div>
                  <div className="mt-2 h-4 bg-gray-300 w-1/2 rounded"></div>
                  <div className="mt-4 h-10 bg-gray-300 w-full rounded"></div>
                </div>
              ) : (
                <>
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <h3 className="mt-4 text-lg font-semibold text-gray-800">{product.name}</h3>
                  <p className="text-gray-500 mt-2">{product.price}</p>
                  <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md w-full">
                    Add to Cart
                  </button>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
