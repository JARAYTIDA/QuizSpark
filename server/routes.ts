import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertQuizAttemptSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all subjects
  app.get("/api/subjects", async (req, res) => {
    try {
      const subjects = await storage.getSubjects();
      res.json(subjects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch subjects" });
    }
  });

  // Get subject by ID
  app.get("/api/subjects/:id", async (req, res) => {
    try {
      const subject = await storage.getSubject(req.params.id);
      if (!subject) {
        return res.status(404).json({ message: "Subject not found" });
      }
      res.json(subject);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch subject" });
    }
  });

  // Get question banks by subject and class
  app.get("/api/question-banks", async (req, res) => {
    try {
      const { subjectId, classLevel } = req.query;
      if (!subjectId || !classLevel) {
        return res.status(400).json({ message: "subjectId and classLevel are required" });
      }
      
      const questionBanks = await storage.getQuestionBanksBySubjectAndClass(
        subjectId as string, 
        classLevel as string
      );
      res.json(questionBanks);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch question banks" });
    }
  });

  // Get question bank by ID
  app.get("/api/question-banks/:id", async (req, res) => {
    try {
      const questionBank = await storage.getQuestionBank(req.params.id);
      if (!questionBank) {
        return res.status(404).json({ message: "Question bank not found" });
      }
      res.json(questionBank);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch question bank" });
    }
  });

  // Get questions by question bank ID
  app.get("/api/questions/:questionBankId", async (req, res) => {
    try {
      const questions = await storage.getQuestionsByBankId(req.params.questionBankId);
      res.json(questions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch questions" });
    }
  });

  // Submit quiz attempt
  app.post("/api/quiz-attempts", async (req, res) => {
    try {
      const validatedData = insertQuizAttemptSchema.parse(req.body);
      const attempt = await storage.createQuizAttempt(validatedData);
      res.json(attempt);
    } catch (error) {
      res.status(400).json({ message: "Invalid quiz attempt data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
