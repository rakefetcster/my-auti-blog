import React from "react";
import { useState, useEffect } from "react";
import PostEng1 from "@/components/myJourneyEng";
import RecommendedEng from "@/components/recommendedPostEng";
import axios from "axios";
import { Post } from "@/src/types/post"; // Adjust the import path as necessary
import { Footer } from "./Footer"; // Adjust the import path as necessary
import { EmailSubscribe } from "./emailSubscribe";
import { SERVER_URL, TODAY } from "@/src/constants/blogConstants"; // Adjust the import path as necessary
import { getReadingTime } from "@/src/utils/blogUtils"; // Adjust the import path as necessary
import { PostsGrid } from "./postGrid"; // Adjust the import path as necessary
import { HeaderSection } from "./HeaderSection";
import { AdminControls } from "./AdminControls";
import { CreateBlogForm } from "./createBlogForm";
import { useRouter } from "next/navigation";

export default function EnglishBlogDesign() {
  const [isJourney, setIsJourney] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  //const [sendingPost, setSendingPost] = useState("");
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [lastPost, setLastPost] = useState<Post | null>(null);
  const router = useRouter(); // ← define router here

  const [formData, setFormData] = useState({
    _id: "",
    headline: "",
    content: "",
    category: "",
    summary: "",
    date: "",
    readingTime: "",
  });

  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all posts
        const allPostsResponse = await axios.get(
          `${SERVER_URL}/posts?language=English`
        );
        const allPostsData = allPostsResponse.data;
        console.log("Fetched posts:", allPostsData);
        setAllPosts(allPostsData);

        const lastPostResponse = await fetch(
          `${SERVER_URL}/posts?language=English`
        );
        const lastPostData = await lastPostResponse.json();

        // pick the last element (or first if sorted descending by backend)
        const latestPost: Post | null =
          Array.isArray(lastPostData) && lastPostData.length > 0
            ? lastPostData[0] // or lastPostData[lastPostData.length - 1]
            : null;

        setLastPost(latestPost);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchData();
  }, []);
  //return the last post data
  const getLastPostData = () => {
    if (!lastPost) {
      return {
        headline: "הפוסט האחרון שלי",
        summary: "מחשבות וחוויות מהחיים",
        date: "No date yet",
      };
    }

    return {
      headline: lastPost.headline,
      summary: lastPost.summary,
      date: new Date(lastPost.date).toLocaleDateString(),
    };
  };

  const getDataFromJourney = (data: boolean) => {
    console.log("Data from Journey:", data);
    setIsJourney(data);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    //const now = new Date().toISOString(); // full date + time

    try {
      await axios.post(`${SERVER_URL}/posts`, {
        headline: e.target.headline.value,
        content: e.target.content.value,
        category: e.target.category.value,
        summary: e.target.summary.value,
        date: TODAY,
        readingTime: getReadingTime(e.target.content.value),
        language: "English",
      });

      // Close the form modal
      setShowCreateForm(false);

      // Refresh the page
      router.refresh(); // if using Next.js App Router
      // OR, if using Pages Router:
      // window.location.reload();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E3A8A] via-[#3B82F6] to-[#1E40AF]">
      {/* Admin Create Button - Floating */}
      <AdminControls
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
        setShowCreateForm={setShowCreateForm}
      />
      {/* Create Blog Form Modal */}

      {showCreateForm && (
        <CreateBlogForm
          onSubmit={handleSubmit}
          onClose={() => setShowCreateForm(false)}
          language="English"
        />
      )}

      {/* Full Width Black Strip (matching footer) */}
      <HeaderSection lastPost={lastPost} language="English" />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Featured Post */}
        {isJourney ? (
          <PostEng1 callback={getDataFromJourney} />
        ) : (
          <RecommendedEng callback={getDataFromJourney} />
        )}

        {/* Posts Grid */}
        <PostsGrid allPosts={allPosts} language="English" />

        {/* Newsletter Section */}
        <EmailSubscribe language="English" />
      </main>

      {/* Footer */}
      <Footer language="English" />
    </div>
  );
}
