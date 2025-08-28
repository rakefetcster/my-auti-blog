// src/constants/blogConstants.ts
export const SERVER_URL = "http://127.0.0.1:5000";

export const CATEGORIES = [
  "מערכת החינוך",
  "תזונה",
  "הורות",
  "מלחמה",
  "חוגים",
  "זוגיות",
] as const;

export const CATEGORIES_EN = [
  "Education System",
  "Nutrition",
  "Parenting",
  "War",
  "Activities",
  "Relationships",
] as const;

// מיפוי אייקונים לפי קטגוריה
export const ICONS_BY_CATEGORY: Record<string, string> = {
  "מערכת החינוך": "🏫",
  תזונה: "🥗",
  הורות: "🤱",
  מלחמה: "🛡️",
  חוגים: "🎯",
  זוגיות: "❤️",
};

export const ICONS_BY_CATEGORY_EN: Record<string, string> = {
  "Education System": "🏫",
  Nutrition: "🥗",
  Parenting: "🤱",
  War: "🛡️",
  Activities: "🎯",
  Marriage: "❤️",
};

// מיפוי צבעים לפי קטגוריה
export const BG_COLORS_BY_CATEGORY: Record<string, string> = {
  "מערכת החינוך": "bg-[#D7E7E6]",
  תזונה: "bg-[#F8E7ED]",
  הורות: "bg-[#F0D6DF]",
  מלחמה: "bg-[#F8E7ED]",
  חוגים: "bg-[#F0D6DF]",
  זוגיות: "bg-[#D7E7E6]",
};

export const BG_COLORS_BY_CATEGORY_EN: Record<string, string> = {
  "Education System": "bg-[#D7E7E6]",
  Nutrition: "bg-[#F8E7ED]",
  Parenting: "bg-[#F0D6DF]",
  War: "bg-[#F8E7ED]",
  Activities: "bg-[#F0D6DF]",
  Relationships: "bg-[#D7E7E6]",
};

export const TODAY = new Date().toISOString(); // e.g., "2025-08-19T14:35:20.123Z"
