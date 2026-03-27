"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProductsByState } from "@/lib/api";
import styles from "./StateProducts.module.css";

const BASE = process.env.NEXT_PUBLIC_API_URL
  ? process.env.NEXT_PUBLIC_API_URL.replace("/api/v1", "")
  : "http://localhost:5000";

export default function StateProducts({ stateName }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductsByState(stateName, 20)
      .then(setProducts)
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [stateName]);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.subtitle}>GI Tagged Products from</p>
          <h1 className={styles.title}>{stateName.toUpperCase()}</h1>
        </div>

        {loading && (
          <div className={styles.state}>
            {[...Array(4)].map((_, i) => (
              <div key={i} className={styles.skeleton} />
            ))}
          </div>
        )}

        {!loading && products.length === 0 && (
          <div className={styles.empty}>
            <p>No products found for {stateName} yet.</p>
            <Link href="/state-wise" className={styles.backLink}>← Back to all states</Link>
          </div>
        )}

        {!loading && products.length > 0 && (
          <div className={styles.grid}>
            {products.map((product) => {
              const imgSrc = product.images?.[0];
              const url = imgSrc
                ? imgSrc.startsWith("http") ? imgSrc : `${BASE}${imgSrc}`
                : null;

              return (
                <Link key={product._id} href={`/product-details?slug=${product.slug}`} className={styles.card}>
                  <div className={styles.imageWrap}>
                    {url ? (
                      <Image src={url} alt={product.name} fill className={styles.image} sizes="(max-width:600px) 100vw, 280px" />
                    ) : (
                      <div className={styles.noImage}>📦</div>
                    )}
                  </div>
                  <div className={styles.info}>
                    {product.category?.name && (
                      <span className={styles.category}>{product.category.name}</span>
                    )}
                    <h3 className={styles.name}>{product.name}</h3>
                    {product.region && (
                      <p className={styles.region}>{product.region}</p>
                    )}
                    {product.price > 0 && (
                      <p className={styles.price}>₹{product.price} / {product.unit}</p>
                    )}
                    <span className={`${styles.badge} ${product.status === "In Stock" ? styles.inStock : styles.outStock}`}>
                      {product.status}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        <div className={styles.footer}>
          <Link href="/state-wise" className={styles.backLink}>← Back to all states</Link>
        </div>
      </div>
    </section>
  );
}
