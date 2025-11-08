import React, { useEffect, useMemo, useState } from 'react';
import { MessageCircle, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const QUOTES = [
  "Let the living beware~ heehee!",
  "Wanna see a ghost? Just follow me!",
  "When the sun sets, the spirits dance.",
  "If you see butterflies, a good luck spirit is near!",
  "Business is booming—afterlife booming!",
  "Shh... Hear that? It's lively tonight.",
  "Pyro burning bright, keep your lantern light!",
  "Boo! Did I scare ya?",
];

export default function DialogBox() {
  const [index, setIndex] = useState(0);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % QUOTES.length);
      setKey((k) => k + 1);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const randomize = () => {
    const next = Math.floor(Math.random() * QUOTES.length);
    setIndex(next);
    setKey((k) => k + 1);
  };

  const text = useMemo(() => QUOTES[index], [index]);

  return (
    <div className="max-w-xl w-full rounded-2xl bg-white/7 backdrop-blur-md border border-white/10 p-4 md:p-5 text-amber-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_10px_40px_rgba(0,0,0,0.35)]">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-amber-200/90">
          <MessageCircle size={18} />
          <span className="text-sm font-semibold tracking-wide">Hu Tao says</span>
        </div>
        <button
          onClick={randomize}
          className="text-amber-300/80 hover:text-amber-200 transition flex items-center gap-1 text-xs"
        >
          <RefreshCw size={14} /> Random
        </button>
      </div>
      <AnimatePresence mode="wait">
        <motion.p
          key={key}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.35 }}
          className="text-base md:text-lg leading-relaxed text-amber-100/95"
        >
          {text}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
