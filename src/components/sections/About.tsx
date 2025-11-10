import {
  User,
  Phone,
  Mail,
  GraduationCap,
  MapPin,
  Calendar,
  ChevronRight,
} from "lucide-react";
import type { AboutData } from "../../types";
import { motion } from "framer-motion";
import SectionHeader from "../common/SectionHeader";
import { fadeInUpVariants } from "../../animations/variants";

interface AboutProps {
  data: AboutData;
}

function About({ data }: AboutProps) {
  const infoItems = [
    {
      icon: User,
      label: data.labels.name,
      value: data.personalInfo.name,
    },
    {
      icon: Calendar,
      label: data.labels.birthDate,
      value: data.personalInfo.birthDate,
    },
    {
      icon: MapPin,
      label: data.labels.location,
      value: data.personalInfo.location,
    },
    {
      icon: Phone,
      label: data.labels.phone,
      value: data.personalInfo.phone,
    },
    {
      icon: Mail,
      label: data.labels.email,
      value: data.personalInfo.email,
    },
    {
      icon: GraduationCap,
      label: data.labels.education,
      value: data.personalInfo.education,
    },
  ];

  const handleGithubClick = () => {
    window.open("https://github.com/mminseop", "_blank");
  };

  return (
    <section id="about" className="py-20 md:py-32 bg-white">
      <div className="max-w-5xl mx-auto px-4 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUpVariants}
          className="text-center mb-16 md:mb-20"
        >
          {/* 헤더 */}
          <SectionHeader title={data.sectionTitle} theme="light" />
        </motion.div>

        {/* 소개 텍스트 */}
        <div className="text-center mb-16 md:mb-20 mx-auto">
          <p className="text-gray-500 leading-relaxed">
            <span className="font-bold text-lg mr-1 text-gray-700">
              어제보다 나은 코드
            </span>
            를 작성하기 위해 매일 성장하는 프론트엔드 개발자 김민섭입니다.
            <br />
            <br />
            새로운 기술을 배우는 것을 두려워하지 않으며,{" "}
            <span className="font-bold text-lg mr-1 text-gray-700">
              배운 것을 실제로 적용
            </span>
            하는 과정에서 진짜 배움이 일어난다고 믿습니다.
            <br />
            <br />
            <span className="font-bold text-lg mr-1 text-gray-700">
              사용자 관점
            </span>
            에서 생각하고,{" "}
            <span className="font-bold text-lg mr-1 text-gray-700">
              팀의 성장이 나의 성장
            </span>
            이라고 생각하는 개발자입니다.
          </p>
        </div>

        {/* 정보 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-4xl mx-auto">
          {infoItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex gap-3 items-start">
                <Icon className="w-6 h-6 text-gray-400 mt-3" />
                <div className="ml-3">
                  <p className="text-xl font-bold text-gray-700 uppercase tracking-wider mb-2">
                    {item.label}
                  </p>
                  <p
                    className={`text-gray-700 ${
                      item.label === data.labels.email ? "break-all" : ""
                    }`}
                  >
                    {item.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* 깃허브 버튼 */}
        <div className="flex justify-center mt-16 md:mt-20">
          <button
            onClick={handleGithubClick}
            className="flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-3xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer"
          >
            <img
              src="https://skillicons.dev/icons?i=github"
              alt="GitHub"
              className="w-7 h-7"
            />
            <span>View GitHub</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default About;
