import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ProjectsData } from "../../types";
import ProjectItem from "../project/ProjectItem";
import SectionHeader from "../common/SectionHeader";
import { fadeInUpVariants } from "../../animations/variants";

interface ProjectsProps {
  data: ProjectsData;
}

function Projects({ data }: ProjectsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalProjects = data.projects.length;

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalProjects - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === totalProjects - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section id="projects" className="py-20 md:py-32 bg-[#29323c]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* 헤더 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUpVariants}
          className="text-center mb-16 md:mb-20"
        >
          <SectionHeader title={data.sectionTitle} theme="dark" />
        </motion.div>

        {/* 슬라이더 - PC */}
        <div className="flex items-center gap-4 mb-20">
          {/* 슬라이더 왼쪽 버튼 */}
          <motion.button
            animate={{ x: [0, 15, 0] }}
            transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity }}
            onClick={handlePrevious}
            className="hidden lg:block p-4 text-white/60 hover:text-white/90 transition-colors"
          >
            <ChevronLeft className="w-16 h-16" />
          </motion.button>

          {/* 아이템 */}
          <div className="flex-1 overflow-hidden">
            {data.projects.map((project, index) => (
              <ProjectItem
                key={project.id}
                project={project}
                isVisible={index === currentIndex}
              />
            ))}
          </div>

          {/* 슬라이더 다음 버튼 */}
          <motion.button
            animate={{ x: [0, -15, 0] }}
            transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity }}
            onClick={handleNext}
            className="hidden lg:block p-4 text-white/60 hover:text-white/90 transition-colors"
          >
            <ChevronRight className="w-16 h-16" />
          </motion.button>
        </div>

        {/* 아래 네비게이션 dot (mobile일떈 여기서 이전/다음 버튼 나오게) */}
        <div className="flex justify-center items-center gap-8">
          {/* 이전 버튼 - mobile */}
          <button
            onClick={handlePrevious}
            className="lg:hidden text-white/60 hover:text-white/90 transition-colors"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          {/* dots */}
          {data.projects.map((project, index) => (
            <button
              key={project.id}
              onClick={() => handleDotClick(index)}
              className={`w-4 h-4 rounded-full transition-all duration-500 ${
                index === currentIndex
                  ? "bg-white scale-110"
                  : "bg-gray-500 hover:bg-gray-400"
              }`}
            />
          ))}

          {/* 다음버튼 - mobile */}
          <button
            onClick={handleNext}
            className="lg:hidden text-white/60 hover:text-white/90 transition-colors"
          >
            <ChevronRight className="w-10 h-10" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Projects;
