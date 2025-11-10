import "./App.css";
import { useMemo } from "react";
import Header from "./components/Header";
import Intro from "./components/sections/Intro";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";

// 타입 import
import type { AboutData, SkillCategory, IntroData, ProjectsData } from "./types";

// 데이터 import
import introData from "./data/intro.json";
import aboutData from "./data/about.json";
import skillsData from "./data/skills.json";
import navigationData from "./data/navigation.json";
import projectsData from "./data/projects.json";
import Projects from "./components/sections/Project";

export default function App() {
  const navSections = useMemo(() => navigationData, []);

  return (
    <div className="bg-white overflow-x-hidden">
      <Header sections={navSections} />
      <Intro data={introData as IntroData} />
      <About data={aboutData as AboutData} />
      <Skills skills={skillsData as SkillCategory[]} />
      <Projects data={projectsData as ProjectsData} />
    </div>
  );
}
