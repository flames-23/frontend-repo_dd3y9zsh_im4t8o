import React, { useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';
import { motion, AnimatePresence } from 'framer-motion';

// 3D Hu Tao viewer using Spline. Replace scene URL with a public Hu Tao-like scene if available.
// Interactions: hover glow, click ripple, entrance on summon.
export default function HuTao3D({ summoned }) {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);
  const handleClick = () => {
    setClicked(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setClicked(false), 500);
  };

  return (
    <div className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh]">
      <motion.div
        className="absolute inset-0 rounded-xl overflow-hidden"
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={summoned ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 90, damping: 20 }}
      >
        <div
          className="absolute inset-0"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
        >
          <Spline
            scene="https://prod.spline.design/6Z8tOaVIdr6m3VdQ/scene.splinecode"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        {/* Hover glow */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              className="pointer-events-none absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="absolute inset-0 blur-2xl opacity-30 bg-[radial-gradient(ellipse_at_center,rgba(255,120,60,0.6),rgba(0,0,0,0))]" />
            </motion.div>
          )}
        </AnimatePresence>
        {/* Click ripple */}
        <AnimatePresence>
          {clicked && (
            <motion.div
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.4, scale: 1.2 }}
              exit={{ opacity: 0, scale: 1.4 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <div className="w-40 h-40 rounded-full border border-amber-400/60 shadow-[0_0_60px_rgba(255,140,80,0.6)]" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
