import Image from "next/image";

interface PostEng1Props {
  callback: (value: boolean) => void;
}

export default function PostEng1(props: PostEng1Props) {
  return (
    <div className="max-w-6xl mx-auto bg-gradient-to-r from-pink-50 via-purple-50 to-rose-100 rounded-2xl shadow-lg overflow-hidden mb-12 relative min-h-[600px]">
      {/* תמונה כרקע בצד ימין - שקופה */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-30 z-10">
        <Image
          src="/images/ElegantBloom.png" // שימי פה את התמונה שלך
          alt="המסע שלי"
          fill
          style={{ objectFit: "cover" }}
          className="rounded-r-2xl"
        />
      </div>

      {/* תוכן על כל העמוד */}
      <div className="relative z-20 p-6 flex flex-col justify-between min-h-[600px]">
        <div>
          <h2 className="text-3xl font-bold mb-2 text-gray-900">
            My Journey as a Parent
          </h2>
          <p className="text-gray-800 text-lg mb-4 leading-relaxed">
            I want to share with you my personal journey, a journey of
            parenting. But not just any kind of parenting, this is the journey
            of raising two exceptional children. Along the way, I&apos;ll try to
            describe my thoughts, hopes, disappointments, and surprises...
            everything that I experience as a parent of children diagnosed on
            the autism spectrum.
            <br />
            <br />
            We&apos;re a unique family. We have two children, both diagnosed
            with autism, and each of them has a different set of skills.
            We&apos;ve gone through mainstream preschools, special education
            programs, communication-based classes, mainstream classrooms,
            elementary school, middle school and soon, we&apos;ll be entering
            high school. Alongside that, we&apos;ve seen countless therapists,
            professionals who made promises and gave us hope, and others who let
            us down. Some supported us wholeheartedly, while others simply
            weren&apos;t the right fit.
            <br />
            <br />
            <b>
              Everything I share here comes from my own perspective - the
              perspective of a mother.
            </b>
            <br />
            <br />
            Today, most therapies focus on the children, but what about us, the
            parents? Parents who once hoped for a familiar, typical parenting
            experience, only to find themselves navigating a completely
            different world. A world where every encounter with the
            &ldquo;normal&rdquo; can be confusing or frustrating.
            <br />
            <br />
            When my children were first diagnosed, I longed to meet someone who
            could tell me what to expect. Even today, I still wonder what the
            future holds for them.
            <br />
            <br />
            From the outside, you might think we&apos;ve figured it all out... I
            wish!
            <br />
            Every stage in life brings new challenges. And with each one,
            we&apos;ve learned something new about ourselves, about our
            children, about our community, our extended family, and about life
            in Israel.
            <br />
            <br />
            Through this blog, I&apos;ll try to shed light from my own
            experience. Maybe you&apos;ll relate. Maybe you&apos;ll learn
            something new. And maybe, just maybe, this blog will help improve
            someone else&apos;s life.
          </p>
        </div>
        <div>
          <button
            className="mt-4 bg-gradient-to-r from-[#F8D6EB] via-[#E8B8D8] to-[#F8D6EB] hover:from-[#E8B8D8] hover:via-[#D26BB3] hover:to-[#E8B8D8] text-[#8B2C78] hover:text-white rounded-lg transition-all duration-300 text-sm font-semibold shadow-sm hover:shadow-md transform hover:scale-[1.02]"
            onClick={() => props.callback(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
