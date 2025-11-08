import React from 'react';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SummonButton({ onClick, active }) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      className={`group relative inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold tracking-wide transition focus:outline-none focus:ring-2 focus:ring-amber-400/50 border ${
        active ? 'bg-amber-500 text-black border-amber-300' : 'bg-white/10 text-amber-100 border-white/10 hover:bg-white/15'
      }`}
    >
      <span className="absolute inset-0 rounded-full blur-md opacity-40 -z-[1] bg-gradient-to-r from-rose-600 via-amber-500 to-rose-600" />
      <Sparkles size={18} className="text-amber-200 drop-shadow" />
      <span>{active ? 'Hu Tao is here!' : 'Summon Hu Tao'}</span>
    </motion.button>
  );
}
