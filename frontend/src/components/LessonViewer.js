import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../App";

export default function LessonViewer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock lesson data
    const mockLesson = {
      id: id,
      title_pt: "Bem-vindo à Mentoria Framework Brasil",
      description_pt: "Uma introdução completa ao nosso programa de mentoria exclusivo para o mercado brasileiro.",
      video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    };
    
    setLesson(mockLesson);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Aula não encontrada</h2>
          <button 
            onClick={() => navigate("/dashboard")}
            className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Voltar ao Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <header className="glass-effect border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <span>←</span>
              Voltar ao Painel
            </button>
            
            <div className="flex items-center gap-2">
              <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm">
                📚 Aula
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-fadeInUp space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold gradient-text mb-4">
              {lesson.title_pt}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {lesson.description_pt}
            </p>
          </div>

          <div className="glass-effect rounded-2xl p-8 shadow-2xl">
            <div className="video-container mb-6">
              <iframe
                src={lesson.video_url}
                title={lesson.title_pt}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => {
                  alert("Aula marcada como concluída!");
                  navigate("/dashboard");
                }}
                className="bg-emerald-600 text-white px-8 py-3 text-lg rounded-lg hover:bg-emerald-700 transition-colors font-medium"
              >
                <span className="flex items-center gap-2">
                  <span>✅</span>
                  Marcar como Concluída
                </span>
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors">
              ← Aula Anterior
            </button>
            
            <button 
              onClick={() => navigate("/dashboard")}
              className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              🏠 Dashboard
            </button>

            <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
              Próxima Aula →
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
