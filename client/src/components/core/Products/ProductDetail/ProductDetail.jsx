"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./ProductDetail.module.css";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1").replace("/api/v1", "");

function resolveImg(src) {
    if (!src) return null;
    return src.startsWith("http") ? src : `${API_BASE}${src}`;
}

export default function ProductDetail({ product }) {
    const [activeImage, setActiveImage] = useState(0);

    if (!product) {
        return (
            <section className={styles.section}>
                <div className={styles.container}>
                    <p style={{ padding: "2rem" }}>Product not found.</p>
                </div>
            </section>
        );
    }

    const images = (product.images || []).map(resolveImg).filter(Boolean);
    const displayImages = images.length > 0 ? images : [null];

    const categories = [];
    if (product.category?.name) categories.push(product.category.name);
    if (product.productType) categories.push(product.productType);

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                {/* ── LEFT: Images ── */}
                <div className={styles.imageCol}>
                    {/* Main Image */}
                    <div className={styles.mainImageWrapper}>
                        {displayImages[activeImage] ? (
                            <Image
                                src={displayImages[activeImage]}
                                alt={product.name}
                                fill
                                className={styles.mainImage}
                                sizes="(max-width: 768px) 100vw, 55vw"
                                priority
                                unoptimized
                            />
                        ) : (
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", fontSize: 64 }}>📦</div>
                        )}
                    </div>

                    {/* Thumbnails */}
                    {displayImages.length > 1 && (
                        <div className={styles.thumbnails}>
                            {displayImages.slice(1).map((img, i) => (
                                <button
                                    key={i}
                                    className={`${styles.thumb} ${activeImage === i + 1 ? styles.thumbActive : ""}`}
                                    onClick={() => setActiveImage(i + 1)}
                                    aria-label={`View image ${i + 2}`}
                                >
                                    <Image
                                        src={img}
                                        alt={`Thumbnail ${i + 2}`}
                                        fill
                                        className={styles.thumbImage}
                                        sizes="120px"
                                        unoptimized
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* ── RIGHT: Details ── */}
                <div className={styles.detailCol}>
                    {/* Title */}
                    <h2 className={styles.title}>{product.name}</h2>

                    {/* Stars */}
                    <div className={styles.stars} aria-label={`Rating: ${product.rating} out of 5`}>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <span
                                key={i}
                                className={i < (product.rating || 0) ? styles.starFilled : styles.starEmpty}
                            >
                                ★
                            </span>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <Link href={`/inquiry?product=${encodeURIComponent(product.name)}`} className={styles.quoteBtn}>
                        Request A Quote
                    </Link>

                    {/* Status */}
                    <div className={styles.metaRow}>
                        <span className={styles.metaLabel}>Status:</span>
                        <span className={styles.metaValue}>{product.status || "—"}</span>
                    </div>

                    {/* SKU */}
                    {product.sku && (
                        <div className={styles.metaRow}>
                            <span className={styles.metaLabel}>SKU:</span>
                            <span className={styles.sku}>{product.sku}</span>
                        </div>
                    )}

                    {/* Divider */}
                    <div className={styles.divider} />

                    {/* Description */}
                    <p className={styles.description}>{product.description}</p>

                    {/* Divider */}
                    <div className={styles.divider} />

                    {/* Categories */}
                    {categories.length > 0 && (
                        <div className={styles.taxonomyRow}>
                            <span className={styles.taxonomyLabel}>CATEGORIES:</span>
                            <span className={styles.taxonomyValue}>
                                {categories.join(" / ")}
                            </span>
                        </div>
                    )}

                    {/* Tags */}
                    {product.tags?.length > 0 && (
                        <div className={styles.taxonomyRow}>
                            <span className={styles.taxonomyLabel}>TAGS:</span>
                            <span className={styles.taxonomyValue}>
                                {product.tags.join(", ")}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
