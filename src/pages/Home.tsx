import React from 'react';
import { motion } from 'motion/react';
import { Home as HomeIcon, Zap, Shield, Star } from 'lucide-react';

const Home = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto py-12 px-4"
    >
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-text-main mb-4">ยินดีต้อนรับสู่ NexSpec</h1>
        <p className="text-xl text-text-muted">High-performance specification and configuration platform.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 bg-card-bg border border-border-subtle rounded-2xl shadow-sm">
          <Zap className="w-10 h-10 text-brand mb-4" />
          <h3 className="text-lg font-bold mb-2">Fast Performance</h3>
          <p className="text-text-muted text-sm">Experience blazing fast speeds with our optimized engine.</p>
        </div>
        <div className="p-6 bg-card-bg border border-border-subtle rounded-2xl shadow-sm">
          <Shield className="w-10 h-10 text-brand mb-4" />
          <h3 className="text-lg font-bold mb-2">Secure & Reliable</h3>
          <p className="text-text-muted text-sm">Your data is protected by industry-standard encryption.</p>
        </div>
        <div className="p-6 bg-card-bg border border-border-subtle rounded-2xl shadow-sm">
          <Star className="w-10 h-10 text-brand mb-4" />
          <h3 className="text-lg font-bold mb-2">Premium Support</h3>
          <p className="text-text-muted text-sm">24/7 dedicated support for all our premium members.</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
