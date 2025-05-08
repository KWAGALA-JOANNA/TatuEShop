import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Drawer from '@mui/material/Drawer'
import { AuthProvider } from "./components/Context/AuthProvider";
import { ThemeProvider } from "./Theme/ThemeProvider";
import { useAuth } from './components/Hooks/UseAuth';
import PropTypes from 'prop-types';
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer"; 
import LandingPage from "./components/Home/LandingPage";
import ProductDetailPage from "./components/Products/ProductDetail";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Categories from "./components/Category/Category";
import ContactPage from "./components/Pages/ContactPage";
import Shop from "./components/Home/Shop";
import Profile from "./components/Layout/UserProfileLayout";
import SupplierDashboard from "./components/Pages/SupplierDashboard";
import PendingApproval from "./components/Pages/PendingApproval";
import Suppliers from "./components/Pages/Suppliers";
import SupplierForm from "./components/Supplier/SupplierForm";
import AdminDashboard from "./components/Dashboard/adminDashboard";
import DashboardLayout from "./components/Layout/DashboardLayout";
import Header from "./components/Header/index";
 
// Import all subcategories
import Football from "./components/SubCategories/Sports/Football";
import Tennis from "./components/SubCategories/Sports/Tennis";
import Swimming from "./components/SubCategories/Sports/Swimming";
import Cycling from "./components/SubCategories/Sports/Cycling";
import Volleyball from "./components/SubCategories/Sports/Volleyball";
import Basketball from "./components/SubCategories/Sports/Basketball";

import Appliances from "./components/SubCategories/KitchenWare/Appliances";
import CookingWare from "./components/SubCategories/KitchenWare/cookingWare";
import Utensils from "./components/SubCategories/KitchenWare/Utensils";

import Beds from "./components/SubCategories/Furniture/Beds";
import Tables from "./components/SubCategories/Furniture/Tables";
import Cabinets from "./components/SubCategories/Furniture/Cabinets";
import Sofas from "./components/SubCategories/Furniture/Sofas";
import Chairs from "./components/SubCategories/Furniture/Chairs";

import Women from "./components/SubCategories/Fashion/Women";
import Shoes from "./components/SubCategories/Fashion/Shoes";
import Men from "./components/SubCategories/Fashion/Men";
import Kids from "./components/SubCategories/Fashion/Kids";
import Accessories from "./components/SubCategories/Fashion/Accessories";

import Cameras from "./components/SubCategories/Electronics/Cameras";
import MobilePhones from "./components/SubCategories/Electronics/mobilePhones";
import Laptops from "./components/SubCategories/Electronics/Laptops";
import Tvs from "./components/SubCategories/Electronics/Tvs";
import Audio from "./components/SubCategories/Electronics/Audio";

/**
 * ProtectedRoute component for handling authenticated routes
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render
 * @param {boolean} [props.adminOnly=false] - Restrict to admin users
 * @param {boolean} [props.supplierOnly=false] - Restrict to supplier users
 * @param {string} [props.redirectPath='/login'] - Redirect path when unauthorized
 */
const ProtectedRoute = ({ 
  children, 
  adminOnly = false, 
  supplierOnly = false,
  redirectPath = '/login'
}) => {
  const { user, isLoggedIn, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to={redirectPath} replace />;
  }

  if (adminOnly && user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  if (supplierOnly && user?.role !== "supplier") {
    return <Navigate to="/" replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  adminOnly: PropTypes.bool,
  supplierOnly: PropTypes.bool,
  redirectPath: PropTypes.string
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <Navbar />
            <main className="flex-grow pt-16">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/products/:id" element={<ProductDetailPage />} />
                <Route path ="/shop " element={<Shop/>}/>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/contact" element={<ContactPage />} />

                {/* Sports Subcategories */}
                <Route path="/football" element={<Football />} />
                <Route path="/tennis" element={<Tennis />} />
                <Route path="/volleyball" element={<Volleyball />} />
                <Route path="/swimming" element={<Swimming />} />
                <Route path="/cycling" element={<Cycling />} />
                <Route path="/basketball" element={<Basketball />} />

                {/* Kitchenware Subcategories */}
                <Route path="/cookingWare" element={<CookingWare />} />
                <Route path="/utensils" element={<Utensils />} />
                <Route path="/appliances" element={<Appliances />} />

                {/* Furniture Subcategories */}
                <Route path="/sofas" element={<Sofas />} />
                <Route path="/beds" element={<Beds />} />
                <Route path="/cabinets" element={<Cabinets />} />
                <Route path="/chairs" element={<Chairs />} />
                <Route path="/tables" element={<Tables />} />

                {/* Fashion Subcategories */}
                <Route path="/men" element={<Men />} />
                <Route path="/women" element={<Women />} />
                <Route path="/shoes" element={<Shoes />} />
                <Route path="/accessories" element={<Accessories />} />
                <Route path="/kids" element={<Kids />} />

                {/* Electronics Subcategories */}
                <Route path="/mobilePhones" element={<MobilePhones />} />
                <Route path="/laptops" element={<Laptops />} />
                <Route path="/tvs" element={<Tvs />} />
                <Route path="/cameras" element={<Cameras />} />
                <Route path="/audio" element={<Audio />} />
                <Route path="/supplier-form" element={<SupplierForm />} />

                {/* Admin Dashboard */}
                <Route
                  path="/admin-dashboard"
                  element={
                    <ProtectedRoute adminOnly>
                      <DashboardLayout>
                      <Route index element={<AdminDashboard />} />
                      </DashboardLayout>
                    </ProtectedRoute>
                  }
                />

                {/* Protected Route (Profile) */}
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />

                {/* Supplier Routes */}
                <Route
                  path="/supplier-dashboard"
                  element={
                    <ProtectedRoute supplierOnly>
                      <SupplierDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/pending-approval"
                  element={
                    <ProtectedRoute>
                      <PendingApproval />
                    </ProtectedRoute>
                  }
                />

                {/* Suppliers Route */}
                <Route
                  path="/suppliers"
                  element={
                    <ProtectedRoute adminOnly>
                      <Suppliers />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </AuthProvider>
    </Router>
 
   );
};

export default App;