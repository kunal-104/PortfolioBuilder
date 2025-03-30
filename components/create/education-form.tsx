"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Plus, Trash2, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useContent } from "@/context/ContentContext"

const educationSchema = z.object({
  degree: z.string().min(1, { message: "Degree is required." }),
  institution: z.string().min(1, { message: "Institution name is required." }),
  location: z.string().optional(),
  startYear: z.string().min(1, { message: "Start year is required." }),
  endYear: z.string().optional(),
  current: z.boolean().optional(),
  description: z.string().optional(),
})

const formSchema = z.object({
  educations: z.array(educationSchema).min(0),
})

export default function EducationForm({ data, onNext }) {

  const { setStep4Data } = useContent()

  const [editingIndex, setEditingIndex] = useState<number | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      educations: data?.education || [],
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form 4 submitted:", values.educations);
    setStep4Data(values.educations)
    onNext({ education: values.educations })
  }

  const addEducation = () => {
    const newEducation = {
      degree: "",
      institution: "",
      location: "",
      startYear: "",
      endYear: "",
      current: false,
      description: "",
    }

    const currentEducations = form.getValues("educations") || []
    form.setValue("educations", [...currentEducations, newEducation])
    setEditingIndex(currentEducations.length)
  }

  const removeEducation = (index: number) => {
    const currentEducations = form.getValues("educations") || []
    form.setValue(
      "educations",
      currentEducations.filter((_, i) => i !== index),
    )
    if (editingIndex === index) {
      setEditingIndex(null)
    } else if (editingIndex !== null && editingIndex > index) {
      setEditingIndex(editingIndex - 1)
    }
  }

  const handleCurrentEducationChange = (index: number, checked: boolean) => {
    const currentEducations = form.getValues("educations")
    const updatedEducations = [...currentEducations]

    updatedEducations[index] = {
      ...updatedEducations[index],
      current: checked,
      endYear: checked ? "" : updatedEducations[index].endYear,
    }

    form.setValue("educations", updatedEducations)
  }

  return (
    <Form {...form}>
      <form id="form-step-4" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <h2 className="text-lg font-medium">Education</h2>

        {form.getValues("educations")?.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="pt-6 flex flex-col items-center justify-center text-center p-10">
              <GraduationCap className="h-10 w-10 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No education added yet</h3>
              <p className="text-muted-foreground mb-4">
                Add your educational background to showcase your qualifications.
              </p>
              <Button type="button" onClick={addEducation}>
                <Plus className="mr-2 h-4 w-4" />
                Add Education
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
              {form.getValues("educations")?.map((education, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg">
                  <AccordionTrigger className="px-4 py-2 hover:no-underline">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <GraduationCap className="h-5 w-5 mr-2 text-muted-foreground" />
                        <div className="text-left">
                          <h3 className="font-medium">{education.degree || "New Degree"}</h3>
                          <p className="text-sm text-muted-foreground">
                            {education.institution
                              ? `${education.institution}${education.location ? `, ${education.location}` : ""}`
                              : "Institution details"}
                          </p>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {education.startYear && (
                          <>
                            {education.startYear} - {education.current ? "Present" : education.endYear}
                          </>
                        )}
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <FormField
                        control={form.control}
                        name={`educations.${index}.degree`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Degree/Certificate</FormLabel>
                            <FormControl>
                              <Input placeholder="B.S. Computer Science" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`educations.${index}.institution`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Institution</FormLabel>
                            <FormControl>
                              <Input placeholder="University of California" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`educations.${index}.location`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="Berkeley, CA" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`educations.${index}.startYear`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Start Year</FormLabel>
                              <FormControl>
                                <Input placeholder="2018" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {!education.current && (
                          <FormField
                            control={form.control}
                            name={`educations.${index}.endYear`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>End Year</FormLabel>
                                <FormControl>
                                  <Input placeholder="2022" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                      </div>
                    </div>

                    <FormField
                      control={form.control}
                      name={`educations.${index}.description`}
                      render={({ field }) => (
                        <FormItem className="mb-6">
                          <FormLabel>Description (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe your studies, achievements, or relevant coursework..."
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-end mt-6">
                      <Button type="button" variant="destructive" size="sm" onClick={() => removeEducation(index)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remove Education
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <Button type="button" variant="outline" className="w-full" onClick={addEducation}>
              <Plus className="mr-2 h-4 w-4" />
              Add Another Education
            </Button>
          </div>
        )}
      </form>
    </Form>
  )
}

