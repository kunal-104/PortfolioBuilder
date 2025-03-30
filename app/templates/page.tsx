"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Card, CardBody, CardFooter, Button, Chip, Divider } from "@nextui-org/react"
import { ChevronRight, ArrowLeft } from "lucide-react"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Template data
const templates = [
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean and simple design focused on content",
    tags: ["Minimalist", "Light", "Fast"],
    badge: "Popular",
    image: "/placeholder.svg?height=450&width=800",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Bold design for artists and designers",
    tags: ["Colorful", "Interactive", "Animated"],
    badge: "New",
    image: "/placeholder.svg?height=450&width=800",
  },
  {
    id: "professional",
    name: "Professional",
    description: "Corporate style for business professionals",
    tags: ["Corporate", "Structured", "Formal"],
    image: "/placeholder.svg?height=450&width=800",
  },
  {
    id: "developer",
    name: "Developer",
    description: "Tech-focused layout for software engineers",
    tags: ["Code-friendly", "Dark Mode", "Technical"],
    image: "/placeholder.svg?height=450&width=800",
  },
  {
    id: "photographer",
    name: "Photographer",
    description: "Image-focused layout for visual portfolios",
    tags: ["Gallery", "Visual", "Fullscreen"],
    image: "/placeholder.svg?height=450&width=800",
  },
  {
    id: "freelancer",
    name: "Freelancer",
    description: "Versatile design for independent professionals",
    tags: ["Services", "Pricing", "Contact"],
    image: "/placeholder.svg?height=450&width=800",
  },
]

// Categories
const categories = [
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean and simple designs",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Artistic and unique layouts",
  },
  {
    id: "professional",
    name: "Professional",
    description: "Business-oriented templates",
  },
  {
    id: "technical",
    name: "Technical",
    description: "Developer-focused designs",
  },
]

export default function TemplatesPage() {
  const headerRef = useRef(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const categoriesRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    // Add a small delay to ensure DOM is fully rendered before animations start
    const initAnimations = setTimeout(() => {
      ScrollTrigger.refresh(true);
  
      // Header animation
      gsap.from(headerRef.current, {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
  
      // Staggered card animations - with null check
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".template-card");
        gsap.from(cards, {
          y: 100,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top bottom-=100",
          },
        });
      }
  
      // Categories animation - with null check
      if (categoriesRef.current) {
        gsap.from(categoriesRef.current, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: categoriesRef.current,
            start: "top bottom-=100",
          },
        });
      }
  
      // CTA animation - with null check
      if (ctaRef.current) {
        gsap.from(ctaRef.current, {
          scale: 0.9,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top bottom-=100",
          },
        });
      }
    }, 200); // 200ms delay to ensure DOM is ready
  
    return () => {
      // Clear the timeout
      clearTimeout(initAnimations);
  
      // Kill all animations
      gsap.killTweensOf("*");
  
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
  

  return (
    <div className="container mx-auto py-16 px-4 sm:px-6">

        {/* Go to Home Button */}
  <Link href="/" className="absolute top-4 left-4 flex items-center text-purple-700 hover:text-purple-900">
    <ArrowLeft className="w-6 h-6 mr-1" />
    <span className="text-lg font-medium">Home</span>
  </Link>

      <div ref={headerRef} className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-700 mb-4">
          Portfolio Templates
        </h1>
        <p className="mx-auto max-w-[700px] text-xl text-gray-600 md:text-2xl">
          Choose from our collection of professionally designed templates to showcase your work.
        </p>
      </div>

      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {templates.map((template) => (
          <Card
            key={template.id}
            className="template-card overflow-hidden hover:shadow-xl transition-shadow duration-300"
            isPressable
            onPress={() => (window.location.href = `/templates/${template.id}`)}
          >
            <div className="relative">
              <Image
                src={template.image || "/placeholder.svg"}
                alt={`${template.name} template preview`}
                width={800}
                height={450}
                className="object-cover w-full aspect-[16/9]"
              />
              {template.badge && (
                <Chip
                  color={template.badge === "New" ? "secondary" : "primary"}
                  className="absolute top-3 right-3 bg-purple-500 text-white"
                >
                  {template.badge}
                </Chip>
              )}
            </div>
            <CardBody className="p-5">
              <h2 className="text-2xl font-bold text-purple-700">{template.name}</h2>
              <p className="text-gray-600 mt-1">{template.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {template.tags.map((tag, index) => (
                  <Chip key={index} variant="flat" color="secondary" className="bg-purple-100 text-purple-700">
                    {tag}
                  </Chip>
                ))}
              </div>
            </CardBody>
            <Divider />
            <CardFooter>
              <Button
                as={Link}
                href={`/templates/${template.id}`}
                color="secondary"
                variant="flat"
                className="w-full bg-purple-100 text-purple-700 hover:bg-purple-200"
                endContent={<ChevronRight className="h-4 w-4" />}
              >
                Use Template
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div ref={categoriesRef} className="mt-24">
        <h2 className="text-3xl font-bold text-purple-700 mb-8">Template Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Button
              key={category.id}
              as={Link}
              href={`/templates/category/${category.id}`}
              variant="flat"
              className="h-auto py-6 px-4 flex-col items-start justify-start bg-purple-50 hover:bg-purple-100 text-left"
            >
              <span className="text-lg font-medium text-purple-700">{category.name}</span>
              <span className="text-sm text-gray-600">{category.description}</span>
            </Button>
          ))}
        </div>
      </div>

      <div ref={ctaRef} className="mt-24 bg-gradient-to-r from-purple-100 to-purple-200 rounded-xl p-10">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-purple-800">Can't find what you're looking for?</h2>
          <p className="text-purple-700 max-w-2xl mx-auto">
            We can help you create a custom template that perfectly matches your needs and style.
          </p>
          <Button
            // as={Link}
            // href="/custom-template"
            color="secondary"
            size="lg"
            className="mt-4 bg-purple-600 text-white hover:bg-purple-700"
          >
            Request Custom Template
          </Button>
        </div>
      </div>
    </div>
  )
}

