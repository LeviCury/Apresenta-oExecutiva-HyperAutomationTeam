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
    <Scene contentClassName="gap-6">
      <SceneHeading
        eyebrow="01 · Direção"
        title={
          <>
            De time que atende pedidos para CoE que{" "}
            <span className="text-[#00a896]">escolhe valor.</span>
          </>
        }
        description="Propósito, missão e onde chegamos em 12 meses — com a oportunidade de escala ainda aberta na companhia."
        aside={
          <div className="hidden items-center gap-3 rounded-full border border-[#172a39]/10 bg-white/65 px-4 py-2.5 text-xs font-semibold text-[#526875] shadow-sm backdrop-blur-md lg:flex">
            <span className="size-1.5 animate-pulse-soft rounded-full bg-[#00a896]" />
            Horizonte · 12 meses
          </div>
        }
      />

      <div className="grid flex-1 gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="flex min-w-0 flex-col gap-5">
          <div className="grid gap-4 md:grid-cols-3">
            {pillars.map(({ title, copy, icon: Icon }, index) => (
              <MotionCard
                key={title}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + index * 0.07, duration: 0.5, ease: EASE }}
                className="min-h-[168px]"
              >
                <CardHeader className="pb-3">
                  <div className="mb-1 flex size-9 items-center justify-center rounded-xl border border-[#00a896]/15 bg-[#00a896]/10 text-[#078a7e]">
                    <Icon className="size-[18px]" strokeWidth={1.8} />
                  </div>
                  <CardTitle className="text-lg">{title}</CardTitle>
                </CardHeader>
                <CardContent>
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
                <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-[#172a39] text-white">
                  <Building2 className="size-[18px]" strokeWidth={1.8} />
                </div>
                <div>
                  <SectionLabel className="mb-2">Escala atual</SectionLabel>
                  <h3 className="font-display text-lg font-semibold tracking-[-0.03em]">
                    Hoje — 5 áreas
                  </h3>
                  <p className="mt-1.5 text-sm leading-6 text-[#5d7180]">
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
                <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl border border-[#00a896]/20 bg-[#00a896]/10 text-[#078a7e]">
                  <Search className="size-[18px]" strokeWidth={1.8} />
                </div>
                <div>
                  <SectionLabel className="mb-2">Próxima fronteira</SectionLabel>
                  <h3 className="font-display text-lg font-semibold tracking-[-0.03em]">
                    Oportunidade
                  </h3>
                  <p className="mt-1.5 text-sm leading-6 text-[#5d7180]">
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
            className="process-rail relative overflow-hidden rounded-[1.5rem] border border-[#172a39]/10 bg-[#172a39] px-5 py-4 text-white shadow-[0_22px_55px_rgba(23,42,57,.16)]"
          >
            <div className="relative z-10 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="shrink-0">
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#72e0d4]">
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
                      <span className="text-[10px] text-[#00d6c2]/55">→</span>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <aside className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
          <motion.article
            initial={{ opacity: 0, x: 24, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.18, duration: 0.58, ease: EASE }}
            className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#172a39] p-6 text-white shadow-[0_30px_80px_rgba(23,42,57,.22)]"
          >
            <div
              className="minerva-orbit animate-float-slow pointer-events-none absolute -right-16 -top-16 size-64"
              aria-hidden="true"
            />
            <div className="relative">
              <div className="mb-8 flex items-center justify-between">
                <div className="flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[.06] text-[#65e0d2]">
                  <Sparkles className="size-5" strokeWidth={1.7} />
                </div>
                <Badge variant="dark">Modelo operacional</Badge>
              </div>
              <h3 className="font-display text-[1.65rem] font-semibold leading-tight tracking-[-0.045em]">
                Como ganhamos escala
              </h3>
              <p className="mt-4 text-sm leading-6 text-white/58">
                Não contratamos para cada fila. Multiplicamos o especialista
                com playbook, pairing e 1–2 plenos. Expandimos área a área por
                valor, não por ordem de chegada.
              </p>
              <div className="mt-7 grid grid-cols-3 gap-2">
                {["Padrão", "Pairing", "Valor"].map((label, index) => (
                  <div
                    key={label}
                    className="rounded-xl border border-white/10 bg-white/[.05] px-2 py-3 text-center"
                  >
                    <strong className="font-display block text-base text-[#69e1d3]">
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
            className="p-6"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex size-9 items-center justify-center rounded-xl bg-[#f3ead7] text-[#172a39]">
                <BriefcaseBusiness className="size-[18px]" strokeWidth={1.8} />
              </div>
              <Badge variant="cream">Decisão</Badge>
            </div>
            <h3 className="font-display text-xl font-semibold tracking-[-0.035em]">
              Pedido nesta reunião
            </h3>
            <p className="mt-3 text-sm leading-6 text-[#5d7180]">
              Patrocínio ao ritual de priorização com as áreas, dados para
              discovery e apoio às movimentações de time (promoção + 1 pleno).
            </p>
          </MotionCard>
        </aside>
      </div>
    </Scene>
  );
}
