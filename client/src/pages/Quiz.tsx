import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useRoute, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import ResultModal from "@/components/ResultModal";
import useQuizTimer from "@/hooks/useQuizTimer";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { QuestionBank, Question, QuizAttempt, InsertQuizAttempt } from "@shared/schema";

export default function Quiz() {
  const [match, params] = useRoute("/quiz/:questionBankId");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizAttempt | null>(null);

  if (!match || !params?.questionBankId) {
    return null;
  }

  const { questionBankId } = params;

  const { data: questionBank } = useQuery<QuestionBank>({
    queryKey: [`/api/question-banks/${questionBankId}`],
  });

  const { data: questions = [], isLoading } = useQuery<Question[]>({
    queryKey: [`/api/questions/${questionBankId}`],
  });

  const { timeRemaining, startTimer, stopTimer, resetTimer } = useQuizTimer(
    (questionBank?.timeLimit || 20) * 60
  );

  const submitQuizMutation = useMutation({
    mutationFn: async (attemptData: InsertQuizAttempt) => {
      const response = await apiRequest('POST', '/api/quiz-attempts', attemptData);
      return response.json();
    },
    onSuccess: (data: QuizAttempt) => {
      setQuizResult(data);
      setShowResult(true);
      stopTimer();
      queryClient.invalidateQueries({ queryKey: ['/api/quiz-attempts'] });
      toast({
        title: "Quiz Completed!",
        description: `You scored ${data.score}/${data.totalQuestions}`,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit quiz. Please try again.",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    if (questions.length > 0 && questionBank) {
      startTimer();
    }
    return () => stopTimer();
  }, [questions.length, questionBank, startTimer, stopTimer]);

  useEffect(() => {
    if (timeRemaining === 0 && questions.length > 0) {
      handleSubmitQuiz();
    }
  }, [timeRemaining]);

  const handleAnswerChange = (value: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion) {
      setAnswers(prev => ({
        ...prev,
        [currentQuestion.id]: parseInt(value)
      }));
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const calculateScore = () => {
    return questions.reduce((score, question) => {
      return answers[question.id] === question.correctAnswer ? score + 1 : score;
    }, 0);
  };

  const handleSubmitQuiz = () => {
    if (!questionBank) return;

    const score = calculateScore();
    const timeSpent = (questionBank.timeLimit * 60) - timeRemaining;

    const attemptData: InsertQuizAttempt = {
      questionBankId: questionBank.id,
      score,
      totalQuestions: questions.length,
      timeSpent,
      answers,
      userId: null,
    };

    submitQuizMutation.mutate(attemptData);
  };

  const handleRetakeQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResult(false);
    setQuizResult(null);
    resetTimer();
    startTimer();
  };

  const handleBackToQuestionBanks = () => {
    if (questionBank && questionBank.subjectId) {
      setLocation(`/subject/${questionBank.subjectId}/${questionBank.classLevel}`);
    }
  };

  if (isLoading || !questionBank) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">No Questions Available</h1>
          <p className="text-slate-600 mb-4">This question bank doesn't have any questions yet.</p>
          <Button onClick={handleBackToQuestionBanks}>
            Back to Question Banks
          </Button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const isLowTime = timeRemaining <= 300; // 5 minutes

  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Quiz Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="animate-slide-up"
        >
          <Card className="glass-morphism rounded-xl p-6 mb-8">
            <CardContent className="p-0">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">{questionBank.title}</h1>
                <div className="flex items-center space-x-4">
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
                    <span className="font-mono">
                      {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
                    </span>
                  </motion.div>
                  <div className="bg-white/50 px-4 py-2 rounded-lg">
                    <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                  </div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <Progress value={progress} className="h-3" />
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="animate-scale-in"
          >
            <Card className="glass-morphism rounded-xl p-8 mb-8">
              <CardContent className="p-0">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-4">
                    {currentQuestion.text}
                  </h2>
                </div>
                
                {/* Answer Options */}
                <RadioGroup
                  value={answers[currentQuestion.id]?.toString() || ""}
                  onValueChange={handleAnswerChange}
                  className="space-y-4"
                >
                  {currentQuestion.options.map((option, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="flex items-center p-4 rounded-lg border-2 border-transparent hover:border-indigo-300 transition-all duration-300 cursor-pointer quiz-card glass-morphism">
                        <RadioGroupItem value={index.toString()} id={`option-${index}`} className="mr-4" />
                        <Label htmlFor={`option-${index}`} className="text-lg cursor-pointer flex-1">
                          {String.fromCharCode(65 + index)}) {option}
                        </Label>
                      </div>
                    </motion.div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
        
        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-between items-center"
        >
          <Button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            variant="outline"
            className="magnetic-btn bg-white/50 backdrop-blur-sm text-slate-700"
          >
            <ArrowLeft className="mr-2" size={16} />
            Previous
          </Button>
          
          <div className="flex space-x-4">
            {currentQuestionIndex < questions.length - 1 ? (
              <Button
                onClick={handleNext}
                className="magnetic-btn bg-gradient-to-r from-green-500 to-emerald-500"
              >
                Next
                <ArrowRight className="ml-2" size={16} />
              </Button>
            ) : (
              <Button
                onClick={handleSubmitQuiz}
                disabled={submitQuizMutation.isPending}
                className="magnetic-btn bg-gradient-to-r from-red-500 to-pink-500"
              >
                <Check className="mr-2" size={16} />
                {submitQuizMutation.isPending ? 'Submitting...' : 'Submit Quiz'}
              </Button>
            )}
          </div>
        </motion.div>
      </div>

      {/* Result Modal */}
      <ResultModal
        isOpen={showResult}
        onClose={() => setShowResult(false)}
        result={quizResult}
        onRetake={handleRetakeQuiz}
        onBackToQuestionBanks={handleBackToQuestionBanks}
      />
    </div>
  );
}
