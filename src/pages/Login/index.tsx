import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import styles from "./Login.module.css";
import PageContainer from "../../components/Layout/PageContainer";
import apiClient from "../../lib/axios";
import { useAuthStore } from "../../store/auth";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const loginResponse = await apiClient.post<{ token: string }>(
        "/auth/login",
        { email, password }
      );
      const { token } = loginResponse.data;

      localStorage.setItem("authToken", token);

      const meResponse = await apiClient.get("/auth/me");
      const user = meResponse.data;

      login(user, token);

      navigate("/dashboard");
    } catch (err) {
      localStorage.removeItem("authToken");
      if (err instanceof AxiosError) {
        const errorMessage =
          err.response?.data?.message ||
          "Login failed. Please check your credentials.";
        setError(errorMessage);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <PageContainer>
      <h1 className={styles.title}>Welcome Back</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        {error && <p style={{ color: "var(--error-color)" }}>{error}</p>}
        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            type="password"
            id="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>
        <button type="submit" className={styles.button}>
          Log In
        </button>
      </form>
      <p className={styles.registerPrompt}>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </PageContainer>
  );
};

export default LoginPage;
