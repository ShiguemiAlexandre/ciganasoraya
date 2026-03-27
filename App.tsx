import React, { useState, useEffect } from 'react';
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

  if (isAdminView) return null;

  return (
    <nav className="sticky top-0 z-50 bg-[#1a0b2e]/80 backdrop-blur-xl border-b border-purple-500/10 px-4 py-4 md:px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-gold shadow-[0_0_15px_rgba(157,80,187,0.6)] transition-transform group-hover:scale-110">
            <Moon size={24} />
          </div>
          <div>
            <span className="serif font-bold text-xl md:text-2xl block leading-tight text-white">PMC</span>
            <span className="text-[10px] uppercase tracking-[0.4em] text-purple-400 font-bold">Cartomancia</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center space-x-10 text-[11px] uppercase tracking-[0.2em] font-bold">
          <Link to="/" className={`transition-all duration-300 pb-1 border-b-2 ${isActive('/') ? 'text-white border-[#d4af37]' : 'text-gray-400 border-transparent hover:text-purple-300'}`}>Início</Link>
          <Link to="/jogos" className={`transition-all duration-300 pb-1 border-b-2 ${isActive('/jogos') ? 'text-white border-[#d4af37]' : 'text-gray-400 border-transparent hover:text-purple-300'}`}>Oráculos</Link>
          <Link to="/sobre" className={`transition-all duration-300 pb-1 border-b-2 ${isActive('/sobre') ? 'text-white border-[#d4af37]' : 'text-gray-400 border-transparent hover:text-purple-300'}`}>Sobre</Link>
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

        <button className="md:hidden text-purple-400" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#1a0b2e] shadow-2xl p-8 flex flex-col space-y-6 border-t border-purple-500/10 animate-in fade-in slide-in-from-top-4">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-lg text-gray-300">Início</Link>
          <Link to="/jogos" onClick={() => setIsMenuOpen(false)} className="text-lg text-gray-300">Nossos Jogos</Link>
          <Link to="/agendar" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-purple-400">Agendar Consulta</Link>
          <div className="h-[1px] bg-white/5"></div>
          {user && user.role === 'admin' && (
            <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="text-lg text-white">Painel Admin</Link>
          )}
        </div>
      )}
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
            <span className="serif font-bold text-2xl text-white">PMC Cartomancia</span>
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
                WhatsApp PMC
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500">
          © {new Date().getFullYear()} PMC Cartomancia. O atendimento espiritual não substitui ajuda médica.
        </p>
        <div className="mt-6 flex items-center justify-center space-x-3 text-[9px] text-gray-600 font-medium opacity-40 hover:opacity-100 transition-opacity duration-500 tracking-widest">
          <a href="https://www.japantech.com.br/" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
            Desenvolvido pela Japantech
          </a>
          <span className="text-[10px] font-normal">伊藤</span>
        </div>
      </div>
    </footer>
  );
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('pmc_user');
    const savedAppointments = localStorage.getItem('pmc_appointments');
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedAppointments) setAppointments(JSON.parse(savedAppointments));
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('pmc_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('pmc_user');
    window.location.hash = '/';
  };

  const addAppointment = (appt: Appointment) => {
    const updated = [...appointments, appt];
    setAppointments(updated);
    localStorage.setItem('pmc_appointments', JSON.stringify(updated));
  };

  const updateAppointment = (id: string, status: 'confirmed' | 'cancelled') => {
    const updated = appointments.map(a => a.id === id ? { ...a, status } : a);
    setAppointments(updated);
    localStorage.setItem('pmc_appointments', JSON.stringify(updated));
  };

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col bg-mystic-texture">
        <NavigationContent user={user} handleLogout={handleLogout} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/jogos" element={<CatalogPage />} />
            <Route path="/sobre" element={<AboutPage />} />
            <Route path="/agendar" element={<BookingPage addAppointment={addAppointment} existingAppointments={appointments} />} />
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/admin" element={<ProtectedRoute user={user} adminOnly><AdminPage user={user} appointments={appointments} updateAppointment={updateAppointment} onLogout={handleLogout} /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <FooterContent />
      </div>
    </HashRouter>
  );
};

export default App;