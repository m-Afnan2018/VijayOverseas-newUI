import styles from "./page.module.css";
import HeroSection from "@/components/core/Home/HeroSection/HeroSection";
import OurStory from "@/components/core/Home/OurStory/OurStory";
import Mission from "@/components/core/Home/Mission/Mission";
import OurTeam from "@/components/core/Home/OurTeam/OurTeam";
import GITaggedProducts from "@/components/core/Home/GITaggedProducts/GITaggedProducts";
import Blogs from "@/components/core/Home/Blogs/Blogs";
import GITaggedAgriProduct from "@/components/core/Home/GITaggedAgriProduct/GITaggedAgriProduct";
import GITaggedFoodProduct from "@/components/core/Home/GITaggedFoodProduct/GITaggedFoodProduct";

export default function Home() {


    return (
        <div className={styles.page}>
            <HeroSection/>
            <OurStory/>
            <Mission/>
            <OurTeam/>
            <GITaggedProducts/>
            <GITaggedAgriProduct/>
            <GITaggedFoodProduct/>
            <Blogs/>
        </div>
    );
}
