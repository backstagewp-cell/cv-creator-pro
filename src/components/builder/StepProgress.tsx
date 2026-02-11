interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

const StepProgress = ({ currentStep, totalSteps, stepLabels }: StepProgressProps) => {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-foreground">
          Etapa {currentStep + 1} de {totalSteps}
        </span>
        <span className="text-muted-foreground">{stepLabels[currentStep]}</span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full gradient-primary rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="hidden md:flex justify-between">
        {stepLabels.map((label, i) => (
          <div
            key={i}
            className={`text-xs transition-colors ${
              i <= currentStep ? "text-primary font-medium" : "text-muted-foreground"
            }`}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepProgress;
