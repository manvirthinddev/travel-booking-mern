import { useEffect, useState } from "react";
import api from "../../api/api";

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await api.get("/users/me");
      setProfile(data);
    } catch (error) {
      console.log("Failed to load profile");
    }
  };

  if (!profile) {
    return <p>Loading profile...</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Profile</h2>

      <div className="space-y-6 max-w-md">

        {/* EMAIL */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Email Address
          </label>
          <input
            value={profile.email}
            readOnly
            className="w-full p-3 rounded-xl border bg-gray-100"
          />
        </div>

        {/* USER ID */}
        <div>
          <label className="block text-sm font-medium mb-1">
            User ID
          </label>
          <input
            value={profile.id}
            readOnly
            className="w-full p-3 rounded-xl border bg-gray-100"
          />
        </div>

      </div>

      <p className="text-sm text-gray-500 mt-6">
        Profile details are fetched securely from the server.
      </p>
    </div>
  );
};

export default Profile;
