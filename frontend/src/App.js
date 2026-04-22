import { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "sonner";

// Layout
import Layout from "./components/layout/Layout";

// Pages
import HomePage from "./pages/HomePage";
import CommercialPage from "./pages/CommercialPage";
import ResidentialPage from "./pages/ResidentialPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ReviewsPage from "./pages/ReviewsPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminReviewsPage from "./pages/AdminReviewsPage";

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Toaster 
          position="top-right" 
          richColors 
          toastOptions={{
            style: {
              background: '#12122a',
              border: '1px solid rgba(102, 204, 51, 0.3)',
              color: '#fff'
            }
          }}
        />
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/commercial" element={<CommercialPage />} />
            <Route path="/residential" element={<ResidentialPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/feedback" element={<ReviewsPage />} />
            <Route path="/client-feedback" element={<ReviewsPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin/reviews" element={<AdminReviewsPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
