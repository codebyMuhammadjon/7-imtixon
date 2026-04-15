import HeroSection from "../Components/Sections/HeroSection";
import BannerSection from "../Components/Sections/BannerSection";
import PopularProducts from "../Components/Sections/PopularProducts";
import DailyBestSells from "../Components/Sections/DailyBestSells";
import DealsOfTheDay from "../Components/Sections/DealsOfTheDay";
import TopListsSection from "../Components/Sections/TopListsSection";
import NewsletterBanner from "../Components/Sections/NewsletterBanner";
import FeaturesStrip from "../Components/Sections/FeaturesStrip";

/**
 * Главная страница.
 * Собирает все секции в правильном порядке как на макете.
 */
export default function Home() {
  return (
    <>
      <HeroSection />
      <BannerSection />
      <PopularProducts />
      <DailyBestSells />
      <DealsOfTheDay />
      <TopListsSection />
      <NewsletterBanner />
      <FeaturesStrip />
    </>
  );
}
