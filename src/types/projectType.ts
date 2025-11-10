export interface ProjectInfo {
  projectType: string;
  projectName: string;
  projectDate: string;
  projectSite: string;
  projectGithub: string;
}

export interface ProjectDetail {
  projectExplain: string;
  projectStacks: string[];
  projectReview: string;
}

export interface ProjectData {
  id: number;
  images: string[];
  projectInfo: ProjectInfo;
  projectDetail: ProjectDetail;
}

export interface ProjectsData {
  sectionTitle: string;
  projects: ProjectData[];
}