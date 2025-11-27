// import { toast } from "sonner";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useHostData } from "../hooks/useHostData";
import { useTicket } from "../hooks/useTicketData";
import { useEvent } from "../hooks/UseEventData";
import { Button } from "../components/ui/button";
import { deleteAccount, logout } from "../backend/pocketbase";
import {
  Calendar,
  Edit3,
  LoaderCircle,
  MapPin,
  Plus,
  Search,
  Settings,
  Trash2,
  Users,
} from "lucide-react";
import { Badge } from "../components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../components/ui/chart";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Cell, Pie, PieChart } from "recharts";

const Account = () => {
  const [activeTab, setActiveTab] = useState("events");
  const navigate = useNavigate();
  const { data } = useHostData();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const { data: eventData, isLoading } = useEvent();

  const { data: tickets } = useTicket();

  function getEventStatus(eventDate) {
    const now = new Date();
    const eventDay = new Date(eventDate);

    if (eventDay >= now) {
      return "active";
    } else {
      return "non-active";
    }
  }

  const totalTicketsSold =
    tickets?.reduce((sum, t) => sum + (t.ticketSold || 0), 0) || 0;

  useEffect(() => {
    if (!eventData) return;

    if (!searchTerm) {
      setFilteredData(eventData);
      return;
    }

    const filtered = eventData.filter((event) =>
      event.eventTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm, eventData]);

  // Show success toast when component mounts (after successful login)
  // useState(() => {
  //   toast.success(" You have successfully logged in!", {
  //     description: `Welcome back, ${data.firstname} ${data.lastname}`,
  //   });
  // }, []);

  // Mock data for demonstration

  // const userInfo = {
  //
  //   totalEvents: userEvents.length,
  //   totalTicketsSold: userEvents.reduce(
  //     (sum, event) => sum + event.ticketsSold,
  //     0
  //   ),
  //   totalRevenue: userEvents.reduce(
  //     (sum, event) => sum + event.ticketsSold * event.price,
  //     0
  //   ),
  // };

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
    <div className="min-h-screen bg-linear-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <div className="bg-linear-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex-col items-center">
              <Link to="/">
                <div className="text-2xl font-bold bg-linear-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  TicketsGig
                </div>
              </Link>
              <p className="text-purple-100 text-sm tablet:text-lg">
                Welcome back, {data?.firstname || "loading..."}{" "}
                {data?.lastname || "loading..."}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/create-event">
                <Button className="bg-linear-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Event
                </Button>
              </Link>

              <Button
                variant="outline"
                className="bg-white/10 hover:bg-red-600 hover:text-white border-white/20 text-white"
                onClick={() => {
                  logout(), navigate("/signin");
                }}
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
                {eventData?.length || 0}
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
                {totalTicketsSold}
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
                ₦ 405,000,000
                {/*   {userInfo.totalRevenue.toFixed(2)} {ticketData?.t || "-"} */}
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
                {/* {userInfo.joinDate} */}
                {new Date(data?.created).toLocaleDateString() || "N/A"}
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
              className="data-[state=active]:bg-linear-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white bg-linear-to-r from-purple-100 to-blue-100"
            >
              My Events
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-linear-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white bg-linear-to-r from-purple-100 to-blue-100"
            >
              Account Settings
            </TabsTrigger>
          </TabsList>

          {/* Events Tab */}
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <LoaderCircle className="animate-spin text-4xl text-purple-600" />
              {/* <FaSpinner className="animate-spin text-4xl text-purple-600" /> */}
            </div>
          ) : (
            <TabsContent value="events" className="space-y-6">
              <div className="flex justify-center mb-4">
                <div className="relative w-full max-w-md">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-600 h-5 w-5 pointer-events-none" />

                  <input
                    type="text"
                    placeholder="Search your events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-2 border border-purple-200 rounded-full shadow-sm bg-gray-50 
          focus:bg-white focus:border-purple-400 focus:ring-2 focus:ring-purple-400 outline-none 
          transition-colors duration-200"
                  />
                </div>
              </div>

              <div className="grid gap-6">
                {!filteredData.length ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <p>
                      {searchTerm
                        ? "No events found for your search"
                        : "You have no events yet. Create your first event!"}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 space-y-6">
                    {filteredData.map((event) => {
                      // ✅ FILTER TICKETS FOR THIS EVENT
                      const eventTickets =
                        tickets?.filter(
                          (ticket) => ticket.event === event.id
                        ) || [];

                      return (
                        <div key={event.id}>
                          <div
                            className="p-0 h-auto text-left"
                            onClick={() => navigate(`/event/${event.id}`)}
                          >
                            <Card
                              className={`overflow-hidden bg-white border border-purple-100 shadow-sm w-full ${
                                getEventStatus(event.eventDate) === "non-active"
                                  ? "opacity-60"
                                  : "opacity-100"
                              }`}
                            >
                              <CardContent className="p-6">
                                <div className="flex flex-col lg:flex-row gap-6">
                                  {/* Event Image */}
                                  <div className="shrink-0">
                                    <img
                                      src={`http://127.0.0.1:8090/api/files/events/${event.id}/${event.image}`}
                                      alt="Event"
                                      className="w-full lg:w-48 h-48 object-cover rounded-lg"
                                    />
                                  </div>

                                  {/* Event Details */}
                                  <div className="flex-1 space-y-4">
                                    <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-4">
                                      <div>
                                        <h3 className="text-xl font-semibold text-gray-800 capitalize">
                                          {event.eventTitle}
                                        </h3>

                                        <Badge
                                          className={`mt-2 px-2 py-1 text-sm font-medium rounded-full
                                    ${
                                      getEventStatus(event.eventDate) ===
                                      "active"
                                        ? "bg-green-100 text-green-700"
                                        : getEventStatus(event.eventDate) ===
                                          "non-active"
                                        ? "bg-red-100 text-red-700"
                                        : "bg-gray-200 text-gray-700"
                                    }`}
                                        >
                                          {getEventStatus(event.eventDate) ===
                                          "active"
                                            ? "Active"
                                            : "Non Active"}
                                        </Badge>
                                      </div>

                                      <div className="flex gap-2">
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          className="border-purple-300 text-purple-700 hover:bg-purple-50 cursor-pointer"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(`/edit-event/${event.id}`);
                                          }}
                                        >
                                          <Edit3 className="h-4 w-4 mr-2" />
                                          Edit
                                        </Button>

                                        <Button
                                          variant="destructive"
                                          size="sm"
                                          className="cursor-pointer"
                                          onClick={(e) => {e.stopPropagation();}}
                                        >

                                          <Trash2 className="h-4 w-4 mr-2" />
                                          Delete
                                        </Button>
                                      </div>
                                    </div>

                                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 text-sm">
                                      <div className="flex items-center text-gray-600">
                                        <Calendar className="h-4 w-4 mr-2 text-purple-500" />
                                        {new Date(
                                          event.eventDate
                                        ).toLocaleDateString()}{" "}
                                        at {event.eventTime}
                                      </div>

                                      <div className="flex items-center text-gray-600">
                                        <MapPin className="h-4 w-4 mr-2 text-purple-500" />
                                        {event.venueName}, {event.fullAddress}
                                      </div>

                                      {/* ✅ Display Tickets */}
                                      {eventTickets.length > 0 ? (
                                        eventTickets.map((ticket) => (
                                          <div
                                            key={ticket.id}
                                            className="flex items-center text-gray-600"
                                          >
                                            <Users className="h-4 w-4 mr-2 text-purple-500" />
                                            {ticket.ticketSold}/
                                            {ticket.totalTicket || 0} sold
                                          </div>
                                        ))
                                      ) : (
                                        <div className="flex items-center text-gray-600">
                                          <Users className="h-4 w-4 mr-2 text-purple-500" />
                                          No tickets created
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  {/* Chart */}
                                  {/* ----------------------------------------------------------
   PIE CHART — SHOW TICKET SALES FOR THIS EVENT
----------------------------------------------------------- */}

                                  {eventTickets.length > 0 && (
                                    <div className="flex flex-col items-center lg:items-end">
                                      {/* Chart */}
                                      <div className="w-32 h-32">
                                        <ChartContainer
                                          config={chartConfig}
                                          className="mx-auto aspect-square max-h-[250px]"
                                        >
                                          <PieChart>
                                            <ChartTooltip
                                              cursor={false}
                                              content={
                                                <ChartTooltipContent
                                                  hideLabel
                                                />
                                              }
                                            />

                                            <Pie
                                              data={[
                                                {
                                                  name: "Sold",
                                                  value: eventTickets.reduce(
                                                    (sum, t) =>
                                                      sum + (t.ticketSold || 0),
                                                    0
                                                  ),
                                                  color: chartConfig.sold.color,
                                                },
                                                {
                                                  name: "Available",
                                                  value:
                                                    eventTickets.reduce(
                                                      (sum, t) =>
                                                        sum +
                                                        (t.totalTicket || 0),
                                                      0
                                                    ) -
                                                    eventTickets.reduce(
                                                      (sum, t) =>
                                                        sum +
                                                        (t.ticketSold || 0),
                                                      0
                                                    ),
                                                  color:
                                                    chartConfig.available.color,
                                                },
                                              ]}
                                              dataKey="value"
                                              nameKey="name"
                                              innerRadius={30}
                                              strokeWidth={5}
                                            >
                                              {/* Color Cells */}
                                              <Cell
                                                fill={chartConfig.sold.color}
                                              />
                                              <Cell
                                                fill={
                                                  chartConfig.available.color
                                                }
                                              />
                                            </Pie>
                                          </PieChart>
                                        </ChartContainer>
                                      </div>

                                      {/* Percentage Display */}
                                      <div className="text-center mt-2">
                                        <div className="text-lg font-semibold text-purple-800">
                                          {(() => {
                                            const totalSold =
                                              eventTickets.reduce(
                                                (sum, t) =>
                                                  sum + (t.ticketSold || 0),
                                                0
                                              );
                                            const totalQty =
                                              eventTickets.reduce(
                                                (sum, t) =>
                                                  sum + (t.totalTicket || 0),
                                                0
                                              );
                                            return totalQty > 0
                                              ? Math.round(
                                                  (totalSold / totalQty) * 100
                                                )
                                              : 0;
                                          })()}
                                          %
                                        </div>

                                        <div className="text-sm text-gray-500">
                                          Sold
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="flex justify-center mb-4">
                <Button
                  className="bg-linear-to-r from-purple-600 to-blue-600 text-white cursor-pointer"
                  onClick={() => navigate("/create-event")}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Event
                </Button>
              </div>
            </TabsContent>
          )}

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
                      <p className="text-gray-600">
                        {data?.lastname || "loading..."}{" "}
                        {data?.firstname || "loading..."}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <p className="text-gray-600">
                        {data?.email || "loading..."}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Phone
                      </label>
                      <p className="text-gray-600">
                        (+234) {data?.phone || "loading..."}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Organization
                      </label>
                      <p className="text-gray-600">
                        {data?.organization || "loading..."}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 pt-4">
                    <Button
                      variant="outline"
                      className="border-purple-300 text-purple-700 hover:bg-purple-50"
                      onClick={() => {
                        navigate("/account/edit");
                      }}
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
                    onClick={() => {
                      deleteAccount(), navigate("/");
                    }}
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
