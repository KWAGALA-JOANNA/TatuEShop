import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FiShoppingCart, 
  FiHeart, 
  FiSearch, 
  FiChevronRight, 
  FiArrowRight, 
  FiArrowLeft, 
  FiInstagram, 
  FiTwitter, 
  FiFacebook 
} from "react-icons/fi";
import { Star, ChevronLeft, ChevronRight, Clock, TrendingUp, Box } from 'lucide-react';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// Product data with enhanced details for better integration with detail page
export const products = [
  { 
    id: 1, 
    name: "Macbook Pro M2", 
    price: "$1,299", 
    originalPrice: "$1,499",
    img: "/images/macbook.png",
    hoverImages: [
      "/images/macbook-back.png",
      "/images/macbook-side.png",
      "/images/macbook-angle.png"
    ],
    category: "Laptops",
    rating: 4.8,
    reviewCount: 124,
    description: "The MacBook Pro M2 delivers exceptional performance with its powerful Apple M2 chip. Featuring a stunning Retina display, all-day battery life, and a sleek aluminum design.",
    features: [
      "Apple M2 chip with 8-core CPU",
      "13.3-inch Retina display",
      "Up to 20 hours battery life",
      "8GB unified memory",
      "256GB SSD storage"
    ],
    stock: 15,
    colors: ["Space Gray", "Silver"],
    sizes: ["13-inch", "16-inch"]
  },
  { 
    id: 2, 
    name: "PlayStation 5", 
    price: "$499", 
    originalPrice: "$549",
    img: "/images/ps5.png",
    hoverImages: [
      "/images/ps5-back.png",
      "/images/ps5-side.png",
      "/images/ps5-controller.png"
    ],
    category: "Gaming",
    rating: 4.9,
    reviewCount: 89,
    description: "Experience lightning-fast loading with an ultra-high speed SSD, deeper immersion with support for haptic feedback, adaptive triggers and 3D Audio.",
    features: [
      "4K UHD Blu-ray drive",
      "825GB SSD storage",
      "DualSense wireless controller",
      "Backward compatible with PS4",
      "Tempest 3D AudioTech"
    ],
    stock: 8,
    colors: ["White"],
    sizes: ["Standard", "Digital Edition"]
  },
  { 
    id: 3, 
    name: "Sony WH-1000XM5", 
    price: "$349", 
    originalPrice: "$399",
    img: "/images/placeholder/400/300",
    hoverImages: [
      "/images/placeholder/400/300",
      "/images/placeholder/400/300"
    ],
    category: "Audio",
    rating: 4.7,
    reviewCount: 65,
    description: "Industry-leading noise cancellation and exceptional sound quality.",
    features: [
      "30-hour battery life",
      "Adaptive Sound Control",
      "Touch controls",
      "Speak-to-chat technology"
    ],
    stock: 20,
    colors: ["Black", "Silver"],
    sizes: []
  },
  { 
    id: 4, 
    name: "iPad Air", 
    price: "$599", 
    originalPrice: "$649",
    img: "/images/placeholder/400/300",
    hoverImages: [
      "/images/placeholder/400/300",
      "/images/placeholder/400/300"
    ],
    category: "Tablets",
    rating: 4.6,
    reviewCount: 107,
    description: "Powerful. Colorful. Wonderful. Experience the power of the A14 Bionic chip.",
    features: [
      "10.9-inch Liquid Retina display",
      "A14 Bionic chip",
      "Compatible with Apple Pencil",
      "Touch ID for secure authentication"
    ],
    stock: 12,
    colors: ["Space Gray", "Silver", "Rose Gold", "Green", "Sky Blue"],
    sizes: ["64GB", "256GB"]
  }
];

export const latestProducts = [
  { 
    id: 5, 
    name: "Samsung Galaxy S23 Ultra", 
    price: "$1,199", 
    originalPrice: "$1,299",
    img: "/images/galaxy-s23.png",
    hoverImages: [
      "/images/galaxy-s23-back.png",
      "/images/galaxy-s23-side.png",
      "/images/galaxy-s23-camera.png"
    ],
    category: "Smartphones",
    rating: 4.9,
    reviewCount: 87,
    isNew: true,
    description: "The Galaxy S23 Ultra is the ultimate smartphone with pro-grade camera, long battery life and built-in S Pen for precision control.",
    features: [
      "200MP Adaptive Pixel sensor",
      "S Pen included",
      "5000mAh battery",
      "8K video recording",
      "Nightography capabilities"
    ],
    stock: 12,
    colors: ["Phantom Black", "Cream", "Green", "Lavender"],
    sizes: ["256GB", "512GB", "1TB"]
  },
  { 
    id: 6, 
    name: "Apple Watch Series 8", 
    price: "$399", 
    originalPrice: "$429",
    img: "/images/placeholder/400/300",
    hoverImages: [
      "/images/placeholder/400/300",
      "/images/placeholder/400/300"
    ],
    category: "Wearables",
    rating: 4.8,
    reviewCount: 56,
    isNew: true,
    description: "Advanced health features and a stunning always-on Retina display.",
    features: [
      "Temperature sensing",
      "Crash detection",
      "ECG app",
      "Water resistant to 50 meters"
    ],
    stock: 18,
    colors: ["Midnight", "Starlight", "Silver", "Red"],
    sizes: ["41mm", "45mm"]
  },
  { 
    id: 7, 
    name: "DJI Mini 3 Pro", 
    price: "$759", 
    originalPrice: "$799",
    img: "/images/placeholder/400/300",
    hoverImages: [
      "/images/placeholder/400/300",
      "/images/placeholder/400/300"
    ],
    category: "Drones",
    rating: 4.7,
    reviewCount: 42,
    isNew: true,
    description: "A powerful camera drone that weighs less than 249 g, with 4K HDR video.",
    features: [
      "34-minute flight time",
      "4K HDR video",
      "Tri-directional obstacle sensing",
      "FocusTrack subject tracking"
    ],
    stock: 7,
    colors: ["Gray"],
    sizes: []
  },
  { 
    id: 8, 
    name: "Bose QuietComfort Earbuds II", 
    price: "$279", 
    originalPrice: "$299",
    img: "/images/placeholder/400/300",
    hoverImages: [
      "/images/placeholder/400/300",
      "/images/placeholder/400/300"
    ],
    category: "Audio",
    rating: 4.6,
    reviewCount: 38,
    isNew: true,
    description: "The world's best noise cancelling earbuds, with personalized sound.",
    features: [
      "CustomTune sound calibration",
      "Up to 6 hours battery life",
      "IPX4 water resistance",
      "Touch controls"
    ],
    stock: 15,
    colors: ["Triple Black", "Soapstone"],
    sizes: []
  }
];

const categories = [
  { id: 1, name: "Electronics", icon: "📱", count: 42 },
  { id: 2, name: "Fashion", icon: "👗", count: 36 },
  { id: 3, name: "Home & Kitchen", icon: "🏠", count: 28 },
  { id: 4, name: "Beauty", icon: "💄", count: 19 },
  { id: 5, name: "Sports", icon: "⚽", count: 15 }
];

const sliderContent = [
  {
    id: 1,
    video: "/videos/hero-video.mp4",
    title: "Premium Tech Essentials",
    subtitle: "Discover the latest gadgets with exclusive discounts",
    buttonText: "Shop Now",
    color: "blue",
    alignment: "center",
    overlay: "medium",
  },
  {
    id: 2,
    image: "/images/hero-gaming.jpg",
    title: "Gaming Collection",
    subtitle: "Level up with premium gear",
    buttonText: "View Collection",
    color: "purple",
    alignment: "left",
    overlay: "light",
  },
  {
    id: 3,
    image: "/images/placeholder/1920/1080",
    title: "Smart Home Revolution",
    subtitle: "Transform your living space with cutting-edge technology",
    buttonText: "Explore Now",
    color: "green",
    alignment: "right",
    overlay: "medium",
  }
];

// Prop type definitions
// Update the productPropType definition to include reviews validation
const productPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  originalPrice: PropTypes.string,
  img: PropTypes.string.isRequired,
  hoverImages: PropTypes.arrayOf(PropTypes.string),
  category: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  reviewCount: PropTypes.number,
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      author: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      date: PropTypes.string,
    })
  ),
  isNew: PropTypes.bool,
  description: PropTypes.string,
  features: PropTypes.arrayOf(PropTypes.string),
  stock: PropTypes.number,
  colors: PropTypes.arrayOf(PropTypes.string),
  sizes: PropTypes.arrayOf(PropTypes.string)
});

const categoryPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired
});

const testimonialPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired
});

const slideContentPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  video: PropTypes.string,
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['blue', 'green', 'purple', 'red', 'orange']),
  alignment: PropTypes.oneOf(['left', 'center', 'right']),
  overlay: PropTypes.oneOf(['light', 'medium', 'dark'])
});

// Components
const NavigationButton = ({ onClick, ariaLabel, children, className = "" }) => (
  <button 
    onClick={onClick} 
    className={`bg-white/80 backdrop-blur-sm text-gray-800 hover:bg-white transition-all p-3 rounded-full shadow-lg ${className}`}
    aria-label={ariaLabel}
  >
    {children}
  </button>
);

NavigationButton.propTypes = {
  onClick: PropTypes.func,
  ariaLabel: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

const CategoryItem = ({ category }) => {
  const navigate = useNavigate();
  return (
    <div
      className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer text-center hover:-translate-y-1 duration-300 group"
      onClick={() => navigate(`/category/${category.id}`)}
    >
      <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{category.icon}</div>
      <h3 className="font-medium text-gray-900">{category.name}</h3>
      <p className="text-sm text-gray-500 mt-1">{category.count} items</p>
    </div>
  );
};

CategoryItem.propTypes = {
  category: categoryPropType.isRequired
};

const TestimonialCard = ({ testimonial }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm hover:-translate-y-1 transition-transform duration-300 border border-gray-100">
    <div className="flex items-center mb-4">
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={16} 
            className={`${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
          />
        ))}
      </div>
    </div>
    <p className="text-gray-700 mb-4 italic">
      &quot;{testimonial.text}&quot;
    </p>
    <div className="flex items-center">
      <div className="w-10 h-10 rounded-full mr-3 bg-gray-300 overflow-hidden">
        <img src={`/images/placeholder/80/80`} alt={testimonial.author} className="w-full h-full object-cover" />
      </div>
      <div>
        <h4 className="font-medium text-gray-900">{testimonial.author}</h4>
        <p className="text-sm text-gray-500">Verified Buyer</p>
      </div>
    </div>
  </div>
);

TestimonialCard.propTypes = {
  testimonial: testimonialPropType.isRequired
};

const ProductBadge = ({ isNew, discount }) => {
  if (isNew) {
    return (
      <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
        NEW
      </div>
    );
  }
  
  if (discount > 0) {
    return (
      <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
        {discount}% OFF
      </div>
    );
  }
  
  return null;
};

ProductBadge.propTypes = {
  isNew: PropTypes.bool,
  discount: PropTypes.number
};

const ProductCard = ({ product, onAddToCart }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const navigate = useNavigate();
  
  const calculateDiscount = () => {
    if (!product.originalPrice) return 0;
    const original = parseFloat(product.originalPrice.replace('$', '').replace(',', ''));
    const current = parseFloat(product.price.replace('$', '').replace(',', ''));
    return Math.round(((original - current) / original) * 100);
  };
  
  useEffect(() => {
    let interval;
    if (isHovering && product.hoverImages?.length > 0) {
      interval = setInterval(() => {
        setCurrentImageIndex(prev => (prev + 1) % (product.hoverImages.length + 1));
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isHovering, product.hoverImages]);
  
  const getCurrentImage = () => 
    !isHovering || currentImageIndex === 0 ? product.img : product.hoverImages[currentImageIndex - 1];

  const handleProductClick = () => navigate(`/products/${product.id}`);
  const discount = calculateDiscount();

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 group">
      <div 
        className="relative"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => {
          setIsHovering(false);
          setCurrentImageIndex(0);
        }}
      >
        <div className="w-full h-64 overflow-hidden bg-gray-100">
          <img
            src={getCurrentImage()}
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-500 cursor-pointer group-hover:scale-105"
            onClick={handleProductClick}
          />
        </div>
        
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              // Wishlist functionality
            }}
            aria-label="Add to wishlist"
          >
            <FiHeart className="text-gray-600" />
          </button>
          <button 
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              // Quick view functionality
            }}
            aria-label="Quick view"
          >
            <FiSearch className="text-gray-600" />
          </button>
        </div>
        
        <ProductBadge isNew={product.isNew} discount={discount} />
      </div>
      
      <div className="p-4">
        <div 
          className="flex justify-between items-start cursor-pointer"
          onClick={handleProductClick}
        >
          <div>
            <p className="text-sm text-blue-600 font-medium mb-1">{product.category}</p>
            <h3 className="font-medium text-gray-900 text-lg">{product.name}</h3>
          </div>
          <div className="text-right">
            <span className="font-bold text-gray-900">{product.price}</span>
            {product.originalPrice && (
              <span className="block text-xs text-gray-400 line-through">{product.originalPrice}</span>
            )}
          </div>
        </div>
        
        <div className="mt-3 flex items-center">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={16} 
                className={`${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">({product.reviewCount || product.reviews?.length || 0})</span>
          
          {product.stock <= 10 && (
            <span className="ml-auto text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
              Only {product.stock} left
            </span>
          )}
        </div>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product.id);
          }}
          className="mt-4 w-full py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg flex items-center justify-center gap-2 transition-colors group-hover:bg-blue-600"
        >
          <FiShoppingCart /> Add to Cart
        </button>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: productPropType.isRequired,
  onAddToCart: PropTypes.func.isRequired
};

const ProductGrid = ({ products, onAddToCart }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

ProductGrid.propTypes = {
  products: PropTypes.arrayOf(productPropType).isRequired,
  onAddToCart: PropTypes.func.isRequired
};

const SectionHeader = ({ title, subtitle, actionText, actionLink, navigate }) => (
  <div className="flex justify-between items-center mb-8">
    <div>
      <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
      {subtitle && <p className="mt-2 text-gray-600">{subtitle}</p>}
    </div>
    {actionText && (
      <button 
        className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
        onClick={() => navigate(actionLink)}
      >
        {actionText} <FiChevronRight className="ml-1" />
      </button>
    )}
  </div>
);

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  actionText: PropTypes.string,
  actionLink: PropTypes.string,
  navigate: PropTypes.func.isRequired
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1 duration-300 text-center border border-gray-100">
    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-full mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

FeatureCard.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

const HeroSlide = ({ slide, getGradientClass, getOverlayClass, getAlignmentClass }) => (
  <SwiperSlide key={slide.id} className="relative">
    <div className={`absolute inset-0 ${getOverlayClass(slide.overlay)} z-10`}></div>
    
    {slide.video ? (
      <video autoPlay muted loop className="absolute inset-0 w-full h-full object-cover">
        <source src={slide.video} type="video/mp4" />
      </video>
    ) : (
      <img src={slide.image} alt={slide.title} className="absolute inset-0 w-full h-full object-cover" />
    )}
    
    <div className={`relative z-20 flex items-center h-full container mx-auto px-6 ${getAlignmentClass(slide.alignment)}`}>
      <div className={`px-8 py-12 md:max-w-xl backdrop-blur-sm bg-black/10 rounded-xl`}>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
          {slide.title}
        </h1>
        <p className="text-xl text-gray-100 mb-8 max-w-md">
          {slide.subtitle}
        </p>
        <div className="flex flex-wrap gap-4">
          <button className={`px-8 py-3 bg-gradient-to-r ${getGradientClass(slide.color)} text-white font-medium rounded-lg shadow-lg hover:opacity-90 transition-opacity`}>
            {slide.buttonText}
          </button>
          <button className="px-8 py-3 bg-white/90 text-gray-800 font-medium rounded-lg shadow-lg hover:bg-white transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </div>
  </SwiperSlide>
);

HeroSlide.propTypes = {
  slide: slideContentPropType.isRequired,
  getGradientClass: PropTypes.func.isRequired,
  getOverlayClass: PropTypes.func.isRequired,
  getAlignmentClass: PropTypes.func.isRequired
};

const Newsletter = () => (
  <div className="bg-gray-900 text-white rounded-2xl p-8 md:p-12 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-30"></div>
    <div className="absolute right-0 bottom-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mb-32"></div>
    <div className="absolute left-0 top-0 w-32 h-32 bg-white/5 rounded-full -ml-16 -mt-16"></div>
    
    <div className="relative z-10 max-w-3xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
      <p className="text-gray-300 mb-6">Stay updated with our latest products and exclusive offers</p>
      
      <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
        <input 
          type="email" 
          placeholder="Your email address" 
          className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button 
          type="submit"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          Subscribe
        </button>
      </form>
      
      <p className="text-sm text-gray-400 mt-4">We respect your privacy. Unsubscribe at any time.</p>
    </div>
  </div>
);

const LandingPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [featuredSwiperInstance, setFeaturedSwiperInstance] = useState(null);
  const [testimonials] = useState([
    {
      id: 1,
      text: "The Macbook Pro is absolutely worth every penny. The performance is incredible and the build quality is top-notch.",
      author: "Sarah Johnson",
      rating: 5
    },
    {
      id: 2,
      text: "I've been using the PlayStation 5 for months now and it's been flawless. The graphics and load times are amazing.",
      author: "Michael Chen",
      rating: 5
    },
    {
      id: 3,
      text: "The Samsung Galaxy S23 Ultra has the best camera I've ever used on a smartphone. Battery life is impressive too!",
      author: "Emma Wilson",
      rating: 4
    }
  ]);

  useEffect(() => {
    // Simulate login check
    const timer = setTimeout(() => {
      setIsLoggedIn(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = (productId) => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      console.log(`Product ${productId} added to cart`);
      // In a real app, you would dispatch to your cart store/context
    }
  };

  const getGradientClass = (color) => {
    const gradients = {
      blue: "from-blue-600 to-blue-800",
      green: "from-green-500 to-green-700",
      purple: "from-purple-500 to-purple-800",
      red: "from-red-500 to-red-700",
      orange: "from-orange-500 to-orange-700"
    };
    return gradients[color] || gradients.blue;
  };

  const getOverlayClass = (overlay) => {
    const overlays = {
      light: "bg-black/20",
      medium: "bg-black/40",
      dark: "bg-black/60"
    };
    return overlays[overlay] || overlays.medium;
  };

  const getAlignmentClass = (alignment) => {
    const alignments = {
      left: "text-left justify-start",
      center: "text-center justify-center",
      right: "text-right justify-end"
    };
    return alignments[alignment] || alignments.center;
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="h-screen relative overflow-hidden">
        <div className="absolute top-1/2 left-4 z-30 transform -translate-y-1/2">
          <NavigationButton onClick={() => swiperInstance?.slidePrev()} ariaLabel="Previous slide">
            <ChevronLeft size={24} />
          </NavigationButton>
        </div>
        <div className="absolute top-1/2 right-4 z-30 transform -translate-y-1/2">
          <NavigationButton onClick={() => swiperInstance?.slideNext()} ariaLabel="Next slide">
            <ChevronRight size={24} />
          </NavigationButton>
        </div>

        <Swiper
          modules={[Autoplay, Navigation, Pagination, EffectFade]}
          effect="fade"
          spaceBetween={0}
          slidesPerView={1}
          pagination={{
            clickable: true,
            renderBullet: (index, className) => 
              `<span class="${className} w-3 h-3 bg-white opacity-70 inline-block rounded-full mx-1"></span>`,
          }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          className="h-full w-full"
          onSwiper={setSwiperInstance}
        >
          {sliderContent.map((slide) => (
            <HeroSlide 
              key={slide.id}
              slide={slide}
              getGradientClass={getGradientClass}
              getOverlayClass={getOverlayClass}
              getAlignmentClass={getAlignmentClass}
            />
          ))}
        </Swiper>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto -mt-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard 
            icon={<Clock size={24} />}
            title="Fast Delivery"
            description="Get your products delivered within 24 hours in selected areas"
          />
          <FeatureCard 
            icon={<TrendingUp size={24} />}
            title="Quality Products"
            description="All our products pass rigorous quality control standards"
          />
          <FeatureCard 
            icon={<Box size={24} />}
            title="Easy Returns"
            description="30-day hassle-free return policy on all purchases"
          />
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionHeader 
          title="Shop by Category" 
          subtitle="Browse our most popular collections"
          navigate={navigate}
        />
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((category) => (
            <CategoryItem key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeader 
            title="Featured Products" 
            subtitle="Our most popular products this week"
            actionText="View all"
            actionLink="/products"
            navigate={navigate}
          />
          
          <div className="relative">
            <NavigationButton 
              onClick={() => featuredSwiperInstance?.slidePrev()} 
              ariaLabel="Previous products"
              className="absolute -left-4 top-1/2 transform -translate-y-1/2 z-10 hidden md:flex"
            >
              <FiArrowLeft size={20} />
            </NavigationButton>
            
            <Swiper
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 4 }
              }}
              loop={true}
              onSwiper={setFeaturedSwiperInstance}
              className="featured-products-swiper"
            >
              {products.map(product => (
                <SwiperSlide key={product.id}>
                  <ProductCard product={product} onAddToCart={handleAddToCart} />
                </SwiperSlide>
              ))}
            </Swiper>
            
            <NavigationButton 
              onClick={() => featuredSwiperInstance?.slideNext()} 
              ariaLabel="Next products"
              className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-10 hidden md:flex"
            >
              <FiArrowRight size={20} />
            </NavigationButton>
          </div>
        </div>
      </section>

      {/* Banner Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-800 rounded-2xl p-8 md:p-12 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mt-24 -mr-24"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full -mb-16 -ml-16"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center">
            <div className="md:max-w-xl mb-8 md:mb-0">
              <span className="inline-block bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium mb-4">Limited Time</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Summer Sale!</h2>
              <p className="text-lg mb-6 text-blue-100">Up to 50% off on selected items. Don&apos;t miss out on these amazing deals.</p>
              <button 
                className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
                onClick={() => navigate('/sale')}
              >
                Shop the Sale
              </button>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <img src="/images/placeholder/400/400" alt="Summer Sale" className="rounded-lg max-w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Latest Products */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <SectionHeader 
            title="New Arrivals" 
            subtitle="Just landed in our store"
            actionText="View all"
            actionLink="/new-arrivals"
            navigate={navigate}
          />
          
          <ProductGrid 
            products={latestProducts} 
            onAddToCart={handleAddToCart}
          />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Customer Reviews</h2>
            <p className="mt-2 text-gray-600">Trusted by thousands of happy customers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Newsletter />
      </section>

      {/* Login Status (for demonstration) */}
      <div className="max-w-7xl mx-auto px-4 py-2 text-center bg-blue-50 rounded-lg mb-8">
        <p className="text-sm text-gray-600">
          {isLoggedIn 
            ? "You are logged in. Items will be added directly to your cart." 
            : "You are not logged in. You'll be redirected to login when adding items."}
        </p>
      </div>

      {/* Brands Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Trusted Brands</h2>
            <p className="mt-2 text-gray-600">We partner with the best to bring you quality products</p>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="grayscale hover:grayscale-0 transition-all duration-300">
                <div className="w-24 h-16 bg-gray-200 rounded flex items-center justify-center">
                  <span className="text-gray-500 font-bold">Brand {item}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div>
              <h3 className="text-xl font-bold mb-4">TechStore</h3>
              <p className="text-gray-400 mb-4">Your one-stop shop for premium tech gadgets and accessories.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <FiInstagram size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <FiTwitter size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <FiFacebook size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Shop</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Electronics</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Laptops</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Smartphones</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Accessories</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Wearables</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Shipping</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Returns</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Track Order</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">© 2025 TechStore. All rights reserved.</p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;