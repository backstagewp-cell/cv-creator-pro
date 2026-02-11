import { useResume } from "@/contexts/ResumeContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Experience } from "@/types/resume";

const ExperienceStep = () => {
  const { data, setData } = useResume();

  const addExperience = () => {
    const newExp: Experience = {
      id: crypto.randomUUID(),
      company: "",
      role: "",
      startDate: "",
      endDate: "",
      description: "",
    };
    setData((prev) => ({ ...prev, experiences: [...prev.experiences, newExp] }));
  };

  const updateExp = (id: string, field: keyof Experience, value: string) => {
    setData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    }));
  };

  const removeExp = (id: string) => {
    setData((prev) => ({ ...prev, experiences: prev.experiences.filter((e) => e.id !== id) }));
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-1">Experiência Profissional</h2>
          <p className="text-sm text-muted-foreground">Adicione suas experiências de trabalho</p>
        </div>
        <Button onClick={addExperience} variant="outline" size="sm">
          <Plus className="mr-1 h-4 w-4" /> Adicionar
        </Button>
      </div>

      {data.experiences.length === 0 && (
        <div className="text-center py-8 border border-dashed rounded-lg">
          <p className="text-muted-foreground text-sm">Nenhuma experiência adicionada</p>
          <Button onClick={addExperience} variant="ghost" size="sm" className="mt-2">
            <Plus className="mr-1 h-4 w-4" /> Adicionar experiência
          </Button>
        </div>
      )}

      {data.experiences.map((exp, i) => (
        <div key={exp.id} className="p-4 border rounded-lg space-y-3 bg-card">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Experiência {i + 1}</span>
            <Button onClick={() => removeExp(exp.id)} variant="ghost" size="icon" className="h-8 w-8">
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label>Empresa</Label>
              <Input value={exp.company} onChange={(e) => updateExp(exp.id, "company", e.target.value)} placeholder="Nome da empresa" />
            </div>
            <div className="space-y-1">
              <Label>Cargo</Label>
              <Input value={exp.role} onChange={(e) => updateExp(exp.id, "role", e.target.value)} placeholder="Seu cargo" />
            </div>
            <div className="space-y-1">
              <Label>Início</Label>
              <Input value={exp.startDate} onChange={(e) => updateExp(exp.id, "startDate", e.target.value)} placeholder="Jan/2020" />
            </div>
            <div className="space-y-1">
              <Label>Término</Label>
              <Input value={exp.endDate} onChange={(e) => updateExp(exp.id, "endDate", e.target.value)} placeholder="Dez/2023 ou Atual" />
            </div>
          </div>
          <div className="space-y-1">
            <Label>Descrição das atividades</Label>
            <Textarea
              value={exp.description}
              onChange={(e) => updateExp(exp.id, "description", e.target.value)}
              placeholder="Descreva suas principais atividades e conquistas..."
              className="min-h-[80px] resize-none"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExperienceStep;
