"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Plus, Trash2, Briefcase, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useContent } from "@/context/ContentContext"

const experienceSchema = z.object({
  title: z.string().min(1, { message: "Job title is required." }),
  company: z.string().min(1, { message: "Company name is required." }),
  location: z.string().optional(),
  startDate: z.string().min(1, { message: "Start date is required." }),
  endDate: z.string().optional(),
  current: z.boolean().optional(),
  description: z.string().min(1, { message: "Job description is required." }),
  achievements: z.array(z.string()).optional(),
})

const formSchema = z.object({
  experiences: z.array(experienceSchema).min(0),
})

export default function WorkExperienceForm({ data, onNext }) {

  const { setStep3Data } = useContent()

  const [newAchievement, setNewAchievement] = useState("")
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [formdata, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
    achievements: [],
  })
   

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      experiences: data?.workExperience || [],
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form 3 submitted:", values.experiences);
    setStep3Data(values.experiences);
    onNext({ workExperience: values.experiences })
  }

  const addExperience = () => {
    const newExperience = {
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      achievements: [],
    }

    const currentExperiences = form.getValues("experiences") || []
    form.setValue("experiences", [...currentExperiences, newExperience])
    setEditingIndex(currentExperiences.length)
  }

  const removeExperience = (index: number) => {
    const currentExperiences = form.getValues("experiences") || []
    form.setValue(
      "experiences",
      currentExperiences.filter((_, i) => i !== index),
    )
    if (editingIndex === index) {
      setEditingIndex(null)
    } else if (editingIndex !== null && editingIndex > index) {
      setEditingIndex(editingIndex - 1)
    }
  }

  const addAchievement = (index: number) => {
    if (newAchievement.trim()) {
      const currentExperiences = form.getValues("experiences")
      const currentAchievements = currentExperiences[index].achievements || []

      const updatedExperiences = [...currentExperiences]
      updatedExperiences[index] = {
        ...updatedExperiences[index],
        achievements: [...currentAchievements, newAchievement],
      }

      form.setValue("experiences", updatedExperiences)
      setNewAchievement("")
    }
  }

  const removeAchievement = (expIndex: number, achievementIndex: number) => {
    const currentExperiences = form.getValues("experiences")
    const currentAchievements = currentExperiences[expIndex].achievements || []

    const updatedExperiences = [...currentExperiences]
    updatedExperiences[expIndex] = {
      ...updatedExperiences[expIndex],
      achievements: currentAchievements.filter((_, i) => i !== achievementIndex),
    }

    form.setValue("experiences", updatedExperiences)
  }

  const handleCurrentJobChange = (index: number, checked: boolean) => {
    const currentExperiences = form.getValues("experiences")
    const updatedExperiences = [...currentExperiences]

    updatedExperiences[index] = {
      ...updatedExperiences[index],
      current: checked,
      endDate: checked ? "" : updatedExperiences[index].endDate,
    }

    form.setValue("experiences", updatedExperiences)
  }

  return (
    <Form {...form}>
      <form id="form-step-3" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">Work Experience</h2>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              // In a real app, this would call an AI service to suggest achievements
              const currentExperiences = form.getValues("experiences")
              if (currentExperiences.length > 0 && editingIndex !== null) {
                const updatedExperiences = [...currentExperiences]
                const jobTitle = updatedExperiences[editingIndex].title

                if (jobTitle.toLowerCase().includes("developer")) {
                  updatedExperiences[editingIndex] = {
                    ...updatedExperiences[editingIndex],
                    achievements: [
                      ...(updatedExperiences[editingIndex].achievements || []),
                      "Improved application performance by 40% through code optimization",
                      "Implemented CI/CD pipeline reducing deployment time by 50%",
                      "Collaborated with design team to improve UI/UX, resulting in 25% increase in user engagement",
                    ],
                  }

                  form.setValue("experiences", updatedExperiences)
                }
              }
            }}
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Suggest Achievements
          </Button>
        </div>

        {form.getValues("experiences")?.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="pt-6 flex flex-col items-center justify-center text-center p-10">
              <Briefcase className="h-10 w-10 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No work experience added yet</h3>
              <p className="text-muted-foreground mb-4">
                Add your work history to showcase your professional experience.
              </p>
              <Button type="button" onClick={addExperience}>
                <Plus className="mr-2 h-4 w-4" />
                Add Work Experience
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
              {form.getValues("experiences")?.map((experience, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg">
                  <AccordionTrigger className="px-4 py-2 hover:no-underline">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <Briefcase className="h-5 w-5 mr-2 text-muted-foreground" />
                        <div className="text-left">
                          <h3 className="font-medium">{experience.title || "New Position"}</h3>
                          <p className="text-sm text-muted-foreground">
                            {experience.company
                              ? `${experience.company}${experience.location ? `, ${experience.location}` : ""}`
                              : "Company details"}
                          </p>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {experience.startDate && (
                          <>
                            {experience.startDate} - {experience.current ? "Present" : experience.endDate}
                          </>
                        )}
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <FormField
                        control={form.control}
                        name={`experiences.${index}.title`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Job Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Software Developer" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`experiences.${index}.company`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company</FormLabel>
                            <FormControl>
                              <Input placeholder="Acme Inc." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`experiences.${index}.location`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="San Francisco, CA" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`experiences.${index}.startDate`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Start Date</FormLabel>
                              <FormControl>
                                <Input placeholder="Jan 2020" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {!experience.current && (
                          <FormField
                            control={form.control}
                            name={`experiences.${index}.endDate`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>End Date</FormLabel>
                                <FormControl>
                                  <Input placeholder="Dec 2022" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                      </div>

                      <FormField
                        control={form.control}
                        name={`experiences.${index}.current`}
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={(checked) => {
                                  field.onChange(checked)
                                  handleCurrentJobChange(index, checked as boolean)
                                }}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>I currently work here</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name={`experiences.${index}.description`}
                      render={({ field }) => (
                        <FormItem className="mb-6">
                          <FormLabel>Job Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe your responsibilities and role..."
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="space-y-4">
                      <FormLabel>Key Achievements</FormLabel>
                      <div className="flex gap-3">
                        <Input
                          placeholder="Add an achievement or accomplishment"
                          value={newAchievement}
                          onChange={(e) => setNewAchievement(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && newAchievement.trim()) {
                              e.preventDefault()
                              addAchievement(index)
                            }
                          }}
                        />
                        <Button type="button" onClick={() => addAchievement(index)}>
                          <Plus className="h-4 w-4" />
                          <span className="sr-only">Add Achievement</span>
                        </Button>
                      </div>

                      <div className="space-y-2">
                        {experience.achievements?.length === 0 ? (
                          <p className="text-sm text-muted-foreground">
                            No achievements added yet. Add specific accomplishments to highlight your impact.
                          </p>
                        ) : (
                          <ul className="space-y-2">
                            {experience.achievements?.map((achievement, achievementIndex) => (
                              <li key={achievementIndex} className="flex items-start gap-2">
                                <div className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                                <div className="flex-1">{achievement}</div>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeAchievement(index, achievementIndex)}
                                  className="h-8 w-8 p-0 text-muted-foreground"
                                >
                                  <Trash2 className="h-4 w-4" />
                                  <span className="sr-only">Remove</span>
                                </Button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-end mt-6">
                      <Button type="button" variant="destructive" size="sm" onClick={() => removeExperience(index)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remove Experience
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <Button type="button" variant="outline" className="w-full" onClick={addExperience}>
              <Plus className="mr-2 h-4 w-4" />
              Add Another Experience
            </Button>
          </div>
        )}
      </form>
    </Form>
  )
}

