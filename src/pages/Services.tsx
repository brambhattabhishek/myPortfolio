
import { motion } from "framer-motion";
import { PageLayout } from "@/components/layout/page-layout";
import { Section, SectionItem } from "@/components/layout/section";
import { AnimatedButton } from "@/components/ui/animated-button";
import { useMousePosition } from "@/hooks/use-mouse-position";
import { Link } from "react-router-dom";
import { ArrowRight, Code, Layout, Lightbulb, Monitor, PenTool, Search, Server, Settings, Smartphone } from "lucide-react";

export default function Services() {
  const mousePosition = useMousePosition();

  const services = [
    {
      icon: <Layout />,
      title: "UI/UX Design",
      description: "Create intuitive and beautiful user interfaces that enhance user experience and engagement.",
      details: [
        "User research and persona development",
        "Wireframing and prototyping",
        "Interactive design and animations",
        "Accessibility compliance"
      ]
    },
    {
      icon: <Code />,
      title: "Web Development",
      description: "Build modern, responsive websites and web applications with cutting-edge technologies.",
      details: [
        "React and Next.js development",
        "Responsive and mobile-first design",
        "Performance optimization",
        "Progressive Web Apps (PWAs)"
      ]
    },
    {
      icon: <Smartphone />,
      title: "Mobile Development",
      description: "Develop cross-platform mobile applications that work seamlessly on iOS and Android devices.",
      details: [
        "React Native development",
        "Native app integration",
        "Mobile UI/UX design",
        "App store optimization"
      ]
    },
    {
      icon: <Server />,
      title: "Backend Development",
      description: "Create robust, scalable backend systems that power your applications and services.",
      details: [
        "API development and integration",
        "Database design and optimization",
        "Authentication and authorization",
        "Server management and deployment"
      ]
    },
    {
      icon: <Lightbulb />,
      title: "AI Integration",
      description: "Enhance your applications with AI capabilities that improve functionality and user experience.",
      details: [
        "Chatbot development",
        "Content generation",
        "Personalization engines",
        "Data analysis and insights"
      ]
    },
    {
      icon: <Search />,
      title: "SEO & Analytics",
      description: "Optimize your digital presence for search engines and track performance with advanced analytics.",
      details: [
        "Search engine optimization",
        "Performance tracking",
        "User behavior analysis",
        "Conversion rate optimization"
      ]
    },
    {
      icon: <PenTool />,
      title: "Content Strategy",
      description: "Develop engaging content strategies that connect with your audience and drive results.",
      details: [
        "Content planning and creation",
        "Editorial calendars",
        "Content distribution",
        "Performance measurement"
      ]
    },
    {
      icon: <Settings />,
      title: "Maintenance & Support",
      description: "Keep your digital products running smoothly with ongoing maintenance and support services.",
      details: [
        "Bug fixes and updates",
        "Performance monitoring",
        "Security patches",
        "Feature enhancements"
      ]
    },
  ];

  return (
    <PageLayout>
      {/* Hero Section */}
      <Section fullWidth className="bg-gradient-to-b from-background to-secondary/20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <SectionItem>
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                Our <span className="text-gradient">Services</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Comprehensive digital solutions tailored to your business needs.
              </p>
            </SectionItem>
          </div>
        </div>
      </Section>

      {/* Services Grid */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.slice(0, 6).map((service, index) => (
            <SectionItem key={service.title} delay={index * 0.1}>
              <motion.div
                className="h-full bg-card rounded-xl p-6 shadow-md border border-border relative overflow-hidden group"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-b-xl origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
                
                <div className="w-12 h-12 mb-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  {service.icon}
                </div>
                
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-5 text-sm">
                  {service.description}
                </p>
                
                <ul className="space-y-2 mb-4">
                  {service.details.slice(0, 2).map((detail) => (
                    <li key={detail} className="flex items-center text-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-auto">
                  <button className="text-primary text-sm font-medium inline-flex items-center hover:underline">
                    Learn more
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </button>
                </div>
              </motion.div>
            </SectionItem>
          ))}
        </div>

        {/* Additional Services */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.slice(6).map((service, index) => (
            <SectionItem key={service.title} delay={0.6 + index * 0.1}>
              <motion.div
                className="h-full bg-card rounded-xl p-6 shadow-md border border-border relative overflow-hidden group"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-b-xl origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    {service.icon}
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                    <p className="text-muted-foreground mb-4 text-sm">
                      {service.description}
                    </p>
                    
                    <button className="text-primary text-sm font-medium inline-flex items-center hover:underline">
                      Learn more
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </SectionItem>
          ))}
        </div>
      </Section>

      {/* Process Section */}
      <Section className="bg-secondary/50">
        <div className="text-center mb-14">
          <SectionItem>
            <h2 className="text-3xl font-bold mb-4">
              Our <span className="text-gradient">Process</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              How we approach every project to ensure success.
            </p>
          </SectionItem>
        </div>

        <div className="max-w-4xl mx-auto">
          {["Discovery", "Planning", "Design", "Development", "Testing", "Deployment", "Support"].map((step, index) => (
            <SectionItem key={step} delay={index * 0.1}>
              <div className="flex items-start mb-12 relative">
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                    {index + 1}
                  </div>
                  {index < 6 && (
                    <div className="absolute top-12 bottom-0 left-1/2 w-0.5 h-12 bg-primary/30 -translate-x-1/2" />
                  )}
                </div>
                
                <motion.div
                  className="ml-6 bg-card rounded-xl p-6 border border-border flex-1"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-xl font-semibold mb-2">{step}</h3>
                  <p className="text-muted-foreground text-sm">
                    {getProcessDescription(index)}
                  </p>
                </motion.div>
              </div>
            </SectionItem>
          ))}
        </div>
      </Section>

      {/* Pricing Section */}
      <Section>
        <div className="text-center mb-14">
          <SectionItem>
            <h2 className="text-3xl font-bold mb-4">
              Simple <span className="text-gradient">Pricing</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Transparent pricing options to suit different project needs.
            </p>
          </SectionItem>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Basic",
              price: "$1,999",
              description: "Perfect for small businesses getting started",
              features: [
                "Responsive website design",
                "Up to 5 pages",
                "Basic SEO setup",
                "Contact form",
                "3 months support"
              ]
            },
            {
              name: "Professional",
              price: "$4,999",
              description: "Ideal for growing businesses with specific needs",
              features: [
                "Everything in Basic",
                "Custom UI/UX design",
                "Up to 10 pages",
                "Blog integration",
                "Advanced animations",
                "6 months support"
              ],
              recommended: true
            },
            {
              name: "Enterprise",
              price: "Custom",
              description: "Tailored solutions for complex requirements",
              features: [
                "Everything in Professional",
                "Custom functionality",
                "E-commerce integration",
                "AI-powered features",
                "Performance optimization",
                "1 year support"
              ]
            }
          ].map((plan, index) => (
            <SectionItem key={plan.name} delay={index * 0.2}>
              <motion.div 
                className={`h-full relative rounded-xl overflow-hidden bg-card border ${plan.recommended ? "border-primary" : "border-border"}`}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {plan.recommended && (
                  <div className="bg-primary text-primary-foreground text-xs font-semibold py-1 px-3 absolute top-0 right-0">
                    Recommended
                  </div>
                )}
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline mb-4">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    {plan.name !== "Enterprise" && <span className="text-muted-foreground text-sm ml-2">/ project</span>}
                  </div>
                  <p className="text-muted-foreground text-sm mb-6">
                    {plan.description}
                  </p>
                  
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-auto">
                    <Link to="/contact">
                      <AnimatedButton 
                        variant={plan.recommended ? "default" : "outline"}
                        className="w-full"
                      >
                        Get Started
                      </AnimatedButton>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </SectionItem>
          ))}
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
              <h2 className="text-3xl font-bold mb-6">
                Ready to Start Your <span className="text-gradient">Project</span>?
              </h2>
              <p className="text-muted-foreground mb-8">
                Contact us today to discuss your requirements and get a customized quote.
              </p>
              <Link to="/contact">
                <AnimatedButton size="lg">
                  Contact Us Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </AnimatedButton>
              </Link>
            </SectionItem>
          </div>
        </div>
      </Section>
    </PageLayout>
  );
}

function getProcessDescription(index: number): string {
  const descriptions = [
    "We learn about your business, goals, and requirements through in-depth consultations.",
    "We create a detailed project plan with timelines, milestones, and deliverables.",
    "Our designers craft beautiful interfaces focused on user experience and brand identity.",
    "Our developers build your application using modern technologies and best practices.",
    "Rigorous testing ensures your application works perfectly across all devices.",
    "We launch your project and ensure a smooth transition to the live environment.",
    "Ongoing maintenance and support to keep your application running optimally."
  ];
  
  return descriptions[index] || "";
}
