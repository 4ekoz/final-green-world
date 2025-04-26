// src/Components/Profile/Profile.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Profile.module.css";
import { FaMinus, FaUser } from "react-icons/fa";

export default function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfileData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found");
        setLoading(false);
        return;
      }
      const response = await axios.get(
        "https://green-world-vert.vercel.app/auth/profile",
        {
          headers: {
            token: token,
          },
        }
      );
      setProfileData(response?.data?.data);
      if (response?.data?.data.role === "admin") {
        const usersResponse = await axios.get(
          "https://green-world-vert.vercel.app/admin/users",
          {
            headers: {
              token: token,
            },
          }
        );
        setAllUsers(usersResponse?.data?.data);
        console.log(usersResponse?.data?.data);
      }

      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProfileData();
  }, []);
const deleteUser = async (userId)=>{
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found");
      setLoading(false);
      return;
    }
    const response = await axios.delete(
      `https://green-world-vert.vercel.app/admin/users/${userId}`,
      {
        headers: {
          token: token,
        },
      }
    );
    if (response?.data?.success) {
      setAllUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== userId)
      );
    }
    setLoading(false);
    setError(null);
    console.log("User deleted successfully");
    // تحديث حالة المستخدمين بعد الحذف  
    console.log(response?.data?.data);
  } catch (err) {
    setError(err.response?.data?.message || err.message);
  }
}
  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!profileData)
    return <div className={styles.error}>No profile data found</div>;

  const safeUserData = {
    Username: profileData.userName,
    Email: profileData.email,
    Role: profileData.role,
    "Account Status": profileData.isVerified ? "Verified" : "Not Verified",
    "Member Since": new Date(profileData.createdAt).toLocaleDateString(),
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileCard}>
        <div className={styles.profileHeader}>
          <FaUser className={styles.profileIcon} />
          <h2>Profile Information</h2>
        </div>
        <div className={styles.profileTable}>
          <table>
            <tbody>
              {Object.entries(safeUserData).map(([key, value]) => (
                <tr key={key}>
                  <th>{key}</th>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {profileData?.role === "admin" && (
        <div className={styles.usersTable}>
          <h3>System Users</h3>
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Member Since</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((user) => (
                <tr key={user._id || user.email}>
                  <td>{user.userName}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.isVerified ? "Verified" : "Not Verified"}</td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td>
                    {" "}
                    <button
                      onClick={() => deleteUser(user._id)}
                      className={styles.statusIconError}
                      style={{color:"white"}}
                    >
                      
                      <FaMinus />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
