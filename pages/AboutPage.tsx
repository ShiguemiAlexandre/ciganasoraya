import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, Sparkles, Moon, Star } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-mystic-texture min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 px-4 overflow-hidden border-b border-purple-500/10">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(157,80,187,0.2)_0%,transparent_60%)]"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <div className="inline-flex items-center space-x-2 text-gold text-[10px] font-black uppercase tracking-[0.5em] mb-4">
             <Star size={14} className="animate-pulse" />
             <span>Nossa Essência</span>
          </div>
          <h1 className="serif text-5xl md:text-7xl font-bold text-white italic leading-tight">
            Nossa Jornada <br />
            <span className="text-purple-400 not-italic">Espiritual</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed italic">
            "A Cigana Soraya nasceu no coração de um terreiro de Umbanda, com o propósito de levar clareza e acolhimento através dos oráculos sagrados."
          </p>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="max-w-6xl mx-auto py-20 md:py-32 px-4 space-y-24 md:space-y-40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-[10px] font-black text-gold uppercase tracking-[0.4em]">Tradição e Modernidade</span>
              <h2 className="serif text-4xl md:text-5xl font-bold text-white">O que é a Cartomancia?</h2>
            </div>
            <div className="space-y-6 text-gray-400 leading-relaxed text-lg font-light">
              <p>
                Diferente de previsões deterministas, a cartomancia com a Cigana Soraya é vista como um <span className="text-white italic">espelho da alma</span>. As cartas mostram as energias presentes no seu momento atual e os caminhos possíveis que se abrem diante de suas escolhas.
              </p>
              <p>
                Através da intuição e do conhecimento técnico, o cartomante atua como um tradutor dos símbolos sagrados, conectando-os à sua realidade e aos conselhos da espiritualidade ancestral.
              </p>
            </div>
            <div className="pt-6">
              <Link to="/jogos" className="text-gold text-xs font-black uppercase tracking-widest flex items-center group">
                <span>Conheça os Oráculos</span>
                <Sparkles size={16} className="ml-3 group-hover:rotate-12 transition-transform" />
              </Link>
            </div>
          </div>
          
          <div className="relative group">
            <div className="absolute -inset-4 bg-purple-500/20 rounded-[3rem] blur-2xl group-hover:bg-purple-500/30 transition-all duration-700"></div>
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 aspect-square">
              <img 
                src="https://img.freepik.com/free-photo/divination-fortune-telling-created-with-generative-ai-technology_185193-110024.jpg" 
                alt="Cartas de Tarot em ambiente místico" 
                className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a0b2e] via-transparent to-transparent opacity-60"></div>
            </div>
          </div>
        </div>

        {/* Pillars Section */}
        <div className="relative">
           <div className="text-center mb-16 space-y-4">
             <h2 className="serif text-4xl md:text-5xl font-bold text-white">Nossos Pilares de <span className="text-gold italic">Ética</span></h2>
             <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em]">Compromisso com o consulente</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[
               {
                 icon: ShieldCheck,
                 title: "Sigilo Absoluto",
                 desc: "Tudo o que é dito na consulta permanece na consulta. Respeitamos a sacralidade da sua privacidade."
               },
               {
                 icon: Heart,
                 title: "Acolhimento Real",
                 desc: "Não julgamos suas questões ou caminhos. Nosso papel é orientar com amor, empatia e verdade."
               },
               {
                 icon: Sparkles,
                 title: "Responsabilidade",
                 desc: "Damos orientações realistas. A espiritualidade auxilia, mas nunca substitui a medicina ou psicologia."
               }
             ].map((pilar, idx) => (
               <div key={idx} className="group bg-white/5 backdrop-blur-sm p-10 rounded-[2.5rem] border border-white/5 hover:border-purple-500/30 transition-all duration-500 hover:-translate-y-2">
                 <div className="w-14 h-14 bg-gold/10 rounded-2xl flex items-center justify-center text-gold mb-8 border border-gold/20 group-hover:scale-110 group-hover:rotate-3 transition-all">
                   <pilar.icon size={28} />
                 </div>
                 <h4 className="serif text-xl font-bold text-white mb-4">{pilar.title}</h4>
                 <p className="text-sm text-gray-400 leading-relaxed font-light">{pilar.desc}</p>
               </div>
             ))}
           </div>
        </div>

        {/* Call to Action */}
        <div className="relative p-10 md:p-20 rounded-[3.5rem] bg-gradient-to-br from-[#1a0b2e] via-[#2d144d] to-[#1a0b2e] text-white text-center space-y-10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-purple-500/20 overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Moon size={120} className="text-gold rotate-12" />
          </div>
          
          <div className="relative z-10 space-y-6">
            <h2 className="serif text-4xl md:text-6xl font-bold italic leading-tight">Inicie sua busca <br /><span className="text-gold not-italic">hoje mesmo</span></h2>
            <p className="text-gray-300 max-w-xl mx-auto text-lg font-light italic">
              Estamos prontos para te receber e auxiliar em sua caminhada com a luz dos oráculos e a força da espiritualidade.
            </p>
          </div>
          
          <div className="relative z-10 pt-4">
            <Link 
              to="/agendar" 
              className="inline-block px-16 py-6 bg-[#d4af37] text-[#1a0b2e] rounded-full font-black text-xs uppercase tracking-[0.3em] shadow-[0_20px_50px_rgba(212,175,55,0.4)] hover:scale-105 hover:brightness-110 transition-all active:scale-95 shadow-2xl"
            >
              Marcar Minha Consulta
            </Link>
          </div>
        </div>
      </section>

      {/* Health Warning Footer */}
      <section className="bg-black/40 py-16 px-4 border-t border-white/5">
        <div className="max-w-2xl mx-auto text-center space-y-6">
           <div className="flex justify-center space-x-2 text-red-500/50">
             <Star size={12} fill="currentColor" />
             <Star size={12} fill="currentColor" />
             <Star size={12} fill="currentColor" />
           </div>
           <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.4em]">Aviso de Responsabilidade</p>
           <p className="text-sm text-gray-500 italic leading-relaxed font-light">
             "O atendimento espiritual é uma ferramenta sagrada de autoconhecimento e fé. Não substituímos, em hipótese alguma, acompanhamento médico, psicológico ou psiquiátrico. Sempre consulte profissionais de saúde para diagnósticos e tratamentos físicos ou mentais."
           </p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;