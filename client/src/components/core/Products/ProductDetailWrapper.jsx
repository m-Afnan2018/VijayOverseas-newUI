"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getProductBySlug } from "@/lib/api";
import { getProductTestimonials } from "@/lib/testimonials";
import ProductDetail from "./ProductDetail/ProductDetail";
import ProductTabs from "./ProductTabs/ProductTabs";
import ProductTestimonials from "./ProductTestimonials/ProductTestimonials";

export default function ProductDetailWrapper() {
    const searchParams = useSearchParams();
    const slug = searchParams.get("slug");

    const [product, setProduct] = useState(null);
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!slug) {
            setError("No product specified.");
            setLoading(false);
            return;
        }

        getProductBySlug(slug)
            .then((p) => {
                setProduct(p);
                return getProductTestimonials(p._id);
            })
            .then(setTestimonials)
            .catch(() => setError("Product not found."))
            .finally(() => setLoading(false));
    }, [slug]);

    if (loading) {
        return (
            <div style={{ padding: "4rem", textAlign: "center" }}>
                Loading product...
            </div>
        );
    }

    if (error || !product) {
        return (
            <div style={{ padding: "4rem", textAlign: "center" }}>
                {error || "Product not found."}
            </div>
        );
    }

    return (
        <>
            <ProductDetail product={product} />
            <ProductTabs product={product} />
            <ProductTestimonials testimonials={testimonials} />
        </>
    );
}
