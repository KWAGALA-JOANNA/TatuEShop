import { useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom"; // Import Link from React Router

const categories = [
  {
    name: "Sports",
    subcategories: [
      {
        name: "Football",
        image: "/images/football.jpg",
        path: "/football",
      },
      {
        name: "Basketball",
        image: "/images/football.jpg",
        path: "/basketball",
      },
      {
        name: "Volleyball",
        image: "/images/basketball.jpg",
        path: "/Volleyball",
      },
      {
        name: "Tennis",
        image: "/images/tennis.jpg",
        path: "/tennis",
      },
      {
        name: "Swimming",
        image: "/images/swimming.jpg",
        path: "/swimming",
      },
      {
        name: "Cycling",
        image: "/images/cycling.jpg",
        path: "/cycling",
      },
    ],
  },
  {
    name: "Fashion",
    subcategories: [
      {
        name: "Men's Wear",
        image: "/images/menswear.jpg",
        path: "/MensWear",
      },
      {
        name: "Women's Wear",
        image: "/images/womenswear.jpg",
        path: "/WomensWear",
      },
      {
        name: "Footwear",
        image: "/images/footwear.jpg",
        path: "/Footwear",
      },
      {
        name: "Accessories",
        image: "/images/accessories.jpg",
        path: "/Accessories",
      },
    ],
  },
  {
    name: "Health",
    subcategories: [
      {
        name: "Fitness",
        image: "/images/fitness.jpg",
        path: "/Fitness",
      },
      {
        name: "Nutrition",
        image: "/images/nutrition.jpg",
        path: "/Nutrition",
      },
      {
        name: "Mental Health",
        image: "/images/mentalhealth.jpg",
        path: "/MentalHealth",
      },
      {
        name: "Medical Supplies",
        image: "/images/medicalsupplies.jpg",
        path: "/MedicalSupplies",
      },
    ],
  },
  {
    name: "Electronics",
    subcategories: [
      {
        name: "Mobile Phones",
        image: "/images/mobilephones.jpg",
        path: "/MobilePhones",
      },
      {
        name: "Laptops",
        image: "src/assets/category/laptop.jpg",
        path: "/Laptops",
      },
      {
        name: "Cameras",
        image: "/images/cameras.jpg",
        path: "/Cameras",
      },
      {
        name: "Audio Devices",
        image: "/images/audiodevices.jpg",
        path: "/AudioDevices",
      },
    ],
  },
  {
    name: "Kitchenware",
    subcategories: [
      {
        name: "Cookingware",
        image: "/images/cookingware.jpg",
        path: "/cookingware",
      },
      {
        name: "Utensils",
        image: "/images/utensils.jpg",
        path: "/utensils",
      },
      {
        name: "Appliances",
        image: "/images/appliances.jpg",
        path: "/appliances",
      },
      {
        name: "Storage",
        image: "/images/storage.jpg",
        path: "/storage",
      },
    ],
  },
  {
    name: "Furniture",
    subcategories: [
      { name: "Sofas", image: "/images/sofas.jpg", path: "/sofas" },
      {
        name: "Tables",
        image: "/images/tables.jpg",
        path: "/tables",
      },
      {
        name: "Chairs",
        image: "/images/chairs.jpg",
        path: "/chairs",
      },
      { name: "Beds", image: "/images/beds.jpg", path: "/beds" },
      {
        name: "Cabinets",
        image: "/images/cabinets.jpg",
        path: "/cabinets",
      },
    ],
  },
];

const Categories = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="min-h-screen p-6 text-white bg-gray-900">
      <div className="max-w-2xl p-6 mx-auto bg-gray-800 rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-center text-white">
          Categories
        </h2>
        <div className="space-y-4">
          {categories.map((category, index) => (
            <Accordion
              key={index}
              expanded={expanded === index}
              onChange={handleChange(index)}
              className="text-white bg-gray-800 rounded-md shadow-md"
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon className="text-white" />}
                className="bg-gray-700"
              >
                <h3 className="text-lg font-semibold">{category.name}</h3>
              </AccordionSummary>
              <AccordionDetails>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {category.subcategories.map((sub, idx) => (
                    <div key={idx} className="flex items-center space-x-4">
                      <img
                        src={sub.image}
                        alt={sub.name}
                        className="object-cover w-16 h-16 rounded-md"
                      />
                      <Link
                        to={sub.path}
                        className="text-blue-400 hover:underline"
                      >
                        {sub.name}
                      </Link>
                    </div>
                  ))}
                </div>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
