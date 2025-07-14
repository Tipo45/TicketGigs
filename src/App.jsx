import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landingpage from "./Pages/Landingpage";
import Account from "./Pages/Account";
import Nopage from "./Pages/Nopage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SignInForm from "./Pages/Signinform";
import SignUpForm from "./Pages/SignUpForm";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/signin" element={<SignInForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/account/:activepage" element={<Account />} />
          <Route path="/account/:activepage/:id" element={<Account />} />
          <Route path="*" element={<Nopage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
