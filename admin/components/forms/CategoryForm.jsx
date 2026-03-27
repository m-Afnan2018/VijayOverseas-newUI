"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { categoriesApi } from "@/lib/api";
import { SingleImageUpload } from "@/components/ui/ImageUpload";
import styles from "./FormStyles.module.css";

const slugify = (s) =>
  s.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]/g, "").replace(/--+/g, "-");

const EMPTY = { name: "", description: "", isActive: true, order: 0 };

export default function CategoryForm({ id }) {
  const router = useRouter();
  const isEdit = !!id && id !== "new";
  const [form, setForm] = useState(EMPTY);
  const [imageFile, setImageFile] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);

  useEffect(() => {
    if (!isEdit) return;
    const load = async () => {
      try {
        const res = await categoriesApi.get(id);
        const d = res.data.data;
        setForm({ name: d.name || "", description: d.description || "", isActive: d.isActive ?? true, order: d.order || 0 });
        setExistingImage(d.image || null);
      } catch {
        toast.error("Failed to load category");
        router.push("/categories");
      } finally {
        setFetching(false);
      }
    };
    load();
  }, [id, isEdit, router]);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
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
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("description", form.description);
      fd.append("isActive", form.isActive);
      fd.append("order", form.order);
      if (imageFile) fd.append("image", imageFile);

      if (isEdit) {
        await categoriesApi.update(id, fd);
        toast.success("Category updated");
      } else {
        await categoriesApi.create(fd);
        toast.success("Category created");
      }
      router.push("/categories");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save category");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className={styles.formBody} style={{ color: "var(--text-muted)" }}>Loading...</div>;

  return (
    <form onSubmit={handleSubmit} noValidate encType="multipart/form-data">
      <div className={styles.formCard}>
        <div className={styles.formHeader}>
          <span className={styles.formTitle}>{isEdit ? "Edit Category" : "New Category"}</span>
        </div>

        <div className={styles.formBody}>
          <div className={styles.formRow}>
            {/* Name */}
            <div className={styles.field}>
              <label className={styles.label}>Name <span className={styles.required}>*</span></label>
              <input
                name="name"
                className={`${styles.input} ${errors.name ? styles.error : ""}`}
                value={form.name}
                onChange={handleChange}
                placeholder="Category name"
              />
              {errors.name && <span className={styles.errorText}>{errors.name}</span>}
              {form.name && (
                <span className={styles.slugPreview}>/{slugify(form.name)}</span>
              )}
            </div>

            {/* Order */}
            <div className={styles.field}>
              <label className={styles.label}>Display Order</label>
              <input name="order" type="number" min="0" className={styles.input} value={form.order} onChange={handleChange} />
              <span className={styles.helperText}>Lower numbers appear first</span>
            </div>
          </div>

          {/* Description */}
          <div className={styles.field}>
            <label className={styles.label}>Description</label>
            <textarea
              name="description"
              className={styles.textarea}
              value={form.description}
              onChange={handleChange}
              placeholder="Short category description..."
              rows={3}
            />
          </div>

          {/* Image */}
          <SingleImageUpload
            label="Category Image"
            value={imageFile || existingImage}
            onChange={(file) => { setImageFile(file); setExistingImage(null); }}
          />

          {/* Active */}
          <div className={styles.toggleRow}>
            <label className={styles.toggle}>
              <input name="isActive" type="checkbox" checked={form.isActive} onChange={handleChange} />
              <span className={styles.toggleSlider} />
            </label>
            <span className={styles.toggleLabel}>Active (visible in product filters)</span>
          </div>
        </div>

        <div className={styles.formFooter}>
          <Link href="/categories" className={styles.btnSecondary}>Cancel</Link>
          <button type="submit" className={styles.btnPrimary} disabled={loading}>
            {loading ? "Saving..." : isEdit ? "Update Category" : "Create Category"}
          </button>
        </div>
      </div>
    </form>
  );
}
