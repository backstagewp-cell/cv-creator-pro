import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Zap, Layout, Download, ArrowRight, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-resume.jpg";

const features = [
  {
    icon: Zap,
    title: "Preenchimento Rápido",
    description: "Formulário intuitivo dividido em etapas simples e organizadas",
  },
  {
    icon: Layout,
    title: "3 Modelos Profissionais",
    description: "Escolha entre Clássico, Moderno ou Minimalista para seu perfil",
  },
  {
    icon: Download,
    title: "PDF Pronto para Enviar",
    description: "Gere e baixe seu currículo em formato A4 profissional",
  },
];

const steps = [
  { step: "01", title: "Preencha", description: "Insira suas informações seguindo o formulário guiado" },
  { step: "02", title: "Visualize", description: "Veja a prévia do seu currículo em tempo real" },
  { step: "03", title: "Baixe", description: "Faça o download do PDF formatado e profissional" },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold text-foreground">
            <FileText className="h-5 w-5 text-primary" />
            CurriculoPro
          </div>
          <Button onClick={() => navigate("/builder")} size="sm">
            Criar Currículo
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="gradient-hero">
        <div className="container max-w-6xl mx-auto px-4 py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <Badge variant="outline" className="mb-4 border-primary/30 text-primary bg-primary/5">
                Novo tema vermelho
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4">
                Seu curriculo{" "}
                <span className="text-primary uppercase">profissional</span> em poucos instantes.
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                Preencha suas informações, escolha um modelo e baixe seu currículo em PDF —
                pronto para processos seletivos.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="hero" size="xl" onClick={() => navigate("/builder")}>
                  Gerar Meu Currículo <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              <div className="flex items-center gap-6 mt-8 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><CheckCircle className="h-4 w-4 text-success" /> 100% gratuito</span>
                <span className="flex items-center gap-1"><CheckCircle className="h-4 w-4 text-success" /> Sem cadastro</span>
                <span className="flex items-center gap-1"><CheckCircle className="h-4 w-4 text-success" /> PDF A4</span>
              </div>
            </div>
            <div className="hidden md:block animate-slide-in">
              <img
                src={heroImage}
                alt="Exemplo de currículo profissional"
                className="rounded-xl shadow-elevated w-full ring-1 ring-primary/10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-card">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Tudo que você precisa</h2>
            <p className="text-muted-foreground">Ferramentas simples para criar um currículo que se destaca</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="p-6 rounded-xl border bg-background shadow-card hover:shadow-card-hover hover:border-primary/30 transition-all duration-300 group">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <f.icon className="h-5 w-5 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Como funciona</h2>
            <p className="text-muted-foreground">3 passos simples para seu currículo perfeito</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s) => (
              <div key={s.step} className="text-center p-6 rounded-xl border bg-card hover:border-primary/30 transition-colors">
                <div className="text-4xl font-bold text-primary/30 mb-3">{s.step}</div>
                <h3 className="font-semibold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-card border-t">
        <div className="container max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Pronto para começar?</h2>
          <p className="text-muted-foreground mb-6">Crie seu currículo profissional agora — é rápido e gratuito</p>
          <Button variant="hero" size="xl" onClick={() => navigate("/builder")}>
            Gerar Meu Currículo <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-6">
        <div className="container max-w-6xl mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2026 CurriculoPro. Gerador de currículos profissionais.
        </div>
      </footer>
    </div>
  );
};

export default Index;
