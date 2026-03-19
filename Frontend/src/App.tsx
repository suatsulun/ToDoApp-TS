import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { GuestRoute } from "./components/auth/GuestRoute";
import DashboardPage from "./pages/DashboardPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"

const App = (): React.JSX.Element => {
  return(
    <BrowserRouter>
    <Toaster position="top-center" />
    <Routes>
      <Route path="/login"
      element={
        <GuestRoute>
          <LoginPage />
        </GuestRoute>
      } />
      <Route
      path="/register"
      element={
        <GuestRoute>
          <RegisterPage />
        </GuestRoute>
      } />

      <Route path="/"
      element={
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      } 
      />


    </Routes>
    </BrowserRouter>
  );
};

export default App;