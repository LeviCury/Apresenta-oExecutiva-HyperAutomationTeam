import { useState } from "react";
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
import { cn } from "../../lib/utils";
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
  const [compactPanel, setCompactPanel] = useState("direction");

  return (
    <Scene fitKey={compactPanel} contentClassName="gap-3.5">
      <SceneHeading
        eyebrow="01 · Direção"
        title={
          <>
            De atender pedidos a{" "}
            <span className="text-[#e83948]">escolher valor.</span>
          </>
        }
        titleClassName="text-[clamp(1.4rem,1.7vw,2.1rem)]"
        description="Propósito, missão e direção para 12 meses — com a escala ainda aberta na companhia."
        descriptionClassName="mt-1 text-[15px]"
        aside={
          <div className="hidden items-center gap-3 rounded-full border border-[#2c5372]/10 bg-white/80 px-4 py-2.5 text-xs font-semibold text-[#426a88] shadow-sm backdrop-blur-md lg:flex">
            <span className="size-1.5 animate-pulse-soft rounded-full bg-[#e83948]" />
            Horizonte · 12 meses
          </div>
        }
      />

      <div className="grid grid-cols-3 gap-2 rounded-2xl border border-[#2c5372]/[.08] bg-white/85 p-1.5 shadow-sm 2xl:hidden">
        {[
          ["direction", "Direção"],
          ["scale", "Escala e decisão"],
          ["model", "Modelo operacional"],
        ].map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setCompactPanel(value)}
            className={cn(
              "rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors",
              compactPanel === value
                ? "bg-[#2c5372] text-white"
                : "text-[#426a88] hover:bg-[#eaeff5]",
            )}
            aria-pressed={compactPanel === value}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid flex-1 gap-4 2xl:grid-cols-[minmax(0,1fr)_400px]">
        <div
          className={cn(
            "flex min-w-0 flex-col gap-4",
            compactPanel === "model" && "hidden 2xl:flex",
          )}
        >
          <div
            className={cn(
              "grid gap-4 md:grid-cols-3",
              compactPanel !== "direction" && "hidden 2xl:grid",
            )}
          >
            {pillars.map(({ title, copy, icon: Icon }, index) => (
              <MotionCard
                key={title}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + index * 0.07, duration: 0.5, ease: EASE }}
              >
                <CardHeader className="p-5 pb-2">
                  <div className="mb-1 flex size-9 items-center justify-center rounded-xl border border-[#e83948]/15 bg-[#e83948]/10 text-[#bf404f]">
                    <Icon className="size-[18px]" strokeWidth={1.8} />
                  </div>
                  <CardTitle className="text-xl 2xl:text-2xl">{title}</CardTitle>
                </CardHeader>
                <CardContent className="px-5 pb-5">
                  <CardDescription className="text-base leading-7 text-[#2c5372]/90 2xl:text-lg 2xl:leading-8">
                    {copy}
                  </CardDescription>
                </CardContent>
              </MotionCard>
            ))}
          </div>

          <div
            className={cn(
              "grid gap-4 md:grid-cols-3",
              compactPanel !== "scale" && "hidden 2xl:grid",
            )}
          >
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
                  <h3 className="font-display text-xl font-semibold tracking-[-0.03em] 2xl:text-2xl">
                    Hoje — 5 áreas
                  </h3>
                  <p className="mt-1.5 text-base leading-7 text-[#2c5372]/90 2xl:text-lg 2xl:leading-8">
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
                  <h3 className="font-display text-xl font-semibold tracking-[-0.03em] 2xl:text-2xl">
                    Oportunidade
                  </h3>
                  <p className="mt-1.5 text-base leading-7 text-[#2c5372]/90 2xl:text-lg 2xl:leading-8">
                    Catalogar as áreas que ainda não estão no domínio de
                    automação — e só então priorizar por valor, não por pedido.
                  </p>
                </div>
              </div>
            </MotionCard>

            <MotionCard
              initial={{ opacity: 0, x: 22 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.38, duration: 0.52, ease: EASE }}
              className="p-5"
            >
              <div className="flex items-start gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-[#eaeff5] text-[#2c5372]">
                  <BriefcaseBusiness className="size-[18px]" strokeWidth={1.8} />
                </div>
                <div>
                  <SectionLabel className="mb-2">Decisão</SectionLabel>
                  <h3 className="font-display text-xl font-semibold tracking-[-0.03em] 2xl:text-2xl">
                    Pedido nesta reunião
                  </h3>
                  <p className="mt-1.5 text-base leading-7 text-[#2c5372]/90 2xl:text-lg 2xl:leading-8">
                    Patrocínio ao ritual de priorização, dados para discovery e
                    apoio às movimentações de time (promoção + 1 pleno).
                  </p>
                </div>
              </div>
            </MotionCard>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.52, ease: EASE }}
            className={cn(
              "process-rail relative overflow-hidden rounded-[1.5rem] border border-[#2c5372]/10 bg-[#2c5372] px-4 py-3 text-white shadow-[0_22px_55px_rgba(44,83,114,.16)]",
              compactPanel !== "direction" && "hidden 2xl:block",
            )}
          >
            <div className="relative z-10 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="shrink-0">
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#eb7380] 2xl:text-[13px]">
                  Como atuamos
                </span>
                <p className="mt-1 text-[15px] font-medium text-white/90 2xl:text-base">
                  Entra no build só o que tem volume, ROI e prontidão.
                </p>
              </div>
              <div className="flex min-w-0 gap-2 overflow-x-auto pb-1 lg:overflow-visible lg:pb-0">
                {process.map((step, index) => (
                  <div
                    key={step}
                    className="relative z-10 flex shrink-0 items-center gap-2"
                  >
                    <span className="rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-sm font-semibold text-white backdrop-blur-md">
                      {step}
                    </span>
                    {index < process.length - 1 ? (
                      <span className="text-sm text-[#eb7380]">→</span>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <aside
          className={cn(
            "min-w-0",
            compactPanel !== "model" && "hidden 2xl:block",
          )}
        >
          <motion.article
            initial={{ opacity: 0, x: 24, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.18, duration: 0.58, ease: EASE }}
            className="relative self-start overflow-hidden rounded-[2rem] border border-white/10 bg-[#2c5372] p-6 text-white shadow-[0_30px_80px_rgba(44,83,114,.28)]"
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
              <h3 className="font-display text-2xl font-semibold leading-tight tracking-[-0.045em]">
                Como ganhamos escala
              </h3>
              <p className="mt-3 text-base leading-7 text-white/90 2xl:text-lg 2xl:leading-8">
                A rotação entre projetos amplia a experiência, reduz
                dependências e distribui conhecimento. O resultado é mais
                colaboração e capacidade de contribuição entre os
                desenvolvedores.
              </p>
              <div className="mt-5 grid grid-cols-3 gap-2">
                {["Rotação", "Conhecimento", "Colaboração"].map((label, index) => (
                  <div
                    key={label}
                    className="rounded-xl border border-white/10 bg-white/[.05] px-2 py-2.5 text-center"
                  >
                    <strong className="font-display block text-lg text-[#eb7380]">
                      0{index + 1}
                    </strong>
                    <span className="text-xs font-bold uppercase tracking-[0.08em] text-white/85">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.article>
        </aside>
      </div>
    </Scene>
  );
}
