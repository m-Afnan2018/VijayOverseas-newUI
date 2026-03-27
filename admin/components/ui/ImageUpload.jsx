"use client";

import { useRef, useState } from "react";
import { MdCloudUpload, MdClose } from "react-icons/md";
import styles from "./ImageUpload.module.css";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1").replace("/api/v1", "");

function resolveUrl(src) {
  if (!src) return null;
  if (src.startsWith("http") || src.startsWith("blob:")) return src;
  return `${API_BASE}${src}`;
}

/**
 * Single image upload with preview
 */
export function SingleImageUpload({ label = "Cover Image", value, onChange }) {
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    onChange(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const previewUrl = value instanceof File ? URL.createObjectURL(value) : resolveUrl(value);

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>{label}</label>
      {previewUrl ? (
        <div className={styles.singlePreview}>
          <img src={previewUrl} alt="Preview" />
          <button
            type="button"
            className={styles.changeBtn}
            onClick={() => inputRef.current?.click()}
          >
            Change Image
          </button>
        </div>
      ) : (
        <div
          className={`${styles.dropzone} ${dragOver ? styles.dragOver : ""}`}
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
        >
          <div className={styles.dropzoneIcon}>
            <MdCloudUpload />
          </div>
          <div className={styles.dropzoneText}>Click or drag to upload</div>
          <div className={styles.dropzoneHint}>PNG, JPG, WEBP up to 5 MB</div>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className={styles.hiddenInput}
        onChange={(e) => handleFile(e.target.files[0])}
      />
    </div>
  );
}

/**
 * Multi image upload with preview grid
 */
export function MultiImageUpload({ label = "Product Images", value = [], onChange }) {
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  const handleFiles = (files) => {
    const valid = Array.from(files).filter((f) => f.type.startsWith("image/"));
    onChange([...value, ...valid]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeImage = (index) => {
    const next = value.filter((_, i) => i !== index);
    onChange(next);
  };

  const getPreviewUrl = (item) => {
    if (item instanceof File) return URL.createObjectURL(item);
    return resolveUrl(item);
  };

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>{label}</label>

      {value.length > 0 && (
        <div className={styles.previewGrid}>
          {value.map((item, idx) => (
            <div key={idx} className={styles.previewItem}>
              <img src={getPreviewUrl(item)} alt={`Preview ${idx + 1}`} />
              <button
                type="button"
                className={styles.removeBtn}
                onClick={() => removeImage(idx)}
              >
                <MdClose />
              </button>
            </div>
          ))}
        </div>
      )}

      <div
        className={`${styles.dropzone} ${dragOver ? styles.dragOver : ""}`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <div className={styles.dropzoneIcon}>
          <MdCloudUpload />
        </div>
        <div className={styles.dropzoneText}>
          {value.length > 0 ? "Add more images" : "Click or drag images to upload"}
        </div>
        <div className={styles.dropzoneHint}>PNG, JPG, WEBP up to 5 MB each (max 10)</div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className={styles.hiddenInput}
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}
