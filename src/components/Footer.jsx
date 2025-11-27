import { Link } from "react-router-dom";


const Footer = () => {
  return (
    <footer className="relative mt-4 min-h-[400px] bg-linear-to-br from-purple-600 via-blue-600 to-indigo-800 text-white py-16 overflow-hidden">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Floating linear Circles (same as header) */}
      <div className="absolute top-20 left-10 animate-pulse">
        <div className="w-20 h-20 rounded-full bg-linear-to-r from-pink-400 to-purple-400 opacity-20"></div>
      </div>
      <div className="absolute bottom-20 right-10 animate-pulse delay-1000">
        <div className="w-32 h-32 rounded-full bg-linear-to-r from-blue-400 to-indigo-400 opacity-20"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="col-span-1 lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4 bg-linear-to-r from-white to-blue-200 bg-clip-text text-transparent">
              TicketsGig
            </h3>
            <p className="text-blue-100 mb-6 text-md">
              Your gateway to unforgettable experiences. Discover, book, and
              enjoy amazing events.
            </p>
            <div className="flex space-x-4">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                className="hover:text-blue-500 text-white cursor-pointer transition-colors duration-300"
              >
                <path d="M22 12.07C22 6.49 17.52 2 12 2S2 6.49 2 12.07c0 5 3.66 9.14 8.44 9.93v-7.03H8.12v-2.9h2.32V9.85c0-2.3 1.37-3.57 3.47-3.57.99 0 2.03.18 2.03.18v2.25h-1.14c-1.12 0-1.47.69-1.47 1.4v1.68h2.5l-.4 2.9h-2.1v7.03C18.34 21.21 22 17.07 22 12.07z" />
              </svg>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                className="hover:text-black text-white cursor-pointer transition-colors duration-300"
              >
                <path d="M18.25 2H21l-6.27 7.16L22 22h-6.56l-4.6-6.01L5.4 22H2l6.67-7.61L2 2h6.66l4.23 5.56L18.25 2zm-1.15 17.8h1.52L8.92 4.3H7.3l9.8 15.5z" />
              </svg>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                xmlns="http://www.w3.org/2000/svg"
                className="hover:text-blue-600 text-white cursor-pointer transition-colors duration-300"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                className="hover:text-green-600 text-white cursor-pointer transition-colors duration-300"
              >
                <path d="M20.52 3.48A11.8 11.8 0 0 0 12.06 0C5.44 0 .06 5.38.06 12a11.9 11.9 0 0 0 1.63 6l-1.69 6 6.2-1.62A12 12 0 0 0 12.06 24C18.68 24 24 18.62 24 12c0-3.17-1.23-6.16-3.48-8.52zM12.06 21.8a9.7 9.7 0 0 1-5.22-1.52l-.37-.22-3.68.96.98-3.58-.24-.37A9.75 9.75 0 1 1 21.82 12a9.77 9.77 0 0 1-9.76 9.8zm5.44-7.3c-.3-.15-1.77-.88-2.04-.98-.27-.1-.47-.15-.66.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.73-1.64-2.03-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.91-2.2-.24-.58-.48-.5-.66-.51h-.56c-.2 0-.52.07-.8.37-.27.3-1.05 1.03-1.05 2.5 0 1.47 1.08 2.9 1.23 3.1.15.2 2.12 3.24 5.14 4.54.72.31 1.28.5 1.72.64.72.23 1.37.2 1.88.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z" />
              </svg>

              
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
              <button className="bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-4 py-2 rounded-r-lg cursor-pointer font-medium transition-all duration-300">
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