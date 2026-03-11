"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import styles from "./GITaggedFoodProduct.module.css";

const products = [
    {
        id: 1,
        name: "Darjeeling Tea",
        region: "West Bengal",
        giYear: "2004–05",
        category: "Agricultural Product",
        description: "Premium aromatic tea grown in Himalayan foothills.",
        image:
            "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=600&h=340&fit=crop",
    },
    {
        id: 2,
        name: "Coorg Orange",
        region: "Karnataka",
        giYear: "2004–05",
        category: "Agricultural Product",
        description: "Naturally sweet and aromatic oranges from Coorg region.",
        image:
            "https://images.unsplash.com/photo-1547514701-42782101795e?w=600&h=340&fit=crop",
    },
    {
        id: 3,
        name: "Nanjanagud Banana",
        region: "Karnataka",
        giYear: "2004–05",
        category: "Agricultural Product",
        description: "Distinctive flavor bananas grown in fertile river basin soil.",
        image:
            "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&h=340&fit=crop",
    },
    {
        id: 4,
        name: "Alphonso Mango",
        region: "Maharashtra",
        giYear: "2018–19",
        category: "Agricultural Product",
        description: "World-renowned king of mangoes from the Konkan coast.",
        image:
            "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=600&h=340&fit=crop",
    },
    {
        id: 5,
        name: "Basmati Rice",
        region: "Punjab",
        giYear: "2010–11",
        category: "Agricultural Product",
        description: "Long-grain aromatic rice cultivated in the fertile Indo-Gangetic plains.",
        image:
            "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&h=340&fit=crop",
    },
    {
        id: 6,
        name: "Kashmiri Saffron",
        region: "Jammu & Kashmir",
        giYear: "2020–21",
        category: "Agricultural Product",
        description: "Prized red gold saffron harvested from the Pampore plains.",
        image:
            "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&h=340&fit=crop",
    },
    {
        id: 7,
        name: "Nagpur Orange",
        region: "Maharashtra",
        giYear: "2014–15",
        category: "Agricultural Product",
        description: "Juicy, thin-skinned oranges from the orange city of India.",
        image:
            "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=600&h=340&fit=crop",
    },
    {
        id: 8,
        name: "Munnar Tea",
        region: "Kerala",
        giYear: "2013–14",
        category: "Agricultural Product",
        description: "High-altitude tea with a rich, mellow flavour from the Western Ghats.",
        image:
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=340&fit=crop",
    },
];

const VISIBLE = 3; // cards visible at once

export default function GITaggedFoodProduct() {
    const [current, setCurrent] = useState(0);
    const total = products.length; // 8
    const maxIndex = total - VISIBLE; // 5  (slides 0-5)
    const dotCount = maxIndex + 1;   // 6 dots

    const slideTo = (index) => {
        setCurrent(Math.max(0, Math.min(index, maxIndex)));
    };

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                {/* Header */}
                <div className={styles.header}>
                    <h2 >GI Tagged Food Stuff Products</h2>
                    <p>
                        Discover India’s finest GI-certified agricultural products rooted in tradition. Grown in authentic regions known for their unique soil, climate, and expertise. Delivered worldwide with trust, traceability, and premium quality assurance.
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

                    {/* Viewport — clips overflow */}
                    <div className={styles.viewport}>
                        <div
                            className={styles.track}
                            style={{
                                transform: `translateX(calc(${current} * -1 * (100% + var(--gap)) / 3))`,
                            }}
                        >
                            {products.map((product) => (
                                <div key={product.id} className={styles.card}>
                                    {/* Image */}
                                    <div className={styles.imageWrapper}>
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            className={styles.image}
                                            sizes="(max-width: 768px) 90vw, 380px"
                                        />
                                        <div className={styles.ribbon}>
                                            <span className={styles.giTop}>GI</span>
                                            <span className={styles.giBottom}>Certified</span>
                                        </div>
                                    </div>

                                    {/* Meta */}
                                    <div className={styles.meta}>
                                        <span className={styles.region}>
                                            <FaLocationDot className={styles.pinIcon} />
                                            {product.region}
                                        </span>
                                        <span className={styles.giYear}>
                                            <span>📅</span> GI Registered: {product.giYear}
                                        </span>
                                    </div>

                                    <h3 className={styles.productName}>{product.name}</h3>

                                    <div className={styles.categoryTag}>
                                        <span>🌿</span>
                                        <span className={styles.categoryLabel}>{product.category}</span>
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
                            ))}
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
            </div>
        </section>
    );
}