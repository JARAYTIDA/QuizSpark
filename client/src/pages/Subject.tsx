import { useQuery } from "@tanstack/react-query";
import { Link, useRoute } from "wouter";
import { motion } from "framer-motion";
import { ChevronRight, Home } from "lucide-react";
import AnimatedCard from "@/components/AnimatedCard";
import type { Subject } from "@shared/schema";

const classLevels = Array.from({ length: 12 }, (_, i) => i + 1);

const gradientColors = [
  "from-indigo-500 to-purple-500",
  "from-blue-500 to-cyan-500",
  "from-green-500 to-emerald-500", 
  "from-yellow-500 to-orange-500",
  "from-red-500 to-pink-500",
  "from-purple-500 to-indigo-500",
  "from-teal-500 to-cyan-500",
  "from-rose-500 to-pink-500",
  "from-amber-500 to-orange-500",
  "from-lime-500 to-green-500",
  "from-sky-500 to-blue-500",
  "from-violet-500 to-purple-500",
];

export default function Subject() {
  const [match, params] = useRoute("/subject/:subjectId");
  
  if (!match || !params?.subjectId) {
    return null;
  }

  const { subjectId } = params;

  const { data: subject, isLoading } = useQuery<Subject>({
    queryKey: [`/api/subjects/${subjectId}`],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!subject) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Subject Not Found</h1>
          <Link href="/">
            <a className="text-indigo-600 hover:text-indigo-800">Go back to home</a>
          </Link>
        </div>
      </div>
    );
  }

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
            <span className="text-slate-600">{subject.displayName}</span>
          </div>
        </motion.nav>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-12 animate-slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          <h1 className="text-4xl font-bold text-slate-800 mb-4">{subject.displayName}</h1>
          <p className="text-xl text-slate-600">Choose your class level to begin</p>
        </motion.div>
        
        {/* Class Selection Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {classLevels.map((classNum, index) => (
            <AnimatedCard
              key={classNum}
              delay={index * 0.05}
              className="rounded-xl p-6 text-center h-full hover:shadow-2xl transition-all duration-400"
            >
              <Link href={`/subject/${subjectId}/class-${classNum}`}>
                <div>
                  <motion.div
                    className={`bg-gradient-to-br ${gradientColors[(classNum - 1) % gradientColors.length]} w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <span className="text-white font-bold">{classNum}</span>
                  </motion.div>
                  <h3 className="font-semibold">Class {classNum}</h3>
                </div>
              </Link>
            </AnimatedCard>
          ))}
        </div>
        
        {/* Competitive Exams Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl font-bold text-slate-800 mb-6 animate-slide-up">Competitive Exams</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
            <div className="max-w-md mx-auto animate-scale-in">
              <AnimatedCard className="rounded-xl p-6 text-center h-full hover:shadow-2xl transition-all duration-400">
                <Link href={`/subject/${subjectId}/competitive`}>
                  <div>
                    <motion.div
                      className="bg-gradient-to-br from-emerald-500 to-teal-500 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <i className="fas fa-trophy text-white text-2xl"></i>
                    </motion.div>
                    <h3 className="text-xl font-bold mb-2">Competitive Exams</h3>
                    <p className="text-slate-600">JEE, NEET, UPSC & More</p>
                  </div>
                </Link>
              </AnimatedCard>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
