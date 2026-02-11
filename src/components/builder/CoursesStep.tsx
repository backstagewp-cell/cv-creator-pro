import { useResume } from "@/contexts/ResumeContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Course } from "@/types/resume";

const CoursesStep = () => {
  const { data, setData } = useResume();

  const add = () => {
    const item: Course = { id: crypto.randomUUID(), name: "", institution: "", hours: "", year: "" };
    setData((prev) => ({ ...prev, courses: [...prev.courses, item] }));
  };

  const update = (id: string, field: keyof Course, value: string) => {
    setData((prev) => ({
      ...prev,
      courses: prev.courses.map((c) => (c.id === id ? { ...c, [field]: value } : c)),
    }));
  };

  const remove = (id: string) => {
    setData((prev) => ({ ...prev, courses: prev.courses.filter((c) => c.id !== id) }));
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-1">Cursos e Certificações</h2>
          <p className="text-sm text-muted-foreground">Certificações e cursos complementares</p>
        </div>
        <Button onClick={add} variant="outline" size="sm"><Plus className="mr-1 h-4 w-4" /> Adicionar</Button>
      </div>

      {data.courses.length === 0 && (
        <div className="text-center py-8 border border-dashed rounded-lg">
          <p className="text-muted-foreground text-sm">Nenhum curso adicionado</p>
          <Button onClick={add} variant="ghost" size="sm" className="mt-2"><Plus className="mr-1 h-4 w-4" /> Adicionar curso</Button>
        </div>
      )}

      {data.courses.map((course, i) => (
        <div key={course.id} className="p-4 border rounded-lg space-y-3 bg-card">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Curso {i + 1}</span>
            <Button onClick={() => remove(course.id)} variant="ghost" size="icon" className="h-8 w-8"><Trash2 className="h-4 w-4 text-destructive" /></Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label>Nome do curso</Label>
              <Input value={course.name} onChange={(e) => update(course.id, "name", e.target.value)} placeholder="Excel Avançado" />
            </div>
            <div className="space-y-1">
              <Label>Instituição</Label>
              <Input value={course.institution} onChange={(e) => update(course.id, "institution", e.target.value)} placeholder="Instituição" />
            </div>
            <div className="space-y-1">
              <Label>Carga horária (opcional)</Label>
              <Input value={course.hours} onChange={(e) => update(course.id, "hours", e.target.value)} placeholder="40h" />
            </div>
            <div className="space-y-1">
              <Label>Ano</Label>
              <Input value={course.year} onChange={(e) => update(course.id, "year", e.target.value)} placeholder="2023" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CoursesStep;
