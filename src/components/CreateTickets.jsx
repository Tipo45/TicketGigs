import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addTicketType, pb } from "../BE/pocketbase";

const CreateTickets = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    capacity: "",
    ticketTypes: [
      {
        ticketName: "",
        ticketPrice: "",
        ticketQuantity: "",
        earlyBirdPrice: "",
        earlyBirdDeadline: "",
        description: "",
      },
    ],
  });

  const { id } = useParams();


  const addTicketTypes = () => {
    if (formData.ticketTypes.length >= 5) {
      alert("Maximum of 5 ticket types allowed.");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      ticketTypes: [
        ...prev.ticketTypes,
        {
          ticketName: "",
          ticketPrice: "",
          ticketQuantity: "",
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
    (sum, type) => sum + parseInt(type.ticketQuantity || 0),
    0
  );

  // const handlePublish = async (e) => {
  //   e.preventDefault()
  //   setLoading(true);

  //   try {
  //     // const result = await addTicketTypes(
  //     //   formData.ticketTypes[0].ticketName,
  //     //   formData.ticketTypes[0].ticketPrice,
  //     //   formData.ticketTypes[0].ticketQuantity,
  //     //   formData.ticketTypes[0].earlyBirdPrice,
  //     //   formData.ticketTypes[0].description,
  //     // );
  //     const result = await addTicketTypes(formData.ticketTypes);
  //     if (result) {
  //       navigate("/account/dashboard");
  //     }
  //   } catch (error) {
  //     console.error("Error adding ticket type:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handlePublish = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    // Create an object with the structure your backend expects
    const backendData = {};
    
    // Map each ticket type to the corresponding fields (ticket1, ticket2, etc.)
    formData.ticketTypes.forEach((ticket, index) => {
      const ticketNum = index + 1;
      backendData[`ticketName${ticketNum}`] = ticket.ticketName;
      backendData[`ticketPrice${ticketNum}`] = ticket.ticketPrice;
      backendData[`ticketQuantity${ticketNum}`] = ticket.ticketQuantity;
      backendData[`earlyBirdPrice${ticketNum}`] = ticket.earlyBirdPrice || "";
      backendData[`earlyBirdDeadline${ticketNum}`] = ticket.earlyBirdDeadline || "";
      backendData[`description${ticketNum}`] = ticket.description || "";
    });

    // Fill empty values for remaining tickets (up to 5)
    for (let i = formData.ticketTypes.length; i < 5; i++) {
      const ticketNum = i + 1;
      backendData[`ticketName${ticketNum}`] = "";
      backendData[`ticketPrice${ticketNum}`] = "";
      backendData[`ticketQuantity${ticketNum}`] = "";
      backendData[`earlyBirdPrice${ticketNum}`] = "";
      backendData[`earlyBirdDeadline${ticketNum}`] = "";
      backendData[`description${ticketNum}`] = "";
    }
    backendData.totalTickets = allTickets;

    backendData.event = id;
    // Add creator ID
    backendData.creator = pb.authStore.record.id;

    const result = await addTicketType(backendData);
    if (result) {
      navigate("/account/dashboard");
    }
  } catch (error) {
    console.error("Error adding ticket types:", error);
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
            <User className="h-5 w-5" />
            Capacity & Pricing
          </div>
          <div className="mt-1 h-1 w-20 bg-linear-to-r from-purple-500 to-blue-500 rounded-full"></div>
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
                      value={ticketType.ticketName}
                      onChange={(e) =>
                        updateTicketType(index, "ticketName", e.target.value)
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
                      value={ticketType.ticketPrice}
                      onChange={(e) =>
                        updateTicketType(index, "ticketPrice", e.target.value)
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
                      value={ticketType.ticketQuantity}
                      onChange={(e) =>
                        updateTicketType(index, "ticketQuantity", e.target.value)
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
              onClick={addTicketTypes}
              className="mt-2 flex items-center gap-2 text-purple-600 hover:text-purple-800 text-sm font-medium"
            >
              <Plus className="h-4 w-4" />
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
          <button className="cursor-not-allowed flex justify-center items-center px-8 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-md hover:shadow-lg">
            <svg className="mr-3 size-8 animate-spin" viewBox="0 0 24 24">
              <LoaderCircle />
            </svg>
          </button>
        ) : (
          <button
            onClick={handlePublish}
            type="submit"
            className="flex px-8 py-3 cursor-pointer bg-linear-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 rounded-lg font-medium transition-colors duration-200"
          >
            Publish Event
          </button>
        )}
      </div>
    </div>
  );
};

export default CreateTickets;