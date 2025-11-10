export interface SkillItem {
  name: string;
  logo: string;
  description: string;
  proficiency?: number; // 0-100
}

export interface SkillCategory {
  category: string;
  items: SkillItem[];
}