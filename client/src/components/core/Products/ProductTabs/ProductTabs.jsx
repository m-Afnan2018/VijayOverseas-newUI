"use client";

import { useState } from "react";
import styles from "./ProductTabs.module.css";

export default function ProductTabs({ product }) {
    const [activeTab, setActiveTab] = useState("description");

    const highlights = [];
    if (product?.origin) highlights.push({ label: "Origin", value: product.origin });
    if (product?.region) highlights.push({ label: "Region", value: product.region });
    if (product?.state) highlights.push({ label: "State", value: product.state });
    if (product?.category?.name) highlights.push({ label: "Category", value: product.category.name });
    if (product?.productType) highlights.push({ label: "Product Type", value: product.productType });
    if (product?.giYear) highlights.push({ label: "GI Registration", value: product.giYear });
    if (product?.unit) highlights.push({ label: "Unit", value: product.unit });

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                {/* ── Tab Bar ── */}
                <div className={styles.tabBar}>
                    <button
                        className={`${styles.tab} ${activeTab === "description" ? styles.tabActive : ""}`}
                        onClick={() => setActiveTab("description")}
                    >
                        DESCRIPTION
                    </button>
                    <span className={styles.tabSeparator}>|</span>
                    <button
                        className={`${styles.tab} ${activeTab === "reviews" ? styles.tabActive : ""}`}
                        onClick={() => setActiveTab("reviews")}
                    >
                        REVIEWS (0)
                    </button>
                </div>

                {/* ── Tab Divider ── */}
                <div className={styles.tabDivider} />

                {/* ── Tab Content ── */}
                {activeTab === "description" && (
                    <div className={styles.content}>
                        {/* Rich description (HTML) or plain description */}
                        {product?.richDescription ? (
                            <div
                                dangerouslySetInnerHTML={{ __html: product.richDescription }}
                                className={styles.para}
                            />
                        ) : product?.description ? (
                            <p className={styles.para}>{product.description}</p>
                        ) : null}

                        {/* Product Highlights */}
                        {highlights.length > 0 && (
                            <div className={styles.block}>
                                <h2 className={styles.blockTitle}>Product Highlights</h2>
                                <div className={styles.fieldList}>
                                    {highlights.map((field) => (
                                        <p key={field.label} className={styles.fieldRow}>
                                            <strong className={styles.fieldLabel}>{field.label}:</strong>{" "}
                                            <span className={styles.fieldValue}>{field.value}</span>
                                        </p>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Tags */}
                        {product?.tags?.length > 0 && (
                            <div className={styles.block}>
                                <h2 className={styles.blockTitle}>Tags</h2>
                                <p className={styles.para}>{product.tags.join(", ")}</p>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === "reviews" && (
                    <div className={styles.content}>
                        <p className={styles.para}>
                            There are no reviews yet. Be the first to review this product.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
