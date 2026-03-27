import { Suspense } from "react";
import BlogDetail from "./BlogDetail";

export default function BlogPage() {
    return (
        <Suspense fallback={<div style={{ padding: "4rem", textAlign: "center" }}>Loading blog post...</div>}>
            <BlogDetail />
        </Suspense>
    );
}
