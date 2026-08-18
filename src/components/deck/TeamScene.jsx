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
  const [compactPanel, setCompactPanel] = useState("profile");
  const member = TEAM[selectedPerson];
  const reducedMotion = useReducedMotion();

  return (
    <Scene
      fitKey={`${selectedPerson}-${compactPanel}`}
      contentClassName="gap-3.5"
    >
      <SceneHeading
        eyebrow="04 · Capacidade"
        title={
          <>
            Equipe —{" "}
            <span className="text-[#e83948]">seniorizar para escalar.</span>
          </>
        }
        titleClassName="text-[clamp(1.4rem,1.7vw,2.1rem)]"
        description="Capacidade atual e movimentos para sustentar a próxima escala."
        descriptionClassName="mt-1 text-[15px]"
        aside={
          <div className="hidden items-center gap-3 rounded-full border border-[#2c5372]/10 bg-white/80 px-4 py-2.5 text-xs font-semibold text-[#426a88] shadow-sm backdrop-blur-md lg:flex">
            <Users className="size-4 text-[#e83948]" />
            1 especialista · 4 em desenvolvimento
          </div>
        }
      />

      <div className="grid flex-1 gap-3.5 2xl:grid-cols-[180px_minmax(0,.98fr)_minmax(540px,1.02fr)]">
        <div className="grid grid-cols-2 gap-2 rounded-2xl border border-[#2c5372]/[.08] bg-white/80 p-1.5 shadow-sm 2xl:hidden">
          {[
            ["profile", "Análise individual"],
            ["team", "Movimentos gerais"],
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

        <motion.nav
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.08, duration: 0.5, ease: EASE }}
          className={cn(
            "grid grid-cols-2 gap-2 sm:grid-cols-5 2xl:grid-cols-1 2xl:self-start",
            compactPanel !== "profile" && "hidden 2xl:grid",
          )}
          aria-label="Integrantes do time"
        >
          {TEAM.map((person, index) => (
            <button
              type="button"
              className={cn(
                "group flex min-w-0 items-center gap-2.5 rounded-2xl border px-3 py-2.5 text-left transition-all duration-300",
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
                <strong className="block truncate text-sm font-semibold 2xl:text-[15px]">
                  {person.short}
                </strong>
                <small className="mt-0.5 block truncate text-xs text-[#426a88] 2xl:text-[13px]">
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
          className={cn(
            "min-h-[420px] overflow-hidden bg-white/75",
            compactPanel !== "profile" && "hidden 2xl:block",
          )}
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
              className="grid h-full min-h-[420px] md:grid-cols-[180px_minmax(0,1fr)] xl:grid-cols-1 2xl:grid-cols-[minmax(190px,32%)_minmax(0,1fr)]"
            >
              <div className="relative hidden min-h-[300px] items-end justify-center overflow-hidden bg-gradient-to-b from-[#eaeff5] to-[#c7b475] px-3 pt-5 md:flex xl:hidden 2xl:flex">
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

              <div className="flex min-w-0 flex-col p-5 2xl:p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <SectionLabel>Perfil selecionado</SectionLabel>
                    <h3 className="font-display text-[clamp(1.45rem,1.8vw,2rem)] font-semibold leading-[1.05] tracking-[-0.05em]">
                      {member.name}
                    </h3>
                    <p className="mt-1.5 text-[15px] font-semibold text-[#e83948] 2xl:text-base">
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

                <p className="mt-3 text-base leading-7 text-[#2c5372]/90 2xl:text-lg 2xl:leading-8">
                  {member.bio}
                </p>

                <div className="mt-4 rounded-2xl border border-[#e83948]/15 bg-[#e83948]/[.055] p-4">
                  <SectionLabel className="mb-1.5 text-[#bf404f]">
                    Movimento individual
                  </SectionLabel>
                  <h4 className="text-xl font-semibold leading-[1.3] text-[#2c5372] 2xl:text-2xl">
                    {member.movement.title}
                  </h4>
                  {member.movement.description ? (
                    <p className="mt-1.5 text-base leading-7 text-[#2c5372]/90 2xl:text-lg 2xl:leading-8">
                      {member.movement.description}
                    </p>
                  ) : null}
                </div>

                <div className="mt-4">
                  <SectionLabel>Competências</SectionLabel>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill) => {
                      const [tool, level] = Array.isArray(skill)
                        ? skill
                        : [skill, null];

                      return (
                        <span
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-semibold 2xl:text-[15px]",
                            level === "Avançado"
                              ? "border-[#e83948]/20 bg-[#e83948]/10 text-[#bf404f]"
                              : "border-[#2c5372]/10 bg-[#eaeff5] text-[#2c5372]",
                          )}
                          key={level ? `${tool}-${level}` : tool}
                        >
                          <CheckCircle2 className="size-3" strokeWidth={2} />
                          {tool}
                          {level ? ` · ${level}` : null}
                        </span>
                      );
                    })}
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
          className={cn(
            "relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#2c5372] p-5 text-white shadow-[0_24px_65px_rgba(44,83,114,.2)]",
            compactPanel !== "team" && "hidden 2xl:block",
          )}
        >
          <div
            className="minerva-orbit pointer-events-none absolute -right-24 -top-24 size-72 opacity-35"
            aria-hidden="true"
          />
          <div className="relative mb-3 flex items-start justify-between gap-4">
            <div>
              <SectionLabel dark>Movimentos propostos</SectionLabel>
              <h3 className="font-display text-2xl font-semibold tracking-[-0.04em]">
                Fechar o gap de senioridade
              </h3>
            </div>
            <ArrowUpRight className="size-5 text-[#eb7380]" strokeWidth={1.7} />
          </div>

          <div className="relative grid gap-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-2">
            {teamMoves.map((move, index) => (
              <article
                className="grid grid-cols-[30px_minmax(0,1fr)] gap-2.5 rounded-2xl border border-white/[.08] bg-white/[.045] p-3.5 2xl:p-4"
                key={move.title}
              >
                <span className="font-display pt-0.5 text-[15px] font-semibold text-[#eb7380] 2xl:text-base">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h4 className="text-lg font-semibold leading-[1.3] text-white 2xl:text-xl">
                    {move.title}
                  </h4>
                  <p className="mt-1.5 text-[15px] leading-6 text-white/88 2xl:text-base 2xl:leading-7">
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
