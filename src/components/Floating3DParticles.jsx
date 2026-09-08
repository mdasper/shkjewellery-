import React from 'react';
import { motion } from 'framer-motion';

export default function Floating3DParticles() {
  const particles = [
    { size: 12, top: '15%', left: '10%', delay: 0, duration: 6 },
    { size: 20, top: '40%', left: '85%', delay: 1, duration: 8 },
    { size: 16, top: '70%', left: '15%', delay: 2, duration: 7 },
    { size: 24, top: '80%', left: '75%', delay: 0.5, duration: 9 },
    { size: 10, top: '25%', left: '60%', delay: 1.5, duration: 5 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p, idx) => (
        <motion.div
          key={idx}
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            top: p.top,
            left: p.left,
          }}
          className="absolute rounded-full bg-gradient-to-r from-brand-gold via-brand-goldLight to-brand-goldDark opacity-25 blur-[1px] shadow-gold-glow"
          animate={{
            y: [0, -25, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.25, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: p.delay
          }}
        />
      ))}
    </div>
  );
}
