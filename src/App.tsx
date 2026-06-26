import { Benefits } from "./components/Benefits";
import { BuildYourBox } from "./components/BuildYourBox";
import { CartDrawer } from "./components/CartDrawer";
import { CheckoutModal } from "./components/CheckoutModal";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { Newsletter } from "./components/Newsletter";
import { Process } from "./components/Process";
import { Products } from "./components/Products";
import { StatsStrip } from "./components/StatsStrip";
import { StickyBuyBar } from "./components/StickyBuyBar";
import { Story } from "./components/Story";
import { Testimonials } from "./components/Testimonials";
import { AmbientBackground } from "./components/visuals/AmbientBackground";
import { CartProvider } from "./lib/cart";
import { LanguageProvider } from "./lib/i18n";

export default function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <AmbientBackground />
        <Navbar />
        <main>
          <Hero />
          <StatsStrip />
          <Products />
          <BuildYourBox />
          <Story />
          <Benefits />
          <Process />
          <Testimonials />
          <Newsletter />
        </main>
        <Footer />
        <CartDrawer />
        <CheckoutModal />
        <StickyBuyBar />
      </CartProvider>
    </LanguageProvider>
  );
}
