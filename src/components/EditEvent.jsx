import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { updateEvent } from "../backend/pocketbase";
import { Button } from "./ui/button";
import { ArrowLeft, Calendar, FileText, MapPin, Save, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const EditEvent = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const eventData = location.state?.eventInfo;
  const [loading, setLoading] = useState(false);

  const categories = [
    "Music",
    "Conference",
    "Food & Drifnk",
    "Art & Culture",
    "Sports",
    "Entertainment",
    "Education",
    "Business",
    "Technology",
    "Health & Wellness",
    "Other",
  ];

  const [formData, setFormData] = useState({
    title: eventData?.eventTitle || "",
    description: eventData?.eventDescription || "",
    category: eventData?.category || "",
    tags: eventData?.tags || "",
    date: eventData?.eventDate || "",
    time: eventData?.eventTime || "",
    venue: eventData?.venueName || "",
    location: eventData?.fullAddress || "",
    organizer: eventData?.organizerName || "",
    contactEmail: eventData?.contactEmail || "",
    phone: eventData?.contactPhone || "",
    image: eventData?.eventImage || "",
  });

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    category: "",
    tags: "",
    date: "",
    time: "",
    venue: "",
    location: "",
    organizer: "",
    phone: "",
  });

  console.log("Event Data in EditEvent:", eventData);
  console.log("Event Data in EditEvent:", eventData.contactEmail);
  console.log("Form Data in EditEvent:", formData);

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

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const result = await updateEvent(eventData.id, formData);

      if (result) {
        navigate(-1);
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("An error occurred while updating your information.");
    }
    setLoading(false);
  };

  if (!eventData) {
    return (
      <div className="text-center p-8 text-red-500 bg-red-50 rounded-lg">
        No data found. Please go back and try again.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Edit Event
            </h1>
            <p className="text-xl text-muted-foreground">
              Update your event details
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-purple-500" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label htmlFor="title">Event Title </label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter your event title"
                  className="w-full pl-10 h-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <div>
                <label htmlFor="description">Event Description </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your event in detail..."
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="category">Category </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
                  <label htmlFor="tags">Tags (comma separated)</label>
                  <input
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    placeholder="music, festival, outdoor"
                    className="w-full pl-10 h-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Date & Time */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-purple-500" />
                Date & Time
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="date">Event Date</label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full pl-10 h-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>

                <div>
                  <label htmlFor="time">Event Time</label>
                  <input
                    id="time"
                    name="time"
                    type="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full pl-10 h-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-purple-500" />
                Location & Venue
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label htmlFor="venue">Venue Name</label>
                <input
                  id="venue"
                  name="venue"
                  value={formData.venue}
                  onChange={handleInputChange}
                  placeholder="Enter venue name"
                  className="w-full pl-10 h-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <div>
                <label htmlFor="location">Full Address *</label>
                <input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Street address, City, State, ZIP"
                  className="w-full pl-10 h-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </CardContent>
          </Card>

          {/* Capacity & Pricing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-500" />
                Capacity & Pricing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="capacity">Max Capacity</label>
                  <input
                    id="capacity"
                    name="capacity"
                    type="number"
                    value={formData.capacity}
                    onChange={handleInputChange}
                    placeholder="100"
                    className="w-full pl-10 h-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>

                <div>
                  <label htmlFor="price">Ticket Price (₦)</label>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="25.00"
                    className="w-full pl-10 h-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>

                <div>
                  <label htmlFor="earlyBirdPrice">Early Bird Price (₦)</label>
                  <input
                    id="earlyBirdPrice"
                    name="earlyBirdPrice"
                    type="number"
                    step="0.01"
                    value={formData.earlyBirdPrice}
                    onChange={handleInputChange}
                    placeholder="20.00"
                    className="w-full pl-10 h-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>

              {formData.earlyBirdPrice && (
                <div>
                  <label htmlFor="earlyBirdDeadline">Early Bird Deadline</label>
                  <input
                    id="earlyBirdDeadline"
                    name="earlyBirdDeadline"
                    type="date"
                    value={formData.earlyBirdDeadline}
                    onChange={handleInputChange}
                    className="w-full pl-10 h-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-500" />
                Organizer Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label htmlFor="organizer">Organizer Name</label>
                <input
                  id="organizer"
                  name="organizer"
                  value={formData.organizer}
                  onChange={handleInputChange}
                  placeholder="Your name or organization"
                  className="w-full pl-10 h-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contactEmail">Contact Email</label>
                  <input
                    id="contactEmail"
                    name="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    placeholder="contact@example.com"
                    className="w-full pl-10 h-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>

                <div>
                  <label htmlFor="contactPhone">Contact Phone</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                    className="w-full pl-10 h-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
              className="px-8 py-3"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer bg-linear-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              {loading ? (
                <>Saving...</>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEvent;
