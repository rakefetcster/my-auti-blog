import React from "react";

import Image from "next/image";
import Link from "next/link";

export default function PostHeb1(props: { callback: any }) {
  return (
    <div className="max-w-6xl mx-auto bg-gradient-to-l from-pink-50 via-purple-50 to-rose-100 rounded-2xl shadow-lg overflow-hidden mb-12 relative min-h-[600px]">
      {/* תמונה כרקע בצד שמאל - שקופה */}
      <div className="absolute top-0 left-0 w-1/2 h-full opacity-30 z-10">
        <Image
          src="/images/ElegantBloom.png" // שימי פה את התמונה שלך
          alt="המסע שלי"
          fill
          style={{ objectFit: "cover" }}
          className="rounded-l-2xl"
        />
      </div>

      {/* תוכן על כל העמוד */}
      <div className="relative z-20 p-6 flex flex-col justify-between min-h-[600px]">
        <div>
          <h2 className="text-3xl font-bold mb-2 text-gray-900">
            המסע שלי כהורה
          </h2>
          <p className="text-gray-800 text-lg mb-4 leading-relaxed">
            אני רוצה לשתף אותכם במסע שלי, מסע של הורות, הורות שהיא לא רגילה,
            הורות ל 2 ילדים מיוחדים, במסע הזה אני אנסה לתאר את המחשבות שלי
            השאיפות, האכזבות וההפתעות... כל דבר שקורה לי כהורה לילדים המאובחנים
            על הקשת האוטיסטית
            <br />
            <br />
            אנחנו משפחה מיוחדת, יש לנו 2 ילדים, שניהם מאובחנים, לכל אחד מהם
            יכולות שונות, קשיים שונים.
            <br />
            עברנו גנים רגילים, גני תקשורת, כיתות תקשורתיות, כיתות רגילות,
            יסודיים, חטיבת ביניים, ועכשיו בקרוב נתחיל גם תיכון, וכמובן אינסוף
            מטפלים, אנשים שהבטיחו הבטחות ויצרו לנו ציפיות ואחרים שהורידו, אלה
            שתמכו וכאלה שלא התאימו לנו.
            <br />
            <br />
            <b>כל מה שאני אספר לכם הוא מנקודת המבט שלי, מבט של אימא.</b>
            <br />
            <br />
            הרבה מהטיפולים היום מתמקדים בילדים, אבל מה קורה איתנו ההורים, שציפו
            ומצפים לתחושה רגילה ומוכרת, ומוצאים את עצמם בטריטוריה שונה לחלוטין,
            והמפגש עם העולם הרגיל, שהוא לעיתים קרובות מתסכל.
            <br />
            <br />
            כשאבחנתי את הילדים שלי רציתי לפגוש מישהו שיספר לי מה הולך להיות, ועד
            היום אני רוצה לדעת מה צופן העתיד של ילדי...
            <br />
            <br />
            אם תסתכלו עלינו מהצד אולי תחשבו שפיצחנו את הדרך... הלוואי!!!
            <br />
            כל שלב בחיים מביא אתו אתגרים חדשים, ובכל אתגר הבנו משהו חדש עלינו, ,
            על הזוגיות שלנו, על הילדים, על הקהילה שלנו, על המשפחה הרחבה יותר, על
            החיים בישראל.
            <br />
            אני אנסה לשפוך אור מתוך ניסיון, אולי תזדהו, אולי תלמדו משהו חדש
            ואולי אולי בבלוג הזה אני יצליח לשפר חיים של אחרים.
          </p>
        </div>
        <div>
          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            onClick={() => props.callback(false)}
          >
            סגור
          </button>
        </div>
      </div>
    </div>
  );
}
