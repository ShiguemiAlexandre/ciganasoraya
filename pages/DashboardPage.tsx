
import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { Calendar, Clock, AlertCircle, XCircle, CheckCircle, ChevronRight, User as UserIcon } from 'lucide-react';
import { User, Appointment } from '../types';

interface DashboardPageProps {
  user: User | null;
  appointments: Appointment[];
  updateAppointment: (id: string, status: 'confirmed' | 'cancelled') => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ user, appointments, updateAppointment }) => {
  if (!user) return <Navigate to="/login" />;
  if (user.role === 'admin') return <Navigate to="/admin" />;

  // Fixed error: Appointment type does not have 'userId', using 'clientEmail' instead
  const myAppointments = appointments.filter(a => a.clientEmail === user.email).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const pending = myAppointments.filter(a => a.status === 'pending');
  const past = myAppointments.filter(a => a.status !== 'pending');

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <h1 className="serif text-4xl font-bold mb-2">Olá, {user.name}</h1>
          <p className="text-gray-500">Bem-vindo à sua área de orientações e agendamentos.</p>
        </div>
        <Link to="/agendar" className="px-8 py-3 bg-deep-green text-white rounded-full font-bold hover:bg-deep-green/90 transition-all shadow-md">
          Novo Agendamento
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          {/* Active Appointments */}
          <section>
            <h2 className="serif text-2xl font-bold mb-6 flex items-center">
              <Calendar className="mr-2 text-[#d4af37]" /> Próximas Consultas
            </h2>
            {pending.length === 0 ? (
              <div className="bg-white p-12 rounded-3xl border border-dashed border-gray-200 text-center text-gray-400">
                Nenhum agendamento pendente.
              </div>
            ) : (
              <div className="space-y-4">
                {pending.map(appt => (
                  <div key={appt.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-md transition-shadow">
                    <div>
                      <h4 className="font-bold text-lg text-deep-green">{appt.serviceName}</h4>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500 font-medium">
                        <span className="flex items-center"><Calendar size={14} className="mr-1" /> {appt.date}</span>
                        <span className="flex items-center"><Clock size={14} className="mr-1" /> {appt.time}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 w-full md:w-auto">
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-[10px] font-bold uppercase rounded-full tracking-wider">Aguardando Confirmação</span>
                      <button 
                        onClick={() => updateAppointment(appt.id, 'cancelled')}
                        className="p-2 text-red-400 hover:text-red-600 transition-colors"
                        title="Cancelar Agendamento"
                      >
                        <XCircle size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* History */}
          <section>
            <h2 className="serif text-2xl font-bold mb-6 flex items-center">
              <Clock className="mr-2 text-gray-400" /> Histórico de Atendimentos
            </h2>
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-[10px] font-bold uppercase tracking-widest text-gray-400 border-b">
                  <tr>
                    <th className="px-6 py-4">Data</th>
                    <th className="px-6 py-4">Atendimento</th>
                    <th className="px-6 py-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {past.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-6 py-8 text-center text-gray-400 italic">Nada por aqui ainda.</td>
                    </tr>
                  ) : (
                    past.map(appt => (
                      <tr key={appt.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium">{appt.date}</td>
                        <td className="px-6 py-4 text-sm text-deep-green font-semibold">{appt.serviceName}</td>
                        <td className="px-6 py-4 text-right">
                          <span className={`inline-flex items-center px-2 py-1 rounded text-[10px] font-bold uppercase ${
                            appt.status === 'confirmed' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
                          }`}>
                            {appt.status === 'confirmed' ? 'Realizado' : 'Cancelado'}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Profile Sidebar */}
        <div className="space-y-6">
          <div className="bg-deep-green text-white p-8 rounded-3xl shadow-xl space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-[#d4af37] rounded-full flex items-center justify-center text-deep-green">
                <UserIcon size={32} />
              </div>
              <div>
                <h3 className="serif text-xl font-bold">Meu Perfil</h3>
                <p className="text-gray-400 text-xs">Membro PMC desde 2024</p>
              </div>
            </div>
            <div className="pt-4 border-t border-white/10 space-y-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-gray-400 block mb-1">E-mail</span>
                <p className="text-sm font-medium">{user.email}</p>
              </div>
            </div>
            <button className="w-full py-3 border border-white/20 rounded-xl text-sm font-bold hover:bg-white/5 transition-colors">
              Editar Dados
            </button>
          </div>

          <div className="bg-[#fdfcfb] border border-[#d4af37]/20 p-6 rounded-3xl shadow-sm">
            <h4 className="serif font-bold text-deep-green mb-3">Informação Importante</h4>
            <p className="text-xs text-gray-500 leading-relaxed italic">
              "Para cancelamentos ou reagendamentos, pedimos a gentileza de avisar com pelo menos 24h de antecedência para liberação do horário para outros irmãos."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
