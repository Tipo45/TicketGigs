import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Landingpage from "./pages/Landingpage";
import EventDetails from "./components/EventDetails";
import CreateEvent from "./components/CreateEvent";
import CreateTickets from "./components/CreateTickets";
import Cart from "./components/Cart";
import SignUpForm from "./pages/SignUpForm";
import About from "./pages/About";
import Event from "./pages/Event";
import SignInForm from "./pages/SignInForm";
import Account from "./pages/Account";
import Nopage from "./pages/Nopage";
function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/events" element={<Event />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/create-event/:id/tickets" element={<CreateTickets />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/account/dashboard" element={<Account />} />
        <Route path="*" element={<Nopage />} />
      </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App;