// src/components/HeaderSection.tsx
import React from "react";
import { Post } from "../src/types/post";
import { formatDate } from "../src/utils/blogUtils";

interface HeaderSectionProps {
  lastPost: Post | null;
  language?: string;
}

export const HeaderSection: React.FC<HeaderSectionProps> = ({
  lastPost,
  language,
}) => {
  const getLastPostData = () => {
    if (!lastPost) {
      if (language === "Hebrew") {
        return {
          headline: "הפוסט האחרון שלי",
          summary: "מחשבות וחוויות מהחיים",
          date: "אין תאריך עדיין",
        };
      } else {
        return {
          headline: "My Last Post",
          summary: "Thoughts and experiences from life",
          date: "No date yet",
        };
      }
    }

    return {
      headline: lastPost.headline,
      summary: lastPost.summary,
      date: formatDate(lastPost.date),
    };
  };

  const postData = getLastPostData();

  return (
    <>
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0  bg-gradient-to-r bg-gradient-to-r bg-gradient-to-r from-[#F8D6EB] via-[#D26BB3] via-[#8B2C78] via-[#D26BB3] to-[#F8D6EB] bg-gradient-to-br"></div>
        {/* from-[#F2CCE4] to-[##B569A5] */}
        <div className="relative px-6 py-16">
          {language === "Hebrew" ? (
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-[#000001] mb-6 leading-tight">
                מסע בספקטרום
              </h1>
              <p className="text-xl text-[#000001]/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                בלוג על מחשבות והאתגרים שעומדים בפני הורים לילדים עם אוטיזם
              </p>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-[#000001] mb-6 leading-tight">
                Journey Through the Spectrum
              </h1>
              <p className="text-xl text-[#000001]/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                A blog about thoughts and challenges faced by parents of
                children with autism
              </p>
            </div>
          )}
        </div>
      </header>

      {/* Full Width Black Strip - No spacing */}
      <section className="text-white bg-[#665865] -mt-0">
        <div className="w-full mx-auto px-6">
          <div className="flex items-center justify-between py-6 px-4">
            <div className="flex items-center gap-4">
              <span className="text-2xl">📖</span>
              <div>
                <h3 className="font-bold text-lg">{postData.headline}</h3>
                <p className="text-gray-300 text-sm max-w-s">
                  {postData.summary}
                </p>
              </div>
            </div>
            {language === "Hebrew" ? (
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-300">
                <span>עדכון אחרון:</span>
                <span className="text-white font-medium">{postData.date}</span>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-300">
                <span>Last Updated:</span>
                <span className="text-white font-medium">{postData.date}</span>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
