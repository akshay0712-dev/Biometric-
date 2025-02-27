import React, { useEffect, useState } from "react";
import axios from "axios";

const SearchUser = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [formData, setFormData] = useState({
    department: "All Departments",
    rollNo: "",
  });

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      console.log("Fetching users...");

      try {
        const response = await axios.post(
          "http://localhost:8000/api/v1/admin/users"
        );
        setAllUsers(response.data.data);
        setFilteredUsers(response.data.data); // Initialize filtered users with all users
        console.log("Fetched users:", response.data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Filter users when formData changes
  useEffect(() => {
    let filteredList = [...allUsers];

    if (formData.rollNo) {
      filteredList = allUsers.filter(
        (user) => user.rollNo.toString().startsWith(formData.rollNo.trim())
      );
    } else if (formData.department !== "All Departments") {
      // Filter by department (assuming roll numbers are department-based)
      const departmentCodes = {
        "Computer Science Engineering": 245,
        "CSE in Artificial Intelligence and Machine Learning": 246,
        "Civil Engineering": 241,
        "Mechanical Engineering": 242,
        "Electrical Engineering": 243,
        "Electronics and Communication Engineering": 244,
      };

      const filterCode = departmentCodes[formData.department];
      filteredList = allUsers.filter(
        (user) => Math.floor(user.rollNo / 100) === filterCode
      );
    }

    filteredList.sort((a, b) => a.rollNo - b.rollNo);
    
    setFilteredUsers(filteredList);
  }, [formData, allUsers]);

  // StudentTable Component
  const StudentTable = ({ users }) => (
    <div className="my-8">
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full bg-white border-collapse border border-gray-300 shadow-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 hidden md:table-cell border">Email</th>
              <th className="py-2 px-4 border">Total Present Day</th>
              <th className="py-2 px-4 border">Total Working Day</th>
              <th className="py-2 px-4 border">Attendance Percentage</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border">{user.rollNo}</td>
                  <td className="py-2 px-4 border uppercase">{user.fullName}</td>
                  <td className="py-2 px-4 border hidden md:table-cell lowercase">
                    {user.email}
                  </td>
                  <td className="py-2 px-4 border">{user.totalPresentDay}</td>
                  <td className="py-2 px-4 border">{user.totalWorkingDay}</td>
                  <td className="py-2 px-4 border">
                    {user.totalWorkingDay > 0
                      ? `${Math.floor(
                          (user.totalPresentDay * 100) / user.totalWorkingDay
                        )}%`
                      : "N/A"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-4 px-4 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <>
      <div>
        <input
          type="number"
          name="rollNo"
          placeholder="Roll Number"
          value={formData.rollNo}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="All Departments">All Departments</option>
          <option value="Computer Science Engineering">
            Computer Science Engineering
          </option>
          <option value="CSE in Artificial Intelligence and Machine Learning">
            CSE in Artificial Intelligence and Machine Learning
          </option>
          <option value="Civil Engineering">Civil Engineering</option>
          <option value="Mechanical Engineering">Mechanical Engineering</option>
          <option value="Electrical Engineering">Electrical Engineering</option>
          <option value="Electronics and Communication Engineering">
            Electronics and Communication Engineering
          </option>
        </select>
      </div>

      {/* Display Filtered Users */}
      <StudentTable users={filteredUsers} />
    </>
  );
};

export default SearchUser;
