import React, { useEffect, useRef } from 'react';

// Mystical Pyro/Ghost flame background with smooth motion and ambient butterflies
export default function FireBackground() {
  const canvasRef = useRef(null);
  const dprRef = useRef(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      dprRef.current = Math.min(window.devicePixelRatio || 1, 2);
      const { innerWidth: w, innerHeight: h } = window;
      canvas.width = w * dprRef.current;
      canvas.height = h * dprRef.current;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
    };
    resize();
    window.addEventListener('resize', resize);

    // Simple value noise helper for smooth flame motion
    const rnd = (seed) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };
    const valueNoise = (x, y, t) => {
      // lattice
      const x0 = Math.floor(x), y0 = Math.floor(y);
      const x1 = x0 + 1, y1 = y0 + 1;
      const sx = x - x0, sy = y - y0;
      const s = (a, b, k) => a + (b - a) * (k * k * (3 - 2 * k));
      const n00 = rnd(x0 * 13.37 + y0 * 7.71 + t * 0.123);
      const n10 = rnd(x1 * 13.37 + y0 * 7.71 + t * 0.123);
      const n01 = rnd(x0 * 13.37 + y1 * 7.71 + t * 0.123);
      const n11 = rnd(x1 * 13.37 + y1 * 7.71 + t * 0.123);
      const nx0 = s(n00, n10, sx);
      const nx1 = s(n01, n11, sx);
      return s(nx0, nx1, sy);
    };

    // Butterfly particles
    const butterflies = Array.from({ length: 24 }).map((_, i) => ({
      x: Math.random(),
      y: Math.random(),
      speed: 0.02 + Math.random() * 0.05,
      sway: 0.5 + Math.random() * 1.5,
      size: 6 + Math.random() * 10,
      hue: 20 + Math.random() * 30,
      offset: Math.random() * 1000 + i * 33,
    }));

    let start = performance.now();
    let raf;
    const draw = (now) => {
      const t = (now - start) / 1000;
      const W = canvas.width;
      const H = canvas.height;

      // Background gradient
      const grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, '#0a0709');
      grad.addColorStop(1, '#1a0c10');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      // Ghostly pyro flames columns
      const columns = 80;
      for (let i = 0; i < columns; i++) {
        const nx = i / columns;
        const baseX = nx * W;
        const width = (W / columns) * 1.2;
        for (let y = 0; y < H; y += 6) {
          const ny = y / H;
          const noise = valueNoise(nx * 6 + t * 0.2, ny * 6 - t * 0.35, t * 0.5);
          const intensity = Math.pow(1 - ny, 3) * 0.9 + noise * 0.35;
          const r = Math.floor(120 + 135 * intensity);
          const g = Math.floor(20 + 40 * intensity);
          const b = Math.floor(10);
          ctx.fillStyle = `rgba(${r},${g},${b},${0.04})`;
          const wobble = Math.sin((ny + t * 0.2) * 6 + nx * 10) * 8 * dprRef.current;
          ctx.fillRect(baseX + wobble, H - y - intensity * 50, width, 6);
        }
      }

      // Floating ghost flames (soft circles)
      for (let i = 0; i < 18; i++) {
        const px = valueNoise(i * 0.73 + t * 0.15, i * 1.17, t) * W;
        const py = (1 - ((t * 20 + i * 100) % (H + 200)) / (H + 200)) * H;
        const radius = 18 + (i % 6) * 8;
        const grad2 = ctx.createRadialGradient(px, py, 0, px, py, radius * 2);
        grad2.addColorStop(0, 'rgba(255,120,40,0.35)');
        grad2.addColorStop(0.6, 'rgba(255,80,20,0.15)');
        grad2.addColorStop(1, 'rgba(255,60,10,0)');
        ctx.fillStyle = grad2;
        ctx.beginPath();
        ctx.arc(px, py, radius * 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Butterflies
      butterflies.forEach((b) => {
        const x = (b.x * W + Math.sin(t * b.sway + b.offset) * 40 * dprRef.current) % W;
        let y = (H - ((t * 40 * b.speed + b.offset) % (H + 60))) - 30;
        if (y < -30) y += H + 60;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(Math.sin(t * 2 + b.offset) * 0.3);
        ctx.scale(dprRef.current, dprRef.current);
        // Draw butterfly wings as two bezier petals
        ctx.fillStyle = `hsla(${b.hue}, 85%, 60%, 0.35)`;
        const s = b.size;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-s, -s * 0.6, -s * 1.2, -s * 1.2, -s * 1.6, -s * 0.2);
        ctx.bezierCurveTo(-s * 1.2, s * 0.4, -s * 0.6, s * 0.6, 0, 0);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(s, -s * 0.6, s * 1.2, -s * 1.2, s * 1.6, -s * 0.2);
        ctx.bezierCurveTo(s * 1.2, s * 0.4, s * 0.6, s * 0.6, 0, 0);
        ctx.fill();
        // body
        ctx.fillStyle = 'rgba(255,160,80,0.5)';
        ctx.fillRect(-1.5, -s * 0.1, 3, s * 0.4);
        ctx.restore();
      });

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="fixed inset-0">
      <canvas ref={canvasRef} className="block w-full h-full" />
      {/* subtle vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_50%,rgba(0,0,0,0.6)_100%)]" />
      {/* faint red/amber glow overlay */}
      <div className="pointer-events-none absolute inset-0 mix-blend-screen bg-gradient-to-b from-[#2b0d10]/40 via-transparent to-[#f97316]/10" />
    </div>
  );
}
