import {
  BarChart3,
  Code2,
  Gauge,
  Target,
  Users,
  Workflow,
  Zap,
} from "lucide-react";

export const operationKpis = [
  {
    value: 26522,
    label: "Total de execuções",
    delta: "↑ 94,4%",
    tone: "positive",
    icon: BarChart3,
  },
  {
    value: 24712,
    label: "Sucessos",
    delta: "↑ 99,1%",
    tone: "positive",
    icon: Target,
  },
  {
    value: 1440,
    label: "Falhas",
    delta: "↑ 56,5%",
    tone: "negative",
    icon: Gauge,
  },
  {
    value: 93.2,
    decimals: 1,
    suffix: "%",
    label: "Taxa de sucesso",
    delta: "↑ 2,2%",
    tone: "positive",
    icon: Zap,
  },
];

export const topAutomations = [
  {
    name: "Faturamento de Nota Fiscal de Exportação",
    executions: 5752,
  },
  {
    name: "Emissão CSN — Python",
    executions: 5230,
  },
  {
    name: "Enviar NF para SEFAZ",
    executions: 2004,
  },
  {
    name: "RPA Fat. Couro Verde (TO, GO, MT)",
    executions: 1918,
  },
  {
    name: "RPA Fat. Couro Verde (SP, MG)",
    executions: 1910,
  },
];

export const teamMoves = [
  {
    title: "Skills que o CoE precisa",
    description:
      "Python pleno, governança N8N, ops/sustentação, discovery com ROI, IDP/IA com validação — hoje concentradas no especialista.",
  },
  {
    title: "Não contratar mais júnior agora",
    description:
      "4 juniores + 1 especialista. Gargalo é mentoria e review, não headcount júnior.",
  },
  {
    title: "Contratar 1 Analista Pleno (Python/RPA)",
    description:
      "Destravar a migração IBM → Python e aliviar o especialista para arquitetura e padrões.",
  },
  {
    title: "Promover 1 júnior → pleno (6–12 meses)",
    description:
      "Candidato natural: Levi, por stack IBM/Python. Evidência: ownership em PRD + qualidade.",
  },
  {
    title: "Alinhar cargo do Daniel",
    description:
      "Analista Administrativo Pl. no CoE. Converter para trilha de sistemas/automação ou formalizar papel de process analyst.",
  },
  {
    title: "Tracks internos",
    description:
      "João: N8N/governança. Guilherme: delivery. Igor: Tech Lead formal do CoE.",
  },
];

export const initiatives = [
  {
    title: "DHC em PRD",
    subtitle: "Plataforma em produção",
    status: "28/08/2026",
    tone: "doing",
    icon: Zap,
  },
  {
    title: "IBM RPA → Python",
    subtitle: "Modernização do portfólio",
    status: "29/01/2027",
    tone: "doing",
    icon: Code2,
  },
  {
    title: "Governança N8N",
    subtitle: "Padrão e controle da ferramenta",
    status: "Em planejamento",
    tone: "plan",
    icon: Workflow,
  },
];

export const backlog = [
  "Unificação de Arquivos PDF — SAP × Projuris",
  "RPA de Comissão no Siscomex",
  "Conciliação Financeira Automatizada — Sistema × Planilha",
  "RPA — Cargos e Salários Benefícios, Unificação PDF SAP × Projuris",
];

export const timeline = [
  {
    when: "Agora → ago/26",
    title: "Estabilizar",
    items: [
      "Go-live DHC em PRD",
      "Fechar discovery das despesas de exportação",
      "Iniciar catálogo das áreas fora do domínio",
    ],
  },
  {
    when: "set/26 → jan/27",
    title: "Modernizar",
    items: [
      "Migração IBM → Python (29/01)",
      "Governança N8N",
      "Triage e score dos 4 itens de backlog",
    ],
  },
  {
    when: "1º sem/27",
    title: "Escalar",
    items: [
      "Build novo 70% / sustentação 30%",
      "Primeira área extra com business case",
      "Backlog priorizado entra no funil",
    ],
  },
];

export const roiMetrics = {
  analystHours: 140,
  capacity: 42,
  dcpoa: {
    title: "DCPOA",
    volume: "6.113 DCPOAs",
    complement: "9.471 itens · 5.729 execuções",
    hours: 1624,
    analysts: 11.6,
    premise: "Cenário médio · 15 min para DCPOAs de 1–3 itens",
  },
  certificates: {
    title: "CSN + CSI",
    volume: "4.443 certificados",
    complement: "1.258 CSN · 3.185 CSI",
    hours: 4820,
    analysts: 34.4,
    premise: "CSN: 40 min · CSI: 75 min",
  },
  exportInvoice: {
    title: "Faturamento NF de Exportação",
    volume: "570 linhas faturadas",
    complement: "Somente registros com num_status = 1",
    hours: 190,
    analysts: 1.4,
    premise: "20 min de trabalho manual por linha",
  },
  total: {
    hours: 6634,
    analysts: 47.4,
    coverage: 113,
    conservativeAnalysts: 44,
  },
};

export const roiSummaryCards = [
  {
    value: 11.6,
    decimals: 1,
    prefix: "~",
    label: "Analistas p/ DCPOA",
    icon: Gauge,
  },
  {
    value: 34.4,
    decimals: 1,
    prefix: "~",
    label: "Analistas p/ CSN + CSI",
    icon: Users,
  },
  {
    value: 1.4,
    decimals: 1,
    prefix: "~",
    label: "Analistas p/ Fat. Exportação",
    icon: Workflow,
  },
  {
    value: 47.4,
    decimals: 1,
    prefix: "~",
    label: "Total necessário",
    icon: BarChart3,
  },
];
