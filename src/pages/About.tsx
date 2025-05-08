
import { motion } from "framer-motion";
import { PageLayout } from "@/components/layout/page-layout";
import { Section, SectionItem } from "@/components/layout/section";
import { Link } from "react-router-dom";
import { ArrowRight, Award, Book, Briefcase, Github, Linkedin, Mail, Phone, Star, User, FileText, Code } from "lucide-react";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Card, CardContent } from "@/components/ui/card";
import { AIChat } from "@/components/features/ai-chat";

export default function About() {
  // Updated with Abhishek's information
  const skills = [
    { category: "Programming", skills: ["Rust", "C/C++", "JavaScript", "TypeScript", "Python", "HTML/CSS"] },
    { category: "Technologies", skills: ["ROS2", "Gazebo", "MoveIt", "OpenCV", "Next.js", "Express.js", "Django"] },
    { category: "Soft Skills", skills: ["Communication", "Teamwork", "Leadership", "Problem-Solving", "Creativity"] },
    { category: "Tools", skills: ["Git", "Docker", "Linux", "CMake", "WebSockets", "Firebase"] },
    { category: "Concepts", skills: ["Data Structures & Algorithms", "OOP", "DBMS", "OS", "Computer Networking"] },
  ];

  const education = [
    {
      institution: "Indian Institute of Information Technology, Lucknow",
      degree: "Master's of Science (M.S) in Economics and Management",
      period: "Aug 2023 – June 2025 (Expected)",
      location: "Lucknow, UP",
      details: "Strong foundation in Economics, Mathematics, Data Analysis, Statistical Modeling, and Optimization Techniques.",
    },
    {
      institution: "Parul Institute of Applied Science, Vadodara",
      degree: "Bachelor's of Science (B.S) in Mathematics and Physics",
      period: "June 2019 – May 2022",
      location: "Vadodara, Gujarat",
    },
  ];

  const experience = [
    {
      role: "Full Stack Developer Intern",
      company: "Technohecks EduTech",
      period: "Jan 2025 – Feb 2025",
      responsibilities: [
        "Built responsive UIs with HTML, CSS, and React.js, ensuring seamless user experiences across devices.",
        "Developed and optimized RESTful APIs using Node.js, Express.js, MongoDB, and integrated AWS services (S3, EC2) for deployment.",
        "Converted Figma designs into functional websites with React.js, TypeScript, and Bootstrap while ensuring smooth backend integration and cloud deployment.",
      ],
    },
  ];

  const projects = [
    {
      name: "ImageGenerator",
      technologies: "Turborepo, Express.js, Next.js, Prisma, PostgreSQL, Langchain",
      date: "February 2025",
      description: [
        "Constructed content summarizing application which allows people with ADHD and Dyslexia to learn with ease.",
        "Integrated Langchain to utilize Google Gemini API for summarization within Turborepo.",
        "Implemented Text to Speech functionality on the frontend to simplify the learning process for people.",
      ],
    },
    {
      name: "Banking Application",
      technologies: "Node.js, Websockets, WebRTC, Express.js, Next.js",
      date: "October 2024",
      description: [
        "Engineered a real-time matchmaking and video calling application using Socket.IO and WebRTC.",
        "Developed a matchmaking engine leveraging Node.js event driven architecture to obtain speed and efficiency.",
        "Implemented an efficient matchmaking algorithm to find quick and accurate matches.",
      ],
    },
    {
      name: "Flipkart Grid: QC System",
      technologies: "YOLOv8, OpenCV, TensorFlow, Keras, OCR, CNN",
      date: "June 2024",
      description: [
        "Built an automated quality control system utilizing YOLOv8, CNN, and OCR for detection, classification, and freshness assessment of fruits, vegetables, and packaged products.",
        "Enhanced accuracy and efficiency in product quality assurance through a user-friendly web application.",
      ],
    },
  ];

  const achievements = [
    "Attained all India rank 1300 in IIT JAM 2022 qualified for IIITL.",
    "Attained Flipkart Grid 6.0 Robotics Challenge: Cleared Level 1 and reached the Submission Round.",
    "Solved 50 SQL problems, 350+ DSA problems on LeetCode and CodeChef.",
    "Achieved a maximum rating of 1431 and earned 2-Stars in the latest CodeChef contest.",
    "Certified Software Engineer Intern by Hackerrank.",
    "Certified in Data Science with Python by IBM.",
  ];

  return (
    <PageLayout>
      {/* Hero Section */}
      <Section fullWidth className="relative bg-gradient-to-b from-background to-secondary/20 pb-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <SectionItem>
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                About <span className="text-gradient">Abhishek Brahmbhatt</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Full Stack Developer with expertise in web development, AI integration, and creative problem-solving.
              </p>
              <div className="flex justify-center gap-4">
                <a href="mailto:brambhattabhishek@gmail.com" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
                  <Mail className="w-5 h-5" /> Email
                </a>
                <a href="tel:+919054954412" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
                  <Phone className="w-5 h-5" /> +91 9054954412
                </a>
                <a href="#" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
                  <Linkedin className="w-5 h-5" /> LinkedIn
                </a>
                <a href="#" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
                  <Github className="w-5 h-5" /> GitHub
                </a>
              </div>
            </SectionItem>
          </div>
        </div>
      </Section>

      {/* Personal Summary */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <SectionItem>
            <span className="inline-block text-sm font-semibold py-1 px-3 mb-4 rounded-full bg-primary/10 text-primary">
              My Story
            </span>
            <h2 className="text-3xl font-bold mb-4">
              Who I Am
            </h2>
            <p className="text-muted-foreground mb-6">
              I am a curious person with a talent for solving complex puzzles. I did an advanced degree in finance and business, where I developed my critical thinking and problem-solving skills.
            </p>
            <p className="text-muted-foreground mb-6">
              However, my heart led me towards website design and coding. What was once a hobby became my passion really fast. Eager to create amazing digital work, I immersed myself in learning a lot of programming languages and frameworks.
            </p>
            <p className="text-muted-foreground mb-6">
              I am now pursuing my goal of becoming a developer by blending my practical tech expertise with my analytical abilities. I work best in group settings where creativity is unrestricted and ideas are freely exchanged.
            </p>
            <p className="text-muted-foreground mb-6">
              My history may sound unusual, but I think it gives me a different perspective. I approach each project with a combination of strategy and creativity to ensure that it not only works but also has a great impact.
            </p>
            <div className="flex gap-4">
              <Link to="/contact">
                <AnimatedButton>
                  Contact Me
                  <ArrowRight className="ml-2 h-4 w-4" />
                </AnimatedButton>
              </Link>
            </div>
          </SectionItem>
          
          <SectionItem delay={0.3}>
            <div className="relative">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/30 to-blue-500/30 rounded-full blur-3xl opacity-30 -z-10" />
              <motion.div
                className="bg-card rounded-xl overflow-hidden shadow-lg border border-border"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <AIChat />
              </motion.div>
            </div>
          </SectionItem>
        </div>
      </Section>

      {/* Education Section */}
      <Section className="bg-secondary/50">
        <div className="text-center mb-14">
          <SectionItem>
            <h2 className="text-3xl font-bold mb-4">
              My <span className="text-gradient">Education</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Academic journey that has shaped my knowledge and expertise.
            </p>
          </SectionItem>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {education.map((edu, index) => (
            <SectionItem key={edu.institution} delay={index * 0.2}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      <Book className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{edu.institution}</h3>
                      <p className="text-primary text-sm mb-2">{edu.degree}</p>
                      <p className="text-muted-foreground text-sm mb-1">{edu.period} | {edu.location}</p>
                      {edu.details && <p className="text-muted-foreground text-sm mt-2">{edu.details}</p>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </SectionItem>
          ))}
        </div>
      </Section>

      {/* Experience Section */}
      <Section id="experience">
        <div className="text-center mb-14">
          <SectionItem>
            <h2 className="text-3xl font-bold mb-4">
              Work <span className="text-gradient">Experience</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Professional journey and practical expertise in the field.
            </p>
          </SectionItem>
        </div>
        
        <div className="space-y-8">
          {experience.map((exp, index) => (
            <SectionItem key={exp.role + exp.company} delay={index * 0.2}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      <Briefcase className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{exp.role}</h3>
                      <p className="text-primary text-sm mb-2">{exp.company} | {exp.period}</p>
                      <ul className="mt-3 space-y-2">
                        {exp.responsibilities.map((resp, i) => (
                          <li key={i} className="text-muted-foreground text-sm flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </SectionItem>
          ))}
        </div>
      </Section>

      {/* Projects Section */}
      <Section className="bg-secondary/30" id="projects">
        <div className="text-center mb-14">
          <SectionItem>
            <h2 className="text-3xl font-bold mb-4">
              Featured <span className="text-gradient">Projects</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Highlighted projects showcasing my technical skills and problem-solving abilities.
            </p>
          </SectionItem>
        </div>
        
        <div className="space-y-8">
          {projects.map((project, index) => (
            <SectionItem key={project.name} delay={index * 0.2}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      <Code className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{project.name}</h3>
                      <p className="text-primary text-sm mb-1">{project.technologies}</p>
                      <p className="text-muted-foreground text-xs mb-3">{project.date}</p>
                      <ul className="mt-2 space-y-2">
                        {project.description.map((desc, i) => (
                          <li key={i} className="text-muted-foreground text-sm flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>{desc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </SectionItem>
          ))}
        </div>
      </Section>

      {/* Skills Section */}
      <Section>
        <div className="text-center mb-14">
          <SectionItem>
            <h2 className="text-3xl font-bold mb-4">
              My <span className="text-gradient">Skills</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Technical expertise and competencies that drive my work.
            </p>
          </SectionItem>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skillSet, index) => (
            <SectionItem key={skillSet.category} delay={index * 0.1}>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3 text-primary">{skillSet.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillSet.skills.map((skill) => (
                      <span 
                        key={skill} 
                        className="bg-secondary/50 text-sm py-1 px-3 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </SectionItem>
          ))}
        </div>
      </Section>

      {/* Achievements Section */}
      <Section className="bg-secondary/50">
        <div className="text-center mb-14">
          <SectionItem>
            <h2 className="text-3xl font-bold mb-4">
              <span className="text-gradient">Achievements</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Recognitions and accomplishments throughout my journey.
            </p>
          </SectionItem>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((achievement, index) => (
            <SectionItem key={index} delay={index * 0.1}>
              <motion.div 
                className="bg-card border border-border rounded-xl p-6 flex items-start gap-4"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <Award className="h-5 w-5" />
                </div>
                <p className="text-muted-foreground">{achievement}</p>
              </motion.div>
            </SectionItem>
          ))}
        </div>
      </Section>

      {/* Resume Section */}
      <Section>
        <div className="bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-2xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-primary/20 to-transparent opacity-50 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-blue-500/20 to-transparent opacity-50 blur-3xl" />
          </div>
          
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <SectionItem>
              <h2 className="text-3xl font-bold mb-6">
                Want to know more about my <span className="text-gradient">experience</span>?
              </h2>
              <p className="text-muted-foreground mb-8">
                Download my resume to get a comprehensive overview of my skills, experience, and qualifications.
              </p>
              <div className="flex justify-center">
                <AnimatedButton size="lg">
                  <FileText className="mr-2 h-5 w-5" />
                  Download Resume
                </AnimatedButton>
              </div>
            </SectionItem>
          </div>
        </div>
      </Section>
    </PageLayout>
  );
}
