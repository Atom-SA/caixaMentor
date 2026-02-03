import React, { useState } from 'react';
import { BookOpen, TrendingUp, Brain, Bell, CheckCircle2, Lock, Play, Clock, Award, Users, ArrowRight, Sparkles, BarChart3, Zap, ChevronRight, Star, Target } from 'lucide-react';
import Logo from './Logo';
import BackButton from './BackButton';

interface CoursesPageProps {
  onBack: () => void;
  canGoBack?: boolean;
  onNavigateToReports: () => void;
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
  coverImage: string;
}

interface Notification {
  id: string;
  type: 'ai-suggestion' | 'achievement' | 'reminder';
  title: string;
  message: string;
  time: string;
  icon: any;
}

interface AILesson {
  id: string;
  title: string;
  courseTitle: string;
  duration: string;
  status: 'completed' | 'current' | 'next' | 'locked';
  aiReason: string;
  order: number;
}

export default function CoursesPage({ onBack, canGoBack, onNavigateToReports }: CoursesPageProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'in-progress' | 'completed'>('all');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAIPath, setShowAIPath] = useState(false);

  const aiLearningPath: AILesson[] = [
    {
      id: '1',
      title: 'Entendendo seu Fluxo de Caixa',
      courseTitle: 'Fundamentos do Planejamento Financeiro',
      duration: '15 min',
      status: 'completed',
      aiReason: 'Base essencial identificada no seu perfil',
      order: 1,
    },
    {
      id: '2',
      title: 'Criando seu Primeiro Orçamento',
      courseTitle: 'Fundamentos do Planejamento Financeiro',
      duration: '20 min',
      status: 'completed',
      aiReason: 'Continuidade natural após fluxo de caixa',
      order: 2,
    },
    {
      id: '3',
      title: 'Identificando Gastos Desnecessários',
      courseTitle: 'Gestão de Orçamento Pessoal',
      duration: '18 min',
      status: 'current',
      aiReason: 'Seu diagnóstico indica necessidade de controle',
      order: 3,
    },
    {
      id: '4',
      title: 'Técnicas de Economia no Dia a Dia',
      courseTitle: 'Gestão de Orçamento Pessoal',
      duration: '22 min',
      status: 'next',
      aiReason: 'Complementa seu aprendizado de controle',
      order: 4,
    },
    {
      id: '5',
      title: 'Planejando sua Reserva de Emergência',
      courseTitle: 'Fundamentos do Planejamento Financeiro',
      duration: '25 min',
      status: 'locked',
      aiReason: 'Próximo passo após dominar economia',
      order: 5,
    },
  ];

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
      coverImage: 'https://s3.iatom.site/atom/Financas.webp',
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
      coverImage: 'https://s3.iatom.site/atom/Trader.webp',
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
      coverImage: 'https://s3.iatom.site/atom/op%C3%A7oes-inteligentes.jpg',
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

          <div className="flex items-center gap-2">
            <button
              onClick={onNavigateToReports}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#F2C94C] text-[#003366] rounded-lg font-semibold text-sm hover:bg-[#F2C94C]/90 transition-all"
            >
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Relatórios</span>
            </button>

            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <Bell className="w-6 h-6 text-white" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#F2C94C] rounded-full animate-pulse" />
            </button>
          </div>
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

      {showAIPath && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={() => setShowAIPath(false)}>
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-gradient-to-br from-[#003366] to-[#002244] rounded-3xl shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#00D4FF] via-[#F2C94C] to-[#27AE60]" />

            <div className="relative p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setShowAIPath(false)}
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
              >
                ✕
              </button>

              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00D4FF] to-[#0096FF] flex items-center justify-center shadow-lg shadow-[#00D4FF]/30">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                      Sua Trilha 100% Personalizada
                    </h2>
                    <p className="text-white/80 text-base sm:text-lg">
                      A IA monta e escolhe tudo que você deve assistir, aula após aula
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                  <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-[#00D4FF]/20 to-[#0096FF]/20 rounded-xl border border-[#00D4FF]/30">
                    <Zap className="w-5 h-5 text-[#00D4FF] flex-shrink-0" />
                    <span className="text-sm text-white font-medium">Sequência inteligente</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-[#F2C94C]/20 to-[#F2994A]/20 rounded-xl border border-[#F2C94C]/30">
                    <Target className="w-5 h-5 text-[#F2C94C] flex-shrink-0" />
                    <span className="text-sm text-white font-medium">Baseada no seu perfil</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-[#27AE60]/20 to-[#219653]/20 rounded-xl border border-[#27AE60]/30">
                    <Star className="w-5 h-5 text-[#27AE60] flex-shrink-0" />
                    <span className="text-sm text-white font-medium">Atualização contínua</span>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-[#00D4FF]/10 to-[#27AE60]/10 rounded-xl border border-white/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#27AE60] flex items-center justify-center shadow-lg">
                        <BarChart3 className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-base font-bold text-white">Seu Progresso</p>
                        <p className="text-xs text-white/70">2 de 5 aulas concluídas</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-[#F2C94C]">40%</p>
                    </div>
                  </div>
                  <div className="mt-3 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#00D4FF] to-[#27AE60] rounded-full transition-all duration-500" style={{ width: '40%' }} />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {aiLearningPath.map((lesson, index) => {
                  const isCompleted = lesson.status === 'completed';
                  const isCurrent = lesson.status === 'current';
                  const isNext = lesson.status === 'next';
                  const isLocked = lesson.status === 'locked';

                  return (
                    <div
                      key={lesson.id}
                      className={`relative group transition-all duration-300 ${
                        isLocked ? 'opacity-60' : 'hover:scale-[1.01]'
                      }`}
                    >
                      <div
                        className={`relative p-5 rounded-2xl border transition-all duration-300 ${
                          isCurrent
                            ? 'bg-gradient-to-r from-[#F2C94C]/20 to-[#00D4FF]/20 border-[#F2C94C] shadow-lg shadow-[#F2C94C]/20'
                            : isCompleted
                            ? 'bg-gradient-to-r from-[#27AE60]/10 to-[#219653]/10 border-[#27AE60]/30'
                            : isNext
                            ? 'bg-gradient-to-r from-[#00D4FF]/10 to-[#0096FF]/10 border-[#00D4FF]/30'
                            : 'bg-white/5 border-white/10'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center font-bold text-xl transition-all duration-300 ${
                              isCurrent
                                ? 'bg-gradient-to-br from-[#F2C94C] to-[#F2994A] text-[#003366] shadow-lg shadow-[#F2C94C]/30'
                                : isCompleted
                                ? 'bg-gradient-to-br from-[#27AE60] to-[#219653] text-white shadow-lg'
                                : isNext
                                ? 'bg-gradient-to-br from-[#00D4FF] to-[#0096FF] text-white shadow-lg'
                                : 'bg-white/10 text-white/40'
                            }`}
                          >
                            {isCompleted ? (
                              <CheckCircle2 className="w-7 h-7" />
                            ) : isLocked ? (
                              <Lock className="w-7 h-7" />
                            ) : (
                              <span>{lesson.order}</span>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <h3 className="text-lg font-bold text-white leading-tight">
                                {lesson.title}
                              </h3>
                              {isCurrent && (
                                <span className="flex-shrink-0 px-3 py-1 bg-[#F2C94C] text-[#003366] text-xs font-bold rounded-full shadow-lg animate-pulse">
                                  ATUAL
                                </span>
                              )}
                              {isNext && (
                                <span className="flex-shrink-0 px-3 py-1 bg-[#00D4FF]/30 text-[#00D4FF] text-xs font-bold rounded-full border border-[#00D4FF]/50">
                                  PRÓXIMA
                                </span>
                              )}
                            </div>

                            <p className="text-sm text-white/70 mb-3">
                              {lesson.courseTitle}
                            </p>

                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-1.5 text-white/60">
                                <Clock className="w-4 h-4" />
                                {lesson.duration}
                              </div>
                              <div className="flex items-center gap-1.5 text-[#00D4FF]">
                                <Brain className="w-4 h-4" />
                                <span>{lesson.aiReason}</span>
                              </div>
                            </div>
                          </div>

                          {!isLocked && (
                            <button
                              className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg ${
                                isCurrent
                                  ? 'bg-gradient-to-br from-[#F2C94C] to-[#F2994A] text-[#003366] hover:scale-110'
                                  : isCompleted
                                  ? 'bg-gradient-to-br from-[#27AE60] to-[#219653] text-white hover:scale-110'
                                  : 'bg-gradient-to-br from-[#00D4FF] to-[#0096FF] text-white hover:scale-110'
                              }`}
                            >
                              {isCompleted ? (
                                <ChevronRight className="w-6 h-6" />
                              ) : (
                                <Play className="w-6 h-6" />
                              )}
                            </button>
                          )}
                        </div>

                        {index < aiLearningPath.length - 1 && (
                          <div className="absolute -bottom-3 left-9 w-px h-6 bg-gradient-to-b from-white/30 to-transparent" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 pt-20 sm:pt-24">
        <div
          onClick={() => setShowAIPath(true)}
          className="mb-8 relative overflow-hidden bg-gradient-to-r from-[#00D4FF]/20 via-[#F2C94C]/20 to-[#27AE60]/20 backdrop-blur-sm rounded-2xl border border-[#00D4FF]/30 p-6 cursor-pointer hover:scale-[1.02] transition-all duration-300 group animate-fade-in shadow-lg hover:shadow-2xl hover:shadow-[#00D4FF]/20"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00D4FF] via-[#F2C94C] to-[#27AE60]" />

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#00D4FF] to-[#0096FF] flex items-center justify-center shadow-lg shadow-[#00D4FF]/30 group-hover:scale-110 transition-transform">
                <Brain className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                    Sua Trilha 100% Personalizada
                  </h2>
                  <Sparkles className="w-5 h-5 text-[#F2C94C] animate-pulse" />
                </div>
                <p className="text-sm sm:text-base text-white/80">
                  A IA monta e escolhe tudo que você deve assistir, aula após aula
                </p>

                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-2">
                    <div className="w-24 sm:w-32 h-2 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#00D4FF] to-[#27AE60] rounded-full" style={{ width: '40%' }} />
                    </div>
                    <span className="text-sm font-bold text-[#F2C94C]">40%</span>
                  </div>
                  <span className="text-xs sm:text-sm text-white/60">2 de 5 aulas concluídas</span>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0">
              <button className="px-6 py-3 bg-gradient-to-r from-[#F2C94C] to-[#F2994A] text-[#003366] rounded-xl font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-110 flex items-center gap-2">
                Ver Trilha
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="mb-8 sm:mb-12 animate-fade-in">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#F2C94C]/20 text-[#F2C94C]">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
              Cursos Estruturados
            </h2>
          </div>
          <p className="text-base sm:text-lg text-white/80 max-w-2xl">
            Explore todos os cursos disponíveis e construa seu conhecimento
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredCourses.map((course, index) => {
            const Icon = course.icon;
            return (
              <div
                key={course.id}
                className="relative group animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {course.aiSuggested && (
                  <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1.5 bg-purple-500/90 backdrop-blur-sm text-white rounded-full text-xs font-semibold shadow-lg">
                    <Brain className="w-3.5 h-3.5" />
                    IA Recomenda
                  </div>
                )}

                <div className={`relative bg-white/5 backdrop-blur-sm rounded-2xl border overflow-hidden transition-all duration-300 ${
                  course.locked
                    ? 'border-white/10 opacity-75'
                    : 'border-white/20 hover:border-[#F2C94C]/50 hover:shadow-2xl hover:shadow-[#F2C94C]/10 hover:scale-[1.02]'
                }`}>
                  <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                    <img
                      src={course.coverImage}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    {course.locked && (
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                        <Lock className="w-12 h-12 text-white/60" />
                      </div>
                    )}
                    {!course.locked && course.progress > 0 && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                        <div
                          className="h-full bg-[#F2C94C] transition-all duration-500"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    )}
                  </div>

                  <div className="p-4 sm:p-5">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-base sm:text-lg font-bold text-white leading-tight line-clamp-2 flex-1">
                        {course.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-block px-2.5 py-1 bg-white/10 text-white/70 rounded-full text-xs font-medium">
                        {course.level}
                      </span>
                      {!course.locked && course.progress > 0 && (
                        <span className="inline-block px-2.5 py-1 bg-[#F2C94C]/20 text-[#F2C94C] rounded-full text-xs font-medium">
                          {course.progress}% concluído
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-white/70 mb-4 leading-relaxed line-clamp-2">
                      {course.description}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-white/60 mb-4">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {course.duration}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5" />
                        {course.totalLessons} aulas
                      </div>
                    </div>

                    <button
                      disabled={course.locked}
                      className={`w-full flex items-center justify-center gap-2 py-2.5 sm:py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                        course.locked
                          ? 'bg-white/5 text-white/40 cursor-not-allowed'
                          : course.progress > 0
                          ? 'bg-white/10 text-white hover:bg-white/15'
                          : 'bg-[#F2C94C] text-[#003366] hover:bg-[#F2C94C]/90 shadow-lg'
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
                      <p className="text-center text-xs text-purple-300 mt-2 flex items-center justify-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        Recomendado para você
                      </p>
                    )}
                  </div>
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
