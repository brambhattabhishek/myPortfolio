
import { ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
}

export function Section({ id, children, className, fullWidth = false }: SectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.2,
      }
    }
  };
  
  return (
    <motion.section
      id={id}
      ref={ref}
      className={cn(
        "py-16 md:py-24",
        !fullWidth && "container",
        className
      )}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
    >
      {children}
    </motion.section>
  );
}

export function SectionItem({ children, className, delay = 0 }: { 
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        delay
      }
    }
  };
  
  return (
    <motion.div 
      className={className} 
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
