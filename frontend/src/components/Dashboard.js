import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext, API } from "../App";
import { toast } from "../utils/auth";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [lessons, setLessons] = useState([]);
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLessons();
    fetchProgress();
  }, []);

  const fetchLessons = async () => {
    try {
      // Mock lessons for frontend-only deployment
      setLessons([
        {
          id: "aula-1",
          title_pt: "Bem-vindo à Mentoria Framework Brasil",
          description_pt: "Uma introdução completa ao nosso programa de mentoria exclusivo para o mercado brasileiro.",
          order: 1,
          category: "lesson"
        },
        {
          id: "aula-2",
          title_pt: "Definindo Objetivos SMART no Brasil",
          description_pt: "Como estabelecer metas específicas considerando a realidade do mercado brasileiro.",
          order: 2,
          category: "lesson"
        },
        {
          id: "aula-3",
          title_pt: "Mindset de Crescimento Brasileiro",
          description_pt: "Desenvolva uma mentalidade resiliente adaptada à cultura brasileira.",
          order: 3,
          category: "lesson"
        }
      ]);
    } catch (error) {
      console.error("Error fetching lessons:", error);
    }
  };

  const fetchProgress = async () => {
    try {
      // Mock progress for frontend-only deployment
      setProgress({});
    } catch (error) {
      console.error("Error fetching progress:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleStartLesson = (lesson) => {
    navigate(`/lesson/${lesson.id}`);
  };

  const totalLessons = lessons.filter(lesson => lesson.category === 'lesson').length;
  const completedLessonsCount = Object.keys(progress).filter(
    id => progress[id]?.completed && lessons.find(l => l.id === id && l.category === 'lesson')
  ).length;
  const progressPercentage = totalLessons > 0 ? (completedLessonsCount / totalLessons) * 100 : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <header className="glass-effect border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">MB</span>
              </div>
              <h1 className="ml-3 text-2xl font-bold gradient-text">
                Painel de Controle
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>👤</span>
                <span>{user?.full_name}</span>
              </div>
              
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700 px-3 py-1 rounded-lg hover:bg-red-50 transition-colors"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 animate-fadeInUp">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Bem-vindo de volta, {user?.full_name}! 👋
          </h2>
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-lg inline-flex items-center gap-2">
              <span>🏆</span>
              <span>Acesso Vitalício</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-effect rounded-xl p-6 border-0">
            <h3 className="text-lg text-gray-900 flex items-center mb-4 font-semibold">
              <span className="mr-2">📊</span>
              Seu Progresso
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Aulas Concluídas</span>
                <span className="font-medium">{completedLessonsCount}/{totalLessons}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-emerald-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-600">
                {Math.round(progressPercentage)}% Concluído
              </p>
            </div>
          </div>
        </div>

        <section className="animate-fadeInUp">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="mr-2">🎓</span>
            Aulas
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.map((lesson) => (
              <div 
                key={lesson.id} 
                className="lesson-card glass-effect rounded-xl p-6 cursor-pointer"
                onClick={() => handleStartLesson(lesson)}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded">
                    Aula {lesson.order}
                  </span>
                </div>
                
                <h4 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">
                  {lesson.title_pt}
                </h4>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {lesson.description_pt}
                </p>
                
                <button className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition-colors">
                  Iniciar Aula
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
