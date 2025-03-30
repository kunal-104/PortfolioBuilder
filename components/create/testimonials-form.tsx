"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Plus, Trash2, Award, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useContent } from "@/context/ContentContext"
const testimonialSchema = z.object({
  text: z.string().min(10, { message: "Testimonial text is required." }),
  author: z.string().min(1, { message: "Author name is required." }),
  position: z.string().optional(),
  company: z.string().optional(),
})

const referenceSchema = z.object({
  name: z.string().min(1, { message: "Reference name is required." }),
  position: z.string().optional(),
  company: z.string().optional(),
  email: z.string().email({ message: "Please enter a valid email address." }).optional().or(z.literal("")),
  phone: z.string().optional(),
})

const formSchema = z.object({
  testimonials: z.array(testimonialSchema).min(0),
  references: z.array(referenceSchema).min(0),
})

export default function TestimonialsForm({ data, onNext }) {
  const { setStep6Data } = useContent()
  const [editingTestimonialIndex, setEditingTestimonialIndex] = useState<number | null>(null)
  const [editingReferenceIndex, setEditingReferenceIndex] = useState<number | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      testimonials: data?.testimonials || [],
      references: data?.references || [],
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form 6 submitted:", values);
    setStep6Data({
      testimonials: values.testimonials,
      references: values.references,
    });
    onNext({ testimonials: values })
  };

  const addTestimonial = () => {
    const newTestimonial = {
      text: "",
      author: "",
      position: "",
      company: "",
    }

    const currentTestimonials = form.getValues("testimonials") || []
    form.setValue("testimonials", [...currentTestimonials, newTestimonial])
    setEditingTestimonialIndex(currentTestimonials.length)
  }

  const removeTestimonial = (index: number) => {
    const currentTestimonials = form.getValues("testimonials") || []
    form.setValue(
      "testimonials",
      currentTestimonials.filter((_, i) => i !== index),
    )
    if (editingTestimonialIndex === index) {
      setEditingTestimonialIndex(null)
    } else if (editingTestimonialIndex !== null && editingTestimonialIndex > index) {
      setEditingTestimonialIndex(editingTestimonialIndex - 1)
    }
  }

  const addReference = () => {
    const newReference = {
      name: "",
      position: "",
      company: "",
      email: "",
      phone: "",
    }

    const currentReferences = form.getValues("references") || []
    form.setValue("references", [...currentReferences, newReference])
    setEditingReferenceIndex(currentReferences.length)
  }

  const removeReference = (index: number) => {
    const currentReferences = form.getValues("references") || []
    form.setValue(
      "references",
      currentReferences.filter((_, i) => i !== index),
    )
    if (editingReferenceIndex === index) {
      setEditingReferenceIndex(null)
    } else if (editingReferenceIndex !== null && editingReferenceIndex > index) {
      setEditingReferenceIndex(editingReferenceIndex - 1)
    }
  }

  return (
    <Form {...form}>
      <form id="form-step-6" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <h2 className="text-lg font-medium mb-6">Testimonials</h2>

          {form.getValues("testimonials")?.length === 0 ? (
            <Card className="border-dashed mb-8">
              <CardContent className="pt-6 flex flex-col items-center justify-center text-center p-10">
                <Quote className="h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No testimonials added yet</h3>
                <p className="text-muted-foreground mb-4">
                  Add testimonials from clients, colleagues, or managers to build credibility.
                </p>
                <Button type="button" onClick={addTestimonial}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Testimonial
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4 mb-8">
              <Accordion
                type="single"
                collapsible
                value={editingTestimonialIndex !== null ? `testimonial-${editingTestimonialIndex}` : undefined}
                onValueChange={(value) => {
                  if (value && value.startsWith("testimonial-")) {
                    const index = Number.parseInt(value.replace("testimonial-", ""))
                    setEditingTestimonialIndex(index)
                  } else {
                    setEditingTestimonialIndex(null)
                  }
                }}
              >
                {form.getValues("testimonials")?.map((testimonial, index) => (
                  <AccordionItem key={index} value={`testimonial-${index}`} className="border rounded-lg">
                    <AccordionTrigger className="px-4 py-2 hover:no-underline">
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                          <Quote className="h-5 w-5 mr-2 text-muted-foreground" />
                          <div className="text-left">
                            <h3 className="font-medium">{testimonial.author || "New Testimonial"}</h3>
                            <p className="text-sm text-muted-foreground">
                              {testimonial.position
                                ? `${testimonial.position}${testimonial.company ? `, ${testimonial.company}` : ""}`
                                : "Position details"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 py-2">
                      <FormField
                        control={form.control}
                        name={`testimonials.${index}.text`}
                        render={({ field }) => (
                          <FormItem className="mb-6">
                            <FormLabel>Testimonial Text</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Enter the testimonial text..."
                                className="min-h-[120px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <FormField
                          control={form.control}
                          name={`testimonials.${index}.author`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Author Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Smith" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`testimonials.${index}.position`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Position (Optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="CEO" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`testimonials.${index}.company`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Company (Optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="Acme Inc." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="flex justify-end mt-6">
                        <Button type="button" variant="destructive" size="sm" onClick={() => removeTestimonial(index)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Remove Testimonial
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <Button type="button" variant="outline" className="w-full" onClick={addTestimonial}>
                <Plus className="mr-2 h-4 w-4" />
                Add Another Testimonial
              </Button>
            </div>
          )}
        </div>

        <div>
          <h2 className="text-lg font-medium mb-6">References (Optional)</h2>

          {form.getValues("references")?.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="pt-6 flex flex-col items-center justify-center text-center p-10">
                <Award className="h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No references added yet</h3>
                <p className="text-muted-foreground mb-4">
                  Add professional references who can vouch for your skills and work ethic.
                </p>
                <Button type="button" onClick={addReference}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Reference
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              <Accordion
                type="single"
                collapsible
                value={editingReferenceIndex !== null ? `reference-${editingReferenceIndex}` : undefined}
                onValueChange={(value) => {
                  if (value && value.startsWith("reference-")) {
                    const index = Number.parseInt(value.replace("reference-", ""))
                    setEditingReferenceIndex(index)
                  } else {
                    setEditingReferenceIndex(null)
                  }
                }}
              >
                {form.getValues("references")?.map((reference, index) => (
                  <AccordionItem key={index} value={`reference-${index}`} className="border rounded-lg">
                    <AccordionTrigger className="px-4 py-2 hover:no-underline">
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                          <Award className="h-5 w-5 mr-2 text-muted-foreground" />
                          <div className="text-left">
                            <h3 className="font-medium">{reference.name || "New Reference"}</h3>
                            <p className="text-sm text-muted-foreground">
                              {reference.position
                                ? `${reference.position}${reference.company ? `, ${reference.company}` : ""}`
                                : "Position details"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 py-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <FormField
                          control={form.control}
                          name={`references.${index}.name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Reference Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Jane Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`references.${index}.position`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Position (Optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="Manager" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`references.${index}.company`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Company (Optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="Acme Inc." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`references.${index}.email`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email (Optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="jane@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`references.${index}.phone`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone (Optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="+1 (555) 123-4567" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="flex justify-end mt-6">
                        <Button type="button" variant="destructive" size="sm" onClick={() => removeReference(index)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Remove Reference
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <Button type="button" variant="outline" className="w-full" onClick={addReference}>
                <Plus className="mr-2 h-4 w-4" />
                Add Another Reference
              </Button>
            </div>
          )}
        </div>
      </form>
    </Form>
  )
}

