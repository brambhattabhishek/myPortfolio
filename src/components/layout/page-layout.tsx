
import { ReactNode, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { Navbar } from "./navbar";
import { Footer } from "./footer";

interface PageLayoutProps {
  children: ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  const { pathname } = useLocation();
  
  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeInOut" }
    },
    exit: { 
      opacity: 0, 
      y: -20, 
      transition: { duration: 0.3 }
    }
  };
  
  return (
    <>
      <Navbar />
      <motion.main
        className="min-h-screen pt-20"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={variants}
        key={pathname}
      >
        {children}
      </motion.main>
      <Footer />
    </>
  );
}
