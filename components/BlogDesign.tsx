import React, { useState, useEffect, FormEvent } from "react";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";

// Components
import { HeaderSection } from "./HeaderSection";
import { AdminControls } from "./AdminControls";
import { CreateBlogForm } from "./createBlogForm";
import { PostsGrid } from "@/components/postGrid";
import EmailSubscribe from "@/components/emailSubscribe";
import PostHeb1 from "@/components/myJourneyHeb";
import PostEng1 from "@/components/myJourneyEng";
import { SearchComponent } from "./SearchHistory";

import RecommendedHeb from "@/components/recommendedPostHeb";
import RecommendedEng from "@/components/recommendedPostEng";
import { Footer } from "./Footer";

// Types and Utils
import { Post } from "@/src/types/post";
import { SERVER_URL, TODAY } from "@/src/constants/blogConstants";
import { getReadingTime } from "@/src/utils/blogUtils";

interface BlogDesignProps {
  language?: string;
}

// Get secret key from environment variables (now used as URL parameter)
const SECRET_ADMIN_KEY =
  process.env.NEXT_PUBLIC_ADMIN_SECRET_PATH?.replace("/", "") ||
  "admin-fallback";

export const BlogDesign: React.FC<BlogDesignProps> = ({ language }) => {
  const [isJourney, setIsJourney] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [lastPost, setLastPost] = useState<Post | null>(null);
  const [showAdminAccess, setShowAdminAccess] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allPostsResponse = await axios.get(
          `${SERVER_URL}/posts?language=${language}`
        );
        const allPostsData = allPostsResponse.data;
        console.log("Fetched posts:", allPostsData);
        setAllPosts(allPostsData);
        setFilteredPosts(allPostsData);

        const postsInLanguage = Array.isArray(allPostsData)
          ? allPostsData.filter((post: Post) => post.language === language)
          : [];

        const latestPost: Post | null =
          postsInLanguage.length > 0 ? postsInLanguage[0] : null;

        setLastPost(latestPost);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    if (language) {
      fetchData();
    }
  }, [language]);

  // Check if current URL has the secret admin parameter
  useEffect(() => {
    // Check on both initial load and when URL changes
    const checkAdminAccess = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const adminParam = urlParams.get("admin");
      const secretKey =
        process.env.NEXT_PUBLIC_ADMIN_SECRET_PATH?.replace("/", "") ||
        "admin-fallback";

      if (adminParam === secretKey) {
        setShowAdminAccess(true);
      } else {
        setShowAdminAccess(false);
        setIsAdmin(false); // Reset admin status when secret param is not present
      }
    };

    checkAdminAccess();

    // Listen for URL changes (for SPA navigation)
    const handlePopState = () => checkAdminAccess();
    window.addEventListener("popstate", handlePopState);

    return () => window.removeEventListener("popstate", handlePopState);
  }, [pathname, language]); // Add language as dependency

  const getDataFromJourney = (data: boolean) => {
    console.log("Data from Journey:", data);
    setIsJourney(data);
  };

  // Handler for filtered posts from search component
  const handleFilteredPosts = (filtered: Post[]) => {
    setFilteredPosts(filtered);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const headline = formData.get("headline") as string;
    const content = formData.get("content") as string;
    const category = formData.get("category") as string;
    const summary = formData.get("summary") as string;

    try {
      await axios.post(`${SERVER_URL}/posts`, {
        headline,
        content,
        category,
        summary,
        date: TODAY,
        readingTime: getReadingTime(content),
        language: language,
      });

      setShowCreateForm(false);
      router.refresh();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br bg-[#DDD8D4]"
      dir={language === "Hebrew" ? "rtl" : "ltr"}
    >
      {/* Only show AdminControls when on secret path */}
      {showAdminAccess && (
        <AdminControls
          isAdmin={isAdmin}
          setIsAdmin={setIsAdmin}
          setShowCreateForm={setShowCreateForm}
        />
      )}

      {showCreateForm && (
        <CreateBlogForm
          onSubmit={handleSubmit}
          onClose={() => setShowCreateForm(false)}
          language={language}
        />
      )}

      <HeaderSection lastPost={lastPost} language={language} />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Show secret path notice when on admin path */}
        {showAdminAccess && (
          <div className="mb-8 p-4 bg-yellow-100 border-l-4 border-yellow-500 rounded">
            <p className="text-yellow-700 font-semibold">
              🔐 Admin Access Available - Enter your admin key to manage posts
            </p>
          </div>
        )}

        {/* Featured Post */}
        {isJourney ? (
          language === "Hebrew" ? (
            <PostHeb1 callback={getDataFromJourney} />
          ) : (
            <PostEng1 callback={getDataFromJourney} />
          )
        ) : language === "Hebrew" ? (
          <RecommendedHeb callback={getDataFromJourney} />
        ) : (
          <RecommendedEng callback={getDataFromJourney} />
        )}

        {/* Add Search Component here - after the journey section */}
        {allPosts.length > 0 && (
          <SearchComponent
            posts={allPosts}
            language={language}
            onFilteredPosts={handleFilteredPosts}
          />
        )}

        {/* Keep the original PostsGrid for the main blog display */}
        <PostsGrid allPosts={filteredPosts} language={language} />
        <EmailSubscribe language={language} />
      </main>

      <Footer language={language} />
    </div>
  );
};
