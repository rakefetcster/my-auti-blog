interface FooterProps {
  language?: string;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  return (
    <footer className="bg-gradient-to-r from-[#F8D6EB] via-[#D26BB3] via-[#8B2C78] via-[#D26BB3] to-[#F8D6EB]/20 mt-20 py-8">
      <div className="max-w-6xl mx-auto px-6 text-center text-black/70">
        {language === "Hebrew" ? (
          <p className="text-sm">© 2025 מסע בספקטרום - כל הזכויות שמורות</p>
        ) : (
          <p className="text-sm">
            © 2025 Spectrum Journey - All Rights Reserved
          </p>
        )}
      </div>
    </footer>
  );
};
