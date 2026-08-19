import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./Footer";  // ✅ Sahi - Footer.jsx src root mein hai
import LandingPage from "./LandingPage";
import ServicesPage from "./ServicesPage";
import AboutUs from "./AboutUs"; 
import ContactUs from "./ContactUs";
import Blogs from "./Blogs";
import Portfolio from "./Portfolio";
import OurHistory from "./OurHistory";
import Products from "./Products";
import GoldLaboratorySoftware from "./GoldLaboratorySoftware";
import BlinkoJewelryManagementSoftware from "./BlinkoJewelryManagementSoftware";
import KarkhanaSoftware from "./KarkhanaSoftware";
import StockHandlerPro from "./StockHandlerPro";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/our-history" element={<OurHistory />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/gold-laboratory-software" element={<GoldLaboratorySoftware />} />
        <Route path="/products/blinko-jewelry-management-software" element={<BlinkoJewelryManagementSoftware />} />
        <Route path="/products/karkhana-software" element={<KarkhanaSoftware />} />
        <Route path="/products/stock-handler-pro" element={<StockHandlerPro />} />
      </Routes>
      <Footer />  {/* ✅ Footer ko yahin add karo - sab pages mein dikhega */}
    </BrowserRouter>
  );
}