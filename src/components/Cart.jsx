import { CalendarDays, CreditCard, MapPin, Minus, Plus, ShieldCheck, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "Summer Music Festival",
      date: "July 15, 2024",
      time: "6:00 PM",
      location: "Central Park, New York",
      price: 89.0,
      quantity: 2,
      ticketType: "General Admission",
      image:
        "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=250&fit=crop",
    },
    {
      id: 2,
      title: "Tech Innovation Conference",
      date: "August 3, 2024",
      time: "9:00 AM",
      location: "Convention Center, San Francisco",
      price: 299.0,
      quantity: 1,
      ticketType: "VIP Pass",
      image:
        "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&h=250&fit=crop",
    },
    {
      id: 3,
      title: "Food & Wine Tasting",
      date: "July 28, 2024",
      time: "7:00 PM",
      location: "Waterfront Plaza, Seattle",
      price: 125.0,
      quantity: 1,
      ticketType: "Standard Entry",
      image:
        "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=250&fit=crop",
    },
  ]);

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "save10") {
      setDiscount(0.1);
    } else if (promoCode.toLowerCase() === "welcome20") {
      setDiscount(0.2);
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discountAmount = subtotal * discount;
  const serviceFee = subtotal * 0.05; // 5% service fee
  const total = subtotal - discountAmount + serviceFee;

  const handleViewEventsClick = () => {
    navigate("/events");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 to-blue-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Cart</h1>
          <p className="text-gray-600">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in
            your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🛒</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Discover amazing events and add tickets to your cart
                  </p>
                  <button onClick={handleViewEventsClick} className="bg-linear-to-r from-purple-600 to-blue-600 cursor-pointer text-white hover:from-purple-700 hover:to-blue-700 px-6 py-2 rounded-lg font-medium">
                    Browse Events
                  </button>
                </div>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex flex-col gap-4">
                      {/* Event Image Placeholder */}
                      <div className="w-full h-full bg-linear-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Event Details */}
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {item.title}
                        </h3>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div className="flex items-center gap-2">
                            <CalendarDays className="h-4 w-4 text-purple-500" />
                            <span>
                              {item.date} at {item.time}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-blue-500" />
                            <span>{item.location}</span>
                          </div>
                        </div>
                        <div className="mt-2">
                          <span className="inline-block bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">
                            {item.ticketType}
                          </span>
                        </div>
                      </div>

                      {/* Price and Quantity */}
                      <div className="flex flex-col items-end justify-between">
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900">
                            ${item.price.toFixed(2)}
                          </div>
                          <div className="text-sm text-gray-500">
                            per ticket
                          </div>
                        </div>

                        <div className="flex items-center gap-3 mt-4">
                          <div className="flex items-center border p-2 rounded-lg">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="h-8 w-8 p-0 text-gray-600 hover:text-purple-600"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-3 py-1 min-w-12 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="h-8 w-8 p-0 text-gray-600 hover:text-purple-600"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Order Summary */}
          {cartItems.length > 0 && (
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
                      className="px-4 py-2 bg-gray-100 text-gray-800 hover:bg-gray-200 rounded-lg font-medium"
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
                    <span className="text-gray-900">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({discount * 100}%)</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service Fee</span>
                    <span className="text-gray-900">
                      ${serviceFee.toFixed(2)}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-gray-900">Total</span>
                      <span className="text-purple-600">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button className="w-full cursor-pointer bg-linear-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 py-3 text-lg font-semibold rounded-lg transition-all duration-300">
                <CreditCard className="mr-2 h-6 w-6 mb-1 inline" />
                Proceed to Checkout
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

export default Cart;