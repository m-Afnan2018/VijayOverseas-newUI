import Image from "next/image";
import callIcon from "@/assets/images/common/phone.svg";
import messageIcon from "@/assets/images/common/mail.svg";
import style from "./ContactUs.module.css";

export default function ContactUs() {
    return (
        <section className={style.section}>
            <div className={style.wrapper}>
                {/* LEFT */}
                <div className={style.left}>
                    <h2>
                        Get In <span>Touch !</span>
                    </h2>

                    <p>
                        Reach out to us to explore export opportunities and learn more about our natural, organic products from India.
                    </p>

                    <div className={style.contactItem}>
                        <Image src={callIcon} alt="call-icon" />
                        <div>
                            <a href="tel:+919217848056">+91 9217848056</a>
                            {/* <a href="tel:+359893054546">+359 893 054 546 (Export & International Buyers)</a> */}
                        </div>
                    </div>

                    <div className={style.contactItem}>
                        <Image src={messageIcon} alt="message-icon" />
                        <div>
                            <a href="mailto:info@vijayoverseas.com">info@vijayoverseas.com</a>
                            {/* <a href="mailto:exports@vijayoverseas.com">exports@vijayoverseas.com</a> */}
                        </div>
                    </div>

                    <div className={style.business}>
                        <h4>Business Hours</h4>
                        <ul>
                            <li>Monday to Saturday: 10:00 AM – 6:00 PM (IST)</li>
                            <li>Sunday & public holidays: Queries accepted by email/WhatsApp; responses on the next working day.</li>
                        </ul>
                    </div>
                </div>

                {/* RIGHT */}
                <form className={style.form} action="https://formsubmit.co/info@vijayoverseas.com" method="POST" >
                    <div className={style.row}>
                        <input type="text" name="firstName" placeholder="First Name" />
                        <input type="text" name="lastName" placeholder="Last Name" />
                    </div>

                    <input type="email" name="email" placeholder="Email Address" />

                    <div className={style.row}>
                        <input type="text" name="contactNumber" placeholder="Contact No" />
                        <input type="text" name="zip code" placeholder="Zip/Postal" />
                    </div>

                    <textarea type="message" placeholder="Message"></textarea>

                    <button type="submit">Submit</button>
                </form>
            </div>
        </section>
    );
}
