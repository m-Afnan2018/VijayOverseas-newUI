"use client";

import { useState } from "react";
import style from "./FAQ.module.css";

const questionData = [
    {
        question: "What makes Vijay Overseas different from other suppliers?",
        answer:
            "Vijay Overseas is a specialized export company dealing in GI-tagged agricultural products and processed food commodities. We combine authentic regional sourcing, modern processing standards, and reliable global supply to deliver consistent export-quality food products.",
    },
    {
        question: "Are you an agriculture manufacturer or an export supplier? ",
        answer:
            "We operate as an export supplier and manufacturing partner. We collaborate with certified farms, processing units, and food-grade manufacturing facilities to supply GI-certified agricultural produce and processed food products for global markets.",
    },
    {
        question: "What types of products do you deal in?",
        answer:
            "We export GI-tagged agricultural commodities and food-grade products including rice varieties, spices, tea, jaggery, pulses, grains, and other region-specific farm produce processed for international standards.",
    },
    {
        question: "Do you supply bulk quantities for international buyers?",
        answer:
            "Yes. We specialize in bulk manufacturing supply and export shipments tailored for importers, wholesalers, distributors, and global food brands.",
    },
    {
        question: "How do you ensure food quality and safety standards?",
        answer:
            "All products go through strict quality checks, hygienic processing, food-grade packaging, and export compliance procedures to meet international safety and quality standards",
    },
    {
        question: "Do you support sustainable agricultural and ethical sourcing?",
        answer:
            "Yes. We promote sustainable farming, work directly with regional growers, and support ethical sourcing practices that preserve product authenticity and environmental responsibility.",
    },
];


export default function FAQSection() {
    const [activeIndex, setActiveIndex] = useState(0); // first open by default

    const toggleItem = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    return (
        <section className={style.section}>
            <h5>frequently asked questions</h5>
            <h2>
                Find quick answers about <span>Vijay Overseas</span>
            </h2>

            <div className={style.faqList}>
                {questionData.map((q, index) => {
                    const isOpen = index === activeIndex;

                    return (
                        <div
                            key={index}
                            className={`${style.faqItem} ${isOpen ? style.open : ""}`}
                        >
                            <button
                                className={style.question}
                                onClick={() => toggleItem(index)}
                                aria-expanded={isOpen}
                            >
                                {q.question}
                                <span className={style.icon}>{isOpen ? "−" : "+"}</span>
                            </button>

                            <div className={style.answerWrapper}>
                                <p className={style.answer}>{q.answer}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
