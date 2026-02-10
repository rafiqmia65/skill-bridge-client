"use client";

import React from "react";
import Link from "next/link";

const ErrorPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <div className="text-center max-w-md">
        {/* Error Icon */}
        <div className="mb-6">
          <svg
            className="w-24 h-24 mx-auto text-yellow-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
            />
          </svg>
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-4">
          Oops!
        </h1>

        {/* Message */}
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Something went wrong. Please try refreshing the page or go back home.
        </p>

        {/* Go Home Button */}
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
