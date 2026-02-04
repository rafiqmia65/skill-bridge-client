import Image from "next/image";
import Link from "next/link";
import HeroImage from "../../../../public/HomePage/heroImage.jpg";

export default function HeroSection() {
  return (
    <section className="bg-linear-to-r from-blue-600 to-blue-400 dark:from-slate-800 dark:to-slate-700 text-white dark:text-yellow-400 py-20">
      <div className="container mx-auto flex flex-col items-center md:flex-row md:justify-between px-4">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl font-bold mb-4">
            Learn from Expert Tutors <br />
            <span className="text-yellow-400 dark:text-yellow-300">
              Anywhere, Anytime
            </span>
          </h1>
          <p className="text-lg mb-6 dark:text-gray-300">
            Find the perfect tutor for your subject and start learning today.
          </p>
          <Link
            href="/tutors"
            className="rounded-lg bg-yellow-400 px-6 py-3 font-semibold text-blue-900 hover:bg-yellow-300 dark:text-slate-900 dark:bg-yellow-300 dark:hover:bg-yellow-400 transition"
          >
            Find a Tutor
          </Link>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0">
          {/* Illustration placeholder */}
          <div className="h-64 w-full bg-yellow-200 rounded-lg dark:bg-yellow-400 md:h-80">
            <Image
              src={HeroImage}
              alt="Hero illustration"
              width={400}
              height={300}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
