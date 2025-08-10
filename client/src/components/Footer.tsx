import { Link } from "wouter";
import { motion } from "framer-motion";

export default function Footer() {
  const subjects = [
    { name: "Mathematics", path: "/subject/math" },
    { name: "Science", path: "/subject/science" },
    { name: "English", path: "/subject/english" },
    { name: "Hindi", path: "/subject/hindi" },
  ];

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Help", path: "/help" },
  ];

  return (
    <footer className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              QuizMaster Pro
            </h3>
            <p className="text-slate-300 mb-4">
              Empowering students with interactive learning and comprehensive assessments.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.2, rotate: 5 }}
                className="text-slate-400 hover:text-indigo-400 transition-colors"
              >
                <i className="fab fa-facebook text-xl"></i>
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.2, rotate: -5 }}
                className="text-slate-400 hover:text-indigo-400 transition-colors"
              >
                <i className="fab fa-twitter text-xl"></i>
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.2, rotate: 5 }}
                className="text-slate-400 hover:text-indigo-400 transition-colors"
              >
                <i className="fab fa-instagram text-xl"></i>
              </motion.a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">Subjects</h4>
            <ul className="space-y-2 text-slate-300">
              {subjects.map((subject) => (
                <li key={subject.name}>
                  <Link href={subject.path}>
                    <motion.a
                      whileHover={{ x: 5 }}
                      className="hover:text-indigo-400 transition-colors cursor-pointer"
                    >
                      {subject.name}
                    </motion.a>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-slate-300">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.path}>
                    <motion.a
                      whileHover={{ x: 5 }}
                      className="hover:text-indigo-400 transition-colors cursor-pointer"
                    >
                      {link.name}
                    </motion.a>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center text-slate-300"
              >
                <i className="fas fa-envelope mr-2"></i>
                info@quizmasterpro.com
              </motion.div>
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center text-slate-300"
              >
                <i className="fas fa-phone mr-2"></i>
                +91 9876543210
              </motion.div>
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center text-slate-300"
              >
                <i className="fas fa-map-marker-alt mr-2"></i>
                New Delhi, India
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400"
        >
          <p>&copy; 2024 QuizMaster Pro. All rights reserved. | Designed for Educational Excellence</p>
        </motion.div>
      </div>
    </footer>
  );
}
