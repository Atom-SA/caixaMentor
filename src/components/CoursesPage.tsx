import React, { useState } from 'react';
import { BookOpen, TrendingUp, Brain, Bell, CheckCircle2, Lock, Play, Clock, Award, Users, ArrowRight, Sparkles } from 'lucide-react';
import Logo from './Logo';
import BackButton from './BackButton';

interface CoursesPageProps {
  onBack: () => void;
  canGoBack?: boolean;
}

interface Course {
  id: string;
  title: string;
  description: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  duration: string;
  level: 'Iniciante' | 'Intermediário' | 'Avançado';
  category: string;
  icon: any;
  color: string;
  locked: boolean;
  aiSuggested?: boolean;
}

interface Notification {
  id: string;
  type: 'ai-suggestion' | 'achievement' | 'reminder';
  title: string;
  message: string;
  time: string;
  icon: any;
}

export default function CoursesPage({ onBack, canGoBack }: CoursesPageProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'in-progress' | 'completed'>('all');
  const [showNotifications, setShowNotifications] = useState(false);

  const courses: Course[] = [
    {
      id: '1',
      title: 'Fundamentos do Planejamento Financeiro',
      description: 'Aprenda a estruturar suas finanças do zero com metodologias comprovadas',
      progress: 35,
      totalLessons: 12,
      completedLessons: 4,
      duration: '4h 30min',
      level: 'Iniciante',
      category: 'Fundamentos',
      icon: BookOpen,
      color: '#F2C94C',
      locked: false,
      aiSuggested: true,
    },
    {
      id: '2',
      title: 'Gestão de Orçamento Pessoal',
      description: 'Domine técnicas avançadas de controle e otimização de gastos',
      progress: 0,
      totalLessons: 15,
      completedLessons: 0,
      duration: '5h 20min',
      level: 'Intermediário',
      category: 'Controle',
      icon: TrendingUp,
      color: '#6C63FF',
      locked: false,
      aiSuggested: true,
    },
    {
      id: '3',
      title: 'Investimentos Inteligentes',
      description: 'Estratégias de investimento baseadas no seu perfil financeiro',
      progress: 0,
      totalLessons: 20,
      completedLessons: 0,
      duration: '8h 15min',
      level: 'Intermediário',
      category: 'Investimentos',
      icon: Award,
      color: '#27AE60',
      locked: true,
    },
    {
      id: '4',
      title: 'Planejamento de Aposentadoria',
      description: 'Construa sua segurança financeira de longo prazo',
      progress: 0,
      totalLessons: 18,
      completedLessons: 0,
      duration: '6h 45min',
      level: 'Avançado',
      category: 'Planejamento',
      icon: Users,
      color: '#E67E22',
      locked: true,
    },
  ];

  const notifications: Notification[] = [
    {
      id: '1',
      type: 'ai-suggestion',
      title: 'Nova Recomendação de IA',
      message: 'Com base no seu perfil, recomendamos começar pelo curso "Fundamentos do Planejamento Financeiro"',
      time: 'Agora',
      icon: Brain,
    },
    {
      id: '2',
      type: 'reminder',
      title: 'Continue de onde parou',
      message: 'Você está progredindo bem! Continue a Aula 5 para manter o ritmo.',
      time: '2h atrás',
      icon: Clock,
    },
    {
      id: '3',
      type: 'achievement',
      title: 'Conquista Desbloqueada!',
      message: 'Você completou 4 aulas consecutivas. Continue assim!',
      time: '1 dia atrás',
      icon: Award,
    },
  ];

  const filteredCourses = courses.filter(course => {
    if (activeTab === 'in-progress') return course.progress > 0 && course.progress < 100;
    if (activeTab === 'completed') return course.progress === 100;
    return true;
  });

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'ai-suggestion': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'achievement': return 'bg-[#F2C94C]/20 text-[#F2C94C] border-[#F2C94C]/30';
      case 'reminder': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      default: return 'bg-white/10 text-white/80 border-white/20';
    }
  };

  return (
    <div className="min-h-screen bg-[#003366] font-inter">
      <BackButton onClick={() => onBack?.()} show={!!canGoBack} lightMode />

      <div className="fixed top-0 left-0 right-0 bg-[#003366] z-40 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Logo invert height="h-5" brightness="10" />

          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Bell className="w-6 h-6 text-white" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#F2C94C] rounded-full animate-pulse" />
          </button>
        </div>
      </div>

      {showNotifications && (
        <div className="fixed top-16 right-4 sm:right-6 w-[calc(100%-2rem)] sm:w-96 bg-[#002244] backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl z-50 animate-fade-in">
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#F2C94C]" />
                Notificações
              </h3>
              <button
                onClick={() => setShowNotifications(false)}
                className="text-white/60 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.map(notif => {
              const Icon = notif.icon;
              return (
                <div
                  key={notif.id}
                  className="p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <div className="flex gap-3">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border ${getNotificationColor(notif.type)}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-white mb-1">{notif.title}</h4>
                      <p className="text-xs text-white/70 leading-relaxed">{notif.message}</p>
                      <span className="text-[10px] text-white/50 mt-1 block">{notif.time}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 pt-20 sm:pt-24">
        <div className="mb-8 sm:mb-12 animate-fade-in">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#F2C94C]/20 text-[#F2C94C]">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Cursos Estruturados
            </h1>
          </div>
          <p className="text-base sm:text-lg text-white/80 max-w-2xl">
            Trilhas personalizadas de aprendizado com acompanhamento inteligente de IA
          </p>
        </div>

        <div className="mb-6 sm:mb-8 flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-medium text-sm sm:text-base whitespace-nowrap transition-all ${
              activeTab === 'all'
                ? 'bg-[#F2C94C] text-[#003366] shadow-lg'
                : 'bg-white/10 text-white/70 hover:bg-white/15'
            }`}
          >
            Todos os Cursos
          </button>
          <button
            onClick={() => setActiveTab('in-progress')}
            className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-medium text-sm sm:text-base whitespace-nowrap transition-all ${
              activeTab === 'in-progress'
                ? 'bg-[#F2C94C] text-[#003366] shadow-lg'
                : 'bg-white/10 text-white/70 hover:bg-white/15'
            }`}
          >
            Em Progresso
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-medium text-sm sm:text-base whitespace-nowrap transition-all ${
              activeTab === 'completed'
                ? 'bg-[#F2C94C] text-[#003366] shadow-lg'
                : 'bg-white/10 text-white/70 hover:bg-white/15'
            }`}
          >
            Concluídos
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {filteredCourses.map((course, index) => {
            const Icon = course.icon;
            return (
              <div
                key={course.id}
                className="relative group animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {course.aiSuggested && (
                  <div className="absolute -top-2 -right-2 z-10 flex items-center gap-1.5 px-3 py-1.5 bg-purple-500 text-white rounded-full text-xs font-semibold shadow-lg">
                    <Brain className="w-3.5 h-3.5" />
                    IA Recomenda
                  </div>
                )}

                <div className={`relative bg-white/5 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-5 sm:p-6 border transition-all duration-300 ${
                  course.locked
                    ? 'border-white/10 opacity-75'
                    : 'border-white/20 hover:border-[#F2C94C]/50 hover:shadow-xl hover:shadow-[#F2C94C]/10'
                }`}>
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center shadow-lg"
                      style={{ backgroundColor: `${course.color}20`, border: `1px solid ${course.color}40` }}
                    >
                      <Icon className="w-7 h-7 sm:w-8 sm:h-8" style={{ color: course.color }} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">
                          {course.title}
                        </h3>
                        {course.locked && (
                          <Lock className="w-5 h-5 text-white/40 flex-shrink-0" />
                        )}
                      </div>
                      <span className="inline-block px-2.5 py-1 bg-white/10 text-white/70 rounded-full text-xs font-medium">
                        {course.level}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-white/70 mb-4 leading-relaxed">
                    {course.description}
                  </p>

                  <div className="space-y-3 mb-5">
                    <div className="flex items-center justify-between text-xs text-white/60">
                      <span>{course.completedLessons} de {course.totalLessons} aulas</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${course.progress}%`,
                          backgroundColor: course.color,
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-4 text-xs text-white/60">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {course.duration}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4" />
                        {course.totalLessons} aulas
                      </div>
                    </div>
                  </div>

                  <button
                    disabled={course.locked}
                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                      course.locked
                        ? 'bg-white/5 text-white/40 cursor-not-allowed'
                        : course.progress > 0
                        ? 'bg-white/10 text-white hover:bg-white/15'
                        : 'bg-[#F2C94C] text-[#003366] hover:bg-[#F2C94C]/90 shadow-lg hover:scale-105 active:scale-95'
                    }`}
                  >
                    {course.locked ? (
                      <>
                        <Lock className="w-4 h-4" />
                        Bloqueado
                      </>
                    ) : course.progress > 0 ? (
                      <>
                        <Play className="w-4 h-4" />
                        Continuar
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        Começar Agora
                      </>
                    )}
                  </button>

                  {!course.locked && course.progress === 0 && course.aiSuggested && (
                    <p className="text-center text-xs text-purple-300 mt-3 flex items-center justify-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Perfeito para o seu perfil
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 sm:mt-12 p-6 sm:p-8 bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-purple-500/30 animate-fade-in">
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-purple-500/30 flex items-center justify-center">
              <Brain className="w-6 h-6 sm:w-7 sm:h-7 text-purple-300" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                Acompanhamento Inteligente com IA
              </h3>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                Nossa inteligência artificial analisa seu progresso e recomenda os melhores cursos e trilhas de aprendizado baseados no seu perfil financeiro e objetivos pessoais.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-6">
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
              <CheckCircle2 className="w-5 h-5 text-[#F2C94C] flex-shrink-0" />
              <span className="text-sm text-white/90">Recomendações personalizadas</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
              <CheckCircle2 className="w-5 h-5 text-[#F2C94C] flex-shrink-0" />
              <span className="text-sm text-white/90">Notificações inteligentes</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
              <CheckCircle2 className="w-5 h-5 text-[#F2C94C] flex-shrink-0" />
              <span className="text-sm text-white/90">Progresso monitorado</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
          animation-fill-mode: both;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
