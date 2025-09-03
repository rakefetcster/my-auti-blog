import React, { useState } from "react";

interface AdminControlsProps {
  isAdmin: boolean;
  setIsAdmin: (value: boolean) => void;
  setShowCreateForm: (value: boolean) => void;
}

// Get admin key from environment variables
const ADMIN_KEY = process.env.NEXT_PUBLIC_ADMIN_KEY || "fallback-key-change-me";

export const AdminControls: React.FC<AdminControlsProps> = ({
  isAdmin,
  setIsAdmin,
  setShowCreateForm,
}) => {
  const [adminKey, setAdminKey] = useState("");
  const [showKeyError, setShowKeyError] = useState(false);

  const handleAdminLogin = () => {
    if (adminKey === ADMIN_KEY) {
      setIsAdmin(true);
      setShowKeyError(false);
      setAdminKey(""); // Clear the key input
    } else {
      setShowKeyError(true);
      setTimeout(() => setShowKeyError(false), 3000); // Hide error after 3 seconds
    }
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    setAdminKey("");
    setShowKeyError(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAdminLogin();
    }
  };

  return (
    <div className="fixed top-4 left-4 z-50">
      {!isAdmin ? (
        <div className="bg-white rounded-lg shadow-lg p-4 border-2 border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            🔐 Admin Access
          </h3>

          <div className="flex flex-col space-y-2">
            <input
              type="password"
              placeholder="Enter admin key..."
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              onKeyPress={handleKeyPress}
              className="px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />

            <button
              onClick={handleAdminLogin}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Login
            </button>

            {showKeyError && (
              <div className="text-xs text-red-600 bg-red-50 p-2 rounded border border-red-200">
                ❌ Invalid admin key
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-green-50 rounded-lg shadow-lg p-4 border-2 border-green-200">
          <h3 className="text-sm font-semibold text-green-700 mb-3">
            ✅ Admin Panel
          </h3>

          <div className="flex flex-col space-y-2">
            <button
              onClick={() => setShowCreateForm(true)}
              className="px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
            >
              + Create New Post
            </button>

            <button
              onClick={handleAdminLogout}
              className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
