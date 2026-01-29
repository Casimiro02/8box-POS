import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import WebLayout from "./layouts/WebLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import Order from "./pages/order/Order";
import History from "./pages/history/History";
import ClockIn from "./pages/clock-in/ClockIn";
import Report from "./pages/report/Report";
import EndOfDay from "./pages/endofday/EndOfDay";
import Setting from "./pages/setting/Setting";

const isAuthenticated = () => {
  
  return typeof window !== 'undefined' && localStorage.getItem('isLoggedIn') === 'true';
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public route for login */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes within the WebLayout */}
        <Route
          path="/"
          element={isAuthenticated() ? <WebLayout /> : <Navigate to="/login" replace />}
        >
          <Route index element={<Dashboard />} /> {/* This matches "/" */}
          <Route path="order" element={<Order />} />
          <Route path="history" element={<History />} />
          <Route path="clock-in" element={<ClockIn />} />
          <Route path="report" element={<Report />} />
          <Route path="end-of-day" element={<EndOfDay />} />
          <Route path="setting" element={<Setting />} />
        </Route>

        {/* Optional: Catch-all for non-existent routes, redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;