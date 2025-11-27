import { Mail } from "lucide-react";

const Newsletter = () => {
  return (
    <section className="py-20 bg-linear-to-r from-purple-600 to-pink-600">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 border border-white/20">
          <Mail className="h-16 w-16 text-white mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Never Miss an Event
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about the hottest events, exclusive discounts, and early bird offers.
          </p>
          
          <div className="flex flex-col lg:flex-row gap-4 max-w-md mx-auto">
            <input 
              placeholder="Enter your email"
              className="flex-1 bg-white/80 border-0 text-gray-800 placeholder:text-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-300"
            />
            <button className="bg-white text-purple-600 hover:bg-gray-200 h-12 px-8 font-semibold rounded-lg transition-colors duration-300 cursor-pointer">
              Subscribe
            </button>
          </div>
          
          <p className="text-sm text-purple-200 mt-4">
            Join 0 event enthusiasts already subscribed
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;