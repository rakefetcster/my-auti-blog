import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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

export const BlogDesign: React.FC<BlogDesignProps> = ({ language }) => {
  const [isJourney, setIsJourney] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]); // Add this state
  const [lastPost, setLastPost] = useState<Post | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allPostsResponse = await axios.get(
          `${SERVER_URL}/posts?language=${language}`
        );
        const allPostsData = allPostsResponse.data;
        console.log("Fetched posts:", allPostsData);
        setAllPosts(allPostsData);
        setFilteredPosts(allPostsData); // Initialize filtered posts

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

  useEffect(() => {
    const storedKey = localStorage.getItem("adminKey");
    if (storedKey === process.env.NEXT_PUBLIC_ADMIN_KEY) {
      setIsAdmin(true);
    }
  }, []);

  const getDataFromJourney = (data: boolean) => {
    console.log("Data from Journey:", data);
    setIsJourney(data);
  };

  // Handler for filtered posts from search component
  const handleFilteredPosts = (filtered: Post[]) => {
    setFilteredPosts(filtered);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const now = new Date().toISOString();

    try {
      await axios.post(`${SERVER_URL}/posts`, {
        headline: e.target.headline.value,
        content: e.target.content.value,
        category: e.target.category.value,
        summary: e.target.summary.value,
        date: TODAY,
        readingTime: getReadingTime(e.target.content.value),
        language: language,
      });

      setShowCreateForm(false);
      router.refresh();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };
  const handleAdminLogin = () => {
    const key = prompt("Enter admin key:"); // only you know it
    if (key === process.env.NEXT_PUBLIC_ADMIN_KEY) {
      localStorage.setItem("adminKey", key);
      setIsAdmin(true);
    } else {
      alert("Invalid key");
    }
  };
  return (
    <div
      className="min-h-screen bg-gradient-to-br bg-[#DDD8D4]" //from-[#1E3A8A] via-[#3B82F6] to-[#1E40AF]"
      dir={language === "Hebrew" ? "rtl" : "ltr"}
    >
      {/* <AdminControls
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
        setShowCreateForm={setShowCreateForm}
      /> */}
      {!isAdmin && (
        <button
          className="text-xs opacity-30 hover:opacity-100 fixed bottom-2 right-2"
          onClick={handleAdminLogin}
        >
          Admin
        </button>
      )}

      {isAdmin && (
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
        <PostsGrid allPosts={allPosts} language={language} />

        <EmailSubscribe language={language} />
      </main>

      <Footer language={language} />
    </div>
  );
};
