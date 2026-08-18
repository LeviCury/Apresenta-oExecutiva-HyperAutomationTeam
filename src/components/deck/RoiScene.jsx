import { motion } from "motion/react";
import {
  BarChart3,
  CheckCircle2,
  Clock3,
  FileCheck2,
  ReceiptText,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { roiMetrics, roiSummaryCards } from "../../deck-data";
import { Badge } from "../ui/badge";
import { cn } from "../../lib/utils";
import {
  AnimatedNumber,
  EASE,
  MetricCard,
  Scene,
  SceneHeading,
  SectionLabel,
} from "./primitives";

const evidence = [
  {
    ...roiMetrics.dcpoa,
    icon: FileCheck2,
    accent: "teal",
    answer: "~12 analistas · faixa de 8 a 15",
    details: "94% dos DCPOAs têm de 1 a 3 itens.",
  },
  {
    ...roiMetrics.certificates,
    icon: ShieldCheck,
    accent: "gold",
    answer: "~34 analistas",
    details: "Contagem sem testes e sem retrabalhos duplicados.",
  },
  {
    ...roiMetrics.exportInvoice,
    icon: ReceiptText,
    accent: "red",
    answer: "~1,4 analista",
    details: "570 × 20 min = 190 horas mensais.",
  },
];

function CapacityChart() {
  const barWidth = (roiMetrics.total.analysts / 60) * 100;
  const markerPosition = (roiMetrics.capacity / 60) * 100;

  return (
    <motion.section
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.55, ease: EASE }}
      className="rounded-[1.75rem] border border-white/10 bg-white/[.055] p-4 shadow-[0_24px_70px_rgba(0,0,0,.18)] backdrop-blur-xl lg:p-5"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <SectionLabel dark>Capacidade equivalente</SectionLabel>
          <h3 className="font-display text-lg font-semibold tracking-[-0.04em] text-white">
            Trabalho dos robôs vs. capacidade de 42 analistas
          </h3>
          <p className="mt-1 max-w-[680px] text-[10px] leading-4 text-white/45">
            Barra = trabalho executado pelos robôs em julho, convertido em
            analistas (140 h/mês). A linha marca a capacidade assumida de 42
            analistas.
          </p>
        </div>
        <Badge variant="dark" className="shrink-0">
          Julho · 2026
        </Badge>
      </div>

      <div className="mt-5">
        <div className="mb-2 flex justify-between text-[9px] font-semibold text-white/30">
          {[0, 20, 40, 60].map((tick) => (
            <span key={tick}>{tick}</span>
          ))}
        </div>
        <div
          className="relative h-16 overflow-visible rounded-2xl border border-white/[.08] bg-black/15"
          role="img"
          aria-label="O trabalho dos robôs equivale a 47,4 analistas, acima da capacidade assumida de 42 analistas."
        >
          {[33.333, 66.666].map((position) => (
            <span
              key={position}
              className="absolute inset-y-0 w-px bg-white/[.06]"
              style={{ left: `${position}%` }}
              aria-hidden="true"
            />
          ))}
          <motion.div
            className="roi-bar-pattern absolute inset-y-2 left-2 origin-left rounded-xl bg-gradient-to-r from-[#008d80] via-[#00a896] to-[#00d6c2] shadow-[0_0_45px_rgba(0,214,194,.23)]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.45, duration: 1.05, ease: EASE }}
            style={{ width: `calc(${barWidth}% - 8px)` }}
          >
            <span className="absolute right-3 top-1/2 -translate-y-1/2 font-display text-lg font-semibold tracking-[-0.04em] text-white">
              ~47,4
            </span>
          </motion.div>
          <motion.div
            className="absolute -inset-y-2 w-px bg-[#f2c56c] shadow-[0_0_18px_rgba(242,197,108,.5)]"
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ delay: 1.05, duration: 0.42, ease: EASE }}
            style={{ left: `${markerPosition}%` }}
          >
            <span className="absolute -top-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-[#f2c56c]/25 bg-[#2c2a23] px-2 py-1 text-[9px] font-bold text-[#f2c56c]">
              42 analistas
            </span>
          </motion.div>
        </div>
        <div className="mt-2 flex justify-end text-[9px] font-semibold uppercase tracking-[0.12em] text-white/28">
          Analistas equivalentes
        </div>
      </div>
    </motion.section>
  );
}

function ConclusionPanel() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5, ease: EASE }}
      className="relative grid overflow-hidden rounded-[1.65rem] border border-[#00d6c2]/20 bg-[#00a896] p-4 text-white shadow-[0_22px_65px_rgba(0,168,150,.18)] sm:grid-cols-[190px_minmax(0,1fr)] sm:items-center sm:gap-5"
    >
      <TrendingUp
        className="absolute -right-6 -top-7 size-28 text-white/[.07]"
        strokeWidth={1.3}
      />
      <div className="relative">
        <span className="text-[9px] font-bold uppercase tracking-[0.17em] text-white/60">
          Conclusão executiva
        </span>
        <div className="mt-2 flex items-end gap-2">
          <strong className="font-display text-[3.6rem] font-semibold leading-[.82] tracking-[-0.08em]">
            <AnimatedNumber value={roiMetrics.total.coverage} suffix="%" />
          </strong>
          <span className="pb-1 text-[10px] font-semibold text-white/65">
            da capacidade
          </span>
        </div>
      </div>
      <div className="relative mt-4 border-t border-white/15 pt-3 sm:mt-0 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
        <p className="text-xs leading-5 text-white/82">
          Julho equivale a <strong className="text-white">~47,4 analistas</strong>{" "}
          — acima da capacidade assumida de 42.
        </p>
        <p className="mt-1.5 text-[9px] leading-4 text-white/58">
          Até no cenário mais otimista do DCPOA, o total chega a{" "}
          <strong className="text-white">44,0 analistas</strong>.
        </p>
      </div>
    </motion.section>
  );
}

function EvidenceCard({ item, index }) {
  const Icon = item.icon;

  return (
    <motion.article
      initial={{ opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.44 + index * 0.06, duration: 0.5, ease: EASE }}
      className="relative overflow-hidden rounded-[1.35rem] border border-white/[.09] bg-white/[.045] p-3.5 backdrop-blur-xl"
    >
      <div
        className={cn(
          "absolute inset-y-0 left-0 w-0.5",
          item.accent === "teal" && "bg-[#00d6c2]",
          item.accent === "gold" && "bg-[#d9a441]",
          item.accent === "red" && "bg-[#d94b57]",
        )}
      />
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <span className="text-[8px] font-bold uppercase tracking-[0.14em] text-white/32">
            Evidência {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-0.5 truncate font-display text-sm font-semibold tracking-[-0.03em] text-white">
            {item.title}
          </h3>
        </div>
        <div className="flex size-8 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[.05] text-[#68ded0]">
          <Icon className="size-3.5" strokeWidth={1.8} />
        </div>
      </div>

      <div className="mt-2.5 grid grid-cols-[minmax(0,1.55fr)_.7fr_.7fr] gap-2">
        <div className="min-w-0 rounded-xl bg-black/10 px-2.5 py-2">
          <strong className="font-display block truncate text-sm tracking-[-0.03em] text-white">
            {item.volume}
          </strong>
          <span className="block truncate text-[8px] text-white/30">
            {item.complement}
          </span>
        </div>
        <div className="rounded-xl bg-black/10 px-2.5 py-2">
          <Clock3 className="mb-0.5 size-2.5 text-white/30" />
          <strong className="font-display block text-xs text-white">
            {item.hours.toLocaleString("pt-BR")} h
          </strong>
        </div>
        <div className="rounded-xl bg-black/10 px-2.5 py-2">
          <CheckCircle2 className="mb-0.5 size-2.5 text-[#66ddcf]" />
          <strong className="font-display block text-xs text-white">
            {item.analysts.toLocaleString("pt-BR")} FTE
          </strong>
        </div>
      </div>
      <p className="mt-2 truncate text-[8px] leading-3 text-white/32">
        {item.premise} · {item.details}
      </p>
    </motion.article>
  );
}

export default function RoiScene() {
  return (
    <Scene dark contentClassName="gap-4">
      <SceneHeading
        dark
        eyebrow="05 · Retorno comprovado"
        title={
          <>
            ROI ganho. A automação já entrega{" "}
            <span className="text-[#00d6c2]">mais que a capacidade.</span>
          </>
        }
        description="DCPOA + CSN/CSI + Faturamento de Nota Fiscal de Exportação · fonte: logs de produção dos robôs · julho/2026"
        aside={
          <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[.05] px-4 py-2.5 text-xs font-semibold text-white/60 backdrop-blur-md">
            <BarChart3 className="size-4 text-[#00d6c2]" />
            1 analista = 140 h úteis/mês
          </div>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {roiSummaryCards.map((metric, index) => (
          <MetricCard
            key={metric.label}
            {...metric}
            dark
            delay={0.1 + index * 0.055}
            className="min-h-[96px] p-4"
          />
        ))}
      </div>

      <div className="grid gap-3 xl:grid-cols-[minmax(0,1.35fr)_430px]">
        <div className="grid content-start gap-3">
          <CapacityChart />
          <ConclusionPanel />
        </div>
        <div className="grid content-start gap-3">
          {evidence.map((item, index) => (
            <EvidenceCard item={item} index={index} key={item.title} />
          ))}
        </div>
      </div>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.72, duration: 0.45 }}
        className="flex flex-col gap-2 border-t border-white/[.08] pt-3 text-[9px] leading-4 text-white/28 sm:flex-row sm:items-center sm:justify-between"
      >
        <span>
          Base consolidada de julho/2026 · DCPOA por execução real · CSN/CSI por
          certificado emitido, sem testes e duplicados.
        </span>
        <span>
          Faturamento de Exportação: registros enviados de 01/07 a 30/07 ·
          somente num_status = 1 · 20 min/linha.
        </span>
      </motion.footer>
    </Scene>
  );
}
