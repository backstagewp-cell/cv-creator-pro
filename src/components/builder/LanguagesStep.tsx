import { useResume } from "@/contexts/ResumeContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { Language } from "@/types/resume";

const LanguagesStep = () => {
  const { data, setData } = useResume();

  const add = () => {
    const item: Language = { id: crypto.randomUUID(), name: "", level: "basic" };
    setData((prev) => ({ ...prev, languages: [...prev.languages, item] }));
  };

  const update = (id: string, field: keyof Language, value: string) => {
    setData((prev) => ({
      ...prev,
      languages: prev.languages.map((l) => (l.id === id ? { ...l, [field]: value } : l)),
    }));
  };

  const remove = (id: string) => {
    setData((prev) => ({ ...prev, languages: prev.languages.filter((l) => l.id !== id) }));
  };

  const levelLabels: Record<string, string> = {
    basic: "Básico",
    intermediate: "Intermediário",
    advanced: "Avançado",
    fluent: "Fluente",
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-1">Idiomas</h2>
          <p className="text-sm text-muted-foreground">Idiomas que você domina</p>
        </div>
        <Button onClick={add} variant="outline" size="sm"><Plus className="mr-1 h-4 w-4" /> Adicionar</Button>
      </div>

      {data.languages.length === 0 && (
        <div className="text-center py-8 border border-dashed rounded-lg">
          <p className="text-muted-foreground text-sm">Nenhum idioma adicionado</p>
          <Button onClick={add} variant="ghost" size="sm" className="mt-2"><Plus className="mr-1 h-4 w-4" /> Adicionar idioma</Button>
        </div>
      )}

      {data.languages.map((lang, i) => (
        <div key={lang.id} className="p-4 border rounded-lg space-y-3 bg-card">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Idioma {i + 1}</span>
            <Button onClick={() => remove(lang.id)} variant="ghost" size="icon" className="h-8 w-8"><Trash2 className="h-4 w-4 text-destructive" /></Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label>Idioma</Label>
              <Input value={lang.name} onChange={(e) => update(lang.id, "name", e.target.value)} placeholder="Inglês" />
            </div>
            <div className="space-y-1">
              <Label>Nível</Label>
              <Select value={lang.level} onValueChange={(v) => update(lang.id, "level", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(levelLabels).map(([val, label]) => (
                    <SelectItem key={val} value={val}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LanguagesStep;
