// TutorsBanner.jsx
import React from "react";

const TutorsBanner = () => {
  return (
    <section className="relative bg-linear-to-r from-blue-600 to-blue-400 dark:from-slate-800 dark:to-slate-700 overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute -top-32 -left-32 w-full h-96 bg-yellow-400 opacity-20 rounded-full mix-blend-multiply animate-pulse"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-pink-500 opacity-20 rounded-full mix-blend-multiply animate-pulse"></div>

      <div className="container mx-auto px-6 py-24 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
          Browse Tutors
        </h1>
        <p className="text-lg md:text-2xl text-white/90 mb-8">
          Find the perfect tutor to level up your skills and achieve your goals.
        </p>
      </div>
    </section>
  );
};

export default TutorsBanner;
