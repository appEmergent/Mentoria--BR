import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
import jsPDF from 'jspdf';

export default function CertificatePage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const generateCertificate = () => {
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    // Design do certificado
    pdf.setFillColor(5, 150, 105);
    pdf.rect(10, 10, 277, 190, 'S');
    
    pdf.setFontSize(32);
    pdf.text('CERTIFICADO DE CONCLUSÃO', 148, 60, { align: 'center' });
    
    pdf.setFontSize(16);
    pdf.text('Certificamos que', 148, 85, { align: 'center' });
    
    pdf.setFontSize(28);
    pdf.text(user.full_name, 148, 110, { align: 'center' });
    
    pdf.setFontSize(14);
    pdf.text('concluiu com sucesso o curso', 148, 130, { align: 'center' });
    
    pdf.setFontSize(18);
    pdf.text('Mentoria Framework Brasil', 148, 150, { align: 'center' });
    
    pdf.setFontSize(12);
    const date = new Date().toLocaleDateString('pt-BR');
    pdf.text(`Data de Conclusão: ${date}`, 148, 170, { align: 'center' });

    const fileName = `Certificado_${user.full_name.replace(/\s+/g, '_')}.pdf`;
    pdf.save(fileName);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Cabeçalho */}
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
            
            <h1 className="text-xl font-bold gradient-text flex items-center gap-2">
              <span>🏅</span>
              Certificado de Conclusão
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-fadeInUp space-y-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-white text-3xl">🏆</span>
            </div>
            <h2 className="text-4xl font-bold gradient-text mb-4">
              Parabéns!
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Você concluiu todas as aulas e está qualificado para receber o certificado.
            </p>
          </div>

          {/* Prévia visual do certificado */}
          <div className="glass-effect rounded-2xl p-8 mx-auto max-w-3xl border-emerald-200">
            <div className="text-center space-y-6">
              <h1 className="text-3xl font-bold gradient-text">
                CERTIFICADO DE CONCLUSÃO
              </h1>
              
              <p className="text-lg text-gray-600">
                Certificamos que
              </p>
              
              <h2 className="text-4xl font-bold text-gray-900 py-4">
                {user.full_name}
              </h2>
              
              <p className="text-lg text-gray-600">
                concluiu com sucesso o curso
              </p>
              
              <h3 className="text-2xl font-bold gradient-text">
                Mentoria Framework Brasil
              </h3>
              
              <div className="flex items-center justify-center gap-4 pt-6">
                <div className="flex items-center text-gray-600">
                  <span className="mr-2">📅</span>
                  <span>Data de Conclusão: {new Date().toLocaleDateString('pt-BR')}</span>
                </div>
              </div>
              
              <div className="pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500">Assinatura Digital</p>
                <div className="w-32 h-px bg-gray-400 mx-auto mt-2"></div>
              </div>
            </div>
          </div>

          {/* Botão para gerar PDF */}
          <div className="text-center">
            <button
              onClick={generateCertificate}
              className="bg-emerald-600 text-white px-8 py-4 text-lg rounded-lg hover:bg-emerald-700 transition-colors font-medium"
            >
              <span className="flex items-center gap-2">
                <span>📥</span>
                Gerar Certificado PDF
              </span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
