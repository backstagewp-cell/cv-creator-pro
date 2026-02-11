import { ResumeData, TemplateType } from "@/types/resume";
import { Button } from "@/components/ui/button";
import { useResume } from "@/contexts/ResumeContext";
import { Download, FileText } from "lucide-react";
import { generatePDF } from "@/utils/pdfGenerator";
import { toast } from "@/hooks/use-toast";

const levelLabels: Record<string, string> = {
  basic: "Básico",
  intermediate: "Intermediário",
  advanced: "Avançado",
  fluent: "Fluente",
};

const TemplateSelector = () => {
  const { template, setTemplate } = useResume();
  const templates: { value: TemplateType; label: string }[] = [
    { value: "classic", label: "Clássico" },
    { value: "modern", label: "Moderno" },
    { value: "minimal", label: "Minimalista" },
  ];

  return (
    <div className="flex gap-2 mb-4">
      {templates.map((t) => (
        <button
          key={t.value}
          onClick={() => setTemplate(t.value)}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
            template === t.value
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
};

// Section component for templates
const Section = ({ title, children, color = "#2563eb" }: { title: string; children: React.ReactNode; color?: string }) => (
  <div style={{ marginBottom: 12 }}>
    <h3 style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color, marginBottom: 6, borderBottom: `1.5px solid ${color}`, paddingBottom: 3 }}>
      {title}
    </h3>
    {children}
  </div>
);

const ClassicTemplate = ({ data }: { data: ResumeData }) => (
  <div style={{ fontFamily: "'DM Sans', Helvetica, Arial, sans-serif", fontSize: 9, color: "#1a1a2e", lineHeight: 1.5 }}>
    {/* Header */}
    <div style={{ textAlign: "center", marginBottom: 14, borderBottom: "2px solid #2563eb", paddingBottom: 10 }}>
      <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0, color: "#1a1a2e" }}>{data.personalInfo.fullName || "Seu Nome"}</h1>
      {data.personalInfo.desiredRole && <p style={{ fontSize: 11, color: "#2563eb", fontWeight: 500, margin: "2px 0 0" }}>{data.personalInfo.desiredRole}</p>}
      <div style={{ fontSize: 8, color: "#666", marginTop: 6, display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
        {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
        {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
        {data.personalInfo.city && <span>{data.personalInfo.city}{data.personalInfo.state ? `, ${data.personalInfo.state}` : ""}</span>}
        {data.personalInfo.linkedin && <span>{data.personalInfo.linkedin}</span>}
      </div>
    </div>

    {data.summary && (
      <Section title="Resumo Profissional">
        <p style={{ fontSize: 9, color: "#444" }}>{data.summary}</p>
      </Section>
    )}

    {data.experiences.length > 0 && (
      <Section title="Experiência Profissional">
        {data.experiences.map((exp) => (
          <div key={exp.id} style={{ marginBottom: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <strong style={{ fontSize: 10 }}>{exp.role}</strong>
              <span style={{ fontSize: 8, color: "#888" }}>{exp.startDate} – {exp.endDate}</span>
            </div>
            <p style={{ fontSize: 9, color: "#2563eb", margin: "1px 0" }}>{exp.company}</p>
            {exp.description && <p style={{ fontSize: 8.5, color: "#555", marginTop: 2 }}>{exp.description}</p>}
          </div>
        ))}
      </Section>
    )}

    {data.education.length > 0 && (
      <Section title="Formação Acadêmica">
        {data.education.map((edu) => (
          <div key={edu.id} style={{ marginBottom: 4 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <strong style={{ fontSize: 9.5 }}>{edu.course}</strong>
              <span style={{ fontSize: 8, color: "#888" }}>{edu.year} • {edu.status === "completed" ? "Concluído" : "Cursando"}</span>
            </div>
            <p style={{ fontSize: 8.5, color: "#666" }}>{edu.institution}</p>
          </div>
        ))}
      </Section>
    )}

    {(data.technicalSkills || data.softSkills) && (
      <Section title="Habilidades">
        {data.technicalSkills && <p style={{ fontSize: 8.5, marginBottom: 3 }}><strong>Técnicas:</strong> {data.technicalSkills}</p>}
        {data.softSkills && <p style={{ fontSize: 8.5 }}><strong>Comportamentais:</strong> {data.softSkills}</p>}
      </Section>
    )}

    {data.courses.length > 0 && (
      <Section title="Cursos e Certificações">
        {data.courses.map((c) => (
          <p key={c.id} style={{ fontSize: 8.5, marginBottom: 2 }}>
            <strong>{c.name}</strong> – {c.institution} {c.year && `(${c.year})`} {c.hours && `• ${c.hours}`}
          </p>
        ))}
      </Section>
    )}

    {data.languages.length > 0 && (
      <Section title="Idiomas">
        {data.languages.map((l) => (
          <p key={l.id} style={{ fontSize: 8.5, marginBottom: 2 }}>{l.name} – {levelLabels[l.level]}</p>
        ))}
      </Section>
    )}
  </div>
);

const ModernTemplate = ({ data }: { data: ResumeData }) => (
  <div style={{ fontFamily: "'DM Sans', Helvetica, Arial, sans-serif", fontSize: 9, color: "#1a1a2e", lineHeight: 1.5, display: "flex", minHeight: "100%" }}>
    {/* Sidebar */}
    <div style={{ width: "32%", backgroundColor: "#1e293b", color: "#e2e8f0", padding: "16px 12px", borderRadius: "0" }}>
      <h1 style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 2, wordBreak: "break-word" }}>{data.personalInfo.fullName || "Seu Nome"}</h1>
      {data.personalInfo.desiredRole && <p style={{ fontSize: 9, color: "#93c5fd", fontWeight: 500, marginBottom: 12 }}>{data.personalInfo.desiredRole}</p>}

      <div style={{ fontSize: 8, marginBottom: 14 }}>
        <p style={{ fontWeight: 600, fontSize: 9, marginBottom: 4, color: "#93c5fd", textTransform: "uppercase", letterSpacing: 1 }}>Contato</p>
        {data.personalInfo.email && <p style={{ marginBottom: 3 }}>{data.personalInfo.email}</p>}
        {data.personalInfo.phone && <p style={{ marginBottom: 3 }}>{data.personalInfo.phone}</p>}
        {data.personalInfo.city && <p style={{ marginBottom: 3 }}>{data.personalInfo.city}{data.personalInfo.state ? `, ${data.personalInfo.state}` : ""}</p>}
        {data.personalInfo.linkedin && <p style={{ marginBottom: 3 }}>{data.personalInfo.linkedin}</p>}
      </div>

      {(data.technicalSkills || data.softSkills) && (
        <div style={{ marginBottom: 14 }}>
          <p style={{ fontWeight: 600, fontSize: 9, marginBottom: 4, color: "#93c5fd", textTransform: "uppercase", letterSpacing: 1 }}>Habilidades</p>
          {data.technicalSkills && <p style={{ fontSize: 8, marginBottom: 4 }}>{data.technicalSkills}</p>}
          {data.softSkills && <p style={{ fontSize: 8 }}>{data.softSkills}</p>}
        </div>
      )}

      {data.languages.length > 0 && (
        <div>
          <p style={{ fontWeight: 600, fontSize: 9, marginBottom: 4, color: "#93c5fd", textTransform: "uppercase", letterSpacing: 1 }}>Idiomas</p>
          {data.languages.map((l) => (
            <p key={l.id} style={{ fontSize: 8, marginBottom: 2 }}>{l.name} – {levelLabels[l.level]}</p>
          ))}
        </div>
      )}
    </div>

    {/* Main Content */}
    <div style={{ flex: 1, padding: "16px 14px" }}>
      {data.summary && (
        <Section title="Resumo" color="#1e293b">
          <p style={{ fontSize: 9, color: "#444" }}>{data.summary}</p>
        </Section>
      )}

      {data.experiences.length > 0 && (
        <Section title="Experiência" color="#1e293b">
          {data.experiences.map((exp) => (
            <div key={exp.id} style={{ marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <strong style={{ fontSize: 10 }}>{exp.role}</strong>
                <span style={{ fontSize: 7.5, color: "#888" }}>{exp.startDate} – {exp.endDate}</span>
              </div>
              <p style={{ fontSize: 9, color: "#1e293b", fontWeight: 500, margin: "1px 0" }}>{exp.company}</p>
              {exp.description && <p style={{ fontSize: 8.5, color: "#555", marginTop: 2 }}>{exp.description}</p>}
            </div>
          ))}
        </Section>
      )}

      {data.education.length > 0 && (
        <Section title="Formação" color="#1e293b">
          {data.education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: 4 }}>
              <strong style={{ fontSize: 9.5 }}>{edu.course}</strong>
              <span style={{ fontSize: 8, color: "#888" }}> • {edu.year} • {edu.status === "completed" ? "Concluído" : "Cursando"}</span>
              <p style={{ fontSize: 8.5, color: "#666" }}>{edu.institution}</p>
            </div>
          ))}
        </Section>
      )}

      {data.courses.length > 0 && (
        <Section title="Certificações" color="#1e293b">
          {data.courses.map((c) => (
            <p key={c.id} style={{ fontSize: 8.5, marginBottom: 2 }}>
              <strong>{c.name}</strong> – {c.institution} {c.year && `(${c.year})`}
            </p>
          ))}
        </Section>
      )}
    </div>
  </div>
);

const MinimalTemplate = ({ data }: { data: ResumeData }) => (
  <div style={{ fontFamily: "'DM Sans', Helvetica, Arial, sans-serif", fontSize: 9, color: "#333", lineHeight: 1.6 }}>
    <div style={{ marginBottom: 16 }}>
      <h1 style={{ fontSize: 22, fontWeight: 300, margin: 0, color: "#111", letterSpacing: -0.5 }}>{data.personalInfo.fullName || "Seu Nome"}</h1>
      {data.personalInfo.desiredRole && <p style={{ fontSize: 11, color: "#666", fontWeight: 400 }}>{data.personalInfo.desiredRole}</p>}
      <div style={{ fontSize: 8, color: "#999", marginTop: 6, display: "flex", gap: 10, flexWrap: "wrap" }}>
        {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
        {data.personalInfo.phone && <span>• {data.personalInfo.phone}</span>}
        {data.personalInfo.city && <span>• {data.personalInfo.city}{data.personalInfo.state ? `, ${data.personalInfo.state}` : ""}</span>}
        {data.personalInfo.linkedin && <span>• {data.personalInfo.linkedin}</span>}
      </div>
    </div>

    {data.summary && (
      <div style={{ marginBottom: 14, paddingBottom: 10, borderBottom: "1px solid #eee" }}>
        <p style={{ fontSize: 9, color: "#555" }}>{data.summary}</p>
      </div>
    )}

    {data.experiences.length > 0 && (
      <div style={{ marginBottom: 14 }}>
        <h3 style={{ fontSize: 10, fontWeight: 600, color: "#111", marginBottom: 8, textTransform: "uppercase", letterSpacing: 2 }}>Experiência</h3>
        {data.experiences.map((exp) => (
          <div key={exp.id} style={{ marginBottom: 8, paddingLeft: 8, borderLeft: "2px solid #ddd" }}>
            <strong style={{ fontSize: 9.5 }}>{exp.role}</strong>
            <span style={{ fontSize: 8, color: "#999" }}> — {exp.company} • {exp.startDate} – {exp.endDate}</span>
            {exp.description && <p style={{ fontSize: 8.5, color: "#666", marginTop: 2 }}>{exp.description}</p>}
          </div>
        ))}
      </div>
    )}

    {data.education.length > 0 && (
      <div style={{ marginBottom: 14 }}>
        <h3 style={{ fontSize: 10, fontWeight: 600, color: "#111", marginBottom: 6, textTransform: "uppercase", letterSpacing: 2 }}>Formação</h3>
        {data.education.map((edu) => (
          <p key={edu.id} style={{ fontSize: 8.5, marginBottom: 3 }}>
            <strong>{edu.course}</strong> — {edu.institution} • {edu.year} ({edu.status === "completed" ? "Concluído" : "Cursando"})
          </p>
        ))}
      </div>
    )}

    {(data.technicalSkills || data.softSkills) && (
      <div style={{ marginBottom: 14 }}>
        <h3 style={{ fontSize: 10, fontWeight: 600, color: "#111", marginBottom: 6, textTransform: "uppercase", letterSpacing: 2 }}>Habilidades</h3>
        {data.technicalSkills && <p style={{ fontSize: 8.5, marginBottom: 2 }}>{data.technicalSkills}</p>}
        {data.softSkills && <p style={{ fontSize: 8.5, color: "#666" }}>{data.softSkills}</p>}
      </div>
    )}

    <div style={{ display: "flex", gap: 24 }}>
      {data.courses.length > 0 && (
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: 10, fontWeight: 600, color: "#111", marginBottom: 6, textTransform: "uppercase", letterSpacing: 2 }}>Certificações</h3>
          {data.courses.map((c) => (
            <p key={c.id} style={{ fontSize: 8, marginBottom: 2 }}>{c.name} — {c.institution}</p>
          ))}
        </div>
      )}
      {data.languages.length > 0 && (
        <div>
          <h3 style={{ fontSize: 10, fontWeight: 600, color: "#111", marginBottom: 6, textTransform: "uppercase", letterSpacing: 2 }}>Idiomas</h3>
          {data.languages.map((l) => (
            <p key={l.id} style={{ fontSize: 8, marginBottom: 2 }}>{l.name} — {levelLabels[l.level]}</p>
          ))}
        </div>
      )}
    </div>
  </div>
);

const ResumePreview = () => {
  const { data, template } = useResume();

  const handleDownload = async () => {
    try {
      const name = data.personalInfo.fullName.replace(/\s+/g, "") || "MeuCurriculo";
      await generatePDF("resume-preview-content", `Curriculo-${name}.pdf`);
      toast({ title: "PDF baixado com sucesso!" });
    } catch {
      toast({ title: "Erro ao gerar PDF", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <TemplateSelector />
        <Button onClick={handleDownload} variant="hero" size="sm">
          <Download className="mr-1 h-4 w-4" /> Baixar PDF
        </Button>
      </div>

      {/* A4 Preview */}
      <div className="border rounded-lg overflow-hidden shadow-card bg-card">
        <div className="p-2 border-b bg-secondary/50 flex items-center gap-2">
          <FileText className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Visualização A4</span>
        </div>
        <div className="flex justify-center p-4 bg-secondary/30">
          <div
            id="resume-preview-content"
            style={{
              width: 595,
              minHeight: 842,
              padding: 32,
              backgroundColor: "#ffffff",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            }}
          >
            {template === "classic" && <ClassicTemplate data={data} />}
            {template === "modern" && <ModernTemplate data={data} />}
            {template === "minimal" && <MinimalTemplate data={data} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
