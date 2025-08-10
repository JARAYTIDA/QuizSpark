import { type Subject, type QuestionBank, type Question, type QuizAttempt, type InsertSubject, type InsertQuestionBank, type InsertQuestion, type InsertQuizAttempt, type User, type InsertUser } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getSubjects(): Promise<Subject[]>;
  getSubject(id: string): Promise<Subject | undefined>;
  createSubject(subject: InsertSubject): Promise<Subject>;
  
  getQuestionBanksBySubjectAndClass(subjectId: string, classLevel: string): Promise<QuestionBank[]>;
  getQuestionBank(id: string): Promise<QuestionBank | undefined>;
  createQuestionBank(questionBank: InsertQuestionBank): Promise<QuestionBank>;
  
  getQuestionsByBankId(questionBankId: string): Promise<Question[]>;
  createQuestion(question: InsertQuestion): Promise<Question>;
  
  createQuizAttempt(attempt: InsertQuizAttempt): Promise<QuizAttempt>;
  getQuizAttemptsByUser(userId: string): Promise<QuizAttempt[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private subjects: Map<string, Subject>;
  private questionBanks: Map<string, QuestionBank>;
  private questions: Map<string, Question>;
  private quizAttempts: Map<string, QuizAttempt>;

  constructor() {
    this.users = new Map();
    this.subjects = new Map();
    this.questionBanks = new Map();
    this.questions = new Map();
    this.quizAttempts = new Map();
    
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Initialize subjects
    const subjects: Subject[] = [
      {
        id: "hindi",
        name: "Hindi",
        displayName: "Hindi",
        icon: "fas fa-language",
        color: "from-red-500 to-pink-500",
        description: "Master the beauty of Hindi language"
      },
      {
        id: "english",
        name: "English",
        displayName: "English",
        icon: "fas fa-book",
        color: "from-blue-500 to-cyan-500",
        description: "Enhance your English proficiency"
      },
      {
        id: "math",
        name: "Mathematics",
        displayName: "Mathematics",
        icon: "fas fa-calculator",
        color: "from-green-500 to-emerald-500",
        description: "Solve complex mathematical problems"
      },
      {
        id: "science",
        name: "Science",
        displayName: "Science",
        icon: "fas fa-flask",
        color: "from-purple-500 to-indigo-500",
        description: "Explore the wonders of science"
      },
      {
        id: "social",
        name: "Social Science",
        displayName: "Social Science",
        icon: "fas fa-globe",
        color: "from-yellow-500 to-orange-500",
        description: "Understand society and culture"
      },
      {
        id: "gk",
        name: "General Knowledge",
        displayName: "General Knowledge",
        icon: "fas fa-lightbulb",
        color: "from-teal-500 to-cyan-500",
        description: "Broaden your general awareness"
      },
      {
        id: "contest",
        name: "Contest",
        displayName: "Contest",
        icon: "fas fa-trophy",
        color: "from-rose-500 to-pink-500",
        description: "Compete and win exciting prizes"
      }
    ];

    subjects.forEach(subject => this.subjects.set(subject.id, subject));

    // Initialize question banks for each subject
    subjects.forEach(subject => {
      for (let classNum = 1; classNum <= 12; classNum++) {
        const questionBanks: QuestionBank[] = [
          {
            id: `${subject.id}-class-${classNum}-basic`,
            subjectId: subject.id,
            classLevel: `class-${classNum}`,
            title: "Basic Concepts",
            description: "Test your understanding of fundamental concepts",
            difficulty: "Beginner",
            timeLimit: 20,
            totalQuestions: 15,
            avgScore: 45
          },
          {
            id: `${subject.id}-class-${classNum}-intermediate`,
            subjectId: subject.id,
            classLevel: `class-${classNum}`,
            title: "Intermediate Practice",
            description: "Challenge yourself with intermediate level problems",
            difficulty: "Intermediate",
            timeLimit: 30,
            totalQuestions: 25,
            avgScore: 62
          },
          {
            id: `${subject.id}-class-${classNum}-advanced`,
            subjectId: subject.id,
            classLevel: `class-${classNum}`,
            title: "Advanced Challenge",
            description: "Master advanced concepts and problem-solving",
            difficulty: "Advanced",
            timeLimit: 45,
            totalQuestions: 30,
            avgScore: 34
          },
          {
            id: `${subject.id}-class-${classNum}-revision`,
            subjectId: subject.id,
            classLevel: `class-${classNum}`,
            title: "Revision Test",
            description: "Quick revision of important topics",
            difficulty: "Mixed",
            timeLimit: 25,
            totalQuestions: 20,
            avgScore: 58
          },
          {
            id: `${subject.id}-class-${classNum}-exam`,
            subjectId: subject.id,
            classLevel: `class-${classNum}`,
            title: "Exam Preparation",
            description: "Comprehensive exam preparation test",
            difficulty: "Exam Level",
            timeLimit: 60,
            totalQuestions: 40,
            avgScore: 71
          },
          {
            id: `${subject.id}-class-${classNum}-mock`,
            subjectId: subject.id,
            classLevel: `class-${classNum}`,
            title: "Mock Test",
            description: "Full-length mock examination",
            difficulty: "Mock Exam",
            timeLimit: 90,
            totalQuestions: 50,
            avgScore: 67
          }
        ];

        questionBanks.forEach(bank => this.questionBanks.set(bank.id, bank));

        // Add sample questions for each question bank
        questionBanks.forEach(bank => {
          const baseQuestions = this.getSubjectQuestions(subject.id, classNum);
          baseQuestions.forEach((questionData, index) => {
            const question: Question = {
              id: `${bank.id}-q${index + 1}`,
              questionBankId: bank.id,
              text: questionData.text,
              options: questionData.options,
              correctAnswer: questionData.correctAnswer,
              explanation: questionData.explanation
            };
            this.questions.set(question.id, question);
          });
        });
      });

      // Add competitive exam question banks
      const competitiveBank: QuestionBank = {
        id: `${subject.id}-competitive`,
        subjectId: subject.id,
        classLevel: "competitive",
        title: "Competitive Exams",
        description: "JEE, NEET, UPSC & More",
        difficulty: "Expert",
        timeLimit: 60,
        totalQuestions: 50,
        avgScore: 67
      };

      this.questionBanks.set(competitiveBank.id, competitiveBank);

      // Add competitive questions
      const competitiveQuestions = this.getCompetitiveQuestions(subject.id);
      competitiveQuestions.forEach((questionData, index) => {
        const question: Question = {
          id: `${competitiveBank.id}-q${index + 1}`,
          questionBankId: competitiveBank.id,
          text: questionData.text,
          options: questionData.options,
          correctAnswer: questionData.correctAnswer,
          explanation: questionData.explanation
        };
        this.questions.set(question.id, question);
      });
    });
  }

  private getSubjectQuestions(subjectId: string, classNum: number) {
    const questionSets: Record<string, any> = {
      hindi: [
        {
          text: "हिंदी भाषा की मुख्य विशेषता क्या है?",
          options: ["देवनागरी लिपि", "अरबी लिपि", "रोमन लिपि", "गुरुमुखी लिपि"],
          correctAnswer: 0,
          explanation: "हिंदी भाषा देवनागरी लिपि में लिखी जाती है।"
        },
        {
          text: "निम्न में से कौन सा शब्द तत्सम है?",
          options: ["आग", "सूर्य", "दूध", "पानी"],
          correctAnswer: 1,
          explanation: "सूर्य एक तत्सम शब्द है जो संस्कृत से आया है।"
        },
        {
          text: "हिंदी की उत्पत्ति किस भाषा से हुई है?",
          options: ["संस्कृत", "अरबी", "पर्शियन", "तुर्की"],
          correctAnswer: 0,
          explanation: "हिंदी भाषा का विकास संस्कृत भाषा से हुआ है।"
        }
      ],
      english: [
        {
          text: "What is the past tense of 'go'?",
          options: ["goed", "went", "gone", "going"],
          correctAnswer: 1,
          explanation: "The past tense of 'go' is 'went'."
        },
        {
          text: "Which of the following is a noun?",
          options: ["run", "quickly", "happiness", "blue"],
          correctAnswer: 2,
          explanation: "'Happiness' is a noun that represents a state of being."
        },
        {
          text: "What is the correct spelling?",
          options: ["recieve", "receive", "recive", "receeve"],
          correctAnswer: 1,
          explanation: "The correct spelling is 'receive' (i before e except after c)."
        }
      ],
      math: [
        {
          text: "What is 15 + 27?",
          options: ["41", "42", "43", "44"],
          correctAnswer: 1,
          explanation: "15 + 27 = 42"
        },
        {
          text: "What is the area of a square with side length 8 cm?",
          options: ["32 cm²", "64 cm²", "16 cm²", "24 cm²"],
          correctAnswer: 1,
          explanation: "Area of square = side × side = 8 × 8 = 64 cm²"
        },
        {
          text: "What is 144 ÷ 12?",
          options: ["11", "12", "13", "14"],
          correctAnswer: 1,
          explanation: "144 ÷ 12 = 12"
        }
      ],
      science: [
        {
          text: "What is the chemical symbol for water?",
          options: ["H2O", "CO2", "NaCl", "O2"],
          correctAnswer: 0,
          explanation: "Water is composed of two hydrogen atoms and one oxygen atom (H2O)."
        },
        {
          text: "Which planet is closest to the Sun?",
          options: ["Venus", "Mercury", "Earth", "Mars"],
          correctAnswer: 1,
          explanation: "Mercury is the closest planet to the Sun."
        },
        {
          text: "What gas do plants absorb from the atmosphere during photosynthesis?",
          options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
          correctAnswer: 2,
          explanation: "Plants absorb carbon dioxide during photosynthesis to make glucose."
        }
      ],
      social: [
        {
          text: "Who was the first Prime Minister of India?",
          options: ["Mahatma Gandhi", "Jawaharlal Nehru", "Sardar Patel", "Dr. Rajendra Prasad"],
          correctAnswer: 1,
          explanation: "Jawaharlal Nehru was India's first Prime Minister."
        },
        {
          text: "In which year did India gain independence?",
          options: ["1946", "1947", "1948", "1949"],
          correctAnswer: 1,
          explanation: "India gained independence on August 15, 1947."
        },
        {
          text: "Which river is known as the lifeline of India?",
          options: ["Yamuna", "Brahmaputra", "Ganga", "Godavari"],
          correctAnswer: 2,
          explanation: "The Ganga (Ganges) river is considered the lifeline of India."
        }
      ],
      gk: [
        {
          text: "What is the capital of France?",
          options: ["London", "Berlin", "Paris", "Madrid"],
          correctAnswer: 2,
          explanation: "Paris is the capital city of France."
        },
        {
          text: "Which is the largest ocean in the world?",
          options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
          correctAnswer: 3,
          explanation: "The Pacific Ocean is the largest ocean in the world."
        },
        {
          text: "Who invented the telephone?",
          options: ["Thomas Edison", "Alexander Graham Bell", "Nikola Tesla", "Albert Einstein"],
          correctAnswer: 1,
          explanation: "Alexander Graham Bell is credited with inventing the telephone."
        }
      ],
      contest: [
        {
          text: "Which programming language is known for its simplicity and readability?",
          options: ["C++", "Java", "Python", "Assembly"],
          correctAnswer: 2,
          explanation: "Python is known for its simple syntax and readability."
        },
        {
          text: "What does 'AI' stand for in technology?",
          options: ["Automated Intelligence", "Artificial Intelligence", "Advanced Integration", "Adaptive Interface"],
          correctAnswer: 1,
          explanation: "AI stands for Artificial Intelligence."
        },
        {
          text: "Which company developed the ChatGPT model?",
          options: ["Google", "Microsoft", "OpenAI", "Meta"],
          correctAnswer: 2,
          explanation: "ChatGPT was developed by OpenAI."
        }
      ]
    };

    return questionSets[subjectId] || questionSets.gk;
  }

  private getCompetitiveQuestions(subjectId: string) {
    return [
      {
        text: `Advanced ${subjectId} concept for competitive examinations?`,
        options: ["Advanced Option A", "Advanced Option B", "Advanced Option C", "Advanced Option D"],
        correctAnswer: 0,
        explanation: "For competitive exams, this concept requires deep understanding."
      },
      {
        text: `Complex problem-solving in ${subjectId}?`,
        options: ["Solution Method 1", "Solution Method 2", "Solution Method 3", "Solution Method 4"],
        correctAnswer: 1,
        explanation: "This method is most effective for competitive level problems."
      }
    ];
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getSubjects(): Promise<Subject[]> {
    return Array.from(this.subjects.values());
  }

  async getSubject(id: string): Promise<Subject | undefined> {
    return this.subjects.get(id);
  }

  async createSubject(insertSubject: InsertSubject): Promise<Subject> {
    const id = randomUUID();
    const subject: Subject = { ...insertSubject, id };
    this.subjects.set(id, subject);
    return subject;
  }

  async getQuestionBanksBySubjectAndClass(subjectId: string, classLevel: string): Promise<QuestionBank[]> {
    return Array.from(this.questionBanks.values()).filter(
      bank => bank.subjectId === subjectId && bank.classLevel === classLevel
    );
  }

  async getQuestionBank(id: string): Promise<QuestionBank | undefined> {
    return this.questionBanks.get(id);
  }

  async createQuestionBank(insertQuestionBank: InsertQuestionBank): Promise<QuestionBank> {
    const id = randomUUID();
    const questionBank: QuestionBank = { ...insertQuestionBank, id };
    this.questionBanks.set(id, questionBank);
    return questionBank;
  }

  async getQuestionsByBankId(questionBankId: string): Promise<Question[]> {
    return Array.from(this.questions.values()).filter(
      question => question.questionBankId === questionBankId
    );
  }

  async createQuestion(insertQuestion: InsertQuestion): Promise<Question> {
    const id = randomUUID();
    const question: Question = { ...insertQuestion, id };
    this.questions.set(id, question);
    return question;
  }

  async createQuizAttempt(insertAttempt: InsertQuizAttempt): Promise<QuizAttempt> {
    const id = randomUUID();
    const attempt: QuizAttempt = { 
      ...insertAttempt, 
      id,
      completedAt: new Date()
    };
    this.quizAttempts.set(id, attempt);
    return attempt;
  }

  async getQuizAttemptsByUser(userId: string): Promise<QuizAttempt[]> {
    return Array.from(this.quizAttempts.values()).filter(
      attempt => attempt.userId === userId
    );
  }
}

export const storage = new MemStorage();
