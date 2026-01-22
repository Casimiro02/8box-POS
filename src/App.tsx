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
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<WebLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/order" element={<Order />} />
          <Route path="/history" element={<History />} />
          <Route path="/clock-in" element={<ClockIn />} />
          <Route path="/report" element={<Report />} />
          <Route path="/end-of-day" element={<EndOfDay />} />
          <Route path="/setting" element={<Setting />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
