"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { dashboardApi } from "@/lib/api";
import AdminShell from "./AdminShell";
import Badge from "@/components/ui/Badge";
import styles from "./page.module.css";
import {
  MdInventory2,
  MdArticle,
  MdCategory,
  MdStar,
  MdCampaign,
  MdAdd,
} from "react-icons/md";

const STAT_CARDS = [
  { key: "products", label: "Products", icon: <MdInventory2 />, color: "#e0f7fa", iconColor: "#00b8c8", href: "/products" },
  { key: "blogs", label: "Blog Posts", icon: <MdArticle />, color: "#f3e8ff", iconColor: "#9333ea", href: "/blogs" },
  { key: "categories", label: "Categories", icon: <MdCategory />, color: "#fef3c7", iconColor: "#f59e0b", href: "/categories" },
  { key: "testimonials", label: "Testimonials", icon: <MdStar />, color: "#dcfce7", iconColor: "#22c55e", href: "/testimonials" },
  { key: "activeNotices", label: "Active Notices", icon: <MdCampaign />, color: "#fee2e2", iconColor: "#ef4444", href: "/notices" },
];

const QUICK_ADDS = [
  { label: "New Product", href: "/products/new", icon: <MdInventory2 /> },
  { label: "New Blog Post", href: "/blogs/new", icon: <MdArticle /> },
  { label: "New Category", href: "/categories/new", icon: <MdCategory /> },
  { label: "New Notice", href: "/notices/new", icon: <MdCampaign /> },
  { label: "New Testimonial", href: "/testimonials/new", icon: <MdStar /> },
];

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [recent, setRecent] = useState({ recentProducts: [], recentBlogs: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [s, r] = await Promise.all([dashboardApi.stats(), dashboardApi.recent()]);
        setStats(s);
        setRecent(r);
      } catch (_) {
        // fail silently — server may not be running
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <AdminShell>
      {/* Stats */}
      <div className={styles.statsGrid}>
        {STAT_CARDS.map((card) => (
          <div key={card.key} className={styles.statCard}>
            <div className={styles.statHeader}>
              <span className={styles.statLabel}>{card.label}</span>
              <div className={styles.statIcon} style={{ background: card.color, color: card.iconColor }}>
                {card.icon}
              </div>
            </div>
            <div className={styles.statValue}>
              {loading ? "—" : (stats?.[card.key] ?? 0)}
            </div>
            <Link href={card.href} className={styles.statLink}>
              View all →
            </Link>
          </div>
        ))}
      </div>

      {/* Quick Add */}
      <div className={styles.quickActions}>
        {QUICK_ADDS.map((q) => (
          <Link key={q.href} href={q.href} className={styles.quickBtn}>
            <MdAdd size={16} />
            {q.label}
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      <div className={styles.gridTwo}>
        {/* Recent Products */}
        <div className={styles.tableCard}>
          <div className={styles.tableHeader}>
            Recent Products
            <Link href="/products" className={styles.tableLink}>View all</Link>
          </div>
          {loading ? (
            <div className={styles.loading}>Loading...</div>
          ) : (
            <table className={styles.simpleTable}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recent.recentProducts.length === 0 ? (
                  <tr><td colSpan={3} style={{ textAlign: "center", color: "var(--text-muted)" }}>No products yet</td></tr>
                ) : (
                  recent.recentProducts.map((p) => (
                    <tr key={p._id}>
                      <td className={styles.tdName}>{p.name}</td>
                      <td><Badge label={p.status} /></td>
                      <td>{new Date(p.createdAt).toLocaleDateString("en-IN")}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Recent Blogs */}
        <div className={styles.tableCard}>
          <div className={styles.tableHeader}>
            Recent Blog Posts
            <Link href="/blogs" className={styles.tableLink}>View all</Link>
          </div>
          {loading ? (
            <div className={styles.loading}>Loading...</div>
          ) : (
            <table className={styles.simpleTable}>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recent.recentBlogs.length === 0 ? (
                  <tr><td colSpan={3} style={{ textAlign: "center", color: "var(--text-muted)" }}>No blogs yet</td></tr>
                ) : (
                  recent.recentBlogs.map((b) => (
                    <tr key={b._id}>
                      <td className={styles.tdName}>{b.title}</td>
                      <td><Badge label={b.isPublished ? "published" : "draft"} /></td>
                      <td>{new Date(b.createdAt).toLocaleDateString("en-IN")}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AdminShell>
  );
}
