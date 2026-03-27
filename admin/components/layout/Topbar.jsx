"use client";

import { usePathname } from "next/navigation";
import { MdMenu, MdOpenInNew } from "react-icons/md";
import styles from "./Topbar.module.css";

const PAGE_TITLES = {
  "/": "Dashboard",
  "/notices": "Notices",
  "/categories": "Categories",
  "/products": "Products",
  "/blogs": "Blogs",
  "/testimonials": "Testimonials",
};

function getPageInfo(pathname) {
  // Exact match first
  if (PAGE_TITLES[pathname]) {
    return { title: PAGE_TITLES[pathname], parent: null };
  }
  // Match base path
  const base = "/" + pathname.split("/")[1];
  if (PAGE_TITLES[base]) {
    const isNew = pathname.endsWith("/new");
    const isEdit = !isNew && pathname.split("/").length > 2;
    return {
      title: PAGE_TITLES[base],
      parent: isNew ? "New" : isEdit ? "Edit" : null,
    };
  }
  return { title: "Admin", parent: null };
}

export default function Topbar({ onMenuClick }) {
  const pathname = usePathname();
  const { title, parent } = getPageInfo(pathname);

  const frontendUrl =
    process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";

  return (
    <header className={styles.topbar}>
      <div className={styles.left}>
        <button
          className={styles.menuBtn}
          onClick={onMenuClick}
          aria-label="Toggle sidebar"
        >
          <MdMenu />
        </button>

        <div>
          <div className={styles.pageTitle}>{title}</div>
          {parent && (
            <div className={styles.breadcrumb}>
              <span>{title}</span>
              <span>/</span>
              <span>{parent}</span>
            </div>
          )}
        </div>
      </div>

      <div className={styles.right}>
        <a
          href={frontendUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.viewSiteLink}
        >
          <MdOpenInNew size={14} />
          View Site
        </a>
      </div>
    </header>
  );
}
