import React, { useState, useEffect } from "react";
import apiClient from "../../lib/axios";
import styles from "./Admin.module.css";
import Spinner from "../../components/Spinner";

interface UserData {
  id: string;
  email: string;
  role: string;
  createdAt: string;
  subscription: { stripePriceId: string } | null;
}

const AdminPage: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiClient.get("/admin/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (isLoading) {
    return (
      <div
        className={styles.adminContainer}
        style={{ display: "flex", justifyContent: "center", padding: "2rem" }}
      >
        <Spinner />
      </div>
    );
  }

  return (
    <div className={styles.adminContainer}>
      <h1 className={styles.title}>Admin Dashboard: Users</h1>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Email</th>
              <th>Role</th>
              <th>Subscription</th>
              <th>Registered On</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.email}</td>
                <td
                  className={
                    user.role === "ADMIN" ? styles.roleAdmin : styles.roleUser
                  }
                >
                  {user.role}
                </td>
                <td
                  className={user.subscription ? styles.subscriptionActive : ""}
                >
                  {user.subscription ? "Active" : "None"}
                </td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
