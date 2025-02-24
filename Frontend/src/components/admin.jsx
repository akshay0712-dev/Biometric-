import React, { useEffect, useState } from "react";
import axios from "axios"; // Import Axios

const Admin = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [attendance, setAttendance] = useState({
    attendanceData: null,
  });
  const [message, setMessage] = useState("");

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAttendance({ ...attendance, attendanceData: file });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    // fetchUsers();

    if (!attendance.attendanceData) {
      alert("Please select a file before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("file", attendance.attendanceData);

    try {
      console.log(
        "Submitting file to:",
        "http://localhost:8000/api/v1/admin/upload"
      );
      const response = await axios.post(
        "http://localhost:8000/api/v1/admin/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage("File uploaded successfully!");

      console.log(response.data);
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed!");
      console.error("Error uploading xlxs file:", error);
    }
  };

  const fetchUsers = async () => {
    console.log("Fetching users...");

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/admin/users"
      );
      await setAllUsers(response.data.data);
      console.log("Fetched users:", response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  //  Get All Users
  useEffect(() => {
    // console.log("Fetching users called...");

    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col p-8 h-full justify-center ">
      <div className="bg-white shadow-lg mb-7 rounded-lg text-2xl p-4 ">
        <h1 className="mb-4 font-semibold">Admin Panel</h1>

        {/* File Upload Form */}
        <form onSubmit={handleSubmit} className="space-y-4 ">
          <input
            type="file"
            accept=".xlsx, .xls, .csv"
            onChange={handleFileChange}
            className="w-full p-2 border cursor-pointer bg-white shadow-lg rounded-lg"
          />

          {attendance.attendanceData && (
            <p className="mt-2 text-lg text-green-400">
              Selected File: {attendance.attendanceData.name}
            </p>
          )}

          <button
            type="submit"
            className="mt-4 p-2 bg-red-500 rounded text-white hover:bg-red-600"
          >
            Submit
          </button>
        </form>

        {message && <p className="mt-4 text-lg text-yellow-400">{message}</p>}
      </div>
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full bg-white border-collapse border border-gray-300 shadow-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border ">Name</th>
              <th className="py-2 px-4 border ">Email</th>
              <th className="py-2 px-4 border">Total Present Day</th>
              <th className="py-2 px-4 border">Total Working Day</th>
              <th className="py-2 px-4 border">Attendance Percentage</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.length > 0 ? (
              allUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border">{user.rollNo}</td>
                  <td className="py-2 px-4 border uppercase">{user.fullName}</td>
                  <td className="py-2 px-4 border lowercase">{user.email}</td>
                  <td className="py-2 px-4 border">{user.totalPresentDay}</td>
                  <td className="py-2 px-4 border">{user.totalWorkingDay}</td>
                  <td className="py-2 px-4 border">{Math.floor((user.totalPresentDay*100)/user.totalWorkingDay)}%</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="py-4 px-4 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
