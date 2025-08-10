import { ReactNode } from "react";
import { motion } from "framer-motion";

interface AnimatedCardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  onClick?: () => void;
}

export default function AnimatedCard({ children, delay = 0, className = "", onClick }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: "easeOut",
      }}
      whileHover={{ 
        y: -8, 
        rotateX: 5,
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.95 }}
      className={`quiz-card glass-morphism cursor-pointer glow-effect ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
