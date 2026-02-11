import { useResume } from "@/contexts/ResumeContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { Education } from "@/types/resume";

const EducationStep = () => {
  const { data, setData } = useResume();

  const add = () => {
    const item: Education = { id: crypto.randomUUID(), course: "", institution: "", year: "", status: "completed" };
    setData((prev) => ({ ...prev, education: [...prev.education, item] }));
  };

  const update = (id: string, field: keyof Education, value: string) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    }));
  };

  const remove = (id: string) => {
    setData((prev) => ({ ...prev, education: prev.education.filter((e) => e.id !== id) }));
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-1">Formação Acadêmica</h2>
          <p className="text-sm text-muted-foreground">Sua formação educacional</p>
        </div>
        <Button onClick={add} variant="outline" size="sm"><Plus className="mr-1 h-4 w-4" /> Adicionar</Button>
      </div>

      {data.education.length === 0 && (
        <div className="text-center py-8 border border-dashed rounded-lg">
          <p className="text-muted-foreground text-sm">Nenhuma formação adicionada</p>
          <Button onClick={add} variant="ghost" size="sm" className="mt-2"><Plus className="mr-1 h-4 w-4" /> Adicionar formação</Button>
        </div>
      )}

      {data.education.map((edu, i) => (
        <div key={edu.id} className="p-4 border rounded-lg space-y-3 bg-card">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Formação {i + 1}</span>
            <Button onClick={() => remove(edu.id)} variant="ghost" size="icon" className="h-8 w-8"><Trash2 className="h-4 w-4 text-destructive" /></Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label>Curso</Label>
              <Input value={edu.course} onChange={(e) => update(edu.id, "course", e.target.value)} placeholder="Administração de Empresas" />
            </div>
            <div className="space-y-1">
              <Label>Instituição</Label>
              <Input value={edu.institution} onChange={(e) => update(edu.id, "institution", e.target.value)} placeholder="Universidade XYZ" />
            </div>
            <div className="space-y-1">
              <Label>Ano de conclusão</Label>
              <Input value={edu.year} onChange={(e) => update(edu.id, "year", e.target.value)} placeholder="2022" />
            </div>
            <div className="space-y-1">
              <Label>Status</Label>
              <Select value={edu.status} onValueChange={(v) => update(edu.id, "status", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="completed">Concluído</SelectItem>
                  <SelectItem value="ongoing">Cursando</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EducationStep;
