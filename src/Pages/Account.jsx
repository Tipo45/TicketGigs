import { useState } from "react";
import {
  Plus,
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Settings,
  Edit3,
  Trash2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { PieChart, Pie, Cell } from "recharts";
import { deleteAccount, logout } from "../BE/pocketbase";
import { useHostData } from "../hooks/useHostData";
import { toast } from "sonner";
 // Added Sonner import

const Account = () => {
  const [activeTab, setActiveTab] = useState("events");
  const navigate = useNavigate();

  const { data } = useHostData();

  // Show success toast when component mounts (after successful login)
  // useState(() => {
  //   toast.success("You have successfully logged in!", {
  //     description: `Welcome back, ${data.firstname} ${data.lastname}`,
  //   });
  // }, []);

  // Mock data for demonstration
  const userEvents = [
    {
      id: 1,
      title: "Summer Music Festival",
      date: "2024-08-15",
      time: "18:00",
      location: "Central Park, New York",
      capacity: 500,
      ticketsSold: 350,
      status: "active",
      image:
        "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=250&fit=crop",
    },
    {
      id: 2,
      title: "Tech Conference 2024",
      date: "2024-09-10",
      time: "09:00",
      location: "Convention Center, SF",
      capacity: 200,
      ticketsSold: 180,
      status: "active",
      image:
        "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&h=250&fit=crop",
    },
    {
      id: 3,
      title: "Food & Wine Expo",
      date: "2024-07-20",
      time: "12:00",
      location: "Downtown Plaza, LA",
      capacity: 300,
      ticketsSold: 300,
      status: "sold-out",
      image:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=250&fit=crop",
    },
  ];

  const userInfo = {
    joinDate: "January 2025",
    totalEvents: userEvents.length,
    totalTicketsSold: userEvents.reduce(
      (sum, event) => sum + event.ticketsSold,
      0
    ),
    totalRevenue: userEvents.reduce(
      (sum, event) => sum + event.ticketsSold * event.price,
      0
    ),
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "sold-out":
        return "bg-red-500";
      case "draft":
        return "bg-gray-500";
      default:
        return "bg-blue-500";
    }
  };

  const getTicketData = (event) => [
    { name: "Sold", value: event.ticketsSold, color: "#8b5cf6" }, // Purple-500
    {
      name: "Available",
      value: event.capacity - event.ticketsSold,
      color: "#e9d5ff",
    }, // Purple-100
  ];

  const chartConfig = {
    sold: {
      label: "Tickets Sold",
      color: "#8b5cf6",
    },
    available: {
      label: "Available",
      color: "#e9d5ff",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex-col items-center">
              <Link to="/">
                <div className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  TicketsGig
                </div>
              </Link>
              <p className="text-purple-100 text-sm tablet:text-lg">
                {/* Welcome back, {data.firstname}{" "}{data.lastname} */}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/create-event">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Event
                </Button>
              </Link>

              <Button
                variant="outline"
                className="bg-white/10 hover:bg-red-600 hover:text-white border-white/20 text-white"
                onClick={() => {logout(), navigate("/signin")}}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 lg:px-6 xl:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border border-purple-100 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Total Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-800">
                {userInfo.totalEvents}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border border-purple-100 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Tickets Sold
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-800">
                {userInfo.totalTicketsSold}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border border-purple-100 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Total Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-800">
                ₦{userInfo.totalRevenue.toFixed(2)}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border border-purple-100 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Member Since
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-800">
                {userInfo.joinDate}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-2 bg-purple-50">
            <TabsTrigger
              value="events"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white bg-gradient-to-r from-purple-100 to-blue-100"
            >
              My Events
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white bg-gradient-to-r from-purple-100 to-blue-100"
            >
              Account Settings
            </TabsTrigger>
          </TabsList>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6">
            <div className="grid gap-6">
              {userEvents.map((event) => (
                <Card
                  key={event.id}
                  className="overflow-hidden bg-white border border-purple-100 shadow-sm"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Event Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full lg:w-48 h-48 object-cover rounded-lg"
                        />
                      </div>

                      {/* Event Details */}
                      <div className="flex-1 space-y-4">
                        <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-4">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-800">
                              {event.title}
                            </h3>
                            <Badge
                              className={`${getStatusColor(
                                event.status
                              )} text-white mt-2`}
                            >
                              {event.status.charAt(0).toUpperCase() +
                                event.status.slice(1)}
                            </Badge>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-purple-300 text-purple-700 hover:bg-purple-50"
                            >
                              <Edit3 className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                            <Button variant="destructive" size="sm">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </Button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 xl:grid-cols-2  gap-4 text-sm">
                          <div className="flex items-center text-gray-600">
                            <Calendar className="h-4 w-4 mr-2 text-purple-500" />
                            {new Date(event.date).toLocaleDateString()} at{" "}
                            {event.time}
                          </div>
                          <div className="flex items-center text-gray-600">
                            <MapPin className="h-4 w-4 mr-2 text-purple-500" />
                            {event.location}
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Users className="h-4 w-4 mr-2 text-purple-500" />
                            {event.ticketsSold}/{event.capacity} sold
                          </div>
                          {/* <div className="flex items-center text-gray-600">
                            <DollarSign className="h-4 w-4 mr-2 text-purple-500" />
                            ₦{event.price} per ticket
                          </div> */}
                        </div>
                      </div>

                      {/* Pie Chart */}
                      <div className="flex flex-col items-center lg:items-end">
                        <div className="lg:hidden w-full max-w-[160px] mx-auto mt-4">
                          <div className="w-full aspect-square">
                            <ChartContainer
                              config={chartConfig}
                              className="mx-auto aspect-square max-h-[160px]"
                            >
                              <PieChart>
                                <ChartTooltip
                                  cursor={false}
                                  content={<ChartTooltipContent hideLabel />}
                                />
                                <Pie
                                  data={getTicketData(event)}
                                  dataKey="value"
                                  nameKey="name"
                                  innerRadius={25}
                                  outerRadius={50}
                                  strokeWidth={3}
                                >
                                  {getTicketData(event).map((entry, index) => (
                                    <Cell
                                      key={`cell-${index}`}
                                      fill={entry.color}
                                    />
                                  ))}
                                </Pie>
                              </PieChart>
                            </ChartContainer>
                          </div>
                          <div className="text-center mt-2">
                            <div className="text-lg font-semibold text-purple-800">
                              {Math.round(
                                (event.ticketsSold / event.capacity) * 100
                              )}
                              %
                            </div>
                            <div className="text-sm text-gray-500">Sold</div>
                          </div>
                        </div>

                        <div className="hidden lg:block flex-shrink-0">
                          <div className="w-32 h-32">
                            <ChartContainer
                              config={chartConfig}
                              className="mx-auto aspect-square max-h-[250px]"
                            >
                              <PieChart>
                                <ChartTooltip
                                  cursor={false}
                                  content={<ChartTooltipContent hideLabel />}
                                />
                                <Pie
                                  data={getTicketData(event)}
                                  dataKey="value"
                                  nameKey="name"
                                  innerRadius={30}
                                  strokeWidth={5}
                                >
                                  {getTicketData(event).map((entry, index) => (
                                    <Cell
                                      key={`cell-${index}`}
                                      fill={entry.color}
                                    />
                                  ))}
                                </Pie>
                              </PieChart>
                            </ChartContainer>
                          </div>
                          <div className="text-center mt-2">
                            <div className="text-lg font-semibold text-purple-800">
                              {Math.round(
                                (event.ticketsSold / event.capacity) * 100
                              )}
                              %
                            </div>
                            <div className="text-sm text-gray-500">Sold</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid gap-6">
              {/* Account Information */}
              <Card className="bg-white border border-purple-100 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-800">
                    <Settings className="h-5 w-5 text-purple-600" />
                    Account Information
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Manage your account details and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      {/* <p className="text-gray-600">{data.lastname}{" "}{data.firstname}</p> */}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Email
                      </label>
                      {/* <p className="text-gray-600">{data.email}</p> */}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Phone
                      </label>
                      {/* <p className="text-gray-600">(+234){" "}{data.phone}</p> */}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Organization
                      </label>
                      {/* <p className="text-gray-600">{data.organization}</p> */}
                    </div>
                  </div>
                  <div className="flex gap-4 pt-4">
                    <Button
                      variant="outline"
                      className="border-purple-300 text-purple-700 hover:bg-purple-50"
                      onClick={() => { navigate("/")}}
                    >
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit Information
                    </Button>
                    <Button
                      variant="outline"
                      className="border-purple-300 text-purple-700 hover:bg-purple-50"
                    >
                      Change Password
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Danger Zone */}
              <Card className="border-red-200 bg-red-50">
                <CardHeader>
                  <CardTitle className="text-red-600">Danger Zone</CardTitle>
                  <CardDescription className="text-red-500">
                    Irreversible actions that will affect your account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="destructive"
                    className="bg-red-600 hover:bg-red-700"
                    onClick={() => {deleteAccount(), navigate("/")}}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                  <p className="text-sm text-red-500 mt-2">
                    This action cannot be undone. All your events and data will
                    be permanently deleted.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Account;