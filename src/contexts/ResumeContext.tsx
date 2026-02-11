import React, { createContext, useContext, useState } from "react";
import { ResumeData, TemplateType, emptyResumeData } from "@/types/resume";

interface ResumeContextType {
  data: ResumeData;
  setData: React.Dispatch<React.SetStateAction<ResumeData>>;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  template: TemplateType;
  setTemplate: (t: TemplateType) => void;
}

const ResumeContext = createContext<ResumeContextType | null>(null);

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<ResumeData>(emptyResumeData);
  const [currentStep, setCurrentStep] = useState(0);
  const [template, setTemplate] = useState<TemplateType>("classic");

  return (
    <ResumeContext.Provider value={{ data, setData, currentStep, setCurrentStep, template, setTemplate }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error("useResume must be used within ResumeProvider");
  return ctx;
};
