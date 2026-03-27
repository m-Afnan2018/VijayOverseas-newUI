'use client'

import Image from "next/image"
import whatsappImage from '@/assets/images/common/whatsapp.png'

const openWhatsApp = () => {
    const phone = "919217848056"; // ← your WhatsApp number (no +, no spaces)

    const message = `
Hello, I am interested in products:
Please share more details.
    `;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
};

export default function OverlayButton() {
    return  <Image onClick={openWhatsApp} className="whatsappBtn" src={whatsappImage} alt="Whatsapp" style={{ position: 'fixed' }} />
}