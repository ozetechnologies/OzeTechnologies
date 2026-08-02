import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import ServicesPage from "./ServicesPage";
import AboutUs from "./AboutUs"; 
import ContactUs from "./ContactUs"; // 1. Imported your new ContactUs page
import Blogs from "./Blogs";         // ⚡ Imported your new Blogs portal
import Portfolio from "./Portfolio"; // 3. Imported your new Portfolio page

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} /> {/* 2. Added the route for /contact */}
        <Route path="/blogs" element={<Blogs />} />       {/* ⚡ Added the route for /blogs */}
        <Route path="/portfolio" element={<Portfolio />} /> {/* 4. Added the route for /portfolio */}
      </Routes>
    </BrowserRouter>
  );
}