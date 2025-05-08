import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Truck, Check, ChevronDown, ChevronUp } from 'lucide-react';

// Import product data from landing page (would normally come from API)
import { products, latestProducts } from '../Home/LandingPage.jsx';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [expandedSection, setExpandedSection] = useState("description");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Combine both product arrays from the landing page
        const allProducts = [...products, ...latestProducts];
        const foundProduct = allProducts.find(p => p.id === parseInt(id));
        
        if (foundProduct) {
          // Transform the product data to match the detail page structure
          const detailedProduct = {
            ...foundProduct,
            price: parseFloat(foundProduct.price.replace('$', '').replace(',', '')),
            originalPrice: foundProduct.originalPrice ? 
              parseFloat(foundProduct.originalPrice.replace('$', '').replace(',', '')) : null,
            discount: foundProduct.originalPrice ? 
              Math.round(((parseFloat(foundProduct.originalPrice.replace('$', '').replace(',', '')) - 
                parseFloat(foundProduct.price.replace('$', '').replace(',', ''))) / 
                parseFloat(foundProduct.originalPrice.replace('$', '').replace(',', ''))) * 100) : 0,
            stock: 14, // Default value
            shippingEstimate: "3-5", // Default value
            colors: ["Black", "White", "Navy", "Gray"], // Default options
            sizes: ["XS", "S", "M", "L", "XL"], // Default options
            images: [
              foundProduct.img,
              ...(foundProduct.hoverImages || [])
            ],
            features: foundProduct.features || [ // Default features
              "Premium quality materials",
              "High-performance components",
              "Durable construction",
              "Manufacturer warranty",
              "Free returns within 30 days"
            ],
            reviews: foundProduct.reviews || [ // Default reviews
              {
                id: 1,
                user: "Alex M.",
                rating: 5,
                date: "April 28, 2025",
                comment: "Absolutely love this product! It was exactly as described and works perfectly.",
                helpful: 24
              },
              {
                id: 2,
                user: "Jordan T.",
                rating: 4,
                date: "April 15, 2025",
                comment: "Good quality and works as expected. Very satisfied with the purchase.",
                helpful: 11
              }
            ]
          };
          
          setProduct(detailedProduct);
          setSelectedColor(detailedProduct.colors[0]);
          setSelectedSize(detailedProduct.sizes[2]);
        } else {
          // Handle product not found
          console.error('Product not found');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleIncreaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const toggleSection = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star 
          key={i} 
          size={16} 
          className={`${i <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
        />
      );
    }
    return stars;
  };

  const handleAddToCart = () => {
    // In a real app, this would dispatch to your cart store/context
    alert(`Added ${quantity} ${selectedSize} ${selectedColor} ${product.name} to cart`);
  };

  const handleAddToWishlist = () => {
    // In a real app, this would add to wishlist
    alert(`Added ${product.name} to wishlist`);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-8 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mx-auto mb-6"></div>
          <div className="flex space-x-8">
            <div className="w-1/2 h-96 bg-gray-200 rounded"></div>
            <div className="w-1/2 space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-12 bg-gray-200 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-12 bg-gray-200 rounded w-full"></div>
              <div className="h-12 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
        <p className="text-gray-600 mb-6">The product you&apos;re looking for doesn&apos;t exist or may have been removed.</p>
        <button 
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-8">
      {/* Breadcrumb navigation */}
      <nav className="mb-6 text-sm">
        <ol className="flex space-x-2">
          <li><button onClick={() => navigate('/')} className="text-gray-500 hover:text-gray-700">Home</button></li>
          <li><span className="text-gray-500">/</span></li>
          <li><button onClick={() => navigate('/')} className="text-gray-500 hover:text-gray-700">{product.category}</button></li>
          <li><span className="text-gray-500">/</span></li>
          <li><span className="text-gray-900 font-medium">{product.name}</span></li>
        </ol>
      </nav>

      <div className="lg:flex lg:space-x-8">
        {/* Product Images */}
        <div className="lg:w-1/2 mb-8 lg:mb-0">
          <div className="relative bg-gray-100 rounded-lg overflow-hidden h-96 md:h-[500px]">
            <img 
              src={product.images[activeImage]} 
              alt={product.name} 
              className="w-full h-full object-contain p-4"
            />
            {product.discount > 0 && (
              <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                {product.discount}% OFF
              </div>
            )}
          </div>
          <div className="flex space-x-2 mt-4 overflow-x-auto pb-2">
            {product.images.map((image, index) => (
              <button 
                key={index}
                onClick={() => setActiveImage(index)}
                className={`flex-shrink-0 w-24 h-24 bg-gray-100 rounded overflow-hidden ${
                  index === activeImage ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <img 
                  src={image} 
                  alt={`${product.name} view ${index + 1}`} 
                  className="w-full h-full object-contain p-2"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="lg:w-1/2">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          
          <div className="mt-2 flex items-center">
            <div className="flex">
              {renderStars(product.rating)}
            </div>
            <span className="ml-2 text-gray-600 text-sm">({product.reviewCount || product.reviews.length} reviews)</span>
            <button 
              onClick={() => navigate(`#reviews`)}
              className="ml-4 text-sm text-blue-600 hover:underline"
            >
              View all
            </button>
          </div>
          
          <div className="mt-4">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <>
                  <span className="ml-2 text-lg text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
                  <span className="ml-2 bg-red-100 text-red-800 px-2 py-0.5 rounded text-xs font-medium">
                    Save {product.discount}%
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center text-green-600">
              <Check size={16} className="mr-1" />
              <span className="font-medium">In Stock</span>
              <span className="ml-1 text-gray-500">({product.stock} available)</span>
            </div>
            <div className="mt-2 flex items-center text-gray-600">
              <Truck size={16} className="mr-1" />
              <span>Estimated delivery in {product.shippingEstimate} business days</span>
            </div>
          </div>

          {/* Color Selection */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900">Color</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-3 py-1 border rounded-full ${
                    selectedColor === color 
                      ? 'border-blue-600 bg-blue-50 text-blue-600' 
                      : 'border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900">Size</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-10 h-10 flex items-center justify-center border rounded-md ${
                    selectedSize === size 
                      ? 'border-blue-600 bg-blue-50 text-blue-600' 
                      : 'border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
            <div className="flex border border-gray-300 rounded-md w-32 mt-2">
              <button 
                onClick={handleDecreaseQuantity} 
                className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                disabled={quantity <= 1}
              >
                -
              </button>
              <div className="flex-1 text-center py-1">{quantity}</div>
              <button 
                onClick={handleIncreaseQuantity} 
                className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                disabled={quantity >= product.stock}
              >
                +
              </button>
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div className="mt-8 flex space-x-4">
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 flex items-center justify-center transition-colors"
            >
              <ShoppingCart size={20} className="mr-2" />
              Add to Cart
            </button>
            <button 
              onClick={handleAddToWishlist}
              className="w-12 h-12 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <Heart size={20} className="text-gray-600" />
            </button>
          </div>

          {/* Collapsible Product Information */}
          <div className="mt-10 border-t border-gray-200 pt-6">
            {/* Description Section */}
            <div className="border-b border-gray-200 pb-4">
              <button 
                className="flex w-full justify-between items-center text-left"
                onClick={() => toggleSection('description')}
              >
                <h3 className="text-lg font-medium text-gray-900">Product Description</h3>
                {expandedSection === 'description' ? 
                  <ChevronUp size={20} className="text-gray-500" /> : 
                  <ChevronDown size={20} className="text-gray-500" />}
              </button>
              {expandedSection === 'description' && (
                <div className="mt-4 text-gray-600">
                  <p>{product.description}</p>
                </div>
              )}
            </div>
            
            {/* Features Section */}
            <div className="border-b border-gray-200 py-4">
              <button 
                className="flex w-full justify-between items-center text-left"
                onClick={() => toggleSection('features')}
              >
                <h3 className="text-lg font-medium text-gray-900">Features</h3>
                {expandedSection === 'features' ? 
                  <ChevronUp size={20} className="text-gray-500" /> : 
                  <ChevronDown size={20} className="text-gray-500" />}
              </button>
              {expandedSection === 'features' && (
                <ul className="mt-4 pl-5 space-y-2 text-gray-600 list-disc">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              )}
            </div>
            
            {/* Shipping and Returns Section */}
            <div className="border-b border-gray-200 py-4">
              <button 
                className="flex w-full justify-between items-center text-left"
                onClick={() => toggleSection('shipping')}
              >
                <h3 className="text-lg font-medium text-gray-900">Shipping & Returns</h3>
                {expandedSection === 'shipping' ? 
                  <ChevronUp size={20} className="text-gray-500" /> : 
                  <ChevronDown size={20} className="text-gray-500" />}
              </button>
              {expandedSection === 'shipping' && (
                <div className="mt-4 text-gray-600">
                  <p>Free standard shipping on all orders over $50. Expedited shipping options available at checkout.</p>
                  <p className="mt-2">Returns accepted within 30 days of delivery. Item must be in original condition with all tags attached.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Product Reviews */}
      <div id="reviews" className="mt-16 border-t border-gray-200 pt-8">
        <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
        
        <div className="mt-6 flex items-center">
          <div className="flex items-center">
            {renderStars(product.rating)}
            <p className="ml-2 text-gray-900">{product.rating} out of 5</p>
          </div>
          <p className="ml-4 text-sm text-gray-600">Based on {product.reviewCount || product.reviews.length} reviews</p>
        </div>
        
        <div className="mt-8">
          {product.reviews.map((review) => (
            <div key={review.id} className="py-6 border-b border-gray-200">
              <div className="flex items-center mb-2">
                <div className="flex">
                  {renderStars(review.rating)}
                </div>
                <p className="ml-2 font-medium text-gray-900">{review.user}</p>
                <span className="mx-2 text-gray-500">·</span>
                <p className="text-sm text-gray-500">{review.date}</p>
              </div>
              <p className="text-gray-700 mt-2">{review.comment}</p>
              <div className="mt-4 flex items-center">
                <button className="text-sm text-gray-500 flex items-center hover:text-gray-700">
                  <span>Helpful ({review.helpful})</span>
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8">
          <button className="bg-white border border-gray-300 rounded-md px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            Write a Review
          </button>
        </div>
      </div>
    </div>
  );
}