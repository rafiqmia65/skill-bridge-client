import FeaturedTutors from "@/components/modules/HomePage/FeaturedTutors/FeaturedTutors";
import HeroSection from "@/components/modules/HomePage/HeroSection/HeroSection";
import SearchBar from "@/components/modules/HomePage/TutorSearchSection/TutorSearchSection";

export default async function Home() {
  return (
    <div>
      <HeroSection />
      <SearchBar />
      <FeaturedTutors />
    </div>
  );
}
