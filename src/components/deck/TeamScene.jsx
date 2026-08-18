import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, CheckCircle2, Users } from "lucide-react";
import { TEAM } from "../../data";
import { teamMoves } from "../../deck-data";
import { cn } from "../../lib/utils";
import { Badge } from "../ui/badge";
import { MotionCard } from "../ui/card";
import { EASE, Scene, SceneHeading, SectionLabel } from "./primitives";

export default function TeamScene() {
  const [selectedPerson, setSelectedPerson] = useState(0);
  const member = TEAM[selectedPerson];
  const reducedMotion = useReducedMotion();

  return (
    <Scene contentClassName="gap-5">
      <SceneHeading
        eyebrow="03 · Capacidade"
        title={
          <>
            Equipe — o que temos e{" "}
            <span className="text-[#e83948]">o que falta.</span>
          </>
        }
        description="A composição atual sustenta a operação; o próximo salto depende de senioridade, distribuição de conhecimento e clareza de papéis."
        aside={
          <div className="hidden items-center gap-3 rounded-full border border-[#2c5372]/10 bg-white/80 px-4 py-2.5 text-xs font-semibold text-[#426a88] shadow-sm backdrop-blur-md lg:flex">
            <Users className="size-4 text-[#e83948]" />
            5 pessoas · 1 especialista
          </div>
        }
      />

      <div className="grid flex-1 gap-4 lg:grid-cols-[170px_minmax(0,1fr)_280px] xl:grid-cols-[230px_minmax(0,1fr)_390px]">
        <motion.nav
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.08, duration: 0.5, ease: EASE }}
          className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1 lg:self-start"
          aria-label="Integrantes do time"
        >
          {TEAM.map((person, index) => (
            <button
              type="button"
              className={cn(
                "group flex min-w-0 items-center gap-3 rounded-2xl border px-3 py-2.5 text-left transition-all duration-300",
                index === selectedPerson
                  ? "border-[#e83948]/30 bg-white text-[#2c5372] shadow-[0_12px_30px_rgba(44,83,114,.1)]"
                  : "border-[#2c5372]/[.07] bg-white/65 text-[#426a88] hover:border-[#e83948]/20 hover:bg-white",
              )}
              key={person.name}
              onClick={() => setSelectedPerson(index)}
              aria-pressed={index === selectedPerson}
            >
              <span className="flex size-10 shrink-0 items-end justify-center overflow-hidden rounded-xl bg-[#eaeff5]">
                <img
                  src={person.photo}
                  alt=""
                  className="h-full w-full object-contain object-bottom"
                />
              </span>
              <span className="min-w-0 flex-1">
                <strong className="block truncate text-xs font-semibold">
                  {person.short}
                </strong>
                <small className="mt-0.5 block truncate text-[9px] text-[#5d86a5]">
                  {person.role}
                </small>
              </span>
              <i
                className={cn(
                  "size-1.5 shrink-0 rounded-full transition-colors",
                  index === selectedPerson
                    ? "bg-[#e83948]"
                    : "bg-[#2c5372]/15 group-hover:bg-[#e83948]/45",
                )}
                aria-hidden="true"
              />
            </button>
          ))}
        </motion.nav>

        <MotionCard
          glow={false}
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14, duration: 0.52, ease: EASE }}
          className="min-h-[430px] overflow-hidden bg-white/75"
        >
          <AnimatePresence mode="wait">
            <motion.article
              key={member.name}
              initial={
                reducedMotion
                  ? false
                  : { opacity: 0, y: 14, filter: "blur(5px)" }
              }
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={
                reducedMotion
                  ? undefined
                  : { opacity: 0, y: -10, filter: "blur(4px)" }
              }
              transition={{ duration: reducedMotion ? 0 : 0.34, ease: EASE }}
              className="grid h-full min-h-[430px] lg:grid-cols-[minmax(210px,36%)_minmax(0,1fr)]"
            >
              <div className="relative flex min-h-[300px] items-end justify-center overflow-hidden bg-gradient-to-b from-[#eaeff5] to-[#c7b475] px-3 pt-5">
                <div
                  className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top,rgba(232,57,72,.14),transparent_68%)]"
                  aria-hidden="true"
                />
                <span
                  className="absolute left-5 top-5 font-display text-[4.5rem] font-semibold leading-none tracking-[-0.08em] text-[#2c5372]/[.05]"
                  aria-hidden="true"
                >
                  0{selectedPerson + 1}
                </span>
                <img
                  src={member.photo}
                  alt={member.name}
                  className="drop-shadow-[0_24px_26px_rgba(44,83,114,.22)]"
                  style={{
                    position: "absolute",
                    zIndex: 20,
                    top: 36,
                    right: 16,
                    left: 16,
                    display: "block",
                    width: "calc(100% - 32px)",
                    height: "min(240px, calc(100% - 48px))",
                    objectFit: "contain",
                    objectPosition: "center top",
                  }}
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#2c5372]/10 to-transparent" />
              </div>

              <div className="flex min-w-0 flex-col p-6 lg:p-7">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <SectionLabel>Perfil selecionado</SectionLabel>
                    <h3 className="font-display text-[clamp(1.5rem,2.2vw,2.5rem)] font-semibold leading-[1.02] tracking-[-0.055em]">
                      {member.name}
                    </h3>
                    <p className="mt-1.5 text-xs font-semibold text-[#e83948]">
                      {member.role}
                    </p>
                  </div>
                  <Badge variant="cream">CoE</Badge>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="cream" className="normal-case tracking-normal">
                    {member.tenure}
                  </Badge>
                  {member.teamTenure ? (
                    <Badge
                      variant="cream"
                      className="normal-case tracking-normal"
                    >
                      {member.teamTenure}
                    </Badge>
                  ) : null}
                </div>

                <p className="mt-4 text-sm leading-6 text-[#426a88]">
                  {member.bio}
                </p>

                <div className="mt-auto pt-5">
                  <SectionLabel>Competências</SectionLabel>
                  <div className="flex flex-wrap gap-1.5">
                    {member.skills.map(([tool, level]) => (
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[9px] font-semibold",
                          level === "Avançado"
                            ? "border-[#e83948]/20 bg-[#e83948]/10 text-[#bf404f]"
                            : "border-[#2c5372]/[.08] bg-[#eaeff5]/75 text-[#426a88]",
                        )}
                        key={`${tool}-${level}`}
                      >
                        <CheckCircle2 className="size-2.5" strokeWidth={2} />
                        {tool} · {level}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </MotionCard>

        <motion.aside
          initial={{ opacity: 0, x: 22 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.52, ease: EASE }}
          className="rounded-[1.75rem] border border-white/10 bg-[#2c5372] p-5 text-white shadow-[0_24px_65px_rgba(44,83,114,.2)]"
        >
          <div className="mb-3 flex items-center justify-between">
            <div>
              <SectionLabel dark>Movimentos propostos</SectionLabel>
              <h3 className="font-display text-xl font-semibold tracking-[-0.04em]">
                Fechar o gap de senioridade
              </h3>
            </div>
            <ArrowUpRight className="size-5 text-[#eb7380]" strokeWidth={1.7} />
          </div>
          <div className="divide-y divide-white/[.08]">
            {teamMoves.map((move, index) => (
              <article
                className="grid grid-cols-[26px_minmax(0,1fr)] gap-3 py-3"
                key={move.title}
              >
                <span className="font-display pt-0.5 text-[10px] font-semibold text-[#eb7380]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h4 className="text-[11px] font-semibold text-white/86">
                    {move.title}
                  </h4>
                  <p className="mt-1 text-[10px] leading-[1.55] text-white/46">
                    {move.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </motion.aside>
      </div>
    </Scene>
  );
}
