// src/utils/blogUtils.ts
import { Post } from "../types/post";

export const getReadingTime = (text: string): number => {
  const wordsPerMinute = 200; // Average adult reading speed
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wordsPerMinute);
  return time;
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("he-IL");
};

export const getCurrentDate = (): string => {
  return new Date().toISOString();
};

export const getLastPostDataByCategory = (
  allPosts: Post[],
  category: string
) => {
  console.log("Looking for category:", category);
  console.log("All posts:", allPosts);

  if (!allPosts || allPosts.length === 0) {
    console.log("No posts available");
    return null;
  }

  // Filter posts by category
  const categoryPosts = allPosts.filter((post) => post.category === category);
  console.log(`Posts in category "${category}":`, categoryPosts);

  if (categoryPosts.length === 0) {
    console.log("No posts found for this category");
    return null;
  }

  // Sort by date (most recent first) and get the first one
  const lastPost = categoryPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )[0];

  console.log("Last post found:", lastPost);

  return {
    _id: lastPost._id,
    headline: lastPost.headline || "הפוסט האחרון שלי",
    summary: lastPost.summary || "מחשבות וחוויות מהחיים",
    date: lastPost.date
      ? new Date(lastPost.date).toLocaleString()
      : "No date yet",
    category: lastPost.category,
    readingTime: lastPost.readingTime || "0 דקות",
    content: lastPost.content || "אין תוכן לפוסט זה",
  };
};
