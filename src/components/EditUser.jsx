import { ArrowLeft, Building2, Mail, Phone, Save, User } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { updateHost } from "../backend/pocketbase";

const EditUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state?.userData;
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstname: userData?.firstname || "",
    lastname: userData?.lastname || "",
    email: userData?.email,
    phone: userData?.phone || "",
  });

  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    form: "",
  });

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

    const newErrors = {
    firstname: "",
    lastname: "",
    phone: "",
    form: "",
  };

  if (formData.firstname.trim() === "") {
      newErrors.firstname = "First name is required";
      isValid = false;
    }

    if (formData.lastname.trim() === "") {
      newErrors.lastname = "Last name is required";
      isValid = false;
    }

    // Phone number validation
    if (formData.phone.length < 11) {
      newErrors.phone = "Enter valid number length";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({ firstname: "", lastname: "", email: "", phone: "", form: "" });

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const result = await updateHost(userData.id, formData);

      if (result) {
        navigate(-1);
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("An error occurred while updating your information.");
    }
    setLoading(false);
  };

  if (!userData) {
    return (
      <div className="text-center p-8 text-red-500 bg-red-50 rounded-lg">
        No data found. Please go back and try again.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <Button onClick={() => navigate(-1)} variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>

            <div>
              <h1 className="text-xl font-bold text-foreground">
                Edit Account
              </h1>
              <p className="text-muted-foreground text-xs xl:text-lg">
                Update your personal information
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstname">First Name</label>
                  <input
                    type="text"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleInputChange}
                    placeholder={"Enter your first name"}
                    className={`w-full pl-8 h-10 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500${errors.firstname ? " border-red-500" : "border-gray-300"}`}
                  />
                  {errors.firstname && <p className="mt-1 text-red-500 text-sm">{errors.firstname}</p>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastname">Last Name</label>
                  <input
                    type="text"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleInputChange}
                    placeholder={"Enter your last name"}
                    className={`w-full pl-8 h-10 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500${errors.lastname ? " border-red-500" : "border-gray-300"}`}
                  />
                  {errors.lastname && <p className="mt-1 text-red-500 text-sm">{errors.lastname}</p>}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Contact Information
              </CardTitle>
              <CardDescription>How can people reach you?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="email">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2/4 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      readOnly
                      className="w-full pl-10 h-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 000-0000"
                      className={`w-full pl-8 h-10 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500${errors.phone ? " border-red-500" : "border-gray-300"}`}
                    />
                    {errors.phone && <p className="mt-1 text-red-500 text-sm">{errors.phone}</p>}
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="address">Address</label>
                <input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter your address"
                  className={`w-full pl-8 h-10 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500${errors.address ? " border-red-500" : "border-gray-300"}`}
                />
                {errors.address && <p className="mt-1 text-red-500 text-sm">{errors.address}</p>}
              </div>
            </CardContent>
          </Card>

          {/* Organization Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Organization Details
              </CardTitle>
              <CardDescription>
                Information about your organization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="organization">Organization Name</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      id="organization"
                      name="organization"
                      value={formData.organization}
                      onChange={handleInputChange}
                      placeholder="Your organization"
                      className="w-full pl-10 h-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                </div>
                
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-auto"
                onClick={() => navigate(-1)}
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

export default EditUser;
