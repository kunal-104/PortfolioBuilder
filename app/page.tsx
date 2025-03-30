"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation" 
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button, Card, CardBody } from "@nextui-org/react"
import { ArrowRight, Sparkles, Code, Briefcase, GraduationCap, MessageSquare } from "lucide-react"
import {useContent} from '../context/ContentContext';
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

import { GoogleGenerativeAI } from "@google/generative-ai";
import PdfToTextExtractor from '../components/PdfToTextButton';

const API_KEY = "AIzaSyCtcXpKqIpyp2rd2Felgq2d8GEK90oVLQI";
const genAI = new GoogleGenerativeAI(API_KEY);




// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Home() {
  const pathname = usePathname() 
  const {user} = useContent();
  const heroRef = useRef(null)
  const statsRef = useRef(null)
  const featuresRef = useRef(null)
  const ctaRef = useRef(null)
  const backgroundRef = useRef(null)

  useEffect(() => {
    // Add a small delay to ensure DOM is fully rendered after navigation
    const initAnimations = setTimeout(() => {
      ScrollTrigger.refresh(true);
  
      // Hero animations
      const heroTl = gsap.timeline();
      if (heroRef.current) {
        heroTl.from(heroRef.current.querySelector(".hero-badge"), {
          opacity: 0,
          y: 20,
          duration: 0.6,
        });
        // Rest of your hero animations...
      }
  
      // Background animations
      if (backgroundRef.current) {
        gsap.to(backgroundRef.current.querySelectorAll(".bg-blob"), {
          x: "random(-20, 20)",
          y: "random(-20, 20)",
          rotation: "random(-15, 15)",
          duration: "random(20, 30)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.5,
        });
      }
  
      // Stats animations - with null checks
      if (statsRef.current) {
        gsap.from(statsRef.current.querySelectorAll(".stat-item"), {
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
        });
      }
  
      // Features animations - with null checks
      // ...rest of your animations with similar null checks
    }, 200); // 200ms delay to ensure DOM is ready
  
    return () => {
      // Clear the timeout
      clearTimeout(initAnimations);
      
      // Kill all animations
      gsap.killTweensOf("*");
      
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [pathname]);



  



  return (
    <div key={pathname} className="flex flex-col min-h-screen relative overflow-hidden">
      {/* Animated background */}
      <div ref={backgroundRef} className="absolute inset-0 -z-10 overflow-hidden">
        <div className="bg-blob absolute top-[10%] left-[5%] w-[500px] h-[500px] rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-[80px]"></div>
        <div className="bg-blob absolute top-[40%] right-[10%] w-[600px] h-[600px] rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 blur-[100px]"></div>
        <div className="bg-blob absolute bottom-[5%] left-[20%] w-[400px] h-[400px] rounded-full bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 blur-[70px]"></div>
      </div>

      {/* Navigation */}
      <header className="border-b border-divider">
        <div className="container max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">PortfolioAI</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#templates" className="text-sm font-medium hover:text-primary transition-colors">
              Templates
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            {user? 
                <div className="flex items-center gap-2">
                   <div className="w-12 h-auto rounded-xl">
              <img className="rounded-xl" src={user.picture} alt="" />
            </div>
            {user.given_name} {` `}
              <LogoutLink>
                <Button color="primary" size="sm">
                  Log out
                </Button>
              </LogoutLink>
              </div>
          :
              <div>
                 <LoginLink>
            <Button variant="light" size="sm">
              Log in
            </Button>
            </LoginLink>
            <RegisterLink>
            <Button color="primary" size="sm">
              Sign up
            </Button>
            </RegisterLink>
              </div>
          }
           
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="flex-1 relative">
        <div className="container max-w-7xl mx-auto flex flex-col items-center justify-center py-20 text-center px-6">
          <div className="hero-badge inline-flex items-center rounded-full border px-4 py-1.5 mb-8 bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-sm">
            <span className="text-sm font-medium">AI-Powered Portfolio Generator</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 leading-tight">
            Create a Stunning Portfolio
            <br />
            in Minutes with AI!
          </h1>
          <p className="hero-description text-lg md:text-xl text-default-500 max-w-2xl mb-10">
            Let AI gather your skills, experience, and projects to generate a complete portfolio that showcases your
            talents and helps you stand out.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg mx-auto sm:items-center">
  <Button
    as={Link}
    href="/create"
    color="primary"
    size="lg"
    className="hero-button w-full sm:w-auto px-6 py-3 text-lg font-semibold shadow-lg transition-all duration-300 hover:scale-105"
    endContent={<ArrowRight className="ml-2 h-5 w-5" />}
  >
    Start Now for Free
  </Button>
  
  <Button
   as={Link}
   href="/templates"
    variant="bordered"
    size="lg"
    className="hero-button w-full sm:w-auto px-6 py-3 text-lg font-semibold border-2 border-gray-300 hover:border-primary-500 hover:text-primary-500 transition-all duration-300"
  >
    See Examples
  </Button>
  
  {/* <Button
  // onPress={}
    as={Link}
    href="/scanresume"
    color="primary"
    // size="lg"
    className="hero-button w-full sm:w-auto px-6 py-3 text-lg font-semibold shadow-lg transition-all duration-300 hover:scale-105"
  >
    Scan Resume
  </Button> */}

    {/* <PdfToTextExtractor/> */}

</div>


          {/* Stats */}
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-20">
            <div className="stat-item flex flex-col items-center">
              <p className="text-3xl font-bold">10,000+</p>
              <p className="text-default-500">Portfolios Created</p>
            </div>
            <div className="stat-item flex flex-col items-center">
              <p className="text-3xl font-bold">15+</p>
              <p className="text-default-500">Professional Templates</p>
            </div>
            <div className="stat-item flex flex-col items-center">
              <p className="text-3xl font-bold">5 min</p>
              <p className="text-default-500">Average Creation Time</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 px-6" id="features">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-default-500 max-w-2xl mx-auto">
              Our AI-powered platform makes creating a professional portfolio simple and fast. Just follow these steps
              to showcase your skills and experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="feature-card">
              <CardBody className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI-Powered Content</h3>
                <p className="text-default-500">
                  Our AI suggests improvements for your bio, achievements, and project descriptions to make your
                  portfolio stand out.
                </p>
              </CardBody>
            </Card>

            <Card className="feature-card">
              <CardBody className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Professional Templates</h3>
                <p className="text-default-500">
                  Choose from a variety of professionally designed templates that showcase your work in the best light.
                </p>
              </CardBody>
            </Card>

            <Card className="feature-card">
              <CardBody className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Comprehensive Sections</h3>
                <p className="text-default-500">
                  Showcase your experience, education, projects, skills, and testimonials in a structured, professional
                  format.
                </p>
              </CardBody>
            </Card>

            <Card className="feature-card">
              <CardBody className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Education & Certifications</h3>
                <p className="text-default-500">
                  Highlight your academic achievements and professional certifications to demonstrate your
                  qualifications.
                </p>
              </CardBody>
            </Card>

            <Card className="feature-card">
              <CardBody className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI Assistant</h3>
                <p className="text-default-500">
                  Get real-time suggestions and improvements from our AI assistant as you build your portfolio.
                </p>
              </CardBody>
            </Card>

            <Card className="feature-card">
              <CardBody className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <ArrowRight className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Easy Sharing</h3>
                <p className="text-default-500">
                  Share your portfolio with a custom link or download as a PDF to send to potential employers.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-20 px-6 bg-gradient-to-r from-purple-500/10 to-blue-500/10">
        <div className="container max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Create Your Portfolio?</h2>
          <p className="text-default-500 max-w-2xl mx-auto mb-8">
            Join thousands of professionals who have created stunning portfolios with our AI-powered platform.
          </p>
          <Button
            as={Link}
            href="/create"
            color="primary"
            size="lg"
            endContent={<ArrowRight className="ml-2 h-4 w-4" />}
          >
            Start Building for Free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-divider py-6">
        <div className="container max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="font-semibold">PortfolioAI</span>
          </div>
          <p className="text-sm text-default-500">© 2025 PortfolioAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

