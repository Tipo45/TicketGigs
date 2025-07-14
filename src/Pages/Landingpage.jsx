import FeaturedEvents from "../Components/FeaturedEvents";
import Features from "../Components/Features";
import Footer from "../Components/Footer";
import Hero from "../Components/Hero";
import HowItWorks from "../Components/HowItWorks";
import Newsletter from "../Components/Newsletter";

const Landingpage = () => {
  return (
    <div>
      <Hero />
      <FeaturedEvents />
      <Features />
      <HowItWorks />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Landingpage;
