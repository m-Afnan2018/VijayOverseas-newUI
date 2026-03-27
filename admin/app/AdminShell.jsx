"use client";

import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import { authApi } from "@/lib/api";
import styles from "./AdminLayout.module.css";

export default function AdminShell({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    authApi.me().then((r) => setAdmin(r.data.data)).catch(() => {});
  }, []);

  return (
    <div className={styles.shell}>
      <Toaster
        position="top-right"
        toastOptions={{
          style: { fontFamily: "var(--font-body)", fontSize: "13px" },
          success: { duration: 3000 },
          error: { duration: 5000 },
        }}
      />
      <Sidebar
        admin={admin}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
      <div className={styles.main}>
        <Topbar onMenuClick={() => setMobileOpen((p) => !p)} />
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}
