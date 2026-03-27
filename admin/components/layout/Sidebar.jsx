"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  MdDashboard,
  MdCampaign,
  MdCategory,
  MdInventory2,
  MdArticle,
  MdStar,
  MdLogout,
} from "react-icons/md";
import { authApi } from "@/lib/api";
import { removeToken } from "@/lib/auth";
import styles from "./Sidebar.module.css";

const navItems = [
  {
    section: "Main",
    items: [
      { label: "Dashboard", href: "/", icon: <MdDashboard /> },
    ],
  },
  {
    section: "Content",
    items: [
      { label: "Notices", href: "/notices", icon: <MdCampaign /> },
      { label: "Categories", href: "/categories", icon: <MdCategory /> },
      { label: "Products", href: "/products", icon: <MdInventory2 /> },
      { label: "Blogs", href: "/blogs", icon: <MdArticle /> },
      { label: "Testimonials", href: "/testimonials", icon: <MdStar /> },
    ],
  },
];

export default function Sidebar({ admin, mobileOpen, onClose }) {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch (_) {
      // ignore error — still clear local state
    }
    removeToken();
    router.push("/login");
  };

  const initials = admin?.name
    ? admin.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "A";

  return (
    <>
      {mobileOpen && <div className={styles.overlay} onClick={onClose} />}
      <aside className={`${styles.sidebar} ${mobileOpen ? styles.open : ""}`}>
        {/* Logo */}
        <div className={styles.logo}>
          <div className={styles.logoIcon}>V</div>
          <div className={styles.logoText}>
            <span className={styles.logoTitle}>Vijay Overseas</span>
            <span className={styles.logoSubtitle}>Admin Panel</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className={styles.nav}>
          {navItems.map((section) => (
            <div key={section.section} className={styles.navSection}>
              <div className={styles.navSectionLabel}>{section.section}</div>
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${styles.navItem} ${isActive(item.href) ? styles.active : ""}`}
                  onClick={onClose}
                >
                  <span className={styles.navIcon}>{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className={styles.sidebarFooter}>
          <div className={styles.adminInfo}>
            <div className={styles.adminAvatar}>{initials}</div>
            <div className={styles.adminDetails}>
              <div className={styles.adminName}>{admin?.name || "Admin"}</div>
              <div className={styles.adminRole}>{admin?.role || "admin"}</div>
            </div>
            <button
              className={styles.logoutBtn}
              onClick={handleLogout}
              title="Logout"
            >
              <MdLogout />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
