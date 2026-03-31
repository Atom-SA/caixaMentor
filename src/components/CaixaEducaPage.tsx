import React, { useState } from 'react';
import { BookOpen, Route, BarChart3, ChevronLeft } from 'lucide-react';
import Logo from './Logo';
import CoursesPage from './CoursesPage';
import TrilhaPage from './TrilhaPage';
import ReportsPage from './ReportsPage';
import CourseDetailPage from './CourseDetailPage';

interface CaixaEducaPageProps {
  onBack: () => void;
}

export interface CourseData {
  id: string;
  title: string;
  description: string;
  duration: string;
  totalLessons: number;
  completedLessons: number;
  level: 'Iniciante' | 'Intermediário' | 'Avançado';
  category: string;
  coverImage: string;
  progress: number;
  locked: boolean;
  lessons: { id: string; title: string; duration: string }[];
}

type Tab = 'cursos' | 'trilha' | 'relatorios';

const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: 'cursos', label: 'Cursos', icon: BookOpen },
  { id: 'trilha', label: 'Minha Trilha', icon: Route },
  { id: 'relatorios', label: 'Relatórios', icon: BarChart3 },
];

export default function CaixaEducaPage({ onBack }: CaixaEducaPageProps) {
  const [activeTab, setActiveTab] = useState<Tab>('cursos');
  const [selectedCourse, setSelectedCourse] = useState<CourseData | null>(null);

  if (selectedCourse) {
    return (
      <CourseDetailPage
        course={selectedCourse}
        onBack={() => setSelectedCourse(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#001a33] via-navy to-[#001a33] font-inter">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 bg-[#001a33]/80 backdrop-blur-2xl z-50 border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Top bar */}
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <button
                onClick={onBack}
                className="flex items-center gap-1.5 text-white/50 hover:text-white transition-colors text-sm"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <Logo invert height="h-4" />
            </div>
            <span className="text-xs font-medium text-white/40 tracking-widest uppercase">
              Caixa Educa
            </span>
          </div>

          {/* Tab bar */}
          <div className="flex gap-1 pb-3 -mt-0.5">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-[#005599]/30 text-white border border-[#005599]/40 shadow-[0_0_12px_-3px_rgba(0,85,153,0.3)]'
                      : 'text-white/40 hover:text-white/70 hover:bg-white/[0.04]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="pt-[108px]">
        {activeTab === 'cursos' && (
          <CoursesPage onSelectCourse={(course) => setSelectedCourse(course)} />
        )}
        {activeTab === 'trilha' && <TrilhaPage />}
        {activeTab === 'relatorios' && <ReportsPage />}
      </div>
    </div>
  );
}
