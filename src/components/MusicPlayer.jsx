import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music2 } from 'lucide-react';
import { motion } from 'framer-motion';

// Simple audio player with animated sound bars and toggle
export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.play().catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
  }, [playing]);

  // Free-to-use placeholder music; in production, swap to the licensed track.
  const musicUrl = 'https://cdn.pixabay.com/download/audio/2021/09/08/audio_3d9ab6cc8d.mp3?filename=dark-ambient-96569.mp3';

  return (
    <div className="flex items-center gap-3 px-4 py-2 rounded-full backdrop-blur-md bg-white/5 border border-white/10 shadow-lg">
      <button
        onClick={() => setPlaying((p) => !p)}
        className="flex items-center gap-2 text-amber-200 hover:text-amber-300 transition"
        aria-label={playing ? 'Pause music' : 'Play music'}
      >
        {playing ? <Volume2 size={18} /> : <VolumeX size={18} />}
        <span className="text-xs font-medium tracking-wide hidden sm:block">Theme</span>
      </button>
      <div className="flex items-end gap-1 h-5 w-16">
        {[...Array(6)].map((_, i) => (
          <motion.span
            key={i}
            className="w-1 rounded-sm bg-amber-400/70"
            animate={{ height: playing ? [4, 18, 10, 22, 8, 16][i % 6] : 4 }}
            transition={{ duration: 0.6 + (i % 3) * 0.1, repeat: Infinity, repeatType: 'mirror' }}
          />
        ))}
      </div>
      <Music2 size={16} className="text-amber-300/80" />
      <audio ref={audioRef} src={musicUrl} loop preload="auto" />
    </div>
  );
}
