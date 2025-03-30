"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Card, CardBody, Button, Chip, Tabs, Tab } from "@nextui-org/react"
import { ArrowLeft, Download, Eye } from "lucide-react"
import { use } from "react";
// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Template data - in a real app, this would come from a database or API
const templates = {
  minimal: {
    name: "Minimal",
    description: "A clean and simple design focused on content with minimal distractions.",
    features: [
      "Clean typography",
      "Whitespace-focused layout",
      "Fast loading times",
      "Mobile-first design",
      "Subtle animations",
    ],
    techStack: ["React", "Next.js", "Tailwind CSS"],
    demoUrl: "#",
    previewImage: "/placeholder.svg?height=600&width=800",
  },
  creative: {
    name: "Creative",
    description: "A bold and artistic design for creatives who want to stand out.",
    features: ["Unique layout", "Interactive elements", "Custom animations", "Bold typography", "Fullscreen sections"],
    techStack: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
    demoUrl: "#",
    previewImage: "/placeholder.svg?height=600&width=800",
  },
  professional: {
    name: "Professional",
    description: "A corporate style for business professionals and consultants.",
    features: [
      "Structured layout",
      "Formal design elements",
      "Business-focused sections",
      "Contact forms",
      "Testimonial displays",
    ],
    techStack: ["React", "Next.js", "Tailwind CSS"],
    demoUrl: "#",
    previewImage: "/placeholder.svg?height=600&width=800",
  },
  developer: {
    name: "Developer",
    description: "A tech-focused layout for software engineers and developers.",
    features: [
      "Code snippet displays",
      "GitHub integration",
      "Dark mode by default",
      "Technical project showcase",
      "Skills visualization",
    ],
    techStack: ["React", "Next.js", "Tailwind CSS", "Syntax highlighting"],
    demoUrl: "#",
    previewImage: "/placeholder.svg?height=600&width=800",
  },
  photographer: {
    name: "Photographer",
    description: "An image-focused layout for photographers and visual artists.",
    features: ["Fullscreen galleries", "Masonry layouts", "Image lightbox", "Minimal UI", "Fast image loading"],
    techStack: ["React", "Next.js", "Tailwind CSS", "Image optimization"],
    demoUrl: "#",
    previewImage: "/placeholder.svg?height=600&width=800",
  },
  freelancer: {
    name: "Freelancer",
    description: "A versatile design for independent professionals and freelancers.",
    features: ["Services section", "Pricing tables", "Client testimonials", "Contact form", "Project showcase"],
    techStack: ["React", "Next.js", "Tailwind CSS", "Form handling"],
    demoUrl: "#",
    previewImage: "/placeholder.svg?height=600&width=800",
  },
}

export default function TemplatePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params); // Unwrapping the Promise

  const template = templates[slug as keyof typeof templates];
  

  const headerRef = useRef(null)
  const previewRef = useRef(null)
  const infoRef = useRef(null)
  const tabsRef = useRef(null)

  useEffect(() => {
    const timeout = setTimeout(() => {
      // Header animation
      gsap.from(headerRef.current, {
        y: -30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      // Preview animation
      gsap.from(previewRef.current, {
        x: -50,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
      });

      // Info animation
      gsap.from(infoRef.current, {
        x: 50,
        opacity: 0,
        duration: 1,
        delay: 0.4,
        ease: "power3.out",
      });

      // Tabs animation
      gsap.from(tabsRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: 0.6,
        ease: "power3.out",
      });

      // Hover animations for cards
      gsap.utils.toArray(".preview-card").forEach((card: any) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -10,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });
    }, 200); // 200ms delay

    // Cleanup function
    return () => {
      clearTimeout(timeout); // Clear timeout if the component unmounts
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Fallback if template doesn't exist
  if (!template) {
    return (
      <div className="container mx-auto py-10 text-center">
        <h1 className="text-3xl font-bold mb-4 text-purple-700">Template Not Found</h1>
        <p className="mb-6 text-gray-600">Sorry, the template you're looking for doesn't exist.</p>
        <Button
          as={Link}
          href="/templates"
          color="secondary"
          variant="flat"
          startContent={<ArrowLeft className="h-4 w-4" />}
          className="bg-purple-100 text-purple-700"
        >
          Back to Templates
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6">
      <div ref={headerRef} className="mb-8">
        <Button
          as={Link}
          href="/templates"
          variant="light"
          color="secondary"
          startContent={<ArrowLeft className="h-4 w-4" />}
          className="text-purple-700"
        >
          Back to Templates
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        <div ref={previewRef} className="lg:col-span-2">
          <div className="relative aspect-video overflow-hidden rounded-xl border border-purple-200 shadow-lg">
            <Image
              src={template.previewImage || "/placeholder.svg"}
              alt={`${template.name} template preview`}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-purple-900/60 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button
                as={Link}
                href={template.demoUrl}
                target="_blank"
                color="secondary"
                variant="solid"
                startContent={<Eye className="h-4 w-4" />}
                className="bg-white text-purple-700"
              >
                View Demo
              </Button>
            </div>
          </div>
        </div>

        <div ref={infoRef} className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-purple-700">{template.name} Template</h1>
            <p className="text-gray-600 mt-2">{template.description}</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-purple-700">Features</h2>
            <ul className="space-y-2">
              {template.features.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <div className="mr-2 h-2 w-2 rounded-full bg-purple-500"></div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-purple-700">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {template.techStack.map((tech, index) => (
                <Chip key={index} variant="flat" color="secondary" className="bg-purple-100 text-purple-700">
                  {tech}
                </Chip>
              ))}
            </div>
          </div>

          <Button
            color="secondary"
            size="lg"
            className="w-full bg-purple-600 text-white"
            startContent={<Download className="h-4 w-4" />}
          >
            Use This Template
          </Button>
        </div>
      </div>

      <div ref={tabsRef}>
        <Tabs
          aria-label="Template options"
          color="secondary"
          variant="underlined"
          classNames={{
            tab: "text-purple-700",
            tabList: "border-b border-purple-200",
            cursor: "bg-purple-500",
            panel: "py-6",
          }}
        >
          <Tab key="preview" title="Preview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="preview-card shadow-md">
                <CardBody className="p-0">
                  <Image
                    src="/placeholder.svg?height=300&width=400"
                    alt="Desktop preview"
                    width={400}
                    height={300}
                    className="rounded-t-lg"
                  />
                  <div className="p-4">
                    <h3 className="font-medium text-purple-700">Desktop View</h3>
                    <p className="text-sm text-gray-600">1920 x 1080</p>
                  </div>
                </CardBody>
              </Card>
              <Card className="preview-card shadow-md">
                <CardBody className="p-0">
                  <Image
                    src="/placeholder.svg?height=300&width=400"
                    alt="Tablet preview"
                    width={400}
                    height={300}
                    className="rounded-t-lg"
                  />
                  <div className="p-4">
                    <h3 className="font-medium text-purple-700">Tablet View</h3>
                    <p className="text-sm text-gray-600">768 x 1024</p>
                  </div>
                </CardBody>
              </Card>
              <Card className="preview-card shadow-md">
                <CardBody className="p-0">
                  <Image
                    src="/placeholder.svg?height=300&width=400"
                    alt="Mobile preview"
                    width={400}
                    height={300}
                    className="rounded-t-lg"
                  />
                  <div className="p-4">
                    <h3 className="font-medium text-purple-700">Mobile View</h3>
                    <p className="text-sm text-gray-600">375 x 667</p>
                  </div>
                </CardBody>
              </Card>
            </div>
          </Tab>
          <Tab key="customization" title="Customization">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-purple-700 mb-4">Customization Options</h2>
                <p className="text-gray-700">
                  This template can be customized in various ways to match your personal brand and preferences:
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="font-medium text-purple-700">Colors</h3>
                  <p className="text-sm text-gray-600">Customize the color scheme to match your brand identity.</p>
                  <div className="flex gap-2 mt-2">
                    <div className="w-8 h-8 rounded-full bg-purple-500"></div>
                    <div className="w-8 h-8 rounded-full bg-purple-300"></div>
                    <div className="w-8 h-8 rounded-full bg-purple-700"></div>
                    <div className="w-8 h-8 rounded-full bg-purple-100"></div>
                    <div className="w-8 h-8 rounded-full bg-purple-900"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium text-purple-700">Typography</h3>
                  <p className="text-sm text-gray-600">
                    Choose from a selection of font pairings for headings and body text.
                  </p>
                  <div className="flex flex-col gap-2 mt-2">
                    <div className="text-lg font-serif text-purple-700">Serif Heading</div>
                    <div className="text-lg font-sans text-purple-700">Sans-serif Heading</div>
                    <div className="text-lg font-mono text-purple-700">Monospace Heading</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium text-purple-700">Layout</h3>
                  <p className="text-sm text-gray-600">
                    Adjust the layout structure to highlight your most important content.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium text-purple-700">Components</h3>
                  <p className="text-sm text-gray-600">Add or remove components to create your perfect portfolio.</p>
                </div>
              </div>
            </div>
          </Tab>
          <Tab key="examples" title="Examples">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-purple-700 mb-4">Example Sites Using This Template</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="preview-card shadow-md">
                  <CardBody className="p-0">
                    <Image
                      src="/placeholder.svg?height=300&width=500"
                      alt="Example site 1"
                      width={500}
                      height={300}
                      className="rounded-t-lg"
                    />
                    <div className="p-4">
                      <h3 className="font-medium text-purple-700">Jane Smith Portfolio</h3>
                      <p className="text-sm text-gray-600 mb-2">UX Designer</p>
                      <Button
                        as={Link}
                        href="#"
                        target="_blank"
                        variant="flat"
                        color="secondary"
                        size="sm"
                        className="bg-purple-100 text-purple-700"
                      >
                        Visit Site
                      </Button>
                    </div>
                  </CardBody>
                </Card>
                <Card className="preview-card shadow-md">
                  <CardBody className="p-0">
                    <Image
                      src="/placeholder.svg?height=300&width=500"
                      alt="Example site 2"
                      width={500}
                      height={300}
                      className="rounded-t-lg"
                    />
                    <div className="p-4">
                      <h3 className="font-medium text-purple-700">John Doe Portfolio</h3>
                      <p className="text-sm text-gray-600 mb-2">Frontend Developer</p>
                      <Button
                        as={Link}
                        href="#"
                        target="_blank"
                        variant="flat"
                        color="secondary"
                        size="sm"
                        className="bg-purple-100 text-purple-700"
                      >
                        Visit Site
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}

