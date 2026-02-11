import { ResumeData } from "@/types/resume";

interface ScoreResult {
  score: number;
  tips: string[];
}

export function calculateQualityScore(data: ResumeData): ScoreResult {
  let score = 0;
  const tips: string[] = [];

  // Personal Info (25 pts)
  if (data.personalInfo.fullName) score += 8;
  else tips.push("Adicione seu nome completo");
  if (data.personalInfo.email) score += 5;
  else tips.push("Adicione seu e-mail");
  if (data.personalInfo.phone) score += 5;
  else tips.push("Adicione seu telefone");
  if (data.personalInfo.desiredRole) score += 5;
  else tips.push("Defina o cargo desejado");
  if (data.personalInfo.linkedin) score += 2;

  // Summary (20 pts)
  if (data.summary.length > 0) score += 10;
  else tips.push("Escreva um resumo profissional");
  if (data.summary.length > 100) score += 5;
  if (data.summary.length > 200) score += 5;
  else if (data.summary.length > 0) tips.push("Expanda seu resumo para pelo menos 200 caracteres");

  // Experience (25 pts)
  if (data.experiences.length > 0) score += 10;
  else tips.push("Adicione pelo menos uma experiência profissional");
  if (data.experiences.length >= 2) score += 5;
  const hasDescriptions = data.experiences.some((e) => e.description.length > 50);
  if (hasDescriptions) score += 10;
  else if (data.experiences.length > 0) tips.push("Detalhe melhor suas atividades nas experiências");

  // Education (10 pts)
  if (data.education.length > 0) score += 10;
  else tips.push("Adicione sua formação acadêmica");

  // Skills (10 pts)
  if (data.technicalSkills) score += 5;
  else tips.push("Liste suas habilidades técnicas");
  if (data.softSkills) score += 5;
  else tips.push("Liste suas habilidades comportamentais");

  // Courses (5 pts)
  if (data.courses.length > 0) score += 5;

  // Languages (5 pts)
  if (data.languages.length > 0) score += 5;

  return { score: Math.min(score, 100), tips: tips.slice(0, 5) };
}
