import { useState } from "react";
import { SERVER_URL, TODAY } from "@/src/constants/blogConstants";
import axios from "axios";
interface EmailSubscribeProps {
  language?: string;
}

export const EmailSubscribe: React.FC<EmailSubscribeProps> = ({ language }) => {
  const [email, setEmail] = useState("");

  const handleSubscribe = async (e: any) => {
    e.preventDefault();
    console.log("Subscribe button clicked with email:", email);
    if (email) {
      // Here you would typically send the email to your backend or a mailing service
      await axios
        .post(`${SERVER_URL}/subscribe`, {
          email: email,
          date: TODAY,
          language: language, // Assuming Hebrew for this context
        })
        .then(() => {
          alert(`Subscribed with ${email}!`);
        })
        .catch((error) => {
          console.error("Subscription error:", error);
          alert("Failed to subscribe.");
        });
    } else {
      alert("Subscription cancelled.");
    }
  };

  return (
    <section className="mt-16">
      <div className="bg-gradient-to-r bg-[#45454D]  rounded-2xl p-8 md:p-12 text-center">
        <form onSubmit={handleSubscribe}>
          {language === "Hebrew" ? (
            <>
              <h3 className="text-3xl font-bold text-white mb-4">
                הישאר מעודכן
              </h3>
              <p className="text-gray-300 mb-8 max-w-md mx-auto">
                קבל עדכונים על פוסטים חדשים ותובנות מהמסע שלי כהורה
              </p>
            </>
          ) : (
            <>
              <h3 className="text-3xl font-bold text-white mb-4">
                Stay Updated
              </h3>
              <p className="text-gray-300 mb-8 max-w-md mx-auto">
                Get updates on new posts and insights from my journey as a
                parent
              </p>
            </>
          )}
          {language === "Hebrew" ? (
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="הכנס את המייל שלך"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-full text-white placeholder-gray-300 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transition-colors"
              >
                הרשם
              </button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-full text-black placeholder-black bg-[#EBDBE1] focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="bg-[#EBDBE1] hover:bg-[#EDC7D2] text-black px-8 py-3 rounded-full font-medium transition-colors"
              >
                Subscribe
              </button>
            </div>
          )}
        </form>
      </div>
    </section>
  );
};
export default EmailSubscribe;
