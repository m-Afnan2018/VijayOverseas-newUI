"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import styles from "./GITaggedProducts.module.css";

const regions = [
  {
    id: 1,
    name: "Jammu & Kashmir",
    slug: "jammu-and-kashmir",
    image:
      "https://images.unsplash.com/photo-1566837945700-30057527ade0?w=300&h=250&fit=crop",
  },
  {
    id: 2,
    name: "Himachal Pradesh",
    slug: "himachal-pradesh",
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=300&h=250&fit=crop",
  },
  {
    id: 3,
    name: "Uttarakhand",
    slug: "uttarakhand",
    image:
      "https://images.unsplash.com/photo-1580289143186-03f54224aad6?w=300&h=250&fit=crop",
  },
  {
    id: 4,
    name: "Manipur",
    slug: "manipur",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=250&fit=crop",
  },
  {
    id: 5,
    name: "Nagaland",
    slug: "nagaland",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=250&fit=crop",
  },
  {
    id: 6,
    name: "Assam",
    slug: "assam",
    image:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=300&h=250&fit=crop",
  },
  {
    id: 7,
    name: "Rajasthan",
    slug: "rajasthan",
    image:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=300&h=250&fit=crop",
  },
  {
    id: 8,
    name: "Uttar Pradesh",
    slug: "uttar-pradesh",
    image:
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=300&h=250&fit=crop",
  },
  {
    id: 9,
    name: "Bihar",
    slug: "bihar",
    image:
      "https://images.unsplash.com/photo-1545506419-8e8de8b4f2af?w=300&h=250&fit=crop",
  },
  {
    id: 10,
    name: "West Bengal",
    slug: "west-bengal",
    image:
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=250&fit=crop",
  },
  {
    id: 11,
    name: "Maharashtra",
    slug: "maharashtra",
    image:
      "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=300&h=250&fit=crop",
  },
  {
    id: 12,
    name: "Kerala",
    slug: "kerala",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=300&h=250&fit=crop",
  },
];

export default function GITaggedProducts() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2>GI TAGGED PRODUCTS</h2>
          <p className={styles.description}>
            Discover India&apos;s finest GI-certified agricultural products
            rooted in tradition. Grown in authentic regions known for their
            unique soil, climate, and expertise. Delivered worldwide with trust,
            traceability, and premium quality assurance.
          </p>
        </div>

        {/* Slider */}
        <div className={styles.sliderWrapper}>
          <div className={styles.slider} ref={scrollRef}>
            {regions.map((region) => (
              <Link key={region.id} href={`/state/${region.slug}`} className={styles.card}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={region.image}
                    alt={region.name}
                    fill
                    className={styles.image}
                    sizes="(max-width: 768px) 140px, 160px"
                  />
                </div>
                <p className={styles.regionName}>{region.name}</p>
              </Link>
            ))}
          </div>

          {/* Arrow Buttons */}
          <div className={styles.arrows}>
            <button
              className={styles.arrowBtn}
              onClick={() => scroll("left")}
              aria-label="Scroll left"
            >
              <FaArrowLeft size={14} />
            </button>
            <button
              className={styles.arrowBtn}
              onClick={() => scroll("right")}
              aria-label="Scroll right"
            >
              <FaArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
