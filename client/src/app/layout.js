import "./globals.css";
import localFont from "next/font/local";
import Navbar from "@/components/common/Navbar/Navbar";
import Footer from "@/components/common/Footer/Footer";
import ContactUs from "@/components/common/ContactUs/ContactUs";
import NotificationBar from "@/components/common/NotificationBar/NotificationBar";
import OverlayButton from "@/components/common/OverlayButtons/OverlayButtons";

const pilatWide = localFont({
    src: [
        { path: "../../public/fonts/pilat-wide/PilatWide-Thin.woff2", weight: "100" },
        { path: "../../public/fonts/pilat-wide/PilatWide-Light.woff2", weight: "300" },
        { path: "../../public/fonts/pilat-wide/PilatWide-Regular.woff2", weight: "400" },
        { path: "../../public/fonts/pilat-wide/PilatWide-DemiBold.woff2", weight: "600" },
        { path: "../../public/fonts/pilat-wide/PilatWide-Bold.woff2", weight: "700" },
        { path: "../../public/fonts/pilat-wide/PilatWide-Black.woff2", weight: "900" },
    ],
    variable: "--font-pilat",
});

const reyork = localFont({
    src: [
        {
            path: "../../public/fonts/reyork-fonts/reyork-regular.ttf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../../public/fonts/reyork-fonts/reyork-regular.otf",
            weight: "700",
            style: "normal",
        },
    ],
    variable: "--font-reyork",
});

export const metadata = {
    title: {
        default: "Vijay Overseas",
        template: "%s | Vijay Overseas",
    },
    description:
        "Vijay Overseas is a trusted exporter of premium quality jaggery products from India, delivering purity and excellence worldwide.",
    keywords: [
        "Vijay Overseas",
        "jaggery exporter",
        "Indian jaggery",
        "organic jaggery",
        "jaggery manufacturer India",
    ],
    metadataBase: new URL("https://vijayoverseas.in"),

    openGraph: {
        title: "Vijay Overseas",
        description:
            "Premium quality jaggery exporter from India, serving global markets with trust and purity.",
        url: "https://vijayoverseas.in",
        siteName: "Vijay Overseas",
        images: [
            {
                url: "/favicon.png", // you already have favicon/icon files
                width: 512,
                height: 512,
                alt: "Vijay Overseas",
            },
        ],
        locale: "en_IN",
        type: "website",
    },

    twitter: {
        card: "summary_large_image",
        title: "Vijay Overseas",
        description:
            "Exporter of premium quality Indian jaggery products.",
        images: ["/favicon.png"],
    },

    icons: {
        icon: "/favicon.ico",
        apple: "/apple-icon.png",
    },

    robots: {
        index: true,
        follow: true,
    },
};


<meta name="apple-mobile-web-app-title" content="Vijay Overseas" />

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${reyork.variable} ${pilatWide.variable}`}>
                <OverlayButton />
                <NotificationBar />
                <Navbar />
                {children}
                <ContactUs />
                <Footer />
            </body>
        </html>
    );
}
