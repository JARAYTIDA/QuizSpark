import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { GraduationCap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedCard from "@/components/AnimatedCard";
import type { Subject } from "@shared/schema";

const iconMap: Record<string, string> = {
  "fas fa-language": "📝",
  "fas fa-book": "📚", 
  "fas fa-calculator": "🧮",
  "fas fa-flask": "🔬",
  "fas fa-globe": "🌍",
  "fas fa-lightbulb": "💡",
  "fas fa-trophy": "🏆",
};

export default function Home() {
  const { data: subjects = [], isLoading } = useQuery<Subject[]>({
    queryKey: ['/api/subjects'],
  });

  const scrollToSubjects = () => {
    const element = document.getElementById("subjects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 flex content-center items-center justify-center min-h-screen">
        <div className="container relative mx-auto px-4">
          <div className="items-center flex flex-wrap">
            <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center lg:text-left">
              <div className="pr-0 lg:pr-12">
                <motion.h1
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-5xl md:text-6xl font-bold mb-6 typing-effect"
                >
                  Master Every Subject
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="mt-8 text-lg text-slate-600"
                >
                  Unlock your potential with our interactive quiz platform. From mathematics to literature, science to social studies - challenge yourself and track your progress.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 2 }}
                  className="mt-12"
                >
                  <Button
                    onClick={scrollToSubjects}
                    size="lg"
                    className="magnetic-btn bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 glow-effect"
                  >
                    Start Learning Now
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                </motion.div>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="w-full lg:w-6/12 px-4 mt-12 lg:mt-0 animate-float"
            >
              <Card className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 glass-morphism">
                <CardContent className="px-6 py-6 flex flex-col items-center">
                  <div className="text-white text-center">
                    <GraduationCap size={64} className="mb-4 mx-auto" />
                    <h3 className="text-3xl font-bold mb-2">Interactive Learning</h3>
                    <p className="text-indigo-100">Engaging quizzes designed for effective learning</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section id="subjects" className="py-20 bg-white/30 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-800 mb-4 animate-slide-up">Choose Your Subject</h2>
            <p className="text-xl text-slate-600 animate-slide-up" style={{ animationDelay: "0.2s" }}>Select from our comprehensive range of subjects</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {subjects.map((subject, index) => (
              <AnimatedCard
                key={subject.id}
                delay={index * 0.1}
                className="rounded-xl p-6 text-center h-full hover:shadow-2xl transition-all duration-400"
              >
                <Link href={`/subject/${subject.id}`}>
                  <div>
                    <motion.div
                      className={`bg-gradient-to-br ${subject.color} w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <span className="text-2xl">
                        {iconMap[subject.icon] || "📚"}
                      </span>
                    </motion.div>
                    <h3 className="text-xl font-bold mb-2">{subject.displayName}</h3>
                    <p className="text-slate-600 mb-4">{subject.description}</p>
                    <div className="text-sm text-indigo-600 font-semibold">
                      {subject.name === 'General Knowledge' ? 'All Topics Available' : '12 Classes Available'}
                    </div>
                  </div>
                </Link>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
