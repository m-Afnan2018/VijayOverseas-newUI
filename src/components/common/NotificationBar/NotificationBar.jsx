"use client";

import { useEffect, useState } from "react";
import styles from "./NotificationBar.module.css";

export default function NotificationBar() {
    const [data, setData] = useState(null);
    const [visible, setVisible] = useState(true);

    // fetch config from public folder
    useEffect(() => {
        fetch("/notification.json", { cache: "no-store" })
            .then((res) => res.json())
            .then((json) => setData(json))
            .catch(() => { });
    }, []);

    // date logic + auto hide
    useEffect(() => {
        if (!data || !data.enabled) return;

        const now = new Date();
        const start = new Date(`${data.start}T00:00:00`);
        const end = new Date(`${data.end}T23:59:59`);

        if (now < start || now > end) return;

        if (data.autoHideMs > 0) {
            const timer = setTimeout(() => {
                setVisible(false);
            }, data.autoHideMs || 6000);
        }
    }, [data]);

    useEffect(() => {
        const nav = document.querySelector(".navbar");
        if (!nav) return;

        if (data && data.enabled && visible) {
            nav.style.top = "50px";
        } else {
            nav.style.top = "0px";
        }

        return () => {
            nav.style.top = "0px";
        };
    }, [data, visible]);

    if (!data || !data.enabled || !visible) return null;

    return (
        <div className={styles.bar}>
            <h3>{data.heading}</h3>
            <h4>{data.description}</h4>
        </div>
    );
}
