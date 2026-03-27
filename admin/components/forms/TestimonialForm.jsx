"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { testimonialsApi, productsApi } from "@/lib/api";
import { SingleImageUpload } from "@/components/ui/ImageUpload";
import styles from "./FormStyles.module.css";

const EMPTY = {
  name: "",
  designation: "",
  company: "",
  message: "",
  rating: 5,
  isActive: true,
  order: 0,
  product: "",
};

export default function TestimonialForm({ id }) {
  const router = useRouter();
  const isEdit = !!id && id !== "new";
  const [form, setForm] = useState(EMPTY);
  const [avatarFile, setAvatarFile] = useState(null);
  const [existingAvatar, setExistingAvatar] = useState(null);
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const prodRes = await productsApi.list({ limit: 100, isActive: true });
        setProducts(prodRes.data.data || []);

        if (isEdit) {
          const res = await testimonialsApi.get(id);
          const d = res.data.data;
          setForm({
            name: d.name || "",
            designation: d.designation || "",
            company: d.company || "",
            message: d.message || "",
            rating: d.rating || 5,
            isActive: d.isActive ?? true,
            order: d.order || 0,
            product: d.product?._id || d.product || "",
          });
          setExistingAvatar(d.avatar || null);
        }
      } catch {
        toast.error("Failed to load data");
        router.push("/testimonials");
      } finally {
        setFetching(false);
      }
    };
    init();
  }, [id, isEdit, router]);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.message.trim()) e.message = "Message is required";
    if (!form.rating || form.rating < 1 || form.rating > 5) e.rating = "Rating must be 1–5";
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
      Object.entries(form).forEach(([k, v]) => {
        if (v !== "" && v !== undefined) fd.append(k, v);
      });
      if (avatarFile) fd.append("image", avatarFile);

      if (isEdit) {
        await testimonialsApi.update(id, fd);
        toast.success("Testimonial updated");
      } else {
        await testimonialsApi.create(fd);
        toast.success("Testimonial created");
      }
      router.push("/testimonials");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save testimonial");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className={styles.formBody} style={{ color: "var(--text-muted)" }}>Loading...</div>;

  return (
    <form onSubmit={handleSubmit} noValidate encType="multipart/form-data">
      <div className={styles.formCard}>
        <div className={styles.formHeader}>
          <span className={styles.formTitle}>{isEdit ? "Edit Testimonial" : "New Testimonial"}</span>
        </div>

        <div className={styles.formBody}>
          {/* Product */}
          <div className={styles.field}>
            <label className={styles.label}>Product <span className={styles.helperText}>(which product is this review for?)</span></label>
            <select name="product" className={styles.select} value={form.product} onChange={handleChange}>
              <option value="">— General / Not product-specific —</option>
              {products.map((p) => (
                <option key={p._id} value={p._id}>{p.name}</option>
              ))}
            </select>
          </div>

          <div className={styles.formRow}>
            <div className={styles.field}>
              <label className={styles.label}>Name <span className={styles.required}>*</span></label>
              <input name="name" className={`${styles.input} ${errors.name ? styles.error : ""}`} value={form.name} onChange={handleChange} placeholder="Customer name" />
              {errors.name && <span className={styles.errorText}>{errors.name}</span>}
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Rating <span className={styles.required}>*</span></label>
              <select name="rating" className={`${styles.select} ${errors.rating ? styles.error : ""}`} value={form.rating} onChange={handleChange}>
                {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} Star{r !== 1 ? "s" : ""}</option>)}
              </select>
              {errors.rating && <span className={styles.errorText}>{errors.rating}</span>}
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.field}>
              <label className={styles.label}>Designation</label>
              <input name="designation" className={styles.input} value={form.designation} onChange={handleChange} placeholder="Procurement Director" />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Company</label>
              <input name="company" className={styles.input} value={form.company} onChange={handleChange} placeholder="Gulf Commodities FZE, Dubai" />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Message <span className={styles.required}>*</span></label>
            <textarea name="message" className={`${styles.textarea} ${errors.message ? styles.error : ""}`} value={form.message} onChange={handleChange} rows={5} placeholder="Customer's testimonial..." />
            {errors.message && <span className={styles.errorText}>{errors.message}</span>}
          </div>

          <SingleImageUpload
            label="Avatar / Photo"
            value={avatarFile || existingAvatar}
            onChange={(file) => { setAvatarFile(file); setExistingAvatar(null); }}
          />

          <div className={styles.formRow}>
            <div className={styles.field}>
              <label className={styles.label}>Display Order</label>
              <input name="order" type="number" min="0" className={styles.input} value={form.order} onChange={handleChange} />
            </div>
            <div className={styles.toggleRow}>
              <label className={styles.toggle}>
                <input name="isActive" type="checkbox" checked={form.isActive} onChange={handleChange} />
                <span className={styles.toggleSlider} />
              </label>
              <span className={styles.toggleLabel}>Active</span>
            </div>
          </div>
        </div>

        <div className={styles.formFooter}>
          <Link href="/testimonials" className={styles.btnSecondary}>Cancel</Link>
          <button type="submit" className={styles.btnPrimary} disabled={loading}>
            {loading ? "Saving..." : isEdit ? "Update Testimonial" : "Create Testimonial"}
          </button>
        </div>
      </div>
    </form>
  );
}
