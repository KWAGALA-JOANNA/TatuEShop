import { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  CardActions, 
  Button, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  Pagination,
  Slider,
  Chip,
  IconButton,
  Rating,
  Skeleton,
  Drawer,
  Box,
  List,
  ListItem,
  Divider
} from '@mui/material';
import { 
  FilterList, 
  ViewModule, 
  ViewList, 
  ShoppingCart, 
  Favorite, 
  FavoriteBorder,
  ViewInAr,
  Visibility,
  Sort,
  Close
} from '@mui/icons-material';
import { useTheme } from '../../Theme/ThemeProvider';
import { useAuth } from '../Hooks/UseAuth';
import { motion } from 'framer-motion';

// Mock product data (replace with your API call)
// import { fetchProducts } from '../Api/productApi';

const Shop = () => {
  const { theme } = useTheme();
  const { isLoggedIn } = useAuth();
  const isDarkMode = theme === 'dark';
  
  // State
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [sortBy, setSortBy] = useState('featured');
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [setActiveARProduct] = useState(null);
  
  const productsPerPage = 12;
  
  // Mock categories based on your navbar
  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'sports', label: 'Sports' },
    { value: 'fashion', label: 'Fashion' },
    { value: 'health', label: 'Health' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'kitchenware', label: 'Kitchenware' },
    { value: 'furniture', label: 'Furniture' }
  ];

  // Fetch products
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        // In a real app, replace this with an actual API call
        const data = await mockFetchProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    
    getProducts();
  }, []);
  
  // Mock API function (replace with real API)
  const mockFetchProducts = async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: `Product ${i + 1}`,
      description: `This is a description for product ${i + 1}. It features high quality materials and modern design.`,
      price: Math.floor(Math.random() * 9000) + 1000,
      category: categories[Math.floor(Math.random() * (categories.length - 1)) + 1].value,
      image: `/api/placeholder/300/300?text=Product${i+1}`,
      rating: (Math.random() * 5).toFixed(1),
      hasAR: Math.random() > 0.7, // 30% of products have AR
      hasVR: Math.random() > 0.8, // 20% of products have VR
      stockStatus: Math.random() > 0.2 ? 'In Stock' : 'Out of Stock'
    }));
  };
  
  // Filter and sort products
  useEffect(() => {
    let result = [...products];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (selectedCategory) {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Apply price range filter
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Apply sorting
    switch (sortBy) {
      case 'priceLow':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'priceHigh':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => b.id - a.id);
        break;
      default:
        // featured - no specific sorting
        break;
    }
    
    setFilteredProducts(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, selectedCategory, priceRange, sortBy, products]);
  
  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const pageCount = Math.ceil(filteredProducts.length / productsPerPage);
  
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleAddToCart = (productId) => {
    if (!isLoggedIn) {
      // Redirect to login or show login modal
      alert('Please log in to add items to cart');
      return;
    }
    
    // Add to cart logic
    console.log(`Adding product ${productId} to cart`);
    // In a real app, dispatch this to your cart state/API
  };
  
  const toggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter(id => id !== productId));
    } else {
      setFavorites([...favorites, productId]);
    }
  };
  
  const openARView = (product) => {
    setActiveARProduct(product);
    // In a real implementation, you would launch your AR viewer here
    alert(`Opening AR view for ${product.name}. In a real app, this would launch an AR experience.`);
  };
  
  const handleVRView = (product) => {
    // In a real implementation, you would launch your VR viewer here
    alert(`Opening VR view for ${product.name}. In a real app, this would launch a VR experience.`);
  };
  
  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price);
  };
  
  // Loading skeletons
  const renderSkeletons = () => {
    return Array.from({ length: productsPerPage }).map((_, index) => (
      <Grid item xs={12} sm={6} md={viewMode === 'grid' ? 4 : 12} lg={viewMode === 'grid' ? 3 : 12} key={`skeleton-${index}`}>
        <Card 
          elevation={2}
          sx={{ 
            height: '100%',
            display: 'flex',
            flexDirection: viewMode === 'grid' ? 'column' : 'row',
            backgroundColor: isDarkMode ? 'rgba(38, 38, 38, 0.9)' : '#fff'
          }}
        >
          <Skeleton 
            variant="rectangular" 
            sx={{ 
              width: viewMode === 'grid' ? '100%' : 200,
              height: viewMode === 'grid' ? 200 : '100%',
            }} 
            animation="wave" 
          />
          
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <CardContent>
              <Skeleton variant="text" width="80%" height={28} animation="wave" />
              <Skeleton variant="text" width="40%" height={20} animation="wave" />
              {viewMode === 'list' && (
                <>
                  <Skeleton variant="text" width="100%" height={18} animation="wave" />
                  <Skeleton variant="text" width="90%" height={18} animation="wave" />
                </>
              )}
            </CardContent>
            <CardActions>
              <Skeleton variant="rectangular" width={100} height={36} animation="wave" />
              <Skeleton variant="circular" width={36} height={36} animation="wave" />
            </CardActions>
          </Box>
        </Card>
      </Grid>
    ));
  };
  
  // Product card
  const renderProductCard = (product) => {
    const isFavorite = favorites.includes(product.id);
    
    return (
      <Grid item xs={12} sm={6} md={viewMode === 'grid' ? 4 : 12} lg={viewMode === 'grid' ? 3 : 12} key={product.id}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card 
            elevation={2}
            sx={{ 
              height: '100%',
              display: 'flex',
              flexDirection: viewMode === 'grid' ? 'column' : 'row',
              backgroundColor: isDarkMode ? 'rgba(38, 38, 38, 0.9)' : '#fff',
              '&:hover': {
                boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                transform: 'translateY(-4px)',
                transition: 'all 0.3s ease'
              }
            }}
          >
            <CardMedia
              component="img"
              sx={{ 
                height: viewMode === 'grid' ? 200 : 160,
                width: viewMode === 'grid' ? '100%' : 160,
                objectFit: 'cover'
              }}
              image={product.image}
              alt={product.name}
            />
            
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="h2" noWrap>
                  {product.name}
                </Typography>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="h6" color="primary" fontWeight="bold">
                    {formatPrice(product.price)}
                  </Typography>
                  
                  <Chip 
                    label={product.stockStatus}
                    color={product.stockStatus === 'In Stock' ? 'success' : 'error'}
                    size="small"
                  />
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Rating value={parseFloat(product.rating)} precision={0.5} readOnly size="small" />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    ({product.rating})
                  </Typography>
                </Box>
                
                {viewMode === 'list' && (
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                )}
                
                {viewMode === 'list' && (
                  <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                    {product.hasAR && (
                      <Chip 
                        icon={<ViewInAr fontSize="small" />} 
                        label="AR Available" 
                        size="small" 
                        color="primary"
                        variant="outlined"
                      />
                    )}
                    {product.hasVR && (
                      <Chip 
                        icon={<Visibility fontSize="small" />} 
                        label="VR Available" 
                        size="small" 
                        color="secondary"
                        variant="outlined" 
                      />
                    )}
                  </Box>
                )}
              </CardContent>
              
              <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
                <Box>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    startIcon={<ShoppingCart />}
                    onClick={() => handleAddToCart(product.id)}
                    disabled={product.stockStatus !== 'In Stock'}
                    size="small"
                  >
                    Add to Cart
                  </Button>
                </Box>
                
                <Box sx={{ display: 'flex' }}>
                  {product.hasAR && (
                    <IconButton 
                      color="primary" 
                      onClick={() => openARView(product)}
                      size="small"
                      sx={{ mr: 1 }}
                    >
                      <ViewInAr />
                    </IconButton>
                  )}
                  
                  {product.hasVR && (
                    <IconButton 
                      color="secondary" 
                      onClick={() => handleVRView(product)}
                      size="small"
                      sx={{ mr: 1 }}
                    >
                      <Visibility />
                    </IconButton>
                  )}
                  
                  <IconButton 
                    color="error" 
                    onClick={() => toggleFavorite(product.id)}
                    size="small"
                  >
                    {isFavorite ? <Favorite /> : <FavoriteBorder />}
                  </IconButton>
                </Box>
              </CardActions>
            </Box>
          </Card>
        </motion.div>
      </Grid>
    );
  };

  // Filter drawer for mobile
  const renderFilterDrawer = () => (
    <Drawer
      anchor="right"
      open={filterDrawerOpen}
      onClose={() => setFilterDrawerOpen(false)}
    >
      <Box sx={{ width: 280, p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Filters</Typography>
          <IconButton onClick={() => setFilterDrawerOpen(false)}>
            <Close />
          </IconButton>
        </Box>
        
        <Divider sx={{ mb: 2 }} />
        
        <List>
          <ListItem>
            <FormControl fullWidth size="small">
              <InputLabel>Category</InputLabel>
              <Select
                value={selectedCategory}
                label="Category"
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <MenuItem key={category.value} value={category.value}>
                    {category.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </ListItem>
          
          <ListItem>
            <Box sx={{ width: '100%' }}>
              <Typography id="price-range-slider" gutterBottom>
                Price Range: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
              </Typography>
              <Slider
                value={priceRange}
                onChange={handlePriceRangeChange}
                valueLabelDisplay="auto"
                min={0}
                max={10000}
                step={100}
                valueLabelFormat={(value) => formatPrice(value)}
              />
            </Box>
          </ListItem>
          
          <ListItem>
            <FormControl fullWidth size="small">
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                label="Sort By"
                onChange={(e) => setSortBy(e.target.value)}
              >
                <MenuItem value="featured">Featured</MenuItem>
                <MenuItem value="priceLow">Price: Low to High</MenuItem>
                <MenuItem value="priceHigh">Price: High to Low</MenuItem>
                <MenuItem value="rating">Best Rating</MenuItem>
                <MenuItem value="newest">Newest</MenuItem>
              </Select>
            </FormControl>
          </ListItem>
        </List>
        
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
          <Button 
            variant="outlined" 
            onClick={() => {
              setSelectedCategory('');
              setPriceRange([0, 10000]);
              setSortBy('featured');
              setSearchTerm('');
            }}
          >
            Clear All Filters
          </Button>
        </Box>
      </Box>
    </Drawer>
  );

  return (
    <Container maxWidth="xl" sx={{ mt: 12, mb: 8 }}>
      {/* Hero Section */}
      <Box 
        sx={{ 
          py: 6, 
          px: 2,
          mb: 4, 
          borderRadius: 2,
          backgroundImage: 'linear-gradient(135deg, #3f51b5 0%, #2196f3 100%)',
          color: 'white',
          textAlign: 'center'
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Shop Our Collection
        </Typography>
        <Typography variant="h6" gutterBottom>
          Discover products with AR & VR experiences
        </Typography>
      </Box>

      {/* Filters and Controls */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
          />
        </Grid>
        
        <Grid item xs={6} md={2}>
          <FormControl fullWidth size="small" sx={{ display: { xs: 'none', md: 'block' } }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategory}
              label="Category"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <MenuItem key={category.value} value={category.value}>
                  {category.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <Button 
            variant="outlined" 
            startIcon={<FilterList />}
            fullWidth
            sx={{ display: { xs: 'flex', md: 'none' } }}
            onClick={() => setFilterDrawerOpen(true)}
          >
            Filters
          </Button>
        </Grid>
        
        <Grid item xs={6} md={2}>
          <FormControl fullWidth size="small">
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortBy}
              label="Sort By"
              onChange={(e) => setSortBy(e.target.value)}
              IconComponent={Sort}
            >
              <MenuItem value="featured">Featured</MenuItem>
              <MenuItem value="priceLow">Price: Low to High</MenuItem>
              <MenuItem value="priceHigh">Price: High to Low</MenuItem>
              <MenuItem value="rating">Best Rating</MenuItem>
              <MenuItem value="newest">Newest</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={12} md={2}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button 
                variant={viewMode === 'grid' ? 'contained' : 'outlined'}
                sx={{ minWidth: 'unset', mr: 1 }}
                onClick={() => setViewMode('grid')}
              >
                <ViewModule />
              </Button>
              <Button 
                variant={viewMode === 'list' ? 'contained' : 'outlined'}
                sx={{ minWidth: 'unset' }}
                onClick={() => setViewMode('list')}
              >
                <ViewList />
              </Button>
            </Box>
            
            <Box sx={{ display: { xs: 'flex', md: 'none' }, ml: 'auto' }}>
              <IconButton 
                color={viewMode === 'grid' ? 'primary' : 'default'} 
                onClick={() => setViewMode('grid')}
              >
                <ViewModule />
              </IconButton>
              <IconButton 
                color={viewMode === 'list' ? 'primary' : 'default'} 
                onClick={() => setViewMode('list')}
              >
                <ViewList />
              </IconButton>
            </Box>
          </Box>
        </Grid>
        
        {/* Price Range Filter - Desktop Only */}
        <Grid item xs={12} sx={{ display: { xs: 'none', md: 'block' } }}>
          <Box sx={{ px: 2 }}>
            <Typography id="price-range-slider" gutterBottom>
              Price Range: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
            </Typography>
            <Slider
              value={priceRange}
              onChange={handlePriceRangeChange}
              valueLabelDisplay="auto"
              min={0}
              max={10000}
              step={100}
              valueLabelFormat={(value) => formatPrice(value)}
            />
          </Box>
        </Grid>
      </Grid>
      
      {/* Results Summary */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Showing {filteredProducts.length > 0 ? indexOfFirstProduct + 1 : 0}-
          {Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} products
        </Typography>
        
        {(selectedCategory || searchTerm || priceRange[0] > 0 || priceRange[1] < 10000) && (
          <Button 
            size="small"
            onClick={() => {
              setSelectedCategory('');
              setPriceRange([0, 10000]);
              setSortBy('featured');
              setSearchTerm('');
            }}
          >
            Clear Filters
          </Button>
        )}
      </Box>
      
      {/* Product Grid */}
      <Grid container spacing={3}>
        {loading ? renderSkeletons() : currentProducts.map(renderProductCard)}
        
        {!loading && filteredProducts.length === 0 && (
          <Grid item xs={12}>
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h5" gutterBottom>No products found</Typography>
              <Typography variant="body1" color="text.secondary">
                Try adjusting your search or filter criteria
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>
      
      {/* Pagination */}
      {filteredProducts.length > productsPerPage && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
          <Pagination 
            count={pageCount} 
            page={currentPage} 
            onChange={handlePageChange} 
            color="primary"
            size="large"
            showFirstButton
            showLastButton
          />
        </Box>
      )}
      
      {/* AR Viewer Modal would go here */}
      {/* VR Viewer would go here */}
      
      {/* Mobile Filter Drawer */}
      {renderFilterDrawer()}
      
      {/* AR/VR Experience Info */}
      <Box sx={{ mt: 8, py: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Enhanced Shopping Experience
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%', p: 3, backgroundColor: isDarkMode ? 'rgba(38, 38, 38, 0.9)' : '#f5f5f5' }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <ViewInAr sx={{ fontSize: 60, color: '#3f51b5' }} />
              </Box>
              <Typography variant="h5" gutterBottom>
                Augmented Reality
              </Typography>
              <Typography variant="body1">
                Look for the AR icon to see how products would look in your space.
                Simply tap the AR button and point your camera to visualize the product in your environment.
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%', p: 3, backgroundColor: isDarkMode ? 'rgba(38, 38, 38, 0.9)' : '#f5f5f5' }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <Visibility sx={{ fontSize: 60, color: '#9c27b0' }} />
              </Box>
              <Typography variant="h5" gutterBottom>
                Virtual Reality
              </Typography>
              <Typography variant="body1">
                Experience products in immersive 3D virtual reality.
                Products with the VR icon offer a detailed virtual tour for a complete understanding of the item.
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Shop;