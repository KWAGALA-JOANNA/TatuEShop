import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "/src/components/common/Sidebar.jsx";
import Header from "/src/components/common/Header.jsx";
import { useEffect, useState } from "react";
import { useAuth } from "../../components/Hooks/UseAuth.jsx"; // Import useAuth for authentication checks

const DashboardLayout = () => {
  const { isAuthenticated, isAdmin, loading } = useAuth(); // Use authentication and role checks
  const [navbarHeight, setNavbarHeight] = useState(0);

  // Get navbar height on component mount and window resize
  useEffect(() => {
    const updateNavbarHeight = () => {
      const navbar = document.querySelector("nav");
      if (navbar) {
        setNavbarHeight(navbar.offsetHeight);
      } else {
        // Fallback if nav element isn't found
        setNavbarHeight(64); // Assuming default navbar height
      }
    };

    // Initial measurement
    updateNavbarHeight();

    // Update on resize
    window.addEventListener("resize", updateNavbarHeight);
    return () => window.removeEventListener("resize", updateNavbarHeight);
  }, []);

  // Redirect to login if not authenticated
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>; // Show a loading spinner
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" />; // Redirect to login if not authenticated
  }

  // Redirect to home if not an admin
  if (!isAdmin()) {
    return <Navigate to="/" />; // Redirect to home if not an admin
  }

  return (
    <div
      className="flex bg-gray-100 min-h-screen"
      style={{
        marginTop: `${navbarHeight}px`,
      }}
    >
      {/* Sidebar */}
      <aside className="sticky top-0 h-screen w-64 bg-white shadow-lg">
        <Sidebar />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto">
        <Header title="Admin Dashboard" /> {/* Pass the 'title' prop */}
        <main className="p-6">
          <Outlet /> {/* Render nested routes here (e.g., AdminDashboard) */}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;