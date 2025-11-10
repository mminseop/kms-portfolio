interface SectionHeaderProps {
  title: string;
  theme?: "light" | "dark";
  className?: string;
}

function SectionHeader({
  title,
  theme = "dark",
  className = "",
}: SectionHeaderProps) {
  const textColor = theme === "dark" ? "text-white" : "text-gray-900";

  return (
    <div className={`text-center mb-16 md:mb-20 ${className}`}>
      <h2
        className={`text-4xl md:text-4xl lg:text-5xl font-poppins font-black ${textColor} mb-6`}
      >
        {title}
      </h2>
      <div className="h-2 w-32 mx-auto bg-primary-500 rounded-full"></div>
    </div>
  );
}

export default SectionHeader;
