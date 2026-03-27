import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Sparkles, 
  Moon, 
  ShieldCheck, 
  ChevronRight, 
  ChevronLeft,
  Eye, 
  Clock, 
  FileText, 
  Navigation,
  Shield
} from 'lucide-react';
import { SERVICES } from '../constants';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  
  // Refs para os carrosséis
  const heroRef = useRef<HTMLDivElement>(null);
  const catalogRef = useRef<HTMLDivElement>(null);
  
  // Configuração do Hero: 3 itens base (Mantido para não alterar o Hero)
  const baseHeroServices = [
    SERVICES.find(s => s.id === 's1'), 
    SERVICES.find(s => s.id === 's4'), 
    SERVICES.find(s => s.id === 's3')
  ].filter(Boolean);
  const infiniteHeroServices = [...baseHeroServices, ...baseHeroServices, ...baseHeroServices];

  // Configuração do Catálogo Preview: 4 itens base (Uso apenas da lista base no mobile)
  const previewServices = SERVICES.slice(4, 8); 

  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [hoveredPreviewIdx, setHoveredPreviewIdx] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Estados de índices ativos
  const [activeHeroIdx, setActiveHeroIdx] = useState(baseHeroServices.length);
  const [activeCatalogIdx, setActiveCatalogIdx] = useState(0); // Começa no 0 para lista base única

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Inicialização cuidadosa
    if (window.innerWidth < 768) {
      setTimeout(() => {
        if (heroRef.current) forceScrollToIdx(heroRef, baseHeroServices.length, 0.8);
        if (catalogRef.current) forceScrollToIdx(catalogRef, 0, 0.75);
      }, 300);
    }

    return () => window.removeEventListener('resize', checkMobile);
  }, [isMobile]);

  const forceScrollToIdx = (ref: React.RefObject<HTMLDivElement>, idx: number, ratio: number) => {
    if (!ref.current) return;
    const itemWidth = ref.current.offsetWidth * ratio;
    ref.current.scrollLeft = idx * itemWidth;
    if (ref === heroRef) setActiveHeroIdx(idx);
    else setActiveCatalogIdx(idx);
  };

  // Lógica de Scroll Unificada e Otimizada
  const handleScroll = (
    ref: React.RefObject<HTMLDivElement>, 
    setActiveIdx: (idx: number) => void, 
    baseLength: number, 
    ratio: number
  ) => {
    if (!ref.current || !isMobile) return;
    
    const { scrollLeft, offsetWidth } = ref.current;
    const itemWidth = offsetWidth * ratio;
    if (itemWidth <= 0) return;
    
    const currentIdx = Math.round(scrollLeft / itemWidth);

    // Lógica de Teleporte APENAS para o Hero (preservando o comportamento original)
    if (ref === heroRef) {
      const jumpSize = baseLength * itemWidth;
      if (scrollLeft >= (baseLength * 2 + 1) * itemWidth) {
        ref.current.scrollLeft -= jumpSize;
        return;
      } else if (scrollLeft <= (baseLength - 2) * itemWidth) {
        ref.current.scrollLeft += jumpSize;
        return;
      }
    }

    // Atualiza índice ativo se houver mudança e estiver dentro dos limites (0-3 no catálogo)
    if (currentIdx !== (ref === heroRef ? activeHeroIdx : activeCatalogIdx)) {
      if (ref === catalogRef) {
        if (currentIdx >= 0 && currentIdx < previewServices.length) {
          setActiveIdx(currentIdx);
        }
      } else {
        setActiveIdx(currentIdx);
      }
    }
  };

  // Lógica de Navegação com Wrap-around (Loop Infinito)
  const scrollStep = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right', ratio: number, baseLength: number) => {
    if (!ref.current) return;
    const itemWidth = ref.current.offsetWidth * ratio;
    const currentScroll = ref.current.scrollLeft;
    const currentIdx = Math.round(currentScroll / itemWidth);
    
    let targetIdx;
    
    if (ref === catalogRef && isMobile) {
      // Lógica de Loop para Catálogo Mobile: Lista Base Única
      if (direction === 'left') {
        targetIdx = currentIdx <= 0 ? baseLength - 1 : currentIdx - 1;
      } else {
        targetIdx = currentIdx >= baseLength - 1 ? 0 : currentIdx + 1;
      }
    } else {
      // Lógica padrão para Hero e outros
      targetIdx = direction === 'left' ? currentIdx - 1 : currentIdx + 1;
    }
    
    ref.current.scrollTo({
      left: targetIdx * itemWidth,
      behavior: 'smooth'
    });
  };

  const MysticDivider = () => (
    <div className="relative w-full h-[1px] my-4 overflow-visible">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/30 to-transparent animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-deep-purple border border-gold/40 rounded-full rotate-45 shadow-[0_0_10px_rgba(212,175,55,0.3)]"></div>
    </div>
  );

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-start px-0 md:px-4 pt-4 md:pt-6 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(157,80,187,0.15)_0%,transparent_60%)]"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center space-x-3 px-6 py-2 rounded-full bg-white/5 text-purple-300 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] border border-white/10 mb-4 md:mb-6 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-1000">
            <Sparkles size={12} className="text-gold" />
            <span>Os Oráculos Principais</span>
          </div>
          
          <div className="text-center mb-4 md:mb-8 px-4 space-y-2 md:space-y-4 relative z-0">
            <h1 className="serif text-3xl sm:text-4xl md:text-7xl lg:text-8xl font-bold leading-tight text-white italic animate-in fade-in duration-1000 text-center">
              O destino sussurra, <br />
              <span className="text-purple-400 not-italic">as cartas revelam.</span>
            </h1>
          </div>

          <div className="relative w-full z-20">
            {isMobile && (
              <>
                <button 
                  onClick={() => scrollStep(heroRef, 'left', 0.8, baseHeroServices.length)} 
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-[100] w-14 h-14 bg-[#0d0517]/90 backdrop-blur-xl rounded-full flex items-center justify-center text-gold border border-gold/40 shadow-2xl active:scale-90 transition-transform"
                >
                  <ChevronLeft size={32} />
                </button>
                <button 
                  onClick={() => scrollStep(heroRef, 'right', 0.8, baseHeroServices.length)} 
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-[100] w-14 h-14 bg-[#0d0517]/90 backdrop-blur-xl rounded-full flex items-center justify-center text-gold border border-gold/40 shadow-2xl active:scale-90 transition-transform"
                >
                  <ChevronRight size={32} />
                </button>
              </>
            )}

            <div 
              ref={heroRef}
              onScroll={() => handleScroll(heroRef, setActiveHeroIdx, baseHeroServices.length, 0.8)}
              className="relative z-10 w-full flex overflow-x-auto pt-12 custom-scrollbar-hide snap-x snap-mandatory md:overflow-visible md:flex-row md:items-center md:justify-center md:gap-4 px-[10vw] md:px-0"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {(isMobile ? infiniteHeroServices : baseHeroServices).map((service, idx) => {
                const isActive = isMobile ? activeHeroIdx === idx : hoveredIdx === idx;
                const showBadge = !!service.badge;
                
                // Inclinação em leque para desktop baseada na posição central
                // idx 0 -> -3deg, idx 1 -> 0deg, idx 2 -> 3deg
                const desktopRotate = !isMobile ? (idx - 1) * 3 : 0;

                return (
                  <div
                    key={`${service.id}-${idx}`}
                    onMouseEnter={() => !isMobile && setHoveredIdx(idx)}
                    onMouseLeave={() => !isMobile && setHoveredIdx(null)}
                    onClick={() => navigate('/agendar')}
                    className={`relative shrink-0 snap-center transition-all duration-500 ease-out origin-center will-change-transform
                      cursor-pointer
                      ${isMobile ? 'w-[80vw]' : 'w-80'} 
                      ${isMobile && !isActive ? 'opacity-30 scale-[0.85] blur-[1px]' : 'opacity-100 scale-100'}
                      ${!isMobile ? 'hover:rotate-0 hover:-translate-y-2' : ''}
                    `}
                    style={{ 
                      zIndex: isActive ? 50 : 10,
                      transform: !isMobile ? `rotate(${isActive ? 0 : desktopRotate}deg)` : undefined
                    }}
                  >
                    {showBadge && (
                      <div className={`absolute -top-10 left-0 right-0 z-[100] flex justify-center transition-all duration-500 animate-in zoom-in fade-in ${isActive ? 'scale-110' : 'scale-100'}`}>
                        <div className={`bg-gold text-deep-purple px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.3em] shadow-2xl border border-white/20 whitespace-nowrap transition-all duration-500 ${isActive ? 'animate-pulse shadow-[0_0_20px_rgba(212,175,55,0.4)]' : 'shadow-black/40'}`}>
                          {service.badge}
                        </div>
                      </div>
                    )}
                    <div className={`relative w-full aspect-[2/3.3] rounded-[2.5rem] overflow-hidden border-2 transition-all duration-700 shadow-2xl bg-[#0d0517] ${isActive ? 'brightness-110' : 'brightness-75'}`}
                        style={{ borderColor: isActive ? 'rgba(212,175,55,0.5)' : 'rgba(157,80,187,0.1)' }}>
                      <img 
                        src={service.image} 
                        alt={service.name} 
                        className={`w-full h-full object-cover transition-all duration-1000 
                          ${isActive ? 'grayscale-0' : 'grayscale-[40%]'}
                          ${!isMobile ? 'scale-[1.05]' : 'scale-100'}
                          ${!isMobile && isActive ? 'scale-[1.15]' : ''}
                        `} 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0517] via-[#0d0517]/40 to-transparent"></div>
                      <div className="absolute bottom-0 inset-x-0 p-8 flex flex-col items-center text-center pointer-events-none">
                        <div className={`w-full transition-all duration-500 transform ${isActive ? '-translate-y-6' : 'translate-y-0'}`}>
                          <h3 className={`serif text-2xl md:text-3xl font-bold ${isActive ? 'text-gold' : 'text-white'}`}>{service.name}</h3>
                          <div className={`mt-4 transition-all duration-500 ${isActive ? 'opacity-100 max-h-48' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                            <p className="text-[11px] text-gray-300 font-light leading-relaxed line-clamp-5 px-1">{service.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <MysticDivider />

      {/* CONHEÇA OS JOGOS: Carrossel Mobile Otimizado (Lista Base Única com Wrap) */}
      <section className="py-20 md:py-32 px-0 bg-black/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-0">
          <div className="text-center mb-10 md:mb-20 space-y-4 px-4">
             <h2 className="serif text-3xl md:text-6xl text-white text-center">Conheça os <span className="text-gold italic">Jogos</span></h2>
             <p className="text-gray-500 tracking-[0.2em] md:tracking-[0.4em] uppercase text-[9px] md:text-[10px] font-black text-center">Explore a sabedoria contida em cada oráculo</p>
          </div>

          <div className="relative w-full">
            {isMobile && (
              <>
                <button 
                  onClick={() => scrollStep(catalogRef, 'left', 0.75, previewServices.length)} 
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-[100] w-14 h-14 bg-[#1a0b2e]/90 backdrop-blur-xl rounded-full flex items-center justify-center text-gold border border-gold/40 shadow-2xl active:scale-90 transition-transform"
                >
                  <ChevronLeft size={28} />
                </button>
                <button 
                  onClick={() => scrollStep(catalogRef, 'right', 0.75, previewServices.length)} 
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-[100] w-14 h-14 bg-[#1a0b2e]/90 backdrop-blur-xl rounded-full flex items-center justify-center text-gold border border-gold/40 shadow-2xl active:scale-90 transition-transform"
                >
                  <ChevronRight size={28} />
                </button>
              </>
            )}

            <div 
              ref={catalogRef}
              onScroll={() => handleScroll(catalogRef, setActiveCatalogIdx, previewServices.length, 0.75)}
              className={`relative z-10 w-full flex overflow-x-auto custom-scrollbar-hide snap-x snap-mandatory px-[12.5vw] md:grid md:grid-cols-4 md:gap-8 md:px-4 md:overflow-visible`}
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {previewServices.map((game, idx) => {
                const isActiveMobile = isMobile && activeCatalogIdx === idx;
                
                return (
                  <div 
                    key={`${game.id}-${idx}`}
                    onMouseEnter={() => !isMobile && setHoveredPreviewIdx(idx)}
                    onMouseLeave={() => !isMobile && setHoveredPreviewIdx(null)}
                    onClick={() => navigate('/agendar')}
                    className={`relative shrink-0 group transition-all duration-500 ease-out origin-center will-change-transform
                      cursor-pointer
                      ${isMobile ? 'w-[75vw] snap-center' : 'w-full'}
                      ${isMobile ? (isActiveMobile ? 'opacity-100 scale-100 brightness-110' : 'opacity-40 scale-[0.9] blur-[1px] brightness-75') : 'opacity-100'}
                    `}
                    style={{ zIndex: isActiveMobile || (!isMobile && hoveredPreviewIdx === idx) ? 50 : 1 }}
                  >
                    <div className={`relative bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden transition-all duration-700 shadow-xl 
                      ${isActiveMobile || (!isMobile && hoveredPreviewIdx === idx) ? 'border-gold/40' : 'md:group-hover:border-gold/30'}`}
                    >
                      <div className="aspect-[4/5] overflow-hidden">
                        <img src={game.image} alt={game.name} className={`w-full h-full object-cover transition-all duration-700 ${isMobile && !isActiveMobile ? 'grayscale-[60%]' : 'grayscale-0 group-hover:scale-110'}`} />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1a0b2e] via-[#1a0b2e]/30 to-transparent"></div>
                      <div className="absolute bottom-0 inset-x-0 p-6 md:p-8 flex flex-col items-center text-center pointer-events-none">
                        <div className={`w-full transition-transform duration-500 ${isActiveMobile || (!isMobile && hoveredPreviewIdx === idx) ? '-translate-y-2' : 'translate-y-0'}`}>
                          <h4 className={`serif text-base md:text-xl mb-3 transition-colors ${isActiveMobile || (!isMobile && hoveredPreviewIdx === idx) ? 'text-gold' : 'text-white'}`}>{game.name}</h4>
                          <div className={`flex items-center justify-center space-x-2 text-[8px] font-black text-purple-400 uppercase tracking-widest transition-opacity duration-500 ${(isMobile && isActiveMobile) || (!isMobile && hoveredPreviewIdx === idx) ? 'opacity-100' : 'opacity-0'}`}>
                            <Eye size={12} />
                            <span>Explorar Oráculo</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {isMobile && (
              <div className="flex justify-center space-x-2 mt-8">
                {previewServices.map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => forceScrollToIdx(catalogRef, i, 0.75)} 
                    className={`h-1 rounded-full transition-all duration-500 ${activeCatalogIdx === i ? 'w-8 bg-gold' : 'w-1.5 bg-white/10'}`} 
                  />
                ))}
              </div>
            )}
          </div>

          <div className="mt-16 md:mt-20 text-center px-4">
            <Link to="/jogos" className="inline-flex items-center space-x-4 px-10 md:px-12 py-4 md:py-5 bg-white/5 border border-white/10 rounded-full text-white text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] hover:bg-white/10 transition-all hover:scale-105 active:scale-95 shadow-xl text-center">
              <span>Acessar Todos os Jogos</span>
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <MysticDivider />

      {/* EXPERIENCE SECTION */}
      <section className="relative py-24 md:py-32 px-4 bg-[#0d0517] overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 bg-[linear-gradient(45deg,transparent_25%,rgba(157,80,187,0.05)_50%,transparent_75%)] bg-[length:200%_200%] animate-pulse"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 md:gap-24 items-center">
          <div className="relative group hidden lg:flex items-center justify-center h-[600px]">
            <div className="absolute w-[450px] h-[450px] bg-purple-600/5 rounded-full blur-[120px] animate-pulse"></div>
            <div className="relative w-64 h-96 transition-all duration-1000 group-hover:translate-y-[-10px]">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute inset-0 w-full h-full rounded-[2rem] border border-gold/40 bg-[#1a0b2e] shadow-2xl transition-all duration-700 ease-out flex flex-col items-center justify-center p-6 overflow-hidden"
                  style={{ transform: `rotate(${(i - 2) * 6}deg) translateX(${(i - 2) * 10}px)`, zIndex: 10 + i } as any}
                >
                  <div className="relative flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold shadow-lg transition-all duration-500">
                      {i === 0 && <Shield size={22} />}
                      {i === 1 && <Navigation size={22} />}
                      {i === 2 && <Moon size={22} className="fill-gold/40 text-gold" strokeWidth={1.5} />}
                      {i === 3 && <Eye size={22} />}
                      {i === 4 && <Sparkles size={22} />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-12 md:space-y-16 animate-in slide-in-from-right-12 duration-1000 text-center lg:text-left">
            <div className="space-y-6">
              <span className="text-gold text-[10px] font-black tracking-[0.5em] md:tracking-[0.6em] uppercase block mb-4 text-center lg:text-left">A Jornada na PMC</span>
              <h2 className="serif text-4xl md:text-7xl text-white leading-tight text-center lg:text-left">Mais que cartas. <br /><span className="text-purple-400 italic">Direcionamento.</span></h2>
              <p className="text-gray-400 text-base md:text-xl font-light leading-relaxed max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
                Na PMC Cartomancia, cada leitura é conduzida com responsabilidade espiritual, sensibilidade e ética absoluta. Unimos a sabedoria ancestral aos caminhos do presente para te dar as chaves do seu futuro.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: ShieldCheck, title: "Atendimento Reservado", desc: "Sua privacidade é sagrada e protegida sob sigilo absoluto em todas as sessões." },
                { icon: Clock, title: "Tempo Dedicado", desc: "Sessões pontuais, profundas e sem pressa, respeitando o seu momento de conexão." },
                { icon: FileText, title: "Orientações Pós-Consulta", desc: "Receba resumos, indicações de banhos ou conselhos práticos para sua caminhada." },
                { icon: Moon, title: "Ética & Sensibilidade", desc: "Um ambiente de acolhimento real, livre de julgamentos e pautado na verdade espiritual." }
              ].map((item, i) => (
                <div key={i} className="group p-6 bg-white/5 border border-white/5 rounded-3xl hover:border-purple-500/30 hover:bg-white/10 transition-all duration-500 hover:shadow-[0_0_30px_rgba(157,80,187,0.1)] text-left">
                  <item.icon className="text-gold mb-4 group-hover:scale-110 transition-transform" size={28} />
                  <h4 className="text-white font-bold mb-2">{item.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed font-light">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-8">
              <button 
                onClick={() => navigate('/agendar')}
                className="w-full sm:w-auto px-10 md:px-12 py-4 md:py-5 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-full font-black text-[10px] md:text-xs uppercase tracking-[0.2em] hover:from-purple-500 hover:to-purple-400 transition-all shadow-[0_10px_30px_rgba(157,80,187,0.3)] border border-purple-400/20 active:scale-95 flex items-center justify-center space-x-3 group text-center"
              >
                <span>Agendar meu jogo agora</span>
                <Sparkles size={16} className="group-hover:rotate-12 transition-transform" />
              </button>
              <Link to="/jogos" className="w-full sm:w-auto px-10 md:px-12 py-4 md:py-5 bg-white/5 border border-white/10 text-white rounded-full font-black text-[10px] md:text-xs uppercase tracking-[0.2em] hover:bg-white/10 transition-all hover:border-gold/30 text-center">
                Explorar Catálogo
              </Link>
            </div>
          </div>
        </div>
      </section>

      <MysticDivider />
    </div>
  );
};

export default LandingPage;