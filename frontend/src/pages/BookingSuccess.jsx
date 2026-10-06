import { useLocation, useNavigate } from "react-router-dom";

const BookingSuccess = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const booking = state?.booking;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">

      <div className="text-6xl mb-6">
        🎉
      </div>

      <h2 className="text-3xl font-bold mb-2">
        Payment Successful!
      </h2>

      <p className="text-gray-500 mb-6">
        Your booking has been confirmed.
      </p>

      <button
        onClick={() => navigate("/")}
        className="bg-black text-white px-6 py-3 rounded-xl"
      >
        Go Home
      </button>

    </div>
  );
};

export default BookingSuccess;
