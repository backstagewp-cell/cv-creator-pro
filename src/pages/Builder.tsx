import { ResumeProvider, useResume } from "@/contexts/ResumeContext";
import PersonalInfoStep from "@/components/builder/PersonalInfoStep";
import SummaryStep from "@/components/builder/SummaryStep";
import ExperienceStep from "@/components/builder/ExperienceStep";
import EducationStep from "@/components/builder/EducationStep";
import CoursesStep from "@/components/builder/CoursesStep";
import SkillsStep from "@/components/builder/SkillsStep";
import LanguagesStep from "@/components/builder/LanguagesStep";
import StepProgress from "@/components/builder/StepProgress";
import ResumePreview from "@/components/preview/ResumePreview";
import QualityScore from "@/components/preview/QualityScore";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Eye, FileText } from "lucide-react";
import { useState } from "react";

const STEPS = [
  { label: "Pessoal", component: PersonalInfoStep },
  { label: "Resumo", component: SummaryStep },
  { label: "Experiência", component: ExperienceStep },
  { label: "Formação", component: EducationStep },
  { label: "Cursos", component: CoursesStep },
  { label: "Habilidades", component: SkillsStep },
  { label: "Idiomas", component: LanguagesStep },
];

const BuilderContent = () => {
  const { currentStep, setCurrentStep } = useResume();
  const [showPreview, setShowPreview] = useState(false);

  const StepComponent = STEPS[currentStep].component;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 text-foreground font-semibold">
            <FileText className="h-5 w-5 text-primary" />
            <span>CurriculoPro</span>
          </a>
          <Button
            variant="outline"
            size="sm"
            className="md:hidden"
            onClick={() => setShowPreview(!showPreview)}
          >
            <Eye className="mr-1 h-4 w-4" />
            {showPreview ? "Editar" : "Visualizar"}
          </Button>
        </div>
      </header>

      <div className="container max-w-7xl mx-auto px-4 py-6">
        {/* Progress */}
        <div className="mb-6">
          <StepProgress
            currentStep={currentStep}
            totalSteps={STEPS.length}
            stepLabels={STEPS.map((s) => s.label)}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form */}
          <div className={`${showPreview ? "hidden md:block" : ""}`}>
            <div className="bg-card border rounded-lg p-6 shadow-card hover:border-primary/20 transition-colors">
              <StepComponent />

              {/* Navigation */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                >
                  <ChevronLeft className="mr-1 h-4 w-4" /> Anterior
                </Button>

                {currentStep < STEPS.length - 1 ? (
                  <Button onClick={() => setCurrentStep(currentStep + 1)}>
                    Próximo <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                ) : (
                  <Button variant="hero" onClick={() => setShowPreview(true)}>
                    <Eye className="mr-1 h-4 w-4" /> Ver Currículo
                  </Button>
                )}
              </div>
            </div>

            {/* Quality Score - below form on desktop */}
            <div className="mt-4 hidden lg:block">
              <QualityScore />
            </div>
          </div>

          {/* Preview */}
          <div className={`${!showPreview ? "hidden md:block" : ""}`}>
            <ResumePreview />
            <div className="mt-4 lg:hidden">
              <QualityScore />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Builder = () => (
  <ResumeProvider>
    <BuilderContent />
  </ResumeProvider>
);

export default Builder;
