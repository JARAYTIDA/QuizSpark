import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation, useRoute } from "wouter";
import { ChevronLeft, ChevronRight, Home, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import QuizTimer from "@/components/quiz-timer";
import ResultModal from "@/components/result-modal";
import { QuestionBank, Question } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";

interface QuizAttemptResult {
  attempt: any;
  results: Array<{
    questionId: string;
    text: string;
    options: string[];
    userAnswer: number;
    correctAnswer: number;
    isCorrect: boolean;
    explanation: string;
  }>;
  score: number;
  totalQuestions: number;
  percentage: number;
}

export default function Quiz() {
  const [, setLocation] = useLocation();
  const [match, params] = useRoute("/quiz/:bankId");
  const { toast } = useToast();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizAttemptResult | null>(null);
  const [startTime] = useState(Date.now());

  if (!match || !params?.bankId) {
    setLocation("/");
    return null;
  }

  const { bankId } = params;

  // Fetch question bank details
  const { data: questionBank, isLoading: bankLoading } = useQuery<QuestionBank>({
    queryKey: ["/api/question-bank", bankId],
  });

  // Fetch questions
  const { data: questions = [], isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ["/api/questions", bankId],
  });

  // Submit quiz mutation
  const submitMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/quiz-attempt", data);
      return response.json();
    },
    onSuccess: (result: QuizAttemptResult) => {
      setQuizResult(result);
      setShowResult(true);
      toast({
        title: "Quiz Completed!",
        description: `You scored ${result.score}# thoughts

I need to build a professional and exciting quiz website with modular design and animations based on the HTML design reference. The website should have:

1. A modern, animated navbar with subject navigation
2. Hero section with interactive elements and animated welcome message
3. Subject cards with hover animations
4. Class selection interface (1-12 + competitive exams)
5. Question bank listing page
6. Interactive quiz interface with timer and progress
7. Score display modal with animations
8. Professional footer

Key requirements from the design reference:
- Glass morphism effects with backdrop blur
- Gradient backgrounds and animated elements
- Particle system for background animation
- Magnetic button effects and hover animations
- Smooth page transitions and state management
- Timer functionality for quizzes
- Score calculation and display
- Mobile-responsive design

I'll implement this using React with TypeScript, Framer Motion for animations, and Tailwind CSS for styling. The application will be modular with proper component structure and state management.

# useful_guidelines_from_blueprints

- Always prefer using in-memory storage (MemStorage) unless you are asked to use a database
- Put as much of the app in the frontend as possible. The backend should only be responsible for data persistence and making API calls
- Use `wouter` for routing on the frontend
- Always use `@tanstack/react-query` when fetching data
- Use the existing shadcn + Tailwind CSS setup wherever possible
- When defining custom properties in `index.css`, always use the proper HSL format like `hsl(20, 14.3%, 4.1%)` for colors
- Generate both index.css and tailwind.config.ts files to ensure color consistency

# directory_structure

```json
[
    {"path": "shared/schema.ts", "status": "overwritten"},
    {"path": "server/storage.ts", "status": "overwritten"},
    {"path": "server/routes.ts", "status": "overwritten"},
    {"path": "client/src/App.tsx", "status": "overwritten"},
    {"path": "client/src/index.css", "status": "overwritten"},
    {"path": "client/tailwind.config.ts", "status": "overwritten"},
    {"path": "client/src/components/Layout.tsx", "status": "new"},
    {"path": "client/src/components/Navbar.tsx", "status": "new"},
    {"path": "client/src/components/Footer.tsx", "status": "new"},
    {"path": "client/src/components/ParticleBackground.tsx", "status": "new"},
    {"path": "client/src/pages/Home.tsx", "status": "new"},
    {"path": "client/src/pages/Subject.tsx", "status": "new"},
    {"path": "client/src/pages/QuestionBankList.tsx", "status": "new"},
    {"path": "client/src/pages/Quiz.tsx", "status": "new"},
    {"path": "client/src/components/ResultModal.tsx", "status": "new"},
    {"path": "client/src/hooks/useQuizTimer.ts", "status": "new"},
    {"path": "client/src/types/quiz.ts", "status": "new"}
]
