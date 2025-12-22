import {
  ArrowLeft,
  CalendarDays,
  ChevronsRight,
  Clock,
  LoaderCircle,
  MapPin,
  Minus,
  Plus,
  Star,
  TicketCheck,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTicket } from "../hooks/useTicketData";
import { useSingleEvent } from "../hooks/UseEventData";

const EventDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [quantity, setQuantity] = useState(1);
  const [selectedTicketType, setSelectedTicketType] = useState(0);

  // FETCH REAL DATA
  const { data: eventData, isLoading } = useSingleEvent(id);
  const { data: tickets } = useTicket();

  // FILTER TICKETS FOR THIS EVENT
  const eventTickets =
    tickets?.filter((ticket) => ticket.event === eventData?.id) || [];

  // ticket options
  const ticketOptions = eventTickets.flatMap(ticket => [
    {
      name: ticket.ticketName1,
      price: ticket.ticketPrice1,
      description: ticket.description1,
    },
    {
      name: ticket.ticketName2,
      price: ticket.ticketPrice2,
      description: ticket.description2,
    },
    {
      name: ticket.ticketName3,
      price: ticket.ticketPrice3,
      description: ticket.description3,
    },
    {
      name: ticket.ticketName4,
      price: ticket.ticketPrice4,
      description: ticket.description4,
    },
    {
      name: ticket.ticketName5,
      price: ticket.ticketPrice5,
      description: ticket.description5,
    },
    {
      name: ticket.ticketName6,
      price: ticket.ticketPrice6,
      description: ticket.description6,
    }
  ]).filter(t => t.name);

  const selectedTicket = ticketOptions[selectedTicketType];
  const isFreeTicket = selectedTicket?.price === 0;

  useEffect(() => {
    if (isFreeTicket) {
      setQuantity(1);
    }
  }, [isFreeTicket]);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) setQuantity(newQuantity);
  };

  const handleAddToCheckout = () => {
    navigate("/checkout", {
      state: {
        event,
        ticket: ticketOptions[selectedTicketType],
        quantity,
      }
    })
  };
 // No mock event!!
  const event = eventData;

  if (isLoading || !event) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoaderCircle className="animate-spin text-4xl text-purple-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <div className="bg-linear-to-r from-purple-600 to-blue-600 text-white p-4">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-white hover:bg-white/20 px-3 py-1 rounded-lg transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Events
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* IMAGE HEADER */}
        <div className="relative h-96 overflow-hidden rounded-xl shadow-md">
          <img
            // src={`http://127.0.0.1:8090/api/files/events/${event.id}/${event.image}`}
            src={`https://service-konnect.pockethost.io/api/files/events/${event.id}/${event.image}`}
            alt={event.eventTitle}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />

          <div className="absolute bottom-6 left-6 text-white">
            <h1 className="text-4xl font-bold mb-2 capitalize">{event.eventTitle}</h1>

            <div className="flex items-center gap-4 text-sm">
              <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full font-medium capitalize">
                {event.category}
              </span>

              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{event.rating}</span>
                <span className="text-white/80">({event.reviews} reviews)</span>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* MAIN CONTENT */}
          <div className="lg:col-span-2 space-y-8">
            {/* EVENT DETAILS */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="mb-6">
                <div className="flex items-center gap-2 text-lg font-semibold text-purple-700">
                  <CalendarDays className="h-5 w-5" />
                  Event Details
                </div>
                <div className="mt-1 h-1 w-20 bg-linear-to-r from-purple-500 to-blue-500 rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <CalendarDays className="h-5 w-5 text-purple-500" />
                  <div>
                    <p className="font-medium text-gray-700">Date</p>
                    <p className="text-gray-600">{event.eventDate}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium text-gray-700">Time</p>
                    <p className="text-gray-600">{event.eventTime}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-purple-500" />
                  <div>
                    <p className="font-medium text-gray-700">Location</p>
                    <p className="text-gray-600">{event.venueName}</p>
                  </div>
                </div>

                {eventTickets.map((ticket) => (
                  <div key={ticket.id} className="flex items-center gap-3">
                    <User className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium text-gray-700">Attendance</p>
                      <p className="text-gray-600">
                        {ticket.ticketSold} attending
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ABOUT */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-purple-700">About This Event</h2>
                <div className="mt-1 h-1 w-20 bg-linear-to-r from-purple-500 to-blue-500 rounded-full"></div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {event.eventDescription}
              </p>
            </div>

            {/* LINEUP */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-purple-700">Features</h2>
                <div className="mt-1 h-1 w-10 bg-linear-to-r from-purple-500 to-blue-500 rounded-full"></div>
              </div>

              <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
                {event.lineup?.map((artist, index) => (
                  <div
                    key={index}
                    className="text-center p-4 bg-purple-50 rounded-lg"
                  >
                    <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                      🎤
                    </div>
                    <p className="font-medium text-gray-800">{artist}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="space-y-6">
            {/* TICKET BOOKING */}
            {ticketOptions.length > 0 && (<div className="bg-white rounded-xl shadow-md p-6">
              <div className="mb-6">
                <div className="flex items-center gap-2 text-lg font-semibold text-purple-700">
                  <TicketCheck className="h-5 w-5" />
                  Book Tickets
                </div>
                <div className="mt-1 h-1 w-20 bg-linear-to-r from-purple-500 to-blue-500 rounded-full"></div>
              </div>

              {ticketOptions.map((ticket, index) => (
                <div
                  key={index}
                  className={`p-4 border rounded-lg cursor-pointer mb-3 ${selectedTicketType === index
                    ? "border-purple-500 bg-purple-50"
                    : "border-gray-200 hover:border-purple-300"
                    }`}
                  onClick={() => setSelectedTicketType(index)}
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-gray-800">
                      {ticket.name}
                    </h4>
                    <span className="text-md font-bold text-purple-600">
                      {ticket.price === 0 ? 'Free' : `₦ ${ticket.price.toLocaleString()}`}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {ticket.description}
                  </p>
                </div>
              ))}

              {/* Quantity */}
              <div className="flex items-center justify-between mt-4">
                <span className="font-medium text-gray-700">Quantity</span>

                <div className="flex items-center gap-2">
                  {/* Minus */}
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="h-8 w-8 flex items-center justify-center rounded-full border"
                  >
                    <Minus className="h-3 w-3" />
                  </button>

                  <span>{quantity}</span>

                  {/* Plus — ONLY if NOT free */}
                  {!isFreeTicket && (
                    <button
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= 10}
                      className="h-8 w-8 flex items-center justify-center rounded-full border"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </div>


              {/* Total */}
              <div className="flex justify-between items-center font-bold mt-4">
                <span>Total</span>
                <span className="text-purple-600">
                  ₦ {(ticketOptions?.[selectedTicketType]?.price * quantity).toLocaleString()}
                </span>
              </div>

              <button
                onClick={handleAddToCheckout}
                className="flex items-center justify-center w-full mt-4 py-2 bg-linear-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 rounded-lg font-medium transition-colors duration-200 group hover:text-lg"
              >
                Proceed to Checkout
                <ChevronsRight className="mt-0.5 ml-1 group-hover:translate-x-0.5" />
              </button>
              <div className="mt-2 text-xs text-gray-500">Upon successful payment, your tickets are automatically sent to the email address provided during checkout.</div>
            </div>)}

            {/* Organizer Info */}
            {event.organizerName ? (<div className="bg-white rounded-xl shadow-md p-6">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-purple-700">
                  Organizer
                </h2>
                <div className="mt-1 h-1 w-20 bg-linear-to-r from-purple-500 to-blue-500 rounded-full"></div>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-linear-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-md">🏢</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800 whitespace-normal">{event.organizerName}</p>
                  <p className="text-sm text-gray-600">Event Organizer</p>
                </div>
              </div>
              <button className="w-full py-2 border border-purple-600 text-purple-600 hover:bg-purple-50 rounded-lg font-medium transition-colors duration-200">
                View Profile
              </button>
            </div>) : (<div className="bg-white rounded-xl shadow-md p-6"><p className="text-gray-600 text-sm">No organizer info available.</p></div>)}


          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
