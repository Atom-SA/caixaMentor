import { Brain, CheckCircle2, Lock, Play, Clock, Zap, ChevronRight } from 'lucide-react';

interface AILesson {
  id: string;
  title: string;
  courseTitle: string;
  duration: string;
  status: 'completed' | 'current' | 'next' | 'locked';
  aiReason: string;
  order: number;
}

const aiLearningPath: AILesson[] = [
  {
    id: '1',
    title: 'Entendendo seu Fluxo de Caixa',
    courseTitle: 'Educação Financeira',
    duration: '15 min',
    status: 'completed',
    aiReason: 'Base essencial identificada no seu perfil',
    order: 1,
  },
  {
    id: '2',
    title: 'Criando seu Primeiro Orçamento',
    courseTitle: 'Educação Financeira',
    duration: '20 min',
    status: 'completed',
    aiReason: 'Continuidade natural após fluxo de caixa',
    order: 2,
  },
  {
    id: '3',
    title: 'Identificando Gastos Desnecessários',
    courseTitle: 'Saia do Vermelho',
    duration: '18 min',
    status: 'current',
    aiReason: 'Seu diagnóstico indica necessidade de controle',
    order: 3,
  },
  {
    id: '4',
    title: 'Técnicas de Economia no Dia a Dia',
    courseTitle: 'Saia do Vermelho',
    duration: '22 min',
    status: 'next',
    aiReason: 'Complementa seu aprendizado de controle',
    order: 4,
  },
  {
    id: '5',
    title: 'Planejando sua Reserva de Emergência',
    courseTitle: 'Educação Financeira',
    duration: '25 min',
    status: 'locked',
    aiReason: 'Próximo passo após dominar economia',
    order: 5,
  },
];

export default function TrilhaPage() {
  const completed = aiLearningPath.filter((l) => l.status === 'completed').length;
  const total = aiLearningPath.length;
  const progressPercent = Math.round((completed / total) * 100);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
            <Brain className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Sua Trilha Personalizada
            </h1>
            <p className="text-sm text-white/50">Montada por IA com base no seu diagnóstico</p>
          </div>
        </div>
      </div>

      {/* Progress card */}
      <div className="mb-8 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-accent" />
            <span className="text-sm text-white/70">{completed} de {total} aulas concluídas</span>
          </div>
          <span className="text-sm font-bold text-accent">{progressPercent}%</span>
        </div>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-accent to-amber-400 rounded-full transition-all duration-700"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Lessons */}
      <div className="space-y-3">
        {aiLearningPath.map((lesson, index) => {
          const isCompleted = lesson.status === 'completed';
          const isCurrent = lesson.status === 'current';
          const isNext = lesson.status === 'next';
          const isLocked = lesson.status === 'locked';

          return (
            <div
              key={lesson.id}
              className={`relative transition-all duration-300 ${isLocked ? 'opacity-40' : ''}`}
            >
              <div
                className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                  isCurrent
                    ? 'bg-accent/[0.08] border-accent/20'
                    : isCompleted
                    ? 'bg-white/[0.02] border-white/[0.06]'
                    : 'bg-white/[0.02] border-white/[0.06]'
                }`}
              >
                {/* Step indicator */}
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                    isCompleted
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : isCurrent
                      ? 'bg-accent text-navy'
                      : isNext
                      ? 'bg-sky-500/20 text-sky-400'
                      : 'bg-white/5 text-white/30'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : isLocked ? (
                    <Lock className="w-4 h-4" />
                  ) : (
                    <span>{lesson.order}</span>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className={`text-sm font-semibold truncate ${isCurrent ? 'text-white' : 'text-white/80'}`}>
                      {lesson.title}
                    </h3>
                    {isCurrent && (
                      <span className="flex-shrink-0 px-2 py-0.5 bg-accent text-navy text-[10px] font-bold rounded-md">
                        ATUAL
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-white/40">
                    <span>{lesson.courseTitle}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {lesson.duration}
                    </span>
                  </div>
                  <p className="text-xs text-white/30 mt-1 flex items-center gap-1">
                    <Brain className="w-3 h-3" />
                    {lesson.aiReason}
                  </p>
                </div>

                {/* Action */}
                {!isLocked && (
                  <button
                    onClick={() => { window.location.hash = '/player'; }}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                      isCurrent
                        ? 'bg-accent text-navy hover:brightness-110'
                        : isCompleted
                        ? 'bg-white/5 text-white/40 hover:bg-white/10'
                        : 'bg-white/5 text-white/40 hover:bg-white/10'
                    }`}
                  >
                    {isCompleted ? (
                      <ChevronRight className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                  </button>
                )}
              </div>

              {/* Connector line */}
              {index < aiLearningPath.length - 1 && (
                <div className="ml-[1.15rem] w-px h-3 bg-white/[0.06]" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
