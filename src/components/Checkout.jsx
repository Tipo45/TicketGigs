import { CalendarDays, CreditCard, MapPin, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


const Checkout = () => {

  const location = useLocation();
  const { event, ticket, quantity } = location.state || {};
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [buyerInfo, setBuyerInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const navigate = useNavigate();

  const handleBuyerChange = (e) => {
    const { name, value } = e.target;
    setBuyerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (!event || !ticket || !quantity) {
      navigate("/events"); // or homepage
    }
  }, [event, ticket, quantity, navigate]);

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "save10") {
      setDiscount(0.1);
    } else if (promoCode.toLowerCase() === "welcome20") {
      setDiscount(0.2);
    }
  };

  const subtotal = ticket.price * quantity;

  const discountAmount = subtotal * discount;
  const serviceFee = subtotal * 0.15; // 15% service fee
  const total = subtotal - discountAmount + serviceFee;

  const handleViewEventsClick = () => {
    navigate("/events");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 to-blue-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-600 capitalize">
            {quantity} {quantity === 1 ? "ticket" : "tickets"} for {event.eventTitle} in
            Checkout
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {/* checkOut Items */}
          <div className="lg:col-span-2 space-y-4">
            {/* Buyer Information */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Buyer Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={buyerInfo.firstName}
                    onChange={handleBuyerChange}
                    placeholder="John"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={buyerInfo.lastName}
                    onChange={handleBuyerChange}
                    placeholder="Doe"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={buyerInfo.email}
                    onChange={handleBuyerChange}
                    placeholder="john@example.com"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={buyerInfo.phone}
                    onChange={handleBuyerChange}
                    placeholder="+234 801 234 5678"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>

            {ticket.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🛒</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Empty
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Discover amazing events and add tickets to your checkOut
                  </p>
                  <button onClick={handleViewEventsClick} className="bg-linear-to-r from-purple-600 to-blue-600 cursor-pointer text-white hover:from-purple-700 hover:to-blue-700 px-6 py-2 rounded-lg font-medium">
                    Browse Events
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col gap-4">
                    {/* Event Image Placeholder */}
                    <div className="w-full h-full bg-linear-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center">
                      <img
                        // src={`http://127.0.0.1:8090/api/files/events/${event.id}/${event.image}`}
                        src={`https://service-konnect.pockethost.io/api/files/events/${event.id}/${event.image}`}
                        alt={event.eventTitle}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Event Details */}
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 capitalize">
                        {event.eventTitle}
                      </h3>
                      <div className="text-sm text-gray-600 space-y-3">
                        <div className="flex items-center gap-2">
                          <CalendarDays className="h-4 w-4 text-purple-500" />
                          <span>
                            {event.eventDate} at {event.eventTime}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-blue-500" />
                          <span>{event.fullAddress}</span>
                        </div>
                      </div>
                      <div className="mt-3">
                        <span className="inline-block bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">
                          {ticket.name}
                        </span>
                      </div>
                    </div>

                    {/* Price and Quantity */}
                    <div className="flex flex-col items-end justify-between">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">
                          ₦ {(quantity * ticket.price).toLocaleString("en-US")}
                        </div>
                        <div className="text-xs text-gray-500">
                          ₦ {ticket.price.toLocaleString()} per ticket
                        </div>
                      </div>

                      <div className="flex items-center gap-3 mt-4">
                        <div className="flex items-center border p-2 rounded-lg">

                          <span className="px-3 py-1 min-w-12 text-center">
                            {quantity}
                          </span>

                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>

            )}
          </div>

          {/* Order Summary */}
          {quantity > 0 && (
            <div className="space-y-6">
              {/* Promo Code */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Promo Code
                  </h3>
                </div>
                <div>
                  <div className="flex gap-2">
                    <input
                      className="flex-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <button
                      onClick={applyPromoCode}
                      className={`px-4 ${promoCode.length < 6 ? "cursor-not-allowed" : "bg-purple-600 text-white hover:bg-gray-200"
                        } py-2 bg-gray-100 text-gray-800 rounded-lg font-medium`}
                    >
                      Apply
                    </button>
                  </div>
                  {discount > 0 && (
                    <div className="mt-2 text-sm text-green-600">
                      ✓ {discount * 100}% discount applied!
                    </div>
                  )}
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Order Summary
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900 font-bold">
                      ₦ {subtotal.toLocaleString()}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({discount * 100}%)</span>
                      <span>-₦ {discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service Fee</span>
                    <span className="text-gray-900">
                      ₦ {serviceFee.toLocaleString()}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-gray-900">Total</span>
                      <span className="text-purple-600">
                        ₦ {total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button  className={
                !buyerInfo.firstName ||
                !buyerInfo.lastName ||
                !buyerInfo.email ||
                !buyerInfo.phone
                  ? "cursor-not-allowed bg-gray-300 text-gray-500 w-full py-3 text-lg font-semibold rounded-lg "
                  : "w-full cursor-pointer bg-linear-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 py-3 text-lg font-semibold rounded-lg transition-all duration-300"
              }>
                <CreditCard className="mr-2 h-6 w-6 mb-1 inline" />
                Proceed to Pay
              </button>

              {/* Security Notice */}
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <ShieldCheck className="h-4 w-4 text-blue-500" />
                <span>Secure checkout with 256-bit SSL encryption</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;