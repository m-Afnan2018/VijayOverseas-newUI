"use client";

import { useState } from "react";
import styles from "./ProductTabs.module.css";

const descriptionContent = {
    intro: [
        "Darjeeling Tea is a premium GI-certified Himalayan tea, celebrated worldwide for its delicate aroma, light golden infusion, and refined muscatel flavour. Carefully hand-plucked from the mist-covered slopes of Darjeeling, this tea reflects centuries-old cultivation practices and the region's unique climate.",
        "Grown at high altitudes and processed using traditional orthodox methods, Darjeeling Tea preserves its natural oils and flavour complexity. Its smooth finish and elegant character make it a preferred choice for tea connoisseurs and global buyers seeking authentic Indian origin products.",
    ],
    highlights: {
        title: "Product Highlights",
        fields: [
            { label: "Origin", value: "Darjeeling, West Bengal, India" },
            { label: "Category", value: "GI-Tagged Agricultural Product" },
            { label: "GI Registration", value: "2004–05" },
            { label: "Tea Type", value: "Premium Orthodox Black Tea" },
            { label: "Aroma", value: "Light floral fragrance" },
        ],
    },
    wellness: {
        title: "Health & Wellness Significance",
        intro: "Darjeeling Tea is valued for:",
        points: [
            "Natural antioxidants that support overall wellness",
            "Refreshing aroma that uplifts mood and reduces fatigue",
            "Light and smooth character suitable for daily consumption",
            "A calming tea experience ideal for mindful breaks",
        ],
        outro:
            "This makes Darjeeling Tea a perfect beverage for a healthy and refreshing lifestyle.",
    },
    idealFor: {
        title: "Ideal For",
        points: [
            "Daily premium tea consumption",
            "Hospitality & guest serving",
            "Corporate gifting & export hampers",
            "Cafés, hotels & luxury hospitality",
            "Tea connoisseurs and specialty beverage lovers",
        ],
    },
    storage: {
        title: "Storage & Care Instructions",
        points: [
            "Store in an airtight container",
            "Keep in a cool, dry place away from sunlight",
            "Avoid moisture exposure to preserve aroma and flavour",
            "Use dry spoon while handling",
        ],
    },
};

export default function ProductTabs() {
    const [activeTab, setActiveTab] = useState("description");

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
                        {/* Intro paragraphs */}
                        {descriptionContent.intro.map((para, i) => (
                            <p key={i} className={styles.para}>
                                {para}
                            </p>
                        ))}

                        {/* Product Highlights */}
                        <div className={styles.block}>
                            <h2 className={styles.blockTitle}>
                                {descriptionContent.highlights.title}
                            </h2>
                            <div className={styles.fieldList}>
                                {descriptionContent.highlights.fields.map((field) => (
                                    <p key={field.label} className={styles.fieldRow}>
                                        <strong className={styles.fieldLabel}>{field.label}:</strong>{" "}
                                        <span className={styles.fieldValue}>{field.value}</span>
                                    </p>
                                ))}
                            </div>
                        </div>

                        {/* Health & Wellness */}
                        <div className={styles.block}>
                            <h2 className={styles.blockTitle}>
                                {descriptionContent.wellness.title}
                            </h2>
                            <p className={styles.para}>{descriptionContent.wellness.intro}</p>
                            <ul className={styles.plainList}>
                                {descriptionContent.wellness.points.map((point, i) => (
                                    <li key={i}>{point}</li>
                                ))}
                            </ul>
                            <p className={styles.para}>{descriptionContent.wellness.outro}</p>
                        </div>

                        {/* Ideal For */}
                        <div className={styles.block}>
                            <h2 className={styles.blockTitle}>
                                {descriptionContent.idealFor.title}
                            </h2>
                            <ul className={styles.plainList}>
                                {descriptionContent.idealFor.points.map((point, i) => (
                                    <li key={i}>{point}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Storage & Care */}
                        <div className={styles.block}>
                            <h2 className={styles.blockTitle}>
                                {descriptionContent.storage.title}
                            </h2>
                            <ul className={styles.plainList}>
                                {descriptionContent.storage.points.map((point, i) => (
                                    <li key={i}>{point}</li>
                                ))}
                            </ul>
                        </div>
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
