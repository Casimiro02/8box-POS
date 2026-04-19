import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import WebLayout from "@/layouts/WebLayout";

import Dashboard from "@/pages/dashboard/Dashboard";
import Order from "@/pages/order/Order";
import History from "@/pages/history/History";
import ClockIn from "@/pages/clock-in/ClockIn";
import Report from "@/pages/report/Report";
import Setting from "@/pages/setting/Setting";
import EndOfDay from "@/pages/endofday/EndOfDay";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* PROTECTED PAGES */}
        <Route element={<WebLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/history" element={<History />} />
          <Route path="/clock-in" element={<ClockIn />} />
          <Route path="/report" element={<Report />} />
          <Route path="/end-of-day" element={<EndOfDay />} />
          <Route path="/setting" element={<Setting />} />
        </Route>

        {/* Optional fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;