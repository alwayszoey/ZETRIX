import React, { useState } from 'react';
import { Gift, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { ModalShell } from './ModalShell';
import { translations } from '../translations';

interface TopupGiftModalProps {
  onClose: () => void;
  onSuccess: (amount: number) => void;
  lang?: 'th' | 'vi';
}

type Status = 'idle' | 'loading' | 'success' | 'error';

export function TopupGiftModal({ onClose, onSuccess, lang = 'th' }: TopupGiftModalProps) {
  const [link, setLink] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');
  const [amount, setAmount] = useState<number | null>(null);
  const t = (key: keyof typeof translations) => (translations as any)[key] || key;

  const handleSubmit = async () => {
    if (!link.trim()) {
      setStatus('error');
      setMessage(lang === 'vi' ? 'Vui lòng nhập liên kết quà tặng' : 'กรุณากรอกลิงค์ซองของขวัญ');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
      const res = await fetch('/api/topup/gift', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ link }),
      });

      const data = await res.json();

      if (res.ok && data.status === 'success') {
        setStatus('success');
        setAmount(data.amount);
        setMessage(data.message || (lang === 'vi' ? `Nhận được ${data.amount}!` : `ได้รับเงิน ${data.amount} บาท`));
        setTimeout(() => onSuccess(data.amount), 1800);
      } else {
        setStatus('error');
        setMessage(data.message || (lang === 'vi' ? 'Đã xảy ra lỗi' : 'เกิดข้อผิดพลาด'));
      }
    } catch {
      setStatus('error');
      setMessage(lang === 'vi' ? 'Không thể kết nối đến máy chủ' : 'ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้');
    }
  };

  return (
    <ModalShell
      title="TrueMoney Gift"
      subtitle={t('topupGiftDesc')}
      icon={<Gift className="w-5 h-5" />}
      onClose={onClose}
    >
      <div className="space-y-4">
        {/* Input */}
        <div>
          <label className="block text-sm font-medium text-text-muted mb-1.5">
            {lang === 'vi' ? 'Liên kết quà tặng' : 'ลิงค์ซองของขวัญ'}
          </label>
          <input
            type="text"
            value={link}
            onChange={(e) => { setLink(e.target.value); setStatus('idle'); }}
            placeholder="https://gift.truemoney.com/campaign/?v=..."
            disabled={status === 'loading' || status === 'success'}
            className="w-full px-4 py-3 rounded-[14px] border border-border-subtle bg-bg-app text-text-main text-sm placeholder:text-text-muted/60 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 disabled:opacity-60 transition-all shadow-inner"
          />
        </div>

        {/* Status Feedback */}
        {status === 'error' && (
          <div className="flex items-start gap-2 px-4 py-3 rounded-[12px] bg-red-500/10 border border-red-500/20">
            <XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
            <p className="text-sm text-red-600 font-medium leading-relaxed">{message}</p>
          </div>
        )}
        {status === 'success' && (
          <div className="flex items-center gap-2 px-4 py-3 rounded-[12px] bg-emerald-500/10 border border-emerald-500/20">
            <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
            <p className="text-sm text-emerald-600 font-medium">
              {lang === 'vi' ? 'Nạp tiền thành công!' : 'เติมเงินสำเร็จ!'} +{amount} 🎉
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-1">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-[14px] border border-border-subtle text-text-main bg-bg-app text-sm font-semibold hover:border-brand/40 hover:text-brand transition-colors"
          >
            {lang === 'vi' ? 'Hủy bỏ' : 'ยกเลิก'}
          </button>
          <button
            onClick={handleSubmit}
            disabled={status === 'loading' || status === 'success'}
            className="flex-1 py-3 rounded-[14px] bg-brand hover:brightness-110 text-white text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-70 transition-all shadow-[0_2px_10px_rgba(106,154,251,0.2)]"
          >
            {status === 'loading' ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> {lang === 'vi' ? 'Đang kiểm tra...' : 'กำลังตรวจสอบ...'}</>
            ) : status === 'success' ? (
              <><CheckCircle className="w-4 h-4" /> {lang === 'vi' ? 'Thành công!' : 'สำเร็จ!'}</>
            ) : (
              lang === 'vi' ? 'Xác nhận nạp tiền' : 'ยืนยันการเติมเงิน'
            )}
          </button>
        </div>
      </div>
    </ModalShell>
  );
}
