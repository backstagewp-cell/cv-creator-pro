import { useResume } from "@/contexts/ResumeContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const PersonalInfoStep = () => {
  const { data, setData } = useResume();
  const info = data.personalInfo;

  const update = (field: string, value: string) => {
    setData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }));
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-1">Informações Pessoais</h2>
        <p className="text-sm text-muted-foreground">Seus dados de contato para o currículo</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Nome completo *</Label>
          <Input id="fullName" value={info.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="João da Silva" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="desiredRole">Cargo desejado *</Label>
          <Input id="desiredRole" value={info.desiredRole} onChange={(e) => update("desiredRole", e.target.value)} placeholder="Analista de Marketing" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Telefone *</Label>
          <Input id="phone" value={info.phone} onChange={(e) => update("phone", e.target.value)} placeholder="(11) 99999-9999" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">E-mail *</Label>
          <Input id="email" type="email" value={info.email} onChange={(e) => update("email", e.target.value)} placeholder="joao@email.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="city">Cidade</Label>
          <Input id="city" value={info.city} onChange={(e) => update("city", e.target.value)} placeholder="São Paulo" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">Estado</Label>
          <Input id="state" value={info.state} onChange={(e) => update("state", e.target.value)} placeholder="SP" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn (opcional)</Label>
          <Input id="linkedin" value={info.linkedin} onChange={(e) => update("linkedin", e.target.value)} placeholder="linkedin.com/in/joaosilva" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="portfolio">Portfólio (opcional)</Label>
          <Input id="portfolio" value={info.portfolio} onChange={(e) => update("portfolio", e.target.value)} placeholder="meuportfolio.com" />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoStep;
