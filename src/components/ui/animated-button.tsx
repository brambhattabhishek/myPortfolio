
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useMousePosition } from "@/hooks/use-mouse-position";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "default" | "outline" | "ghost";
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  magnetic?: boolean;
  type?: "button" | "submit" | "reset";
}

export function AnimatedButton({
  children,
  onClick,
  className,
  variant = "default",
  disabled = false,
  size = "md",
  magnetic = true,
  type = "button",
}: AnimatedButtonProps) {
  const mouse = useMousePosition();
  
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-primary hover:bg-primary/10 text-foreground",
    ghost: "hover:bg-primary/10 text-foreground",
  };
  
  const sizes = {
    sm: "text-sm px-3 py-1.5 h-9",
    md: "text-base px-5 py-2 h-10",
    lg: "text-lg px-6 py-3 h-12",
  };

  return (
    <motion.button
      type={type}
      className={cn(
        "relative inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: magnetic ? 1.05 : 1 }}
      animate={
        magnetic
          ? {
              x: mouse.x ? (mouse.x - window.innerWidth / 2) / 30 : 0,
              y: mouse.y ? (mouse.y - window.innerHeight / 2) / 30 : 0,
            }
          : {}
      }
    >
      {children}
    </motion.button>
  );
}
