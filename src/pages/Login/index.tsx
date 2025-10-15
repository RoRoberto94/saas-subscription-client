import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import styles from "./Login.module.css";
import PageContainer from "../../components/Layout/PageContainer";
import apiClient from "../../lib/axios";
import { useAuthStore } from "../../store/auth";
import LoadingButton from "../../components/LoadingButton";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const loginResponse = await apiClient.post<{ token: string }>(
        "/auth/login",
        { email, password }
      );
      const { token } = loginResponse.data;

      const meResponse = await apiClient.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const user = meResponse.data;

      login(user, token);

      navigate("/dashboard");
    } catch (err) {
      if (err instanceof AxiosError) {
        const errorMessage =
          err.response?.data?.message ||
          "Login failed. Please check your credentials.";
        setError(errorMessage);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageContainer>
      <h1 className={styles.title}>Welcome Back</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <fieldset disabled={isSubmitting}>
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
        </fieldset>
        <LoadingButton type="submit" isLoading={isSubmitting}>
          Log In
        </LoadingButton>
      </form>
      <p className={styles.registerPrompt}>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </PageContainer>
  );
};

export default LoginPage;
