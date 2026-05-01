import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, X } from 'lucide-react';

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent-accepted');
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent-accepted', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-6 right-6 z-[6000] md:left-auto md:max-w-md"
        >
          <div className="bg-[#1a0b2e]/95 backdrop-blur-xl border border-gold/30 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center shrink-0">
                <ShieldCheck className="text-gold" size={20} />
              </div>
              <div className="space-y-3">
                <h4 className="serif text-white font-bold tracking-wide italic">Privacidade & Cookies</h4>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  Utilizamos cookies para melhorar sua experiência e analisar nosso tráfego, em conformidade com a LGPD. Ao continuar navegando, você concorda com nossa política de privacidade.
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={acceptCookies}
                    className="w-full py-2.5 bg-gold text-deep-purple text-[10px] font-black uppercase tracking-widest rounded-full hover:scale-105 transition-all shadow-lg active:scale-95"
                  >
                    Aceitar e Continuar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
