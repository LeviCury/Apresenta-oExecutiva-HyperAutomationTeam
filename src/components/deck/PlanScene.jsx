import { motion } from "motion/react";
import {
  ArrowRight,
  CircleDot,
  Compass,
  ListChecks,
  Target,
} from "lucide-react";
import { backlog, initiatives, timeline } from "../../deck-data";
import { Badge } from "../ui/badge";
import { MotionCard } from "../ui/card";
import { EASE, Scene, SceneHeading, SectionLabel } from "./primitives";

export default function PlanScene() {
  return (
    <Scene contentClassName="gap-5">
      <SceneHeading
        eyebrow="04 · Execução"
        title={
          <>
            Plano de trabalho — marcos e entrega{" "}
            <span className="text-[#00a896]">por tempo.</span>
          </>
        }
        description="A ordem importa: estabilizar a operação, modernizar a base tecnológica e só então escalar o domínio com business case."
        aside={
          <Badge variant="cream" className="py-2">
            <Compass className="size-3.5" />
            Horizonte · 1º sem/27
          </Badge>
        }
      />

      <div className="grid gap-3 md:grid-cols-3">
        {initiatives.map((initiative, index) => {
          const Icon = initiative.icon;
          return (
            <motion.article
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.07 + index * 0.06, duration: 0.48, ease: EASE }}
              className="flex items-center gap-4 rounded-[1.35rem] border border-[#172a39]/[.08] bg-white/65 p-4 shadow-[0_14px_38px_rgba(23,42,57,.06)] backdrop-blur-xl"
              key={initiative.title}
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-[#00a896]/15 bg-[#00a896]/10 text-[#078a7e]">
                <Icon className="size-[18px]" strokeWidth={1.8} />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-display truncate text-base font-semibold tracking-[-0.025em]">
                  {initiative.title}
                </h3>
                <p className="mt-0.5 truncate text-[10px] text-[#74858f]">
                  {initiative.subtitle}
                </p>
              </div>
              <Badge
                variant={initiative.tone === "doing" ? "success" : "warning"}
                className="shrink-0"
              >
                {initiative.status}
              </Badge>
            </motion.article>
          );
        })}
      </div>

      <div className="grid flex-1 gap-4 xl:grid-cols-[minmax(0,1.28fr)_minmax(340px,.72fr)]">
        <MotionCard
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26, duration: 0.52, ease: EASE }}
          className="p-5 lg:p-6"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <SectionLabel>Discovery em curso</SectionLabel>
              <h3 className="font-display text-xl font-semibold tracking-[-0.04em]">
                Oportunidade catalogada
              </h3>
            </div>
            <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-[#172a39] text-white">
              <Target className="size-[18px]" strokeWidth={1.8} />
            </div>
          </div>

          <div className="mt-4 grid gap-x-5 gap-y-3 lg:grid-cols-2">
            <article className="rounded-2xl border border-[#172a39]/[.07] bg-[#f8f3e9] p-4">
              <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#00a896]">
                Gente e Gestão
              </span>
              <p className="mt-2 text-xs leading-5 text-[#586d79]">
                <strong className="text-[#172a39]">Gente e Gestão.</strong> Lista
                de processos manuais em contratação. Sonia (gerente executiva).
              </p>
              <p className="mt-2 text-xs leading-5 text-[#586d79]">
                <strong className="text-[#172a39]">Próximo passo.</strong>{" "}
                Fechar catálogo, volume, tempo manual e potencial de automação
                para priorização por valor.
              </p>
            </article>

            <article className="rounded-2xl border border-[#172a39]/[.07] bg-[#f8f3e9] p-4">
              <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#00a896]">
                Exportação Brasil
              </span>
              <p className="mt-2 text-xs leading-5 text-[#586d79]">
                <strong className="text-[#172a39]">
                  Lançamentos de despesas — exportação Brasil.
                </strong>{" "}
                Automatizar a maioria dos processos. Falta para go/no-go:
                volume de lançamentos, ROI, riscos à operação e posições
                impactadas.
              </p>
            </article>

            <div className="lg:col-span-2 grid gap-3 sm:grid-cols-2">
              <div className="flex gap-3 rounded-2xl border border-[#00a896]/15 bg-[#00a896]/[.07] p-3.5">
                <CircleDot className="mt-0.5 size-4 shrink-0 text-[#00a896]" />
                <p className="text-[11px] leading-5 text-[#4f6572]">
                  <strong className="text-[#172a39]">Marco de discovery:</strong>{" "}
                  transformar a lista em oportunidades priorizadas e
                  mensuráveis.
                </p>
              </div>
              <div className="flex gap-3 rounded-2xl border border-[#00a896]/15 bg-[#00a896]/[.07] p-3.5">
                <CircleDot className="mt-0.5 size-4 shrink-0 text-[#00a896]" />
                <p className="text-[11px] leading-5 text-[#4f6572]">
                  <strong className="text-[#172a39]">Expandir domínio.</strong>{" "}
                  Catalogar as áreas que ainda não estão sob automação — só
                  então priorizar por valor.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3 rounded-2xl bg-[#172a39] px-4 py-3 text-white">
            <ListChecks className="size-4 shrink-0 text-[#63ddcf]" />
            <p className="text-xs font-semibold">
              Não entra em build até fechar discovery.
            </p>
          </div>
        </MotionCard>

        <motion.section
          initial={{ opacity: 0, x: 22 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.32, duration: 0.52, ease: EASE }}
          className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#172a39] p-5 text-white shadow-[0_24px_65px_rgba(23,42,57,.2)]"
        >
          <SectionLabel dark>Fila qualificada</SectionLabel>
          <h3 className="font-display text-xl font-semibold tracking-[-0.04em]">
            Backlog — priorizar no triage
          </h3>
          <div className="mt-4 divide-y divide-white/[.08]">
            {backlog.map((item, index) => (
              <article
                key={item}
                className="grid grid-cols-[30px_minmax(0,1fr)_18px] items-center gap-3 py-3.5"
              >
                <span className="font-display text-[10px] font-semibold text-[#68ded0]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h4 className="text-[11px] font-semibold leading-[1.45] text-white/78">
                  {item}
                </h4>
                <ArrowRight className="size-3.5 text-white/25" strokeWidth={1.7} />
              </article>
            ))}
          </div>
        </motion.section>
      </div>

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.52, ease: EASE }}
        className="timeline-line relative grid gap-3 md:grid-cols-3"
      >
        {timeline.map((phase, index) => (
          <article
            className="relative z-10 rounded-[1.4rem] border border-[#172a39]/[.08] bg-white/72 p-4 shadow-[0_14px_40px_rgba(23,42,57,.06)] backdrop-blur-xl"
            key={phase.title}
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="flex size-4 items-center justify-center rounded-full border-4 border-[#f8f3e9] bg-[#00a896] shadow-[0_0_0_1px_rgba(0,168,150,.25)]" />
              <Badge variant={index === 2 ? "warning" : "cream"}>
                {phase.when}
              </Badge>
            </div>
            <h3 className="font-display text-base font-semibold tracking-[-0.03em]">
              {phase.title}
            </h3>
            <ul className="mt-2 space-y-1">
              {phase.items.map((item) => (
                <li
                  className="flex gap-2 text-[10px] leading-4 text-[#667985]"
                  key={item}
                >
                  <span className="mt-1.5 size-1 shrink-0 rounded-full bg-[#00a896]" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </motion.section>
    </Scene>
  );
}
