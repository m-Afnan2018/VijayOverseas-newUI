"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./HeroSection.module.css";
import heroMain from '@/assets/images/home/hero-main.jpg'
import { getActiveNotices } from "@/lib/api";

const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;

function formatDate(iso) {
    if (!iso) return "";
    return new Date(iso).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

export default function HeroSection() {
    const [notices, setNotices] = useState([]);

    useEffect(() => {
        getActiveNotices()
            .then(setNotices)
            .catch(() => setNotices([]));
    }, []);

    return (
        <section className={styles.hero}
        style={{ background: `radial-gradient(#81400e8a, #2f19085c), url(${heroMain.src})`, backgroundSize: 'cover', backgroundPosition: 'center right' }}>
            <div className={styles.container}>
                {/* Welcome Tag */}
                <h5>WELCOME TO VIJAY OVERSEAS</h5>

                {/* Main Heading */}
                <h2>
                    <span className={styles.headingDark}>EXPORTING INDIA&apos;S AUTHENTIC </span>
                    <span className={styles.headingTeal}>GI-TAGGED</span>
                    <br />
                    <span className={styles.headingDark}>AGRICULTURAL </span>
                    <span className={styles.headingTeal}>PRODUCTS</span>
                    <span className={styles.headingDark}> TO THE WORLD</span>
                </h2>

                {/* Sub Description */}
                <p className={styles.description}>
                    Vijay Overseas is committed to promoting India&apos;s rich agricultural
                    heritage by sourcing and exporting premium GI-tagged farm products
                    from different regions of the country to global markets.
                </p>

                {/* Tag Line */}
                <p className={styles.tagline}>
                    <span>CONNECTING FARMERS</span>
                    <span className={styles.divider}> | </span>
                    <span>HERITAGE PRODUCTS</span>
                    <span className={styles.divider}> | </span>
                    <span>INTERNATIONAL BUYERS THROUGH TRUSTED EXPORT SOLUTIONS.</span>
                </p>

                {/* Notice Board */}
                {notices.length > 0 && (
                    <div className={styles.threeCol}>
                        <div className={styles.noticeBoard}>
                            <div className={styles.noticeHeader}>
                                <span className={styles.noticeTitle}>Notice</span>
                            </div>
                            <div className={styles.noticeList}>
                                {notices.map((notice) => {
                                    const isNew = notice.createdAt
                                        ? Date.now() - new Date(notice.createdAt).getTime() < ONE_WEEK_MS
                                        : false;
                                    return (
                                        <div key={notice._id} className={styles.noticeItem}>
                                            <p className={styles.noticeDate}>• {formatDate(notice.createdAt)}</p>
                                            <p className={styles.noticeText}>
                                                {notice.title}{" "}
                                                {isNew && (
                                                    <span className={styles.newBadge}>
                                                        <span className={styles.newDot}></span>new
                                                    </span>
                                                )}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}

                {/* Bottom Tagline */}
                <h5 className={styles.bottomTagline}>
                    PROUDLY REPRESENTING INDIA&apos;S AGRICULTURAL HERITAGE AND GI-TAGGED
                    PRODUCTS GLOBALLY
                </h5>

                {/* CTA Buttons */}
                <div className={styles.ctaRow}>
                    <Link href="/state-wise" className={styles.ctaPrimary}>
                        EXPLORE GI PRODUCT
                    </Link>
                    <Link href="/inquiry" className={styles.ctaSecondary}>
                        SEND INQUIRY
                    </Link>
                </div>
            </div>
        </section>
    );
}
