import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-extrabold text-white mb-4">
            Travel<span className="text-blue-500">Book</span>
          </h2>
          <p className="text-sm leading-relaxed">
            TravelBook is a modern travel & booking platform that helps users
            discover destinations, book hotels, and plan journeys with ease.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/destinations" className="hover:text-white">Destinations</Link></li>
            <li><Link to="/bookings" className="hover:text-white">Bookings</Link></li>
            <li><Link to="/payments" className="hover:text-white">Payments</Link></li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Support
          </h3>
          <ul className="space-y-2 text-sm">
            <li>Help Center</li>
            <li>Cancellation Policy</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Contact Us
          </h3>
          <ul className="space-y-2 text-sm">
            <li>Email: support@travelbook.com</li>
            <li>Phone: +91 98765 43210</li>
            <li>Location: India</li>
          </ul>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm">
        © {new Date().getFullYear()} TravelBook. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
