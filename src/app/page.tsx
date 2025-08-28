"use client";

import React from "react";
import { useState } from "react";
import { BlogDesign } from "@/components/BlogDesign";

// ✅ FIXED: Changed from named export to default export
export default function HomePage() {
  const [isEnglish, setIsEnglish] = useState(true);

  const handleLanguageToggle = () => {
    setIsEnglish(!isEnglish);
    console.log(isEnglish);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#1E3A8A] via-[#3B82F6] to-[#1E40AF]">
      <button
        className="fixed top-4 right-4 z-50 bg-[#b569a5] text-white px-4 py-2 rounded-full shadow-lg hover:bg-[#532746] transition-all duration-300"
        onClick={handleLanguageToggle}
      >
        {isEnglish ? "עברית" : "English"}
      </button>
      {isEnglish ? (
        <BlogDesign language="English" />
      ) : (
        <BlogDesign language="Hebrew" />
      )}
    </div>
  );
}
