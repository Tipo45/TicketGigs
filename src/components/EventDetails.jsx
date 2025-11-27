import { ArrowLeft, CalendarDays, Clock, Heart, MapPin, Minus, Plus, Share2, Star, TicketCheck, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const EventDetails = () => {
  // const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedTicketType, setSelectedTicketType] = useState(0);

  // Mock event data
  const event = {
    id: 1,
    title: "Summer Music Festival",
    description: "A spectacular outdoor music festival featuring top artists from around the world.",
    fullDescription: "Get ready for the most anticipated music festival of the summer! Our Summer Music Festival brings together world-renowned artists across multiple genres for an unforgettable three-day celebration. From rock legends to emerging indie artists, electronic music maestros to soulful acoustic performers, we've curated a lineup that will keep you dancing from dawn to dusk.\n\nThe festival takes place in the beautiful Central Park, with multiple stages set up across the venue. Enjoy gourmet food trucks, craft beer gardens, and interactive art installations between performances. VIP packages include exclusive viewing areas, complimentary drinks, and meet-and-greet opportunities with select artists.\n\nThis is more than just a music festival - it's a community celebration that brings together music lovers from all walks of life. Whether you're here for the headliners or to discover your new favorite band, you'll leave with memories that last a lifetime.",
    date: "July 15-17, 2024",
    time: "6:00 PM - 2:00 AM",
    location: "Central Park, New York",
    venue: "Central Park Main Stage & Multiple Venues",
    category: "music",
    attendees: 2500,
    capacity: 5000,
    organizer: "NYC Music Events",
    rating: 4.8,
    reviews: 324,
    images: [
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&h=400&fit=crop"
    ],
    amenities: ["Food & Drinks", "Parking Available", "Wheelchair Accessible", "Free WiFi", "ATM Available", "Merchandise Store"],
    lineup: ["The Midnight Riders", "Echo Chamber", "Solar Flare", "Urban Jungle", "Crystal Wave"],
    ticketTypes: [
      { name: "General Admission", price: 89, description: "Access to all stages and general standing areas" },
      { name: "VIP Pass", price: 249, description: "Premium viewing areas, complimentary drinks, and exclusive lounge access" },
      { name: "Weekend Pass", price: 499, description: "3-day access to all events and activities" }
    ]
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    const selectedTicket = event.ticketTypes[selectedTicketType];
    console.log(`Added ${quantity} ${selectedTicket.name} tickets to cart (Total: $${selectedTicket.price * quantity})`);
  };

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

      {/* Hero Image */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={event.images[0]}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-6 left-6 text-white">
          <h1 className="text-4xl font-bold mb-2">{event.title}</h1>
          <div className="flex items-center gap-4 text-sm">
            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full font-medium">
              {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
            </span>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{event.rating}</span>
              <span className="text-white/80">({event.reviews} reviews)</span>
            </div>
          </div>
        </div>
        <div className="absolute top-6 right-6 flex gap-2">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-200"
          >
            <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`} />
          </button>
          <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-200">
            <Share2 className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Event Info */}
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
                    <p className="text-gray-600">{event.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium text-gray-700">Time</p>
                    <p className="text-gray-600">{event.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-purple-500" />
                  <div>
                    <p className="font-medium text-gray-700">Location</p>
                    <p className="text-gray-600">{event.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium text-gray-700">Attendance</p>
                    <p className="text-gray-600">{event.attendees} / {event.capacity} attending</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-purple-700">About This Event</h2>
                <div className="mt-1 h-1 w-20 bg-linear-to-r from-purple-500 to-blue-500 rounded-full"></div>
              </div>
              <div className="prose max-w-none">
                {event.fullDescription.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Lineup */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-purple-700">Featured Artists</h2>
                <div className="mt-1 h-1 w-20 bg-linear-to-r from-purple-500 to-blue-500 rounded-full"></div>
              </div>
              <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
                {event.lineup.map((artist, index) => (
                  <div key={index} className="text-center p-4 bg-linear-to-br from-purple-50 to-blue-50 rounded-lg border border-purple-100">
                    <div className="w-16 h-16 bg-linear-to-br from-purple-100 to-blue-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <span className="text-2xl">🎤</span>
                    </div>
                    <p className="font-medium text-gray-800">{artist}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-purple-700">Amenities & Services</h2>
                <div className="mt-1 h-1 w-20 bg-linear-to-r from-purple-500 to-blue-500 rounded-full"></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {event.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                    <div className="w-2 h-2 bg-linear-to-r from-purple-500 to-blue-500 rounded-full" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Ticket Booking */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="mb-6">
                <div className="flex items-center gap-2 text-lg font-semibold text-purple-700">
                  <TicketCheck className="h-5 w-5" />
                  Book Tickets
                </div>
                <div className="mt-1 h-1 w-20 bg-linear-to-r from-purple-500 to-blue-500 rounded-full"></div>
              </div>
              <div className="space-y-4">
                <div className="space-y-3">
                  {event.ticketTypes.map((ticketType, index) => (
                    <div 
                      key={index} 
                      className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${selectedTicketType === index ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300'}`}
                      onClick={() => setSelectedTicketType(index)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-800">{ticketType.name}</h4>
                        <span className="text-lg font-bold text-purple-600">${ticketType.price}</span>
                      </div>
                      <p className="text-sm text-gray-600">{ticketType.description}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-700">Quantity</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleQuantityChange(-1)}
                        disabled={quantity <= 1}
                        className="h-8 w-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-purple-50 hover:border-purple-300 disabled:opacity-50 disabled:hover:bg-transparent"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="mx-3 font-medium text-gray-800">{quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(1)}
                        disabled={quantity >= 10}
                        className="h-8 w-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-purple-50 hover:border-purple-300 disabled:opacity-50 disabled:hover:bg-transparent"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-lg font-bold pt-2">
                    <span className="text-gray-800">Total</span>
                    <span className="text-purple-600">
                      ${event.ticketTypes[selectedTicketType].price * quantity}
                    </span>
                  </div>

                  <button 
                    onClick={handleAddToCart}
                    className="w-full py-3 bg-linear-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 rounded-lg font-medium transition-colors duration-200"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>

            {/* Organizer Info */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-purple-700">Organizer</h2>
                <div className="mt-1 h-1 w-20 bg-linear-to-r from-purple-500 to-blue-500 rounded-full"></div>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-linear-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-xl">🏢</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">{event.organizer}</p>
                  <p className="text-sm text-gray-600">Event Organizer</p>
                </div>
              </div>
              <button className="w-full py-2 border border-purple-600 text-purple-600 hover:bg-purple-50 rounded-lg font-medium transition-colors duration-200">
                View Profile
              </button>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-purple-700">Event Stats</h2>
                <div className="mt-1 h-1 w-20 bg-linear-to-r from-purple-500 to-blue-500 rounded-full"></div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium text-gray-800">{event.rating}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Reviews</span>
                  <span className="font-medium text-gray-800">{event.reviews}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Capacity</span>
                  <span className="font-medium text-gray-800">{event.capacity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Attending</span>
                  <span className="font-medium text-gray-800">{event.attendees}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;