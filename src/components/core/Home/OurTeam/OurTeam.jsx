'use client'

import { useState } from 'react'
import styles from './OurTeam.module.css'
import team1 from '@/assets/images/team-members/Somya.webp'
import team2 from '@/assets/images/team-members/Natasha.webp'
import team3 from '@/assets/images/team-members/Sandeep.webp'
import team_bg1 from '@/assets/images/team-members/Somya-small.webp'
import team_bg2 from '@/assets/images/team-members/Natasha-small.webp'
import team_bg3 from '@/assets/images/team-members/Sandeep-small.webp'
// import team1 from '@/assets/images/home/team1.png'
// import team2 from '@/assets/images/home/team2.png'
// import team3 from '@/assets/images/home/team3.png'
// import team4 from '@/assets/images/home/team4.png'
// import team_bg1 from '@/assets/images/home/team_bg1.jpg'
// import team_bg2 from '@/assets/images/home/team_bg2.jpg'
// import team_bg3 from '@/assets/images/home/team_bg3.jpg'
// import team_bg4 from '@/assets/images/home/team_bg4.jpg'
import Image from 'next/image';

const teams = [
    {
        image: team1,
        thumbnail: team_bg1,
        name: "Somya Sharma",
        designation: "Founder",
        description: `Somya Sharma is the visionary Founder of Vijay Overseas, a brand rooted in purity, honesty, and respect for nature. Inspired by her father, Mr. Vijay Kumar, and his lifelong belief in a healthy lifestyle supported by natural foods, Somya set out to build a company that restores trust in traditional, unadulterated products amid the growing prevalence of food intolerance and lifestyle-related health concerns.\n\n
        he envisions Vijay Overseas as more than a food export company—it is a movement that reconnects people with natural flavours, ayurvedic wisdom, and sustainable living. By taking   uthentic Indian products to global markets, Somya aims to prove that true progress does not come from abandoning our roots, but from evolving them responsibly. Her leadership is guided     y the belief that real growth lies in preserving purity, nurturing human well-being, and staying deeply connected to nature.`,
    },
    {
        image: team2,
        thumbnail: team_bg2,
        name: "Dr. Natasha Sharma",
        designation: "Strategic Advisor – Vijay Overseas",
        description: `Dr. Natasha Sharma serves as the Strategic Advisor at Vijay Overseas, guiding the firm’s business strategy, market positioning, and growth initiatives in the organic jaggery sector. Drawing on her expertise in organizational strategy, people systems, and business communication, she supports decision-making related to export readiness, supply chain alignment, brand development, and long-term scalability. Her advisory role focuses on integrating ethical sourcing, quality compliance, and sustainability with profitability and market expansion, enabling Vijay Overseas to compete effectively in domestic and international markets while delivering premium organic jaggery. `,
    },
    {
        image: team3,
        thumbnail: team_bg3,
        name: "Mr. Sandeep Kumar",
        designation: "International business and expansion advisor",
        description: `Mr. Sandeep Kumar is an International Business and Expansion Advisor with expertise in helping companies scale across global markets. He specializes in market entry strategies, cross-border operations, international partnerships, and business localization, enabling organizations to expand sustainably and competitively. With a strong understanding of global trade dynamics, regulatory frameworks, and growth planning, he supports businesses in identifying new opportunities, mitigating risks, and building long-term international presence.`,
    },
    // {
    //     image: team4,
    //     thumbnail: team_bg4,
    //     name: "Mr. Rahul Kasana",
    //     designation: "Advisor in the field of sports",
    //     description: `Mr. Rahul Kasana is a Sports Advisor with a strong focus on athlete development, sports management, and performance strategy. He provides guidance on career planning, training frameworks, sports governance, and talent nurturing, helping individuals and organizations make informed decisions in the competitive sports ecosystem. With a practical understanding of the sports industry, he supports sustainable growth, professionalism, and long-term success in sports initiatives.`,
    // },
]

export default function OurTeam() {
    const [current, setCurrent] = useState(0);

    const next = () => {
        setCurrent((current + 1) % 3)
    }
    const prev = () => {
        setCurrent((current - 1 + 3) % 3)
    }

    return <div className={styles.OurTeam}>
        {[...Array(30)].map((_, i) => (
            <div className={`${styles.lines} ${styles.horizontal}`} style={{ top: `${i * 70}px` }} key={`h-${i}`}></div>
        ))}
        {[...Array(30)].map((_, i) => (
            <div className={`${styles.lines} ${styles.verticle}`} style={{ left: `${i * 70}px` }} key={`v-${i}`}></div>
        ))}

        <h2 className={styles.mainTitle}>Our Trusted Network</h2>
        <h5 style={{fontWeight: 600, letterSpacing: '1px', textAlign: 'center'}}>Subheading: Strong relationships with partners, producers, and global associates who power our GI trade ecosystem.</h5>

        <Image width={'10000'} height={'10000'} src={teams[current].image} alt={teams[current].name} className={styles.mainImage} />
        <div className={styles.container}>
            <button className={`${styles.arrowBtn} ${styles.left}`} onClick={prev} aria-label="Previous team member">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
            <div className={styles.details}>
                <h2 className={styles.name}>{teams[current].name}</h2>
                <h3 className={styles.designation}>{teams[current].designation}</h3>
                <p className={styles.description}>{teams[current].description}</p>
            </div>

            <button className={`${styles.arrowBtn} ${styles.right}`} onClick={next} aria-label="Next team member">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
        </div>

        <div className={styles.thumbnails}>
            {teams.map((member, index) => (
                <div
                    key={index}
                    className={`${styles.thumbnail} ${current === index ? styles.active : ''}`}
                    onClick={() => setCurrent(index)}
                >
                    <Image width={'50'} height={'50'} src={member.thumbnail} alt={member.name} />
                    <div className={styles.thumbnailInfo}>
                        <p className={styles.thumbnailName}>{member.name}</p>
                        <p className={styles.thumbnailDesignation}>{member.designation}</p>
                    </div>
                </div>
            ))}
        </div>

    </div>
}