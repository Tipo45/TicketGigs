import {
  CalendarDays,
  Clock,
  Funnel,
  LoaderCircle,
  MapPin,
  Search,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useListEvent } from "../hooks/UseEventData";
import { useTicket } from "../hooks/useTicketData";

const Events = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const navigate = useNavigate();

  const { data: eventData, isLoading } = useListEvent();
  const { data: tickets } = useTicket();

  useEffect(() => {
    if (!eventData) return;
  }, [eventData]);

  const events =
    eventData?.map((event) => ({
      id: event.id,
      title: event.eventTitle,
      description: event.eventDescription,
      date: event.eventDate,
      time: event.eventTime,
      location: event.venueName,
      price: event.price ? `₦${event.price}` : "Free",
      category: event.category || "others",
      attendees: event.attendees || 0,
      image: event.image ? event.image : "/placeholder.svg",
    })) || [];

  const categories = [
    { value: "all", label: "All Events" },
    { value: "music", label: "Music" },
    { value: "conference", label: "Conference" },
    { value: "food", label: "Food & Drink" },
    { value: "art", label: "Art & Culture" },
    { value: "sports", label: "Sports" },
    { value: "entertainment", label: "Entertainment" },
    { value: "others", label: "Others" },
  ];

  /** -----------------------
   * FILTER EVENTS
   * ----------------------- */
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || event.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  /** -----------------------
   * HANDLE EVENT DETAILS NAVIGATION
   * ----------------------- */
  const handleViewEventDetails = (eventId) => {
    navigate(`/events/${eventId}`);
  };

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
              {filteredEvents.length} Event(s) Found
            </h2>
            {/* <div className="flex items-center gap-2 text-gray-600">
              <Funnel className="h-5 w-5" />
              <span>Sort by: Latest</span>
            </div> */}
          </div>

          {/* Loader */}
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <LoaderCircle className="animate-spin text-4xl text-purple-600" />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredEvents.map((event) => {
                const eventTickets =
                  tickets?.filter((ticket) => ticket.event === event.id) || [];

                return (
                  <div
                    key={event.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <div className="h-48 bg-linear-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                      <img
                        src={`http://127.0.0.1:8090/api/files/events/${event.id}/${event.image}`}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 capitalize">
                          {event.title}
                        </h3>
                      </div>

                      <p className="text-gray-600 mb-4 capitalize">{event.description}</p>

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

                        {eventTickets.map((ticket) => (
                          <div
                            key={ticket.id}
                            className="flex items-center gap-2 text-gray-500"
                          >
                            <User className="h-4 w-4 text-purple-500" />
                            <span className="text-sm">
                              {ticket.ticketSold} attending
                            </span>
                          </div>
                        ))}

                        <button
                          onClick={() => handleViewEventDetails(event.id)}
                          className="w-full cursor-pointer mt-4 bg-linear-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 py-2 rounded-lg font-medium"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && filteredEvents.length === 0 && (
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
