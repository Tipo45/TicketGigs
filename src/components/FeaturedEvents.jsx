import { CalendarDays, MapPin, User } from "lucide-react";
import { useNavigate } from "react-router-dom";


const events = [
  {
    id: 1,
    title: "Summer Music Festival 2024",
    date: "July 15-17, 2024",
    location: "Central Park, NYC",
    price: "₦5,000",
    image:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=250&fit=crop",
    attendees: "2.5K",
    category: "Music",
  },
  {
    id: 2,
    title: "Tech Innovation Conference",
    date: "August 22, 2024",
    location: "Convention Center, SF",
    price: "₦30,000",
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&h=250&fit=crop",
    attendees: "1.2K",
    category: "Technology",
  },
  {
    id: 3,
    title: "Food & Wine Tasting",
    date: "September 5, 2024",
    location: "Downtown, LA",
    price: "₦125,000",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=250&fit=crop",
    attendees: "850",
    category: "Food",
  },
  {
    id: 4,
    title: "Art Gallery Opening",
    date: "July 28, 2024",
    location: "Museum District, Chicago",
    price: "Free",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop",
    attendees: "500",
    category: "Art",
  },
];

const FeaturedEvents = () => {
  const navigate = useNavigate();
  const handleGetTickets = (event) => {
    navigate(`/events/${event.id}`);
  };
  const handleViewEventDetails = () => {
    navigate("/events");
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Featured Events
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the most popular events happening near you
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 overflow-hidden"
            >
              <div className="relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {event.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-white/90 text-purple-700 px-3 py-1 rounded-full text-sm font-bold">
                    {event.price}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                  {event.title}
                </h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <CalendarDays className="h-4 w-4 mr-2" />
                    <span className="text-sm">{event.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <User className="h-4 w-4 mr-2" />
                    <span className="text-sm">{event.attendees} attending</span>
                  </div>
                </div>

                <button
                  onClick={handleGetTickets}
                  className="cursor-pointer w-full rounded-lg py-2 text-white bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  Get Tickets
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={handleViewEventDetails}
            className="cursor-pointer px-8 py-6 text-lg bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-full hover:from-purple-700 hover:to-pink-700"
          >
            View All Events
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;