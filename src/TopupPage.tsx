import React, { useState } from 'react';
import { Wallet, Gift, QrCode, Receipt, Clock, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { TopupGiftModal } from './modals/TopupGiftModal';
import { TopupPromptPayModal } from './modals/TopupPromptPayModal';
import { TopupSlipModal } from './modals/TopupSlipModal';
import { TopupHistoryModal } from './modals/TopupHistoryModal';
import { translations } from './translations';

type ModalType = 'gift' | 'promptpay' | 'slip' | 'history' | null;

interface TopupPageProps {
  currentUser: { id: string; username: string; email: string } | null;
  onBalanceUpdate?: (newBalance: number) => void;
  lang?: 'th' | 'vi';
}

export function TopupPage({ currentUser, onBalanceUpdate, lang = 'th' }: TopupPageProps) {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const t = (key: keyof typeof translations) => (translations as any)[key] || key;

  const METHOD_CARDS = [
    {
      id: 'gift' as ModalType,
      icon: Gift,
      title: 'TrueMoney Gift',
      desc: t('topupGiftDesc'),
      badge: 'Auto',
      badgeColor: 'text-brand bg-brand/10 border-brand/20',
      iconBg: 'bg-brand/10',
      imgSrc: 'https://img2.pic.in.th/download7a68ea330c321b38.png',
    },
    {
      id: 'promptpay' as ModalType,
      icon: QrCode,
      title: 'PromptPay QR',
      desc: t('topupPromptPayDesc'),
      badge: 'Recommend',
      badgeColor: 'text-brand bg-brand/10 border-brand/20',
      iconBg: 'bg-brand/10',
      imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXwvGngc1UzYjIpR9vQOUmqQoNLhwK30eptdsBu-CbpA&s',
    },
    {
      id: 'slip' as ModalType,
      icon: Receipt,
      title: 'SLIP CHECK',
      desc: t('topupSlipDesc'),
      badge: 'Auto',
      badgeColor: 'text-brand bg-brand/10 border-brand/20',
      iconBg: 'bg-brand/10',
      imgSrc: 'https://img5.pic.in.th/file/secure-sv1/slip.webp',
    },
  ];

  const openModal = (id: ModalType) => {
    if (!currentUser) {
      alert(t('loginToDownload'));
      return;
    }
    setActiveModal(id);
  };

  const closeModal = () => setActiveModal(null);

  const handleSuccess = (amount: number) => {
    onBalanceUpdate?.(amount);
    closeModal();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-bg-app px-4 py-8 font-sans">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="flex items-center justify-center w-10 h-10 rounded-[14px] bg-brand/10 border border-brand/20 text-brand shadow-inner">
              <Wallet className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-bold text-text-main tracking-tight">{t('topupTitle')}</h1>
          </div>
          <p className="text-text-muted text-sm ml-[52px]">{t('topupDesc')}</p>
        </motion.div>

        {/* Method Cards */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col gap-3 mb-6">
          {METHOD_CARDS.map((method) => (
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              key={method.id}
              onClick={() => openModal(method.id)}
              className="group w-full flex items-center gap-4 p-4 rounded-[18px] bg-card-bg border border-border-subtle hover:border-brand/40 shadow-sm hover:shadow-brand/5 transition-all duration-300 text-left"
            >
              <div className={`shrink-0 w-[60px] h-[60px] rounded-[14px] flex items-center justify-center overflow-hidden border border-border-subtle ${method.iconBg}`}>
                <img
                  src={method.imgSrc}
                  alt={method.title}
                  className="w-10 h-10 object-contain drop-shadow-sm group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-bold text-text-main text-base group-hover:text-brand transition-colors">{method.title}</span>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${method.badgeColor}`}>
                    {method.badge}
                  </span>
                </div>
                <p className="text-text-muted text-sm">{method.desc}</p>
              </div>

              <ChevronRight className="w-5 h-5 text-border-subtle group-hover:text-brand group-hover:translate-x-1 transition-all shrink-0" />
            </motion.button>
          ))}
        </motion.div>

        {/* History Button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onClick={() => openModal('history')}
          className="w-full flex items-center justify-between p-4 rounded-[18px] border-2 border-dashed border-border-subtle hover:border-brand/50 text-text-muted hover:text-brand bg-card-bg hover:bg-brand/5 transition-all duration-300 group shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-bg-app border border-border-subtle group-hover:border-brand/30 transition-colors">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-sm font-semibold">{t('topupHistory')}</span>
          </div>
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </motion.button>

        {/* Modals */}
        {activeModal === 'gift' && (
          <TopupGiftModal lang={lang} onClose={closeModal} onSuccess={handleSuccess} />
        )}
        {activeModal === 'promptpay' && (
          <TopupPromptPayModal lang={lang} onClose={closeModal} onSuccess={handleSuccess} />
        )}
        {activeModal === 'slip' && (
          <TopupSlipModal lang={lang} onClose={closeModal} onSuccess={handleSuccess} />
        )}
        {activeModal === 'history' && (
          <TopupHistoryModal lang={lang} onClose={closeModal} />
        )}
      </div>
    </div>
  );
}
