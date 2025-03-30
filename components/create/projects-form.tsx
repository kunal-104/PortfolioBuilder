"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Plus, Trash2, Code, Upload, X, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { useContent } from "@/context/ContentContext"

const projectSchema = z.object({
  name: z.string().min(1, { message: "Project name is required." }),
  description: z.string().min(1, { message: "Project description is required." }),
  technologies: z.array(z.string()).min(1, { message: "Add at least one technology." }),
  image: z.string().optional(),
  link: z.string().url().optional().or(z.literal("")),
  githubLink: z.string().url().optional().or(z.literal("")),
})

const formSchema = z.object({
  projects: z.array(projectSchema).min(0),
})

export default function ProjectsForm({ data, onNext }) {

  const { setStep5Data } = useContent()
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [newTechnology, setNewTechnology] = useState("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projects: data?.projects || [],
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form 5 submitted:", values.projects);
    setStep5Data(values.projects)
    onNext({ projects: values.projects })
  }

  const addProject = () => {
    const newProject = {
      name: "",
      description: "",
      technologies: [],
      image: "",
      link: "",
      githubLink: "",
    }

    const currentProjects = form.getValues("projects") || []
    form.setValue("projects", [...currentProjects, newProject])
    setEditingIndex(currentProjects.length)
  }

  const removeProject = (index: number) => {
    const currentProjects = form.getValues("projects") || []
    form.setValue(
      "projects",
      currentProjects.filter((_, i) => i !== index),
    )
    if (editingIndex === index) {
      setEditingIndex(null)
    } else if (editingIndex !== null && editingIndex > index) {
      setEditingIndex(editingIndex - 1)
    }
  }

  const addTechnology = (index: number) => {
    if (newTechnology.trim()) {
      const currentProjects = form.getValues("projects")
      const currentTechnologies = currentProjects[index].technologies || []

      const updatedProjects = [...currentProjects]
      updatedProjects[index] = {
        ...updatedProjects[index],
        technologies: [...currentTechnologies, newTechnology],
      }

      form.setValue("projects", updatedProjects)
      setNewTechnology("")
    }
  }

  const removeTechnology = (projectIndex: number, techIndex: number) => {
    const currentProjects = form.getValues("projects")
    const currentTechnologies = currentProjects[projectIndex].technologies || []

    const updatedProjects = [...currentProjects]
    updatedProjects[projectIndex] = {
      ...updatedProjects[projectIndex],
      technologies: currentTechnologies.filter((_, i) => i !== techIndex),
    }

    form.setValue("projects", updatedProjects)
  }

  const handleImageUpload = (index: number) => {
    // In a real app, you would upload this to a server and get a URL back
    // For this demo, we'll just use a placeholder
    const currentProjects = form.getValues("projects")
    const updatedProjects = [...currentProjects]
    updatedProjects[index] = {
      ...updatedProjects[index],
      image: "/placeholder.svg?height=300&width=500",
    }

    form.setValue("projects", updatedProjects)
  }

  return (
    <Form {...form}>
      <form id="form-step-5" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <h2 className="text-lg font-medium">Projects & Portfolio Work</h2>

        {form.getValues("projects")?.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="pt-6 flex flex-col items-center justify-center text-center p-10">
              <Code className="h-10 w-10 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No projects added yet</h3>
              <p className="text-muted-foreground mb-4">
                Add your projects to showcase your skills and accomplishments.
              </p>
              <Button type="button" onClick={addProject}>
                <Plus className="mr-2 h-4 w-4" />
                Add Project
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            <Accordion
              type="single"
              collapsible
              value={editingIndex !== null ? `item-${editingIndex}` : undefined}
              onValueChange={(value) => {
                const index = value ? Number.parseInt(value.replace("item-", "")) : null
                setEditingIndex(index)
              }}
            >
              {form.getValues("projects")?.map((project, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg">
                  <AccordionTrigger className="px-4 py-2 hover:no-underline">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <Code className="h-5 w-5 mr-2 text-muted-foreground" />
                        <div className="text-left">
                          <h3 className="font-medium">{project.name || "New Project"}</h3>
                          <p className="text-sm text-muted-foreground">
                            {project.technologies?.length > 0
                              ? project.technologies.slice(0, 3).join(", ") +
                                (project.technologies.length > 3 ? "..." : "")
                              : "No technologies added"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="md:col-span-2">
                        <FormField
                          control={form.control}
                          name={`projects.${index}.name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Project Name</FormLabel>
                              <FormControl>
                                <Input placeholder="E-commerce Platform" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name={`projects.${index}.link`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project URL (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="https://example.com/project" {...field} />
                            </FormControl>
                            <FormDescription>Link to the live project or demo</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`projects.${index}.githubLink`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>GitHub URL (Optional)</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Github className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input className="pl-10" placeholder="https://github.com/username/project" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name={`projects.${index}.description`}
                      render={({ field }) => (
                        <FormItem className="mb-6">
                          <FormLabel>Project Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe the project, your role, and the technologies used..."
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="space-y-4 mb-6">
                      <FormLabel>Technologies Used</FormLabel>
                      <div className="flex gap-3">
                        <Input
                          placeholder="Add a technology (e.g., React, Node.js)"
                          value={newTechnology}
                          onChange={(e) => setNewTechnology(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && newTechnology.trim()) {
                              e.preventDefault()
                              addTechnology(index)
                            }
                          }}
                        />
                        <Button type="button" onClick={() => addTechnology(index)}>
                          <Plus className="h-4 w-4" />
                          <span className="sr-only">Add Technology</span>
                        </Button>
                      </div>

                      <div>
                        {project.technologies?.length === 0 ? (
                          <p className="text-sm text-muted-foreground">
                            No technologies added yet. Add the technologies used in this project.
                          </p>
                        ) : (
                          <div className="flex flex-wrap gap-2">
                            {project.technologies?.map((tech, techIndex) => (
                              <Badge
                                key={techIndex}
                                variant="secondary"
                                className="px-3 py-1.5 text-sm flex items-center gap-2"
                              >
                                {tech}
                                <button
                                  type="button"
                                  onClick={() => removeTechnology(index, techIndex)}
                                  className="ml-1 text-muted-foreground hover:text-foreground"
                                >
                                  <X className="h-3 w-3" />
                                  <span className="sr-only">Remove</span>
                                </button>
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mb-6">
                      <FormLabel>Project Image</FormLabel>
                      <div className="mt-2">
                        {project.image ? (
                          <div className="relative">
                            <img
                              src={project.image || "/placeholder.svg"}
                              alt={project.name || "Project"}
                              className="w-full h-48 object-cover rounded-md"
                            />
                            <Button
                              type="button"
                              variant="secondary"
                              size="sm"
                              className="absolute top-2 right-2"
                              onClick={() => handleImageUpload(index)}
                            >
                              <Upload className="mr-2 h-4 w-4" />
                              Change Image
                            </Button>
                          </div>
                        ) : (
                          <div
                            className="border-2 border-dashed rounded-md p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                            onClick={() => handleImageUpload(index)}
                          >
                            <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                            <p className="text-sm font-medium">Click to upload project image</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              PNG, JPG or GIF (Recommended: 1200x630px)
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-end mt-6">
                      <Button type="button" variant="destructive" size="sm" onClick={() => removeProject(index)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remove Project
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <Button type="button" variant="outline" className="w-full" onClick={addProject}>
              <Plus className="mr-2 h-4 w-4" />
              Add Another Project
            </Button>
          </div>
        )}
      </form>
    </Form>
  )
}

