import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative mt-4 min-h-[400px] bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800 text-white py-16 overflow-hidden">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Floating Gradient Circles (same as header) */}
      <div className="absolute top-20 left-10 animate-pulse">
        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 opacity-20"></div>
      </div>
      <div className="absolute bottom-20 right-10 animate-pulse delay-1000">
        <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 opacity-20"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="col-span-1 lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              TicketsGig
            </h3>
            <p className="text-blue-100 mb-6 text-md">
              Your gateway to unforgettable experiences. Discover, book, and
              enjoy amazing events.
            </p>
            <div className="flex space-x-4">
              <FaFacebook className="h-6 w-6 text-blue-100 hover:text-white cursor-pointer transition-colors duration-300" />
              <FaXTwitter className="h-6 w-6 text-blue-100 hover:text-white cursor-pointer transition-colors duration-300" />
              <FaInstagram className="h-6 w-6 text-blue-100 hover:text-white cursor-pointer transition-colors duration-300" />
              <FaWhatsapp className="h-6 w-6 text-blue-100 hover:text-white cursor-pointer transition-colors duration-300" />
            </div>
          </div>

          {/* Events Column */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Events</h4>
            <ul className="space-y-3 text-blue-100">
              <li>
                <Link
                  to="/events"
                  className="hover:text-white transition-colors duration-300 block"
                >
                  Browse Events
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-white transition-colors duration-300 block"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  to="/events/#popular"
                  className="hover:text-white transition-colors duration-300 block"
                >
                  Popular Events
                </Link>
              </li>
              <li>
                <Link
                  to="/events/#free"
                  className="hover:text-white transition-colors duration-300 block"
                >
                  Free Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Support</h4>
            <ul className="space-y-3 text-blue-100">
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-300 block"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-300 block"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-300 block"
                >
                  Refund Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-300 block"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">
              Stay Updated
            </h4>
            <p className="text-blue-100 mb-4">
              Subscribe to our newsletter for event updates
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="bg-white/20 text-white placeholder-blue-200 px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-300 w-full"
              />
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-4 py-2 rounded-r-lg cursor-pointer font-medium transition-all duration-300">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-300/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-blue-100 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Tipotek. All rights reserved.
          </p>
          {/* <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <a
              href="#"
              className="text-blue-100 hover:text-white text-sm transition-colors duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-blue-100 hover:text-white text-sm transition-colors duration-300"
            >
              Cookie Policy
            </a>
            <a
              href="#"
              className="text-blue-100 hover:text-white text-sm transition-colors duration-300"
            >
              Accessibility
            </a>
            <a
              href="#"
              className="text-blue-100 hover:text-white text-sm transition-colors duration-300"
            >
              Sitemap
            </a>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
