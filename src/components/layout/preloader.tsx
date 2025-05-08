
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface PreloaderProps {
  onFinish?: () => void;
}

export function Preloader({ onFinish }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 10;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => {
        setIsComplete(true);
        onFinish?.();
      }, 500);
    }
  }, [progress, onFinish]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-gradient mb-6">Abhishek B</h1>
            
            <div className="w-56 sm:w-80 h-1 bg-secondary relative overflow-hidden rounded-full">
              <motion.div
                className="absolute top-0 left-0 h-full bg-primary"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
            
            <p className={cn(
              "mt-2 text-sm font-medium",
              progress >= 100 ? "text-primary" : "text-muted-foreground"
            )}>
              {Math.round(progress)}%
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
