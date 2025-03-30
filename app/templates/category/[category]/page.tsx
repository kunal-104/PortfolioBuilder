import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Category data - in a real app, this would come from a database or API
const categories = {
  minimal: {
    name: "Minimal",
    description: "Clean and simple designs that focus on content",
    templates: ["minimal", "developer"],
  },
  creative: {
    name: "Creative",
    description: "Bold and artistic designs for creatives",
    templates: ["creative", "photographer"],
  },
  professional: {
    name: "Professional",
    description: "Business-oriented templates for professionals",
    templates: ["professional", "freelancer"],
  },
  technical: {
    name: "Technical",
    description: "Developer-focused designs with technical features",
    templates: ["developer"],
  },
}

// Template data - in a real app, this would come from a database or API
const templates = {
  minimal: {
    name: "Minimal",
    description: "Clean and simple design focused on content",
    tags: ["Minimalist", "Light", "Fast"],
    image: "/placeholder.svg?height=450&width=800",
  },
  creative: {
    name: "Creative",
    description: "Bold design for artists and designers",
    tags: ["Colorful", "Interactive", "Animated"],
    image: "/placeholder.svg?height=450&width=800",
  },
  professional: {
    name: "Professional",
    description: "Corporate style for business professionals",
    tags: ["Corporate", "Structured", "Formal"],
    image: "/placeholder.svg?height=450&width=800",
  },
  developer: {
    name: "Developer",
    description: "Tech-focused layout for software engineers",
    tags: ["Code-friendly", "Dark Mode", "Technical"],
    image: "/placeholder.svg?height=450&width=800",
  },
  photographer: {
    name: "Photographer",
    description: "Image-focused layout for visual portfolios",
    tags: ["Gallery", "Visual", "Fullscreen"],
    image: "/placeholder.svg?height=450&width=800",
  },
  freelancer: {
    name: "Freelancer",
    description: "Versatile design for independent professionals",
    tags: ["Services", "Pricing", "Contact"],
    image: "/placeholder.svg?height=450&width=800",
  },
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const { category } = params
  const categoryData = categories[category as keyof typeof categories]

  // Fallback if category doesn't exist
  if (!categoryData) {
    return (
      <div className="container py-10 text-center">
        <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
        <p className="mb-6">Sorry, the category you're looking for doesn't exist.</p>
        <Button asChild>
          <Link href="/templates">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Templates
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/templates">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Templates
          </Link>
        </Button>
      </div>

      <div className="space-y-6 mb-10">
        <h1 className="text-3xl font-bold">{categoryData.name} Templates</h1>
        <p className="text-muted-foreground max-w-3xl">{categoryData.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryData.templates.map((templateId) => {
          const template = templates[templateId as keyof typeof templates]
          return (
            <Card key={templateId} className="overflow-hidden">
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={template.image || "/placeholder.svg"}
                  alt={`${template.name} template preview`}
                  width={800}
                  height={450}
                  className="object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle>{template.name}</CardTitle>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {template.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/templates/${templateId}`}>
                    Use Template <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>

      {categoryData.templates.length === 0 && (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium mb-2">No templates found</h2>
          <p className="text-muted-foreground mb-6">There are currently no templates in this category.</p>
          <Button asChild>
            <Link href="/templates">View All Templates</Link>
          </Button>
        </div>
      )}

      <div className="mt-16 bg-muted rounded-lg p-8">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Looking for something specific?</h2>
          <p className="text-muted-foreground">
            We're constantly adding new templates to our collection. Let us know what you're looking for!
          </p>
          <Button size="lg" asChild>
            <Link href="/request-template">Request a Template</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

