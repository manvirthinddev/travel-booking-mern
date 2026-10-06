import { useState } from "react";
import api from "../../api/api";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    try {
      const { data } = await api.put("/users/change-password", {
        currentPassword,
        newPassword,
      });

      setMessage(data.message);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to update password"
      );
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Change Password</h2>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">

        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="w-full p-3 rounded-xl border"
          required
        />

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-3 rounded-xl border"
          required
        />

        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-3 rounded-xl border"
          required
        />

        <button
          type="submit"
          className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >
          Update Password
        </button>

      </form>

      {/* SUCCESS / ERROR MESSAGE */}
      {message && (
        <p className="text-green-600 mt-4">{message}</p>
      )}
      {error && (
        <p className="text-red-600 mt-4">{error}</p>
      )}

      <p className="text-sm text-gray-500 mt-6">
        Password updates are secured using encryption and JWT authentication.
      </p>
    </div>
  );
};

export default ChangePassword;
