"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import style from "./Blogs.module.css";
import folder from "@/assets/images/home/folder.svg";

export default function Blogs() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch("https://api.vijayoverseas.com/wp-json/wp/v2/posts?_embed&per_page=4")
            .then((res) => res.json())
            .then(setBlogs)
            .catch((err) => console.error("Failed to fetch blogs", err));
    }, []);

    return (
        <section className={style.section}>
            {/* <h5>blog post</h5> */}
            {/* <h2>
                Latest posts and <span>insights</span>
            </h2> */}

            <h2>Blogs</h2>

            <div className={style.grid}>
                {blogs.map((blog) => {
                    const image =
                        blog._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

                    const category =
                        blog._embedded?.["wp:term"]?.[0]?.[0]?.name || "Blog";

                    return (
                        <Link
                            key={blog.id}
                            href={`/blog/?slug=${blog.slug}`}
                            className={style.card}
                        >
                            <div className={style.imageWrap}>
                                {image && (
                                    <Image
                                        src={image}
                                        alt={blog.title.rendered}
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

                                <h4
                                    dangerouslySetInnerHTML={{
                                        __html: blog.title.rendered,
                                    }}
                                />
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
