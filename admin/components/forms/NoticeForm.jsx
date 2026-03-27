"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { noticesApi } from "@/lib/api";
import styles from "./FormStyles.module.css";

const EMPTY = {
  title: "",
  message: "",
  type: "info",
  isActive: true,
  startDate: "",
  endDate: "",
  autoHideMs: 0,
};

export default function NoticeForm({ id }) {
  const router = useRouter();
  const isEdit = !!id && id !== "new";
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);

  useEffect(() => {
    if (!isEdit) return;
    const load = async () => {
      try {
        const res = await noticesApi.get(id);
        const d = res.data.data;
        setForm({
          title: d.title || "",
          message: d.message || "",
          type: d.type || "info",
          isActive: d.isActive ?? true,
          startDate: d.startDate ? d.startDate.slice(0, 10) : "",
          endDate: d.endDate ? d.endDate.slice(0, 10) : "",
          autoHideMs: d.autoHideMs || 0,
        });
      } catch {
        toast.error("Failed to load notice");
        router.push("/notices");
      } finally {
        setFetching(false);
      }
    };
    load();
  }, [id, isEdit, router]);

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
    setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }

    setLoading(true);
    try {
      const payload = {
        ...form,
        startDate: form.startDate || undefined,
        endDate: form.endDate || undefined,
      };
      if (isEdit) {
        await noticesApi.update(id, payload);
        toast.success("Notice updated");
      } else {
        await noticesApi.create(payload);
        toast.success("Notice created");
      }
      router.push("/notices");
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to save notice";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className={styles.formBody} style={{ color: "var(--text-muted)" }}>Loading...</div>;

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className={styles.formCard}>
        <div className={styles.formHeader}>
          <span className={styles.formTitle}>{isEdit ? "Edit Notice" : "New Notice"}</span>
        </div>

        <div className={styles.formBody}>
          {/* Title */}
          <div className={styles.field}>
            <label className={styles.label}>Title <span className={styles.required}>*</span></label>
            <input
              name="title"
              className={`${styles.input} ${errors.title ? styles.error : ""}`}
              value={form.title}
              onChange={handleChange}
              placeholder="Notice headline"
            />
            {errors.title && <span className={styles.errorText}>{errors.title}</span>}
          </div>

          {/* Message */}
          <div className={styles.field}>
            <label className={styles.label}>Message <span className={styles.required}>*</span></label>
            <textarea
              name="message"
              className={`${styles.textarea} ${errors.message ? styles.error : ""}`}
              value={form.message}
              onChange={handleChange}
              placeholder="Full notice text..."
              rows={4}
            />
            {errors.message && <span className={styles.errorText}>{errors.message}</span>}
          </div>

          <div className={styles.formRow}>
            {/* Type */}
            <div className={styles.field}>
              <label className={styles.label}>Type</label>
              <select name="type" className={styles.select} value={form.type} onChange={handleChange}>
                <option value="info">Info</option>
                <option value="warning">Warning</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            {/* Auto-hide */}
            <div className={styles.field}>
              <label className={styles.label}>Auto-hide (ms)</label>
              <input
                name="autoHideMs"
                type="number"
                min="0"
                className={styles.input}
                value={form.autoHideMs}
                onChange={handleChange}
                placeholder="0 = no auto-hide"
              />
              <span className={styles.helperText}>0 = no auto-hide; 5000 = hide after 5s</span>
            </div>

            {/* Start Date */}
            <div className={styles.field}>
              <label className={styles.label}>Start Date</label>
              <input name="startDate" type="date" className={styles.input} value={form.startDate} onChange={handleChange} />
            </div>

            {/* End Date */}
            <div className={styles.field}>
              <label className={styles.label}>End Date</label>
              <input name="endDate" type="date" className={styles.input} value={form.endDate} onChange={handleChange} />
            </div>
          </div>

          {/* Is Active */}
          <div className={styles.toggleRow}>
            <label className={styles.toggle}>
              <input name="isActive" type="checkbox" checked={form.isActive} onChange={handleChange} />
              <span className={styles.toggleSlider} />
            </label>
            <span className={styles.toggleLabel}>Active (show this notice on the website)</span>
          </div>
        </div>

        <div className={styles.formFooter}>
          <Link href="/notices" className={styles.btnSecondary}>Cancel</Link>
          <button type="submit" className={styles.btnPrimary} disabled={loading}>
            {loading ? "Saving..." : isEdit ? "Update Notice" : "Create Notice"}
          </button>
        </div>
      </div>
    </form>
  );
}
