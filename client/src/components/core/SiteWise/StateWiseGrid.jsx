"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./StateWiseGrid.module.css";

const states = [
    {
        id: 1,
        name: "Jammu and Kashmir",
        slug: "jammu-and-kashmir",
        image: "https://images.unsplash.com/photo-1566837945700-30057527ade0?w=800&h=600&fit=crop",
        featured: false,
    },
    {
        id: 2,
        name: "Himachal Pradesh",
        slug: "himachal-pradesh",
        image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&h=600&fit=crop",
        featured: true,
    },
    {
        id: 3,
        name: "Uttarakhand",
        slug: "uttarakhand",
        image: "https://images.unsplash.com/photo-1580289143186-03f54224aad6?w=800&h=600&fit=crop",
        featured: false,
    },
    {
        id: 4,
        name: "Manipur",
        slug: "manipur",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
        featured: false,
    },
    {
        id: 5,
        name: "Nagaland",
        slug: "nagaland",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        featured: false,
    },
    {
        id: 6,
        name: "Assam",
        slug: "assam",
        image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&h=600&fit=crop",
        featured: false,
    },
    {
        id: 7,
        name: "Rajasthan",
        slug: "rajasthan",
        image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&h=600&fit=crop",
        featured: false,
    },
    {
        id: 8,
        name: "Uttar Pradesh",
        slug: "uttar-pradesh",
        image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&h=600&fit=crop",
        featured: false,
    },
    {
        id: 9,
        name: "Bihar",
        slug: "bihar",
        image: "https://images.unsplash.com/photo-1545506419-8e8de8b4f2af?w=800&h=600&fit=crop",
        featured: false,
    },
    {
        id: 10,
        name: "West Bengal",
        slug: "west-bengal",
        image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop",
        featured: false,
    },
    {
        id: 11,
        name: "Maharashtra",
        slug: "maharashtra",
        image: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=800&h=600&fit=crop",
        featured: false,
    },
    {
        id: 12,
        name: "Kerala",
        slug: "kerala",
        image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&h=600&fit=crop",
        featured: false,
    },
    {
        id: 13,
        name: "Tamil Nadu",
        slug: "tamil-nadu",
        image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600&fit=crop",
        featured: false,
    },
    {
        id: 14,
        name: "Karnataka",
        slug: "karnataka",
        image: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=800&h=600&fit=crop",
        featured: false,
    },
    {
        id: 15,
        name: "Gujarat",
        slug: "gujarat",
        image: "https://images.unsplash.com/photo-1609947017136-9daf32a1f0c2?w=800&h=600&fit=crop",
        featured: false,
    },
    {
        id: 16,
        name: "Punjab",
        slug: "punjab",
        image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=800&h=600&fit=crop",
        featured: false,
    },
    {
        id: 17,
        name: "Odisha",
        slug: "odisha",
        image: "https://images.unsplash.com/photo-1609766418204-94aae0ecfdfc?w=800&h=600&fit=crop",
        featured: false,
    },
    {
        id: 18,
        name: "Madhya Pradesh",
        slug: "madhya-pradesh",
        image: "https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=800&h=600&fit=crop",
        featured: false,
    },
];

export default function StateWiseGrid() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                {/* Header */}
                <div className={styles.header}>
                    <h2 className={styles.subtitle}>Shop Gi TAGGED Products of India, State Wise</h2>
                    <h2 className={styles.title}>AUTHENTICITY GUARANTEED</h2>
                </div>

                {/* Grid */}
                <div className={styles.grid}>
                    {states.map((state) => (
                        <Link
                            key={state.id}
                            href={`/state/${state.slug}`}
                            className={`${styles.card} ${state.featured ? styles.featured : ""}`}
                        >
                            <Image
                                src={state.image}
                                alt={state.name}
                                fill
                                className={styles.image}
                                sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                            {/* Subtle bottom shadow so text is readable */}
                            <div className={styles.shadow} />
                            <span className={styles.stateName}>{state.name.toUpperCase()}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}