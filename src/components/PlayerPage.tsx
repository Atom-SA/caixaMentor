import React, { useState } from 'react';
import { ChevronLeft, Menu, Play, MessageCircle } from 'lucide-react';

interface PlayerPageProps {
  onBack: () => void;
}

export default function PlayerPage({ onBack }: PlayerPageProps) {
  const [showChat, setShowChat] = useState(false);

  const videoId = 'Ke90Tje7VS0';
  const chatUrl = 'https://mentor-ia-picpay.vercel.app/?ID=18563c46-eb92-40c6-ada8-385b214bc7cf&lessonID=a11cc57f-27cc-470c-8b47-e04961f0a498';

  return (
    <div className="min-h-screen bg-[#003366] flex flex-col">
      <div className="fixed top-0 left-0 right-0 bg-[#003366] z-40 border-b border-white/10">
        <div className="px-4 py-4 flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm">Voltar</span>
          </button>
        </div>
      </div>

      <div className="flex-1 pt-16 pb-24 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="mb-4">
            <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <Play className="w-5 h-5 sm:w-6 sm:h-6 text-[#F2C94C]" />
              CAP 1: Aula 2 - Fundamentos do Planejamento Financeiro
            </h1>
          </div>

          <div className="relative w-full bg-black rounded-xl overflow-hidden shadow-2xl" style={{ height: '565px' }}>
            {!showChat ? (
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
                title="Video Player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <iframe
                className="w-full h-full"
                src={chatUrl}
                title="Chat Mentor IA"
                allow="microphone; camera"
                allowFullScreen
              />
            )}
          </div>

          <div className="mt-6 flex justify-center">
            <button className="px-6 py-3 bg-[#F2C94C] text-[#003366] rounded-xl font-bold text-sm sm:text-base shadow-lg hover:shadow-xl hover:bg-[#F2C94C]/90 transition-all">
              Próxima Aula
            </button>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/10 z-50">
        <div className="flex items-center justify-around py-3">
          <button
            className="flex flex-col items-center gap-1 px-6 py-2 text-white/60 hover:text-white transition-colors"
          >
            <Menu className="w-6 h-6" />
            <span className="text-xs font-medium">Menu</span>
          </button>

          <button
            onClick={() => setShowChat(false)}
            className={`flex flex-col items-center gap-1 px-6 py-2 transition-colors ${
              !showChat ? 'text-[#F2C94C]' : 'text-white/60 hover:text-white'
            }`}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              !showChat ? 'bg-[#F2C94C]' : 'bg-white/10'
            }`}>
              <Play className={`w-6 h-6 ${!showChat ? 'text-[#003366]' : 'text-white'}`} />
            </div>
            <span className="text-xs font-medium">Assistir</span>
          </button>

          <button
            onClick={() => setShowChat(true)}
            className={`flex flex-col items-center gap-1 px-6 py-2 transition-colors ${
              showChat ? 'text-[#F2C94C]' : 'text-white/60 hover:text-white'
            }`}
          >
            <MessageCircle className="w-6 h-6" />
            <span className="text-xs font-medium">Chat</span>
          </button>
        </div>
      </div>
    </div>
  );
}
