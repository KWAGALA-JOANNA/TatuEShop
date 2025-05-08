// eslint-disable-next-line no-unused-vars
import React from 'react';

const Football = () => {
  const images = [
    "https://source.unsplash.com/random/300x300?football",
    "https://source.unsplash.com/random/300x300?soccer",
    "https://source.unsplash.com/random/300x300?stadium",
    "https://source.unsplash.com/random/300x300?goal",
    "https://source.unsplash.com/random/300x300?boots",
    "https://source.unsplash.com/random/300x300?jersey",
    "https://source.unsplash.com/random/300x300?referee",
    "https://source.unsplash.com/random/300x300?fans",
    "https://source.unsplash.com/random/300x300?trophy",
  ];

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="mb-6 text-3xl font-bold text-center">Football</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {images.map((image, index) => (
          <div key={index} className="p-4 bg-white rounded-lg shadow-lg">
            <img src={image} alt={`Football ${index + 1}`} className="object-cover w-full h-48 rounded-lg" />
            <h2 className="mt-4 text-xl font-semibold">Football Product {index + 1}</h2>
            <p className="mt-2 text-gray-600">Description of the football product.</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Football;