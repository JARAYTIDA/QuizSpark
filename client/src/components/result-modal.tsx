import { motion } from "framer-motion";
import { Trophy, RotateCcw, List } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  score: number;
  totalQuestions: number;
  percentage: number;
  onRetake: () => void;
  onBackToQuestionBanks: () => void;
}

export default function ResultModal({
  isOpen,
  score,
  totalQuestions,
  percentage,
  onRetake,
  onBackToQuestionBanks,
}: ResultModalProps) {
  if (!isOpen) return null;

  const getPerformanceMessage = (percentage: number) => {
    if (percentage >= 90) return "Outstanding! 🎉";
    if (percentage >= 80) return "Excellent Work! 👏";
    if (percentage >= 70) return "Good Job! 👍";
    if (percentage >= 60) return "Keep Improving! 💪";
    return "Practice More! 📚";
  };

  const getPerformanceColor = (percentage: number) => {
    if (percentage >= 80) return "from-green-500 to-emerald-500";
    if (percentage >= 60) return "from-yellow-500 to-orange-500";
    return "from-red-500 to-pink-500";
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.7, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="glass-morphism rounded-xl p-8 max-w-md w-full mx-4"
      >
        <div className="text-center space-y-6">
          {/* Trophy Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", damping: 10 }}
            className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center bg-gradient-to-r ${getPerformanceColor(percentage)} animate-pulse-glow`}
          >
            <Trophy className="h-10 w-10 text-white" />
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold mb-2">Quiz Completed!</h2>
            <p className="text-xl text-slate-600">{getPerformanceMessage(percentage)}</p>
          </motion.div>

          {/* Score Display */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white/50 rounded-lg p-6 space-y-2"
          >
            <div className="text-4xl font-bold text-indigo-600">
              {score}/{totalQuestions}
            </div>
            <p className="text-slate-600">Correct Answers</p>
            <div className={`text-2xl font-semibold bg-gradient-to-r ${getPerformanceColor(percentage)} bg-clip-text text-transparent`}>
              {percentage}%
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="space-y-3"
          >
            <Button
              onClick={onRetake}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-lg hover:shadow-lg transition-all duration-300 magnetic-btn"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Retake Quiz
            </Button>

            <Button
              onClick={onBackToQuestionBanks}
              variant="outline"
              className="w-full glass-morphism border-slate-300 py-3 rounded-lg hover:bg-white/80 transition-all duration-300 magnetic-btn"
            >
              <List className="h-4 w-4 mr-2" />
              Back to Question Banks
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
