import { CalendarDays, LoaderCircle, MapPin, User } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTicket } from "../hooks/useTicketData";
import { useListEvent } from "../hooks/UseEventData";

const FeaturedEvents = () => {
  const navigate = useNavigate();



  const handleViewEventDetails = () => {
    navigate("/events");
  };

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
      category: event.category || "others",
      image: event.image ? event.image : "/placeholder.svg",
    })).sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3) || [];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG').format(price);
  };

  const handleGetTickets = (eventId) => {
    navigate(`/events/${eventId}`);
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

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <LoaderCircle className="animate-spin text-4xl text-purple-600" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {events.map((event) => {
              const eventTickets =
                tickets?.filter((ticket) => ticket.event === event.id) || [];
              return (
                
                  <div
                    key={event.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => handleGetTickets(event.id)}
                    className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-purple-200 rounded-sm overflow-hidden"
                  >
                    <div className="relative">
                      <img
                        // src={`http://127.0.0.1:8090/api/files/events/${event.id}/${event.image}`}
                        src={`https://service-konnect.pockethost.io/api/files/events/${event.id}/${event.image}`}
                        alt={event.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium capitalize">
                          {event.category}
                        </span>
                      </div>

                      {eventTickets.map((ticket) => (<div key={ticket.id} className="absolute top-4 right-4">
                        <span className="bg-white/90 text-purple-700 px-3 py-1 rounded-full text-sm font-bold">
                          {ticket?.ticketPrice1 === 0 ? 'Free' : `₦ ${formatPrice(ticket.ticketPrice1)}`}
                        </span>
                      </div>))}

                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors capitalize">
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

                        {eventTickets.map((ticket) => (<div key={ticket.id} className="flex items-center text-gray-600">
                          <User className="h-4 w-4 mr-2" />
                          <span className="text-sm">
                            {ticket.ticketSold} attendings
                          </span>
                        </div>))}

                      </div>


                    </div>
                  </div>
                
              )
            })}
          </div>
        )}

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
