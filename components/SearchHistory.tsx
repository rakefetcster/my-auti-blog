import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Post } from "@/src/types/post";
import {
  BG_COLORS_BY_CATEGORY,
  BG_COLORS_BY_CATEGORY_EN,
  CATEGORIES,
  CATEGORIES_EN,
} from "@/src/constants/blogConstants";
interface SearchComponentProps {
  posts: Post[];
  language?: string;
  onFilteredPosts: (filteredPosts: Post[]) => void;
}

export const SearchComponent: React.FC<SearchComponentProps> = ({
  posts,
  language,
  onFilteredPosts,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [showResults, setShowResults] = useState(false);
  const isHebrew = language === "Hebrew";

  // Get background colors for categories (you'll need to import these constants)
  const getBgColor = (category: string) => {
    const bgColors = isHebrew
      ? BG_COLORS_BY_CATEGORY
      : BG_COLORS_BY_CATEGORY_EN;

    return bgColors[category] || "from-gray-200 to-gray-400";
  };
  // Get unique categories from posts
  const categories = isHebrew ? CATEGORIES : CATEGORIES_EN;

  // Filter posts based on search criteria
  const filteredPosts = useMemo(() => {
    let filtered = posts;

    // Filter by headline (search term)
    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (post) =>
          post.headline.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (post.summary &&
            post.summary.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }

    // Filter by date range
    if (dateFrom) {
      filtered = filtered.filter((post) => {
        const postDate = new Date(post.date);
        const fromDate = new Date(dateFrom);
        return postDate >= fromDate;
      });
    }

    if (dateTo) {
      filtered = filtered.filter((post) => {
        const postDate = new Date(post.date);
        const toDate = new Date(dateTo);
        return postDate <= toDate;
      });
    }

    return filtered;
  }, [posts, searchTerm, selectedCategory, dateFrom, dateTo]);

  // Update parent component when filtered posts change
  React.useEffect(() => {
    onFilteredPosts(filteredPosts);
  }, [filteredPosts, onFilteredPosts]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setDateFrom("");
    setDateTo("");
    setShowResults(false);
  };

  const toggleResults = () => {
    setShowResults(!showResults);
  };

  return (
    <div
      className="rounded-xl p-6 mb-8 border border-white/20"
      style={{ backgroundColor: "#F8E7ED" }}
    >
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        {isHebrew ? "חיפוש פוסטים" : "Search Posts"}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Search by headline */}
        <div className="space-y-2">
          <label className="text-gray-700 text-sm font-medium block">
            {isHebrew
              ? "חיפוש בכותרת או תקציר"
              : "Search by headline or summary"}
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={isHebrew ? "הקלד כאן..." : "Type here..."}
            className="w-full px-4 py-2 rounded-lg bg-white/70 border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
        </div>

        {/* Filter by category */}
        <div className="space-y-2">
          <label className="text-gray-700 text-sm font-medium block">
            {isHebrew ? "סינון לפי קטגוריה" : "Filter by category"}
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/70 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-300"
          >
            <option value="" className="bg-white">
              {isHebrew ? "כל הקטגוריות" : "All categories"}
            </option>
            {categories.map((category) => (
              <option key={category} value={category} className="bg-white">
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Date from */}
        <div className="space-y-2">
          <label className="text-gray-700 text-sm font-medium block">
            {isHebrew ? "מתאריך" : "From date"}
          </label>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/70 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
        </div>

        {/* Date to */}
        <div className="space-y-2">
          <label className="text-gray-700 text-sm font-medium block">
            {isHebrew ? "עד תאריך" : "To date"}
          </label>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/70 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
        </div>
      </div>

      {/* Clear filters, results count, and show results toggle */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-4">
        <div className="text-gray-700 text-sm">
          {isHebrew
            ? `נמצאו ${filteredPosts.length} פוסטים מתוך ${posts.length}`
            : `Found ${filteredPosts.length} posts out of ${posts.length}`}
        </div>

        <div className="flex gap-2">
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-[#EBDBE1] hover:bg-[#EDC7D2] text-[#020908] rounded-lg transition-colors duration-200 text-sm font-medium"
          >
            {isHebrew ? "נקה מסננים" : "Clear filters"}
          </button>

          {filteredPosts.length > 0 && (
            <button
              onClick={toggleResults}
              className="px-4 py-2 bg-[#EBDBE1] hover:bg-[#EDC7D2] text-[#020908] rounded-lg transition-colors duration-200 text-sm font-medium flex items-center gap-2"
            >
              <span>
                {isHebrew
                  ? showResults
                    ? "הסתר תוצאות"
                    : "הצג תוצאות"
                  : showResults
                  ? "Hide Results"
                  : "Show Results"}
              </span>
              <span
                className={`transform transition-transform duration-200 ${
                  showResults ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Results List */}
      {showResults && filteredPosts.length > 0 && (
        <div className="mt-6 bg-white/80 rounded-lg p-4 border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">
            {isHebrew ? "תוצאות החיפוש:" : "Search Results:"}
          </h4>
          <div className="space-y-3">
            {filteredPosts.map((post) => (
              <div
                key={post._id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-white/60 rounded-lg hover:bg-white/80 transition-colors duration-200"
                dir={isHebrew ? "rtl" : "ltr"}
              >
                <div className="flex-1 mb-2 sm:mb-0">
                  <h5 className="font-medium text-gray-900 mb-1 line-clamp-2">
                    {post.headline}
                  </h5>
                  <div className="text-xs text-gray-500 flex items-center gap-2">
                    <span className="bg-gray-200 px-2 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span>{post.date}</span>
                    {post.readingTime && (
                      <span>
                        {isHebrew
                          ? `${post.readingTime} דקות`
                          : `${post.readingTime} minutes`}
                      </span>
                    )}
                  </div>
                  {post.summary && (
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                      {post.summary}
                    </p>
                  )}
                </div>

                <Link
                  href={{
                    pathname: `/posts/${post._id}`,
                    query: {
                      bgColorsByCategory: getBgColor(post.category),
                      lang: language,
                    },
                  }}
                  className="group-hover:text-blue-600 transition-colors flex-shrink-0"
                >
                  <span className="text-blue-600 hover:text-blue-700 font-medium text-sm group-hover:translate-x-1 transition-all duration-200 flex items-center gap-1 cursor-pointer">
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
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
