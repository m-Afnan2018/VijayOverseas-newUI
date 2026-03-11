import style from './OurStory.module.css';
import story1 from '@/assets/images/about/story1.jpg'
import story2 from '@/assets/images/about/story2.jpg'
import story3 from '@/assets/images/about/story3.jpg'
import Image from 'next/image';

const s1 = story1;
const s2 = story2;
const s3 = story3;

const statsData = [
    {
        name: 'Export shipments',
        value: '12k+'
    }, {
        name: 'supply connections',
        value: '3.5k+'
    }, {
        name: 'Global Markets Served',
        value: '25+'
    }, {
        name: 'Years of Combined Trade Experience',
        value: '8+'
    }
]

// const statsData = [
//     {
//         name: 'Pastries Served',
//         value: '12K+'
//     }, {
//         name: 'Happy Customers',
//         value: '3.5K+'
//     }, {
//         name: 'Signature Recipes',
//         value: '25+'
//     }, {
//         name: 'Years of Craft',
//         value: '8+'
//     }
// ]

export default function OurStory() {
    return (
        <section className={style.section}>
            <h5>About Vijay Overseas</h5>
            <h2>
                Vijay Overseas is a food and agri‑export company from <span>India</span>
            </h2>

            <div className={style.storyGrid}>
                <div className={style.founder}>
                    <Image src={s1} alt="owner" />
                </div>

                <div className={style.storyContent}>
                    <Image src={s2} alt="sugar" />
                    <p>
                        Vijay Overseas is an agricultural export company focused on sourcing and supplying premium GI-tagged agricultural products from India to international markets.
                        <br />
                        <br />
                        India is home to a wide variety of region-specific agricultural products known for their distinctive quality, flavor, and heritage. These products are protected under Geographical Indication (GI) certification, which guarantees their authenticity and origin.
                    </p>
                </div>
            </div>

            {/* <div className={style.stats}>
                {statsData.map((data, index) => (
                    <div key={index} style={{ borderLeft: index === 0 ? 'none' : '1px solid #6541182E' }}>
                        <h1>{data.value}</h1>
                        <h6>{data.name}</h6>
                    </div>
                ))}
            </div>

            <div className={style.vision}>
                <div>
                    <h5>A LEGACY THAT GUIDES OUR TRADE VALUES</h5>
                    <p>
                        Vijay Overseas was founded in loving memory of the founder’s father, whose values of integrity, discipline, and long‑term commitment continue to guide our trade operations. These principles shape how we engage with sourcing partners and global buyers, ensuring ethical practices, transparent trade, and dependable execution across international markets.
                    </p>
                </div>
                <Image src={s3} alt="gudh" />
            </div> */}
        </section>
    );
}
