import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

interface NavSection {
  label: string;
  id: string;
}

interface NavigationProps {
  sections: NavSection[];
}

function Header({ sections }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  // 스크롤 감지 - 배경색 변경
  useEffect(() => {
    const handleScroll = () => {
      const introSection = document.getElementById("intro");
      if (introSection) {
        const introHeight = introSection.offsetHeight;
        setIsScrolled(window.scrollY > introHeight - 80);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 액티브 섹션 감지 - intro 제외
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-10% 0px -70% 0px",
      threshold: [0, 0.25, 0.5, 0.75, 1],
    };

    // 현재 화면에 보이는 네비게이션 섹션만 추적
    const visibleSections = new Map<string, number>();

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visibleSections.set(entry.target.id, entry.boundingClientRect.top);
        } else {
          visibleSections.delete(entry.target.id);
        }
      });

      // 가장 위에 있는 섹션 찾기
      if (visibleSections.size > 0) {
        let topSection = "";
        let minTop = Infinity;

        visibleSections.forEach((top, id) => {
          if (top < minTop) {
            minTop = top;
            topSection = id;
          }
        });

        setActiveSection(topSection);
      } else {
        setActiveSection(""); // 아무 섹션도 보이지 않으면(intro 영역) 활성화 해제
      }
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    // intro를 제외한 네비게이션 섹션만 감지
    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          observer.unobserve(element);
        }
      });
      visibleSections.clear();
    };
  }, [sections]);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isOpen
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* 로고 */}
          <div
            className={`text-2xl font-poppins font-black transition-colors duration-300 cursor-pointer ${
              isScrolled || isOpen ? "text-gray-900" : "text-white"
            }`}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            KMS's Portfolio
          </div>

          {/* 데스크톱 네비게이션 */}
          <div className="hidden md:flex gap-8">
            {sections.map((section) => {
              const isActive = activeSection === section.id;

              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`font-semibold transition-all duration-300 relative group ${
                    isScrolled
                      ? isActive
                        ? "text-primary-600"
                        : "text-gray-700 hover:text-primary-500"
                      : isActive
                      ? "text-orange-300"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  {section.label}

                  {/* 액티브 언더라인 */}
                  <div
                    className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    } ${isScrolled ? "bg-primary-500" : "bg-primary-300"}`}
                  ></div>
                </button>
              );
            })}
          </div>

          {/* 모바일 메뉴 버튼 */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden transition-colors duration-300 ${
              isScrolled || isOpen
                ? "text-gray-900 hover:text-primary-500"
                : "text-white hover:text-orange-200"
            }`}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* 모바일 네비게이션 */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2 border-t pt-4 border-gray-200">
            {sections.map((section) => {
              const isActive = activeSection === section.id;

              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full text-left px-4 py-3 font-semibold transition-all duration-300 ${
                    isActive
                      ? "bg-primary-50 text-primary-600 border-l-4 border-primary-500"
                      : "text-gray-700 hover:bg-gray-100 hover:text-primary-500"
                  }`}
                >
                  {section.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Header;
