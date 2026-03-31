import { Clock, BookOpen, CheckCircle2, Activity, TrendingUp, Calendar, Target, Medal, Star, Award, Download, Zap, Flame } from 'lucide-react';
import { useState, useEffect } from 'react';

/* ─────────────────────────────────────────────
   Radar / Spider chart helpers
───────────────────────────────────────────── */
const RADAR_CX = 150;
const RADAR_CY = 150;
const RADAR_MAX_R = 105;

function radarPoint(angle: number, r: number) {
  const rad = (angle * Math.PI) / 180;
  return { x: RADAR_CX + r * Math.cos(rad), y: RADAR_CY + r * Math.sin(rad) };
}

function pointsStr(pts: { x: number; y: number }[]) {
  return pts.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ');
}

/* ─────────────────────────────────────────────
   Donut ring component
───────────────────────────────────────────── */
function DonutRing({
  score,
  r = 52,
  stroke = '#F2C94C',
  trackColor = 'rgba(255,255,255,0.06)',
  size = 140,
}: {
  score: number;
  r?: number;
  stroke?: string;
  trackColor?: string;
  size?: number;
}) {
  const [animated, setAnimated] = useState(0);
  const circumference = 2 * Math.PI * r;
  const dash = (animated / 100) * circumference;
  const cx = size / 2;
  const cy = size / 2;

  useEffect(() => {
    const t = setTimeout(() => setAnimated(score), 200);
    return () => clearTimeout(t);
  }, [score]);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={trackColor} strokeWidth="10" />
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={stroke}
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={`${dash} ${circumference}`}
        transform={`rotate(-90 ${cx} ${cy})`}
        style={{ transition: 'stroke-dasharray 1.2s cubic-bezier(0.34,1.56,0.64,1)' }}
      />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Mini progress ring (goals)
───────────────────────────────────────────── */
function MiniRing({ pct, color }: { pct: number; color: string }) {
  const [animated, setAnimated] = useState(0);
  const r = 16;
  const c = 2 * Math.PI * r;
  const dash = (animated / 100) * c;

  useEffect(() => {
    const t = setTimeout(() => setAnimated(Math.min(pct, 100)), 400);
    return () => clearTimeout(t);
  }, [pct]);

  return (
    <svg width="40" height="40" viewBox="0 0 40 40">
      <circle cx="20" cy="20" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
      <circle
        cx="20"
        cy="20"
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={`${dash} ${c}`}
        transform="rotate(-90 20 20)"
        style={{ transition: 'stroke-dasharray 1s ease' }}
      />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Pentagon radar chart
───────────────────────────────────────────── */
function RadarChart({ categories }: { categories: { label: string; score: number; angle: number }[] }) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 300);
    return () => clearTimeout(t);
  }, []);

  const rings = [0.25, 0.5, 0.75, 1.0];
  const gridPolygons = rings.map((ratio) =>
    categories.map((c) => radarPoint(c.angle, RADAR_MAX_R * ratio))
  );
  const dataPoints = categories.map((c) =>
    radarPoint(c.angle, animated ? (c.score / 100) * RADAR_MAX_R : 0)
  );
  const labelPoints = categories.map((c) => ({
    ...radarPoint(c.angle, RADAR_MAX_R + 24),
    label: c.label,
    score: c.score,
  }));

  return (
    <svg viewBox="0 0 300 300" className="w-full max-w-[280px] mx-auto">
      <defs>
        <linearGradient id="radarFill" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F2C94C" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#003366" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {gridPolygons.map((pts, i) => (
        <polygon key={i} points={pointsStr(pts)} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      ))}

      {categories.map((c) => {
        const outer = radarPoint(c.angle, RADAR_MAX_R);
        return (
          <line key={c.label} x1={RADAR_CX} y1={RADAR_CY} x2={outer.x} y2={outer.y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        );
      })}

      <polygon
        points={pointsStr(dataPoints)}
        fill="url(#radarFill)"
        stroke="#F2C94C"
        strokeWidth="1.5"
        strokeLinejoin="round"
        style={{ transition: 'all 1.2s cubic-bezier(0.34,1.56,0.64,1)' }}
      />

      {dataPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="4" fill="#F2C94C" stroke="#001a33" strokeWidth="2"
          style={{ transition: 'all 1.2s cubic-bezier(0.34,1.56,0.64,1)' }} />
      ))}

      {labelPoints.map((p, i) => (
        <g key={i}>
          <text
            x={p.x} y={p.y - 4}
            textAnchor={p.x < RADAR_CX - 8 ? 'end' : p.x > RADAR_CX + 8 ? 'start' : 'middle'}
            fontSize="10" fill="rgba(255,255,255,0.45)"
          >
            {p.label}
          </text>
          <text
            x={p.x} y={p.y + 10}
            textAnchor={p.x < RADAR_CX - 8 ? 'end' : p.x > RADAR_CX + 8 ? 'start' : 'middle'}
            fontSize="11" fontWeight="700" fill="#F2C94C"
          >
            {p.score}%
          </text>
        </g>
      ))}
    </svg>
  );
}

/* ─────────────────────────────────────────────
   SVG gradient bar chart
───────────────────────────────────────────── */
function BarChart({ data }: { data: { day: string; hours: number; isToday?: boolean }[] }) {
  const [animated, setAnimated] = useState(false);
  const maxH = Math.max(...data.map((d) => d.hours));
  const chartH = 120;
  const barW = 30;
  const gap = 12;
  const leftPad = 32;
  const svgW = leftPad + data.length * (barW + gap) - gap + 4;
  const svgH = chartH + 36;

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 150);
    return () => clearTimeout(t);
  }, []);

  return (
    <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full" style={{ overflow: 'visible' }}>
      <defs>
        {data.map((d, i) => (
          <linearGradient key={i} id={`bg${i}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={d.isToday ? '#F2C94C' : '#005599'} stopOpacity="0.9" />
            <stop offset="100%" stopColor={d.isToday ? '#F2C94C' : '#003366'} stopOpacity="0.15" />
          </linearGradient>
        ))}
      </defs>

      {[0, 1, 2, 3, 4].map((v) => {
        const y = chartH - (v / 4) * chartH;
        return (
          <g key={v}>
            <line x1={leftPad} y1={y} x2={svgW} y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="3 4" />
            <text x={leftPad - 4} y={y + 3.5} textAnchor="end" fontSize="9" fill="rgba(255,255,255,0.25)">{v}h</text>
          </g>
        );
      })}

      {data.map((d, i) => {
        const barH = animated ? Math.max((d.hours / maxH) * chartH, 4) : 4;
        const x = leftPad + i * (barW + gap);
        const y = chartH - barH;
        return (
          <g key={i}>
            <rect x={x} y={y} width={barW} height={barH} rx="5" fill={`url(#bg${i})`}
              style={{ transition: `height 0.9s cubic-bezier(0.34,1.56,0.64,1) ${i * 55}ms, y 0.9s cubic-bezier(0.34,1.56,0.64,1) ${i * 55}ms` }} />
            {d.isToday && (
              <rect x={x - 1} y={y - 1} width={barW + 2} height={barH + 2} rx="6" fill="none"
                stroke="#F2C94C" strokeWidth="1" strokeOpacity="0.35" />
            )}
            {animated && (
              <text x={x + barW / 2} y={y - 5} textAnchor="middle" fontSize="9"
                fill={d.isToday ? '#F2C94C' : 'rgba(255,255,255,0.35)'}
                fontWeight={d.isToday ? '700' : '400'}>
                {d.hours}h
              </text>
            )}
            <text x={x + barW / 2} y={chartH + 16} textAnchor="middle" fontSize="10"
              fill={d.isToday ? '#F2C94C' : 'rgba(255,255,255,0.4)'}
              fontWeight={d.isToday ? '700' : '400'}>
              {d.day}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ─────────────────────────────────────────────
   SVG area / line chart
───────────────────────────────────────────── */
function AreaChart({ data }: { data: { month: string; value: number }[] }) {
  const [animated, setAnimated] = useState(false);
  const W = 320, H = 90;
  const maxV = Math.max(...data.map((d) => d.value));
  const minV = Math.min(...data.map((d) => d.value));
  const range = maxV - minV || 1;
  const pad = 10;

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 400);
    return () => clearTimeout(t);
  }, []);

  const pts = data.map((d, i) => ({
    x: pad + (i / (data.length - 1)) * (W - pad * 2),
    y: animated ? H - pad - ((d.value - minV) / range) * (H - pad * 2) : H - pad,
    value: d.value,
  }));

  const pathD = `M ${pts[0].x} ${pts[0].y} ` + pts.slice(1).map((p) => `L ${p.x} ${p.y}`).join(' ');
  const areaD = `M ${pts[0].x} ${H} L ${pts[0].x} ${pts[0].y} ` +
    pts.slice(1).map((p) => `L ${p.x} ${p.y}`).join(' ') +
    ` L ${pts[pts.length - 1].x} ${H} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H + 18}`} className="w-full">
      <defs>
        <linearGradient id="areaG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F2C94C" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#F2C94C" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill="url(#areaG)" style={{ transition: 'all 1s ease' }} />
      <path d={pathD} fill="none" stroke="#F2C94C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        style={{ transition: 'all 1s ease' }} />
      {pts.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="3.5" fill="#F2C94C" stroke="#001a33" strokeWidth="2"
            style={{ transition: `all 1s ease ${i * 80}ms` }} />
          <text x={p.x} y={H + 16} textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.35)">
            {data[i].month}
          </text>
        </g>
      ))}
    </svg>
  );
}

interface Certificate {
  id: string;
  courseTitle: string;
  courseDuration: string;
  completedDate: string;
  grade: number;
  coverImage: string;
}

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'certificates'>('overview');

  const stats = [
    { label: 'Horas Estudadas', value: '24.5h', change: '+5.2h esta semana', icon: Clock, color: '#F2C94C' },
    { label: 'Cursos Ativos', value: '2', change: '35% conclusão média', icon: BookOpen, color: '#8B5CF6' },
    { label: 'Aulas Concluídas', value: '19', change: '+4 esta semana', icon: CheckCircle2, color: '#10B981' },
    { label: 'Sequência', value: '7 dias', change: 'Recorde: 12 dias', icon: Flame, color: '#F97316' },
  ];

  const weeklyActivity = [
    { day: 'Seg', hours: 2.5 },
    { day: 'Ter', hours: 3.0 },
    { day: 'Qua', hours: 1.5 },
    { day: 'Qui', hours: 4.0 },
    { day: 'Sex', hours: 2.0 },
    { day: 'Sáb', hours: 3.5, isToday: true },
    { day: 'Dom', hours: 1.0 },
  ];

  const monthlyProgress = [
    { month: 'Out', value: 12 },
    { month: 'Nov', value: 18 },
    { month: 'Dez', value: 14 },
    { month: 'Jan', value: 22 },
    { month: 'Fev', value: 20 },
    { month: 'Mar', value: 24.5 },
  ];

  const radarCategories = [
    { label: 'Orçamento', score: 85, angle: -90 },
    { label: 'Poupança', score: 90, angle: -18 },
    { label: 'Planejamento', score: 75, angle: 54 },
    { label: 'Investimentos', score: 70, angle: 126 },
    { label: 'Dívidas', score: 60, angle: 198 },
  ];

  const overallScore = Math.round(
    radarCategories.reduce((s, c) => s + c.score, 0) / radarCategories.length
  );

  const goals = [
    { label: 'Concluir 3 cursos', current: 1, total: 3, color: '#8B5CF6' },
    { label: '20h de estudo', current: 24.5, total: 20, color: '#10B981' },
    { label: 'Sequência de 7 dias', current: 7, total: 7, color: '#F97316' },
    { label: 'Quitar 1 dívida', current: 0, total: 1, color: '#F2C94C' },
  ];

  const certificates: Certificate[] = [
    {
      id: '1',
      courseTitle: 'Educação Financeira',
      courseDuration: '8h',
      completedDate: '15 de Janeiro, 2024',
      grade: 95,
      coverImage: 'https://s3.iatom.site/atom/Financas.webp',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      {/* Sub-tabs */}
      <div className="flex gap-1 mb-8 p-1 rounded-xl bg-white/[0.03] border border-white/[0.06] w-fit">
        {(['overview', 'certificates'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab
                ? 'bg-white/10 text-white shadow-sm'
                : 'text-white/40 hover:text-white/70'
            }`}
          >
            {tab === 'overview' ? 'Visão Geral' : 'Certificados'}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-5 animate-fade-in">

          {/* Hero row: Score donut + stat cards */}
          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-5">
            {/* Overall score donut */}
            <div className="rounded-2xl p-6 bg-white/[0.03] border border-white/[0.06] flex flex-col items-center justify-center min-w-[200px]">
              <div className="relative">
                <DonutRing score={overallScore} r={52} size={140} />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-white leading-none">{overallScore}</span>
                  <span className="text-[11px] text-white/40 mt-0.5">de 100</span>
                </div>
              </div>
              <div className="text-white/70 text-sm font-medium mt-3">Saúde Financeira</div>
              <div className="flex items-center gap-1.5 text-emerald-400 text-xs mt-1.5">
                <TrendingUp className="w-3.5 h-3.5" />
                +8 pts este mês
              </div>
            </div>

            {/* Stat cards 2×2 */}
            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="rounded-xl p-4 bg-white/[0.03] border border-white/[0.06] animate-slide-up"
                    style={{ animationDelay: `${i * 70}ms` }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${stat.color}18` }}
                      >
                        <Icon className="w-4 h-4" style={{ color: stat.color }} />
                      </div>
                    </div>
                    <div className="text-xl font-bold text-white leading-none mb-0.5">{stat.value}</div>
                    <div className="text-[11px] text-white/40 mb-2">{stat.label}</div>
                    <div className="flex items-center gap-1 text-[10px] text-emerald-400">
                      <TrendingUp className="w-3 h-3" />
                      {stat.change}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Charts row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Weekly bar chart */}
            <div className="rounded-2xl p-5 bg-white/[0.03] border border-white/[0.06]">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#F2C94C]" />
                  Atividade Semanal
                </h2>
                <span className="text-xs text-white/30 tabular-nums">17.5h esta semana</span>
              </div>
              <BarChart data={weeklyActivity} />
            </div>

            {/* Radar chart */}
            <div className="rounded-2xl p-5 bg-white/[0.03] border border-white/[0.06]">
              <h2 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#F2C94C]" />
                Desempenho por Área
              </h2>
              <RadarChart categories={radarCategories} />
            </div>
          </div>

          {/* Monthly progress area chart */}
          <div className="rounded-2xl p-5 bg-white/[0.03] border border-white/[0.06]">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#F2C94C]" />
                Progresso Mensal — Horas de Estudo
              </h2>
              <span className="text-xs text-white/30">últimos 6 meses</span>
            </div>
            <AreaChart data={monthlyProgress} />
          </div>

          {/* Goals + Achievements */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Goals with mini rings */}
            <div className="rounded-2xl p-5 bg-white/[0.03] border border-white/[0.06]">
              <h2 className="text-sm font-semibold text-white mb-5 flex items-center gap-2">
                <Target className="w-4 h-4 text-[#F2C94C]" />
                Metas do Mês
              </h2>
              <div className="space-y-3">
                {goals.map((goal) => {
                  const pct = Math.min((goal.current / goal.total) * 100, 100);
                  const done = pct >= 100;
                  return (
                    <div key={goal.label} className="flex items-center gap-3">
                      <div className="relative flex-shrink-0">
                        <MiniRing pct={pct} color={done ? '#10B981' : goal.color} />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-[9px] font-bold" style={{ color: done ? '#10B981' : goal.color }}>
                            {Math.round(pct)}%
                          </span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-white/70 truncate">{goal.label}</span>
                          <span className="text-xs font-semibold ml-2 flex-shrink-0" style={{ color: done ? '#10B981' : goal.color }}>
                            {goal.current}/{goal.total}
                          </span>
                        </div>
                        <div className="mt-1.5 h-1 bg-white/[0.06] rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-700"
                            style={{ width: `${pct}%`, backgroundColor: done ? '#10B981' : goal.color }} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Achievements */}
            <div className="rounded-2xl p-5 bg-white/[0.03] border border-white/[0.06]">
              <h2 className="text-sm font-semibold text-white mb-5 flex items-center gap-2">
                <Medal className="w-4 h-4 text-[#F2C94C]" />
                Conquistas
              </h2>
              <div className="space-y-2.5">
                {[
                  { icon: Star, title: 'Primeira Conquista', desc: 'Completou o primeiro curso', gradient: 'from-yellow-400 to-orange-500', unlocked: true },
                  { icon: Flame, title: 'Maratonista', desc: '7 dias consecutivos', gradient: 'from-orange-400 to-red-500', unlocked: true },
                  { icon: Activity, title: 'Investidor Iniciante', desc: 'Completou módulo de Investimentos', gradient: 'from-purple-400 to-purple-600', unlocked: true },
                  { icon: Medal, title: 'Mestre Financeiro', desc: 'Complete 5 cursos para desbloquear', gradient: 'from-gray-600 to-gray-700', unlocked: false },
                ].map((a) => {
                  const Icon = a.icon;
                  return (
                    <div key={a.title} className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                      a.unlocked ? 'bg-white/[0.04] border border-white/[0.07]' : 'bg-white/[0.02] border border-white/[0.04] opacity-40'
                    }`}>
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${a.gradient} flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-5 h-5 text-white" fill={a.unlocked ? 'currentColor' : 'none'} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium text-white leading-tight">{a.title}</div>
                        <div className="text-[11px] text-white/40">{a.desc}</div>
                      </div>
                      {a.unlocked && (
                        <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'certificates' && (
        <div className="space-y-4 animate-fade-in">
          {certificates.map((cert) => (
            <div key={cert.id} className="flex flex-col sm:flex-row rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.06]">
              <div className="relative w-full sm:w-52 h-36 sm:h-auto bg-gray-900 flex-shrink-0">
                <img src={cert.coverImage} alt={cert.courseTitle} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#001a33]/60" />
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-500/90 text-white text-[11px] font-semibold">
                  <CheckCircle2 className="w-3 h-3" />
                  Concluído
                </div>
              </div>

              <div className="flex-1 p-5">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-base font-semibold text-white mb-2">{cert.courseTitle}</h3>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-white/40">
                      <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{cert.completedDate}</div>
                      <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{cert.courseDuration}</div>
                    </div>
                  </div>
                  <div className="relative flex-shrink-0">
                    <DonutRing score={cert.grade} r={22} size={60} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold text-[#F2C94C] leading-none">{cert.grade}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <button className="flex items-center gap-2 px-4 py-2.5 bg-[#F2C94C] text-[#003366] rounded-xl font-semibold text-sm hover:brightness-110 transition-all">
                    <Download className="w-4 h-4" />
                    Baixar PDF
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2.5 bg-white/5 text-white/70 rounded-xl font-medium text-sm hover:bg-white/10 transition-all border border-white/[0.06]">
                    <Award className="w-4 h-4" />
                    Compartilhar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
