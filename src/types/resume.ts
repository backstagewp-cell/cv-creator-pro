export interface PersonalInfo {
  fullName: string;
  desiredRole: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  linkedin: string;
  portfolio: string;
  photo: string | null;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  course: string;
  institution: string;
  year: string;
  status: "completed" | "ongoing";
}

export interface Course {
  id: string;
  name: string;
  institution: string;
  hours: string;
  year: string;
}

export interface Language {
  id: string;
  name: string;
  level: "basic" | "intermediate" | "advanced" | "fluent";
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experiences: Experience[];
  education: Education[];
  courses: Course[];
  technicalSkills: string;
  softSkills: string;
  languages: Language[];
}

export type TemplateType = "classic" | "modern" | "minimal";

export const emptyResumeData: ResumeData = {
  personalInfo: {
    fullName: "",
    desiredRole: "",
    phone: "",
    email: "",
    city: "",
    state: "",
    linkedin: "",
    portfolio: "",
    photo: null,
  },
  summary: "",
  experiences: [],
  education: [],
  courses: [],
  technicalSkills: "",
  softSkills: "",
  languages: [],
};
