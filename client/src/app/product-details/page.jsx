import { Suspense } from "react";
import ProductDetailWrapper from "@/components/core/Products/ProductDetailWrapper";

export default function ProductDetailsPage() {
    return (
        <Suspense fallback={<div style={{ padding: "4rem", textAlign: "center" }}>Loading product...</div>}>
            <ProductDetailWrapper />
        </Suspense>
    );
}
