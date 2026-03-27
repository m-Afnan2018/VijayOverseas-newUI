"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./HeroSection.module.css";
import hero1 from '@/assets/images/home/hero1.webp'
import hero2 from '@/assets/images/home/hero2.webp'
import heroMain from '@/assets/images/home/hero-main.jpg'

const notices = [
    {
        id: 1,
        date: "07-Mar-2026",
        text: "Public Notice: Expansion of GI-Tagged Agricultural Export Operations",
        isNew: true,
    },
    {
        id: 2,
        date: "01-Mar-2026",
        text: "Trade Notice: Onboarding of Verified GI Producers & Farmer Groups",
        isNew: true,
    },
    {
        id: 3,
        date: "24-Feb-2026",
        text: "Compliance Notice: Updated International Quality & Packaging Standards",
        isNew: true,
    },
    {
        id: 4,
        date: "24-Feb-2026",
        text: "Compliance Notice: Updated International Quality & Packaging Standards",
        isNew: true,
    },
    {
        id: 5,
        date: "15-Feb-2026",
        text: "Export Advisory: New GI Certification Guidelines for 2026",
        isNew: false,
    },
];

export default function HeroSection() {
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

                {/* Three Column Layout */}
                <div className={styles.threeCol}>
                    {/* Left — President */}
                    {/* <div className={styles.personCard}>
                        <div className={styles.personImageWrapper}>
                            <Image
                                src={hero1}
                                alt="President of India"
                                fill
                                className={styles.personImage}
                                sizes="(max-width: 768px) 100vw, 320px"
                            />
                        </div>
                        <h2 className={styles.personName}>Droupadi Murmu</h2>
                        <h5 className={styles.personTitle}>President of India</h5>
                    </div> */}

                    {/* Center — Notice Board */}
                    <div className={styles.noticeBoard}>
                        <div className={styles.noticeHeader}>
                            <span className={styles.noticeTitle}>Notice</span>
                        </div>
                        <div className={styles.noticeList}>
                            {notices.map((notice) => (
                                <div key={notice.id} className={styles.noticeItem}>
                                    <p className={styles.noticeDate}>• {notice.date}</p>
                                    <p className={styles.noticeText}>
                                        {notice.text}{" "}
                                        {notice.isNew && (
                                            <span className={styles.newBadge}>
                                                <span className={styles.newDot}></span>new
                                            </span>
                                        )}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right — PM */}
                    {/* <div className={styles.personCard}>
                        <div className={styles.personImageWrapper}>
                            <Image
                                src={hero2}
                                alt="Prime Minister of India"
                                fill
                                className={styles.personImage}
                                sizes="(max-width: 768px) 100vw, 320px"
                            />
                        </div>
                        <h2 className={styles.personName}>Narendra Modi</h2>
                        <h5 className={styles.personTitle}>Prime Minister of India</h5>
                    </div> */}
                </div>

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