import { Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isUserLoggedIn } from "../backend/pocketbase";
import { useHostData } from "../hooks/useHostData";


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { data: userData } = useHostData();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleViewEventsClick = () => {
    navigate("/events");
  };

  const handleAddEventClick = () => {
    const isAuthenticated = isUserLoggedIn();

    if (isAuthenticated) {
      navigate(`/account/${userData.id}/dashboard`);
    } else {
      navigate("/signin", { state: { from: "/create-event", message: "please sign in" } });
    }
  };

  return (
    <section className="relative min-h-screen bg-linear-to-br from-purple-600 via-blue-600 to-indigo-800 flex items-center justify-center overflow-hidden">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="absolute z-20 top-0 left-0 w-full">
        <nav className="flex justify-between items-center p-6 xl:px-20 bg-linear-to-b from-black/30 to-transparent backdrop-blur-xs">
          <h1 className="text-3xl font-bold text-white bg-linear-to-r from-white to-blue-200 bg-clip-text">
            <Link to="/">TicketsGig</Link>
          </h1>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex space-x-8 text-white/90">
            <li>
              <Link to="/" className="text-lg font-medium">
                home
              </Link>
            </li>
            <li>
              <Link to="/about-us" className="text-lg font-medium">
                about us
              </Link>
            </li>
            <li>
              <Link to="#how-it-works" className="text-lg font-medium">
                how it works
              </Link>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="cursor-pointer lg:hidden p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors duration-200"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="text-white text-2xl" />
            ) : (
              <Menu className="text-white text-2xl" />
            )}
          </button>

          {/* Mobile Navigation */}
          <div
            className={`absolute top-full left-0 w-full lg:hidden transition-all duration-500 ${
              isOpen
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-4 pointer-events-none"
            }`}
          >
            <ul className="bg-black/90 backdrop-blur-md border-t border-white/10 p-6 space-y-4">
              <li>
                <Link
                  to="/"
                  className="block text-white/90 hover:text-white transition-colors duration-200 font-medium py-2"
                >
                  home
                </Link>
              </li>
              <li>
                <Link
                  to="/about-us"
                  className="block text-white/90 hover:text-white transition-colors duration-200 font-medium py-2"
                >
                  about us
                </Link>
              </li>
              <li>
                <Link
                  to="#how-it-works"
                  className="block text-white/90 hover:text-white transition-colors duration-200 font-medium py-2"
                >
                  how it works
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
        {/* Headline */}
        <div className="animate-fade-in">
          <h1 className="text-4xl font-bold mb-6 bg-linear-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Discover Live Experiences
          </h1>
          <p className="text-lg md:text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Find concerts, festivals, and events near you. Book tickets
            instantly.
          </p>

          {/* Search Bar */}
          {/* <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 max-w-3xl mx-auto mb-8 border border-white/20">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search events..."
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="grid grid-cols-1 gap-4">
                {/* <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Location"
                    className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div> */}
                {/* <div className="relative">
                  <CalendarDays className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="date"
                    className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/90 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div> 
              </div>
            </div>

            <button className="w-full cursor-pointer mt-4 py-3 text-lg font-semibold bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg transition-all duration-300">
              Find Events
            </button>
          </div> */}

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 justify-center">
            <button
              onClick={handleViewEventsClick}
              className="px-6 py-4 cursor-pointer bg-white text-purple-700 hover:bg-gray-50 font-semibold rounded-lg transition-colors duration-300"
            >
              Browse Events
            </button>
            <button
              onClick={handleAddEventClick}
              className="px-6 py-4 cursor-pointer border-2 border-white text-white hover:bg-white hover:text-purple-700 font-semibold rounded-lg transition-colors duration-300"
            >
              Create Event
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-16 h-16 rounded-full bg-linear-to-r from-pink-400 to-purple-400 opacity-20 animate-float"></div>
      <div className="absolute bottom-1/4 right-10 w-24 h-24 rounded-full bg-linear-to-r from-blue-400 to-indigo-400 opacity-20 animate-float-delay"></div>
    </section>
  );
};

export default Header;