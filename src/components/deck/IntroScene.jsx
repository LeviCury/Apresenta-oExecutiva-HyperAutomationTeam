import { motion } from "motion/react";
import {
  BriefcaseBusiness,
  Building2,
  Network,
  Search,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import { Badge } from "../ui/badge";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  MotionCard,
} from "../ui/card";
import { EASE, Scene, SceneHeading, SectionLabel } from "./primitives";

const pillars = [
  {
    title: "Propósito",
    icon: Target,
    copy:
      "Industrializar a melhoria de processos digitais: descobrir, construir, operar e provar benefício — não produzir bots sob demanda.",
  },
  {
    title: "Missão na cia",
    icon: Network,
    copy:
      "Ser o CoE de hiperautomação da TI: RPA + integração + IDP/IA, com padrão, SLA e ROI rastreado para as áreas de negócio.",
  },
  {
    title: "Onde queremos chegar",
    icon: Zap,
    copy:
      "Time de referência em automação e encontrar oportunidades de forma proativa. Verificar uma pessoa para catalogar oportunidades em áreas estratégicas.",
  },
];

const process = [
  "Demand",
  "Triage",
  "Discovery",
  "Design",
  "Build",
  "Deploy",
  "Run",
];

export default function IntroScene() {
  return (
    <Scene contentClassName="gap-4">
      <SceneHeading
        eyebrow="01 · Direção"
        title={
          <>
            De time que atende pedidos para CoE que{" "}
            <span className="text-[#e83948]">escolhe valor.</span>
          </>
        }
        description="Propósito, missão e onde chegamos em 12 meses — com a oportunidade de escala ainda aberta na companhia."
        aside={
          <div className="hidden items-center gap-3 rounded-full border border-[#2c5372]/10 bg-white/80 px-4 py-2.5 text-xs font-semibold text-[#426a88] shadow-sm backdrop-blur-md lg:flex">
            <span className="size-1.5 animate-pulse-soft rounded-full bg-[#e83948]" />
            Horizonte · 12 meses
          </div>
        }
      />

      <div className="grid flex-1 gap-4 lg:grid-cols-[minmax(0,1fr)_280px] xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="flex min-w-0 flex-col gap-4">
          <div className="grid gap-4 md:grid-cols-3">
            {pillars.map(({ title, copy, icon: Icon }, index) => (
              <MotionCard
                key={title}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + index * 0.07, duration: 0.5, ease: EASE }}
                className="min-h-[156px]"
              >
                <CardHeader className="p-5 pb-2">
                  <div className="mb-1 flex size-9 items-center justify-center rounded-xl border border-[#e83948]/15 bg-[#e83948]/10 text-[#bf404f]">
                    <Icon className="size-[18px]" strokeWidth={1.8} />
                  </div>
                  <CardTitle className="text-lg">{title}</CardTitle>
                </CardHeader>
                <CardContent className="px-5 pb-5">
                  <CardDescription>{copy}</CardDescription>
                </CardContent>
              </MotionCard>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <MotionCard
              initial={{ opacity: 0, x: -22 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.28, duration: 0.5, ease: EASE }}
              className="p-5"
            >
              <div className="flex items-start gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-[#2c5372] text-white">
                  <Building2 className="size-[18px]" strokeWidth={1.8} />
                </div>
                <div>
                  <SectionLabel className="mb-2">Escala atual</SectionLabel>
                  <h3 className="font-display text-lg font-semibold tracking-[-0.03em]">
                    Hoje — 5 áreas
                  </h3>
                  <p className="mt-1.5 text-sm leading-6 text-[#426a88]">
                    MBS, Financeiro, Estoque, Jurídico e Diretoria Executiva. No
                    MBS: Faturamento, Documentação, Despesas sobre fretes,
                    Despesas de exportação, Cabine Fiscal, Gente e Gestão.
                  </p>
                </div>
              </div>
            </MotionCard>

            <MotionCard
              initial={{ opacity: 0, x: 22 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.34, duration: 0.5, ease: EASE }}
              className="p-5"
            >
              <div className="flex items-start gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl border border-[#e83948]/20 bg-[#e83948]/10 text-[#bf404f]">
                  <Search className="size-[18px]" strokeWidth={1.8} />
                </div>
                <div>
                  <SectionLabel className="mb-2">Próxima fronteira</SectionLabel>
                  <h3 className="font-display text-lg font-semibold tracking-[-0.03em]">
                    Oportunidade
                  </h3>
                  <p className="mt-1.5 text-sm leading-6 text-[#426a88]">
                    Catalogar as áreas que ainda não estão no domínio de
                    automação — e só então priorizar por valor, não por pedido.
                  </p>
                </div>
              </div>
            </MotionCard>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.52, ease: EASE }}
            className="process-rail relative overflow-hidden rounded-[1.5rem] border border-[#2c5372]/10 bg-[#2c5372] px-4 py-3 text-white shadow-[0_22px_55px_rgba(44,83,114,.16)]"
          >
            <div className="relative z-10 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="shrink-0">
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#eb7380]">
                  Como atuamos
                </span>
                <p className="mt-1 text-xs text-white/55">
                  Entra no build só o que tem volume, ROI e prontidão.
                </p>
              </div>
              <div className="flex min-w-0 gap-2 overflow-x-auto pb-1 lg:overflow-visible lg:pb-0">
                {process.map((step, index) => (
                  <div
                    key={step}
                    className="relative z-10 flex shrink-0 items-center gap-2"
                  >
                    <span className="rounded-full border border-white/10 bg-white/[.07] px-3 py-1.5 text-[10px] font-semibold text-white/76 backdrop-blur-md">
                      {step}
                    </span>
                    {index < process.length - 1 ? (
                      <span className="text-[10px] text-[#eb7380]/60">→</span>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <aside className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          <motion.article
            initial={{ opacity: 0, x: 24, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.18, duration: 0.58, ease: EASE }}
            className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#2c5372] p-5 text-white shadow-[0_30px_80px_rgba(44,83,114,.22)]"
          >
            <div
              className="minerva-orbit animate-float-slow pointer-events-none absolute -right-16 -top-16 size-64"
              aria-hidden="true"
            />
            <div className="relative">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[.06] text-[#eb7380]">
                  <Sparkles className="size-5" strokeWidth={1.7} />
                </div>
                <Badge variant="dark">Modelo operacional</Badge>
              </div>
              <h3 className="font-display text-[1.65rem] font-semibold leading-tight tracking-[-0.045em]">
                Como ganhamos escala
              </h3>
              <p className="mt-3 text-[13px] leading-5 text-white/58">
                Ganhamos escala com a rotação dos desenvolvedores entre
                projetos, ampliando a experiência do time e reduzindo a
                dependência de pessoas específicas. O compartilhamento
                contínuo de conhecimento fortalece a colaboração e permite
                contribuições mais amplas e eficientes.
              </p>
              <div className="mt-5 grid grid-cols-3 gap-2">
                {["Rotação", "Conhecimento", "Colaboração"].map((label, index) => (
                  <div
                    key={label}
                    className="rounded-xl border border-white/10 bg-white/[.05] px-2 py-2.5 text-center"
                  >
                    <strong className="font-display block text-base text-[#eb7380]">
                      0{index + 1}
                    </strong>
                    <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-white/42">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.article>

          <MotionCard
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.32, duration: 0.52, ease: EASE }}
            className="p-5"
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="flex size-9 items-center justify-center rounded-xl bg-[#eaeff5] text-[#2c5372]">
                <BriefcaseBusiness className="size-[18px]" strokeWidth={1.8} />
              </div>
              <Badge variant="cream">Decisão</Badge>
            </div>
            <h3 className="font-display text-xl font-semibold tracking-[-0.035em]">
              Pedido nesta reunião
            </h3>
            <p className="mt-2 text-sm leading-6 text-[#426a88]">
              Patrocínio ao ritual de priorização com as áreas, dados para
              discovery e apoio às movimentações de time (promoção + 1 pleno).
            </p>
          </MotionCard>
        </aside>
      </div>
    </Scene>
  );
}
