"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./ProductDetail.module.css";

// ── Sample product data (replace with real props/fetch) ──
const product = {
    name: "Darjeeling Tea (Premium GI-Certified) — 250g Pack",
    rating: 5,
    status: "In Stock",
    sku: "O-DT-GI-250",
    description:
        "Darjeeling Tea is one of India's most celebrated premium teas, grown in the misty Himalayan foothills of West Bengal. Known as the 'Champagne of Teas, ' it is prized for its delicate floral aroma, light golden liquor, and smooth muscatel flavor. Carefully hand-picked and traditionally processed, this GI-certified tea reflects the region's rich heritage and unique climate.",
    categories: ["GI Tagged Products", "Agricultural Products", "Tea"],
    tags: [
        "Darjeeling Tea",
        "GI Certified Tea",
        "Premium Indian Tea",
        "Himalayan Tea",
        "Orthodox Black Tea",
        "West Bengal Tea",
        "Indian Export Tea",
        "Specialty Tea",
        "Loose Leaf Tea",
        "Authentic GI Products",
        "Indian Agricultural Products",
    ],
    images: [
        "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=900&h=700&fit=crop",
        "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=240&fit=crop",
        "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=300&h=240&fit=crop",
        "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300&h=240&fit=crop",
    ],
};

export default function ProductDetail() {
    const [activeImage, setActiveImage] = useState(0);

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                {/* ── LEFT: Images ── */}
                <div className={styles.imageCol}>
                    {/* Main Image */}
                    <div className={styles.mainImageWrapper}>
                        <Image
                            src={product.images[activeImage]}
                            alt={product.name}
                            fill
                            className={styles.mainImage}
                            sizes="(max-width: 768px) 100vw, 55vw"
                            priority
                        />
                    </div>

                    {/* Thumbnails */}
                    <div className={styles.thumbnails}>
                        {product.images.slice(1).map((img, i) => (
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
                                />
                            </button>
                        ))}
                    </div>
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
                                className={i < product.rating ? styles.starFilled : styles.starEmpty}
                            >
                                ★
                            </span>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <Link href="/inquiry" className={styles.quoteBtn}>
                        Request A Quote
                    </Link>

                    {/* Status */}
                    <div className={styles.metaRow}>
                        <span className={styles.metaLabel}>Status:</span>
                        <span className={styles.metaValue}>{product.status}</span>
                    </div>

                    {/* SKU */}
                    <div className={styles.metaRow}>
                        <span className={styles.metaLabel}>SKU:</span>
                        <span className={styles.sku}>{product.sku}</span>
                    </div>

                    {/* Divider */}
                    <div className={styles.divider} />

                    {/* Description */}
                    <p className={styles.description}>{product.description}</p>

                    {/* Divider */}
                    <div className={styles.divider} />

                    {/* Categories */}
                    <div className={styles.taxonomyRow}>
                        <span className={styles.taxonomyLabel}>CATEGORIES:</span>
                        <span className={styles.taxonomyValue}>
                            {product.categories.join(" / ")}
                        </span>
                    </div>

                    {/* Tags */}
                    <div className={styles.taxonomyRow}>
                        <span className={styles.taxonomyLabel}>TAGS:</span>
                        <span className={styles.taxonomyValue}>
                            {product.tags.join(", ")}
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
