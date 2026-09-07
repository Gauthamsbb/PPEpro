import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { Toaster } from "@/components/ui/sonner";
import { Home } from "@/pages/Home";
import { ProductListing } from "@/pages/ProductListing";
import { ProductDetail } from "@/pages/ProductDetail";
import { IndustryPage } from "@/pages/IndustryPage";
import { MaterialPage } from "@/pages/MaterialPage";
import { Cart } from "@/pages/Cart";
import { Checkout } from "@/pages/Checkout";
import { OrderConfirmation } from "@/pages/OrderConfirmation";
import { QuoteRequest } from "@/pages/QuoteRequest";
import { SizingGuide } from "@/pages/SizingGuide";
import { GloveGuide } from "@/pages/GloveGuide";
import { About } from "@/pages/About";
import { Contact } from "@/pages/Contact";
import { PolicyPage } from "@/pages/PolicyPage";

function ScrollToTop() {
  return null;
}

function App() {
  return (
    <div className="App">
      <CartProvider>
        <BrowserRouter>
          <Navbar />
          <CartDrawer />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductListing />} />
              <Route path="/products/:slug" element={<ProductDetail />} />
              <Route path="/industries/:slug" element={<IndustryPage />} />
              <Route path="/materials/:slug" element={<MaterialPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-confirmation/:orderNumber" element={<OrderConfirmation />} />
              <Route path="/quote" element={<QuoteRequest />} />
              <Route path="/sizing-guide" element={<SizingGuide />} />
              <Route path="/glove-guide" element={<GloveGuide />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/policies/:slug" element={<PolicyPage />} />
            </Routes>
          </main>
          <Footer />
          <Toaster position="top-right" />
        </BrowserRouter>
      </CartProvider>
    </div>
  );
}

export default App;
