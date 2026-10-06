import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Destinations from "./pages/Destinations";
import Bookings from "./pages/Bookings";
import Payment from "./pages/Payment";

import DestinationDetails from "./pages/DestinationDetails";
import Footer from "./pages/Footer";
import BookingSuccess from "./pages/BookingSuccess";
import AdminRoute from "./routes/AdminRoute";

import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import ManageDestinations from "./admin/ManageDestinations";
import ManageBookings from "./admin/ManageBookings";
import ManagePayments from "./admin/ManagePayments";

import Settings from "./pages/settings/Settings";
import Profile from "./pages/settings/Profile";
import MyBookings from "./pages/settings/MyBookings";
import ChangePassword from "./pages/settings/ChangePassword";

import Invoice from "./pages/Invoice";

//  Wrapper component
const AppContent = () => {
  const location = useLocation();

  //  Detect admin route
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {/*  Show only on non-admin pages */}
      {!isAdminRoute && <Navbar />}

      <Routes>
        {/* USER ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/destinations/:id" element={<DestinationDetails />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/payments" element={<Payment />} />
        <Route path="/success" element={<BookingSuccess />} />
        <Route path="/invoice" element={<Invoice />} />

        {/* ADMIN ROUTES */}

        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="destinations" element={<ManageDestinations />} />
            <Route path="bookings" element={<ManageBookings />} />
            <Route path="payments" element={<ManagePayments />} />
          </Route>
        </Route>

        <Route path="/settings" element={<Settings />}>
          <Route index element={<Profile />} />
          <Route path="profile" element={<Profile />} />
          <Route path="bookings" element={<MyBookings />} />
          <Route path="password" element={<ChangePassword />} />
        </Route>
      </Routes>

      {/*  Show only on non-admin pages */}
      {!isAdminRoute && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
