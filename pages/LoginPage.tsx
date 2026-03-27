import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, Lock, User as UserIcon, ArrowRight, Moon, ShieldCheck, Sparkles } from 'lucide-react';
import { User } from '../types';

interface LoginPageProps {
  onLogin: (user: User) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/dashboard';
  
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [forceAdmin, setForceAdmin] = useState(false); // Nova flag para acesso admin facilitado
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      if (!isLogin && formData.password !== formData.confirmPassword) {
        setError('As senhas não coincidem');
        setLoading(false);
        return;
      }

      // Define se é admin baseado no e-mail padrão ou no seletor manual de desenvolvedor
      const isAdmin = formData.email === 'admin@pmc.com' || forceAdmin;
      
      const user: User = {
        id: isAdmin ? 'admin-id' : 'user-' + Math.random().toString(36).substr(2, 5),
        name: isLogin ? (isAdmin ? 'Admin PMC' : 'Irmão de Fé') : formData.name,
        email: formData.email,
        role: isAdmin ? 'admin' : 'user'
      };

      onLogin(user);
      setLoading(false);
      navigate(isAdmin ? '/admin' : redirect);
    }, 1000);
  };

  return (
    <div className="max-w-md mx-auto my-20 px-4">
      <div className="bg-[#1a0b2e]/60 backdrop-blur-xl p-10 rounded-[3rem] shadow-2xl border border-purple-500/20 animate-in fade-in zoom-in-95">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-purple-600/10 rounded-2xl flex items-center justify-center text-purple-400 mx-auto mb-6 border border-purple-500/20">
            <Moon size={32} />
          </div>
          <h2 className="serif text-3xl font-bold mb-2 text-white">{isLogin ? 'Bem-vindo de volta' : 'Inicie sua jornada'}</h2>
          <p className="text-gray-500 text-sm">Portal de Agendamento PMC</p>
        </div>

        {error && <div className="mb-6 p-4 bg-red-900/20 text-red-400 rounded-2xl text-xs font-bold text-center border border-red-900/40">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div className="relative">
              <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-500" size={18} />
              <input 
                required
                type="text" 
                placeholder="Seu Nome"
                className="w-full pl-12 pr-4 py-4 bg-black/40 border border-white/5 rounded-2xl outline-none focus:ring-2 focus:ring-purple-600 text-white"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          )}
          
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-500" size={18} />
            <input 
              required
              type="email" 
              placeholder="E-mail"
              className="w-full pl-12 pr-4 py-4 bg-black/40 border border-white/5 rounded-2xl outline-none focus:ring-2 focus:ring-purple-600 text-white"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-500" size={18} />
            <input 
              required
              type="password" 
              placeholder="Senha"
              className="w-full pl-12 pr-4 py-4 bg-black/40 border border-white/5 rounded-2xl outline-none focus:ring-2 focus:ring-purple-600 text-white"
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          {!isLogin && (
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-500" size={18} />
              <input 
                required
                type="password" 
                placeholder="Confirmar Senha"
                className="w-full pl-12 pr-4 py-4 bg-black/40 border border-white/5 rounded-2xl outline-none focus:ring-2 focus:ring-purple-600 text-white"
                value={formData.confirmPassword}
                onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
            </div>
          )}

          {/* Seletor de Modo Admin Facilitado */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setForceAdmin(!forceAdmin)}
              className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-500 ${forceAdmin ? 'bg-gold/10 border-gold shadow-[0_0_20px_rgba(212,175,55,0.2)]' : 'bg-black/20 border-white/5 opacity-60 hover:opacity-100'}`}
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg transition-colors ${forceAdmin ? 'bg-gold text-deep-purple' : 'bg-white/5 text-gray-500'}`}>
                  <ShieldCheck size={18} />
                </div>
                <span className={`text-[10px] font-black uppercase tracking-widest ${forceAdmin ? 'text-gold' : 'text-gray-400'}`}>
                  Acesso Administrativo
                </span>
              </div>
              <div className={`w-10 h-5 rounded-full relative transition-colors ${forceAdmin ? 'bg-gold' : 'bg-gray-700'}`}>
                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all duration-300 ${forceAdmin ? 'left-6' : 'left-1'}`}></div>
              </div>
            </button>
            {forceAdmin && (
              <p className="text-[9px] text-gold/60 mt-2 text-center animate-pulse uppercase font-bold tracking-tighter italic">
                * Modo Administrador Ativado: Você terá acesso ao Painel de Gestão.
              </p>
            )}
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-5 bg-purple-600 text-white rounded-2xl font-bold shadow-xl hover:bg-purple-500 transition-all flex items-center justify-center space-x-2 purple-glow border border-purple-400/20"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <Sparkles size={18} className={`${forceAdmin ? 'text-gold' : 'text-white/30'} transition-colors`} />
                <span>{isLogin ? 'Entrar no Portal' : 'Criar minha Conta'}</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          <button onClick={() => setIsLogin(!isLogin)} className="font-bold text-purple-400 hover:underline">
            {isLogin ? 'Não tem uma conta? Cadastre-se' : 'Já tem uma conta? Faça login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;