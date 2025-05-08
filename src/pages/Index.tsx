
import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { PageLayout } from "@/components/layout/page-layout";
import { Preloader } from "@/components/layout/preloader";
import { Section, SectionItem } from "@/components/layout/section";
import { AnimatedButton } from "@/components/ui/animated-button";
import { AIChat } from "@/components/features/ai-chat";
import { useMousePosition } from "@/hooks/use-mouse-position";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Code, Database, Layout, Server } from "lucide-react";

export default function Index() {
  const [loading, setLoading] = useState(true);
  const mousePosition = useMousePosition();
  
  const spotlightX = useMotionValue(0);
  const spotlightY = useMotionValue(0);
  
  const springConfig = { damping: 20, stiffness: 300 };
  const spotlightXSpring = useSpring(spotlightX, springConfig);
  const spotlightYSpring = useSpring(spotlightY, springConfig);
  
  useEffect(() => {
    if (mousePosition.x && mousePosition.y) {
      spotlightX.set(mousePosition.x);
      spotlightY.set(mousePosition.y);
    }
  }, [mousePosition, spotlightX, spotlightY]);

  const services = [
    {
      title: "Full Stack Development",
      description: "Modern, responsive web applications built with cutting-edge technologies.",
      features: ["React & Next.js", "Node.js & Express.js", "MongoDB & PostgreSQL"],
      icon: <Code className="h-6 w-6" />
    },
    {
      title: "UI/UX Design",
      description: "Beautiful user interfaces and intuitive experiences that delight users.",
      features: ["Figma to Code", "Responsive Design", "User-Centered Approach"],
      icon: <Layout className="h-6 w-6" />
    },
    {
      title: "AI Integration",
      description: "Smart features powered by artificial intelligence for enhanced functionality.",
      features: ["Machine Learning", "OCR & Computer Vision", "Langchain Integration"],
      icon: <Server className="h-6 w-6" />
    },
  ];

  return (
    <>
      {loading ? (
        <Preloader onFinish={() => setLoading(false)} />
      ) : (
        <PageLayout>
          {/* Hero Section */}
          <Section fullWidth className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-background via-background to-secondary/20">
            {/* Animated background */}
            <div className="absolute inset-0 pointer-events-none">
              <div 
                className="absolute inset-0 bg-[radial-gradient(circle_at_var(--x)_var(--y),rgba(120,78,250,0.15)_0%,transparent_60%)]" 
                style={{
                  "--x": `${spotlightXSpring.get()}px`,
                  "--y": `${spotlightYSpring.get()}px`,
                } as any}
              />
            </div>
            
            <div className="container mx-auto relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <SectionItem>
                  <span className="inline-block text-sm font-semibold py-1 px-3 mb-4 rounded-full bg-primary/10 text-primary">
                    Full Stack Developer
                  </span>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight text-balance">
                    <span className="text-gradient">Abhishek</span>
                    <br />
                    <span>Brahmbhatt</span>
                  </h1>
                  <p className="text-lg mb-8 text-muted-foreground max-w-md">
                    Creating modern web applications with a focus on user experience, performance, and cutting-edge technologies.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link to="/about">
                      <AnimatedButton size="lg">
                        About Me
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </AnimatedButton>
                    </Link>
                    <Link to="/contact">
                      <AnimatedButton variant="outline" size="lg">
                        Contact
                      </AnimatedButton>
                    </Link>
                  </div>
                </SectionItem>
                
                <SectionItem delay={0.3} className="relative">
                  <motion.div
                    className="relative z-10"
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  >
                    <div className="relative w-full aspect-square max-w-md mx-auto">
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-600/40 to-blue-500/40 rounded-full blur-3xl opacity-30" />
                      <motion.div
                        className="absolute inset-0 glass rounded-3xl overflow-hidden shadow-xl"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      >
                        <img
                          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                          alt="Abhishek Brahmbhatt - Developer"
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                </SectionItem>
              </div>
            </div>
          </Section>

          {/* Skills & Services Section */}
          <Section id="services">
            <div className="text-center mb-14">
              <SectionItem>
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  My <span className="text-gradient">Expertise</span>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Specialized skills in development, design, and AI integration for comprehensive digital solutions.
                </p>
              </SectionItem>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <SectionItem key={service.title} delay={index * 0.2}>
                  <motion.div
                    className="h-full bg-card rounded-xl p-6 shadow-md border border-border"
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                    <p className="text-muted-foreground mb-5 text-sm">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </SectionItem>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <SectionItem delay={0.6}>
                <Link to="/services">
                  <AnimatedButton variant="outline">
                    View All Services
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </AnimatedButton>
                </Link>
              </SectionItem>
            </div>
          </Section>

          {/* Projects Highlight Section */}
          <Section className="bg-secondary/50 py-24" id="projects-highlight">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <SectionItem>
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  Featured <span className="text-gradient">Projects</span>
                </h2>
                <p className="text-muted-foreground mb-6">
                  Highlights from my recent work spanning web development, AI integration, and innovative solutions.
                </p>
                <ul className="space-y-4 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-3 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">ImageGenerator</h4>
                      <p className="text-sm text-muted-foreground">Content summarizing application with Langchain and Google Gemini API integration.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-3 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">Banking Application</h4>
                      <p className="text-sm text-muted-foreground">Real-time matchmaking and video calling with Socket.IO and WebRTC.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-3 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">Flipkart Grid: QC System</h4>
                      <p className="text-sm text-muted-foreground">Automated quality control system using YOLOv8, CNN, and OCR.</p>
                    </div>
                  </li>
                </ul>
                
                <Link to="/about#projects">
                  <AnimatedButton>
                    View All Projects
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </AnimatedButton>
                </Link>
              </SectionItem>
              
              <SectionItem delay={0.3}>
                <div className="relative">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/30 to-blue-500/30 rounded-full blur-3xl opacity-30 -z-10" />
                  <motion.div
                    className="bg-card rounded-xl overflow-hidden shadow-lg border border-border"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Project Demo"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </div>
              </SectionItem>
            </div>
          </Section>

          {/* AI Chat Demo Section */}
          <Section id="ai-demo">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <SectionItem>
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  Chat with <span className="text-gradient">AI Assistant</span>
                </h2>
                <p className="text-muted-foreground mb-6">
                  Ask questions about my skills, experience, or projects. This AI assistant is trained with my information and can help answer your queries.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-sm">Learn about my technical skills</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-sm">Discover my project experience</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-sm">Find out about my education and achievements</span>
                  </li>
                </ul>
                
                <Link to="/contact">
                  <AnimatedButton>
                    Contact Me Directly
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </AnimatedButton>
                </Link>
              </SectionItem>
              
              <SectionItem delay={0.3}>
                <AIChat />
              </SectionItem>
            </div>
          </Section>
          
          {/* CTA Section */}
          <Section>
            <div className="bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-2xl p-8 md:p-12 relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-primary/20 to-transparent opacity-50 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-blue-500/20 to-transparent opacity-50 blur-3xl" />
              </div>
              
              <div className="relative z-10 text-center max-w-3xl mx-auto">
                <SectionItem>
                  <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                    Let's Build Something <span className="text-gradient">Amazing</span>
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    I'm available for freelance projects and full-time opportunities. Let's collaborate and bring your ideas to life.
                  </p>
                  <Link to="/contact">
                    <AnimatedButton size="lg">
                      Get In Touch
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </AnimatedButton>
                  </Link>
                </SectionItem>
              </div>
            </div>
          </Section>
        </PageLayout>
      )}
    </>
  );
}
