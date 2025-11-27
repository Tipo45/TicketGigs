import { useNavigate } from "react-router-dom";
import { isUserLoggedIn } from "../BE/pocketbase";
import FeaturedEvents from "../components/FeaturedEvents";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { CircleUser } from "lucide-react";
import Header from "../components/Hero";



const Landingpage = () => {

  const isLoggedIn = isUserLoggedIn();

  const navigate = useNavigate();

   const handleAccountClick = () => {
    navigate("/account/dashboard");
  };

  return (
    <div className="relative">
      <Header />
      <FeaturedEvents />
      <Features />
      <HowItWorks />
      <Newsletter />
      <Footer />
      {isLoggedIn && (
        <div 
          className="fixed bottom-8 right-8 z-50 cursor-pointer"
          onClick={handleAccountClick}
        >
          <div className="bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition-all duration-300 hover:shadow-xl">
            <CircleUser className="text-3xl" />
          </div>
        </div>
      )}

    </div>
  );
};

export default Landingpage;