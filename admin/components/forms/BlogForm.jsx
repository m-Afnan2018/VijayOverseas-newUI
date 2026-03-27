"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { blogsApi } from "@/lib/api";
import { SingleImageUpload } from "@/components/ui/ImageUpload";
import RichTextEditor from "@/components/ui/RichTextEditor";
import styles from "./FormStyles.module.css";

const slugify = (s) =>
  s.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]/g, "").replace(/--+/g, "-");

const EMPTY = {
  title: "",
  excerpt: "",
  content: "",
  author: "Vijay Overseas Team",
  tags: "",
  categories: "",
  isPublished: false,
  seoTitle: "",
  seoDescription: "",
};

export default function BlogForm({ id }) {
  const router = useRouter();
  const isEdit = !!id && id !== "new";
  const [form, setForm] = useState(EMPTY);
  const [coverFile, setCoverFile] = useState(null);
  const [existingCover, setExistingCover] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);

  useEffect(() => {
    if (!isEdit) return;
    const load = async () => {
      try {
        const res = await blogsApi.get(id);
        const d = res.data.data;
        setForm({
          title: d.title || "",
          excerpt: d.excerpt || "",
          content: d.content || "",
          author: d.author || "Vijay Overseas Team",
          tags: Array.isArray(d.tags) ? d.tags.join(", ") : "",
          categories: Array.isArray(d.categories) ? d.categories.join(", ") : "",
          isPublished: d.isPublished ?? false,
          seoTitle: d.seoTitle || "",
          seoDescription: d.seoDescription || "",
        });
        setExistingCover(d.coverImage || null);
      } catch {
        toast.error("Failed to load blog");
        router.push("/blogs");
      } finally {
        setFetching(false);
      }
    };
    load();
  }, [id, isEdit, router]);

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.content.trim() || form.content === "<p></p>") e.content = "Content is required";
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
        if (v !== "" && v !== undefined) fd.append(k, String(v));
      });
      if (coverFile) fd.append("image", coverFile);

      if (isEdit) {
        await blogsApi.update(id, fd);
        toast.success("Blog updated");
      } else {
        await blogsApi.create(fd);
        toast.success("Blog created");
      }
      router.push("/blogs");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save blog");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className={styles.formBody} style={{ color: "var(--text-muted)" }}>Loading...</div>;

  return (
    <form onSubmit={handleSubmit} noValidate encType="multipart/form-data">
      <div className={styles.formCard}>
        <div className={styles.formHeader}>
          <span className={styles.formTitle}>{isEdit ? "Edit Blog Post" : "New Blog Post"}</span>
        </div>

        <div className={styles.formBody}>
          {/* Title */}
          <div className={styles.field}>
            <label className={styles.label}>Title <span className={styles.required}>*</span></label>
            <input name="title" className={`${styles.input} ${errors.title ? styles.error : ""}`} value={form.title} onChange={handleChange} placeholder="Blog post title" />
            {errors.title && <span className={styles.errorText}>{errors.title}</span>}
            {form.title && <span className={styles.slugPreview}>/{slugify(form.title)}</span>}
          </div>

          {/* Excerpt */}
          <div className={styles.field}>
            <label className={styles.label}>Excerpt</label>
            <textarea name="excerpt" className={styles.textarea} value={form.excerpt} onChange={handleChange} rows={3} placeholder="Short summary shown in blog listing..." />
          </div>

          {/* Cover Image */}
          <SingleImageUpload
            label="Cover Image"
            value={coverFile || existingCover}
            onChange={(file) => { setCoverFile(file); setExistingCover(null); }}
          />

          {/* Content */}
          <div className={styles.field}>
            <label className={styles.label}>Content <span className={styles.required}>*</span></label>
            <RichTextEditor
              value={form.content}
              onChange={(html) => { setForm((p) => ({ ...p, content: html })); setErrors((p) => ({ ...p, content: undefined })); }}
              placeholder="Write your blog post..."
            />
            {errors.content && <span className={styles.errorText}>{errors.content}</span>}
          </div>

          {/* Author / Tags / Categories */}
          <div className={styles.formRow}>
            <div className={styles.field}>
              <label className={styles.label}>Author</label>
              <input name="author" className={styles.input} value={form.author} onChange={handleChange} placeholder="Author name" />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Categories</label>
              <input name="categories" className={styles.input} value={form.categories} onChange={handleChange} placeholder="Agriculture, Export, GI Products..." />
              <span className={styles.helperText}>Comma-separated</span>
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Tags</label>
            <input name="tags" className={styles.input} value={form.tags} onChange={handleChange} placeholder="GI Tags, Basmati Rice, Darjeeling Tea..." />
            <span className={styles.helperText}>Comma-separated</span>
          </div>

          {/* SEO */}
          <div className={styles.field}>
            <label className={styles.label}>SEO Title</label>
            <input name="seoTitle" className={styles.input} value={form.seoTitle} onChange={handleChange} />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>SEO Description</label>
            <textarea name="seoDescription" className={styles.textarea} value={form.seoDescription} onChange={handleChange} rows={2} />
          </div>

          {/* Publish toggle */}
          <div className={styles.toggleRow}>
            <label className={styles.toggle}>
              <input name="isPublished" type="checkbox" checked={form.isPublished} onChange={handleChange} />
              <span className={styles.toggleSlider} />
            </label>
            <span className={styles.toggleLabel}>Published (visible on the website)</span>
          </div>
        </div>

        <div className={styles.formFooter}>
          <Link href="/blogs" className={styles.btnSecondary}>Cancel</Link>
          <button type="submit" className={styles.btnPrimary} disabled={loading}>
            {loading ? "Saving..." : isEdit ? "Update Post" : "Publish Post"}
          </button>
        </div>
      </div>
    </form>
  );
}
