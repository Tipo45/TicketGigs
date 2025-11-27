import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../BE/pocketbase";
import { toast } from "sonner";
import { ArrowRight, CalendarDays, FileText, LoaderCircle, MapPin, Plus, User, X } from "lucide-react";


const CreateEvent = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    eventTitle: "",
    eventDescription: "",
    category: "",
    tags: "",
    eventDate: "",
    eventTime: "",
    venueName: "",
    fullAddress: "",
    organizerName: "",
    contactEmail: "",
    contactPhone: "",
    image: null,
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate image file
      if (!file.type.match("image.*")) {
        setErrors((prev) => ({
          ...prev,
          image: "Please select a valid image file",
        }));
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        setErrors((prev) => ({
          ...prev,
          image: "Image size should be less than 5MB",
        }));
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      setFormData((prev) => ({ ...prev, image: file }));
      setErrors((prev) => ({ ...prev, image: null }));
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setFormData((prev) => ({ ...prev, image: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      "eventTitle",
      "eventDescription",
      "category",
      "eventDate",
      "eventTime",
      "fullAddress",
      "venueName",
      "organizerName",
      "contactEmail",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
      }
    });

    if (
      formData.contactEmail &&
      !/^\S+@\S+\.\S+$/.test(formData.contactEmail)
    ) {
      newErrors.contactEmail = "Please enter a valid email address";
    }

    if (formData.eventDate) {
      const selectedDate = new Date(formData.eventDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.eventDate = "Event date cannot be in the past";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setLoading(true);
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null && formData[key] !== "") {
          formDataToSend.append(key, formData[key]);
        }
      });

      const result = await createEvent(formDataToSend);
      if (result) {
        // toast.success("Event created successfully!");
        navigate(`/create-event/${result.id}/tickets`, { 
          state: { eventData: formData } 
        });
      }
    } catch (error) {
      console.error("Error creating event:", error);
      // toast.error("Failed to create event. Please try again.");
    } finally {
      setLoading(false);
    }
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

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 to-blue-50 py-12">
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

        <form onSubmit={handleNext} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="mb-6">
              <div className="flex items-center gap-2 text-lg font-semibold text-purple-700">
                <FileText className="h-5 w-5" />
                Basic Information
              </div>
              <div className="mt-1 h-1 w-20 bg-linear-to-r from-purple-500 to-blue-500 rounded-full"></div>
            </div>
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="eventTitle"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Event Title <span className="text-red-500">*</span>
                </label>
                <input
                  id="eventTitle"
                  name="eventTitle"
                  value={formData.eventTitle}
                  onChange={handleInputChange}
                  placeholder="Enter your event title"
                  className={`w-full px-4 py-2 border ${
                    errors.eventTitle ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                />
                {errors.eventTitle && (
                  <p className="mt-1 text-sm text-red-600">{errors.eventTitle}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="eventDescription"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Event Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="eventDescription"
                  name="eventDescription"
                  value={formData.eventDescription}
                  onChange={handleInputChange}
                  placeholder="Describe your event in detail..."
                  rows={4}
                  className={`w-full px-4 py-2 border ${
                    errors.eventDescription ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                />
                {errors.eventDescription && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.eventDescription}
                  </p>
                )}
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Image <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 flex items-center gap-4">
                  {imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Event preview"
                        className="h-32 w-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-32 w-32 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                      <Plus className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                  <div className="flex-1">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      accept="image/*"
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      Choose Image
                    </label>
                    <p className="mt-1 text-xs text-gray-500">
                      JPEG, PNG (Max 5MB)
                    </p>
                    {errors.image && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.image}
                      </p>
                    )}
                  </div>
                </div>
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
                    className={`w-full px-4 py-2 border ${
                      errors.category ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category} value={category.toLowerCase()}>
                        {category}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.category}
                    </p>
                  )}
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
                <CalendarDays className="h-5 w-5" />
                Date & Time
              </div>
              <div className="mt-1 h-1 w-20 bg-linear-to-r from-purple-500 to-blue-500 rounded-full"></div>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="eventDate"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Event Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="eventDate"
                    name="eventDate"
                    type="date"
                    value={formData.eventDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split("T")[0]}
                    className={`w-full px-4 py-2 border ${
                      errors.eventDate ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  />
                  {errors.eventDate && (
                    <p className="mt-1 text-sm text-red-600">{errors.eventDate}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="eventTime"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Event Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="eventTime"
                    name="eventTime"
                    type="time"
                    value={formData.eventTime}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border ${
                      errors.eventTime ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  />
                  {errors.eventTime && (
                    <p className="mt-1 text-sm text-red-600">{errors.eventTime}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="mb-6">
              <div className="flex items-center gap-2 text-lg font-semibold text-purple-700">
                <MapPin className="h-5 w-5" />
                Location & Venue
              </div>
              <div className="mt-1 h-1 w-20 bg-linear-to-r from-purple-500 to-blue-500 rounded-full"></div>
            </div>
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="venueName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Venue Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="venueName"
                  name="venueName"
                  value={formData.venueName}
                  onChange={handleInputChange}
                  placeholder="Enter venue name"
                  className={`w-full px-4 py-2 border ${
                    errors.venueName ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                />
                {errors.venueName && (
                  <p className="mt-1 text-sm text-red-600">{errors.venueName}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="fullAddress"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="fullAddress"
                  name="fullAddress"
                  value={formData.fullAddress}
                  onChange={handleInputChange}
                  placeholder="Street address, City, State, ZIP"
                  className={`w-full px-4 py-2 border ${
                    errors.fullAddress ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                />
                {errors.fullAddress && (
                  <p className="mt-1 text-sm text-red-600">{errors.fullAddress}</p>
                )}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="mb-6">
              <div className="flex items-center gap-2 text-lg font-semibold text-purple-700">
                <User className="h-5 w-5" />
                Organizer Information
              </div>
              <div className="mt-1 h-1 w-20 bg-linear-to-r from-purple-500 to-blue-500 rounded-full"></div>
            </div>
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="organizerName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Organizer Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="organizerName"
                  name="organizerName"
                  value={formData.organizerName}
                  onChange={handleInputChange}
                  placeholder="Your name or organization"
                  className={`w-full px-4 py-2 border ${
                    errors.organizerName ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                />
                {errors.organizerName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.organizerName}
                  </p>
                )}
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
                    className={`w-full px-4 py-2 border ${
                      errors.contactEmail ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  />
                  {errors.contactEmail && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.contactEmail}
                    </p>
                  )}
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
                    className={`w-full px-4 py-2 border ${
                      errors.contactPhone ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  />
                  {errors.contactPhone && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.contactPhone}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex flex-col lg:flex-row gap-4 justify-center pt-8">
            {loading ? (
              <button
                type="button"
                disabled
                className="flex items-center justify-center px-8 py-3 cursor-not-allowed bg-linear-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium transition-colors duration-200"
              >
                <LoaderCircle className="animate-spin mr-2" />
                Processing...
              </button>
            ) : (
              <button
                type="submit"
                className="flex items-center justify-center px-8 py-3 cursor-pointer bg-linear-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 rounded-lg font-medium transition-colors duration-200"
              >
                Next <ArrowRight className="ml-2" />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;