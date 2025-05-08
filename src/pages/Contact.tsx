import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { PageLayout } from "@/components/layout/page-layout";
import { Section, SectionItem } from "@/components/layout/section";
import { AnimatedButton } from "@/components/ui/animated-button";
import { useMousePosition } from "@/hooks/use-mouse-position";
import { Mail, MapPin, MessageSquare, Phone, Linkedin, Github, Code as LeetCode } from "lucide-react";
import { CodeChefIcon } from "@/components/ui/custom-icons";
import { AIChat } from "@/components/features/ai-chat";
import { LocationMap } from "@/components/features/location-map";

export default function Contact() {
  const mousePosition = useMousePosition();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormState({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <PageLayout>
      {/* Hero Section */}
      <Section fullWidth className="bg-gradient-to-b from-background to-secondary/20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <SectionItem>
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                Get In <span className="text-gradient">Touch</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Have a question or want to work together? I'd love to hear from you.
              </p>
            </SectionItem>
          </div>
        </div>
      </Section>

      {/* Contact Info + Form Section */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <SectionItem>
            <div className="bg-card rounded-xl p-6 border border-border shadow-md h-full">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4 shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Permanent Address</h3>
                    <p className="text-muted-foreground">
                      B.N.1 Parvati Manshon, Hanuman road,<br />
                      near post office, Vapi 396191,<br />
                      Gujarat, India
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4 shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Current Location</h3>
                    <p className="text-muted-foreground">
                      Chak Ganjaria, C, G. City,<br />
                      Lucknow, Ahmamau,<br />
                      Uttar Pradesh 226002, India
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4 shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Phone</h3>
                    <p className="text-muted-foreground">
                      +91 9054954412
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4 shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Email</h3>
                    <p className="text-muted-foreground">
                      <a href="mailto:brambhattabhishek@gmail.com" className="hover:text-primary">
                        brambhattabhishek@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4 shrink-0">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Social Media</h3>
                    <div className="flex space-x-4 mt-2">
                      <a
                        href="https://www.linkedin.com/in/abhishek-brahmbhatt-4a5ba2290/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-background shadow-sm transition-colors hover:bg-primary/10"
                        title="LinkedIn"
                      >
                        <Linkedin size={16} />
                      </a>
                      <a
                        href="https://github.com/brambhattabhishek"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-background shadow-sm transition-colors hover:bg-primary/10"
                        title="GitHub"
                      >
                        <Github size={16} />
                      </a>
                      <a
                        href="https://leetcode.com/u/Brahmbhattabhishek/"
                        target="_blank"
                        rel="noopener noreferrer" 
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-background shadow-sm transition-colors hover:bg-primary/10"
                        title="LeetCode"
                      >
                        <LeetCode size={16} />
                      </a>
                      <a
                        href="https://www.codechef.com/users/brambhattabhis"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-background shadow-sm transition-colors hover:bg-primary/10"
                        title="CodeChef"
                      >
                        <CodeChefIcon size={16} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SectionItem>
          
          <SectionItem delay={0.3}>
            <div className="bg-card rounded-xl p-6 border border-border shadow-md">
              <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="w-full p-3 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="w-full p-3 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Your email"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Subject"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full p-3 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Your message"
                  />
                </div>
                
                <AnimatedButton
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </AnimatedButton>
                
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-4 p-4 bg-green-100 text-green-700 rounded-md text-sm"
                  >
                    Your message has been sent successfully! We'll get back to you soon.
                  </motion.div>
                )}
              </form>
            </div>
          </SectionItem>
        </div>
      </Section>

      {/* Map Section */}
      <Section className="bg-secondary/50">
        <div className="text-center mb-10">
          <SectionItem>
            <h2 className="text-3xl font-bold mb-4">
              My <span className="text-gradient">Location</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Currently based in Lucknow with permanent residence in Vapi, Gujarat.
            </p>
          </SectionItem>
        </div>
        
        <SectionItem>
          <div className="rounded-xl overflow-hidden shadow-lg h-[400px] border border-border">
            <LocationMap className="w-full h-full" />
          </div>
        </SectionItem>
      </Section>

      {/* AI Chat Section */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <SectionItem>
            <h2 className="text-3xl font-bold mb-4">
              Chat with our <span className="text-gradient">AI Assistant</span>
            </h2>
            <p className="text-muted-foreground mb-6">
              Have a quick question? Try our AI assistant powered by Google's Gemini AI. Just enter your API key to get started.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center text-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2" />
                <span>Get quick answers to common questions</span>
              </li>
              <li className="flex items-center text-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2" />
                <span>Learn more about our services</span>
              </li>
              <li className="flex items-center text-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2" />
                <span>Request information about pricing</span>
              </li>
              <li className="flex items-center text-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2" />
                <span>Available 24/7</span>
              </li>
            </ul>
          </SectionItem>
          
          <SectionItem delay={0.3}>
            <AIChat />
          </SectionItem>
        </div>
      </Section>
    </PageLayout>
  );
}
