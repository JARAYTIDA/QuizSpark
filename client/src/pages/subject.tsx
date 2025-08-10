import { motion } from "framer-motion";
import { useLocation, useRoute } from "wouter";
import { ChevronRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedCard from "@/components/animated-card";

const classes = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: `Class ${i + 1}`,
  level: `class-${i + 1}`,
  color: [
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
  ][i % 12],
}));

const competitiveExams = [
  {
    id: "competitive",
    name: "Competitive Exams",
    description: "JEE, NEET, UPSC & More",
    color: "from-emerald-500 to-teal-500",
  },
];

export default function Subject() {
  const [, setLocation] = useLocation();
  const [match, params] = useRoute("/subject/:subject");
  
  if (!match || !params?.subject) {
    setLocation("/");
    return null;
  }

  const subjectName = params.subject.charAt(0).toUpperCase() + params.subject.slice(1);

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
            <span className="text-slate-600 font-medium">{subjectName}</span>
          </div>
        </motion.nav>

        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-slate-800 mb-4">{subjectName}</h1>
          <p className="text-xl text-slate-600">Choose your class level to begin your learning journey</p>
        </motion.div>

        {/* Class Selection Grid */}
        <div className="mb-16">
          <motion.h2
            className="text-2xl font-bold text-slate-800 mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Select Your Class
          </motion.h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {classes.map((classItem, index) => (
              <AnimatedCard
                key={classItem.id}
                delay={index * 0.05}
                className="rounded-xl p-6 text-center"
                onClick={() => setLocation(`/subject/${params.subject}/${classItem.level}`)}
              >
                <motion.div
                  className={`bg-gradient-to-br ${classItem.color} w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="text-white font-bold text-lg">{classItem.id}</span>
                </motion.div>
                <h3 className="font-semibold text-slate-800">{classItem.name}</h3>
              </AnimatedCard>
            ))}
          </div>
        </div>

        {/* Competitive Exams Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">Competitive Exams</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {competitiveExams.map((exam, index) => (
              <AnimatedCard
                key={exam.id}
                delay={index * 0.1}
                className="rounded-xl p-6 text-center"
                onClick={() => setLocation(`/subject/${params.subject}/${exam.id}`)}
              >
                <motion.div
                  className={`bg-gradient-to-br ${exam.color} w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-3xl">🏆</span>
                </motion.div>
                <h3 className="text-xl font-bold mb-2">{exam.name}</h3>
                <p className="text-slate-600">{exam.description}</p>
              </AnimatedCard>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
