// import React from 'react';

const Laptops = () => {
    const images = [
      "src/assets/category/macbook.png",
      "https://source.unsplash.com/random/300x300?net",
      "https://source.unsplash.com/random/300x300?court",
      "https://source.unsplash.com/random/300x300?ball",
      "https://source.unsplash.com/random/300x300?team",
      "https://source.unsplash.com/random/300x300?spike",
      "https://source.unsplash.com/random/300x300?serve",
      "https://source.unsplash.com/random/300x300?match",
      "https://source.unsplash.com/random/300x300?trophy",
    ];
  
    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-6"> Laptops</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-lg">
              <img src={image} alt={`Laptops ${index + 1}`} className="w-full h-48 object-cover rounded-lg" />
              <h2 className="text-xl font-semibold mt-4">Laptops Product {index + 1}</h2>
              <p className="mt-2 text-gray-600">Description of the  Laptops product.</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Laptops;