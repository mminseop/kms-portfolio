import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import {
  fadeInUpVariants,
  containerVariants,
  itemVariants,
} from "../../animations/variants";
import type { SkillItem } from "../../types";
import SectionHeader from "../common/SectionHeader";

interface Skill {
  category: string;
  items: SkillItem[];
}

interface SkillsProps {
  skills: Skill[];
}

function Skills({ skills }: SkillsProps) {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [expandedMobileSkill, setExpandedMobileSkill] = useState<string | null>(
    null
  );

  const toggleMobileSkill = (skillKey: string) => {
    setExpandedMobileSkill((prev) => (prev === skillKey ? null : skillKey));
  };

  return (
    <section id="skills" className="py-20 md:py-32 bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        {/* 헤더 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUpVariants}
          className="text-center mb-16 md:mb-20"
        >
          <SectionHeader title="SKILLS" theme="dark" />
        </motion.div>

        {/* 스킬 카테고리 */}
        <div className="space-y-12 lg:space-y-16">
          {skills.map((skillGroup, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              {/* 카테고리 제목 */}
              <motion.h3
                variants={itemVariants}
                className="text-lg md:text-xl lg:text-2xl font-bold text-white mb-6 lg:mb-8 pl-4 border-l-4 border-primary-500"
              >
                # {skillGroup.category}
              </motion.h3>

              {/* hover 방식 - pc버전 */}
              <div className="hidden lg:flex flex-wrap gap-6 md:gap-8 items-start">
                {skillGroup.items.map((item, idx) => {
                  const skillKey = `${index}-${idx}`;
                  const isHovered = hoveredSkill === skillKey;

                  return (
                    <>
                      {/* 6개의 아이템마다 줄바꿈 강제 */}
                      {idx % 6 === 0 && idx !== 0 && (
                        <div key={`break-${idx}`} className="basis-full h-0" />
                      )}

                      <motion.div
                        key={idx}
                        className="relative shrink-0"
                        onMouseEnter={() => setHoveredSkill(skillKey)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.1 }}
                      >
                        {/* 가로 확장 카드 */}
                        <motion.div
                          animate={{
                            width: isHovered ? 360 : 110,
                            height: 110,
                          }}
                          transition={{
                            duration: 0.25,
                            ease: "easeOut",
                          }}
                          className={`rounded-xl border-2 flex items-start pt-4 px-4 cursor-pointer transition-all overflow-hidden ${
                            isHovered
                              ? "bg-gray-700/50 border-primary-500 shadow-lg shadow-primary-500/20"
                              : "bg-gray-800/50 border-gray-700"
                          }`}
                        >
                          {/* 왼쪽 - 아이콘 영역 */}
                          <div className="flex flex-col items-center justify-start shrink-0 w-20">
                            <div className="w-14 h-14 flex items-center justify-center">
                              <img
                                src={item.logo}
                                alt={item.name}
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <p className="text-white font-semibold text-xs mt-3 text-center whitespace-nowrap leading-tight">
                              {item.name}
                            </p>
                          </div>

                          {/* 오른쪽 - 설명 영역 */}
                          <motion.div
                            animate={{
                              opacity: isHovered ? 1 : 0,
                            }}
                            transition={{
                              duration: 0.25,
                              ease: "easeOut",
                            }}
                            className="ml-4 flex-1 min-w-0 overflow-hidden"
                          >
                            {isHovered && (
                              <div className="text-left">
                                {/* 설명 */}
                                <p className="text-gray-300 text-xs leading-relaxed">
                                  {item.description}
                                </p>
                              </div>
                            )}
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    </>
                  );
                })}
              </div>

              {/* 모바일/태블릿 버전 - 아코디언 */}
              <div className="lg:hidden space-y-3">
                {skillGroup.items.map((item, idx) => {
                  const skillKey = `${index}-${idx}`;
                  const isExpanded = expandedMobileSkill === skillKey;

                  return (
                    <motion.div
                      key={idx}
                      variants={itemVariants}
                      className="relative"
                    >
                      <motion.div
                        animate={{
                          height: isExpanded ? "auto" : "auto",
                        }}
                        className={`rounded-xl border-2 transition-all overflow-hidden ${
                          isExpanded
                            ? "bg-gray-700/50 border-primary-500"
                            : "bg-gray-800/50 border-gray-700"
                        }`}
                      >
                        {/* 헤더 부분 - 항상 표시 */}
                        <button
                          onClick={() => toggleMobileSkill(skillKey)}
                          className="w-full p-4 flex items-center gap-4"
                        >
                          {/* 아이콘 */}
                          <div className="w-12 h-12 shrink-0 flex items-center justify-center">
                            <img
                              src={item.logo}
                              alt={item.name}
                              className="w-full h-full object-contain"
                            />
                          </div>

                          {/* 이름 */}
                          <div className="flex-1 text-left">
                            <p className="text-white font-semibold text-base">
                              {item.name}
                            </p>
                          </div>

                          {/*화살표 아이콘 */}
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          </motion.div>
                        </button>

                        {/* 상세 설명 - 펼쳤을때만 표시 */}
                        <motion.div
                          initial={false}
                          animate={{
                            height: isExpanded ? "auto" : 0,
                            opacity: isExpanded ? 1 : 0,
                          }}
                          transition={{
                            duration: 0.3,
                            ease: "easeOut",
                          }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 border-t border-gray-600">
                            <p className="text-gray-300 text-sm leading-relaxed mt-4">
                              {item.description}
                            </p>
                          </div>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
