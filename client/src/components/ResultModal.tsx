import { motion, AnimatePresence } from "framer-motion";
import { Trophy, RotateCcw, List, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { QuizAttempt } from "@shared/schema";

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: QuizAttempt | null;
  onRetake: () => void;
  onBackToQuestionBanks: () => void;
}

export default function ResultModal({
  isOpen,
  onClose,
  result,
  onRetake,
  onBackToQuestionBanks,
}: ResultModalProps) {
  if (!result) return null;

  const percentage = Math.round((result.score / result.totalQuestions) * 100);
  const timeSpentMinutes = Math.floor(result.timeSpent / 60);
  const timeSpentSeconds = result.timeSpent % 60;

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

  const getPerformanceTextColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md animate-bounce-in"
          >
            <Card className="glass-morphism rounded-xl overflow-hidden">
              <CardContent className="p-8 text-center relative">
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-slate-500 hover:text-slate-700 transition-colors"
                >
                  <X size={20} />
                </button>

                {/* Trophy Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                  className={`w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center bg-gradient-to-r ${getPerformanceColor(percentage)} animate-pulse-glow`}
                >
                  <Trophy className="h-10 w-10 text-white" />
                </motion.div>
                
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl font-bold mb-4"
                >
                  Quiz Completed!
                </motion.h2>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className={`text-xl mb-6 ${getPerformanceTextColor(percentage)}`}
                >
                  {getPerformanceMessage(percentage)}
                </motion.p>
                
                {/* Score Display */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white/50 rounded-lg p-6 mb-6"
                >
                  <div className="text-4xl font-bold text-indigo-600 mb-2">
                    {result.score}/{result.totalQuestions}
                  </div>
                  <p className="text-slate-600 mb-2">Correct Answers</p>
                  <div className={`text-2xl font-semibold bg-gradient-to-r ${getPerformanceColor(percentage)} bg-clip-text text-transparent`}>
                    {percentage}%
                  </div>
                  <p className="text-sm text-slate-500 mt-2">
                    Time taken: {timeSpentMinutes}m {timeSpentSeconds}s
                  </p>
                </motion.div>
                
                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-3"
                >
                  <Button
                    onClick={onRetake}
                    className="w-full magnetic-btn bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-lg hover:shadow-lg transition-all duration-300"
                  >
                    <RotateCcw className="mr-2" size={16} />
                    Retake Quiz
                  </Button>
                  
                  <Button
                    onClick={onBackToQuestionBanks}
                    variant="outline"
                    className="w-full magnetic-btn glass-morphism border-slate-300 py-3 rounded-lg hover:bg-white/80 transition-all duration-300"
                  >
                    <List className="mr-2" size={16} />
                    Back to Question Banks
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
