import { ChevronLeft, Clock, BarChart3, BookOpen, Play, Lock } from 'lucide-react';
import type { CourseData } from './CaixaEducaPage';

interface CourseDetailPageProps {
  course: CourseData;
  onBack: () => void;
}

export default function CourseDetailPage({ course, onBack }: CourseDetailPageProps) {
  const levelColor = {
    Iniciante: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    Intermediário: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    Avançado: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#001a33] via-navy to-[#001a33] font-inter animate-fade-in">
      {/* Hero */}
      <div className="relative w-full aspect-[21/9] sm:aspect-[3/1] overflow-hidden">
        <img
          src={course.coverImage}
          alt={course.title}
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001a33] via-[#003366]/60 to-[#001a33]/20" />
        <div className="absolute inset-0 backdrop-blur-[1px]" />

        <button
          onClick={onBack}
          className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-2 rounded-xl bg-black/40 backdrop-blur-md text-white/80 hover:text-white text-sm transition-colors border border-white/10"
        >
          <ChevronLeft className="w-4 h-4" />
          Voltar
        </button>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 -mt-16 relative z-10 pb-12">
        {/* Title area */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${levelColor[course.level]}`}>
              {course.level}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-white/5 text-white/60 border border-white/10">
              <Clock className="w-3 h-3" />
              {course.duration}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-white/5 text-white/60 border border-white/10">
              <BookOpen className="w-3 h-3" />
              {course.totalLessons} aulas
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight mb-3">
            {course.title}
          </h1>
          <p className="text-sm sm:text-base text-white/60 leading-relaxed max-w-xl">
            {course.description}
          </p>
        </div>

        {/* Progress bar */}
        {course.progress > 0 && (
          <div className="mb-8 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-white/60">{course.completedLessons} de {course.totalLessons} aulas concluídas</span>
              <span className="font-semibold text-accent">{course.progress}%</span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${course.progress}%` }} />
            </div>
          </div>
        )}

        {/* CTA */}
        <button
          onClick={() => { window.location.hash = '/player'; }}
          className="w-full sm:w-auto mb-10 flex items-center justify-center gap-2 px-8 py-3.5 bg-accent text-navy rounded-xl font-bold text-sm hover:brightness-110 transition-all active:scale-[0.98] shadow-lg shadow-accent/20"
        >
          <Play className="w-4 h-4" />
          {course.progress > 0 ? 'Continuar Curso' : 'Começar Agora'}
        </button>

        {/* Lessons list */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-accent" />
            Conteúdo do Curso
          </h2>

          <div className="space-y-2">
            {course.lessons.map((lesson, index) => {
              const isCompleted = index < course.completedLessons;
              const isCurrent = index === course.completedLessons;
              const isLocked = index > course.completedLessons;

              return (
                <div
                  key={lesson.id}
                  className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                    isCurrent
                      ? 'bg-accent/[0.08] border-accent/20'
                      : isCompleted
                      ? 'bg-white/[0.02] border-white/[0.06] opacity-70'
                      : 'bg-white/[0.02] border-white/[0.06] opacity-40'
                  }`}
                >
                  {/* Number / Icon */}
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                      isCompleted
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : isCurrent
                        ? 'bg-accent/20 text-accent'
                        : 'bg-white/5 text-white/30'
                    }`}
                  >
                    {isLocked ? (
                      <Lock className="w-3.5 h-3.5" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${isCurrent ? 'text-white' : 'text-white/70'}`}>
                      {lesson.title}
                    </p>
                  </div>

                  {/* Duration */}
                  <span className="text-xs text-white/40 flex-shrink-0">{lesson.duration}</span>

                  {/* Play */}
                  {!isLocked && (
                    <button
                      onClick={() => { window.location.hash = '/player'; }}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${
                        isCurrent
                          ? 'bg-accent text-navy hover:brightness-110'
                          : 'bg-white/5 text-white/50 hover:bg-white/10'
                      }`}
                    >
                      <Play className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
