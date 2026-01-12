import React from 'react';
import { Gift, Check, Lock } from 'lucide-react';

const Loyalty = ({ data }) => {
  const totalTampons = 8;
  const tampons = Array.from({ length: totalTampons });
  const isComplete = data.nombreTampons >= totalTampons;
  
  const progress = (data.nombreTampons / totalTampons) * 100;

  const handleUnlock = () => {
    if (isComplete) {
      alert("🎉 Félicitations ! Votre demande de récompense a été envoyée au BDE. Présentez ce message au comptoir !");
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] items-center justify-center text-white p-4">
      
      {/* CARTE : Padding réduit (p-6 au lieu de p-10) pour gagner de la place */}
      <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl shadow-2xl p-6 max-w-2xl w-full flex flex-col items-center relative overflow-hidden transition-all duration-300">
        
        <div className={`absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none opacity-20 ${isComplete ? 'bg-supinfo-orange' : 'bg-blue-600'}`} />

        {/* EN-TÊTE : Marges réduites (mb-6 au lieu de mb-12) et icône un peu plus petite */}
        <div className="text-center mb-6 relative z-10">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg ring-4 ring-white/10 transition-all duration-500 ${isComplete ? 'bg-gradient-to-br from-supinfo-orange to-orange-700 shadow-orange-900/50 scale-110' : 'bg-white/10'}`}>
            <Gift size={36} className="text-white" />
          </div>
          <h2 className="text-3xl font-extrabold mb-2 tracking-tight">Carte Snack SUPINFO</h2>
          <p className="text-indigo-200 text-base">
            {isComplete 
              ? "Carte complète ! Récupérez votre dû." 
              : "Cumulez 8 tampons pour obtenir votre récompense."}
          </p>
        </div>

        {/* GRILLE : Gap réduit (gap-6) et marge réduite (mb-8) */}
        <div className="grid grid-cols-4 gap-6 mb-8 relative z-10">
          {tampons.map((_, index) => {
            const isChecked = index < data.nombreTampons;
            
            return (
              <div key={index} className="flex flex-col items-center">
                <div 
                  className={`
                    w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center border-2 transition-all duration-500 ease-out
                    ${isChecked 
                      ? 'bg-supinfo-orange border-supinfo-orange text-white shadow-[0_0_15px_rgba(183,101,29,0.6)] scale-105' 
                      : 'border-white/10 bg-white/5 text-white/10'}
                  `}
                >
                  {isChecked ? (
                    <Check size={24} strokeWidth={4} />
                  ) : (
                    <span className="text-base font-bold">{index + 1}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* BARRE : Marge réduite (mb-8) */}
        <div className="w-full mb-8 relative z-10 px-4">
          <div className="flex justify-between text-sm mb-2 font-medium text-indigo-200">
            <span>Progression</span>
            <span className="text-white font-bold">{data.nombreTampons} / {totalTampons}</span>
          </div>
          <div className="h-3 w-full bg-black/40 rounded-full overflow-hidden border border-white/5 backdrop-blur-sm">
            <div 
              className="h-full bg-gradient-to-r from-orange-600 to-supinfo-orange shadow-[0_0_10px_rgba(183,101,29,0.8)] transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* BOUTON : Parfaitement intégré maintenant */}
        <div className="w-full relative z-10 mt-auto">
          <button
            onClick={handleUnlock}
            disabled={!isComplete}
            className={`
              w-full py-4 px-6 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300
              ${isComplete
                ? 'bg-supinfo-orange hover:bg-orange-600 text-white shadow-lg shadow-orange-900/40 hover:scale-[1.02] cursor-pointer'
                : 'bg-white/5 text-gray-400 cursor-not-allowed border border-white/5'
              }
            `}
          >
            {isComplete ? (
              <>
                <Gift size={24} className="animate-bounce" />
                DÉBLOQUER MA RÉCOMPENSE
              </>
            ) : (
              <>
                <Lock size={20} />
                <span>Verrouillé &bull; Plus que {totalTampons - data.nombreTampons} commandes</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

export default Loyalty;