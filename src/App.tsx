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
import Discounts from "./pages/setting/Discounts";
import GiftCertificates from "./pages/setting/GiftCertificates";
import ItemSetup from "./pages/setting/ItemSetup";
import Receiving from "./pages/setting/Receiving";
import ReturnsAndRefunds from "./pages/setting/ReturnsAndRefunds";
import StockAdjustment from "./pages/setting/StockAdjustment";
import TransferRequest from "./pages/setting/TransferRequest";

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
          <Route path="/discounts" element={<Discounts />} />
          <Route path="/gift-certificates" element={<GiftCertificates />} />
          <Route path="/item-setup" element={<ItemSetup />} />
          <Route path="/receiving" element={<Receiving />} />
          <Route path="/returns" element={<ReturnsAndRefunds />} />
          <Route path="/stock-adjustment" element={<StockAdjustment />} />
          <Route path="/transfer-request" element={<TransferRequest />} />
        </Route>

        {/* Optional fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;