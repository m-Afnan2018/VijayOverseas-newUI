"use client";

import { useState } from "react";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import style from "./Mission.module.css";
import vision from "@/assets/images/about/mission.png";

const slides = [
    {
        id: 0,
        label: "Our Vision",
        emoji: "🌟",
        type: "vision",
        content: [
            {
                type: "para",
                text: "India's agricultural heritage is among the oldest and most diverse in the world, shaped by centuries of region-specific cultivation practices, ecological wisdom, and community-driven production systems.",
            },
            {
                type: "para",
                text: "From traditional water management and seed preservation techniques to climate-responsive cropping patterns, Indian agriculture reflects deep principles of sustainability and balanced resource use.",
            },
            {
                type: "para",
                text: "Geographical Indication (GI) products carry this legacy forward — representing unique soil and climatic conditions while preserving intergenerational knowledge that sustains biodiversity and rural livelihoods.",
            },
            {
                type: "para",
                text: "We envision establishing India as a global hub for authentic GI agricultural trade through a secure, transparent, and fully traceable digital ecosystem that protects both economic value and cultural integrity.",
            },
        ],
    },
    {
        id: 1,
        label: "Our Mission",
        emoji: "🎯",
        type: "mission",
        content: [
            {
                type: "bullet",
                title: "Build a Unified Digital Trade Ecosystem",
                text: "Digitally integrate GI producers, exporters, regulators, certification bodies, and global buyers into a single government-supported trade exchange platform.",
            },
            {
                type: "bullet",
                title: "Strengthen Trust, Traceability & Efficiency",
                text: "Bridge coordination and information gaps to create a seamless value chain that improves transparency, reliability, and operational efficiency.",
            },
            {
                type: "bullet",
                title: "Transform Heritage into Economic Advantage",
                text: "Convert India's ancient agricultural strengths into modern global trade opportunities while ensuring authenticity and sustainability remain protected and rewarded.",
            },
            {
                type: "bullet",
                title: "Enable Verified & Compliant Global Trade",
                text: "Support verified product origins, standardized quality benchmarks, and smooth regulatory compliance to position Indian GI products as premium, responsibly sourced global offerings.",
            },
        ],
    },
];

export default function Mission() {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState("next"); // "next" | "prev"
    const [animating, setAnimating] = useState(false);

    const goTo = (index, dir) => {
        if (animating || index === current) return;
        setDirection(dir);
        setAnimating(true);
        setTimeout(() => {
            setCurrent(index);
            setAnimating(false);
        }, 420);
    };

    const prev = () => goTo(current === 0 ? slides.length - 1 : current - 1, "prev");
    const next = () => goTo(current === slides.length - 1 ? 0 : current + 1, "next");

    const slide = slides[current];

    return (
        <section className={style.section}>
            <div className={style.wrapper}>
                {/* ── LEFT: Carousel Content ── */}
                <div className={style.content}>
                    {/* Slide indicator dots */}
                    {/* <div className={style.dotsRow}>
                        {slides.map((s, i) => (
                            <button
                                key={s.id}
                                className={`${style.dot} ${i === current ? style.dotActive : ""}`}
                                onClick={() => goTo(i, i > current ? "next" : "prev")}
                                aria-label={s.label}
                            />
                        ))}
                    </div> */}

                    {/* Animated block */}
                    <div
                        className={`${style.block} ${animating
                                ? direction === "next"
                                    ? style.exitLeft
                                    : style.exitRight
                                : style.enter
                            }`}
                    >
                        <h3>
                            {slide.emoji} {slide.label.toUpperCase()}
                        </h3>

                        {slide.type === "vision" && (
                            <div className={style.paraGroup}>
                                {slide.content.map((item, i) => (
                                    <p key={i}>{item.text}</p>
                                ))}
                            </div>
                        )}

                        {slide.type === "mission" && (
                            <div className={style.bulletGroup}>
                                {slide.content.map((item, i) => (
                                    <p key={i}>
                                        <span>• {item.title}</span>
                                        <br />
                                        {item.text}
                                    </p>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Arrow controls */}
                    <div className={style.arrows}>
                        <button className={style.arrowBtn} onClick={prev} aria-label="Previous">
                            <FaArrowLeft size={14} />
                        </button>
                        <span className={style.slideCount}>
                            {current + 1} / {slides.length}
                        </span>
                        <button className={style.arrowBtn} onClick={next} aria-label="Next">
                            <FaArrowRight size={14} />
                        </button>
                    </div>
                </div>

                {/* ── RIGHT: Static Image ── */}
                <div className={style.imageWrap}>
                    <Image src={vision} alt="vision" fill className={style.image} />
                </div>
            </div>
        </section>
    );
}