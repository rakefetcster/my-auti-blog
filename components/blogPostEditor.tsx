import React from "react";
import { useState } from "react";

export default function BasicBlogPage() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    date: "",
    readTime: "",
    imageAlt: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Blog Post Editor
          </h1>
          <p className="text-gray-600 text-lg">
            Create and preview your blog post content
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Edit Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Edit Content
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blog Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter your blog title..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  placeholder="e.g., Parenting, Autism, Personal"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="text"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    placeholder="July 15, 2025"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Read Time
                  </label>
                  <input
                    type="text"
                    name="readTime"
                    value={formData.readTime}
                    onChange={handleInputChange}
                    placeholder="5 min read"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image Alt Text
                </label>
                <input
                  type="text"
                  name="imageAlt"
                  value={formData.imageAlt}
                  onChange={handleInputChange}
                  placeholder="Description of the image..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blog Content
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  placeholder="Write your blog post content here..."
                  rows={10}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                />
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">Preview</h2>
            </div>

            <article className="p-6">
              {/* Image Placeholder */}
              <div className="relative h-48 bg-gradient-to-br from-purple-200 to-pink-300 rounded-lg mb-6 flex items-center justify-center overflow-hidden">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center mb-3 mx-auto">
                    <span className="text-2xl">📸</span>
                  </div>
                  <p className="text-gray-700 font-medium">Image Placeholder</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {formData.imageAlt || "Add image alt text..."}
                  </p>
                  <div className="mt-3 text-xs text-gray-600 bg-white/60 px-3 py-1 rounded-full inline-block">
                    Replace with your image: /images/your-image.jpg
                  </div>
                </div>
              </div>

              {/* Category Badge */}
              {formData.category && (
                <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mb-4">
                  {formData.category}
                </span>
              )}

              {/* Title */}
              <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                {formData.title || "Your Blog Title Will Appear Here"}
              </h1>

              {/* Meta Info */}
              <div className="flex items-center justify-between text-sm text-gray-500 mb-6 pb-6 border-b border-gray-200">
                <span>{formData.date || "Date not set"}</span>
                <span>{formData.readTime || "Read time not set"}</span>
              </div>

              {/* Content */}
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                {formData.content ? (
                  formData.content.split("\n").map((paragraph, index) => (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <p className="text-gray-400 italic">
                    Your blog content will appear here as you type...
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-gray-200 flex gap-3">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                  Save Post
                </button>
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors">
                  Save Draft
                </button>
              </div>
            </article>
          </div>
        </div>

        {/* Code Example Section */}
        <div className="mt-12 bg-gray-900 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-white mb-4">
            HTML/React Code Example:
          </h3>
          <div className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-green-400">
              {`// BlogPost.jsx
export default function BlogPost() {
  return (
    <article className="max-w-4xl mx-auto px-6 py-12">
      {/* Featured Image */}
      <div className="relative h-64 md:h-96 mb-8 rounded-2xl overflow-hidden">
        <img
          src="/images/your-blog-image.jpg"
          alt="${formData.imageAlt || "Your image description"}"
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
      
      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <h1 className="text-3xl font-bold mb-4">
          ${formData.title || "Your Blog Title"}
        </h1>
        <div className="text-gray-700 leading-relaxed">
          ${formData.content || "Your blog content..."}
        </div>
      </div>
    </article>
  );
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
