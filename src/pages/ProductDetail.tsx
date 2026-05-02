import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ShoppingCart, ShieldCheck, Zap, Star, MessageCircle } from 'lucide-react';
import { resourcesData, ResourceItem } from '../data';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ResourceItem | null>(null);

  useEffect(() => {
    if (id) {
      const found = resourcesData.find(item => item.id === id);
      setProduct(found || null);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h2 className="text-2xl font-bold text-text-muted">ไม่พบข้อมูลสินค้า</h2>
        <Link to="/store" className="px-6 py-2 bg-brand text-white rounded-xl font-bold">กลับสู่ร้านค้า</Link>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto py-8 px-4 sm:px-8"
    >
      <Link to="/store" className="inline-flex items-center gap-2 text-text-muted hover:text-brand transition-colors mb-8 font-medium">
        <ArrowLeft size={18} /> กลับสู่ร้านค้า
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Image Section */}
        <div className="space-y-4">
          <motion.div 
            layoutId={`image-${product.id}`}
            className="aspect-video bg-card-bg border border-border-subtle rounded-3xl overflow-hidden shadow-sm"
          >
            <img 
              src={product.imageUrl} 
              alt={product.title} 
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="grid grid-cols-4 gap-4">
             <div className="aspect-square bg-card-bg border border-border-subtle rounded-xl overflow-hidden cursor-pointer hover:border-brand transition-all">
                <img src={product.imageUrl} className="w-full h-full object-cover" />
             </div>
          </div>
        </div>

        {/* Right: Info Section */}
        <div className="flex flex-col">
          <div className="mb-6">
            <span className="px-3 py-1 bg-brand/10 text-brand text-xs font-bold rounded-full uppercase tracking-wider mb-3 inline-block">
              {product.category === 'Script' ? '📜 Script' : '💻 Source Code'}
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-text-main leading-tight mb-2">
              {product.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-text-muted">
               <div className="flex items-center gap-1">
                  <Star size={14} className="fill-brand text-brand" />
                  <Star size={14} className="fill-brand text-brand" />
                  <Star size={14} className="fill-brand text-brand" />
                  <Star size={14} className="fill-brand text-brand" />
                  <Star size={14} className="fill-brand text-brand" />
                  <span className="ml-1 text-text-main font-bold">5.0</span>
               </div>
               <span>•</span>
               <span>ยอดขาย 1.2k+ ชุด</span>
            </div>
          </div>

          <div className="p-6 bg-card-bg border border-border-subtle rounded-3xl mb-8">
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-4xl font-black text-brand">{product.price ? Number(product.price).toLocaleString() : '0'}</span>
              <span className="text-lg font-bold text-text-muted">บาท</span>
            </div>
            <div className="text-text-muted leading-relaxed mb-6 whitespace-pre-wrap">
              {product.fullDescription}
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
                <div className="flex items-center gap-2 text-text-muted">
                    <ShieldCheck size={18} className="text-green-500" /> อัปเดตตลอดชีพ
                </div>
                <div className="flex items-center gap-2 text-text-muted">
                    <Zap size={18} className="text-yellow-500" /> พร้อมใช้งานทันที
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 py-4 bg-brand hover:brightness-110 active:scale-95 transition-all text-white font-bold rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-brand/20">
                <ShoppingCart size={20} /> สั่งซื้อเลย
              </button>
              <button className="px-6 py-4 border-2 border-border-subtle hover:border-brand hover:text-brand transition-all font-bold rounded-2xl flex items-center justify-center gap-2">
                <MessageCircle size={20} /> สอบถาม
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 gap-4">
             <div className="p-4 bg-bg-app rounded-2xl border border-border-subtle flex gap-4">
                <div className="w-10 h-10 shrink-0 bg-brand/10 text-brand rounded-lg flex items-center justify-center">
                   <ShieldCheck size={20} />
                </div>
                <div>
                   <h4 className="font-bold text-sm">Safe & Verified</h4>
                   <p className="text-xs text-text-muted">ผ่านการตรวจสอบความปลอดภัย 100%</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetail;
