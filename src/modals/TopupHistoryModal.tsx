import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, Loader2, Wallet } from 'lucide-react';
import { ModalShell } from './ModalShell';
import { translations } from '../translations';

interface TopupHistoryModalProps {
  onClose: () => void;
  lang?: 'th' | 'vi';
}

interface HistoryItem {
  _id: string;
  method: string;
  amount: number;
  status: 'success' | 'failed';
  note?: string;
  createdAt: string;
}

const METHOD_LABELS: Record<string, string> = {
  gift: 'TrueMoney Gift',
  slip: 'Slip Check',
  promptpay: 'PromptPay QR',
};

function formatDate(iso: string, lang: 'th' | 'vi') {
  return new Date(iso).toLocaleString(lang === 'vi' ? 'vi-VN' : 'th-TH', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

export function TopupHistoryModal({ onClose, lang = 'th' }: TopupHistoryModalProps) {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const t = (key: keyof typeof translations) => (translations as any)[key] || key;

  useEffect(() => {
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    fetch('/api/topup/history', {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.history) setHistory(d.history);
        else setError(d.message || (lang === 'vi' ? 'Đã xảy ra lỗi' : 'เกิดข้อผิดพลาด'));
      })
      .catch(() => setError(lang === 'vi' ? 'Không thể tải dữ liệu' : 'ไม่สามารถโหลดข้อมูลได้'))
      .finally(() => setLoading(false));
  }, [lang]);

  return (
    <ModalShell
      title={t('topupHistory')}
      icon={<Clock className="w-5 h-5" />}
      onClose={onClose}
    >
      {loading ? (
        <div className="flex items-center justify-center py-12 gap-2 text-text-muted">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-sm">{t('topupHistoryLoading')}</span>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center py-12">
          <p className="text-sm text-red-500 font-medium">{error}</p>
        </div>
      ) : history.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 gap-3 text-text-muted">
          <Wallet className="w-10 h-10 opacity-30" />
          <p className="text-sm">{t('topupHistoryEmpty')}</p>
        </div>
      ) : (
        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1 hide-scrollbar">
          {history.map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-3 p-3.5 rounded-[14px] border border-border-subtle bg-bg-app hover:border-brand/40 transition-colors shadow-sm"
            >
              {/* Status Icon */}
              <div className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center shadow-inner ${
                item.status === 'success'
                  ? 'bg-emerald-500/10'
                  : 'bg-red-500/10'
              }`}>
                {item.status === 'success' ? (
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-500" />
                )}
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-text-main truncate">
                  {METHOD_LABELS[item.method] || item.method || 'Topup'}
                </p>
                <p className="text-xs text-text-muted">{formatDate(item.createdAt, lang)}</p>
                {item.note && item.status === 'failed' && (
                  <p className="text-xs text-red-500 font-medium mt-0.5 truncate">{item.note}</p>
                )}
              </div>

              {/* Amount */}
              <div className="text-right shrink-0">
                <p className={`font-bold text-sm ${
                  item.status === 'success' ? 'text-emerald-500' : 'text-text-muted line-through'
                }`}>
                  +{item.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })} ฿
                </p>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full border ${
                  item.status === 'success'
                    ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                    : 'bg-red-500/10 text-red-600 border-red-500/20'
                }`}>
                  {item.status === 'success' ? (lang === 'vi' ? 'THÀNH CÔNG' : 'สำเร็จ') : (lang === 'vi' ? 'THẤT BẠI' : 'ไม่สำเร็จ')}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </ModalShell>
  );
}
