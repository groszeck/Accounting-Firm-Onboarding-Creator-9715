import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Confetti = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const colors = ['#F2E4CD', '#002999', '#0041E8', '#ffffff', '#ffeaa7', '#dda0dd', '#98d8c8'];
    const newParticles = [];

    for (let i = 0; i < 50; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -10,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 10 + 5,
        rotation: Math.random() * 360,
        velocity: {
          x: (Math.random() - 0.5) * 4,
          y: Math.random() * 3 + 2
        }
      });
    }

    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{
              x: particle.x,
              y: particle.y,
              rotate: particle.rotation,
              scale: 1,
              opacity: 1
            }}
            animate={{
              y: window.innerHeight + 100,
              x: particle.x + particle.velocity.x * 100,
              rotate: particle.rotation + 720,
              scale: 0.5,
              opacity: 0
            }}
            transition={{
              duration: 3,
              ease: "easeOut",
              delay: Math.random() * 2
            }}
            exit={{ opacity: 0 }}
            className="absolute"
            style={{
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              borderRadius: Math.random() > 0.5 ? '50%' : '0%'
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Confetti;