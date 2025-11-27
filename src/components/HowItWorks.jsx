import { CreditCard, Search, TicketPercent } from "lucide-react";

const steps = [
  {
    icon: <Search />,
    title: "Discover",
    description: "Browse thousands of events or search for exactly what you're looking for",
    step: "01"
  },
  {
    icon: <CreditCard />,
    title: "Book",
    description: "Secure your spot with our fast and safe checkout process",
    step: "02"
  },
  {
    icon: <TicketPercent />,
    title: "Enjoy",
    description: "Show your mobile ticket at the door and enjoy your amazing experience",
    step: "03"
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-linear-to-br from-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Getting to your next event is as easy as 1-2-3
          </p>
        </div>
  
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center">
              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="hidden absolute top-20 left-1/2 w-full h-0.5 bg-linear-to-r from-purple-300 to-pink-300 transform -translate-y-1/2 translate-x-8"></div>
              )}
              
              <div className="relative z-10 bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-linear-to-r from-purple-600 to-pink-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                </div>
                
                <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-r from-purple-100 to-pink-100 rounded-2xl mb-6 mt-4">
                  <span className="text-xl text-purple-600">{step.icon} </span>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;