import TutorsBanner from "./TutorsBanner/TutorsBanner";
import TutorsSection from "./TutorsSection/TutorsSection";

export default async function TutorsPage() {
  return (
    <main>
      {/* Banner Section */}
      <TutorsBanner />

      <TutorsSection />
    </main>
  );
}
