"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import style from "./Blogs.module.css";
import folder from "@/assets/images/home/folder.svg";
import { getPublishedBlogs } from "@/lib/api";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1").replace("/api/v1", "");

function resolveImg(src) {
    if (!src) return null;
    return src.startsWith("http") ? src : `${API_BASE}${src}`;
}

export default function AllBlogs() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        getPublishedBlogs({ limit: "100" })
            .then((res) => setBlogs(res.data || []))
            .catch((err) => console.error("Failed to fetch blogs", err));
    }, []);

    return (
        <section className={style.section}>
            <h5>blog post</h5>
            <h2>
                Latest posts and <span>insights</span>
            </h2>

            <div className={style.grid}>
                {blogs.map((blog) => {
                    const image = resolveImg(blog.coverImage);
                    const category = blog.categories?.[0] || "Blog";

                    return (
                        <Link
                            key={blog._id}
                            href={`/blog/?slug=${blog.slug}`}
                            className={style.card}
                        >
                            <div className={style.imageWrap}>
                                {image && (
                                    <Image
                                        src={image}
                                        alt={blog.title}
                                        width={400}
                                        height={250}
                                        unoptimized
                                    />
                                )}
                            </div>

                            <div className={style.content}>
                                <div className={style.meta}>
                                    <Image src={folder} alt="folder" />
                                    <h3>{category}</h3>
                                </div>

                                <h4>{blog.title}</h4>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
