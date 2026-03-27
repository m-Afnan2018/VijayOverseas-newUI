"use client";

import Image from "next/image";
import Link from "next/link";
import style from "./Footer.module.css";

import logo from "@/assets/images/logos/logo.svg";
import phone from "@/assets/images/common/phone.svg";
import mail from "@/assets/images/common/mail.svg";
import facebook from "@/assets/images/common/facebook.svg";
import twitter from "@/assets/images/common/twitter.svg";
import instagram from "@/assets/images/common/instagram.svg";
import linkedin from "@/assets/images/common/linkedin.svg";
import youtube from "@/assets/images/common/youtube.svg";

export default function Footer() {
    return (
        <footer className={style.footer}>
            <div className={style.top}>
                {/* COLUMN 1 */}
                <div className={style.col}>
                    <Link href="/">
                        <Image src={logo} alt="Vijay Overseas" className={style.logo} />
                    </Link>
                    <p>
                        {" Exporting premium GI-tagged agricultural products from India to global markets with assured authenticity, quality, and reliable trade partnerships."}
                    </p>

                    <div className={style.socials}>
                        <a href="https://www.facebook.com/profile.php?id=61585814978113" target="_blank" rel="noopener noreferrer">
                            <Image src={facebook} alt="facebook" />
                        </a>
                        {/* <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <Image src={twitter} alt="twitter" />
                        </a> */}
                        <a href="https://www.instagram.com/vijay.overseas" target="_blank" rel="noopener noreferrer">
                            <Image src={instagram} alt="instagram" />
                        </a>
                        {/* <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                            <Image src={linkedin} alt="linkedin" />
                        </a> */}
                        <a href="https://youtube.com/@vijayoverseasimportexport" target="_blank" rel="noopener noreferrer">
                            <Image src={youtube} alt="youtube" />
                        </a>
                    </div>
                </div>

                {/* COLUMN 2 */}
                <div className={style.col}>
                    <h4>Get Started</h4>
                    <ul>
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/about">About</Link></li>
                        <li><Link href="/product">Products</Link></li>
                    </ul>
                </div>

                {/* COLUMN 3 */}
                <div className={style.col}>
                    <h4>Resources</h4>
                    <ul>
                        <li><Link href="/chooseUs">Why choose</Link></li>
                        <li><Link href="/blogs">Blogs</Link></li>
                        <li><Link href="/faq">FAQs</Link></li>
                        <li><Link href="/contact">Contact us</Link></li>
                    </ul>
                </div>

                {/* COLUMN 4 */}
                <div className={style.col}>
                    <h4>Contact Us</h4>
                    <div className={style.contact}>
                        <a href="tel:+919217848056">
                            <span>
                                <Image src={phone} alt="phone" /> +91-9217848056
                            </span>
                        </a>
                        <a href="mailto:info@vijayoverseas.com">
                            <span>
                                <Image src={mail} alt="mail" /> info@vijayoverseas.com
                            </span>
                        </a>
                    </div>
                </div>
            </div>

            {/* BOTTOM BAR */}
            <div className={style.bottom}>
                <p>
                    All Rights Reserved | <span>Terms and Conditions</span> |{" "}
                    <span>Privacy Policy</span>
                </p>
            </div>
        </footer>
    );
}