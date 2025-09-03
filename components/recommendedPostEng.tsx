// import React from "react";
import Image from "next/image"; // Make sure to import Image component

// Define proper types for the props
interface RecommendedEngProps {
  callback: (value: boolean) => void;
}

const RecommendedEng = (props: RecommendedEngProps) => {
  // This component displays a recommended post section
  return (
    <section className="mb-16">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="p-8 md:p-12">
            <span className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              Featured Post
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
              My Journey as a Parent of a Child with Autism
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Every day brings new challenges, but also opportunities for
              learning and growth. I want to share my story with you, the
              difficulties and the beautiful moments.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">8 min read</span>
              <button
                onClick={() => props.callback(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Read More →
              </button>
            </div>
          </div>

          {/* תמונה מימין או משמאל לפי העיצוב */}
          <div className="relative h-64 md:h-auto">
            <Image
              src="/images/ElegantBloom.png" // שימי פה את התמונה שלך
              alt="המסע שלי"
              fill // Use 'fill' instead of 'layout="fill"' for Next.js 13+
              style={{ objectFit: "cover" }} // Use style instead of objectFit prop
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecommendedEng;
