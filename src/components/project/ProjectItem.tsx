import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { ProjectData } from "../../types";

interface ProjectItemProps {
  project: ProjectData;
  isVisible: boolean;
}

function ProjectItem({ project, isVisible }: ProjectItemProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleOpenNewTab = (url: string) => {
    window.open(url, "_blank", "noopener, noreferrer");
  };

  if (!isVisible) return;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="w-full flex flex-col lg:flex-row gap-6 lg:gap-10 text-white"
    >
      {/* 왼쪽 - 이미지 슬라이더와 기본 정보 */}
      <div className="w-full lg:w-[380px] flex flex-col gap-6">
        {/* 이미지 슬라이더 */}
        <div className="w-full flex flex-col gap-3">
          {/* 메인 이미지 */}
          <div className="w-full border border-white/30 shadow-[0_0_20px_rgba(0,0,0,0.3)] aspect-video flex justify-center items-center overflow-hidden rounded-md bg-gray-900">
            <img
              src={project.images[activeImageIndex]}
              className="w-full h-full object-contain transition-transform duration-500 ease-in-out"
              alt="프로젝트 이미지"
            />
          </div>

          {/* 썸네일 리스트 */}
          <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-white/50 scrollbar-track-white/10">
            <div className="flex gap-2 pb-2">
              {project.images.map((image, idx) => (
                <button
                  key={idx}
                  className={`shrink-0 w-20 h-14 cursor-pointer transition-all duration-200 rounded overflow-hidden bg-gray-900 border-2
                    ${
                      activeImageIndex === idx
                        ? "border-primary-500"
                        : "border-white/30 brightness-75 hover:border-white/60 hover:brightness-90"
                    }`}
                  onClick={() => setActiveImageIndex(idx)}
                >
                  <img
                    src={image}
                    className="w-full h-full object-cover"
                    alt={`프로젝트 썸네일 ${idx + 1}`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 프로젝트 기본 정보 */}
        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold text-primary-500 uppercase tracking-wide">
            {project.projectInfo.projectType}
          </span>
          <h3 className="text-xl lg:text-2xl font-bold">
            {project.projectInfo.projectName}
          </h3>
          <p className="text-xs font-medium text-gray-400">
            {project.projectInfo.projectDate}
          </p>

          {/* 링크 버튼 */}
          <div className="flex flex-wrap gap-2 mt-2">
            <button
              className="flex items-center gap-1.5 px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors cursor-pointer"
              onClick={() => handleOpenNewTab(project.projectInfo.projectSite)}
            >
              <ExternalLink className="w-4 h-4" />
              <span>Demo</span>
            </button>
            <button
              className="flex items-center gap-1.5 px-4 py-2 rounded-md bg-gray-800 hover:bg-gray-900 text-white text-xs font-semibold transition-colors cursor-pointer"
              onClick={() =>
                handleOpenNewTab(project.projectInfo.projectGithub)
              }
            >
              <img
                src="https://skillicons.dev/icons?i=github"
                alt="GitHub"
                className="w-4 h-4"
              />
              <span>Git Hub</span>
            </button>
          </div>
        </div>
      </div>

      {/* 오른쪽 - 프로젝트 상세 설명 */}
      <div className="w-full flex flex-col gap-6">
        {/* 프로젝트 설명 */}
        <div>
          <h3 className="text-indigo-400 text-lg font-bold mb-3">
            프로젝트 설명
          </h3>
          <div
            className="text-sm leading-relaxed text-gray-200 [&_strong]:font-bold [&_strong]:text-white"
            dangerouslySetInnerHTML={{
              __html: project.projectDetail.projectExplain,
            }}
          />
        </div>

        {/* 기술 스택 */}
        <div>
          <h3 className="text-indigo-400 text-lg font-bold mb-3">기술 스택</h3>
          <div className="flex flex-wrap gap-3">
            {project.projectDetail.projectStacks.map((stack, idx) => (
              <div
                key={idx}
                className="w-10 h-10 flex items-center justify-center bg-gray-800/50 rounded p-1.5"
              >
                <img
                  src={stack}
                  alt="기술 스택"
                  className="w-fdivl h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* 프로젝트 후기 */}
        <div>
          <h3 className="text-indigo-400 text-lg font-bold mb-3">후기</h3>
          <div
            className="text-sm leading-relaxed text-gray-200 [&_strong]:font-bold [&_strong]:text-white"
            dangerouslySetInnerHTML={{
              __html: project.projectDetail.projectReview,
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default ProjectItem;
