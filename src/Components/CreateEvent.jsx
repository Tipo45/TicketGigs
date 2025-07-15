import { useState } from "react";
import { FaCalendarAlt, FaFileAlt } from "react-icons/fa";
import { FaLocationDot, FaPlus, FaUsers } from "react-icons/fa6";

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    date: "",
    time: "",
    location: "",
    venue: "",
    capacity: "",
    ticketTypes: [
      {
        name: "",
        price: "",
        quantity: "",
        earlyBirdPrice: "",
        earlyBirdDeadline: "",
        description: "",
      },
    ],
    image: "",
    organizer: "",
    contactEmail: "",
    contactPhone: "",
    tags: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Event data:", formData);
    // Handle form submission here
  };

  const categories = [
    "Music",
    "Conference",
    "Food & Drink",
    "Art & Culture",
    "Sports",
    "Entertainment",
    "Education",
    "Business",
    "Technology",
    "Health & Wellness",
    "Other",
  ];

  const addTicketType = () => {
    setFormData((prev) => ({
      ...prev,
      ticketTypes: [
        ...prev.ticketTypes,
        {
          name: "",
          price: "",
          quantity: "",
          earlyBirdPrice: "",
          earlyBirdDeadline: "",
          description: "",
        },
      ],
    }));
  };

  const removeTicketType = (index) => {
    if (formData.ticketTypes.length <= 1) return;
    setFormData((prev) => ({
      ...prev,
      ticketTypes: prev.ticketTypes.filter((_, i) => i !== index),
    }));
  };

  const updateTicketType = (index, field, value) => {
    setFormData((prev) => {
      const updatedTicketTypes = [...prev.ticketTypes];
      updatedTicketTypes[index] = {
        ...updatedTicketTypes[index],
        [field]: value,
      };
      return {
        ...prev,
        ticketTypes: updatedTicketTypes,
      };
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Create Your Event
          </h1>
          <p className="text-xl text-gray-600">
            Share your amazing event with the world and start selling tickets
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="mb-6">
              <div className="flex items-center gap-2 text-lg font-semibold text-purple-700">
                <FaFileAlt className="h-5 w-5" />
                Basic Information
              </div>
              <div className="mt-1 h-1 w-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
            </div>
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Event Title <span className="text-red-500">*</span>
                </label>
                <input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter your event title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Event Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your event in detail..."
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category} value={category.toLowerCase()}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="tags"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Tags (comma separated)
                  </label>
                  <input
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    placeholder="music, festival, outdoor"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Date & Time */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="mb-6">
              <div className="flex items-center gap-2 text-lg font-semibold text-purple-700">
                <FaCalendarAlt className="h-5 w-5" />
                Date & Time
              </div>
              <div className="mt-1 h-1 w-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Event Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="time"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Event Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="time"
                    name="time"
                    type="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="mb-6">
              <div className="flex items-center gap-2 text-lg font-semibold text-purple-700">
                <FaLocationDot className="h-5 w-5" />
                Location & Venue
              </div>
              <div className="mt-1 h-1 w-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
            </div>
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="venue"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Venue Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="venue"
                  name="venue"
                  value={formData.venue}
                  onChange={handleInputChange}
                  placeholder="Enter venue name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Street address, City, State, ZIP"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>

          {/* Capacity & Pricing */}
          {/* <div className="bg-white rounded-xl shadow-md p-6">
            <div className="mb-6">
              <div className="flex items-center gap-2 text-lg font-semibold text-purple-700">
                <FaUsers className="h-5 w-5" />
                Capacity & Pricing
              </div>
              <div className="mt-1 h-1 w-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div>
                  <label
                    htmlFor="capacity"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Max Capacity <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="capacity"
                    name="capacity"
                    type="number"
                    value={formData.capacity}
                    onChange={handleInputChange}
                    placeholder="100"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Ticket Price (₦) <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="25.00"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="earlyBirdPrice"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Early Bird Price (₦)
                  </label>
                  <input
                    id="earlyBirdPrice"
                    name="earlyBirdPrice"
                    type="number"
                    step="0.01"
                    value={formData.earlyBirdPrice}
                    onChange={handleInputChange}
                    placeholder="20.00"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              {formData.earlyBirdPrice && (
                <div>
                  <label
                    htmlFor="earlyBirdDeadline"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Early Bird Deadline
                  </label>
                  <input
                    id="earlyBirdDeadline"
                    name="earlyBirdDeadline"
                    type="date"
                    value={formData.earlyBirdDeadline}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              )}
            </div>
          </div> */}

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="mb-6">
              <div className="flex items-center gap-2 text-lg font-semibold text-purple-700">
                <FaUsers className="h-5 w-5" />
                Capacity & Pricing
              </div>
              <div className="mt-1 h-1 w-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
            </div>

            <div className="space-y-6">
              {/* Ticket Types Section */}
              <div>
                <h3 className="text-md font-medium text-gray-700 mb-3">
                  Ticket Types
                </h3>

                {formData.ticketTypes?.map((ticketType, index) => (
                  <div
                    key={index}
                    className="mb-6 p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-medium text-purple-700">
                        Ticket Type #{index + 1}
                      </h4>
                      <button
                        type="button"
                        onClick={() => removeTicketType(index)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          value={ticketType.name}
                          onChange={(e) =>
                            updateTicketType(index, "name", e.target.value)
                          }
                          placeholder="e.g. VIP, Standard"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Price (₦) <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={ticketType.price}
                          onChange={(e) =>
                            updateTicketType(index, "price", e.target.value)
                          }
                          placeholder="5000.00"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Quantity <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          value={ticketType.quantity}
                          onChange={(e) =>
                            updateTicketType(index, "quantity", e.target.value)
                          }
                          placeholder="100"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Early Bird Price (₦)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={ticketType.earlyBirdPrice || ""}
                          onChange={(e) =>
                            updateTicketType(
                              index,
                              "earlyBirdPrice",
                              e.target.value
                            )
                          }
                          placeholder="4000.00"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    </div>

                    {ticketType.earlyBirdPrice && (
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Early Bird Deadline
                        </label>
                        <input
                          type="date"
                          value={ticketType.earlyBirdDeadline || ""}
                          onChange={(e) =>
                            updateTicketType(
                              index,
                              "earlyBirdDeadline",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    )}

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        value={ticketType.description || ""}
                        onChange={(e) =>
                          updateTicketType(index, "description", e.target.value)
                        }
                        placeholder="What's included in this ticket?"
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addTicketType}
                  className="mt-2 flex items-center gap-2 text-purple-600 hover:text-purple-800 text-sm font-medium"
                >
                  <FaPlus className="h-4 w-4" />
                  Add Another Ticket Type
                </button>
              </div>

              {/* Total Capacity (auto-calculated) */}
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-purple-700">
                    Total Event Capacity:
                  </span>
                  <span className="font-bold">
                    {formData.ticketTypes?.reduce(
                      (sum, type) => sum + parseInt(type.quantity || 0),
                      0
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="mb-6">
              <div className="flex items-center gap-2 text-lg font-semibold text-purple-700">
                <FaUsers className="h-5 w-5" />
                Organizer Information
              </div>
              <div className="mt-1 h-1 w-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
            </div>
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="organizer"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Organizer Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="organizer"
                  name="organizer"
                  value={formData.organizer}
                  onChange={handleInputChange}
                  placeholder="Your name or organization"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="contactEmail"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Contact Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contactEmail"
                    name="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    placeholder="contact@example.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="contactPhone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Contact Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contactPhone"
                    name="contactPhone"
                    type="tel"
                    value={formData.contactPhone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex flex-col lg:flex-row gap-4 justify-center pt-8">
            <button
              type="button"
              className="px-8 py-3 cursor-pointer bg-white text-purple-700 border border-purple-700 hover:bg-purple-50 rounded-lg font-medium transition-colors duration-200"
            >
              Save as Draft
            </button>
            <button
              type="submit"
              className="px-8 py-3 cursor-pointer bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 rounded-lg font-medium transition-colors duration-200"
            >
              Publish Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
