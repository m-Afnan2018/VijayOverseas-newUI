import style from './Mission.module.css'
import Image from "next/image";
import vision from '@/assets/images/about/mission.png'


export default function Mission() {
    return <section className={style.section}>
        <div className={style.wrapper}>
            <div className={style.content}>
                {/* <h5>Our Vision & Mission</h5>
                <h2>BUILDING A GLOBAL BRIDGE OF PURE, <span>NATURAL FOOD</span></h2> */}

                <div className={style.block}>
                    <h3>🌟 Our Vision</h3>
                    <p>
                        India’s agricultural heritage is among the oldest and most diverse in the world, shaped by centuries of region-specific cultivation practices, ecological wisdom, and community-driven production systems.
                        <br />
                        <br />
                        From traditional water management and seed preservation techniques to climate-responsive cropping patterns, Indian agriculture reflects deep principles of sustainability and balanced resource use.
                        <br />
                        <br />
                        Geographical Indication (GI) products carry this legacy forward — representing unique soil and climatic conditions while preserving intergenerational knowledge that sustains biodiversity and rural livelihoods.
                        <br />
                        <br />
                        We envision establishing India as a global hub for authentic GI agricultural trade through a secure, transparent, and fully traceable digital ecosystem that protects both economic value and cultural integrity.
                    </p>
                </div>

                <div className={style.block}>
                    <h3>🎯 Our Mission</h3>
                    <p>
                        <span>• Build a Unified Digital Trade Ecosystem</span>
                        Digitally integrate GI producers, exporters, regulators, certification bodies, and global buyers into a single government-supported trade exchange platform.
                    </p>
                    <p>
                        <span>• Strengthen Trust, Traceability & Efficiency</span>
                        Bridge coordination and information gaps to create a seamless value chain that improves transparency, reliability, and operational efficiency.
                    </p>
                    <p>
                        <span>• Transform Heritage into Economic Advantage</span>
                        Convert India’s ancient agricultural strengths into modern global trade opportunities while ensuring authenticity and sustainability remain protected and rewarded.
                    </p>
                    <p>
                        <span>• Enable Verified & Compliant Global Trade</span>
                        Support verified product origins, standardized quality benchmarks, and smooth regulatory compliance to position Indian GI products as premium, responsibly sourced global offerings.
                    </p>

                    {/* <p>
                        <span>• Build Export‑Ready Trade Systems:</span> Establish structured import–export operations that meet international quality, compliance, and documentation standards.
                    </p>
                    <p>
                        <span>• Connect Indian Sourcing to Global Demand:</span> Create a reliable bridge between Indian producers and international buyers through transparent, scalable trade practices.
                    </p>
                    <p>
                        <span>• Ensure Consistency & Compliance: </span> Maintain batch consistency, hygienic handling, and destination‑specific compliance across every shipment.
                    </p> */}
                </div>
            </div>

            <div className={style.imageWrap}>
                <Image src={vision} alt="vision" />
            </div>
        </div>
    </section>
}