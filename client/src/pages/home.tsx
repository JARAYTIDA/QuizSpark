import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { GraduationCap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedCard from "@/components/animated-card";
import { Subject } from "@shared/schema";

const iconMap: Record<string, string> = {
  language: "📝",
  book: "📚",
  calculator: "🧮",
  flask: "🔬",
  globe: "🌍",
  lightbulb: "💡",
  trophy: "🏆",
};

export default function Home() {
  const [, setLocation] = useLocation();
  
  const { data: subjects = [], isLoading } = useQuery<Subject[]>({
    queryKey: ["/api/subjects"],
  });

  const scrollToSubjects = () => {
    const element = document.getElementById("subjects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 flex content-center items-center justify-center min-h-screen">
        <div className="container relative mx-auto px-4">
          <div className="items-center flex flex-wrap">
            {/* Left Column - Text Content */}
            <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="pr-0 lg:pr-12"
              >
                <motion.h1 
                  className="text-5xl md:text-6xl font-bold mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  <span className="typing-effect">Master Every Subject</span>
                </motion.h1>
                
                <motion.p 
                  className="mt-8 text-lg text-slate-600 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                >
                  Unlock your potential with our interactive quiz platform. From mathematics to literature, 
                  science to social studies - challenge yourself and track your progress with engaging, 
                  professionally designed assessments.
                </motion.p>
                
                <motion.div 
                  className="mt-12"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.5 }}
                >
                  <Button
                    onClick={scrollToSubjects}
                    className="magnetic-btn bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 glow-effect"
                  >
                    Start Learning Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </motion.div>
            </div>
            
            {/* Right Column - Animated Feature Card */}
            <div className="w-full lg:w-6/12 px-4 mt-12 lg:mt-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="animate-float"
              >
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 glass-morphism">
                  <div className="px-6 py-8 flex flex-col items-center text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1, type: "spring", damping: 10 }}
                      className="text-white mb-6"
                    >
                      <GraduationCap className="h-16 w-16 mx-auto mb-4" />
                    </motion.div>
                    <div className="text-white">
                      <h3 className="text-3xl font-bold mb-4">Interactive Learning</h3>
                      <p className="text-indigo-100 text-lg leading-relaxed">
                        Engaging quizzes designed for effective learning with real-time feedback 
                        and comprehensive progress tracking.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section id="subjects" className="py-20 bg-white/30 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Choose Your Subject</h2>
            <p className="text-xl text-slate-600">Select from our comprehensive range of subjects</p>
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="glass-morphism rounded-xl p-6 animate-pulse">
                  <div className="w-16 h-16 bg-slate-300 rounded-full mx-auto mb-4"></div>
                  <div className="h-6 bg-slate-300 rounded mb-2"></div>
                  <div className="h-4 bg-slate-300 rounded mb-4"></div>
                  <div className="h-4 bg-slate-300 rounded w-3/4 mx-auto"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {subjects.map((subject, index) => (
                <AnimatedCard
                  key={subject.id}
                  delay={index * 0.1}
                  className="rounded-xl p-6 text-center"
                  onClick={() => setLocation(`/subject/${subject.id}`)}
                >
                  <motion.div
                    className={`bg-gradient-to-br ${subject.color} w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <span className="text-2xl">{iconMap[subject.icon] || "📚"}</span>
                  </motion.div>
                  <h3 className="text-xl font-bold mb-2">{subject.name}</h3>
                  <p className="text-slate-600 mb-4">{subject.description}</p>
                  <div className="text-sm text-indigo-600 font-semibold">
                    12 Classes Available
                  </div>
                </AnimatedCard>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Why Choose QuizMaster Pro?</h2>
            <p className="text-xl text-slate-600">Experience the future of interactive learning</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Adaptive Learning",
                description: "Personalized quizzes that adapt to your learning pace and style",
                icon: "🎯",
              },
              {
                title: "Real-time Analytics",
                description: "Track your progress with detailed performance analytics",
                icon: "📊",
              },
              {
                title: "Expert Content",
                description: "Curated questions by subject matter experts and educators",
                icon: "👨‍🏫",
              },
            ].map((feature, index) => (
              <AnimatedCard
                key={feature.title}
                delay={index * 0.2}
                className="rounded-xl p-8 text-center"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
