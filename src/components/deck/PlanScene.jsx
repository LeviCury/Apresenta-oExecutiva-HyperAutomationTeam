import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  CircleDot,
  Compass,
  ListChecks,
  Target,
} from "lucide-react";
import { backlog, initiatives, timeline } from "../../deck-data";
import { cn } from "../../lib/utils";
import { Badge } from "../ui/badge";
import { MotionCard } from "../ui/card";
import { EASE, Scene, SceneHeading, SectionLabel } from "./primitives";

export default function PlanScene() {
  const [compactPanel, setCompactPanel] = useState("opportunities");

  return (
    <Scene fitKey={compactPanel} contentClassName="gap-3.5">
      <SceneHeading
        eyebrow="05 · Execução"
        title={
          <>
            Plano de trabalho — entrega{" "}
            <span className="text-[#e83948]">por tempo.</span>
          </>
        }
        description="Estabilizar a operação, modernizar a base e então escalar o domínio com business case."
        descriptionClassName="hidden 2xl:block"
        aside={
          <Badge variant="cream" className="py-2">
            <Compass className="size-3.5" />
            Horizonte · 1º sem/27
          </Badge>
        }
      />

      <div
        className={cn(
          "grid gap-3 md:grid-cols-3",
          compactPanel !== "timeline" && "hidden 2xl:grid",
        )}
      >
        {initiatives.map((initiative, index) => {
          const Icon = initiative.icon;
          return (
            <motion.article
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.07 + index * 0.06, duration: 0.48, ease: EASE }}
              className="flex items-center gap-3.5 rounded-[1.35rem] border border-[#2c5372]/[.08] bg-white/90 p-3.5 shadow-[0_14px_38px_rgba(44,83,114,.06)] backdrop-blur-xl"
              key={initiative.title}
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-[#e83948]/15 bg-[#e83948]/10 text-[#bf404f]">
                <Icon className="size-[18px]" strokeWidth={1.8} />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-display truncate text-base font-semibold tracking-[-0.025em] 2xl:text-lg">
                  {initiative.title}
                </h3>
                <p className="mt-0.5 truncate text-xs text-[#426a88] 2xl:text-[13px]">
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

      <div className="grid grid-cols-2 gap-2 rounded-2xl border border-[#2c5372]/[.08] bg-white/85 p-1.5 shadow-sm 2xl:hidden">
        {[
          ["opportunities", "Oportunidades e backlog"],
          ["timeline", "Linha do tempo"],
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

      <div
        className={cn(
          "grid flex-1 gap-4 lg:grid-cols-[minmax(0,1.28fr)_minmax(280px,.72fr)] xl:grid-cols-[minmax(0,1.28fr)_minmax(340px,.72fr)]",
          compactPanel !== "opportunities" && "hidden 2xl:grid",
        )}
      >
        <MotionCard
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26, duration: 0.52, ease: EASE }}
          className="p-4 lg:p-5"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <SectionLabel>Discovery em curso</SectionLabel>
              <h3 className="font-display text-xl font-semibold tracking-[-0.04em]">
                Oportunidade catalogada
              </h3>
            </div>
            <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-[#2c5372] text-white">
              <Target className="size-[18px]" strokeWidth={1.8} />
            </div>
          </div>

          <div className="mt-3 grid gap-x-4 gap-y-2.5 lg:grid-cols-2">
            <article className="rounded-2xl border border-[#2c5372]/[.07] bg-[#eaeff5]/55 p-3.5">
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#e83948] 2xl:text-xs">
                Gente e Gestão
              </span>
              <p className="mt-1.5 text-sm leading-5 text-[#426a88] 2xl:text-base 2xl:leading-6">
                <strong className="text-[#2c5372]">Gente e Gestão.</strong> Lista
                de processos manuais em contratação. Sonia (gerente executiva).
              </p>
              <p className="mt-1.5 text-sm leading-5 text-[#426a88] 2xl:text-base 2xl:leading-6">
                <strong className="text-[#2c5372]">Próximo passo.</strong>{" "}
                Fechar catálogo, volume, tempo manual e potencial de automação
                para priorização por valor.
              </p>
            </article>

            <article className="rounded-2xl border border-[#2c5372]/[.07] bg-[#eaeff5]/55 p-3.5">
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#e83948] 2xl:text-xs">
                Exportação Brasil
              </span>
              <p className="mt-1.5 text-sm leading-5 text-[#426a88] 2xl:text-base 2xl:leading-6">
                <strong className="text-[#2c5372]">
                  Lançamentos de despesas — exportação Brasil.
                </strong>{" "}
                Automatizar a maioria dos processos. Falta para go/no-go:
                volume de lançamentos, ROI, riscos à operação e posições
                impactadas.
              </p>
            </article>

            <div className="lg:col-span-2 grid gap-3 sm:grid-cols-2">
              <div className="flex gap-3 rounded-2xl border border-[#e83948]/15 bg-[#e83948]/[.07] p-3">
                <CircleDot className="mt-0.5 size-4 shrink-0 text-[#e83948]" />
                <p className="text-sm leading-5 text-[#426a88] 2xl:text-[15px] 2xl:leading-6">
                  <strong className="text-[#2c5372]">Marco de discovery:</strong>{" "}
                  transformar a lista em oportunidades priorizadas e
                  mensuráveis.
                </p>
              </div>
              <div className="flex gap-3 rounded-2xl border border-[#e83948]/15 bg-[#e83948]/[.07] p-3">
                <CircleDot className="mt-0.5 size-4 shrink-0 text-[#e83948]" />
                <p className="text-sm leading-5 text-[#426a88] 2xl:text-[15px] 2xl:leading-6">
                  <strong className="text-[#2c5372]">Expandir domínio.</strong>{" "}
                  Catalogar as áreas que ainda não estão sob automação — só
                  então priorizar por valor.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-3 rounded-2xl bg-[#2c5372] px-4 py-2.5 text-white">
            <ListChecks className="size-4 shrink-0 text-[#eb7380]" />
            <p className="text-[13px] font-semibold 2xl:text-sm">
              Não entra em build até fechar discovery.
            </p>
          </div>
        </MotionCard>

        <motion.section
          initial={{ opacity: 0, x: 22 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.32, duration: 0.52, ease: EASE }}
          className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#2c5372] p-4 lg:p-5 text-white shadow-[0_24px_65px_rgba(44,83,114,.2)]"
        >
          <SectionLabel dark>Fila qualificada</SectionLabel>
          <h3 className="font-display text-xl font-semibold tracking-[-0.04em]">
            Backlog — priorizar no triage
          </h3>
          <div className="mt-3 divide-y divide-white/[.08]">
            {backlog.map((item, index) => (
              <article
                key={item}
                className="grid grid-cols-[30px_minmax(0,1fr)_18px] items-center gap-3 py-2.5"
              >
                <span className="font-display text-xs font-semibold text-[#eb7380] 2xl:text-[13px]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h4 className="text-sm font-semibold leading-[1.4] text-white/86 2xl:text-[15px]">
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
        className={cn(
          "timeline-line relative grid gap-3 md:grid-cols-3",
          compactPanel !== "timeline" && "hidden 2xl:grid",
        )}
      >
        {timeline.map((phase, index) => (
          <article
            className="relative z-10 rounded-[1.4rem] border border-[#2c5372]/[.08] bg-white/92 p-3.5 shadow-[0_14px_40px_rgba(44,83,114,.06)] backdrop-blur-xl"
            key={phase.title}
          >
            <div className="mb-2 flex items-center justify-between gap-3">
              <span className="flex size-4 items-center justify-center rounded-full border-4 border-white bg-[#e83948] shadow-[0_0_0_1px_rgba(232,57,72,.25)]" />
              <Badge variant={index === 2 ? "warning" : "cream"}>
                {phase.when}
              </Badge>
            </div>
            <h3 className="font-display text-base font-semibold tracking-[-0.03em] 2xl:text-lg">
              {phase.title}
            </h3>
            <ul className="mt-1.5 space-y-0.5">
              {phase.items.map((item) => (
                <li
                  className="flex gap-2 text-[13px] leading-[1.4] text-[#426a88] 2xl:text-[15px]"
                  key={item}
                >
                  <span className="mt-1.5 size-1 shrink-0 rounded-full bg-[#e83948]" />
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
