import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Bot,
  BriefcaseBusiness,
  Building2,
  Code2,
  Gauge,
  Maximize2,
  Minimize2,
  Network,
  Search,
  Sparkles,
  Target,
  Users,
  Workflow,
  Zap,
} from "lucide-react";
import { SLIDES, TEAM } from "./data";

const slideVariants = {
  enter: (direction) => ({
    opacity: 0,
    x: direction > 0 ? 110 : -110,
    scale: 0.96,
    rotateY: direction > 0 ? 3.5 : -3.5,
    filter: "blur(16px)",
    clipPath:
      direction > 0 ? "inset(0 0 0 7%)" : "inset(0 7% 0 0)",
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    rotateY: 0,
    filter: "blur(0px)",
    clipPath: "inset(0 0 0 0)",
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction > 0 ? -82 : 82,
    scale: 0.975,
    rotateY: direction > 0 ? -2.5 : 2.5,
    filter: "blur(12px)",
    clipPath:
      direction > 0 ? "inset(0 7% 0 0)" : "inset(0 0 0 7%)",
  }),
};

const ease = [0.22, 1, 0.36, 1];

function getSlideFromHash() {
  const hash = window.location.hash.replace("#", "");
  const index = SLIDES.findIndex((slide) => slide.hash === hash);
  return index >= 0 ? index : 0;
}

function AmbientBackground() {
  return (
    <div className="ambient" aria-hidden="true">
      <div className="aurora aurora-red" />
      <div className="aurora aurora-blue" />
      <div className="aurora aurora-sand" />
      <div className="grid-plane" />
      <div className="pointer-light" />
      <div className="noise" />
    </div>
  );
}

function PresentationSplash({ visible }) {
  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="presentation-splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(8px)", scale: 1.025 }}
          transition={{ duration: 0.62, ease }}
          aria-hidden="true"
        >
          <motion.div
            className="splash-emblem"
            initial={{ opacity: 0, scale: 0.72, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{
              delay: 0.08,
              duration: 0.72,
              type: "spring",
              stiffness: 180,
              damping: 17,
            }}
          >
            <i />
            <i />
            <i />
          </motion.div>
          <motion.div
            className="splash-title"
            initial={{ opacity: 0, y: 18, filter: "blur(7px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.28, duration: 0.66, ease }}
          >
            Hiperautomação <em>·</em> Apresentação à diretoria
          </motion.div>
          <motion.div
            className="splash-line"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.52, duration: 0.78, ease }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function GlowCard({ children, className = "", icon, style }) {
  const reducedMotion = useReducedMotion();

  function handlePointerMove(event) {
    if (reducedMotion || event.pointerType === "touch") return;

    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateX = ((y / rect.height - 0.5) * -4).toFixed(2);
    const rotateY = ((x / rect.width - 0.5) * 4).toFixed(2);

    card.style.setProperty("--card-x", `${x}px`);
    card.style.setProperty("--card-y", `${y}px`);
    card.style.setProperty("--rotate-x", `${rotateX}deg`);
    card.style.setProperty("--rotate-y", `${rotateY}deg`);
  }

  function handlePointerLeave(event) {
    event.currentTarget.style.setProperty("--rotate-x", "0deg");
    event.currentTarget.style.setProperty("--rotate-y", "0deg");
  }

  return (
    <article
      className={`surface glow-card ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={style}
    >
      {icon ? <div className="card-icon">{icon}</div> : null}
      {children}
    </article>
  );
}

function AnimatedNumber({ value }) {
  const reducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(reducedMotion ? value : 0);

  useEffect(() => {
    if (reducedMotion) {
      setDisplay(value);
      return undefined;
    }

    let frame;
    const start = performance.now();
    const duration = 900;

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setDisplay(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reducedMotion, value]);

  return <>{display}</>;
}

function IntroSlide() {
  return (
    <div className="slide-content intro-slide">
      <header className="slide-heading reveal">
        <h1>De time que atende pedidos para CoE que escolhe valor.</h1>
        <p className="lead">
          Propósito, missão e onde chegamos em 12 meses — com a oportunidade de
          escala ainda aberta na companhia.
        </p>
      </header>

      <div className="intro-layout">
        <div className="intro-main">
          <div className="bento-three">
            <GlowCard
              className="reveal"
              icon={<Target size={19} strokeWidth={1.8} />}
              style={{ "--delay": "80ms" }}
            >
              <h3>Propósito</h3>
              <p>
                Industrializar a melhoria de processos digitais: descobrir,
                construir, operar e provar benefício — não produzir bots sob
                demanda.
              </p>
            </GlowCard>
            <GlowCard
              className="reveal"
              icon={<Network size={19} strokeWidth={1.8} />}
              style={{ "--delay": "130ms" }}
            >
              <h3>Missão na cia</h3>
              <p>
                Ser o CoE de hiperautomação da TI: RPA + integração + IDP/IA,
                com padrão, SLA e ROI rastreado para as áreas de negócio.
              </p>
            </GlowCard>
            <GlowCard
              className="reveal"
              icon={<Zap size={19} strokeWidth={1.8} />}
              style={{ "--delay": "180ms" }}
            >
              <h3>Onde queremos chegar</h3>
              <p>
                Funil priorizado, entrega industrial, operação com SLA e time
                júnior evoluindo sob mentoria — em 12 meses.
              </p>
            </GlowCard>
          </div>

          <div className="opportunity-grid">
            <GlowCard
              className="metric-card reveal"
              icon={<Building2 size={19} strokeWidth={1.8} />}
              style={{ "--delay": "230ms" }}
            >
              <strong>Hoje — 5 áreas</strong>
              <p>
                MBS, Financeiro, Estoque, Jurídico e Diretoria Executiva. No
                MBS: Faturamento, Documentação, Despesas sobre fretes, Despesas
                de exportação, Cabine Fiscal, Gente e Gestão.
              </p>
            </GlowCard>
            <GlowCard
              className="metric-card reveal"
              icon={<Search size={19} strokeWidth={1.8} />}
              style={{ "--delay": "280ms" }}
            >
              <strong>Oportunidade</strong>
              <p>
                Catalogar as áreas que ainda não estão no domínio de automação
                — e só então priorizar por valor, não por pedido.
              </p>
            </GlowCard>
          </div>

          <p className="note reveal" style={{ "--delay": "330ms" }}>
            Como atuamos: Demand → Triage → Discovery → Design → Build → Deploy
            → Run. Entra no build só o que tem volume, ROI e prontidão.
          </p>
        </div>

        <aside className="intro-side">
          <article
            className="ask-card reveal"
            style={{ "--delay": "170ms" }}
          >
            <div className="ask-orbit" aria-hidden="true">
              <Sparkles size={22} strokeWidth={1.6} />
            </div>
            <b>Como ganhamos escala</b>
            <p>
              Não contratamos para cada fila. Multiplicamos o especialista com
              playbook, pairing e 1–2 plenos. Expandimos área a área por valor,
              não por ordem de chegada.
            </p>
            <div className="flow-line" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
          </article>
          <GlowCard
            className="request-card reveal"
            icon={<BriefcaseBusiness size={19} strokeWidth={1.8} />}
            style={{ "--delay": "260ms" }}
          >
            <h3>Pedido nesta reunião</h3>
            <p>
              Patrocínio ao ritual de priorização com as áreas, dados para
              discovery e apoio às movimentações de time (promoção + 1 pleno).
            </p>
          </GlowCard>
        </aside>
      </div>
    </div>
  );
}

const kpis = [
  { value: 107, label: "RPAs / automações ativas", icon: Bot },
  {
    value: 4,
    label: "Ferramentas: Python (DHC), IBM, Power Automate, N8N",
    icon: Code2,
  },
  { value: 35, label: "Média de chamados / mês", icon: Gauge },
  { value: 5, label: "Áreas no domínio atual", icon: Building2 },
];

function NumbersSlide() {
  return (
    <div className="slide-content numbers-slide">
      <header className="slide-heading compact reveal">
        <h2>Números da operação</h2>
      </header>

      <div className="kpi-grid">
        {kpis.map(({ value, label, icon: Icon }, index) => (
          <article
            className="kpi reveal"
            style={{ "--delay": `${70 + index * 45}ms` }}
            key={label}
          >
            <div className="kpi-glow" aria-hidden="true" />
            <div className="kpi-top">
              <Icon size={18} strokeWidth={1.8} />
              <span className="pulse-dot" />
            </div>
            <strong>
              <AnimatedNumber value={value} />
            </strong>
            <span>{label}</span>
          </article>
        ))}
      </div>

      <div className="executive-grid">
        <GlowCard
          className="info-card reveal"
          icon={<Building2 size={19} strokeWidth={1.8} />}
          style={{ "--delay": "250ms" }}
        >
          <h3>Áreas atendidas</h3>
          <ul>
            <li>
              <strong>MBS</strong> — Faturamento, Documentação, Despesas sobre
              fretes, Despesas de exportação, Cabine Fiscal, Gente e Gestão
            </li>
            <li>
              Financeiro · Estoque · Jurídico · Diretoria Executiva
            </li>
          </ul>
          <div className="abstract-map" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
        </GlowCard>

        <GlowCard
          className="info-card reveal"
          icon={<Workflow size={19} strokeWidth={1.8} />}
          style={{ "--delay": "300ms" }}
        >
          <h3>Stack e movimento</h3>
          <ul>
            <li>Python (DHC) · IBM · Power Automate · N8N (recente)</li>
            <li>3 iniciativas: DHC em PRD, IBM → Python, governança N8N</li>
            <li>4 projetos em backlog aguardando triage</li>
          </ul>
          <p className="note">Migração IBM → Python até 29/01/2027.</p>
        </GlowCard>

        <GlowCard
          className="info-card reveal"
          icon={<BarChart3 size={19} strokeWidth={1.8} />}
          style={{ "--delay": "350ms" }}
        >
          <h3>Leitura executiva</h3>
          <ul>
            <li>
              107 ativos com ~35 chamados/mês: operação estável, não saturada
            </li>
            <li>
              Cobertura ainda concentrada — o crescimento está fora do domínio
              atual
            </li>
            <li>
              Próximo número a abrir: catálogo das áreas ainda sem automação
            </li>
          </ul>
          <div className="mini-chart" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
        </GlowCard>
      </div>
    </div>
  );
}

const moves = [
  {
    title: "Skills que o CoE precisa",
    description:
      "Python pleno, governança N8N, ops/sustentação, discovery com ROI, IDP/IA com validação — hoje concentradas no especialista.",
  },
  {
    title: "Não contratar mais júnior agora",
    description:
      "4 juniores + 1 especialista. Gargalo é mentoria e review, não headcount júnior.",
  },
  {
    title: "Contratar 1 Analista Pleno (Python/RPA)",
    description:
      "Destravar a migração IBM → Python e aliviar o especialista para arquitetura e padrões.",
  },
  {
    title: "Promover 1 júnior → pleno (6–12 meses)",
    description:
      "Candidato natural: Levi, por stack IBM/Python. Evidência: ownership em PRD + qualidade.",
  },
  {
    title: "Alinhar cargo do Daniel",
    description:
      "Analista Administrativo Pl. no CoE. Converter para trilha de sistemas/automação ou formalizar papel de process analyst.",
  },
  {
    title: "Tracks internos",
    description:
      "João: N8N/governança. Guilherme: delivery. Igor: Tech Lead formal do CoE.",
  },
];

function TeamSlide({ selectedPerson, setSelectedPerson }) {
  const member = TEAM[selectedPerson];
  const reducedMotion = useReducedMotion();

  return (
    <div className="slide-content team-slide">
      <header className="slide-heading compact reveal">
        <h2>Equipe — o que temos e o que falta</h2>
      </header>

      <div className="team-layout">
        <div className="roster reveal" style={{ "--delay": "80ms" }}>
          {TEAM.map((person, index) => (
            <button
              type="button"
              className={`person ${index === selectedPerson ? "active" : ""}`}
              key={person.name}
              onClick={() => setSelectedPerson(index)}
              aria-pressed={index === selectedPerson}
            >
              <img src={person.photo} alt={person.name} />
              <span>
                <strong>{person.short}</strong>
                <small>{person.role}</small>
              </span>
              <i aria-hidden="true" />
            </button>
          ))}
        </div>

        <div className="profile-wrap reveal" style={{ "--delay": "140ms" }}>
          <AnimatePresence mode="wait">
            <motion.article
              className="profile"
              key={member.name}
              initial={
                reducedMotion
                  ? false
                  : { opacity: 0, y: 16, filter: "blur(6px)" }
              }
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={
                reducedMotion
                  ? undefined
                  : { opacity: 0, y: -12, filter: "blur(5px)" }
              }
              transition={{ duration: reducedMotion ? 0 : 0.32, ease }}
            >
              <div className="profile-photo">
                <img src={member.photo} alt={member.name} />
                <div className="photo-shade" />
              </div>
              <div className="profile-copy">
                <h3>{member.name}</h3>
                <div className="role">{member.role}</div>
                <div className="meta">
                  <i>{member.tenure}</i>
                  {member.teamTenure ? <i>{member.teamTenure}</i> : null}
                </div>
                <p className="bio">{member.bio}</p>
                <div className="skills">
                  {member.skills.map(([tool, level]) => (
                    <span
                      className={`skill ${
                        level === "Avançado" ? "advanced" : "junior"
                      }`}
                      key={`${tool}-${level}`}
                    >
                      {tool} · {level}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>

        <div className="moves reveal" style={{ "--delay": "200ms" }}>
          {moves.map((move) => (
            <article className="move" key={move.title}>
              <span className="move-marker" aria-hidden="true" />
              <div>
                <h4>{move.title}</h4>
                <p>{move.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

const initiatives = [
  {
    title: "DHC em PRD",
    subtitle: "Plataforma em produção",
    status: "28/08/2026",
    tone: "doing",
  },
  {
    title: "IBM RPA → Python",
    subtitle: "Modernização do portfólio",
    status: "29/01/2027",
    tone: "doing",
  },
  {
    title: "Governança N8N",
    subtitle: "Padrão e controle da ferramenta",
    status: "Em planejamento",
    tone: "plan",
  },
];

const backlog = [
  "Unificação de Arquivos PDF — SAP × Projuris",
  "RPA de Comissão no Siscomex",
  "Conciliação Financeira Automatizada — Sistema × Planilha",
  "RPA — Cargos e Salários Benefícios, Unificação PDF SAP × Projuris",
];

const timeline = [
  {
    when: "Agora → ago/26",
    title: "Estabilizar",
    items: [
      "Go-live DHC em PRD",
      "Fechar discovery das despesas de exportação",
      "Iniciar catálogo das áreas fora do domínio",
    ],
  },
  {
    when: "set/26 → jan/27",
    title: "Modernizar",
    items: [
      "Migração IBM → Python (29/01)",
      "Governança N8N",
      "Triage e score dos 4 itens de backlog",
    ],
  },
  {
    when: "1º sem/27",
    title: "Escalar",
    items: [
      "Build novo 70% / sustentação 30%",
      "Primeira área extra com business case",
      "Backlog priorizado entra no funil",
    ],
  },
];

function PlanSlide() {
  return (
    <div className="slide-content plan-slide">
      <header className="slide-heading compact reveal">
        <h2>Plano de trabalho — em curso, oportunidade e backlog</h2>
      </header>

      <div className="initiatives">
        {initiatives.map((initiative, index) => (
          <article
            className="initiative reveal"
            style={{ "--delay": `${70 + index * 50}ms` }}
            key={initiative.title}
          >
            <div className="initiative-icon" aria-hidden="true">
              {index === 0 ? (
                <Zap size={18} strokeWidth={1.8} />
              ) : index === 1 ? (
                <Code2 size={18} strokeWidth={1.8} />
              ) : (
                <Workflow size={18} strokeWidth={1.8} />
              )}
            </div>
            <div>
              <h3>{initiative.title}</h3>
              <small>{initiative.subtitle}</small>
            </div>
            <span className={`badge ${initiative.tone}`}>
              {initiative.status}
            </span>
          </article>
        ))}
      </div>

      <div className="plan-middle">
        <GlowCard
          className="opportunity-card reveal"
          icon={<Target size={19} strokeWidth={1.8} />}
          style={{ "--delay": "230ms" }}
        >
          <h3>Oportunidade catalogada</h3>
          <ul>
            <li>
              <strong>Lançamentos de despesas — exportação Brasil.</strong>{" "}
              Automatizar a maioria dos processos. Falta para go/no-go: volume
              de lançamentos, ROI, riscos à operação e posições impactadas.
            </li>
            <li>
              <strong>Expandir domínio.</strong> Catalogar as áreas que ainda
              não estão sob automação — só então priorizar por valor.
            </li>
          </ul>
          <p className="note">Não entra em build até fechar discovery.</p>
        </GlowCard>

        <section
          className="backlog reveal"
          style={{ "--delay": "290ms" }}
        >
          <h3>Backlog — priorizar no triage</h3>
          <div className="backlog-list">
            {backlog.map((item, index) => (
              <article key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item}</h3>
              </article>
            ))}
          </div>
        </section>
      </div>

      <div className="timeline reveal" style={{ "--delay": "350ms" }}>
        {timeline.map((phase, index) => (
          <article className="timeline-card" key={phase.title}>
            <div className="timeline-node" aria-hidden="true">
              <i />
            </div>
            <span className="when">{phase.when}</span>
            <h3>{phase.title}</h3>
            <ul>
              {phase.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {index < timeline.length - 1 ? (
              <ArrowRight
                className="timeline-arrow"
                size={16}
                strokeWidth={1.7}
                aria-hidden="true"
              />
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}

const roiMetrics = [
  { value: 12, prefix: "~", label: "Analistas p/ DCPOA", icon: Gauge },
  { value: 34, prefix: "~", label: "Analistas p/ CSN + CSI", icon: Users },
  { value: 46, prefix: "~", label: "Total necessário", icon: BarChart3 },
  { value: 42, prefix: "", label: "Capacidade assumida", icon: Target },
];

function RoiSlide({ detail = false }) {
  return (
    <div
      className={`slide-content roi-slide ${
        detail ? "roi-detail-mode" : "roi-overview-mode"
      }`}
    >
      <header className="roi-heading reveal">
        <div>
          <h2>ROI dos RPAs — DCPOA + CSN/CSI</h2>
          <p>
            Fonte: logs de produção dos robôs · julho/2026 · premissa: 1
            analista = 140 h úteis/mês
          </p>
        </div>
        <div className="roi-heading-mark" aria-hidden="true">
          <BarChart3 size={22} strokeWidth={1.8} />
        </div>
      </header>

      <div className="roi-kpis">
        {roiMetrics.map(({ value, prefix, label, icon: Icon }, index) => (
          <article
            className="roi-kpi reveal"
            style={{ "--delay": `${70 + index * 45}ms` }}
            key={label}
          >
            <Icon size={17} strokeWidth={1.8} aria-hidden="true" />
            <strong>
              {prefix}
              <AnimatedNumber value={value} />
            </strong>
            <span>{label}</span>
          </article>
        ))}
      </div>

      <section
        className="roi-chart reveal"
        style={{ "--delay": "230ms" }}
      >
        <div className="roi-chart-copy">
          <h3>Trabalho dos robôs vs. capacidade de 42 analistas</h3>
          <p>
            Barra = trabalho executado pelos robôs em julho, convertido em
            analistas (140 h/mês). A linha marca a capacidade assumida de 42
            analistas.
          </p>
        </div>
        <div className="roi-plot">
          <div className="roi-axis" aria-hidden="true">
            <span>0</span>
            <span>20</span>
            <span>40</span>
            <span>60</span>
          </div>
          <div
            className="roi-track"
            role="img"
            aria-label="O trabalho dos robôs equivale a 46 analistas, acima da capacidade assumida de 42 analistas."
          >
            <i />
            <i />
            <i />
            <motion.div
              className="roi-bar"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.35, duration: 1.1, ease }}
            >
              <span>~46</span>
            </motion.div>
            <motion.div
              className="capacity-marker"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.4, ease }}
            >
              <span>42 analistas</span>
            </motion.div>
          </div>
          <span className="roi-axis-name">Analistas equivalentes</span>
        </div>
      </section>

      <div className="roi-details">
        <article
          className="roi-detail reveal"
          style={{ "--delay": "300ms" }}
        >
          <h3>1. DCPOA</h3>
          <p className="roi-summary">
            Volume de julho: 6.113 DCPOAs emitidos (9.471 itens) em 5.729
            execuções. 94% dos DCPOAs têm de 1 a 3 itens.
          </p>
          <div className="roi-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Cenário (tempo p/ DCPOA de 1-3 itens)</th>
                  <th>Horas/mês</th>
                  <th>Analistas</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Analista rápido — 10 min</td>
                  <td>1.146 h</td>
                  <td>8,2</td>
                </tr>
                <tr className="highlight-row">
                  <td>Analista médio — 15 min</td>
                  <td>1.624 h</td>
                  <td>11,6</td>
                </tr>
                <tr>
                  <td>Analista lento — 20 min</td>
                  <td>2.102 h</td>
                  <td>15,0</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="roi-assumption">
            DCPOAs de 4-5 itens = 30 min e 6-7+ itens = 40 min em todos os
            cenários.
          </p>
          <p className="roi-answer">
            Resposta direta: <strong>~12 analistas (faixa 8 a 15).</strong>
          </p>
        </article>

        <article
          className="roi-detail reveal"
          style={{ "--delay": "360ms" }}
        >
          <h3>2. CSN / CSI</h3>
          <div className="roi-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Certificado</th>
                  <th>Tempo manual</th>
                  <th>Emitidos em julho</th>
                  <th>Horas/mês</th>
                  <th>Analistas</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>CSN</td>
                  <td>40 min</td>
                  <td>1.258</td>
                  <td>839 h</td>
                  <td>6,0</td>
                </tr>
                <tr>
                  <td>CSI</td>
                  <td>75 min (1h15)</td>
                  <td>3.185</td>
                  <td>3.981 h</td>
                  <td>28,4</td>
                </tr>
                <tr className="total-row">
                  <td>Subtotal</td>
                  <td />
                  <td>4.443</td>
                  <td>4.820 h</td>
                  <td>34,4</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="roi-assumption">
            Contagem por certificado emitido, já sem execuções de teste e sem
            retrabalhos duplicados.
          </p>
          <p className="roi-answer">
            Resposta direta: <strong>~34 analistas.</strong>
          </p>
        </article>

        <article
          className="roi-detail total-detail reveal"
          style={{ "--delay": "420ms" }}
        >
          <h3>3. Total</h3>
          <div className="roi-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Frente</th>
                  <th>Horas/mês</th>
                  <th>Analistas equivalentes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>DCPOA (cenário médio)</td>
                  <td>1.624 h</td>
                  <td>11,6</td>
                </tr>
                <tr>
                  <td>CSN + CSI</td>
                  <td>4.820 h</td>
                  <td>34,4</td>
                </tr>
                <tr className="total-row">
                  <td>Total</td>
                  <td>6.444 h</td>
                  <td>46,0</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="roi-conclusion">
            <h4>Conclusão com 42 analistas</h4>
            <p>
              O trabalho que os robôs fizeram em julho equivale a ~46 analistas
              — 110% da capacidade dos 42 analistas assumidos para esse
              trabalho.
            </p>
            <p>
              Mesmo no cenário mais otimista (analistas rápidos no DCPOA), o
              total é de 42,6 analistas: ou seja, os RPAs cobrem hoje a operação
              inteira dos 42 analistas, com folga no cenário médio.
            </p>
          </div>
        </article>
      </div>

      <p className="roi-period reveal" style={{ "--delay": "480ms" }}>
        Período do log: 01/07/2026 a 31/07/2026 · DCPOA por execução real do
        robô · CSN/CSI por certificado emitido (sem testes e duplicados).
      </p>
    </div>
  );
}

function App() {
  const [active, setActive] = useState(getSlideFromHash);
  const [direction, setDirection] = useState(1);
  const [selectedPerson, setSelectedPerson] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(Boolean(document.fullscreenElement));
  const [showSplash, setShowSplash] = useState(
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
      () => setShowSplash(false),
      reducedMotion ? 240 : 1850,
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

  const slides = [
    <IntroSlide />,
    <NumbersSlide />,
    <TeamSlide
      selectedPerson={selectedPerson}
      setSelectedPerson={setSelectedPerson}
    />,
    <PlanSlide />,
    <RoiSlide />,
    <RoiSlide detail />,
  ];

  return (
    <div
      className="app-shell"
      ref={shellRef}
      onPointerMove={handlePointerMove}
    >
      <AmbientBackground />

      <header className="topbar">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span>
            Hiperautomação <em>·</em> Apresentação à diretoria
          </span>
        </div>

        <nav className="tabs" aria-label="Seções">
          {SLIDES.map((slide, index) => (
            <button
              type="button"
              className={index === active ? "active" : ""}
              onClick={() => goTo(index)}
              aria-current={index === active ? "page" : undefined}
              key={slide.hash}
            >
              {index === active ? (
                <motion.span
                  className="active-pill"
                  layoutId="active-slide-pill"
                  transition={{ type: "spring", stiffness: 420, damping: 36 }}
                />
              ) : null}
              <span>{slide.label}</span>
            </button>
          ))}
        </nav>

        <button
          type="button"
          className="icon-button fullscreen-button"
          onClick={toggleFullscreen}
          aria-label={
            isFullscreen ? "Sair da tela cheia" : "Entrar em tela cheia"
          }
        >
          {isFullscreen ? (
            <Minimize2 size={18} strokeWidth={1.8} />
          ) : (
            <Maximize2 size={18} strokeWidth={1.8} />
          )}
        </button>
      </header>

      <main
        className="stage"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        {!reducedMotion ? (
          <motion.div
            className="slide-flare"
            key={`flare-${SLIDES[active].hash}`}
            initial={{ x: "-140%", opacity: 0 }}
            animate={{ x: "340%", opacity: [0, 0.42, 0] }}
            transition={{ duration: 1.05, ease }}
            aria-hidden="true"
          />
        ) : null}
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.section
            className="slide-frame"
            key={SLIDES[active].hash}
            custom={direction}
            variants={slideVariants}
            initial={reducedMotion ? false : "enter"}
            animate="center"
            exit={reducedMotion ? undefined : "exit"}
            transition={{ duration: reducedMotion ? 0 : 0.66, ease }}
          >
            {slides[active]}
          </motion.section>
        </AnimatePresence>
      </main>

      <footer className="footer">
        <span>Uso interno · CoE de Hiperautomação · Horizonte 12 meses</span>
        <div className="progress" aria-hidden="true">
          {SLIDES.map((slide, index) => (
            <i
              className={index <= active ? "active" : ""}
              key={slide.hash}
            />
          ))}
        </div>
        <div className="footer-navigation">
          <span>← → para navegar</span>
          <button
            type="button"
            className="icon-button"
            onClick={() => goTo(active - 1)}
            disabled={active === 0}
            aria-label="Slide anterior"
          >
            <ArrowLeft size={17} strokeWidth={1.8} />
          </button>
          <button
            type="button"
            className="icon-button"
            onClick={() => goTo(active + 1)}
            disabled={active === SLIDES.length - 1}
            aria-label="Próximo slide"
          >
            <ArrowRight size={17} strokeWidth={1.8} />
          </button>
        </div>
      </footer>
      <PresentationSplash visible={showSplash} />
    </div>
  );
}

export default App;
