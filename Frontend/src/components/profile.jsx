import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import React from "react";
import Admin from "./admin.jsx";

const Profile = ({ user, onLogout }) => {
  const [userData, setUserData] = useState(user || null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserData(JSON.parse(storedUser)); // ✅ Ensure correct parsing
    }
  }, [user]); // ✅ Update when user logs in

  if (!userData || !userData.user) {
    return <p className="text-center mt-10">Loading user data...</p>;
  }
 
  return (
    <div className="flex flex-col md:flex-row gap-10 justify-between items-start">
      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4">
          <FaUserCircle className="text-blue-500" />{" "}
          {userData?.user?.username || "User Profile"}
        </h2>
        <div className="">
          {userData?.user?.avatar ? (
            <img
              src={userData.user.avatar}
              alt="User Avatar"
              className="w-24 h-24 mx-auto rounded-full hover:scale-125 shadow-lg"
            />
          ) : (
            <FaUserCircle className="text-gray-400 text-6xl mx-auto" />
          )}
          <h3 className="text-lg font-semibold mt-2 pb-4">
            Name: {userData?.user?.fullName || "Unknown User"}
          </h3>
          <p className="text-gray-600 pb-4">
            Email: {userData?.user?.email || "No Email"}
          </p>
          <p className="text-gray-600 pb-4">
            Registation Number: {userData?.user?.registationNo || ""}
          </p>
          <p className="text-gray-600 pb-4">
            Roll Number: {userData?.user?.rollNo || ""}
          </p>
          <p className="text-gray-600 pb-4">
            Total Working Day: {userData?.user?.totalWorkingDay || ""}
          </p>
          <p className="text-gray-600 pb-4">
            Total Present Day: {userData?.user?.totalPresentDay || ""}
          </p>
          <p className="text-gray-600 pb-4">
            Attendance Percentage: {Math.floor((userData?.user?.totalPresentDay*100)/userData?.user?.totalWorkingDay) || ""}%
          </p>
          <p className="text-gray-600 pb-4 uppercase">
            Role: {userData?.user?.role || "User"}
          </p>
          <button
            onClick={onLogout}
            className="mt-4 bg-red-500 text-white p-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
      {userData?.user.email == "akshayrishu4@gmail.com"? 
      <div className="">
        <Admin />
      </div>
      : ""}
    </div>
  );
};

export default Profile;
