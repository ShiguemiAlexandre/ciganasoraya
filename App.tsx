import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HashRouter, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { 
  Calendar, 
  User as UserIcon, 
  LogOut, 
  Menu, 
  X, 
  ChevronRight, 
  Clock, 
  MessageSquare, 
  ShieldCheck,
  Sparkles,
  Moon,
  Library,
  Settings
} from 'lucide-react';
import { User, Appointment } from './types';
import { SERVICES } from './constants';
import LandingPage from './pages/LandingPage';
import BookingPage from './pages/BookingPage';
import CatalogPage from './pages/CatalogPage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import AboutPage from './pages/AboutPage';
import CoursePage from './pages/CoursePage';
import CookieConsent from './components/CookieConsent';

const UrgencyBar = () => {
  const location = useLocation();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const showBar = location.pathname === '/' || location.pathname === '/curso';

  useEffect(() => {
    if (!showBar) return;
    
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
  }, [showBar]);

  if (!showBar) return null;

  return (
    <div className="relative w-full z-[900] bg-[#1a0b2e] backdrop-blur-xl border-b border-purple-500/10 py-2 md:py-2.5 px-4 transition-all duration-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center items-center space-y-1 md:space-y-0 md:space-x-12">
        <div className="flex items-center space-x-3 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-white text-center md:text-left leading-tight">
          <Sparkles size={14} className="animate-pulse text-gold hidden sm:block" />
          <span className="text-gold">Lançamento Oficial:</span>
          <span className="text-white">24 de Maio</span>
        </div>
        <div className="flex items-center space-x-6">
          <span className="text-[9px] font-bold uppercase tracking-widest text-purple-300/60 hidden md:inline">Contagem Regressiva:</span>
          <div className="flex space-x-4 md:space-x-4 font-mono text-xs md:text-base font-black text-white">
            <div className="flex flex-col items-center"><span className="text-gold">{timeLeft.days}</span><span className="text-[7px] md:text-[8px] opacity-40 -mt-1">DIAS</span></div>
            <div className="flex flex-col items-center"><span className="text-gold">{String(timeLeft.hours).padStart(2, '0')}</span><span className="text-[7px] md:text-[8px] opacity-40 -mt-1">HRS</span></div>
            <div className="flex flex-col items-center"><span className="text-gold">{String(timeLeft.minutes).padStart(2, '0')}</span><span className="text-[7px] md:text-[8px] opacity-40 -mt-1">MIN</span></div>
            <div className="flex flex-col items-center"><span className="text-gold">{String(timeLeft.seconds).padStart(2, '0')}</span><span className="text-[7px] md:text-[8px] opacity-40 -mt-1">SEG</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProtectedRoute = ({ user, children, adminOnly = false }: { user: User | null, children?: React.ReactNode, adminOnly?: boolean }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};
const NavigationContent = ({ user, handleLogout, isMenuOpen, setIsMenuOpen }: any) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const isAdminView = location.pathname === '/admin';

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  if (isAdminView) return null;

  return (
    <nav className="relative z-[1001] bg-[#1a0b2e]/90 backdrop-blur-xl border-b border-purple-500/10 px-4 py-4 md:px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center relative z-[1001]">
        <Link to="/" className="flex items-center space-x-3 group">
          <motion.div 
            whileHover="hover"
            className="flex items-center space-x-3"
          >
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-gold shadow-[0_0_15px_rgba(157,80,187,0.6)] relative overflow-visible transition-transform group-hover:scale-105">
              {/* Cosmic Dust Particles - Increased intensity and count */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    backgroundColor: i % 3 === 0 ? '#fff' : '#d4af37',
                    boxShadow: i % 3 === 0 ? '0 0 6px #fff' : '0 0 6px #d4af37',
                    width: '3px',
                    height: '3px',
                    left: '50%',
                    top: '50%',
                  }}
                  initial={{ opacity: 0, x: -1.5, y: -1.5 }}
                  variants={{
                    hover: {
                      x: (Math.cos(i * (360 / 12) * (Math.PI / 180)) * (28 + Math.random() * 15)) - 1.5,
                      y: (Math.sin(i * (360 / 12) * (Math.PI / 180)) * (28 + Math.random() * 15)) - 1.5,
                      opacity: [0, 1, 0.6, 0],
                      scale: [0, 1.4, 0.7, 0],
                      transition: {
                        duration: 1.5 + Math.random() * 1,
                        repeat: Infinity,
                        ease: "easeOut",
                        delay: i * 0.08,
                      }
                    }
                  }}
                />
              ))}
              <Moon size={24} className="relative z-10" />
            </div>
            <div className="flex flex-col">
              <span className="serif font-bold text-xl md:text-2xl leading-tight text-white whitespace-nowrap">Cigana Soraya</span>
            </div>
          </motion.div>
        </Link>
        <div className="hidden md:flex items-center space-x-10 text-[11px] uppercase tracking-[0.2em] font-bold">
          <Link to="/" className={`transition-all duration-300 pb-1 border-b-2 ${isActive('/') ? 'text-white border-[#d4af37]' : 'text-gray-400 border-transparent hover:text-purple-300'}`}>Início</Link>
          <Link to="/jogos" className={`transition-all duration-300 pb-1 border-b-2 ${isActive('/jogos') ? 'text-white border-[#d4af37]' : 'text-gray-400 border-transparent hover:text-purple-300'}`}>Oráculos</Link>
          <Link to="/sobre" className={`transition-all duration-300 pb-1 border-b-2 ${isActive('/sobre') ? 'text-white border-[#d4af37]' : 'text-gray-400 border-transparent hover:text-purple-300'}`}>Sobre</Link>
          <Link to="/curso" className="px-6 py-3 bg-white/5 text-gold rounded-full hover:bg-white/10 transition-all border border-gold/30">Santuário</Link>
          <Link to="/agendar" className="px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-500 transition-all shadow-[0_0_15px_rgba(157,80,187,0.4)] border border-purple-400/20">Agendar Agora</Link>
          
          {user && user.role === 'admin' && (
            <div className="flex items-center space-x-6 border-l border-white/10 pl-10">
              <Link to="/admin" className="flex items-center space-x-2 text-white hover:text-purple-300 transition-colors">
                <Settings size={16} className="text-gold" />
                <span>Painel Admin</span>
              </Link>
              <button onClick={handleLogout} className="text-purple-400 hover:text-purple-300 transition-colors"><LogOut size={16} /></button>
            </div>
          )}
        </div>

        <button className="md:hidden text-purple-400 relative z-[2002] active:scale-95 transition-transform" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={32} className="text-white" /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu - Dropdown Style */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-full left-0 w-full bg-[#0f071a] z-[2000] overflow-hidden border-t border-purple-500/20"
          >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(157,80,187,0.15)_0%,transparent_100%)] pointer-events-none"></div>
            
            <div className="relative flex flex-col p-8 space-y-6">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold tracking-[0.2em] uppercase text-gray-400 hover:text-gold transition-colors flex items-center justify-between group px-2 py-4">
                <span>Início</span>
                <ChevronRight size={18} className="text-gold/20 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/jogos" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold tracking-[0.2em] uppercase text-gray-400 hover:text-gold transition-colors flex items-center justify-between group px-2 py-4">
                <span>Nossos Oráculos</span>
                <ChevronRight size={18} className="text-gold/20 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/sobre" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold tracking-[0.2em] uppercase text-gray-400 hover:text-gold transition-colors flex items-center justify-between group px-2 py-4">
                <span>Quem sou eu</span>
                <ChevronRight size={18} className="text-gold/20 group-hover:translate-x-1 transition-transform" />
              </Link>

              <div className="pt-4 flex flex-col space-y-4">
                {/* Secondary Style for Santuário */}
                <Link 
                  to="/curso" 
                  onClick={() => setIsMenuOpen(false)} 
                  className="w-full flex items-center justify-center space-x-3 px-8 py-5 bg-white/5 border border-gold/30 rounded-2xl text-gold font-black uppercase tracking-[0.2em] text-sm active:scale-95 transition-all shadow-lg"
                >
                  <Sparkles size={18} />
                  <span>Santuário</span>
                </Link>

                {/* Primary Style for Agendar Agora */}
                <Link 
                  to="/agendar" 
                  onClick={() => setIsMenuOpen(false)} 
                  className="w-full flex items-center justify-center space-x-3 px-8 py-5 bg-purple-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-sm active:scale-95 transition-all shadow-[0_10px_25px_rgba(168,85,247,0.4)] border border-purple-400/20"
                >
                  <Sparkles size={18} />
                  <span>Agendar Agora</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const FooterContent = () => {
  const location = useLocation();
  const isAdminView = location.pathname === '/admin';

  if (isAdminView) return null;

  return (
    <footer className="bg-black/40 text-gray-400 py-16 px-4 border-t border-purple-500/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center justify-center md:justify-start space-x-3">
            <Moon className="text-purple-400" size={24} />
            <span className="serif font-bold text-2xl text-white">Cigana Soraya</span>
          </div>
          <p className="max-w-sm mx-auto md:mx-0 font-light leading-relaxed">Descubra as respostas que as cartas revelam com ética e verdade espiritual.</p>
        </div>
        <div>
          <h4 className="serif font-bold text-lg mb-6 text-white italic">Links</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/jogos" className="hover:text-purple-300">Todos os Jogos</Link></li>
            <li><Link to="/agendar" className="hover:text-purple-300">Agendar Online</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="serif font-bold text-lg mb-6 text-white italic">Contato</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center justify-center md:justify-start space-x-2">
              <MessageSquare size={16} className="text-purple-400" /> 
              <a 
                href="https://wa.me/5516988509762" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-purple-300 transition-colors"
              >
                WhatsApp Cigana Soraya
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500">
          © {new Date().getFullYear()} Cigana Soraya. O atendimento espiritual não substitui ajuda médica.
        </p>
        <div className="mt-6 flex items-center justify-center space-x-3 text-[12px] text-gray-600 font-medium opacity-50 hover:opacity-100 transition-opacity duration-500 tracking-widest">
          <a href="https://www.japantech.com.br/" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
            Desenvolvido pela Japantech
          </a>
          <span className="font-normal">伊藤</span>
        </div>
      </div>
    </footer>
  );
};

const AppContent: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const savedUser = localStorage.getItem('soraya_user');
    const savedAppointments = localStorage.getItem('soraya_appointments');
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedAppointments) setAppointments(JSON.parse(savedAppointments));
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('soraya_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('soraya_user');
    window.location.hash = '/';
  };

  const addAppointment = (appt: Appointment) => {
    const updated = [...appointments, appt];
    setAppointments(updated);
    localStorage.setItem('soraya_appointments', JSON.stringify(updated));
  };

  const updateAppointment = (id: string, status: 'confirmed' | 'cancelled') => {
    const updated = appointments.map(a => a.id === id ? { ...a, status } : a);
    setAppointments(updated);
    localStorage.setItem('soraya_appointments', JSON.stringify(updated));
  };

  const showUrgencyBar = location.pathname === '/' || location.pathname === '/curso';

  return (
    <div className="min-h-screen flex flex-col bg-mystic-texture">
      <header className="sticky top-0 z-[1000] w-full">
        <NavigationContent user={user} handleLogout={handleLogout} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <UrgencyBar />
      </header>
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/jogos" element={<CatalogPage />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/curso" element={<CoursePage />} />
          <Route path="/agendar" element={<BookingPage addAppointment={addAppointment} existingAppointments={appointments} />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/admin" element={<ProtectedRoute user={user} adminOnly><AdminPage user={user} appointments={appointments} updateAppointment={updateAppointment} onLogout={handleLogout} /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <FooterContent />
      <CookieConsent />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
};

export default App;
