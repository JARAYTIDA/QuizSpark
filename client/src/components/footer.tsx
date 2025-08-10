import { motion } from "framer-motion";
import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "Help", path: "/help" },
];

const subjects = [
  { name: "Mathematics", path: "/subject/math" },
  { name: "Science", path: "/subject/science" },
  { name: "English", path: "/subject/english" },
  { name: "Hindi", path: "/subject/hindi" },
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              QuizMaster Pro
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Empowering students with interactive learning and comprehensive assessments.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.2, rotate: 5 }}
                className="text-slate-400 hover:text-indigo-400 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.2, rotate: -5 }}
                className="text-slate-400 hover:text-indigo-400 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.2, rotate: 5 }}
                className="text-slate-400 hover:text-indigo-400 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </motion.a>
            </div>
          </motion.div>

          {/* Subjects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-4">Subjects</h4>
            <ul className="space-y-2">
              {subjects.map((subject) => (
                <li key={subject.name}>
                  <Link href={subject.path}>
                    <motion.a
                      whileHover={{ x: 5 }}
                      className="text-slate-300 hover:text-indigo-400 transition-colors cursor-pointer"
                    >
                      {subject.name}
                    </motion.a>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.path}>
                    <motion.a
                      whileHover={{ x: 5 }}
                      className="text-slate-300 hover:text-indigo-400 transition-colors cursor-pointer"
                    >
                      {link.name}
                    </motion.a>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center text-slate-300"
              >
                <Mail className="h-4 w-4 mr-2" />
                info@quizmasterpro.com
              </motion.div>
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center text-slate-300"
              >
                <Phone className="h-4 w-4 mr-2" />
                +91 9876543210
              </motion.div>
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center text-slate-300"
              >
                <MapPin className="h-4 w-4 mr-2" />
                New Delhi, India
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400"
        >
          <p>&copy; 2024 QuizMaster Pro. All rights reserved. | Designed for Educational Excellence</p>
        </motion.div>
      </div>
    </footer>
  );
}
