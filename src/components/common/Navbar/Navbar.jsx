"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import logo from "@/assets/images/logos/logo.svg";
import styles from "./Navbar.module.css";

const navLinks = [
    { name: "Home",        href: "/"            },
    { name: "About",       href: "/about-us"       },
    { name: "State Wise",  href: "/state-wise"  },
    { name: "Team Member", href: "/team-member" },
    { name: "Blogs",        href: "/blogs"        },
    { name: "FAQ",         href: "/faq"         },
    { name: "Contact",     href: "/contact-us"     },
];

export default function Navbar() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [search, setSearch] = useState("");

    const toggleMenu = () => setIsMenuOpen((v) => !v);
    const closeMenu  = () => setIsMenuOpen(false);

    return (
        <header className={styles.navbar}>
            <div className={styles.container}>

                {/* ── Logo ── */}
                <div className={styles.logo}>
                    <Link href="/">
                        <Image src={logo} alt="Vijay Overseas" />
                    </Link>
                </div>

                {/* ── Search Bar ── */}
                <div className={styles.searchBar}>
                    <span className={styles.searchIcon}>
                        <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                            <circle cx="8.5" cy="8.5" r="6" stroke="#aaa" strokeWidth="2" />
                            <path d="M13.5 13.5L18 18" stroke="#aaa" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </span>
                    <input
                        type="text"
                        placeholder="Search Products"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>

                {/* ── Hamburger ── */}
                <button
                    className={`${styles.hamburger} ${isMenuOpen ? styles.hamburgerActive : ""}`}
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                {/* ── Nav Links ── */}
                <nav className={`${styles.navLinks} ${isMenuOpen ? styles.navLinksActive : ""}`}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={
                                pathname === link.href || pathname === `${link.href}/`
                                    ? `${styles.navLink} ${styles.navLinkActive}`
                                    : styles.navLink
                            }
                            onClick={closeMenu}
                        >
                            {link.name}
                        </Link>
                    ))}

                    {/* CTA — mobile only */}
                    <Link href="/contact" className={`${styles.ctaBtn} ${styles.mobileCta}`} onClick={closeMenu}>
                        Get Started
                    </Link>
                </nav>

                {/* ── CTA — desktop only ── */}
                <Link href="/contact" className={`${styles.ctaBtn} ${styles.desktopCta}`}>
                    Get Started
                </Link>

            </div>
        </header>
    );
}