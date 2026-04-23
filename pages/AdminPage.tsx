
import React, { useState, useEffect, useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import { 
  Users, Calendar, Settings, CheckCircle, XCircle, Filter, Download, Search, MessageSquare, Clock, LayoutDashboard, CreditCard, ShoppingBag, Plus, Trash2, Edit, AlertTriangle, ChevronLeft, ChevronRight, Eye, LogOut, Smartphone, Info, ArrowRight, Menu, X, Circle, Lock, Zap, TrendingUp, Coins, CalendarDays, Coffee, Sparkles, Mail, Moon
} from 'lucide-react';
import { User, Appointment, Service, DayConfig, PriceLog, ServiceCategory } from '../types';
import { SERVICES as INITIAL_SERVICES } from '../constants';

interface AdminPageProps {
  user: User | null;
  appointments: Appointment[];
  updateAppointment: (id: string, status: 'confirmed' | 'cancelled') => void;
  onLogout: () => void;
}

const BRAZILIAN_HOLIDAYS = [
  '01-01', '21-04', '01-05', '07-09', '12-10', '02-11', '15-11', '20-11', '25-12'
];

const AdminPage: React.FC<AdminPageProps> = ({ user, appointments, updateAppointment, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'agenda' | 'jogos'>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [dayConfigs, setDayConfigs] = useState<DayConfig[]>(() => {
    const saved = localStorage.getItem('soraya_admin_calendar');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('soraya_admin_calendar', JSON.stringify(dayConfigs));
  }, [dayConfigs]);

  const formatDateValue = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const isWeekend = (date: Date) => date.getDay() === 0 || date.getDay() === 6;
  const isHoliday = (date: Date) => {
    const dayMonth = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    return BRAZILIAN_HOLIDAYS.includes(dayMonth);
  };

  const getDayStatus = (dateStr: string, dateObj: Date) => {
    const config = dayConfigs.find(c => c.date === dateStr);
    if (config) return config.status;
    if (isWeekend(dateObj) || isHoliday(dateObj)) return 'blocked';
    return 'available';
  };

  const toggleDayStatus = (dateStr: string, dateObj: Date) => {
    setDayConfigs(prev => {
      const existing = prev.find(c => c.date === dateStr);
      const currentStatus = existing ? existing.status : (isWeekend(dateObj) || isHoliday(dateObj) ? 'blocked' : 'available');
      let nextStatus: 'available' | 'full' | 'blocked' = 'available';
      if (currentStatus === 'available') nextStatus = 'full';
      else if (currentStatus === 'full') nextStatus = 'blocked';
      if (existing) return prev.map(c => c.date === dateStr ? { ...c, status: nextStatus } : c);
      return [...prev, { date: dateStr, status: nextStatus, limit: 5 }];
    });
  };

  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));
    return days;
  }, [currentMonth]);

  const faturamentoTotal = appointments.filter(a => a.status === 'confirmed').reduce((acc, a) => acc + (a.totalPrice || 0), 0);

  const renderDashboard = () => (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Faturamento', value: `R$ ${faturamentoTotal.toFixed(2)}`, icon: CreditCard, color: 'text-green-400' },
          { label: 'Total Pedidos', value: appointments.length, icon: Calendar, color: 'text-purple-400' },
          { label: 'Pendentes', value: appointments.filter(a => a.status === 'pending').length, icon: Clock, color: 'text-yellow-400' },
          { label: 'Cancelados', value: appointments.filter(a => a.status === 'cancelled').length, icon: XCircle, color: 'text-red-400' }
        ].map((stat, i) => (
          <div key={i} className="bg-black/40 border border-white/10 p-8 rounded-[2rem]">
             <stat.icon className={`${stat.color} mb-4`} size={24} />
             <h3 className="text-3xl font-black text-white">{stat.value}</h3>
             <p className="text-gray-500 text-xs uppercase tracking-widest font-bold">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-black/40 border border-white/10 rounded-[2.5rem] overflow-hidden">
        <div className="p-8 border-b border-white/5 flex justify-between items-center">
          <h3 className="serif text-2xl text-white">Solicitações Recentes</h3>
          <span className="text-[10px] font-black uppercase tracking-widest text-purple-400">Clique no WhatsApp para falar com o consulente</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-[10px] font-black uppercase tracking-widest text-gray-400 border-b border-white/5">
              <tr>
                <th className="px-8 py-5">Consulente</th>
                <th className="px-8 py-5">Serviços</th>
                <th className="px-8 py-5">Previsão</th>
                <th className="px-8 py-5">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {appointments.length === 0 ? (
                <tr><td colSpan={4} className="px-8 py-10 text-center text-gray-500 italic">Nenhuma solicitação até o momento.</td></tr>
              ) : (
                appointments.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map(appt => (
                  <tr key={appt.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="text-white font-bold">{appt.clientName}</div>
                      <div className="text-[10px] text-gray-500 flex items-center mt-1"><Mail size={10} className="mr-1" /> {appt.clientEmail}</div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="text-purple-300 text-xs font-medium">{appt.serviceName}</div>
                      <div className="text-[10px] text-gold font-bold mt-1">R$ {appt.totalPrice?.toFixed(2)}</div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="text-white text-xs font-bold">{appt.date}</div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">{appt.time}</div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-3">
                        <a href={`https://wa.me/${appt.clientWhatsapp.replace(/\D/g,'')}`} target="_blank" className="p-2 bg-green-500/10 text-green-400 rounded-lg hover:bg-green-500 hover:text-white transition-all"><MessageSquare size={16} /></a>
                        {appt.status === 'pending' && (
                          <>
                            <button onClick={() => updateAppointment(appt.id, 'confirmed')} className="p-2 bg-purple-500/10 text-purple-400 rounded-lg hover:bg-purple-500 hover:text-white transition-all"><CheckCircle size={16} /></button>
                            <button onClick={() => updateAppointment(appt.id, 'cancelled')} className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition-all"><XCircle size={16} /></button>
                          </>
                        )}
                        {appt.status !== 'pending' && (
                          <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-full ${appt.status === 'confirmed' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                            {appt.status === 'confirmed' ? 'Confirmado' : 'Cancelado'}
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAgenda = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-in fade-in duration-500">
       <div className="bg-black/40 border border-white/10 p-10 rounded-[2.5rem]">
          <div className="flex items-center justify-between mb-10">
             <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))} className="text-gold"><ChevronLeft /></button>
             <h3 className="serif text-2xl text-white capitalize">{currentMonth.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}</h3>
             <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))} className="text-gold"><ChevronRight /></button>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {['D','S','T','Q','Q','S','S'].map(d => <div key={d} className="text-center text-[10px] font-black text-purple-400 py-4">{d}</div>)}
            {calendarDays.map((date, idx) => {
              if (!date) return <div key={idx} />;
              const dateStr = formatDateValue(date);
              const status = getDayStatus(dateStr, date);
              return (
                <button key={idx} onClick={() => toggleDayStatus(dateStr, date)} className={`aspect-square flex flex-col items-center justify-center rounded-2xl text-sm font-bold border transition-all ${status === 'available' ? 'bg-white/5 text-gray-400 border-white/5' : status === 'full' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
                  {date.getDate()}
                  <span className="text-[6px] uppercase font-black mt-1">{status}</span>
                </button>
              );
            })}
          </div>
       </div>
       <div className="p-8 bg-gold/5 border border-gold/10 rounded-[2.5rem] flex flex-col justify-center text-center space-y-4">
          <Sparkles className="text-gold mx-auto" size={40} />
          <h4 className="serif text-2xl text-white">Controle de Fluxo</h4>
          <p className="text-gray-400 text-sm font-light">"Clique nos dias para alternar entre Disponível, Lotado e Bloqueado. Isso reflete instantaneamente no calendário do cliente."</p>
       </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-mystic-texture flex flex-col lg:flex-row">
      <div className="lg:hidden bg-[#0d0517] p-6 flex items-center justify-between border-b border-white/5"><span className="serif font-bold text-white">Soraya Admin</span><button className="text-gold" onClick={() => setIsMobileMenuOpen(true)}><Menu size={24} /></button></div>
      {isMobileMenuOpen && <div className="fixed inset-0 bg-black/80 z-[60] lg:hidden" onClick={() => setIsMobileMenuOpen(false)}><div className="w-80 h-full bg-[#0d0517] p-10 border-r border-white/10" onClick={e => e.stopPropagation()}>
         <div className="flex justify-between items-center mb-12"><div className="flex items-center space-x-3 text-white serif font-bold"><Moon className="text-gold" /><span>Admin</span></div><button onClick={() => setIsMobileMenuOpen(false)} className="text-white"><X /></button></div>
         <nav className="space-y-6">
            {['dashboard', 'agenda'].map(tab => <button key={tab} onClick={() => { setActiveTab(tab as any); setIsMobileMenuOpen(false); }} className={`w-full text-left p-4 rounded-xl font-bold uppercase tracking-widest text-[10px] ${activeTab === tab ? 'bg-gold text-deep-purple' : 'text-gray-400'}`}>{tab}</button>)}
         </nav>
      </div></div>}
      
      <div className="hidden lg:flex flex-col w-72 bg-[#0d0517] p-10 border-r border-white/10 shrink-0">
         <div className="flex items-center space-x-3 text-white serif font-bold text-2xl mb-16"><Moon className="text-gold" /><span>Soraya Admin</span></div>
         <nav className="space-y-4 flex-grow">
            {[{id:'dashboard', icon: LayoutDashboard}, {id:'agenda', icon: Calendar}].map(item => (
              <button key={item.id} onClick={() => setActiveTab(item.id as any)} className={`w-full flex items-center space-x-4 p-4 rounded-2xl transition-all font-bold text-[11px] uppercase tracking-widest ${activeTab === item.id ? 'bg-gold text-deep-purple shadow-xl shadow-gold/10' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}>
                <item.icon size={18} /><span>{item.id}</span>
              </button>
            ))}
         </nav>
         <button onClick={onLogout} className="w-full flex items-center space-x-4 p-4 text-red-400 hover:bg-red-400/10 rounded-2xl transition-all text-[11px] font-black uppercase tracking-widest"><LogOut size={18} /><span>Sair</span></button>
      </div>

      <div className="flex-grow p-6 md:p-12 lg:p-20 overflow-y-auto">
         <div className="flex justify-between items-end mb-12">
            <div><h1 className="serif text-4xl text-white font-bold mb-2">Painel de Controle</h1><p className="text-gray-500 text-sm font-light uppercase tracking-[0.3em]">Gerencie as energias e agendamentos do portal</p></div>
         </div>
         {activeTab === 'dashboard' && renderDashboard()}
         {activeTab === 'agenda' && renderAgenda()}
      </div>
    </div>
  );
};

export default AdminPage;
