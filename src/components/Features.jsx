import { Check, Headset, Smartphone, Zap } from "lucide-react";

const features = [
  {
    icon: <Zap />,
    title: "Instant Booking",
    description: "Book your tickets in seconds with our lightning-fast checkout process"
  },
  {
    icon: <Check />,
    title: "Secure Payments",
    description: "Your transactions are protected with bank-level security encryption"
  },
  {
    icon: <Smartphone />,
    title: "Mobile Tickets",
    description: "Access your tickets anywhere with our mobile-friendly digital tickets"
  },
  {
    icon: <Headset />,
    title: "24/7 Support",
    description: "Our dedicated support team is here to help you whenever you need it"
  }
];

const Features = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Why Choose TicketGigs?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We make discovering and attending events easier than ever before
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="text-center p-8 rounded-2xl hover:bg-purple-50 transition-colors duration-300 group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-r from-purple-600 to-pink-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-xl text-white">{feature.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;