import React from 'react';
import { motion } from 'motion/react';
import { Mail, MessageSquare, MapPin, Send } from 'lucide-react';

const Contact = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      className="max-w-4xl mx-auto py-12 px-4"
    >
      <h1 className="text-4xl font-bold text-text-main mb-8">ติดต่อเรา</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <p className="text-lg text-text-muted mb-8">
            มีคำถามหรือต้องการความช่วยเหลือ? ทีมงานของเราพร้อมตอบกลับคุณโดยเร็วที่สุด
          </p>

          <div className="flex items-center gap-4 p-4 border border-border-subtle rounded-2xl">
            <Mail className="text-brand w-6 h-6" />
            <div>
              <p className="text-xs text-text-muted uppercase font-bold tracking-wider">Email</p>
              <p className="text-text-main font-semibold">support@nexspec.io</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 border border-border-subtle rounded-2xl">
            <MessageSquare className="text-brand w-6 h-6" />
            <div>
              <p className="text-xs text-text-muted uppercase font-bold tracking-wider">Discord</p>
              <p className="text-text-main font-semibold">Join our community</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 border border-border-subtle rounded-2xl">
            <MapPin className="text-brand w-6 h-6" />
            <div>
              <p className="text-xs text-text-muted uppercase font-bold tracking-wider">Location</p>
              <p className="text-text-main font-semibold">Bangkok, Thailand</p>
            </div>
          </div>
        </div>

        <form className="bg-card-bg p-8 rounded-3xl border border-border-subtle shadow-sm space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5 ml-1">ชื่อของคุณ</label>
            <input 
              type="text" 
              className="w-full px-4 py-3 bg-bg-app border border-border-subtle rounded-xl focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all"
              placeholder="กรอกชื่อของคุณ"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5 ml-1">อีเมล</label>
            <input 
              type="email" 
              className="w-full px-4 py-3 bg-bg-app border border-border-subtle rounded-xl focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5 ml-1">ข้อความ</label>
            <textarea 
              rows={4}
              className="w-full px-4 py-3 bg-bg-app border border-border-subtle rounded-xl focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all resize-none"
              placeholder="พิมพ์ข้อความของคุณที่นี่..."
            ></textarea>
          </div>
          <button className="w-full py-4 bg-brand hover:brightness-110 transition-all text-white font-bold rounded-xl flex items-center justify-center gap-2">
            ส่งข้อความ <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default Contact;
