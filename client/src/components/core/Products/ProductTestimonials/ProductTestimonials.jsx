"use client";

import Image from "next/image";
import styles from "./ProductTestimonials.module.css";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1").replace("/api/v1", "");

function resolveImg(src) {
    if (!src) return null;
    return src.startsWith("http") ? src : `${API_BASE}${src}`;
}

export default function ProductTestimonials({ testimonials = [] }) {
    if (testimonials.length === 0) return null;

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.heading}>What Our Buyers Say</h2>

                <div className={styles.grid}>
                    {testimonials.map((t) => {
                        const avatarSrc = resolveImg(t.avatar);
                        return (
                            <div key={t._id} className={styles.card}>
                                {/* Stars */}
                                <div className={styles.stars}>
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <span key={i} className={i < t.rating ? styles.starFilled : styles.starEmpty}>★</span>
                                    ))}
                                </div>

                                {/* Message */}
                                <p className={styles.message}>&ldquo;{t.message}&rdquo;</p>

                                {/* Author */}
                                <div className={styles.author}>
                                    {avatarSrc ? (
                                        <Image
                                            src={avatarSrc}
                                            alt={t.name}
                                            width={48}
                                            height={48}
                                            className={styles.avatar}
                                            unoptimized
                                        />
                                    ) : (
                                        <div className={styles.avatarFallback}>
                                            {t.name.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                    <div className={styles.authorInfo}>
                                        <span className={styles.name}>{t.name}</span>
                                        {(t.designation || t.company) && (
                                            <span className={styles.meta}>
                                                {[t.designation, t.company].filter(Boolean).join(", ")}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
