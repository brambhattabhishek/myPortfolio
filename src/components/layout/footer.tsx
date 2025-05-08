import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Linkedin, Github, Code as LeetCode } from "lucide-react";
import { CodeChefIcon } from "@/components/ui/custom-icons";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-secondary/50 pt-16 pb-8"
    >
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gradient">Abhishek B</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Building stunning digital experiences with modern web technologies.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/in/abhishek-brahmbhatt-4a5ba2290/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-background shadow-sm transition-colors hover:bg-primary/10"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="https://github.com/brambhattabhishek"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-background shadow-sm transition-colors hover:bg-primary/10"
              >
                <Github size={16} />
              </a>
              <a
                href="https://leetcode.com/u/Brahmbhattabhishek/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-background shadow-sm transition-colors hover:bg-primary/10"
              >
                <LeetCode size={16} />
              </a>
              <a
                href="https://www.codechef.com/users/brambhattabhis"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-background shadow-sm transition-colors hover:bg-primary/10"
              >
                <CodeChefIcon size={16} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary">
                  About
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-sm text-muted-foreground hover:text-primary">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                  Web Development
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                  UI/UX Design
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                  AI Integration
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                  Digital Strategy
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">
                  B.N.1 Parvati Manshon, Hanuman road, near post office, Vapi 396191, Gujarat, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span className="text-sm text-muted-foreground">+91 9054954412</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <a href="mailto:brambhattabhishek@gmail.com" className="text-sm text-muted-foreground hover:text-primary">
                  brambhattabhishek@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            © {currentYear} Abhishek B. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
