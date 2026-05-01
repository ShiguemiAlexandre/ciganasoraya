import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Clock, ChevronRight, X, Info, ArrowRight, Star, MessageCircle, HelpCircle, ChevronDown } from 'lucide-react';
import { SERVICES } from '../constants';
import { Service } from '../types';
import { motion, AnimatePresence } from 'motion/react';

const CatalogPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedGame, setSelectedGame] = useState<Service | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (selectedGame) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedGame]);

  useEffect(() => {
    // Garante que a página comece no topo ao entrar
    window.scrollTo(0, 0);
    setIsVisible(true);
  }, []);

  const whatsappNumber = "5516988509762";

  return (
    <div className="min-h-screen py-24 px-4 bg-mystic-texture relative overflow-hidden">
      {/* Background Floating Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className={`text-center mb-20 space-y-6 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center space-x-2 text-gold text-[10px] font-black uppercase tracking-[0.5em] mb-4">
             <Sparkles size={14} className="animate-spin-slow" />
             <span>Obras da Espiritualidade</span>
          </div>
          <h1 className="serif text-5xl md:text-7xl text-white italic">Nosso Catálogo <span className="text-gold not-italic">Oficial</span></h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg font-light tracking-wide">
            Explore as ferramentas sagradas que a Cigana Soraya dispõe para iluminar sua caminhada.
          </p>
          

        </div>

        {/* Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
          {SERVICES.filter(s => !s.isHidden).map((game, idx) => (
            <div 
              key={game.id} 
              onClick={() => setSelectedGame(game)}
              className={`group relative bg-white/5 border rounded-[2.5rem] overflow-hidden transition-all duration-700 flex flex-col h-full cursor-pointer
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}
                ${game.isFeatured 
                  ? 'border-gold/60 shadow-[0_0_50px_rgba(212,175,55,0.15)] ring-2 ring-gold/10 lg:scale-[1.03] z-10' 
                  : 'border-white/10 hover:border-gold/30'
                }
                hover:shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_20px_rgba(157,80,187,0.1)]
                hover:-translate-y-3
              `}
              style={{ 
                transitionDelay: `${idx * 100}ms`,
                perspective: '1000px'
              }}
            >
              {/* Mystic Sweep Shine Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none z-20">
                <div className="absolute -inset-[100%] bg-gradient-to-tr from-transparent via-white/5 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
              </div>

              {/* Featured Badge Overlay */}
              {game.isFeatured && (
                <div className="absolute top-6 left-6 z-30 flex items-center space-x-2 bg-gradient-to-r from-gold via-yellow-400 to-gold text-deep-purple px-5 py-2 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.6)] border border-deep-purple/20 animate-bounce-subtle">
                  <Star size={14} className="fill-deep-purple animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[0.15em]">{game.badge}</span>
                </div>
              )}

              {/* Card Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700 z-10"></div>
                <img 
                  src={game.image} 
                  alt={game.name} 
                  className={`w-full h-full object-cover transition-all duration-1000 transform group-hover:scale-110 ${game.isFeatured ? 'grayscale-0' : 'grayscale-[30%] group-hover:grayscale-0'}`} 
                />
              </div>

              {/* Card Body */}
              <div className="p-10 flex flex-col flex-grow relative">
                <h3 className={`serif text-3xl mb-6 transition-colors duration-500 ${game.isFeatured ? 'text-gold' : 'text-white group-hover:text-gold'}`}>
                  {game.name}
                </h3>
                
                <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-grow line-clamp-4 italic group-hover:text-gray-300 transition-colors">
                  "{game.description}"
                </p>
                
                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <div className="flex flex-col">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-white font-bold text-xl group-hover:text-gold transition-colors">{game.price}</span>
                    </div>
                    {game.duration && (
                      <span className="text-[9px] text-gold font-black uppercase tracking-widest mt-1 opacity-70 group-hover:opacity-100 transition-opacity">{game.duration}</span>
                    )}
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setSelectedGame(game); }}
                    className={`p-3 rounded-full transition-all duration-500 shadow-lg ${game.isFeatured ? 'bg-gold text-deep-purple hover:rotate-12 hover:scale-125' : 'bg-white/5 text-gold hover:bg-gold hover:text-deep-purple hover:rotate-12 hover:scale-125'}`}
                  >
                    <Info size={20} />
                  </button>
                </div>
                
                <button 
                  onClick={(e) => { e.stopPropagation(); navigate(`/agendar?serviceId=${game.id}`); }}
                  className={`w-full mt-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-500 shadow-xl border overflow-hidden relative group/btn
                    ${game.isFeatured 
                      ? 'bg-gradient-to-r from-gold via-yellow-500 to-gold text-deep-purple border-gold hover:brightness-110' 
                      : 'bg-white/5 text-white border-white/10 hover:bg-gold hover:border-gold hover:text-deep-purple'
                    }`}
                >
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    <span>Agendar Oráculo</span>
                    <ArrowRight size={14} className="transform translate-x-0 group-hover/btn:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Support Section */}
        <div className="mt-16 text-center p-8 bg-white/5 border border-white/10 rounded-[2rem] max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000">
           <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center text-gold mx-auto mb-4 border border-gold/10">
             <HelpCircle size={24} />
           </div>
           <h3 className="serif text-xl text-white mb-2">Dúvidas sobre o oráculo ideal?</h3>
           <p className="text-gray-400 text-xs mb-6 font-light leading-relaxed max-w-md mx-auto italic">
             Mande uma mensagem para receber uma breve orientação sobre qual caminho melhor ressoa com você hoje.
           </p>
           <a 
             href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Olá! Estou no catálogo da Cigana Soraya e gostaria de uma orientação sobre qual jogo escolher.".normalize('NFC'))}`}
             target="_blank"
             rel="noopener noreferrer"
             className="inline-flex items-center space-x-2 px-6 py-3 bg-white/5 text-gray-300 border border-white/10 rounded-full font-black text-[9px] uppercase tracking-widest hover:bg-green-600/20 hover:text-green-400 hover:border-green-500/30 transition-all active:scale-95"
           >
             <MessageCircle size={14} />
             <span>Orientação via WhatsApp</span>
           </a>
        </div>
      </div>

      {/* Details Modal / Bottom Sheet */}
      <AnimatePresence>
        {selectedGame && (
          <div className="fixed inset-0 z-[2000] flex items-end md:items-center justify-center p-0 md:p-8 lg:p-12 bg-black/95 backdrop-blur-md cursor-pointer" onClick={() => setSelectedGame(null)}>
            <motion.div 
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 300, duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl bg-[#1a0b2e] border-t md:border border-white/10 rounded-t-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(157,80,187,0.2)] flex flex-col md:flex-row h-[90vh] md:h-auto md:max-h-[80vh] cursor-default"
            >
              {/* Mobile Drag Handle */}
              <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto my-4 shrink-0 md:hidden"></div>

              {/* Sticky Close Button (Desktop) */}
              <div className="absolute top-8 right-8 z-50 hidden md:block">
                <button 
                  onClick={() => setSelectedGame(null)}
                  className="p-3 bg-black/50 text-white rounded-full hover:bg-gold hover:text-deep-purple transition-all duration-500 hover:rotate-90 shadow-xl"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Mobile Close Button (Floating) */}
              <div className="fixed bottom-8 right-6 z-[110] md:hidden">
                <button 
                  onClick={() => setSelectedGame(null)}
                  className="w-14 h-14 bg-purple-600 shadow-[0_10px_30px_rgba(157,80,187,0.5)] text-white rounded-full flex items-center justify-center border border-purple-400/30"
                >
                  <ChevronDown size={32} />
                </button>
              </div>

              {/* Full Scrollable Container */}
              <div className="flex flex-col md:flex-row w-full overflow-y-auto md:overflow-hidden">
                {/* Image Section */}
                <div className="w-full md:w-1/2 min-h-[300px] md:h-auto overflow-hidden relative shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#1a0b2e] via-transparent to-transparent z-10"></div>
                  <img src={selectedGame.image} className="w-full h-full object-cover grayscale-[10%]" alt={selectedGame.name} />
                </div>

                {/* Content Section */}
                <div className="w-full md:w-1/2 p-6 md:p-10 lg:p-14 flex flex-col bg-mystic-texture md:overflow-y-auto">
                  <div className="flex-grow">
                    <div className="flex items-center space-x-2 text-gold text-[10px] font-black tracking-[0.4em] uppercase mb-4">
                      <Sparkles size={14} />
                      <span>Detalhes Sagrados</span>
                    </div>
                    <h2 className="serif text-3xl md:text-4xl lg:text-5xl text-white mb-6 leading-tight">{selectedGame.name}</h2>
                    
                    <div className="space-y-6 mb-10">
                      <p className="text-gray-300 leading-relaxed text-sm md:text-base lg:text-lg font-light italic border-l-2 border-gold/30 pl-4">
                        "{selectedGame.description}"
                      </p>
                      
                      <div className="space-y-4">
                        <h4 className="text-[10px] font-black text-gold uppercase tracking-widest flex items-center">
                          <div className="w-6 h-[1px] bg-gold/30 mr-3"></div>
                          Incluso na Sessão
                        </h4>
                        <ul className="grid grid-cols-1 gap-3">
                          {selectedGame.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start text-xs text-gray-400 group/item">
                              <Sparkles size={12} className="text-gold mr-3 mt-1 shrink-0" />
                              <span className="group-hover/item:text-white transition-colors">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Footer Area */}
                  <div className="pt-8 border-t border-white/10 mt-auto">
                    <div className="flex flex-col space-y-6">
                      <div className="text-center md:text-left">
                        <div className="text-white font-bold text-3xl">{selectedGame.price}</div>
                        {selectedGame.duration && (
                          <div className="text-[10px] text-gold uppercase tracking-widest mt-1 font-black">
                            Duração: {selectedGame.duration}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-col gap-4">
                        <button 
                          onClick={() => navigate(`/agendar?serviceId=${selectedGame.id}`)}
                          className="flex items-center justify-center space-x-2 px-8 py-5 rounded-full font-black text-xs uppercase tracking-[0.2em] transition-all bg-gradient-to-r from-gold via-yellow-500 to-gold text-deep-purple hover:brightness-110 active:scale-95 shadow-[0_10px_30px_rgba(212,175,55,0.3)]"
                        >
                          <span>Reservar este Horário</span>
                          <ChevronRight size={18} />
                        </button>

                        <a 
                          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Olá! Gostaria de mais informações sobre o oráculo "${selectedGame.name}".`.normalize('NFC'))}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center space-x-2 text-gray-500 hover:text-gold transition-all text-[10px] font-black tracking-widest uppercase"
                        >
                          <MessageCircle size={14} />
                          <span>Falar com Soraya</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>


      <style>{`
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-5px) scale(1.02); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 3s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default CatalogPage;