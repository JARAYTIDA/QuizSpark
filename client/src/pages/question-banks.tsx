import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useRoute } from "wouter";
import { ChevronRight, Home, Book, Clock, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import AnimatedCard from "@/components/animated-card";
import { QuestionBank } from "@shared/schema";

const difficultyColors: Record<string, string> = {
  "Beginner": "text-green-600",
  "Intermediate": "text-yellow-600", 
  "Advanced": "text-red-600",
  "Mixed": "text-blue-600",
  "Exam Level": "text-purple-600",
  "Mock Exam": "text-orange-600",
};

const difficultyIcons: Record<string, string> = {
  "Beginner": "📚",
  "Intermediate": "🧩",
  "Advanced": "🔥", 
  "Mixed": "🔄",
  "Exam Level": "🎓",
  "Mock Exam": "⏰",
};

export default function QuestionBanks() {
  const [, setLocation] = useLocation();
  const [match, params] = useRoute("/subject/:subject/:classLevel");

  if (!match || !params?.subject || !params?.classLevel) {
    setLocation("/");
    return null;
  }

  const { subject, classLevel } = params;
  const subjectName = subject.charAt(0).toUpperCase() + subject.slice(1);
  const className = classLevel.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());

  const { data: questionBanks = [], isLoading, error } = useQuery<QuestionBank[]>({
    queryKey: ["/api/question-banks", subject, classLevel],
  });

  if (error) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Question Banks</h2>
          <p className="text-slate-600 mb-4">Failed to load question banks. Please try again.</p>
          <Button onClick={() => setLocation(`/subject/${subject}`)}>
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb Navigation */}
        <motion.nav
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="bg-white/50 backdrop-blur-sm rounded-lg px-4 py-2 inline-flex items-center space-x-2 text-sm">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLocation("/")}
              className="text-indigo-600 hover:text-indigo-800 transition-colors p-1"
            >
              <Home className="h-4 w-4 mr-1" />
              Home
            </Button>
            <ChevronRight className="h-4 w-4 text-slate-400" />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLocation(`/subject/${subject}`)}
              className="text-indigo-600 hover:text-indigo-800 transition-colors p-1"
            >
              {subjectName}
            </Button>
            <ChevronRight className="h-4 w-4 text-slate-400" />
            <span className="text-slate-600 font-medium">{className}</span>
          </div>
        </motion.nav>

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            {subjectName} - {className}
          </h1>
          <p className="text-xl text-slate-600">Select a question bank to start your quiz</p>
        </motion.div>

        {/* Question Banks Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="glass-morphism rounded-xl p-6 space-y-4">
                <div className="flex items-center space-x-4">
                  <Skeleton className="w-12 h-12 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
                <Skeleton className="h-16 w-full" />
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : questionBanks.length === 0 ? (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">No Question Banks Available</h3>
            <p className="text-slate-600 mb-6">
              Question banks for {subjectName} - {className} are not available yet.
            </p>
            <Button onClick={() => setLocation(`/subject/${subject}`)}>
              Choose Different Class
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {questionBanks.map((bank, index) => (
              <AnimatedCard
                key={bank.id}
                delay={index * 0.1}
                className="rounded-xl p-6 relative overflow-hidden"
                onClick={() => setLocation(`/quiz/${bank.id}`)}
              >
                <div className="flex items-center mb-4">
                  <motion.div
                    className="bg-gradient-to-br from-indigo-500 to-purple-500 w-12 h-12 rounded-full flex items-center justify-center mr-4"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <span className="text-2xl">
                      {difficultyIcons[bank.difficulty] || "📚"}
                    </span>
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-800 mb-1">{bank.name}</h3>
                    <div className="flex items-center text-sm text-slate-500 space-x-3">
                      <div className="flex items-center">
                        <Book className="h-3 w-3 mr-1" />
                        {bank.totalQuestions} Questions
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {bank.timeLimit} Minutes
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-slate-600 mb-4 leading-relaxed">{bank.description}</p>

                <div className="flex justify-between items-center">
                  <span className={`text-sm font-semibold ${difficultyColors[bank.difficulty] || 'text-slate-600'}`}>
                    {bank.difficulty}
                  </span>
                  <div className="flex items-center text-sm text-slate-500">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {bank.averageScore}% Avg Score
                  </div>
                </div>

                {/* Hover effect overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 rounded-xl"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatedCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
