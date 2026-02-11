import { calculateQualityScore } from "@/utils/qualityScore";
import { useResume } from "@/contexts/ResumeContext";
import { CheckCircle, AlertCircle, Lightbulb } from "lucide-react";

const QualityScore = () => {
  const { data } = useResume();
  const { score, tips } = calculateQualityScore(data);

  const getColor = () => {
    if (score >= 80) return "text-success";
    if (score >= 50) return "text-warning";
    return "text-destructive";
  };

  const getLabel = () => {
    if (score >= 80) return "Excelente";
    if (score >= 60) return "Bom";
    if (score >= 40) return "Regular";
    return "Precisa melhorar";
  };

  return (
    <div className="p-4 border rounded-lg bg-card space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Qualidade do Currículo</h3>
        <div className={`text-2xl font-bold ${getColor()}`}>{score}</div>
      </div>

      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${
            score >= 80 ? "bg-success" : score >= 50 ? "bg-warning" : "bg-destructive"
          }`}
          style={{ width: `${score}%` }}
        />
      </div>

      <div className={`text-sm font-medium ${getColor()} flex items-center gap-1`}>
        {score >= 80 ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
        {getLabel()}
      </div>

      {tips.length > 0 && (
        <div className="space-y-1.5 pt-2 border-t">
          <p className="text-xs font-medium text-muted-foreground flex items-center gap-1">
            <Lightbulb className="h-3 w-3" /> Dicas para melhorar:
          </p>
          {tips.map((tip, i) => (
            <p key={i} className="text-xs text-muted-foreground pl-4">• {tip}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default QualityScore;
