import { ArrowLeft, Award, BookOpen, Calendar, Clock, Download, Medal, TrendingUp, Target, Star, CheckCircle2, BarChart3, Activity } from 'lucide-react';
import { useState } from 'react';

interface ReportsPageProps {
  onBack: () => void;
}

interface Certificate {
  id: string;
  courseTitle: string;
  courseDuration: string;
  completedDate: string;
  grade: number;
  status: 'available' | 'pending';
  coverImage: string;
}

interface ProgressStat {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: any;
  color: string;
}

export default function ReportsPage({ onBack }: ReportsPageProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'certificates'>('overview');

  const stats: ProgressStat[] = [
    {
      label: 'Total de Horas',
      value: '24.5h',
      change: '+5.2h esta semana',
      trend: 'up',
      icon: Clock,
      color: '#F2C94C',
    },
    {
      label: 'Cursos em Progresso',
      value: '2',
      change: '35% de conclusão média',
      trend: 'up',
      icon: BookOpen,
      color: '#6C63FF',
    },
    {
      label: 'Aulas Concluídas',
      value: '19',
      change: '+4 esta semana',
      trend: 'up',
      icon: CheckCircle2,
      color: '#27AE60',
    },
    {
      label: 'Sequência Atual',
      value: '7 dias',
      change: 'Melhor: 12 dias',
      trend: 'up',
      icon: Activity,
      color: '#E67E22',
    },
  ];

  const certificates: Certificate[] = [
    {
      id: '1',
      courseTitle: 'Fundamentos do Planejamento Financeiro',
      courseDuration: '4h 30min',
      completedDate: '15 de Janeiro, 2024',
      grade: 95,
      status: 'available',
      coverImage: 'https://s3.iatom.site/atom/Financas.webp',
    },
  ];

  const weeklyActivity = [
    { day: 'Seg', hours: 2.5, label: 'S' },
    { day: 'Ter', hours: 3.0, label: 'T' },
    { day: 'Qua', hours: 1.5, label: 'Q' },
    { day: 'Qui', hours: 4.0, label: 'Q' },
    { day: 'Sex', hours: 2.0, label: 'S' },
    { day: 'Sáb', hours: 3.5, label: 'S' },
    { day: 'Dom', hours: 1.0, label: 'D' },
  ];

  const maxHours = Math.max(...weeklyActivity.map(d => d.hours));

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#003366] via-[#004080] to-[#003366] p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="hidden sm:inline">Voltar</span>
          </button>

          <div className="flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-[#F2C94C]" />
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
              Meus Relatórios
            </h1>
          </div>

          <div className="w-16 sm:w-20" />
        </div>

        <div className="flex gap-2 mb-6 sm:mb-8 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold text-sm whitespace-nowrap transition-all ${
              activeTab === 'overview'
                ? 'bg-[#F2C94C] text-[#003366] shadow-lg'
                : 'bg-white/10 text-white hover:bg-white/15'
            }`}
          >
            Visão Geral
          </button>
          <button
            onClick={() => setActiveTab('certificates')}
            className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold text-sm whitespace-nowrap transition-all ${
              activeTab === 'certificates'
                ? 'bg-[#F2C94C] text-[#003366] shadow-lg'
                : 'bg-white/10 text-white hover:bg-white/15'
            }`}
          >
            Certificados
          </button>
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-white/20 hover:border-white/30 transition-all animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 sm:mb-4"
                      style={{ backgroundColor: `${stat.color}20`, border: `1px solid ${stat.color}40` }}
                    >
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: stat.color }} />
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-white/60 mb-2">
                      {stat.label}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-green-400">
                      <TrendingUp className="w-3 h-3" />
                      {stat.change}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-white/20 animate-slide-up" style={{ animationDelay: '400ms' }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#F2C94C]" />
                  Atividade Semanal
                </h2>
                <span className="text-xs sm:text-sm text-white/60">Última semana</span>
              </div>

              <div className="flex items-end justify-between gap-2 sm:gap-3 h-40 sm:h-48">
                {weeklyActivity.map((day, index) => (
                  <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-white/10 rounded-t-lg relative overflow-hidden group" style={{ height: '100%' }}>
                      <div
                        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#F2C94C] to-[#F2C94C]/70 rounded-t-lg transition-all duration-500"
                        style={{ height: `${(day.hours / maxHours) * 100}%` }}
                      >
                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs font-medium text-white/80">{day.label}</div>
                      <div className="text-xs text-white/50">{day.hours}h</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-white/20 animate-slide-up" style={{ animationDelay: '500ms' }}>
                <h2 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
                  <Target className="w-5 h-5 text-[#F2C94C]" />
                  Metas Mensais
                </h2>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-white/80">Concluir 3 cursos</span>
                      <span className="text-sm font-semibold text-[#F2C94C]">1/3</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div className="bg-gradient-to-r from-[#F2C94C] to-[#F2C94C]/70 h-full rounded-full" style={{ width: '33%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-white/80">20 horas de estudo</span>
                      <span className="text-sm font-semibold text-[#F2C94C]">24.5/20</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div className="bg-gradient-to-r from-green-400 to-green-500 h-full rounded-full" style={{ width: '100%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-white/80">Manter sequência de 7 dias</span>
                      <span className="text-sm font-semibold text-[#F2C94C]">7/7</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div className="bg-gradient-to-r from-green-400 to-green-500 h-full rounded-full" style={{ width: '100%' }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-white/20 animate-slide-up" style={{ animationDelay: '600ms' }}>
                <h2 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
                  <Medal className="w-5 h-5 text-[#F2C94C]" />
                  Conquistas
                </h2>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-[#F2C94C]/30">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center flex-shrink-0">
                      <Star className="w-6 h-6 text-white" fill="currentColor" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-white">Primeira Conquista</div>
                      <div className="text-xs text-white/60">Completou o primeiro curso</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/20">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <Activity className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-white">Maratonista</div>
                      <div className="text-xs text-white/60">7 dias consecutivos estudando</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/20 opacity-50">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Medal className="w-6 h-6 text-white/40" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-white/60">Mestre Financeiro</div>
                      <div className="text-xs text-white/40">Complete 5 cursos</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'certificates' && (
          <div className="space-y-6 animate-fade-in">
            {certificates.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:gap-6">
                {certificates.map((cert, index) => (
                  <div
                    key={cert.id}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-white/20 overflow-hidden hover:border-[#F2C94C]/50 transition-all hover:scale-[1.01] animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex flex-col sm:flex-row">
                      <div className="relative w-full sm:w-48 h-32 sm:h-auto bg-gradient-to-br from-gray-800 to-gray-900">
                        <img
                          src={cert.coverImage}
                          alt={cert.courseTitle}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Disponível
                        </div>
                      </div>

                      <div className="flex-1 p-5 sm:p-6">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div className="flex-1">
                            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                              {cert.courseTitle}
                            </h3>
                            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-white/60">
                              <div className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4" />
                                {cert.completedDate}
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Clock className="w-4 h-4" />
                                {cert.courseDuration}
                              </div>
                            </div>
                          </div>

                          <div className="flex-shrink-0 text-center">
                            <div className="text-2xl sm:text-3xl font-bold text-[#F2C94C]">
                              {cert.grade}
                            </div>
                            <div className="text-xs text-white/60">Nota Final</div>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 mt-4">
                          <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#F2C94C] text-[#003366] rounded-xl font-semibold text-sm hover:bg-[#F2C94C]/90 transition-all shadow-lg">
                            <Download className="w-4 h-4" />
                            Baixar Certificado
                          </button>
                          <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/10 text-white rounded-xl font-semibold text-sm hover:bg-white/15 transition-all">
                            <Award className="w-4 h-4" />
                            Compartilhar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-8 sm:p-12 border border-white/20 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/10 flex items-center justify-center">
                  <Award className="w-10 h-10 text-white/40" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Nenhum certificado ainda
                </h3>
                <p className="text-white/60 max-w-md mx-auto mb-6">
                  Complete seus cursos para desbloquear certificados e compartilhar suas conquistas
                </p>
                <button
                  onClick={onBack}
                  className="px-6 py-3 bg-[#F2C94C] text-[#003366] rounded-xl font-semibold hover:bg-[#F2C94C]/90 transition-all"
                >
                  Explorar Cursos
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
