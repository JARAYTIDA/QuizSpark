import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

interface QuizTimerProps {
  initialTime: number; // in seconds
  onTimeUp: () => void;
}

export default function QuizTimer({ initialTime, onTimeUp }: QuizTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);

  useEffect(() => {
    if (timeRemaining <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, onTimeUp]);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const isLowTime = timeRemaining <= 300; // 5 minutes

  return (
    <motion.div
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-white font-semibold ${
        isLowTime
          ? "bg-gradient-to-r from-red-500 to-pink-500"
          : "bg-gradient-to-r from-indigo-500 to-purple-500"
      }`}
      animate={{
        scale: isLowTime ? [1, 1.05, 1] : 1,
      }}
      transition={{
        duration: 1,
        repeat: isLowTime ? Infinity : 0,
      }}
    >
      <Clock className="h-4 w-4" />
      <span>
        {minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
      </span>
    </motion.div>
  );
}
