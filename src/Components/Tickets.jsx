import { useState } from "react";
import { FaPlus, FaSpinner, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { addTicketTypes } from "../BE/pocketbase";

const Tickets = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
  });

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

  const allTickets = formData.ticketTypes?.reduce(
    (sum, type) => sum + parseInt(type.quantity || 0),
    0
  );

  const handlePublish = async (e) => {
    e.preventDefault()
    setLoading(true);

    try {
      const result = await addTicketTypes(
        formData.ticketTypes[0].name,
        formData.ticketTypes[0].price,
        formData.ticketTypes[0].quantity,
        formData.ticketTypes[0].earlyBirdPrice,
        formData.ticketTypes[0].description,
      );
      if (result) {
        navigate("/account/dashboard");
      }
    } catch (error) {
      console.error("Error adding ticket type:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Capacity & Pricing */}
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
              <span className="font-bold">{allTickets || 0}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex flex-col lg:flex-row gap-4 justify-center pt-8">
        {loading ? (
          <button className="cursor-not-allowed flex justify-center items-center px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-md hover:shadow-lg">
            <svg className="mr-3 size-8 animate-spin" viewBox="0 0 24 24">
              <FaSpinner />
            </svg>
          </button>
        ) : (
          <button
            onClick={handlePublish}
            type="submit"
            className="flex px-8 py-3 cursor-pointer bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 rounded-lg font-medium transition-colors duration-200"
          >
            Publish Event
          </button>
        )}
      </div>
    </div>
  );
};

export default Tickets;
