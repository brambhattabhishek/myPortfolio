
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Home } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // Log the 404 error with more detailed information
    console.log("404 Error detected");
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    // Show a toast notification to provide feedback to the user
    toast({
      title: "Page Not Found",
      description: `The path "${location.pathname}" does not exist.`,
      variant: "destructive",
    });
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <motion.div
        className="max-w-md w-full text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8"
        >
          <div className="text-9xl font-bold text-gradient">404</div>
        </motion.div>

        <h1 className="text-2xl font-bold mb-4">Oops! Page Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <Link to="/">
          <AnimatedButton>
            <Home className="mr-2 h-4 w-4" />
            Return to Home
          </AnimatedButton>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
