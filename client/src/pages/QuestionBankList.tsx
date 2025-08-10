import { useQuery } from "@tanstack/react-query";
import { Link, useRoute } from "wouter";
import { motion } from "framer-motion";
import { ChevronRight, Home, Book, Puzzle, Flame, RotateCcw, GraduationCap, Clock } from "lucide-react";
import AnimatedCard from "@/components/AnimatedCard";
import type { Subject, QuestionBank } from "@shared/schema";

const getIcon = (title: string) => {
  if (title.toLowerCase().includes('basic')) return Book;
  if (title.toLowerCase().includes('intermediate')) return Puzzle;
  if (title.toLowerCase().includes('advanced')) return Flame;
  if (title.toLowerCase().includes('revision')) return RotateCcw;
  if (title.toLowerCase().includes('exam')) return GraduationCap;
  if (title.toLowerCase().includes('competitive')) return GraduationCap;
  return Clock;
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty.toLowerCase()) {
    case 'beginner': return 'text-green-600';
    case 'intermediate': return 'text-yellow-600'; 
    case 'advanced': return 'text-red-600';
    case 'expert': return 'text-purple-600';
    case 'mixed': return 'text-blue-600';
    case 'exam level': return 'text-purple-600';
    case 'mock exam': return 'text-orange-600';
    default: return 'text-blue-600';
  }
};

const getCardColor = (title: string) => {
  if (title.toLowerCase().includes('basic')) return 'from-indigo-500 to-purple-500';
  if (title.toLowerCase().includes('intermediate')) return 'from-green-500 to-emerald-500';
  if (title.toLowerCase().includes('advanced')) return 'from-red-500 to-pink-500';
  if (title.toLowerCase().includes('revision')) return 'from-blue-500 to-cyan-500';
  if (title.toLowerCase().includes('exam')) return 'from-purple-500 to-indigo-500';
  if (title.toLowerCase().includes('competitive')) return 'from-emerald-500 to-teal-500';
  return 'from-orange-500 to-yellow-500';
};

export default function QuestionBankList() {
  const [match, params] = useRoute("/subject/:subjectId/:classLevel");

  if (!match || !params?.subjectId || !params?.classLevel) {
    return null;
  }

  const { subjectId, classLevel } = params;

  const { data: subject } = useQuery<Subject>({
    queryKey: [`/api/subjects/${subjectId}`],
  });

  const { data: questionBanks = [], isLoading } = useQuery<QuestionBank[]>({
    queryKey: ['/api/question-banks', subjectId, classLevel],
    queryFn: async () => {
      const response = await fetch(`/api/question-banks?subjectId=${subjectId}&classLevel=${classLevel}`);
      if (!response.ok) throw new Error('Failed to fetch question banks');
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const displayClassName = classLevel?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Class';

  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 animate-slide-up"
        >
          <div className="bg-white/50 backdrop-blur-sm rounded-lg px-4 py-2 inline-flex items-center space-x-2 text-sm">
            <Link href="/">
              <a className="text-indigo-600 hover:text-indigo-800 transition-colors flex items-center">
                <Home size={16} className="mr-1" />
                Home
              </a>
            </Link>
            <ChevronRight size={16} className="text-slate-400" />
            <Link href={`/subject/${subjectId}`}>
              <a className="text-indigo-600 hover:text-indigo-800 transition-colors">
                {subject?.displayName || 'Subject'}
              </a>
            </Link>
            <ChevronRight size={16} className="text-slate-400" />
            <span className="text-slate-600">{displayClassName}</span>
          </div>
        </motion.nav>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-12 animate-slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Question Banks</h1>
          <p className="text-xl text-slate-600">Select a question bank to start your quiz</p>
        </motion.div>
        
        {/* Question Banks Grid */}
        {questionBanks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <p className="text-lg text-slate-600">No question banks available for this level.</p>
            <Link href={`/subject/${subjectId}`}>
              <a className="text-indigo-600 hover:text-indigo-800 mt-4 inline-block">
                Go back to class selection
              </a>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {questionBanks.map((bank, index) => {
              const IconComponent = getIcon(bank.title);
              const cardColor = getCardColor(bank.title);
              
              return (
                <AnimatedCard
                  key={bank.id}
                  delay={index * 0.1}
                  className="rounded-xl p-6 h-full hover:shadow-2xl transition-all duration-400 relative overflow-hidden"
                >
                  <Link href={`/quiz/${bank.id}`}>
                    <div>
                      <div className="flex items-center mb-4">
                        <motion.div
                          className={`bg-gradient-to-br ${cardColor} w-12 h-12 rounded-full flex items-center justify-center mr-4`}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <IconComponent className="text-white" size={20} />
                        </motion.div>
                        <div>
                          <h3 className="text-xl font-bold">{bank.title}</h3>
                          <p className="text-sm text-slate-600">
                            {bank.totalQuestions} Questions • {bank.timeLimit} Minutes
                          </p>
                        </div>
                      </div>
                      <p className="text-slate-600 mb-4">{bank.description}</p>
                      <div className="flex justify-between items-center">
                        <span className={`text-sm font-semibold ${getDifficultyColor(bank.difficulty)}`}>
                          {bank.difficulty} Level
                        </span>
                        <span className="text-sm text-slate-500">
                          {bank.avgScore}% Avg Score
                        </span>
                      </div>
                      
                      {/* Hover effect overlay */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 rounded-xl"
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </Link>
                </AnimatedCard>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
