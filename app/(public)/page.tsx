import FeaturedTutors from "@/components/modules/Public/HomePage/FeaturedTutors/FeaturedTutors";
import HeroSection from "@/components/modules/Public/HomePage/HeroSection/HeroSection";
import SearchBar from "@/components/modules/Public/HomePage/TutorSearchSection/TutorSearchSection";

export default async function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturedTutors />
      <SearchBar />
    </div>
  );
}
