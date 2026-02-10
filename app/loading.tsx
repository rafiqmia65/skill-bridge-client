"use client";

import React from "react";

const LoadingPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex space-x-2">
        {/* Three bouncing dots */}
        <span className="w-4 h-4 bg-yellow-500 rounded-full animate-bounce"></span>
        <span className="w-4 h-4 bg-yellow-500 rounded-full animate-bounce animation-delay-200"></span>
        <span className="w-4 h-4 bg-yellow-500 rounded-full animate-bounce animation-delay-400"></span>
      </div>
    </div>
  );
};

export default LoadingPage;
