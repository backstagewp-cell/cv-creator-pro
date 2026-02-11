import { useResume } from "@/contexts/ResumeContext";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const SkillsStep = () => {
  const { data, setData } = useResume();

  return (
    <div className="space-y-4 animate-fade-in">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-1">Habilidades</h2>
        <p className="text-sm text-muted-foreground">Suas competências técnicas e comportamentais</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="technicalSkills">Habilidades Técnicas</Label>
          <Textarea
            id="technicalSkills"
            value={data.technicalSkills}
            onChange={(e) => setData((prev) => ({ ...prev, technicalSkills: e.target.value }))}
            placeholder="Excel, Power BI, Python, SQL, Gestão de Projetos, Scrum..."
            className="min-h-[100px] resize-none"
          />
          <p className="text-xs text-muted-foreground">Separe por vírgulas</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="softSkills">Habilidades Comportamentais</Label>
          <Textarea
            id="softSkills"
            value={data.softSkills}
            onChange={(e) => setData((prev) => ({ ...prev, softSkills: e.target.value }))}
            placeholder="Liderança, Comunicação, Trabalho em equipe, Resolução de problemas..."
            className="min-h-[100px] resize-none"
          />
          <p className="text-xs text-muted-foreground">Separe por vírgulas</p>
        </div>
      </div>
    </div>
  );
};

export default SkillsStep;
