import { BookOpen, Clock, Play, Plus, Sparkles } from 'lucide-react';
import type { CourseData } from './CaixaEducaPage';

interface CoursesPageProps {
  onSelectCourse: (course: CourseData) => void;
}

const courses: CourseData[] = [
  {
    id: '1',
    title: 'Educação Financeira',
    description: 'Do zero ao controle total do seu dinheiro. Aprenda a organizar receitas, despesas e criar hábitos financeiros saudáveis.',
    duration: '8h',
    totalLessons: 12,
    completedLessons: 4,
    level: 'Iniciante',
    category: 'Fundamentos',
    coverImage: 'https://s3.iatom.site/atom/Financas.webp',
    progress: 33,
    locked: false,
    lessons: [
      { id: 'l1', title: 'O que é educação financeira?', duration: '12 min' },
      { id: 'l2', title: 'Entendendo seu fluxo de caixa', duration: '15 min' },
      { id: 'l3', title: 'Criando seu primeiro orçamento', duration: '20 min' },
      { id: 'l4', title: 'Receitas vs despesas fixas e variáveis', duration: '18 min' },
      { id: 'l5', title: 'Construindo sua reserva de emergência', duration: '25 min' },
    ],
  },
  {
    id: '2',
    title: 'Preparatório Concurso Público',
    description: 'Passe no concurso com planejamento e foco. Conteúdo direcionado, técnicas de estudo e simulados.',
    duration: '12h',
    totalLessons: 20,
    completedLessons: 0,
    level: 'Intermediário',
    category: 'Carreira',
    coverImage: 'https://s3.iatom.site/atom/Trader.webp',
    progress: 0,
    locked: false,
    lessons: [
      { id: 'l1', title: 'Como funciona um concurso público', duration: '15 min' },
      { id: 'l2', title: 'Elaborando seu plano de estudos', duration: '20 min' },
      { id: 'l3', title: 'Técnicas de memorização eficazes', duration: '18 min' },
      { id: 'l4', title: 'Português: gramática essencial', duration: '30 min' },
      { id: 'l5', title: 'Raciocínio lógico: fundamentos', duration: '25 min' },
    ],
  },
  {
    id: '3',
    title: 'Educação Financeira para Pais e Filhos',
    description: 'Ensine seus filhos a lidar com dinheiro desde cedo. Atividades práticas e lições para toda a família.',
    duration: '6h',
    totalLessons: 10,
    completedLessons: 0,
    level: 'Iniciante',
    category: 'Família',
    coverImage: 'https://s3.iatom.site/atom/op%C3%A7oes-inteligentes.jpg',
    progress: 0,
    locked: false,
    lessons: [
      { id: 'l1', title: 'Por que falar de dinheiro com crianças?', duration: '10 min' },
      { id: 'l2', title: 'Mesada educativa: como implementar', duration: '15 min' },
      { id: 'l3', title: 'Jogos e atividades sobre finanças', duration: '20 min' },
      { id: 'l4', title: 'Ensinando sobre poupança e metas', duration: '18 min' },
      { id: 'l5', title: 'Consumo consciente em família', duration: '15 min' },
    ],
  },
  {
    id: '4',
    title: 'Saia do Vermelho',
    description: 'Elimine dívidas e construa sua reserva de emergência. Estratégias comprovadas para retomar o controle.',
    duration: '5h',
    totalLessons: 8,
    completedLessons: 0,
    level: 'Iniciante',
    category: 'Dívidas',
    coverImage: 'https://s3.iatom.site/atom/Financas.webp',
    progress: 0,
    locked: false,
    lessons: [
      { id: 'l1', title: 'Diagnóstico: mapeie todas as suas dívidas', duration: '15 min' },
      { id: 'l2', title: 'Método avalanche vs bola de neve', duration: '20 min' },
      { id: 'l3', title: 'Negociando com credores', duration: '18 min' },
      { id: 'l4', title: 'Cortando gastos sem sofrer', duration: '15 min' },
      { id: 'l5', title: 'Montando sua reserva de emergência', duration: '22 min' },
    ],
  },
];

export default function CoursesPage({ onSelectCourse }: CoursesPageProps) {
  return (
    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Ambient blue glow blobs */}
      <div className="pointer-events-none absolute -top-40 left-1/4 w-[500px] h-[500px] bg-[#005599]/20 rounded-full blur-[120px]" />
      <div className="pointer-events-none absolute top-60 -right-20 w-[400px] h-[400px] bg-[#003366]/30 rounded-full blur-[100px]" />

      {/* Section header */}
      <div className="relative mb-10 animate-fade-in">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-4 h-4 text-[#F2C94C]" />
          <span className="text-xs font-semibold tracking-widest uppercase text-[#F2C94C]/70">
            Para você
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Cursos
        </h2>
        <p className="text-sm text-white/40 mt-2">
          {courses.length} cursos disponíveis · comece agora
        </p>
      </div>

      {/* Course grid */}
      <div className="relative grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {courses.map((course, index) => (
          <button
            key={course.id}
            onClick={() => onSelectCourse(course)}
            className="group text-left relative rounded-2xl overflow-hidden transition-all duration-500 animate-slide-up hover:scale-[1.03] hover:-translate-y-1 focus:outline-none"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Glow effect on hover */}
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-[#005599]/0 via-[#005599]/0 to-[#005599]/0 group-hover:from-[#005599]/40 group-hover:via-[#003366]/20 group-hover:to-transparent transition-all duration-500 blur-sm opacity-0 group-hover:opacity-100" />

            {/* Card */}
            <div className="relative bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] rounded-2xl overflow-hidden group-hover:border-[#005599]/40 group-hover:bg-white/[0.06] transition-all duration-500 group-hover:shadow-[0_8px_40px_-12px_rgba(0,85,153,0.4)]">
              {/* Thumbnail */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={course.coverImage}
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Dark gradient overlay — Caixa blue tones */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#001a33] via-[#003366]/50 to-transparent" />

                {/* Duration pill */}
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-[11px] font-medium text-white/90 border border-white/10">
                  <Clock className="w-3 h-3" />
                  {course.duration}
                </div>

                {/* Play icon on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="w-14 h-14 rounded-full bg-[#F2C94C]/90 backdrop-blur-sm flex items-center justify-center shadow-lg shadow-[#F2C94C]/30 transform scale-75 group-hover:scale-100 transition-transform duration-500">
                    <Play className="w-6 h-6 text-[#003366] ml-0.5" fill="currentColor" />
                  </div>
                </div>

                {/* Progress bar */}
                {course.progress > 0 && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                    <div className="h-full bg-gradient-to-r from-[#F2C94C] to-[#F2C94C]/70 rounded-r-full" style={{ width: `${course.progress}%` }} />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-3.5 sm:p-4">
                <h3 className="text-sm sm:text-base font-semibold text-white leading-tight mb-2 line-clamp-2 group-hover:text-[#F2C94C] transition-colors duration-300">
                  {course.title}
                </h3>

                <div className="flex items-center gap-2 text-[11px] text-white/35">
                  <span className="px-1.5 py-0.5 rounded bg-white/[0.06] text-white/50 font-medium">{course.level}</span>
                  <span>{course.totalLessons} aulas</span>
                  {course.progress > 0 && (
                    <>
                      <span className="w-0.5 h-0.5 rounded-full bg-white/20" />
                      <span className="text-[#F2C94C] font-semibold">{course.progress}%</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </button>
        ))}

        {/* +47 cursos card */}
        <div
          className="group relative rounded-2xl overflow-hidden transition-all duration-500 animate-slide-up cursor-pointer hover:scale-[1.03] hover:-translate-y-1"
          style={{ animationDelay: `${courses.length * 100}ms` }}
        >
          <div className="relative h-full min-h-[220px] bg-gradient-to-br from-[#003366]/30 via-white/[0.02] to-[#005599]/20 backdrop-blur-sm border border-dashed border-white/[0.10] group-hover:border-[#F2C94C]/30 rounded-2xl flex flex-col items-center justify-center transition-all duration-500 group-hover:shadow-[0_8px_40px_-12px_rgba(242,201,76,0.15)]">
            <div className="w-14 h-14 rounded-2xl bg-[#F2C94C]/10 flex items-center justify-center mb-3 group-hover:bg-[#F2C94C]/20 group-hover:scale-110 transition-all duration-500">
              <Plus className="w-7 h-7 text-[#F2C94C]" />
            </div>
            <span className="text-xl font-bold text-white/70 group-hover:text-white transition-colors duration-300">
              + 47 cursos
            </span>
            <span className="text-xs text-white/30 mt-1">Em breve</span>
          </div>
        </div>
      </div>
    </div>
  );
}
