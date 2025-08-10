import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  direction: number;
}

export default function ParticleSystem() {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const createParticles = () => {
      const particles: Particle[] = [];
      const particleCount = 15;

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 4 + 1,
          speed: Math.random() * 0.5 + 0.1,
          direction: Math.random() * Math.PI * 2,
        });
      }

      return particles;
    };

    particlesRef.current = createParticles();

    const animateParticles = () => {
      if (!containerRef.current) return;

      particlesRef.current.forEach((particle) => {
        particle.y -= particle.speed;
        
        if (particle.y < -particle.size) {
          particle.y = window.innerHeight + particle.size;
          particle.x = Math.random() * window.innerWidth;
        }
      });

      requestAnimationFrame(animateParticles);
    };

    animateParticles();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {/* Animated geometric shapes */}
      <motion.div
        className="particle w-2 h-2"
        style={{ top: "10%", left: "10%" }}
        animate={{
          y: [-20, 20],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="particle w-3 h-3"
        style={{ top: "20%", left: "80%" }}
        animate={{
          y: [-15, 25],
          opacity: [0.4, 0.9, 0.4],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      
      <motion.div
        className="particle w-1 h-1"
        style={{ top: "60%", left: "20%" }}
        animate={{
          y: [-10, 15],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      
      <motion.div
        className="particle w-2 h-2"
        style={{ top: "80%", left: "70%" }}
        animate={{
          y: [-25, 10],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />
      
      <motion.div
        className="particle w-4 h-4"
        style={{ top: "30%", left: "50%" }}
        animate={{
          y: [-20, 30],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />
      
      <motion.div
        className="particle w-1 h-1"
        style={{ top: "70%", left: "90%" }}
        animate={{
          y: [-15, 20],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
      />
    </div>
  );
}
