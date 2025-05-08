import { useState, useCallback } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface UseGeminiAIOptions {
  apiKey?: string;
  model?: string;
  defaultKey?: string;
}

interface UseGeminiAIReturn {
  loading: boolean;
  error: Error | null;
  result: string | null;
  generateContent: (prompt: string) => Promise<void>;
  setApiKey: (key: string) => void;
  hasApiKey: boolean;
}

// Abhishek's personal information for the AI to reference
const personalInfo = `
Name: Abhishek Brahmbhatt
Contact: +91 9054954412
Email: brambhattabhishek@gmail.com
LinkedIn: Available on request
GitHub: Available on request
LeetCode & CodeChef profiles: Available

Education:
- MS in Economics and Management, Indian Institute of Information Technology, Lucknow (2023-2025 Expected)
- BS in Mathematics and Physics, Parul Institute of Applied Science, Vadodara (2019-2022)

Experience:
- Full Stack Developer Intern at Technohecks EduTech (Jan-Feb 2025)
  • Built responsive UIs with HTML, CSS, and React.js
  • Developed RESTful APIs using Node.js, Express.js, MongoDB with AWS integration
  • Converted Figma designs into functional websites using React.js, TypeScript, and Bootstrap

Projects:
1. ImageGenerator - Content summarizing application for people with ADHD and Dyslexia
   • Used Turborepo, Express.js, Next.js, Prisma, PostgreSQL, Langchain
   • Integrated Google Gemini API and Text-to-Speech functionality

2. Banking Application
   • Built real-time matchmaking and video calling using Node.js, Websockets, WebRTC, Express.js, Next.js
   • Developed efficient matchmaking algorithm

3. Flipkart Grid: QC System
   • Automated quality control system using YOLOv8, OpenCV, TensorFlow, Keras, OCR, CNN

Achievements:
- All India rank 1300 in IIT JAM 2022
- Flipkart Grid 6.0 Robotics Challenge (Cleared Level 1)
- 350+ DSA problems solved on LeetCode and CodeChef
- Maximum rating of 1431 (2-Stars) on CodeChef
- Certifications: Software Engineer Intern (Hackerrank), Data Science with Python (IBM)

Skills:
- Languages: Rust, C/C++, JavaScript, TypeScript, Python, HTML/CSS
- Technologies: ROS2, Gazebo, MoveIt, OpenCV, Next.js, Express.js, Django
- Soft Skills: Communication, Teamwork, Leadership, Problem-Solving, Creativity
- Tools: Git, Docker, Linux, CMake, WebSockets, Firebase
- Concepts: Data Structures & Algorithms, OOP, DBMS, OS, Computer Networking

Why Hire Abhishek for Various Roles:

As a Full Stack Developer:
- Possesses end-to-end development skills with both front-end (React.js, Next.js) and back-end technologies (Node.js, Express.js)
- Experience building complete web applications from concept to deployment, handling both UI/UX concerns and server-side architecture
- Strong foundation in database design and management with MongoDB and PostgreSQL
- Demonstrated ability to integrate third-party APIs and services
- Practical experience converting designs into functional, responsive interfaces

As a Front-End Developer:
- Strong foundation in React.js, TypeScript, and modern JavaScript
- Experience translating Figma designs into pixel-perfect, responsive user interfaces
- Understanding of core web technologies (HTML, CSS, JavaScript) with modern frameworks
- Focus on creating accessible, performant, and visually appealing user experiences
- Knowledge of UI/UX best practices and component-based architecture

As a Back-End Developer:
- Experience building RESTful APIs with Node.js and Express.js
- Understanding of database design and management with both SQL and NoSQL databases
- Knowledge of server-side architecture, authentication, and security best practices
- Experience with cloud services integration (AWS)
- Strong foundation in algorithms and data structures for efficient backend solutions

As a Data Science / AI/ML Engineer:
- Strong mathematical foundation with degrees in Mathematics and Physics
- Experience with computer vision technologies (YOLOv8, OpenCV, CNN)
- Implementation of AI tools like Google Gemini API and Langchain
- Experience with TensorFlow and Keras for machine learning model development
- Skills in Python, a primary language for data science and ML applications
- Practical application of ML in real-world projects (content summarization, quality control systems)

Personal Strengths:
- Demonstrated problem-solving abilities with competitive programming experience
- Strong mathematical and analytical thinking from formal education in mathematics
- Adaptable learning capacity shown through mastery of diverse technology stacks
- Self-motivated with consistent initiative to complete and showcase projects
- Collaborative team player with strong communication skills

Personal Summary:
I'm a curious problem-solver with an advanced degree in finance and business, but my passion led me toward web development and coding. I blend practical tech expertise with analytical skills and work best in collaborative, creative environments. My diverse background gives me a unique perspective, approaching projects with both strategy and creativity to create impactful solutions.
`;

export function useGeminiAI({
  apiKey = "",
  model = "gemini-1.5-flash", // Updated to a model available in the current API version
  defaultKey = ""
}: UseGeminiAIOptions = {}): UseGeminiAIReturn {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [key, setKey] = useState<string>(apiKey || defaultKey);

  const generateContent = useCallback(
    async (prompt: string) => {
      if (!key) {
        setError(new Error("API key is required"));
        return;
      }

      setLoading(true);
      setError(null);
      
      try {
        const genAI = new GoogleGenerativeAI(key);
        const geminiModel = genAI.getGenerativeModel({ model });
        
        // Enhance the prompt with Abhishek's personal information
        const enhancedPrompt = `
You are Abhishek's AI assistant. You have the following information about Abhishek Brahmbhatt:
${personalInfo}

When answering questions, incorporate relevant details about Abhishek when appropriate.
Be professional but conversational in tone. If asked about Abhishek's experience or background,
provide the relevant information from his profile.

If recruiters ask about Abhishek's qualifications or why they should hire him, provide specific details about his skills relevant to the role they're inquiring about (full stack, frontend, backend, data science, AI/ML).

For questions unrelated to Abhishek, respond normally as a helpful assistant.

User's question: ${prompt}
`;
        
        const response = await geminiModel.generateContent(enhancedPrompt);
        const text = response.response.text();
        
        setResult(text);
      } catch (err) {
        console.error("Gemini API Error:", err);
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
      }
    },
    [key, model]
  );

  const setApiKey = useCallback((newKey: string) => {
    setKey(newKey);
  }, []);

  return {
    loading,
    error,
    result,
    generateContent,
    setApiKey,
    hasApiKey: !!key
  };
}
