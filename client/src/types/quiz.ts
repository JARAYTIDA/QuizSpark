export interface QuizState {
  currentQuestionIndex: number;
  answers: Record<string, number>;
  timeRemaining: number;
  isCompleted: boolean;
}

export interface QuizStats {
  score: number;
  totalQuestions: number;
  percentage: number;
  timeSpent: number;
  correctAnswers: string[];
  incorrectAnswers: string[];
}

export interface QuizSession {
  id: string;
  questionBankId: string;
  startTime: Date;
  endTime?: Date;
  currentState: QuizState;
}
