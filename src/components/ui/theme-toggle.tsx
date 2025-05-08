
import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/providers/ThemeProvider";
import { cn } from "@/lib/utils";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <motion.button
      aria-label="Toggle theme"
      className={cn(
        "relative h-10 w-10 rounded-full flex items-center justify-center",
        className
      )}
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="absolute inset-0 bg-primary/10 rounded-full"
        initial={{ scale: 0 }}
        animate={{ scale: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
      
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: theme === "light" ? 0 : 180 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="relative z-10"
      >
        {theme === "light" ? (
          <Sun className="w-5 h-5 text-foreground" />
        ) : (
          <Moon className="w-5 h-5 text-foreground" />
        )}
      </motion.div>
    </motion.button>
  );
}
