import { Post } from "../src/types/post";

import {
  BG_COLORS_BY_CATEGORY,
  BG_COLORS_BY_CATEGORY_EN,
  ICONS_BY_CATEGORY,
  ICONS_BY_CATEGORY_EN,
  CATEGORIES,
  CATEGORIES_EN,
} from "@/src/constants/blogConstants";
import Link from "next/link";
import { useMemo } from "react";
import { getLastPostDataByCategory } from "../src/utils/blogUtils";

interface PostsGridProps {
  allPosts: Post[];
  language?: string;
}

export const PostsGrid: React.FC<PostsGridProps> = ({ allPosts, language }) => {
  console.log("language PostsGrid:", language);

  const posts = useMemo(() => {
    const categories = language === "Hebrew" ? CATEGORIES : CATEGORIES_EN;
    const isHebrew = language === "Hebrew";

    return categories.map((category) => {
      const postData = getLastPostDataByCategory(allPosts, category);

      return {
        _id: postData?._id || `${category}-default`,
        summary:
          postData?.summary ||
          (isHebrew
            ? "מחשבות וחוויות מהחיים"
            : "Thoughts and life experiences"),
        title: postData?.headline || category,
        content:
          postData?.content ||
          (isHebrew ? `תוכן על ${category}` : `Content about ${category}`),
        date: postData?.date || (isHebrew ? "אין תאריך" : "No date"),
        category: category,
        readingTime:
          postData?.readingTime || (isHebrew ? "0 דקות" : "0 minutes"),
      };
    });
  }, [allPosts, language]); // Added language to dependency array

  const isHebrew = language === "Hebrew";
  const bgColors = isHebrew ? BG_COLORS_BY_CATEGORY : BG_COLORS_BY_CATEGORY_EN;
  const icons = isHebrew ? ICONS_BY_CATEGORY : ICONS_BY_CATEGORY_EN;

  return (
    <div className="main-content">
      {/* Main content goes here */}
      {/* Posts Grid */}
      <section>
        <div className={`grid md:grid-cols-3 gap-8 $`}>
          {posts.map((post, index) => (
            <article key={`${post._id}-${language}`} className="group">
              {" "}
              {/* Added language to key */}
              <div
                className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-white/20 hover:border-white/40"
                dir={language === "Hebrew" ? "rtl" : "ltr"}
              >
                {/* Image Placeholder */}
                <div
                  className={`h-48 bg-gradient-to-br ${
                    bgColors[post.category] || "from-gray-200 to-gray-400"
                  } flex items-center justify-center relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-black/5"></div>
                  <div className="relative text-center">
                    <div className="w-12 h-12 bg-white/80 rounded-full flex items-center justify-center mb-2 mx-auto shadow-md">
                      <span className="text-4xl">
                        {icons[post.category] || "📖"}
                      </span>
                    </div>
                    <span className="text-xs font-medium text-gray-600 bg-white/60 px-2 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {post.date}
                    </span>
                    <span className="text-xs text-gray-400">
                      {isHebrew
                        ? `${post.readingTime} דקות`
                        : `${post.readingTime} minutes`}
                    </span>
                  </div>
                  {/* <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.summary}
                  </p> */}
                  <div className="flex flex-col h-28">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight line-clamp-2 flex-shrink-0">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-1 overflow-hidden">
                      {post.summary}
                    </p>
                  </div>

                  <Link
                    href={{
                      pathname: `/posts/${post._id}`,
                      query: {
                        bgColorsByCategory:
                          bgColors[post.category] ||
                          "from-gray-200 to-gray-400",
                        lang: language,
                      },
                    }}
                    className="group-hover:text-blue-600 transition-colors"
                  >
                    <span className="text-[#665865] hover:text-blue-700 font-medium text-sm group-hover:translate-x-1 transition-all duration-200 flex items-center gap-1 cursor-pointer">
                      {isHebrew ? (
                        <>
                          <span>המשך לקרוא</span>
                          <span>←</span>
                        </>
                      ) : (
                        <>
                          <span>Continue Reading</span>
                          <span>→</span>
                        </>
                      )}
                    </span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
