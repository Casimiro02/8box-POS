// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import WebLayout from "./layouts/WebLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import Order from "./pages/order/Order";
import History from "./pages/history/History";
import ClockIn from "./pages/clock-in/ClockIn";
import Report from "./pages/report/Report";
import EndOfDay from "./pages/endofday/EndOfDay";
import Setting from "./pages/setting/Setting";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Make login the root route */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        
        {/*Protected routes*/}
        <Route path="/app" element={<WebLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/app/order" element={<Order />} />
          <Route path="/app/history" element={<History />} />
          <Route path="/app/clock-in" element={<ClockIn />} />
          <Route path="/app/report" element={<Report />} />
          <Route path="/app/end-of-day" element={<EndOfDay />} />
          <Route path="/app/setting" element={<Setting />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;