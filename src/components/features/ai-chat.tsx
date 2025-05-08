import { useState, FormEvent, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGeminiAI } from "@/hooks/use-gemini-ai";
import { AnimatedButton } from "@/components/ui/animated-button";
import { cn } from "@/lib/utils";
import { Loader2, Send, Check, User } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

// Default Gemini API key
const DEFAULT_GEMINI_API_KEY = "AIzaSyCJ6Mc1Bb6grw1pI2I9tGBsphN6iEtQi3o";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export function AIChat() {
  const [apiKey, setApiKey] = useState<string>(DEFAULT_GEMINI_API_KEY);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [isKeySet, setIsKeySet] = useState<boolean>(!!DEFAULT_GEMINI_API_KEY);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { 
    loading, 
    error, 
    result, 
    generateContent, 
    setApiKey: setGeminiApiKey,
    hasApiKey
  } = useGeminiAI({ defaultKey: DEFAULT_GEMINI_API_KEY });
  
  const handleKeySubmit = (e: FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      setGeminiApiKey(apiKey);
      setIsKeySet(true);
      toast.success("API key set successfully");
    }
  };
  
  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    
    if (input.trim() && !loading) {
      const userMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content: input,
      };
      
      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      
      await generateContent(input);
    }
  };
  
  useEffect(() => {
    if (result) {
      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: result,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    }
  }, [result]);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  useEffect(() => {
    if (error) {
      console.error("AI Error:", error);
      toast.error(`Error: ${error.message}`);
    }
  }, [error]);

  // Add welcome message on initial load
  useEffect(() => {
    if (messages.length === 0 && isKeySet) {
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content: "Hello! I'm Abhishek's AI assistant. How can I help you today? You can ask about Abhishek's skills, projects, or why he'd be a great fit for roles like Full Stack Developer, Frontend Developer, Backend Developer, or Data Science/AI Engineer."
        }
      ]);
    }
  }, [messages.length, isKeySet]);

  const suggestedQuestions = [
    "Why should I hire Abhishek as a Full Stack Developer?",
    "What makes Abhishek a good Frontend Developer?",
    "Tell me about Abhishek's Backend Development skills",
    "Why is Abhishek suitable for AI/ML positions?",
    "What projects demonstrate Abhishek's technical abilities?"
  ];

  return (
    <div className="w-full max-w-md mx-auto rounded-xl overflow-hidden bg-card shadow-lg">
      <div className="p-4 border-b bg-primary flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
          <User className="w-4 h-4 text-primary-foreground" />
        </div>
        <h3 className="text-lg font-medium text-primary-foreground">Abhishek's AI Assistant</h3>
      </div>
      
      {!isKeySet && !hasApiKey ? (
        <div className="p-6">
          <p className="text-sm text-muted-foreground mb-4">
            Please enter your Gemini API key to start the conversation with Abhishek's AI assistant.
          </p>
          <form onSubmit={handleKeySubmit}>
            <Input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter Gemini API Key"
              className="w-full mb-3"
            />
            <AnimatedButton
              type="submit"
              size="sm"
              className="w-full"
            >
              Set API Key
            </AnimatedButton>
          </form>
        </div>
      ) : (
        <>
          <div className="h-96 overflow-y-auto p-4 space-y-3">
            <AnimatePresence>
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col justify-center items-center h-full gap-2"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-600 font-medium">API Key Connected</span>
                  </div>
                  <p className="text-muted-foreground text-sm text-center mb-2">
                    Ask me anything about Abhishek Brahmbhatt or why he'd be a great fit for your team!
                  </p>
                  <div className="w-full mt-2">
                    <p className="text-xs text-muted-foreground mb-2 text-center">Try asking:</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {suggestedQuestions.map((question, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setInput(question);
                          }}
                          className="text-xs bg-secondary/50 hover:bg-secondary/70 rounded-full px-2 py-1 text-muted-foreground transition-colors"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {messages.map((message) => (
              <motion.div
                key={message.id}
                className={cn(
                  "flex max-w-[80%] p-3 rounded-lg",
                  message.role === "user" 
                    ? "bg-primary/10 ml-auto" 
                    : "bg-secondary mr-auto"
                )}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </motion.div>
            ))}
            
            {loading && (
              <motion.div
                className="flex max-w-[80%] p-3 rounded-lg bg-secondary"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <p className="text-sm text-muted-foreground">Thinking...</p>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          <form onSubmit={handleSendMessage} className="border-t p-4">
            <div className="flex gap-2">
              <Input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Abhishek's skills, fit for roles..."
                className="flex-1"
                disabled={loading}
              />
              <button
                type="submit"
                className={cn(
                  "p-2 rounded-md bg-primary text-primary-foreground",
                  loading ? "opacity-60 cursor-not-allowed" : "hover:bg-primary/90"
                )}
                disabled={loading || !input.trim()}
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
