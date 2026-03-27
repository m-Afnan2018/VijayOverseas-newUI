"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { getProductsByType } from "@/lib/api";
import styles from "./GITaggedAgriProduct.module.css";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1").replace("/api/v1", "");

function resolveImg(src) {
    if (!src) return null;
    return src.startsWith("http") ? src : `${API_BASE}${src}`;
}

const VISIBLE = 3;

export default function GITaggedAgriProduct() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        getProductsByType("Agricultural Product", 12)
            .then(setProducts)
            .catch(() => setProducts([]))
            .finally(() => setLoading(false));
    }, []);

    const total = products.length;
    const maxIndex = Math.max(0, total - VISIBLE);
    const dotCount = maxIndex + 1;

    const slideTo = (index) => {
        setCurrent(Math.max(0, Math.min(index, maxIndex)));
    };

    if (loading) {
        return (
            <section className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.header}>
                        <h2>GI TAGGED AGRICULTURAL PRODUCT</h2>
                    </div>
                    <div className={styles.sliderRow}>
                        <div className={styles.viewport}>
                            <div className={styles.track}>
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className={styles.card} style={{ opacity: 0.4, minHeight: 340 }} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (products.length === 0) {
        return (
            <section className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.header}>
                        <h2>GI TAGGED AGRICULTURAL PRODUCT</h2>
                        <p>No agricultural products available yet.</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                {/* Header */}
                <div className={styles.header}>
                    <h2>GI TAGGED AGRICULTURAL PRODUCT</h2>
                    <p>
                        Discover India&apos;s finest GI-certified agricultural products rooted
                        in tradition. Grown in authentic regions known for their unique
                        soil, climate, and expertise. Delivered worldwide with trust,
                        traceability, and premium quality assurance.
                    </p>
                </div>

                {/* Slider */}
                <div className={styles.sliderRow}>
                    {/* Left Arrow */}
                    <button
                        className={`${styles.arrowBtn} ${current === 0 ? styles.arrowDisabled : ""}`}
                        onClick={() => slideTo(current - 1)}
                        disabled={current === 0}
                        aria-label="Previous"
                    >
                        <FaArrowLeft size={15} />
                    </button>

                    {/* Viewport */}
                    <div className={styles.viewport}>
                        <div
                            className={styles.track}
                            style={{
                                transform: `translateX(calc(${current} * -1 * (100% + var(--gap)) / 3))`,
                            }}
                        >
                            {products.map((product) => {
                                const imgSrc = resolveImg(product.images?.[0]);
                                return (
                                    <div key={product._id} className={styles.card}>
                                        {/* Image */}
                                        <div className={styles.imageWrapper}>
                                            {imgSrc ? (
                                                <Image
                                                    src={imgSrc}
                                                    alt={product.name}
                                                    fill
                                                    className={styles.image}
                                                    sizes="(max-width: 768px) 90vw, 380px"
                                                    unoptimized
                                                />
                                            ) : (
                                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", fontSize: 48 }}>📦</div>
                                            )}
                                            <div className={styles.ribbon}>
                                                <span className={styles.giTop}>GI</span>
                                                <span className={styles.giBottom}>Certified</span>
                                            </div>
                                        </div>

                                        {/* Meta */}
                                        <div className={styles.meta}>
                                            <span className={styles.region}>
                                                <FaLocationDot className={styles.pinIcon} />
                                                {product.region || product.state || "India"}
                                            </span>
                                            {product.giYear && (
                                                <span className={styles.giYear}>
                                                    <span>📅</span> GI Registered: {product.giYear}
                                                </span>
                                            )}
                                        </div>

                                        <h3 className={styles.productName}>{product.name}</h3>

                                        <div className={styles.categoryTag}>
                                            <span>🌿</span>
                                            <span className={styles.categoryLabel}>
                                                {product.category?.name || product.productType || "Agricultural Product"}
                                            </span>
                                        </div>

                                        <p className={styles.productDesc}>{product.description}</p>
                                        <span className={styles.line}></span>
                                        <Link
                                            href={`/inquiry?product=${encodeURIComponent(product.name)}`}
                                            className={styles.quoteBtn}
                                        >
                                            REQUEST A QUOTE
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Arrow */}
                    <button
                        className={`${styles.arrowBtn} ${current >= maxIndex ? styles.arrowDisabled : ""}`}
                        onClick={() => slideTo(current + 1)}
                        disabled={current >= maxIndex}
                        aria-label="Next"
                    >
                        <FaArrowRight size={15} />
                    </button>
                </div>

                {/* Dots */}
                {dotCount > 1 && (
                    <div className={styles.dots}>
                        {Array.from({ length: dotCount }).map((_, i) => (
                            <button
                                key={i}
                                className={`${styles.dot} ${i === current ? styles.dotActive : ""}`}
                                onClick={() => slideTo(i)}
                                aria-label={`Go to position ${i + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
