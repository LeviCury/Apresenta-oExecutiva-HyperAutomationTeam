import { motion } from "motion/react";
import {
  BarChart3,
  CheckCircle2,
  Clock3,
  Factory,
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

const formatDecimal = (value) =>
  value.toLocaleString("pt-BR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

const evidence = [
  {
    ...roiMetrics.dcpoa,
    icon: FileCheck2,
    accent: "red",
    answer: "~12 analistas · faixa de 8 a 15",
    details: "94% dos DCPOAs têm de 1 a 3 itens.",
  },
  {
    ...roiMetrics.certificates,
    icon: ShieldCheck,
    accent: "sand",
    answer: "~34 analistas",
    details: "Contagem sem testes e sem retrabalhos duplicados.",
  },
  {
    ...roiMetrics.exportInvoice,
    icon: ReceiptText,
    accent: "redLight",
    answer: `~${formatDecimal(roiMetrics.exportInvoice.analysts)} analistas`,
    details: `${roiMetrics.exportInvoice.executions.toLocaleString("pt-BR")} × 20 min = ${roiMetrics.exportInvoice.hours.toLocaleString("pt-BR")} h manuais · runtime ${formatDecimal(roiMetrics.exportInvoice.runtimeHours)} h · redução ${formatDecimal(roiMetrics.exportInvoice.timeReduction)}%.`,
  },
  {
    ...roiMetrics.greenLeather,
    icon: Factory,
    accent: "cream",
    answer: `~${formatDecimal(roiMetrics.greenLeather.analysts)} analista`,
    details: `${roiMetrics.greenLeather.executions.toLocaleString("pt-BR")} × 9 min = ${formatDecimal(roiMetrics.greenLeather.hours)} h manuais · runtime ${formatDecimal(roiMetrics.greenLeather.runtimeHours)} h · redução ${formatDecimal(roiMetrics.greenLeather.timeReduction)}%.`,
  },
];

function DeliveryChart() {
  const barWidth = (roiMetrics.total.analysts / 60) * 100;

  return (
    <motion.section
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.55, ease: EASE }}
      className="rounded-[1.75rem] border border-[#2c5372]/10 bg-white/95 p-4 shadow-[0_24px_70px_rgba(44,83,114,.1)] backdrop-blur-xl lg:p-5"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <SectionLabel>Entrega equivalente</SectionLabel>
          <h3 className="font-display text-lg font-semibold tracking-[-0.04em] text-[#2c5372]">
            RPAs entregam o equivalente a{" "}
            {formatDecimal(roiMetrics.total.analysts)} analistas
          </h3>
          <p className="mt-1 max-w-[680px] text-[10px] leading-4 text-[#426a88]">
            Trabalho automatizado em julho convertido pela premissa de 140
            horas úteis por analista/mês.
          </p>
        </div>
        <Badge variant="cream" className="shrink-0">
          Julho · 2026
        </Badge>
      </div>

      <div className="mt-5">
        <div className="mb-2 flex justify-between text-[9px] font-semibold text-[#5d86a5]">
          {[0, 20, 40, 60].map((tick) => (
            <span key={tick}>{tick}</span>
          ))}
        </div>
        <div
          className="relative h-16 overflow-visible rounded-2xl border border-[#2c5372]/[.08] bg-[#eaeff5]/60"
          role="img"
          aria-label={`O trabalho entregue pelos RPAs equivale a ${formatDecimal(roiMetrics.total.analysts)} analistas.`}
        >
          {[33.333, 66.666].map((position) => (
            <span
              key={position}
              className="absolute inset-y-0 w-px bg-[#2c5372]/[.07]"
              style={{ left: `${position}%` }}
              aria-hidden="true"
            />
          ))}
          <motion.div
            className="absolute inset-y-2 left-2 origin-left rounded-xl bg-gradient-to-r from-[#2c5372] via-[#426a88] to-[#e83948] shadow-[0_0_45px_rgba(44,83,114,.2)]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.45, duration: 1.05, ease: EASE }}
            style={{ width: `calc(${barWidth}% - 8px)` }}
          >
            <span className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-[#2c5372] px-3 py-1 font-display text-base font-bold tracking-[-0.04em] text-white shadow-[0_5px_18px_rgba(44,83,114,.35)] ring-2 ring-white/90">
              ~{formatDecimal(roiMetrics.total.analysts)}
            </span>
          </motion.div>
        </div>
        <div className="mt-2 flex justify-end text-[9px] font-semibold uppercase tracking-[0.12em] text-[#5d86a5]">
          Equivalência em analistas · 140 h/mês
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
      className="relative grid overflow-hidden rounded-[1.65rem] border border-[#eb7380]/25 bg-[#e83948] p-4 text-white shadow-[0_22px_65px_rgba(232,57,72,.2)] sm:grid-cols-[230px_minmax(0,1fr)] sm:items-center sm:gap-5"
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
          <strong className="font-display text-[3.2rem] font-semibold leading-[.82] tracking-[-0.08em]">
            <AnimatedNumber
              value={roiMetrics.total.analysts}
              decimals={1}
              prefix="~"
            />
          </strong>
          <span className="max-w-20 pb-0.5 text-[9px] font-semibold leading-3 text-white/70">
            analistas equivalentes
          </span>
        </div>
      </div>
      <div className="relative mt-4 border-t border-white/15 pt-3 sm:mt-0 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
        <p className="text-xs leading-5 text-white/82">
          Em julho, os RPAs entregaram um volume de trabalho equivalente a{" "}
          <strong className="text-white">
            ~{formatDecimal(roiMetrics.total.analysts)} analistas
          </strong>
          , considerando 140 horas úteis por mês.
        </p>
        <p className="mt-1.5 text-[9px] leading-4 text-white/58">
          Equivalência consolidada de DCPOA, CSN/CSI, Faturamento NF de
          Exportação e Faturamento Couro Verde.
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
      className="relative overflow-hidden rounded-[1.35rem] border border-[#2c5372]/[.09] bg-white/95 p-3.5 shadow-[0_14px_38px_rgba(44,83,114,.06)] backdrop-blur-xl"
    >
      <div
        className={cn(
          "absolute inset-y-0 left-0 w-0.5",
          item.accent === "red" && "bg-[#e83948]",
          item.accent === "sand" && "bg-[#c7b475]",
          item.accent === "redLight" && "bg-[#eb7380]",
          item.accent === "cream" && "bg-[#5d86a5]",
        )}
      />
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <span className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#5d86a5]">
            Evidência {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-0.5 font-display text-sm font-semibold leading-4 tracking-[-0.03em] text-[#2c5372]">
            {item.title}
          </h3>
        </div>
        <div className="flex size-8 shrink-0 items-center justify-center rounded-xl border border-[#2c5372]/10 bg-[#eaeff5] text-[#e83948]">
          <Icon className="size-3.5" strokeWidth={1.7} />
        </div>
      </div>

      <div className="mt-2.5 grid grid-cols-[minmax(0,1.55fr)_.7fr_.7fr] gap-2">
        <div className="min-w-0 rounded-xl bg-[#eaeff5]/65 px-2.5 py-2">
          <strong className="font-display block truncate text-sm tracking-[-0.03em] text-[#2c5372]">
            {item.volume}
          </strong>
          <span className="block truncate text-[8px] text-[#5d86a5]">
            {item.complement}
          </span>
        </div>
        <div className="rounded-xl bg-[#eaeff5]/65 px-2.5 py-2">
          <Clock3 className="mb-0.5 size-2.5 text-[#5d86a5]" />
          <strong className="font-display block text-xs text-[#2c5372]">
            {item.hours.toLocaleString("pt-BR")} h
          </strong>
        </div>
        <div className="rounded-xl bg-[#eaeff5]/65 px-2.5 py-2">
          <CheckCircle2 className="mb-0.5 size-2.5 text-[#426a88]" />
          <strong className="font-display block text-xs text-[#2c5372]">
            {item.analysts.toLocaleString("pt-BR")} FTE
          </strong>
        </div>
      </div>
      <p className="mt-2 text-[8px] leading-3 text-[#5d86a5]">
        {item.premise} · {item.details}
      </p>
    </motion.article>
  );
}

export default function RoiScene() {
  return (
    <Scene contentClassName="gap-4">
      <SceneHeading
        eyebrow="05 · Retorno comprovado"
        title={
          <>
            ROI ganho. Nossos RPAs entregam o equivalente a{" "}
            <span className="text-[#e83948]">
              ~{formatDecimal(roiMetrics.total.analysts)} analistas.
            </span>
          </>
        }
        description="DCPOA + CSN/CSI + Faturamento NF de Exportação + Faturamento Couro Verde · fonte: logs de produção dos robôs · julho/2026"
        aside={
          <div className="flex items-center gap-3 rounded-full border border-[#2c5372]/10 bg-white/85 px-4 py-2.5 text-xs font-semibold text-[#426a88] backdrop-blur-md">
            <BarChart3 className="size-4 text-[#e83948]" strokeWidth={1.7} />
            1 analista = 140 h úteis/mês
          </div>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {roiSummaryCards.map((metric, index) => (
          <MetricCard
            key={metric.label}
            {...metric}
            tone="brand"
            delay={0.1 + index * 0.055}
            className="min-h-[96px] p-4"
          />
        ))}
      </div>

      <div className="grid gap-3 lg:grid-cols-[minmax(0,1.1fr)_minmax(400px,.9fr)] xl:grid-cols-[minmax(0,1.1fr)_minmax(520px,.9fr)]">
        <div className="grid content-start gap-3">
          <DeliveryChart />
          <ConclusionPanel />
        </div>
        <div className="grid content-start gap-3 sm:grid-cols-2">
          {evidence.map((item, index) => (
            <EvidenceCard item={item} index={index} key={item.title} />
          ))}
        </div>
      </div>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.72, duration: 0.45 }}
        className="flex flex-col gap-2 border-t border-[#2c5372]/[.08] pt-3 text-[9px] leading-4 text-[#5d86a5] sm:flex-row sm:items-center sm:justify-between"
      >
        <span>
          Base consolidada de julho/2026 · DCPOA por execução real · CSN/CSI
          sem testes e duplicados.
        </span>
        <span>
          Exportação: num_status = 1 · 20 min/linha. Couro Verde: status Jira 4
          + status RPA 12 · 272 de 296 · 9 min/execução.
        </span>
      </motion.footer>
    </Scene>
  );
}
