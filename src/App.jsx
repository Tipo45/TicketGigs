import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Landingpage from "./Pages/Landingpage";
import About from "./Pages/About";
import Events from "./Pages/Event";
import SignUpForm from "./Pages/SignUpForm";
import Account from "./Pages/Account";
import CreateEvent from "./Components/CreateEvent";
import EventDetails from "./Components/EventDetails";

import Cart from "./Components/Cart";

import Nopage from "./Pages/Nopage";
import Tickets from "./Components/Tickets";
import SignInForm from "./Pages/SignInForm";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetails />} />

          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/create-event/tickets/:id" element={<Tickets />} />

          <Route path="/cart" element={<Cart />} />

          <Route path="/signin" element={<SignInForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/account/:activepage" element={<Account />} />
          
          <Route path="/account/dashboard" element={<Account />} />
          <Route path="/account/:activepage/:id" element={<Account />} />
          <Route path="*" element={<Nopage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
