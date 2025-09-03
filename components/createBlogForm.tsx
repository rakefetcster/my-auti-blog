// src/components/CreateBlogForm.tsx
import React from "react";
import { CATEGORIES, CATEGORIES_EN } from "../src/constants/blogConstants";

interface CreateBlogFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void | Promise<void>;
  onClose: () => void;
  language?: string; // Optional language prop for future use
}

export const CreateBlogForm: React.FC<CreateBlogFormProps> = ({
  onSubmit,
  onClose,
  language,
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto"
        dir={language === "Hebrew" ? "rtl" : "ltr"}
      >
        {language === "Hebrew" ? (
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">יצירת פוסט חדש</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              ✕
            </button>
          </div>
        ) : (
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Create New Post
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              ✕
            </button>
          </div>
        )}

        {/* Form */}

        <form onSubmit={onSubmit}>
          <div className="space-y-4">
            {language === "Hebrew" ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  כותרת
                </label>
                <input
                  name="headline"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="הכנס כותרת לפוסט"
                  required
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Headline
                </label>
                <input
                  name="headline"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter post headline"
                  required
                />
              </div>
            )}
            {language === "Hebrew" ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  קטגוריה
                </label>
                <select
                  name="category"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">בחר קטגוריה</option>
                  {CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Category</option>
                  {CATEGORIES_EN.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === "Hebrew" ? "תקציר" : "Summary"}
              </label>
              <textarea
                rows={3}
                name="summary"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="תקציר קצר של הפוסט"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === "Hebrew" ? "תוכן הפוסט" : "Post Content"}
              </label>
              <textarea
                rows={8}
                name="content"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="כתוב את תוכן הפוסט כאן..."
                required
              />
            </div>

            <div className="flex gap-4 justify-end pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                {language === "Hebrew" ? "ביטול" : "Cancel"}
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {language === "Hebrew" ? "פרסם פוסט" : "Publish Post"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
