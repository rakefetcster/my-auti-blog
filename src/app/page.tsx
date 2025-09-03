"use client";

import React from "react";
import { useState, useEffect } from "react";
import { BlogDesign } from "@/components/BlogDesign";

// ✅ FIXED: Changed from named export to default export
export default function HomePage() {
  const [isEnglish, setIsEnglish] = useState(true);

  // Persist language choice in URL parameters when admin mode is active
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get("lang");
    const adminParam = urlParams.get("admin");

    // If there's a language parameter, use it
    if (langParam === "he" || langParam === "hebrew") {
      setIsEnglish(false);
    } else if (langParam === "en" || langParam === "english") {
      setIsEnglish(true);
    }
  }, []);

  const handleLanguageToggle = () => {
    const newIsEnglish = !isEnglish;
    setIsEnglish(newIsEnglish);

    // If admin parameter exists, preserve it while switching language
    const urlParams = new URLSearchParams(window.location.search);
    const adminParam = urlParams.get("admin");

    if (adminParam) {
      // Update URL to include both admin and language parameters
      const newLang = newIsEnglish ? "en" : "he";
      const newUrl = `${window.location.pathname}?admin=${adminParam}&lang=${newLang}`;
      window.history.replaceState({}, "", newUrl);
    }

    console.log("Language switched to:", newIsEnglish ? "English" : "Hebrew");
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
