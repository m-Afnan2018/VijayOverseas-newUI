"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { productsApi, categoriesApi } from "@/lib/api";
import { MultiImageUpload } from "@/components/ui/ImageUpload";
import RichTextEditor from "@/components/ui/RichTextEditor";
import styles from "./FormStyles.module.css";

const slugify = (s) =>
  s.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]/g, "").replace(/--+/g, "-");

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Jammu and Kashmir", "Ladakh", "Delhi",
];

const EMPTY = {
  name: "",
  category: "",
  description: "",
  richDescription: "",
  price: "",
  unit: "kg",
  origin: "India",
  region: "",
  state: "",
  giYear: "",
  sku: "",
  rating: 5,
  status: "In Stock",
  isActive: true,
  isFeatured: false,
  productType: "Agricultural Product",
  tags: "",
  seoTitle: "",
  seoDescription: "",
};

export default function ProductForm({ id }) {
  const router = useRouter();
  const isEdit = !!id && id !== "new";
  const [form, setForm] = useState(EMPTY);
  const [images, setImages] = useState([]); // File[] or string URLs
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const catRes = await categoriesApi.list({ limit: 100, isActive: true });
        setCategories(catRes.data.data || []);
        if (isEdit) {
          const res = await productsApi.get(id);
          const d = res.data.data;
          setForm({
            name: d.name || "",
            category: d.category?._id || d.category || "",
            description: d.description || "",
            richDescription: d.richDescription || "",
            price: d.price || "",
            unit: d.unit || "kg",
            origin: d.origin || "India",
            region: d.region || "",
            state: d.state || "",
            giYear: d.giYear || "",
            sku: d.sku || "",
            rating: d.rating || 5,
            status: d.status || "In Stock",
            isActive: d.isActive ?? true,
            isFeatured: d.isFeatured ?? false,
            productType: d.productType || "Agricultural Product",
            tags: Array.isArray(d.tags) ? d.tags.join(", ") : d.tags || "",
            seoTitle: d.seoTitle || "",
            seoDescription: d.seoDescription || "",
          });
          setImages(d.images || []);
        }
      } catch {
        toast.error("Failed to load data");
        router.push("/products");
      } finally {
        setFetching(false);
      }
    };
    init();
  }, [id, isEdit, router]);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.category) e.category = "Category is required";
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

      // Separate new files from existing URLs
      const newFiles = images.filter((img) => img instanceof File);
      const existingUrls = images.filter((img) => typeof img === "string");

      newFiles.forEach((f) => fd.append("images", f));
      if (existingUrls.length > 0 && isEdit) {
        // Pass existing URLs so they aren't wiped
        existingUrls.forEach((u) => fd.append("existingImages", u));
      }

      if (isEdit) {
        await productsApi.update(id, fd);
        toast.success("Product updated");
      } else {
        await productsApi.create(fd);
        toast.success("Product created");
      }
      router.push("/products");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className={styles.formBody} style={{ color: "var(--text-muted)" }}>Loading...</div>;

  return (
    <form onSubmit={handleSubmit} noValidate encType="multipart/form-data">
      <div className={styles.formCard}>
        <div className={styles.formHeader}>
          <span className={styles.formTitle}>{isEdit ? "Edit Product" : "New Product"}</span>
        </div>

        <div className={styles.formBody}>
          {/* Name + Category */}
          <div className={styles.formRow}>
            <div className={styles.field}>
              <label className={styles.label}>Product Name <span className={styles.required}>*</span></label>
              <input name="name" className={`${styles.input} ${errors.name ? styles.error : ""}`} value={form.name} onChange={handleChange} placeholder="e.g. Darjeeling Tea — 250g Pack" />
              {errors.name && <span className={styles.errorText}>{errors.name}</span>}
              {form.name && <span className={styles.slugPreview}>/{slugify(form.name)}</span>}
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Category <span className={styles.required}>*</span></label>
              <select name="category" className={`${styles.select} ${errors.category ? styles.error : ""}`} value={form.category} onChange={handleChange}>
                <option value="">Select category...</option>
                {categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
              </select>
              {errors.category && <span className={styles.errorText}>{errors.category}</span>}
            </div>
          </div>

          {/* Short Description */}
          <div className={styles.field}>
            <label className={styles.label}>Short Description</label>
            <textarea name="description" className={styles.textarea} value={form.description} onChange={handleChange} rows={3} placeholder="Brief product summary (max 1000 chars)" />
          </div>

          {/* Rich Description */}
          <div className={styles.field}>
            <label className={styles.label}>Full Description (Rich Text)</label>
            <RichTextEditor value={form.richDescription} onChange={(html) => setForm((p) => ({ ...p, richDescription: html }))} placeholder="Detailed product description..." />
          </div>

          {/* Images */}
          <MultiImageUpload label="Product Images" value={images} onChange={setImages} />

          {/* Price / Unit / SKU */}
          <div className={styles.formRow3}>
            <div className={styles.field}>
              <label className={styles.label}>Price (₹)</label>
              <input name="price" type="number" min="0" className={styles.input} value={form.price} onChange={handleChange} placeholder="0" />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Unit</label>
              <input name="unit" className={styles.input} value={form.unit} onChange={handleChange} placeholder="kg, g, pack, dozen..." />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>SKU</label>
              <input name="sku" className={styles.input} value={form.sku} onChange={handleChange} placeholder="O-DT-GI-250" />
            </div>
          </div>

          {/* Origin / Region / GI Year */}
          <div className={styles.formRow3}>
            <div className={styles.field}>
              <label className={styles.label}>Origin</label>
              <input name="origin" className={styles.input} value={form.origin} onChange={handleChange} placeholder="India" />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Region</label>
              <input name="region" className={styles.input} value={form.region} onChange={handleChange} placeholder="West Bengal" />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>GI Year</label>
              <input name="giYear" className={styles.input} value={form.giYear} onChange={handleChange} placeholder="2004–05" />
            </div>
          </div>

          {/* State */}
          <div className={styles.field}>
            <label className={styles.label}>State</label>
            <select name="state" className={styles.select} value={form.state} onChange={handleChange}>
              <option value="">Select state...</option>
              {INDIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <span className={styles.helperText}>Used for state-wise product filtering on the website</span>
          </div>

          {/* Status / Type / Rating */}
          <div className={styles.formRow3}>
            <div className={styles.field}>
              <label className={styles.label}>Status</label>
              <select name="status" className={styles.select} value={form.status} onChange={handleChange}>
                <option value="In Stock">In Stock</option>
                <option value="Out of Stock">Out of Stock</option>
                <option value="Coming Soon">Coming Soon</option>
              </select>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Product Type</label>
              <select name="productType" className={styles.select} value={form.productType} onChange={handleChange}>
                <option value="Agricultural Product">Agricultural Product</option>
                <option value="Food Product">Food Product</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Rating (1–5)</label>
              <input name="rating" type="number" min="0" max="5" step="0.1" className={styles.input} value={form.rating} onChange={handleChange} />
            </div>
          </div>

          {/* Tags */}
          <div className={styles.field}>
            <label className={styles.label}>Tags</label>
            <input name="tags" className={styles.input} value={form.tags} onChange={handleChange} placeholder="Comma-separated: Darjeeling Tea, GI Certified, Premium..." />
            <span className={styles.helperText}>Separate tags with commas</span>
          </div>

          {/* SEO */}
          <div className={styles.field}>
            <label className={styles.label}>SEO Title</label>
            <input name="seoTitle" className={styles.input} value={form.seoTitle} onChange={handleChange} placeholder="SEO-optimised title" />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>SEO Description</label>
            <textarea name="seoDescription" className={styles.textarea} value={form.seoDescription} onChange={handleChange} rows={2} placeholder="Meta description for search engines..." />
          </div>

          {/* Toggles */}
          <div className={styles.formRow}>
            <div className={styles.toggleRow}>
              <label className={styles.toggle}>
                <input name="isActive" type="checkbox" checked={form.isActive} onChange={handleChange} />
                <span className={styles.toggleSlider} />
              </label>
              <span className={styles.toggleLabel}>Active (visible on site)</span>
            </div>
            <div className={styles.toggleRow}>
              <label className={styles.toggle}>
                <input name="isFeatured" type="checkbox" checked={form.isFeatured} onChange={handleChange} />
                <span className={styles.toggleSlider} />
              </label>
              <span className={styles.toggleLabel}>Featured product</span>
            </div>
          </div>
        </div>

        <div className={styles.formFooter}>
          <Link href="/products" className={styles.btnSecondary}>Cancel</Link>
          <button type="submit" className={styles.btnPrimary} disabled={loading}>
            {loading ? "Saving..." : isEdit ? "Update Product" : "Create Product"}
          </button>
        </div>
      </div>
    </form>
  );
}
