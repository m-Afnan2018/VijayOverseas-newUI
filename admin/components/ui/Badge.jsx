import styles from "./Badge.module.css";

const VARIANT_MAP = {
  // Boolean-like
  true: "success",
  false: "neutral",
  active: "success",
  inactive: "neutral",
  published: "success",
  draft: "neutral",
  // Notice types
  info: "info",
  warning: "warning",
  urgent: "danger",
  // Product status
  "In Stock": "success",
  "Out of Stock": "danger",
  "Coming Soon": "warning",
};

export default function Badge({ label, variant }) {
  const resolvedVariant =
    variant || VARIANT_MAP[label] || VARIANT_MAP[String(label).toLowerCase()] || "neutral";

  return (
    <span className={`${styles.badge} ${styles[resolvedVariant] || styles.neutral}`}>
      {label}
    </span>
  );
}
