import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Maximize2,
  Minimize2,
  Sparkles,
} from "lucide-react";
import { SLIDES } from "./data";
import IntroScene from "./components/deck/IntroScene";
import NumbersScene from "./components/deck/NumbersScene";
import TeamScene from "./components/deck/TeamScene";
import PlanScene from "./components/deck/PlanScene";
import RoiScene from "./components/deck/RoiScene";
import {
  EASE,
  LogoMark,
  MinervaWordmark,
  slideVariants,
} from "./components/deck/primitives";
import { Button } from "./components/ui/button";
import { cn } from "./lib/utils";

const scenes = [
  <IntroScene key="introducao" />,
  <NumbersScene key="numeros" />,
  <RoiScene key="roi-ganho" />,
  <TeamScene key="equipe" />,
  <PlanScene key="plano-de-trabalho" />,
];

function getSlideFromHash() {
  const hash = window.location.hash.replace("#", "");
  if (hash === "roi-detalhado") {
    return SLIDES.findIndex((slide) => slide.hash === "roi-ganho");
  }
  const index = SLIDES.findIndex((slide) => slide.hash === hash);
  return index >= 0 ? index : 0;
}

function OpeningCurtain({ visible }) {
  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-white text-[#2c5372]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02, filter: "blur(8px)" }}
          transition={{ duration: 0.56, ease: EASE }}
          aria-hidden="true"
        >
          <div className="deck-grid absolute inset-0 opacity-70" />
          <motion.div
            className="absolute size-[28rem] rounded-full bg-[#eaeff5] blur-[90px]"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: EASE }}
          />
          <div className="relative flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.88 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.08, duration: 0.52, ease: EASE }}
              className="mb-4 flex size-20 items-center justify-center rounded-3xl border border-[#2c5372]/10 bg-white shadow-[0_18px_60px_rgba(44,83,114,.12)]"
            >
              <LogoMark className="h-12 w-16" />
            </motion.div>
            <MinervaWordmark className="text-2xl" />
            <motion.span
              initial={{ opacity: 0, y: 12, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.2, duration: 0.5, ease: EASE }}
              className="mt-5 font-display text-xl font-semibold tracking-[-0.04em] text-[#2c5372]"
            >
              Hiperautomação
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.36, duration: 0.42 }}
              className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-[#5d86a5]"
            >
              Apresentação à diretoria
            </motion.span>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.42, duration: 0.68, ease: EASE }}
              className="mt-6 h-px w-44 origin-left bg-gradient-to-r from-transparent via-[#e83948] to-transparent"
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default function ExecutiveDeck() {
  const [active, setActive] = useState(getSlideFromHash);
  const [direction, setDirection] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(Boolean(document.fullscreenElement));
  const [showOpening, setShowOpening] = useState(
    () => !new URLSearchParams(window.location.search).has("nosplash"),
  );
  const shellRef = useRef(null);
  const touchStart = useRef(null);
  const reducedMotion = useReducedMotion();

  const goTo = useCallback(
    (next) => {
      const target = Math.max(0, Math.min(SLIDES.length - 1, next));
      if (target === active) return;
      setDirection(target > active ? 1 : -1);
      setActive(target);
    },
    [active],
  );

  useEffect(() => {
    const timer = window.setTimeout(
      () => setShowOpening(false),
      reducedMotion ? 120 : 1350,
    );
    return () => window.clearTimeout(timer);
  }, [reducedMotion]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight" || event.key === "PageDown") {
        event.preventDefault();
        goTo(active + 1);
      }
      if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        goTo(active - 1);
      }
      if (event.key === "Home") {
        event.preventDefault();
        goTo(0);
      }
      if (event.key === "End") {
        event.preventDefault();
        goTo(SLIDES.length - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [active, goTo]);

  useEffect(() => {
    const hash = `#${SLIDES[active].hash}`;
    if (window.location.hash !== hash) {
      window.history.replaceState(null, "", hash);
    }
  }, [active]);

  useEffect(() => {
    const handleHashChange = () => {
      const next = getSlideFromHash();
      if (next !== active) goTo(next);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [active, goTo]);

  useEffect(() => {
    const handleFullscreen = () =>
      setIsFullscreen(Boolean(document.fullscreenElement));

    document.addEventListener("fullscreenchange", handleFullscreen);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreen);
  }, []);

  function toggleFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen?.();
    } else {
      document.documentElement.requestFullscreen?.();
    }
  }

  function handlePointerMove(event) {
    if (reducedMotion || !shellRef.current) return;
    shellRef.current.style.setProperty("--pointer-x", `${event.clientX}px`);
    shellRef.current.style.setProperty("--pointer-y", `${event.clientY}px`);
  }

  function handlePointerDown(event) {
    if (event.pointerType === "touch" || event.pointerType === "pen") {
      touchStart.current = event.clientX;
    }
  }

  function handlePointerUp(event) {
    if (touchStart.current === null) return;
    const distance = event.clientX - touchStart.current;
    touchStart.current = null;
    if (Math.abs(distance) < 56) return;
    goTo(active + (distance < 0 ? 1 : -1));
  }

  const progress = ((active + 1) / SLIDES.length) * 100;
  return (
    <div
      className="executive-app relative h-screen overflow-hidden bg-white"
      ref={shellRef}
      onPointerMove={handlePointerMove}
    >
      <header
        className="deck-chrome relative z-30 flex h-[66px] items-center border-b border-[#2c5372]/[.08] bg-white/95 px-4 text-[#2c5372] backdrop-blur-xl sm:px-6 lg:px-8"
      >
        <div className="flex min-w-0 items-center gap-3">
          <LogoMark />
          <div className="min-w-0">
            <MinervaWordmark className="text-[13px]" />
            <div className="hidden text-[10px] font-semibold uppercase tracking-[0.12em] text-[#5d86a5] sm:block">
              Hiperautomação · diretoria
            </div>
          </div>
        </div>

        <nav
          className="mx-auto hidden items-center gap-1 rounded-full border border-[#2c5372]/[.08] bg-[#eaeff5]/45 p-1 shadow-sm backdrop-blur-xl lg:flex"
          aria-label="Seções"
        >
          {SLIDES.map((slide, index) => (
            <button
              type="button"
              className={cn(
                "relative rounded-full px-3.5 py-2 text-[11px] font-semibold transition-colors duration-300",
                index === active
                  ? "text-white"
                  : "text-[#426a88] hover:text-[#2c5372]",
              )}
              onClick={() => goTo(index)}
              aria-current={index === active ? "page" : undefined}
              key={slide.hash}
            >
              {index === active ? (
                <motion.span
                  className="absolute inset-0 rounded-full bg-[#e83948] shadow-sm"
                  layoutId="active-slide-pill-tailwind"
                  transition={{ type: "spring", stiffness: 420, damping: 36 }}
                />
              ) : null}
              <span className="relative z-10">{slide.label}</span>
            </button>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <span className="hidden text-[11px] font-bold tabular-nums text-[#5d86a5] sm:block">
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(SLIDES.length).padStart(2, "0")}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={toggleFullscreen}
            aria-label={
              isFullscreen ? "Sair da tela cheia" : "Entrar em tela cheia"
            }
          >
            {isFullscreen ? <Minimize2 /> : <Maximize2 />}
          </Button>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-px overflow-hidden bg-black/[.04]">
          <motion.div
            className="h-full origin-left bg-gradient-to-r from-[#2c5372] via-[#e83948] to-[#c7b475]"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.52, ease: EASE }}
          />
        </div>
      </header>

      <main
        className="stage-surface relative z-10 h-[calc(100vh-118px)] overflow-hidden"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        {!reducedMotion ? (
          <motion.div
            className="pointer-events-none absolute -left-20 top-0 z-30 h-full w-24 skew-x-[-12deg] bg-gradient-to-r from-transparent via-white/20 to-transparent blur-xl"
            key={`flare-${SLIDES[active].hash}`}
            initial={{ x: "-160%", opacity: 0 }}
            animate={{ x: "1800%", opacity: [0, 0.28, 0] }}
            transition={{ duration: 1.15, ease: EASE }}
            aria-hidden="true"
          />
        ) : null}
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.section
            className="absolute inset-0"
            key={SLIDES[active].hash}
            custom={direction}
            variants={slideVariants}
            initial={reducedMotion ? false : "enter"}
            animate="center"
            exit={reducedMotion ? undefined : "exit"}
            transition={{ duration: reducedMotion ? 0 : 0.58, ease: EASE }}
          >
            {scenes[active]}
          </motion.section>
        </AnimatePresence>
      </main>

      <footer
        className="deck-chrome relative z-30 flex h-[52px] items-center justify-between border-t border-[#2c5372]/[.08] bg-white px-4 text-[#2c5372] sm:px-6 lg:px-8"
      >
        <span className="hidden text-[10px] font-medium text-[#5d86a5] sm:block">
          Uso interno · CoE de Hiperautomação · Horizonte 12 meses
        </span>

        <div className="flex items-center gap-1.5 sm:hidden">
          {SLIDES.map((slide, index) => (
            <span
              key={slide.hash}
              className={cn(
                "h-1 rounded-full transition-all",
                index === active
                  ? "w-6 bg-[#e83948]"
                  : "w-1 bg-[#2c5372]/15",
              )}
            />
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <span className="mr-1 hidden items-center gap-1.5 text-[10px] text-[#5d86a5] md:flex">
            <Sparkles className="size-3" />
            ← → para navegar
          </span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-8"
            onClick={() => goTo(active - 1)}
            disabled={active === 0}
            aria-label="Slide anterior"
          >
            <ArrowLeft className="size-3.5" />
          </Button>
          <Button
            type="button"
            variant="default"
            size="icon"
            className="size-8"
            onClick={() => goTo(active + 1)}
            disabled={active === SLIDES.length - 1}
            aria-label="Próximo slide"
          >
            <ArrowRight className="size-3.5" />
          </Button>
        </div>
      </footer>

      <OpeningCurtain visible={showOpening} />
    </div>
  );
}
