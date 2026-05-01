import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronLeft, Sparkles, Moon, Check, Info, Sun, Sunrise, Sunset, User, CreditCard, QrCode, Globe, AlertTriangle, ExternalLink, MapPin, Hash, Building, Map, Flag, IdCard } from 'lucide-react';
import { SERVICES, SERVICE_FEE } from '../constants';
import { Appointment } from '../types';

interface BookingPageProps {
  addAppointment: (appt: Appointment) => void;
  existingAppointments: Appointment[];
}

const BookingPage: React.FC<BookingPageProps> = ({ addAppointment }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  
  const [formData, setFormData] = useState({
    serviceIds: [] as string[],
    date: new Date().toLocaleDateString('pt-BR'), 
    time: '',
    paymentMethod: '',
    clientName: '',
    clientBirthDate: '',
    clientEmail: '',
    clientWhatsapp: '',
    notes: ''
  });

  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  // Função para formatar data de nascimento (DD/MM/AAAA)
  const handleBirthDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não é número
    if (value.length > 8) value = value.slice(0, 8);
    
    // Aplica a máscara
    if (value.length > 4) {
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4)}`;
    } else if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    
    setFormData({ ...formData, clientBirthDate: value });
  };

  // Efeito para capturar serviceId da URL e pré-selecionar sem pular de etapa
  useEffect(() => {
    const serviceIdParam = searchParams.get('serviceId');
    if (serviceIdParam && SERVICES.find(s => s.id === serviceIdParam)) {
      setFormData(prev => ({
        ...prev,
        serviceIds: [serviceIdParam]
      }));
    }
  }, [searchParams]);

  // Efeito para rolar ao topo sempre que mudar de etapa
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [step]);

  const selectedServices = SERVICES.filter(s => formData.serviceIds.includes(s.id));
  const basePrice = selectedServices.reduce((acc, s) => {
    const numericPart = s.price.replace('R$ ', '').replace(/\./g, '').replace(',', '.');
    const priceNum = parseFloat(numericPart);
    return acc + (isNaN(priceNum) ? 0 : priceNum);
  }, 0);
  const totalPrice = basePrice > 0 ? basePrice + SERVICE_FEE : 0;
  const totalFormatted = basePrice > 0 
    ? `R$ ${totalPrice.toFixed(2).replace('.', ',')}`
    : 'A combinar';

  // Lógica de construção da mensagem movida para o corpo do componente para ser acessível em ambas as telas
  const serviceDetails = selectedServices.map(s => `• *${s.name}*: ${s.price}`).join('\n');
  
  // Emojis em formato Unicode para máxima compatibilidade
  const emojiSparkles = "\u2728";
  const emojiFolder = "\uD83D\uDCC1"; // Folder icon
  const emojiUser = "\uD83D\uDC64";
  const emojiCalendar = "\uD83D\uDCC5";
  const emojiClock = "\uD83D\uDD52";
  const emojiCard = "\uD83D\uDCB3";
  const emojiCrystal = "\uD83D\uDD2E";
  const emojiMoney = "\uD83D\uDCB0";
  const emojiNote = "\uD83D\uDCDD";
  const emojiHeart = "\uD83E\uDD0D";

  const messageText = `${emojiSparkles} Olá! Gostaria de agendar uma consulta com a Cigana Soraya.\n\n` +
      `${emojiFolder} *DADOS DO CONSULENTE*\n` +
      `${emojiUser} Nome: ${formData.clientName}\n` +
      `${emojiCalendar} Nascimento: ${formData.clientBirthDate}\n` +
      (formData.time ? `${emojiClock} Período Preferido: ${formData.time}\n` : '') +
      `${emojiCard} Forma de Pagamento: ${formData.paymentMethod}\n\n` +
      `${emojiCrystal} *ORÁCULOS ESCOLHIDOS*\n` +
      `${serviceDetails}\n\n` +
      `${emojiMoney} *VALOR TOTAL: ${totalFormatted}*\n\n` +
      (formData.notes ? `${emojiNote} *NOTAS:*\n${formData.notes}\n\n` : "") +
      `${emojiHeart} Fico no aguardo da confirmação do dia e horário exato para realizar o pagamento. Gratidão! ${emojiSparkles}`;

  const PERIODS = [
    { id: 'Manhã', label: 'Manhã', range: '09h às 12h', icon: Sunrise },
    { id: 'Tarde', label: 'Tarde', range: '13h às 18h', icon: Sun },
    { id: 'Noite', label: 'Noite', range: '18h às 21h', icon: Sunset },
  ];

  const PAYMENT_METHODS = [
    { id: 'Pix', label: 'Pix', desc: 'Transferência instantânea', icon: QrCode },
    { id: 'Cartão de Crédito', label: 'Cartão', desc: 'Crédito à vista ou parcelado', icon: CreditCard },
    { id: 'PayPal (Exterior)', label: 'PayPal', desc: 'Pagamentos internacionais', icon: Globe },
  ];

  const toggleService = (id: string) => {
    setFormData(prev => ({
      ...prev,
      serviceIds: prev.serviceIds.includes(id)
        ? prev.serviceIds.filter(sid => sid !== id)
        : [...prev.serviceIds, id]
    }));
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.serviceIds.length === 0 || !formData.clientName) return;
    setLoading(true);
    
    const whatsappNumber = "5516988509762";
    // Normalização NFC garante que emojis não quebrem no encoding da URL
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(messageText)}`;

    setTimeout(() => {
      const newAppt: Appointment = {
        id: Math.random().toString(36).substr(2, 9),
        clientName: formData.clientName,
        clientEmail: formData.clientEmail || 'contato@ciganasoraya.com', 
        clientWhatsapp: formData.whatsapp, 
        serviceId: formData.serviceIds.join(','),
        serviceName: selectedServices.map(s => s.name).join(' + '),
        date: formData.date,
        time: formData.time,
        status: 'pending',
        notes: formData.notes,
        totalPrice: totalPrice,
        createdAt: new Date().toISOString()
      };
      
      addAppointment(newAppt);
      setLoading(false);
      setConfirmed(true);
      window.open(whatsappUrl, '_blank');
    }, 1500);
  };

  const GoldButtonClasses = "px-16 py-6 bg-[#d4af37] text-[#1a0b2e] rounded-full font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-[rgba(212,175,55,0.4)] hover:scale-105 hover:brightness-110 transition-all active:scale-95 disabled:opacity-20 disabled:scale-100 disabled:shadow-none";

  if (confirmed) {
    return (
      <div className="bg-mystic-texture min-h-screen flex items-center justify-center py-20 px-4">
        <div className="max-w-xl w-full bg-[#1a0b2e]/80 backdrop-blur-xl p-12 rounded-[3.5rem] shadow-[0_0_100px_rgba(157,80,187,0.2)] text-center space-y-8 border border-purple-500/30 animate-in zoom-in-95">
          <div className="w-24 h-24 bg-gold/10 text-gold rounded-full flex items-center justify-center mx-auto mb-4 border border-gold/30">
            <Sparkles size={48} className="animate-pulse" />
          </div>
          <h2 className="serif text-4xl md:text-5xl font-bold text-white italic leading-tight">Sua solicitação foi <br /><span className="text-gold not-italic">enviada</span></h2>
          <p className="text-gray-300 text-lg leading-relaxed italic font-light">
            "Olá {formData.clientName.split(' ')[0]}, o WhatsApp foi aberto com sua mensagem. Caso não tenha aberto automaticamente, clique no botão abaixo para falar com a cartomante."
          </p>
          <div className="bg-black/40 p-6 rounded-2xl text-left border border-white/5 space-y-3">
             <div className="flex justify-between text-xs"><span className="text-gray-500 uppercase font-black tracking-widest">Serviços:</span> <span className="text-white font-bold">{selectedServices.map(s => s.name).join(', ')}</span></div>
             <div className="flex justify-between text-xs"><span className="text-gray-500 uppercase font-black tracking-widest">Pagamento:</span> <span className="text-white font-bold">{formData.paymentMethod}</span></div>
             <div className="flex justify-between text-xs"><span className="text-gray-500 uppercase font-black tracking-widest">Total:</span> <span className="text-gold font-bold">R$ {totalPrice.toFixed(2).replace('.', ',')}</span></div>
          </div>
          <div className="flex flex-col space-y-4">
            {/* Botão de Reabrir agora inclui a mensagem completa para manter a estrutura original */}
            <button 
              onClick={() => window.open(`https://api.whatsapp.com/send?phone=5516988509762&text=${encodeURIComponent(messageText)}`, '_blank')} 
              className="w-full py-4 bg-green-600 text-white rounded-full font-bold uppercase text-[10px] tracking-widest hover:bg-green-500 transition-all shadow-lg active:scale-95"
            >
              Reabrir WhatsApp com Mensagem
            </button>
            <button onClick={() => navigate('/')} className="text-gray-500 text-[10px] uppercase font-bold tracking-widest hover:text-white transition-colors">Voltar ao Início</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-mystic-texture min-h-screen py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/5 backdrop-blur-xl rounded-[3.5rem] border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-white/5 rounded-t-[3.5rem] overflow-hidden">
             <div className="h-full bg-gradient-to-r from-purple-600 to-gold transition-all duration-700" style={{ width: `${(step / 4) * 100}%` }}></div>
          </div>

          <div className="p-8 md:p-12 lg:p-16">
            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                  <div><h2 className="serif text-3xl md:text-4xl font-bold text-white mb-2 italic">Mesa de Oráculos</h2><p className="text-gray-500 text-[10px] uppercase tracking-[0.3em] font-black">Selecione uma ou mais cartas para sua consulta</p></div>
                  <div className="text-gold text-[10px] font-bold uppercase tracking-widest">{formData.serviceIds.length} selecionado(s) • Total: R$ {totalPrice.toFixed(2).replace('.', ',')}</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                  {SERVICES.map((s) => {
                    const isSelected = formData.serviceIds.includes(s.id);
                    return (
                      <button 
                        key={s.id} 
                        onClick={() => toggleService(s.id)} 
                        className={`w-full group relative p-6 rounded-[2.5rem] border transition-all duration-500 flex flex-col items-center text-center 
                          ${isSelected ? 'bg-purple-600/20 border-gold shadow-[0_0_40px_rgba(212,175,55,0.3)] scale-[1.03] z-10' : 'bg-black/20 border-white/10 opacity-70 hover:opacity-100 hover:border-purple-500/50'
                          }`}
                      >
                        <div className="aspect-[3/4] w-full rounded-[2rem] overflow-hidden mb-6 relative border border-white/5">
                          <img src={s.image} alt={s.name} className={`w-full h-full object-cover transition-all duration-1000 ${isSelected ? 'scale-110' : 'grayscale-[40%]'}`} />
                          {isSelected && <div className="absolute inset-0 bg-gold/20 flex items-center justify-center backdrop-blur-[2px]"><Check size={32} className="text-gold" /></div>}
                        </div>
                        <h4 className={`serif text-xl font-bold ${isSelected ? 'text-gold' : 'text-white'}`}>{s.name}</h4>
                        <span className="text-xs text-gray-400 mt-2">{s.price}</span>
                      </button>
                    );
                  })}
                </div>
                <div className="flex justify-center">
                  <button 
                    disabled={formData.serviceIds.length === 0} 
                    onClick={() => {
                      if (formData.serviceIds.includes('s_fortuna') && formData.serviceIds.length === 1) {
                        setStep(3);
                      } else {
                        setStep(2);
                      }
                    }} 
                    className={GoldButtonClasses}
                  >
                    {formData.serviceIds.includes('s_fortuna') && formData.serviceIds.length === 1 
                      ? 'Escolher Pagamento' 
                      : 'Escolher Período de Atendimento'}
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-700">
                <button onClick={() => setStep(1)} className="flex items-center text-[10px] font-black text-purple-400 mb-10 uppercase tracking-[0.4em] hover:text-gold transition-colors"><ChevronLeft size={16} className="mr-2" /> Alterar Oráculos</button>
                
                <div className="max-w-2xl mx-auto space-y-12 text-center">
                  <div className="space-y-4">
                    <h2 className="serif text-4xl text-white font-bold italic">Sua Disponibilidade</h2>
                    <p className="text-gray-500 text-[10px] uppercase tracking-[0.3em] font-black">Escolha sua preferência de período para atendimento</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {PERIODS.map(period => (
                      <button
                        key={period.id}
                        onClick={() => setFormData({ ...formData, time: period.id })}
                        className={`flex flex-col items-center justify-center p-10 rounded-[2.5rem] border transition-all duration-500 space-y-4 ${formData.time === period.id ? 'bg-purple-600/20 border-gold shadow-[0_0_30px_rgba(212,175,55,0.2)] text-gold scale-105' : 'bg-black/20 border-white/5 text-gray-400 hover:border-white/20'}`}
                      >
                        <period.icon size={32} className={formData.time === period.id ? 'animate-pulse' : ''} />
                        <div className="text-center">
                          <span className="block font-black text-xs uppercase tracking-widest mb-1">{period.label}</span>
                          <span className="text-[10px] opacity-50">{period.range}</span>
                        </div>
                        {formData.time === period.id && <div className="pt-2"><Check size={16} /></div>}
                      </button>
                    ))}
                  </div>

                  <div className="p-8 bg-gold/5 border border-gold/10 rounded-[2rem] flex items-center space-x-6 text-left">
                    <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center text-gold shrink-0">
                      <Info size={24} />
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed italic">
                      "A cartomante definirá o dia e horário exato via WhatsApp dentro do período de sua preferência."
                    </p>
                  </div>

                  <div className="pt-8">
                    <button 
                      disabled={!formData.time} 
                      onClick={() => setStep(3)} 
                      className={GoldButtonClasses}
                    >
                      Escolher Pagamento
                    </button>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-700">
                <button 
                  onClick={() => {
                    if (formData.serviceIds.includes('s_fortuna') && formData.serviceIds.length === 1) {
                      setStep(1);
                    } else {
                      setStep(2);
                    }
                  }} 
                  className="flex items-center text-[10px] font-black text-purple-400 mb-10 uppercase tracking-[0.4em] hover:text-gold transition-colors"
                >
                  <ChevronLeft size={16} className="mr-2" /> {formData.serviceIds.includes('s_fortuna') && formData.serviceIds.length === 1 ? 'Alterar Oráculos' : 'Voltar à Disponibilidade'}
                </button>
                
                <div className="max-w-2xl mx-auto space-y-12 text-center">
                  <div className="space-y-4">
                    <h2 className="serif text-4xl text-white font-bold italic">Forma de Pagamento</h2>
                    <p className="text-gray-500 text-[10px] uppercase tracking-[0.3em] font-black">Como deseja realizar sua firmeza financeira?</p>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {PAYMENT_METHODS.map(method => (
                      <button
                        key={method.id}
                        onClick={() => setFormData({ ...formData, paymentMethod: method.id })}
                        className={`flex items-center p-8 rounded-[2rem] border transition-all duration-500 space-x-6 text-left group ${formData.paymentMethod === method.id ? 'bg-gold/10 border-gold shadow-[0_0_30px_rgba(212,175,55,0.1)]' : 'bg-black/20 border-white/5 hover:border-white/20'}`}
                      >
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${formData.paymentMethod === method.id ? 'bg-gold text-deep-purple' : 'bg-white/5 text-gray-500'}`}>
                          <method.icon size={24} />
                        </div>
                        <div className="flex-grow">
                          <span className={`block font-black text-xs uppercase tracking-widest ${formData.paymentMethod === method.id ? 'text-gold' : 'text-white'}`}>{method.label}</span>
                          <span className="text-[10px] text-gray-500">{method.desc}</span>
                        </div>
                        {formData.paymentMethod === method.id && <Check size={20} className="text-gold" />}
                      </button>
                    ))}
                  </div>

                  <div className="pt-8">
                    <button 
                      disabled={!formData.paymentMethod} 
                      onClick={() => setStep(4)} 
                      className={GoldButtonClasses}
                    >
                      Dados Finais
                    </button>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-700">
                <button onClick={() => setStep(3)} className="flex items-center text-[10px] font-black text-purple-400 mb-10 uppercase tracking-[0.4em] hover:text-gold transition-colors"><ChevronLeft size={16} className="mr-2" /> Voltar ao Pagamento</button>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                  <form onSubmit={handleFinalSubmit} className="space-y-8">
                    <h2 className="serif text-3xl text-white italic">Seus Dados</h2>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-purple-400 ml-2">Nome Completo</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gold" size={18} />
                          <input required type="text" placeholder="Como deseja ser chamado?" className="w-full pl-12 pr-4 py-4 bg-black/40 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-gold/30" value={formData.clientName} onChange={e => setFormData({ ...formData, clientName: e.target.value })} />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-purple-400 ml-2">Data de Nascimento</label>
                        <div className="relative">
                          <IdCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gold" size={18} />
                          <input 
                            required 
                            type="text" 
                            inputMode="numeric"
                            placeholder="DD/MM/AAAA" 
                            className="w-full pl-12 pr-4 py-4 bg-black/40 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-gold/30" 
                            value={formData.clientBirthDate} 
                            onChange={handleBirthDateChange}
                            maxLength={10} 
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-purple-400 ml-2">Notas Especiais (Opcional)</label>
                        <textarea rows={3} placeholder="Deseja comentar algo brevemente?" className="w-full p-4 bg-black/40 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-gold/30" value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })} />
                      </div>
                    </div>
                    <button type="submit" disabled={loading} className={GoldButtonClasses + " w-full"}>
                      {loading ? 'Preparando firmeza...' : 'Enviar Solicitação via WhatsApp'}
                    </button>
                  </form>
                  <div className="bg-[#0d0517] border border-white/10 rounded-[2.5rem] p-10 space-y-8">
                    <h3 className="serif text-2xl text-white">Resumo da Consulta</h3>
                    <div className="space-y-4">
                      {selectedServices.map(s => <div key={s.id} className="flex justify-between text-sm text-gray-400"><span>{s.name}</span><span>{s.price}</span></div>)}
                      <div className="pt-4 border-t border-white/10 space-y-3">
                        <div className="flex justify-between text-xs text-gray-500 uppercase tracking-widest"><span>Pagamento</span><span className="text-white">{formData.paymentMethod}</span></div>
                        <div className="flex justify-between text-xl text-gold serif pt-2"><span>Total Estimado</span><span>R$ {totalPrice.toFixed(2).replace('.', ',')}</span></div>
                      </div>
                    </div>

                    {/* Aviso de No-Refund Policy Reforçado com Lei */}
                    <div className="p-6 bg-red-900/10 border border-red-900/30 rounded-2xl space-y-4">
                      <div className="flex items-start space-x-4">
                        <AlertTriangle className="text-red-400 shrink-0" size={20} />
                        <p className="text-[10px] text-red-200 leading-relaxed font-bold uppercase tracking-tight">
                          Termos de Compromisso & Segurança Jurídica
                        </p>
                      </div>
                      <p className="text-[9px] text-gray-400 leading-relaxed italic">
                        Conforme os <strong>Artigos 6º, III e 31 da Lei nº 8.078/1990 (Código de Defesa do Consumidor)</strong> e o <strong>Art. 422 do Código Civil</strong>, informamos que o não comparecimento ou falta de comunicação no horário pré-estipulado pela cartomante implicará na perda da sessão, sem direito a estorno ou reembolso, devido à reserva exclusiva da agenda.
                      </p>
                      <a 
                        href="https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center space-x-2 text-[8px] text-red-400/70 hover:text-red-400 transition-colors uppercase font-black tracking-widest"
                      >
                        <ExternalLink size={10} />
                        <span>Consultar Lei Federal nº 8.078</span>
                      </a>
                    </div>

                    <div className="p-6 bg-gold/5 border border-gold/20 rounded-2xl flex items-center space-x-4">
                      <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                        <ExternalLink className="text-gold" size={14} />
                      </div>
                      <p className="text-[10px] text-gray-400 leading-relaxed font-medium italic">
                        "Seus dados serão enviados de forma segura. Ao confirmar, você será redirecionado para concluir o agendamento diretamente no WhatsApp."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;