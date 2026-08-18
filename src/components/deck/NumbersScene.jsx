import { motion } from "motion/react";
import {
  BarChart3,
  Bot,
  TrendingUp,
} from "lucide-react";
import { operationKpis, topAutomations } from "../../deck-data";
import { Badge } from "../ui/badge";
import { MotionCard } from "../ui/card";
import {
  EASE,
  MetricCard,
  Scene,
  SceneHeading,
  SectionLabel,
} from "./primitives";

function TrendChart() {
  return (
    <div
      className="relative mt-3 min-h-[210px] flex-1"
      role="img"
      aria-label="Tendência de execuções diárias nos últimos 30 dias, conforme o dashboard enviado."
    >
      <div className="pointer-events-none absolute inset-y-2 left-0 flex w-10 flex-col justify-between text-[9px] font-semibold text-[#5d86a5]">
        <span>1.600</span>
        <span>1.200</span>
        <span>800</span>
        <span>400</span>
        <span>0</span>
      </div>
      <svg
        viewBox="0 0 720 220"
        preserveAspectRatio="none"
        className="absolute inset-y-1 left-11 h-[calc(100%_-_28px)] w-[calc(100%_-_44px)] overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="execution-area-new" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5d86a5" stopOpacity="0.26" />
            <stop offset="100%" stopColor="#5d86a5" stopOpacity="0.01" />
          </linearGradient>
        </defs>
        {[12, 64, 116, 168, 219].map((y) => (
          <line
            key={y}
            x1="0"
            x2="720"
            y1={y}
            y2={y}
            stroke="rgba(44,83,114,.09)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        <path
          d="M0 193 C24 188 38 182 62 184 S92 179 116 183 S150 181 174 191 S206 187 228 170 S248 105 276 98 S322 103 346 112 S378 127 400 91 S432 75 458 72 S486 38 510 45 S544 63 568 52 S596 50 620 42 S655 41 678 48 S705 80 720 103 L720 220 L0 220 Z"
          fill="url(#execution-area-new)"
        />
        <motion.path
          className="trend-line"
          d="M0 191 C24 186 38 180 62 182 S92 177 116 181 S150 179 174 189 S206 185 228 168 S248 101 276 95 S322 100 346 109 S378 124 400 88 S432 72 458 69 S486 35 510 42 S544 60 568 49 S596 47 620 39 S655 38 678 45 S705 77 720 100"
          stroke="#2c5372"
          strokeWidth="2.4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.36, duration: 1.15, ease: EASE }}
        />
        <motion.path
          className="trend-line"
          d="M0 195 C24 190 38 185 62 187 S92 182 116 186 S150 184 174 194 S206 190 228 173 S248 108 276 101 S322 106 346 115 S378 130 400 94 S432 78 458 75 S486 42 510 49 S544 67 568 56 S596 54 620 46 S655 45 678 52 S705 84 720 107"
          stroke="#5d86a5"
          strokeWidth="2.2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.48, duration: 1.15, ease: EASE }}
        />
      </svg>
      <div className="absolute inset-x-11 bottom-0 flex justify-between text-[9px] font-semibold text-[#5d86a5]">
        {["19/07", "25/07", "31/07", "05/08", "10/08", "17/08"].map(
          (date) => (
            <span key={date}>{date}</span>
          ),
        )}
      </div>
    </div>
  );
}

function Ranking() {
  const highestExecutionCount = topAutomations[0].executions;

  return (
    <div className="mt-2 flex flex-1 flex-col justify-center">
      {topAutomations.map((automation, index) => (
        <div
          className="grid grid-cols-[28px_minmax(0,1fr)] gap-3 border-b border-[#2c5372]/[.07] py-2.5 last:border-0"
          key={automation.name}
        >
          <span className="font-display pt-0.5 text-xs font-semibold text-[#5d86a5]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="min-w-0">
            <div className="flex items-center justify-between gap-3">
              <strong
                className="truncate text-[11px] font-semibold text-[#426a88]"
                title={automation.name}
              >
                {automation.name}
              </strong>
              <b className="font-display text-sm text-[#2c5372]">
                {automation.executions.toLocaleString("pt-BR")}
              </b>
            </div>
            <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-[#2c5372]/[.07]">
              <motion.div
                className="h-full origin-left rounded-full bg-gradient-to-r from-[#bf404f] to-[#eb7380]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  delay: 0.46 + index * 0.07,
                  duration: 0.72,
                  ease: EASE,
                }}
                style={{
                  width: `${(automation.executions / highestExecutionCount) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function NumbersScene() {
  return (
    <Scene contentClassName="gap-5">
      <SceneHeading
        eyebrow="02 · Operação"
        title={
          <>
            Números da <span className="text-[#e83948]">operação.</span>
          </>
        }
        description="Últimos 30 dias · atualização do dashboard às 17:38"
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {operationKpis.map((metric, index) => (
          <MetricCard
            key={metric.label}
            {...metric}
            delay={0.12 + index * 0.055}
          />
        ))}
      </div>

      <div className="grid flex-1 gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(260px,.8fr)_230px] xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,.8fr)_300px]">
        <MotionCard
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.31, duration: 0.52, ease: EASE }}
          className="flex min-h-[310px] flex-col p-5"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <SectionLabel>Volume diário</SectionLabel>
              <h3 className="font-display text-lg font-semibold tracking-[-0.035em]">
                Execuções por dia
              </h3>
              <p className="mt-1 text-xs text-[#5d86a5]">
                Volume total e sucessos ao longo do período
              </p>
            </div>
            <Badge variant="cream">30 dias</Badge>
          </div>
          <TrendChart />
          <div className="mt-2 flex items-center gap-5 text-[10px] font-semibold text-[#426a88]">
            <span className="flex items-center gap-2">
              <i className="size-2 rounded-full bg-[#2c5372]" /> Total
            </span>
            <span className="flex items-center gap-2">
              <i className="size-2 rounded-full bg-[#5d86a5]" /> Sucessos
            </span>
          </div>
        </MotionCard>

        <MotionCard
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.37, duration: 0.52, ease: EASE }}
          className="flex min-h-[310px] flex-col p-5"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <SectionLabel>Concentração</SectionLabel>
              <h3 className="font-display text-lg font-semibold tracking-[-0.035em]">
                Top robôs por execuções
              </h3>
              <p className="mt-1 text-xs text-[#5d86a5]">
                Quebra mensal por processo
              </p>
            </div>
            <BarChart3 className="size-[18px] text-[#e83948]" strokeWidth={1.7} />
          </div>
          <Ranking />
        </MotionCard>

        <motion.div
          initial={{ opacity: 0, x: 22 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.43, duration: 0.52, ease: EASE }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1"
        >
          <article className="relative overflow-hidden rounded-[1.75rem] border border-[#e83948]/15 bg-[#eaeff5] p-5 shadow-[0_18px_45px_rgba(44,83,114,.08)]">
            <Bot
              className="absolute -right-5 -top-5 size-24 text-[#2c5372]/[.04]"
              strokeWidth={1.2}
            />
            <SectionLabel>Escala atual</SectionLabel>
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl font-semibold tracking-[-0.04em]">
                Portfólio em operação
              </h3>
              <Bot className="size-5 text-[#e83948]" strokeWidth={1.7} />
            </div>
            <div className="mt-4 flex items-end gap-3">
              <strong className="font-display text-[3.4rem] font-semibold leading-[.82] tracking-[-0.075em] text-[#2c5372]">
                107
              </strong>
              <span className="max-w-20 pb-1 text-[10px] font-bold uppercase leading-3 tracking-[0.08em] text-[#426a88]">
                automações ativas
              </span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {[
                ["5", "áreas atendidas"],
                ["4", "tecnologias"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-xl border border-[#2c5372]/[.08] bg-white/80 px-3 py-2.5"
                >
                  <strong className="font-display block text-2xl tracking-[-0.05em] text-[#2c5372]">
                    {value}
                  </strong>
                  <span className="text-[9px] font-semibold text-[#426a88]">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </article>

          <article className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#2c5372] p-5 text-white shadow-[0_22px_60px_rgba(44,83,114,.18)]">
            <TrendingUp className="absolute -right-5 -top-5 size-24 text-white/[.035]" />
            <SectionLabel dark>Próxima leitura</SectionLabel>
            <h3 className="font-display text-xl font-semibold tracking-[-0.04em]">
              Execuções RPA × humano
            </h3>
            <p className="mt-2 text-xs leading-5 text-white/55">
              Comparar economia de tempo e performance por processo, área e
              tecnologia.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="dark">Tempo economizado</Badge>
              <Badge variant="dark">Performance</Badge>
            </div>
          </article>
        </motion.div>
      </div>
    </Scene>
  );
}
