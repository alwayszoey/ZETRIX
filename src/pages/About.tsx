import React from 'react';
import { motion } from 'motion/react';
import { Info, Users, Target, Rocket } from 'lucide-react';

const About = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-4xl mx-auto py-12 px-4"
    >
      <section className="mb-16">
        <h1 className="text-4xl font-bold text-text-main mb-6 flex items-center gap-3">
          <Info className="w-10 h-10 text-brand" /> เกี่ยวกับเรา
        </h1>
        <p className="text-lg text-text-muted leading-relaxed">
          NexSpec คือแพลตฟอร์มที่มุ่งเน้นการให้บริการซอฟต์แวร์และโครงสร้างพื้นฐานที่มีประสิทธิภาพสูงสุด 
          เราก่อตั้งขึ้นเพื่อช่วยให้นักพัฒนาและธุรกิจสามารถปลดล็อกขีดความสามารถของตนเองผ่านเทคโนโลยีที่ทันสมัย
        </p>
      </section>

      <div className="space-y-8">
        <div className="flex gap-6 items-start">
          <div className="bg-brand/10 p-3 rounded-xl text-brand">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Professional Team</h3>
            <p className="text-text-muted">ทีมงานผู้เชี่ยวชาญที่มีประสบการณ์ในอุตสาหกรรมซอฟต์แวร์มากกว่า 10 ปี</p>
          </div>
        </div>

        <div className="flex gap-6 items-start">
          <div className="bg-brand/10 p-3 rounded-xl text-brand">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Our Mission</h3>
            <p className="text-text-muted">สร้างสรรค์เครื่องมือที่ช่วยให้งานที่ซับซ้อนกลายเป็นเรื่องง่าย</p>
          </div>
        </div>

        <div className="flex gap-6 items-start">
          <div className="bg-brand/10 p-3 rounded-xl text-brand">
            <Rocket className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Innovation Driven</h3>
            <p className="text-text-muted">เราไม่เคยหยุดนิ่งที่จะพัฒนาเทคโนโลยีใหม่ๆ เพื่ออนาคต</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
