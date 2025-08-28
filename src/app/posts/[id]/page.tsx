"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { Post } from "@/src/types/post";

const server_url = "http://127.0.0.1:5000/posts";

export default function PostDetails() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const bgColorsByCategory =
    searchParams.get("bgColorsByCategory") ||
    "from-pink-50 via-purple-50 to-rose-100";
  const { id } = params;
  const [post, setPost] = useState<Post | null>(null);
  const lang = searchParams.get("lang") || "English"; // default fallback

  useEffect(() => {
    if (id) {
      axios.get(`${server_url}/${id}`).then((res) => setPost(res.data));
    }
  }, [id]);

  if (!post)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-400 via-indigo-400 to-blue-400">
        <p className="text-white text-xl font-bold animate-pulse">טוען...</p>
      </div>
    );

  return (
    //
    <div
      className={`min-h-screen bg-gradient-to-l ${bgColorsByCategory}`}
      dir={lang === "Hebrew" ? "rtl" : "ltr"}
    >
      <div className="max-w-6xl mx-auto bg-white/90 rounded-2xl shadow-lg overflow-hidden mb-12 relative min-h-[600px] top-24 p-8">
        {/* Title */}
        <div className="mb-6 border-b-2 border-gray-200 pb-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            {post.headline}
          </h2>
          <span className="text-sm sm:text-base text-gray-600">
            {post.readingTime}{" "}
            {lang === "Hebrew" ? "זמן קריאה" : "Reading Time"}
          </span>
        </div>

        {/* Date */}
        <div className="mb-6 text-gray-500 italic">
          <p>{new Date(post.date).toLocaleDateString()}</p>
        </div>

        {/* Summary */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg shadow-sm border-l-4 border-blue-400">
          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed whitespace-pre-line">
            {post.summary}
          </p>
        </div>

        {/* Content */}
        <div className="mb-6 p-4 bg-gray-100 rounded-lg shadow-inner">
          <p className="text-lg sm:text-xl text-gray-800 leading-relaxed whitespace-pre-line">
            {post.content}
          </p>
        </div>

        {/* Close button */}
        <div className="mt-6 flex justify-end">
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            onClick={() => router.back()}
          >
            סגור
          </button>
        </div>
      </div>
    </div>
  );
}
