import React, { useState } from 'react';
import FireBackground from './components/FireBackground';
import HuTao3D from './components/HuTao3D';
import MusicPlayer from './components/MusicPlayer';
import DialogBox from './components/DialogBox';
import SummonButton from './components/SummonButton';
import { motion } from 'framer-motion';

export default function App() {
  const [summoned, setSummoned] = useState(false);

  return (
    <div className="relative min-h-screen text-white overflow-hidden bg-[#0c0709]">
      {/* Dynamic mystical background */}
      <FireBackground />

      {/* Top bar controls */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        <MusicPlayer />
      </div>

      {/* Header */}
      <header className="relative z-10 pt-20 md:pt-24">
        <div className="mx-auto max-w-6xl px-6">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-amber-300 via-rose-300 to-amber-200 bg-clip-text text-transparent drop-shadow"
          >
            Wangsheng Parlor Presents: Hu Tao
          </motion.h1>
          <p className="mt-3 text-center text-amber-100/80 max-w-2xl mx-auto">
            A mystical, playful space of ghostly flames, butterflies, and whimsy. Interact with the scene, listen to the tune, and let the spirits dance.
          </p>
          <div className="mt-6 flex justify-center">
            <SummonButton onClick={() => setSummoned(true)} active={summoned} />
          </div>
        </div>
      </header>

      {/* 3D Character */}
      <main className="relative z-10 mt-6 md:mt-10">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <HuTao3D summoned={summoned} />

          <div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="md:col-span-2">
              <DialogBox />
            </div>
            <div className="flex items-center justify-center">
              <div className="w-full rounded-2xl p-4 md:p-6 bg-white/7 backdrop-blur-md border border-white/10 text-amber-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_10px_40px_rgba(0,0,0,0.35)]">
                <h3 className="text-lg font-semibold mb-2">Tips</h3>
                <ul className="text-sm list-disc pl-5 space-y-1 text-amber-100/90">
                  <li>Hover and click on the scene—Hu Tao reacts.</li>
                  <li>Toggle the theme to set the mood.</li>
                  <li>Watch butterflies glide through ghostly flames.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom glow accents */}
      <div className="pointer-events-none fixed bottom-0 left-0 right-0 h-40 z-0 bg-gradient-to-t from-rose-700/30 via-amber-600/20 to-transparent" />
    </div>
  );
}
