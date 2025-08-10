import { motion } from "framer-motion";

export default function ParticleBackground() {
  const particles = [
    { id: 1, size: 8, x: 10, y: 10, delay: 0 },
    { id: 2, size: 12, x: 80, y: 20, delay: 1 },
    { id: 3, size: 4, x: 20, y: 60, delay: 2 },
    { id: 4, size: 8, x: 70, y: 80, delay: 3 },
    { id: 5, size: 16, x: 50, y: 30, delay: 4 },
    { id: 6, size: 4, x: 90, y: 70, delay: 5 },
  ];

  return (
    <div className="parallax-bg">
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="particle"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: particle.delay,
            }}
          />
        ))}
      </div>
    </div>
  );
}
