import { useResume } from "@/contexts/ResumeContext";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const SummaryStep = () => {
  const { data, setData } = useResume();

  return (
    <div className="space-y-4 animate-fade-in">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-1">Resumo Profissional</h2>
        <p className="text-sm text-muted-foreground">Escreva um breve resumo sobre sua trajetória e objetivos</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary">Resumo</Label>
        <Textarea
          id="summary"
          value={data.summary}
          onChange={(e) => setData((prev) => ({ ...prev, summary: e.target.value }))}
          placeholder="Profissional com X anos de experiência em... Busco oportunidades na área de..."
          className="min-h-[160px] resize-none"
        />
        <p className="text-xs text-muted-foreground">{data.summary.length} caracteres • Recomendado: 150-300 caracteres</p>
      </div>
    </div>
  );
};

export default SummaryStep;
