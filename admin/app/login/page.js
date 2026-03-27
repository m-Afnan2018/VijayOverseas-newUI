"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authApi } from "@/lib/api";
import { saveToken } from "@/lib/auth";
import styles from "./page.module.css";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [globalError, setGlobalError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Valid email required";
    if (!form.password) e.password = "Password is required";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: undefined }));
    setGlobalError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }

    setLoading(true);
    try {
      const res = await authApi.login({ email: form.email, password: form.password });
      saveToken(res.data.token);
      const redirect = searchParams.get("redirect") || "/";
      router.push(redirect);
    } catch (err) {
      setGlobalError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>

        <div className={styles.logo}>
          <div className={styles.logoIcon}>V</div>
          <div className={styles.logoText}>
            <span className={styles.logoTitle}>Vijay Overseas</span>
            <span className={styles.logoSubtitle}>Admin Panel</span>
          </div>
        </div>

        <h1 className={styles.heading}>Welcome back</h1>
        <p className={styles.subheading}>Sign in to manage your content</p>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {globalError && <div className={styles.globalError}>{globalError}</div>}

          <div className={styles.field}>
            <label className={styles.label}>Email Address</label>
            <input
              name="email"
              type="email"
              autoComplete="email"
              className={`${styles.input} ${errors.email ? styles.error : ""}`}
              value={form.email}
              onChange={handleChange}
              placeholder="admin@vijayoverseas.com"
            />
            {errors.email && <span className={styles.errorText}>{errors.email}</span>}
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Password</label>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              className={`${styles.input} ${errors.password ? styles.error : ""}`}
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
            {errors.password && <span className={styles.errorText}>{errors.password}</span>}
          </div>

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
