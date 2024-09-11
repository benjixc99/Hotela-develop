import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/App.css";
import Applayout from "./general/Applayout";
import NotFound from "./pages/404/NotFound";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import ConfirmAccount from "./pages/auth/ConfirmAccount";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Profile from "./pages/general/Profile";
import Dashboard from "./pages/general/Dashboard";
import RoomDetails from "./pages/rooms/RoomDetails";
import SearchResults from "./pages/hotel/SearchResults";
import HotelDetails from "./pages/hotel/HotelDetails";
import ResetPasswordOTP from "./pages/auth/ResetPasswordOTP";
import BookingHistory from "./pages/rooms/BookingHistory";
import Favourite from "./pages/hotel/Favourite";
import Map from "./pages/hotel/Map";
import SuccessPayment from "./pages/paymentStatus/success";
import CancelledPayment from "./pages/paymentStatus/cancelled";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Applayout />,
      children: [
        { path: "/", element: <Dashboard /> },
        {
          path: "/HotelDetails",
          element: <HotelDetails />,
        },
        {
          path: "/roomDetails",
          element: <RoomDetails />,
        },
        {
          path: "searchResult",
          element: <SearchResults />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <SignUp />,
        },
        {
          path: "/forgotPassword",
          element: <ForgotPassword />,
        },
        {
          path: "/resetPassword/:id",
          element: <ResetPassword />,
        },
        {
          path: "/ResetPasswordOTP",
          element: <ResetPasswordOTP />,
        },
        {
          path: "/BookingHistory",
          element: <BookingHistory />,
        },
        {
          path: "/ConfirmAccount",
          element: <ConfirmAccount />,
        },
        {
          path: "/Favourite",
          element: <Favourite />,
        },
        {
          path: "/Map",
          element: <Map />,
        },
        {
          path: "/booking-success",
          element: <SuccessPayment />,
        },
        {
          path: "/booking-cancelled",
          element: <CancelledPayment />,
        },

        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
