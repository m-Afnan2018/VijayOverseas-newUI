"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getBlogBySlug } from "@/lib/api";
import styles from "./BlogDetail.module.css";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1").replace("/api/v1", "");

function resolveImg(src) {
    if (!src) return null;
    return src.startsWith("http") ? src : `${API_BASE}${src}`;
}

export default function BlogDetail() {
    const searchParams = useSearchParams();
    const slug = searchParams.get("slug");

    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!slug) {
            setError("No blog specified.");
            setLoading(false);
            return;
        }

        getBlogBySlug(slug)
            .then(setBlog)
            .catch(() => setError("Blog post not found."))
            .finally(() => setLoading(false));
    }, [slug]);

    if (loading) {
        return <div className={styles.state}>Loading...</div>;
    }

    if (error || !blog) {
        return (
            <div className={styles.state}>
                <p>{error || "Blog post not found."}</p>
                <Link href="/blogs" className={styles.backLink}>← Back to Blogs</Link>
            </div>
        );
    }

    const coverImg = resolveImg(blog.coverImage);

    return (
        <article className={styles.article}>
            <div className={styles.container}>
                {/* Back link */}
                <Link href="/blogs" className={styles.backLink}>← Back to Blogs</Link>

                {/* Categories */}
                {blog.categories?.length > 0 && (
                    <div className={styles.categories}>
                        {blog.categories.map((cat) => (
                            <span key={cat} className={styles.category}>{cat}</span>
                        ))}
                    </div>
                )}

                {/* Title */}
                <h1 className={styles.title}>{blog.title}</h1>

                {/* Meta */}
                <div className={styles.meta}>
                    <span>{blog.author || "Vijay Overseas Team"}</span>
                    {blog.publishedAt && (
                        <span>{new Date(blog.publishedAt).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</span>
                    )}
                    {blog.readTime > 0 && <span>{blog.readTime} min read</span>}
                </div>

                {/* Cover Image */}
                {coverImg && (
                    <div className={styles.coverWrap}>
                        <Image
                            src={coverImg}
                            alt={blog.title}
                            fill
                            className={styles.cover}
                            sizes="(max-width: 768px) 100vw, 800px"
                            unoptimized
                            priority
                        />
                    </div>
                )}

                {/* Excerpt */}
                {blog.excerpt && <p className={styles.excerpt}>{blog.excerpt}</p>}

                {/* Content */}
                {blog.content && (
                    <div
                        className={styles.content}
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />
                )}

                {/* Tags */}
                {blog.tags?.length > 0 && (
                    <div className={styles.tags}>
                        {blog.tags.map((tag) => (
                            <span key={tag} className={styles.tag}>{tag}</span>
                        ))}
                    </div>
                )}
            </div>
        </article>
    );
}
