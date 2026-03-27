"use client";

import { useEffect, useState } from "react";
import styles from "./NotificationBar.module.css";
import { getActiveNotices } from "@/lib/api";

export default function NotificationBar() {
    const [notice, setNotice] = useState(null);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        getActiveNotices()
            .then((notices) => {
                if (notices.length > 0) setNotice(notices[0]);
            })
            .catch(() => {});
    }, []);

    useEffect(() => {
        if (!notice || !visible) return;

        if (notice.autoHideMs > 0) {
            const timer = setTimeout(() => setVisible(false), notice.autoHideMs);
            return () => clearTimeout(timer);
        }
    }, [notice, visible]);

    useEffect(() => {
        const nav = document.querySelector(".navbar");
        if (!nav) return;

        if (notice && visible) {
            nav.style.top = "50px";
        } else {
            nav.style.top = "0px";
        }

        return () => {
            nav.style.top = "0px";
        };
    }, [notice, visible]);

    if (!notice || !visible) return null;

    return (
        <div className={styles.bar}>
            <h3>{notice.title}</h3>
            <h4>{notice.message}</h4>
        </div>
    );
}
