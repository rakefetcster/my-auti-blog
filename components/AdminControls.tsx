// // src/components/AdminControls.tsx
// import React from "react";

// interface AdminControlsProps {
//   isAdmin: boolean;
//   setIsAdmin: (value: boolean) => void;
//   setShowCreateForm: (value: boolean) => void;
// }

// export const AdminControls: React.FC<AdminControlsProps> = ({
//   isAdmin,
//   setIsAdmin,
//   setShowCreateForm,
// }) => {
//   const checkAdminAccess = () => {
//     const adminPassword = prompt("הכנס סיסמת מנהל:");
//     if (adminPassword === process.env.ADMIN_PASSWORD) {
//       setIsAdmin(true);
//       alert("התחברת כמנהל בהצלחה!");
//     } else if (process.env.ADMIN_PASSWORD !== null) {
//       alert("סיסמה שגויה!");
//     }
//   };

//   const handleLogout = () => {
//     setIsAdmin(false);
//   };

//   return (
//     <>
//       {/* Admin Create Button - Floating */}
//       {isAdmin && (
//         <div className="fixed bottom-6 left-6 z-40">
//           <button
//             onClick={() => setShowCreateForm(true)}
//             className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full shadow-lg font-medium transition-all duration-300 flex items-center gap-2"
//           >
//             <span>✍️</span>
//             <span>פוסט חדש</span>
//           </button>
//         </div>
//       )}

//       {/* Admin Login/Logout Button - Top Right */}
//       <div className="fixed top-6 left-6 z-40">
//         {!isAdmin ? (
//           <button
//             onClick={checkAdminAccess}
//             className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm opacity-50 hover:opacity-100 transition-all duration-300"
//           >
//             🔑
//           </button>
//         ) : (
//           <button
//             onClick={handleLogout}
//             className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-all duration-300"
//           >
//             התנתק
//           </button>
//         )}
//       </div>
//     </>
//   );
// };
// src/components/AdminControls.tsx
"use client";
import React from "react";

interface AdminControlsProps {
  isAdmin: boolean;
  setIsAdmin: (value: boolean) => void;
  setShowCreateForm: (value: boolean) => void;
}

export const AdminControls: React.FC<AdminControlsProps> = ({
  isAdmin,
  setIsAdmin,
  setShowCreateForm,
}) => {
  const checkAdminAccess = async () => {
    const userInput = prompt("הכנס סיסמת מנהל:");

    if (userInput === null) {
      // User cancelled
      return;
    }

    try {
      // Call API to verify password
      const response = await fetch("/api/admin/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: userInput }),
      });

      if (response.ok) {
        setIsAdmin(true);
        alert("התחברת כמנהל בהצלחה!");
      } else {
        alert("סיסמה שגויה!");
      }
    } catch (error) {
      console.error("Admin verification error:", error);
      alert("שגיאה בבדיקת הסיסמה");
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
  };

  return (
    <>
      {/* Admin Create Button - Floating */}
      {isAdmin && (
        <div className="fixed bottom-6 left-6 z-40">
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full shadow-lg font-medium transition-all duration-300 flex items-center gap-2"
          >
            <span>✍️</span>
            <span>פוסט חדש</span>
          </button>
        </div>
      )}

      {/* Admin Login/Logout Button - Top Right */}
      <div className="fixed top-6 left-6 z-40">
        {!isAdmin ? (
          <button
            onClick={checkAdminAccess}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm opacity-50 hover:opacity-100 transition-all duration-300"
          >
            🔑
          </button>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-all duration-300"
          >
            התנתק
          </button>
        )}
      </div>
    </>
  );
};
