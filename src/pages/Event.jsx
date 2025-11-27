import { CalendarDays, Clock, Funnel, MapPin, Search, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Events = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const navigate = useNavigate();

  // Mock events data
  const events = [
    {
      id: 1,
      title: "Summer Music Festival",
      description:
        "A spectacular outdoor music festival featuring top artists from around the world.",
      date: "July 15, 2024",
      time: "6:00 PM",
      location: "Central Park, New York",
      price: "₦5,000",
      category: "music",
      attendees: 2500,
      image: "/placeholder.svg",
    },
    {
      id: 2,
      title: "Tech Innovation Conference",
      description:
        "Join industry leaders for insights into the latest technology trends and innovations.",
      date: "August 3, 2024",
      time: "9:00 AM",
      location: "Convention Center, San Francisco",
      price: "₦30,000",
      category: "conference",
      attendees: 800,
      image: "/placeholder.svg",
    },
    {
      id: 3,
      title: "Food & Wine Tasting",
      description:
        "Explore gourmet dishes and fine wines from local restaurants and vineyards.",
      date: "July 28, 2024",
      time: "7:00 PM",
      location: "Waterfront Plaza, Seattle",
      price: "₦125,000",
      category: "food",
      attendees: 150,
      image:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=250&fit=crop",
    },
    {
      id: 4,
      title: "Art Gallery Opening",
      description:
        "Discover contemporary art from emerging local artists in this exclusive gallery opening.",
      date: "August 10, 2024",
      time: "6:30 PM",
      location: "Modern Art Gallery, Chicago",
      price: "Free",
      category: "art",
      attendees: 200,
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop",
    },
    {
      id: 5,
      title: "Marathon Challenge",
      description:
        "Join thousands of runners in this annual marathon through the city's most scenic routes.",
      date: "September 5, 2024",
      time: "7:00 AM",
      location: "Downtown, Boston",
      price: "₦1,000",
      category: "sports",
      attendees: 5000,
      image:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=250&fit=crop",
    },
    {
      id: 6,
      title: "Comedy Night Special",
      description:
        "Laugh out loud with top comedians performing their best material in an intimate setting.",
      date: "July 22, 2024",
      time: "8:00 PM",
      location: "Comedy Club, Los Angeles",
      price: "₦35,000",
      category: "entertainment",
      attendees: 120,
      image:
        "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=250&fit=crop",
    },
  ];

  const categories = [
    { value: "all", label: "All Events" },
    { value: "music", label: "Music" },
    { value: "conference", label: "Conference" },
    { value: "food", label: "Food & Drink" },
    { value: "art", label: "Art & Culture" },
    { value: "sports", label: "Sports" },
    { value: "entertainment", label: "Entertainment" },
  ];

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleViewEventDetails = (event) => {
    navigate(`/events/${event.id}`);
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 to-blue-50">
      {/* Hero Section */}
      <section className="bg-linear-to-br from-purple-600 via-blue-600 to-indigo-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Discover Amazing Events</h1>
          <p className="text-xl mb-8">
            Find and book tickets for the most exciting events in your area
          </p>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    selectedCategory === category.value
                      ? "bg-white text-purple-700"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {filteredEvents.length} Events Found
            </h2>
            <div className="flex items-center gap-2 text-gray-600">
              <Funnel className="h-5 w-5" />
              <span>Sort by: Latest</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="h-48 bg-linear-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {event.title}
                    </h3>
                    <span className="text-purple-600 font-bold text-lg">
                      {event.price}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{event.description}</p>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-500">
                      <CalendarDays className="h-4 w-4 text-purple-500" />
                      <span className="text-sm">{event.date}</span>
                      <Clock className="h-4 w-4 ml-2 text-blue-500" />
                      <span className="text-sm">{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                      <MapPin className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                      <User className="h-4 w-4 text-purple-500" />
                      <span className="text-sm">
                        {event.attendees} attending
                      </span>
                    </div>
                    <button onClick={handleViewEventDetails} className="w-full cursor-pointer mt-4 bg-linear-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 py-2 rounded-lg font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No events found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search criteria or browse all events.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Events;