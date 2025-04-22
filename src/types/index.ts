
export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone?: string;
  resumeText: string;
  resumeFile: File;
  resumeUrl: string;
  score: number;
  scoreBreakdown: ScoreBreakdown;
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  lastUpdated: Date;
}

export interface ScoreBreakdown {
  overall: number;
  skillsMatch: number;
  experienceMatch: number;
  educationMatch: number;
  keywordMatch: number;
  atsCompatibility: number;
}

export interface Skill {
  name: string;
  level?: number;
  isMatch: boolean;
}

export interface Experience {
  title: string;
  company: string;
  startDate: string;
  endDate?: string;
  description: string;
  keywordMatches?: string[];
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
}

export interface JobDescription {
  id: string;
  title: string;
  company: string;
  description: string;
  requiredSkills: string[];
  preferredSkills: string[];
  minimumExperience: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ParsedResume {
  text: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
}

export type SortOption = 'score' | 'name' | 'lastUpdated';
export type FilterOption = 'all' | 'highMatch' | 'mediumMatch' | 'lowMatch';
