"use client";

import { useEffect } from "react";
import { MdWarning } from "react-icons/md";
import styles from "./Modal.module.css";

export default function ConfirmModal({
  open,
  title = "Confirm Delete",
  description = "This action cannot be undone.",
  confirmLabel = "Delete",
  onConfirm,
  onCancel,
  loading = false,
  variant = "danger",
}) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className={styles.overlay}
      onClick={(e) => {
        if (e.target === e.currentTarget && !loading) onCancel();
      }}
    >
      <div className={styles.modal}>
        <div className={styles.header}>
          <div className={`${styles.iconWrap} ${styles[variant]}`}>
            <MdWarning />
          </div>
          <div className={styles.headerText}>
            <div className={styles.title}>{title}</div>
          </div>
        </div>
        <div className={styles.body}>
          <p className={styles.description}>{description}</p>
        </div>
        <div className={styles.footer}>
          <button
            className={`${styles.btn} ${styles.btnCancel}`}
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className={`${styles.btn} ${styles.btnConfirm}`}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Deleting..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
