import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, 
  Play, 
  HelpCircle, 
  ArrowRight, 
  MessageCircle, 
  Mail, 
  Clock, 
  Sparkles,
  BookOpen,
  Award,
  Video,
  Users,
  ShieldCheck,
  TrendingUp,
  Gift,
  Zap,
  Flame,
  Moon,
  Calendar
} from 'lucide-react';

const CoursePage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [cosmicDust, setCosmicDust] = useState<{ id: number; x: number; y: number; color: string }[]>([]);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const HERO_IMAGE = "https://img.freepik.com/free-photo/mysterious-woman-holding-candle_23-2148118835.jpg";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLoading]);

  useEffect(() => {
    // Preload critical assets
    const preloadImage = new Image();
    preloadImage.src = HERO_IMAGE;

    const minimumDelay = new Promise(resolve => setTimeout(resolve, 2500));
    const imageLoad = new Promise(resolve => {
      preloadImage.onload = resolve;
      preloadImage.onerror = resolve; // Continue anyway on error
    });

    // Wait for both the mystic experience and the content to be ready
    Promise.all([minimumDelay, imageLoad]).then(() => {
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    const launchDate = new Date('2026-05-24T00:00:00').getTime();
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate - now;
      
      if (distance < 0) {
        clearInterval(timer);
        return;
      }
      
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleMoonClick = () => {
    const newDust = Array.from({ length: 12 }).map(() => ({
      id: Math.random(),
      x: (Math.random() - 0.5) * 300,
      y: (Math.random() - 0.5) * 300,
      color: Math.random() > 0.5 ? '#d4af37' : '#9d50bb'
    }));
    setCosmicDust(prev => [...prev.slice(-30), ...newDust]);
  };

  const benefits = [
    { title: "Domínio Absoluto", desc: "Aprenda os significados e todas as junções das 36 cartas sem decoreba." },
    { title: "Prática Real", desc: "Resolução de consultas reais passo a passo para ganhar segurança." },
    { title: "Mesa Real", desc: "O método mais antigo e completo para previsões de longo prazo." },
    { title: "Assertividade", desc: "Alcançar a fluidez necessária para prever com precisão cirúrgica." },
    { title: "Suporte Dedicado", desc: "Acompanhamento exclusivo durante 6 meses para tirar todas as suas dúvidas enquanto realiza o santuário." }
  ];

  const faqs = [
    {
      question: "Quando será o lançamento?",
      answer: "O lançamento oficial será no dia 24/05."
    },
    {
      question: "Como funciona o acesso?",
      answer: "Após o lançamento, você receberá o acesso imediato por e-mail. Assista onde e quando quiser, além das aulas AO VIVO programadas para tirar dúvidas."
    },
    {
      question: "Preciso ter o dom ou saber o básico?",
      answer: "O verdadeiro dom é ter um bom coração! A cartomancia é um método que une técnica e dedicação. Aqui você aprenderá tudo do absoluto zero, desde os fundamentos até o nível profissional."
    },
    {
      question: "Vou ter suporte se comprar o Santuário?",
      answer: "Sim! Você terá suporte individual e dedicado durante 6 meses ou enquanto durar a realização do seu santuário, via WhatsApp e e-mail."
    }
  ];

  const CTA_URL = "#";

  return (
    <div className="relative min-h-screen bg-[#0a0510] overflow-x-hidden">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="mystic-loader"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              scale: 1.1,
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed inset-0 z-[3000] bg-[#050208] flex items-center justify-center overflow-hidden"
          >
            {/* Nebulous Dust / Cosmic Clouds - Simplified blur for performance */}
            <div className="absolute inset-0 z-0">
              <motion.div 
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-[10%] -left-[10%] w-full h-full bg-[radial-gradient(circle,rgba(59,7,100,0.3)_0%,transparent_70%)] blur-[60px] will-change-transform"
              />
              <motion.div 
                animate={{ 
                  scale: [1.1, 1, 1.1],
                  opacity: [0.15, 0.3, 0.15],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-[10%] -right-[10%] w-full h-full bg-[radial-gradient(circle,rgba(30,27,75,0.3)_0%,transparent_70%)] blur-[60px] will-change-transform"
              />
            </div>

            {/* Galaxy Spiral (Portal effect) - Static rotation is fine */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute w-[800px] h-[800px] opacity-10 pointer-events-none will-change-transform"
            >
              <svg viewBox="0 0 200 200" className="w-full h-full text-purple-500">
                <defs>
                  <radialGradient id="spiralGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="currentColor" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <path 
                  fill="none"
                  stroke="url(#spiralGrad)"
                  strokeWidth="0.4"
                  d="M100,100 C150,150 200,50 150,0 C100,50 50,100 0,150"
                  className="opacity-40"
                />
              </svg>
            </motion.div>

            {/* Shooting Stars - Reduced frequency */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`shooting-${i}`}
                initial={{ x: "-100%", y: `${25 + i * 25}%`, opacity: 0 }}
                animate={{ 
                  x: "200%", 
                  opacity: [0, 0.8, 0] 
                }}
                transition={{ 
                  duration: 1.2 + Math.random(), 
                  delay: 3 + i * 4, 
                  repeat: Infinity,
                  repeatDelay: 5 + Math.random() * 5
                }}
                className="absolute w-24 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent rotate-[-20deg] z-0 pointer-events-none"
              />
            ))}

            {/* Supernova / Explosion Flash - Simplified */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1.1, 1],
                opacity: [0, 0.8, 0.6],
              }}
              transition={{ duration: 2.5, ease: "easeOut" }}
              className="absolute w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(157,80,187,0.2)_0%,transparent_70%)] blur-[40px] z-0 will-change-transform"
            />
            
            {/* Explosive Particles - Optimized for visibility and performance */}
            <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
              {[...Array(40)].map((_, i) => {
                const angle = (Math.PI * 2 * i) / 40 + (Math.random() - 0.5) * 0.3;
                const distance = 250 + Math.random() * 450;
                const size = 3 + Math.random() * 4; // Increased size (3px to 7px)
                return (
                  <motion.div
                    key={`p-${i}`}
                    style={{ 
                      willChange: "transform",
                      width: size, 
                      height: size,
                      filter: i % 4 === 0 ? "blur(1px)" : "none" // Subtle blur for some particles
                    }}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                    animate={{ 
                      x: Math.cos(angle) * distance,
                      y: Math.sin(angle) * distance,
                      opacity: [1, 0.8, 0],
                      scale: [1, 1.2, 0.2],
                    }}
                    transition={{ 
                      duration: 1.2 + Math.random() * 1,
                      repeat: Infinity,
                      repeatDelay: Math.random() * 0.4,
                      ease: "easeOut"
                    }}
                    className={`absolute left-1/2 top-1/2 rounded-full ${
                      i % 3 === 0 ? 'bg-gold shadow-[0_0_8px_rgba(212,175,55,0.6)]' : 
                      i % 2 === 0 ? 'bg-purple-300 shadow-[0_0_8px_rgba(168,85,247,0.6)]' : 
                      'bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)]'
                    }`}
                  />
                );
              })}
            </div>

            {/* Central Core */}
            <div className="relative z-30 flex flex-col items-center">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ 
                  scale: [0, 1.2, 1],
                  rotate: 0,
                }}
                whileTap={{ scale: 0.9 }}
                onClick={handleMoonClick}
                transition={{ duration: 1.5, ease: "backOut" }}
                className="w-28 h-28 bg-gradient-to-tr from-purple-800 to-indigo-950 rounded-full flex items-center justify-center text-gold relative border border-gold/50 shadow-[0_0_30px_rgba(212,175,55,0.4)] cursor-pointer select-none"
              >
                <div className="relative z-10">
                  <Moon size={46} className="drop-shadow-[0_0_15px_rgba(212,175,55,1)]" />
                </div>

                {/* Interactive Cosmic Dust */}
                <AnimatePresence>
                  {cosmicDust.map((dust) => (
                    <motion.div
                      key={dust.id}
                      initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                      animate={{ x: dust.x, y: dust.y, opacity: 0, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="absolute w-1 h-1 rounded-full blur-[1px]"
                      style={{ backgroundColor: dust.color, boxShadow: `0 0 8px ${dust.color}` }}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-10 text-center"
              >
                <h2 className="serif text-3xl md:text-4xl text-white font-bold italic tracking-[0.2em] mb-2">
                  O Segredo se Revela
                </h2>
                <div className="flex items-center justify-center space-x-2">
                  <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-gold"></div>
                  <Sparkles size={16} className="text-gold animate-spin-slow" />
                  <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-gold"></div>
                </div>
              </motion.div>
            </div>

            {/* Distant Stars (Reduced count for perf) */}
            <div className="absolute inset-0 z-0">
              {[...Array(20)].map((_, i) => (
                <div
                  key={`star-${i}`}
                  className="absolute w-[2px] h-[2px] bg-white rounded-full opacity-20"
                  style={{ top: `${Math.random()*100}%`, left: `${Math.random()*100}%` }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        key="course-content"
        initial={false}
        animate={{ 
          opacity: isLoading ? 0 : 1,
          scale: isLoading ? 0.99 : 1,
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`bg-mystic-texture min-h-screen text-white selection:bg-gold/30 ${isLoading ? 'fixed inset-0 pointer-events-none translate-z-0' : 'relative translate-z-0'}`}
      >
        {/* Hero Section */}
          <section className="relative pt-14 md:pt-28 pb-20 px-4 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-[radial-gradient(circle_at_center,rgba(157,80,187,0.2)_0%,transparent_70%)] pointer-events-none"></div>
        <div className="max-w-5xl mx-auto text-center space-y-10 relative">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              boxShadow: [
                "0 0 0px rgba(212,175,55,0)",
                "0 0 20px rgba(212,175,55,0.2)",
                "0 0 0px rgba(212,175,55,0)"
              ]
            }}
            transition={{ 
              duration: 2,
              boxShadow: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            className="inline-flex items-center space-x-3 px-8 py-3 bg-purple-950/80 backdrop-blur-2xl border border-gold/40 rounded-full text-gold text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-4 cursor-default shadow-[0_0_15px_rgba(212,175,55,0.15)]"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            >
              <Zap size={16} className="text-gold" />
            </motion.div>
            <span className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] text-white">Prepare-se para o <span className="text-gold font-black">Grande Dia</span></span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 50, delay: 0.2 }}
            className="serif text-5xl md:text-8xl font-bold italic leading-[1] tracking-tighter"
          >
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="inline-block"
            >
              O MISTÉRIO É O CHAMADO.
            </motion.span> 
            <br />
            <motion.span 
              initial={{ opacity: 0, scale: 0.9, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.6, type: "spring" }}
              className="text-purple-400 serif italic text-4xl md:text-7xl mt-4 block"
            >
              O MÉTODO É A MAESTRIA.
            </motion.span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-gray-300 text-xl md:text-3xl max-w-2xl mx-auto font-light leading-tight italic"
          >
            "Sua jornada da intuição à maestria profissional."
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, type: "spring" }}
            className="flex flex-col items-center pt-10 space-y-6"
          >
            <motion.div 
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white/5 border border-white/10 p-10 rounded-[3rem] w-full max-w-lg backdrop-blur-2xl shadow-[0_30px_100px_rgba(0,0,0,0.5)] relative overflow-hidden group border-t-purple-500/30 cursor-pointer"
            >
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-30 transition-all duration-700 transform group-hover:rotate-[30deg] group-hover:scale-150">
                <Calendar size={120} />
              </div>
              <div className="space-y-6">
                <div className="flex flex-col items-center">
                  <h3 className="serif text-3xl font-bold text-gold group-hover:tracking-wider transition-all duration-500 italic">Lançamento em Breve</h3>
                  <p className="text-gray-400 text-sm mt-2 uppercase tracking-widest font-bold">24 de Maio</p>
                </div>
              </div>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.4em] flex items-center space-x-2"
            >
              <ShieldCheck size={14} className="text-green-500" />
              <span>Garantia de Qualidade Cigana Soraya • Compra Segura</span>
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Proof Section (Authority) */}
      <section className="py-24 px-4 bg-black/40 border-y border-white/5 overflow-hidden">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 space-y-8"
          >
            <h2 className="serif text-4xl md:text-5xl font-bold leading-tight">
              Por que aprender <br/>
              <motion.span 
                initial={{ opacity: 0 }} 
                whileInView={{ opacity: 1 }} 
                transition={{ delay: 0.5 }} 
                className="text-gold italic inline-block"
              >
                comigo?
              </motion.span>
            </h2>
            <div className="space-y-6 text-gray-400 font-light text-lg italic leading-relaxed">
              <p>"Sou dedicada inteiramente aos oráculos e à espiritualidade. Meu método não é apenas teoria, é o resultado de milhares de consultas reais e uma conexão profunda com a sabedoria cigana."</p>
              <p>Eu acredito que a cartomancia pode ser uma ponte para a clareza e prosperidade. Meu objetivo é te dar a autonomia para guiar sua vida e auxiliar a vida dos outros com ética e verdade.</p>
            </div>
            <div className="flex items-center gap-10">
              <motion.div 
                whileHover={{ scale: 1.1, color: "#fff" }}
                className="text-center transition-colors"
              >
                <p className="text-3xl font-black text-white">1k+</p>
                <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Alunos</p>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.1, color: "#fff" }}
                className="text-center transition-colors"
              >
                <p className="text-3xl font-black text-white">9 anos</p>
                <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Experiência</p>
              </motion.div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 relative"
          >
             <div className="absolute -inset-4 bg-gold/10 rounded-[4rem] blur-3xl animate-pulse"></div>
             <motion.img 
               whileHover={{ 
                 scale: 1.02,
                 rotate: 1,
                 filter: "grayscale(0%)"
               }}
               src="https://storage.googleapis.com/www.ciganasoraya.com/public/santuario-hero.jpeg" 
               alt="Soraya" 
               referrerPolicy="no-referrer"
               className="relative z-10 w-full rounded-[3.5rem] border border-white/10 shadow-2xl grayscale-[30%] transition-all duration-700"
             />
          </motion.div>
        </div>
      </section>

      {/* Benefits Section (Mastery) */}
      <section className="py-24 px-4 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent relative overflow-hidden">
        {/* Magic Particles Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 0.3, 0], 
                scale: [0, 1, 0.5],
                x: [0, (i % 2 === 0 ? 100 : -100), 0],
                y: [0, (i % 3 === 0 ? -100 : 100), 0]
              }}
              transition={{ 
                duration: 10 + i * 2, 
                repeat: Infinity, 
                ease: "linear",
                delay: i * 1.5 
              }}
              className="absolute w-64 h-64 bg-purple-500/10 rounded-full blur-[80px]"
              style={{ 
                left: `${15 + i * 15}%`, 
                top: `${20 + (i % 4) * 15}%` 
              }}
            />
          ))}
        </div>

        <div className="max-w-6xl mx-auto space-y-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center space-y-4 mb-20 bg-white/5 border border-white/10 p-8 rounded-[3rem] backdrop-blur-xl shadow-2xl relative group overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gold/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-12">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gold/10 text-gold rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
                  <Calendar size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gold/60">Lançamento Oficial</p>
                  <p className="text-2xl font-bold text-white italic">24 de Maio</p>
                </div>
              </div>

              <div className="hidden md:block h-12 w-[1px] bg-white/10"></div>

              <div className="flex flex-col items-center">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-300/60 mb-2">Contagem Regressiva</p>
                <div className="flex items-center space-x-5">
                  <div className="flex flex-col items-center min-w-[50px]">
                    <span className="text-3xl font-black text-white">{timeLeft.days}</span>
                    <span className="text-[9px] font-bold text-gold/40 uppercase">Dias</span>
                  </div>
                  <span className="text-white/20 font-black mb-4 text-xl">:</span>
                  <div className="flex flex-col items-center min-w-[50px]">
                    <span className="text-3xl font-black text-white">{String(timeLeft.hours).padStart(2, '0')}</span>
                    <span className="text-[9px] font-bold text-gold/40 uppercase">Hrs</span>
                  </div>
                  <span className="text-white/20 font-black mb-4 text-xl">:</span>
                  <div className="flex flex-col items-center min-w-[50px]">
                    <span className="text-3xl font-black text-white">{String(timeLeft.minutes).padStart(2, '0')}</span>
                    <span className="text-[9px] font-bold text-gold/40 uppercase">Min</span>
                  </div>
                  <span className="text-white/20 font-black mb-4 text-xl">:</span>
                  <div className="flex flex-col items-center min-w-[50px]">
                    <span className="text-3xl font-black text-gold animate-pulse">{String(timeLeft.seconds).padStart(2, '0')}</span>
                    <span className="text-[9px] font-bold text-gold/40 uppercase">Seg</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="text-center space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="flex justify-center mb-4"
            >
              <Moon size={40} className="text-gold/40 animate-pulse" />
            </motion.div>
            <h2 className="serif text-4xl md:text-6xl font-bold italic">O que você vai <span className="text-gold">dominar</span></h2>
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.5em]">A estrutura da sua evolução profissional</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
            {/* 1. Domínio Absoluto */}
            <motion.div 
              whileHover={{ 
                y: -15, 
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(168, 85, 247, 0.2)" 
              }}
              className="md:col-span-3 bg-white/5 p-8 rounded-[2.5rem] border border-white/5 hover:border-purple-500/50 hover:bg-white/10 transition-colors duration-500 flex flex-col justify-between group overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-purple-500/0 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-30 transition-all duration-700 group-hover:rotate-45 group-hover:scale-125">
                <Sparkles size={80} />
              </div>
              <div className="relative z-10">
                <motion.div 
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className="w-12 h-12 bg-purple-500/10 text-purple-400 rounded-xl flex items-center justify-center mb-6 transition-transform"
                >
                  <BookOpen size={24} />
                </motion.div>
                <h4 className="serif text-2xl font-bold text-white mb-3 italic group-hover:text-gold transition-colors">Domínio Absoluto</h4>
                <p className="text-sm text-gray-400 font-light leading-relaxed">Esqueça a "decoreba". Aprenda a lógica por trás de cada uma das 36 cartas e como elas se comunicam entre si com profundidade.</p>
              </div>
            </motion.div>

            {/* 2. Prática Real */}
            <motion.div 
              whileHover={{ 
                y: -15, 
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(59, 130, 246, 0.2)" 
              }}
              className="md:col-span-3 bg-white/5 p-8 rounded-[2.5rem] border border-white/5 hover:border-blue-500/50 hover:bg-white/10 transition-colors duration-500 flex flex-col justify-between group overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/0 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-30 transition-all duration-700 group-hover:-translate-x-4">
                <Flame size={80} className="text-blue-500" />
              </div>
              <div className="relative z-10">
                <motion.div 
                  whileHover={{ rotate: -10, scale: 1.1 }}
                  className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-xl flex items-center justify-center mb-6 transition-transform"
                >
                  <Video size={24} />
                </motion.div>
                <h4 className="serif text-2xl font-bold text-white mb-3 italic group-hover:text-blue-300 transition-colors">Consultas em Tempo Real</h4>
                <p className="text-sm text-gray-400 font-light leading-relaxed">Assista a análises de casos reais, do embaralhamento à conclusão, para ganhar a segurança que só a prática ensina.</p>
              </div>
            </motion.div>

            {/* 3. Mesa Real (Masterpiece) */}
            <motion.div 
              whileHover={{ 
                y: -20, 
                scale: 1.03,
                boxShadow: "0 30px 70px rgba(212, 175, 55, 0.3)" 
              }}
              className="md:col-span-4 bg-gradient-to-br from-gold/25 via-purple-900/60 to-black/60 p-10 rounded-[3rem] border border-gold/30 hover:border-gold/80 shadow-[0_20px_50px_rgba(212,175,55,0.1)] transition-all duration-500 flex flex-col md:flex-row gap-8 items-center group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"></div>
              <motion.div 
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-20 -bottom-20 opacity-10 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none"
              >
                <Sparkles size={300} className="text-gold" />
              </motion.div>
              <div className="w-20 h-20 bg-gold/20 text-gold rounded-2xl flex items-center justify-center shrink-0 group-hover:rotate-[360deg] group-hover:scale-110 transition-all duration-700 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                <Award size={40} />
              </div>
              <div className="space-y-4 relative z-10 text-left">
                <h4 className="serif text-3xl font-bold text-gold italic leading-none flex items-center gap-3">
                  A Poderosa Mesa Real
                  <span className="inline-block w-2 h-2 bg-gold rounded-full animate-ping"></span>
                </h4>
                <p className="text-gray-200 font-light leading-relaxed text-base group-hover:text-white transition-colors">O método mais completo e antigo da cartomancia. Aprenda a visualizar o panorama completo da vida do consulente — passado, presente e futuro — com uma precisão assustadora.</p>
              </div>
            </motion.div>

            {/* 4. Assertividade */}
            <motion.div 
              whileHover={{ 
                y: -15, 
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(34, 197, 94, 0.2)" 
              }}
              className="md:col-span-2 bg-white/5 p-8 rounded-[2.5rem] border border-white/5 hover:border-green-500/50 hover:bg-white/10 transition-colors duration-500 group overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-20 transition-all duration-700 group-hover:scale-150">
                <TrendingUp size={80} className="text-green-500 transform rotate-12" />
              </div>
              <div className="relative z-10">
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="w-12 h-12 bg-green-500/10 text-green-400 rounded-xl flex items-center justify-center mb-6"
                >
                  <TrendingUp size={24} />
                </motion.div>
                <h4 className="serif text-xl font-bold text-white mb-3 italic group-hover:text-green-300 transition-colors">Foco em Resultados</h4>
                <p className="text-sm text-gray-400 font-light leading-relaxed italic line-clamp-3">Alcançar a fluidez necessária para prever detalhes que impressionam e fidelizam consulentes.</p>
              </div>
            </motion.div>

            {/* 5. Suporte */}
            <motion.div 
              whileHover={{ 
                y: -10,
                scale: 1.01,
                boxShadow: "0 20px 50px rgba(168, 85, 247, 0.2)"
              }}
              className="md:col-span-6 bg-gradient-to-r from-purple-900/40 via-indigo-900/40 to-purple-900/40 border border-purple-500/30 p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-6 hover:border-gold/50 transition-all duration-500 border-dashed relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex items-center space-x-6 relative z-10">
                <div className="w-14 h-14 bg-purple-500/20 text-purple-400 rounded-full flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                  <Users size={28} />
                </div>
                <div>
                  <h4 className="serif text-xl font-bold text-white italic">Suporte Individual e Dedicado</h4>
                  <p className="text-sm text-purple-300/60 font-light max-w-xl">Acompanhamento exclusivo durante 6 meses para tirar todas as suas dúvidas enquanto você mergulha no método.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Oracles Taught Section */}
      <section className="py-24 px-4 overflow-hidden bg-black/20">
        <div className="max-w-6xl mx-auto space-y-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4"
          >
            <h2 className="serif text-4xl md:text-5xl font-bold italic underline decoration-gold/30 underline-offset-8">A Trindade dos <span className="text-purple-400 not-italic">Oráculos</span></h2>
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.5em]">O que você irá dominar neste Santuário</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                name: "Tarô Clássico", 
                desc: "A jornada arquetípica dos 78 arcanos. Aprenda a ler o destino através da simbologia universal e profunda.",
                icon: BookOpen,
                color: "text-purple-400"
              },
              { 
                name: "Baralho Cigano", 
                desc: "A magia do Petit Lenormand. Foco em respostas diretas, objetividade e clareza para questões do cotidiano.",
                icon: Moon,
                color: "text-gold"
              },
              { 
                name: "Sibila Italiana", 
                desc: "O oráculo dos segredos sociais e detalhes mundanos. Descubra as entrelinhas e as fofocas do destino.",
                icon: Sparkles,
                color: "text-blue-400"
              }
            ].map((oracle, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.2, type: "spring" }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white/5 p-10 rounded-[3.5rem] border border-white/5 space-y-6 relative group cursor-default h-full flex flex-col items-center justify-center text-center"
              >
                <div className={`p-6 rounded-3xl bg-white/5 ${oracle.color} border border-white/10 group-hover:scale-110 transition-transform duration-500 shadow-xl`}>
                  <oracle.icon size={40} />
                </div>
                <div className="space-y-4">
                  <h4 className="serif text-3xl font-bold text-white italic group-hover:text-gold transition-colors">{oracle.name}</h4>
                  <p className="text-gray-400 font-light leading-relaxed italic">{oracle.desc}</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[3.5rem] pointer-events-none"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="pt-24 pb-16 px-4 relative">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", bounce: 0.4, duration: 1 }}
          className="max-w-3xl mx-auto bg-gradient-to-br from-[#1a0b2e] to-[#2d144d] border border-gold/30 p-12 md:p-20 rounded-[4rem] text-center space-y-8 shadow-[0_0_100px_rgba(212,175,55,0.2)] relative overflow-hidden group"
        >
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-gold/5 blur-3xl animate-pulse"></div>
          <motion.div
            animate={{ 
              rotateY: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          >
            <Award size={80} className="text-gold mx-auto drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]" />
          </motion.div>
          <div className="space-y-4">
            <motion.h2 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="serif text-3xl md:text-5xl font-bold text-white uppercase tracking-tighter"
            >
              SUA MAESTRIA PROTEGIDA.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-gray-400 font-light text-lg italic leading-relaxed"
            >
              "Experimente o método por 7 dias. Se você não sentir a clareza e o poder da transformação, devolvemos 100% do seu investimento. O compromisso é com a sua evolução."
            </motion.p>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000"></div>
        </motion.div>
      </section>

      {/* FAQ */}
      <section className="pt-8 pb-12 px-4 max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="serif text-4xl font-bold italic">Perguntas Frequentes</h2>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.5em]">Tire todas as suas dúvidas</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 hover:bg-white/10 transition-all space-y-4">
              <h4 className="font-bold text-white flex items-center space-x-3 text-sm">
                <HelpCircle size={20} className="text-gold shrink-0" />
                <span>{faq.question}</span>
              </h4>
              <p className="text-gray-500 text-xs font-light leading-relaxed italic">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Last CTA Section */}
      <section className="py-12 px-4 bg-gradient-to-t from-black to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline removed per user request */}
        </div>
      </section>
      </motion.div>
    </div>
  );
};

export default CoursePage;
