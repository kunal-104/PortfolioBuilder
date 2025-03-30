"use client"

import { useState, useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Plus, X, Sparkles } from "lucide-react"
import { Button, Input, Textarea, Card, CardBody, Chip, Select, SelectItem } from "@nextui-org/react"
import { useContent } from "@/context/ContentContext"
const formSchema = z.object({
  objective: z.string().min(10, { message: "Career objective must be at least 10 characters." }),
  skills: z
    .array(
      z.object({
        name: z.string().min(1, { message: "Skill name is required." }),
        level: z.enum(["Beginner", "Intermediate", "Expert"]),
      }),
    )
    .min(1, { message: "Add at least one skill." }),
})

export default function ProfessionalSummaryForm({ data, onNext }) {

  const { setFormsData } = useContent()
  const [formData, setFormData] = useState({
    objective: data?.professionalSummary?.objective || "",
    skills: data?.professionalSummary?.skills || [],
  })

  const [newSkill, setNewSkill] = useState("")
  const [newSkillLevel, setNewSkillLevel] = useState("Intermediate")

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: formData,
  })

  // Sync form data with state whenever form values change
  useEffect(() => {
    const subscription = watch((values) => {
      setFormData(values)
    })
    return () => subscription.unsubscribe()
  }, [watch])

  function onSubmit(values) {
    console.log("2ndform : ", values);
    setFormsData(values)
    setFormData(values) // Update state with final values
    onNext({ professionalSummary: values })
  }

  const addSkill = () => {
    if (newSkill.trim()) {
      const currentSkills = getValues("skills") || []
      const updatedSkills = [...currentSkills, { name: newSkill, level: newSkillLevel }]
      setValue("skills", updatedSkills)
      setFormData((prev) => ({ ...prev, skills: updatedSkills })) // Update state
      setNewSkill("")
    }
  }

  const removeSkill = (index) => {
    const updatedSkills = getValues("skills").filter((_, i) => i !== index)
    setValue("skills", updatedSkills)
    setFormData((prev) => ({ ...prev, skills: updatedSkills })) // Update state
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && newSkill.trim()) {
      e.preventDefault()
      addSkill()
    }
  }

  return (
    <form id="form-step-2" onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <Card>
        <CardBody className="p-6">
          <Controller
            control={control}
            name="objective"
            render={({ field }) => (
              <Textarea
                {...field}
                label="Career Objective"
                placeholder="Describe your career goals and what you're looking for..."
                minRows={4}
                isInvalid={!!errors.objective}
                errorMessage={errors.objective?.message}
                description="Write a concise statement about your career goals and what you bring to the table."
              />
            )}
          />

          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-medium">Skills</label>
              <Button
                size="sm"
                variant="flat"
                color="primary"
                startContent={<Sparkles className="h-4 w-4" />}
                onClick={() => {
                  const updatedSkills = [
                    ...(getValues("skills") || []),
                    { name: "AI-suggested skill", level: "Intermediate" },
                  ]
                  setValue("skills", updatedSkills)
                  setFormData((prev) => ({ ...prev, skills: updatedSkills })) // Update state
                }}
              >
                Suggest Skills
              </Button>
            </div>

            <div className="flex gap-3 mb-4">
              <Input
                placeholder="Add a skill (e.g., JavaScript, Project Management)"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1"
              />
              <Select
                selectedKeys={[newSkillLevel]}
                onChange={(e) => setNewSkillLevel(e.target.value)}
                className="w-[180px]"
              >
                <SelectItem key="Beginner" value="Beginner">
                  Beginner
                </SelectItem>
                <SelectItem key="Intermediate" value="Intermediate">
                  Intermediate
                </SelectItem>
                <SelectItem key="Expert" value="Expert">
                  Expert
                </SelectItem>
              </Select>
              <Button isIconOnly onClick={addSkill}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <Controller
              control={control}
              name="skills"
              render={({ field }) => (
                <div>
                  {errors.skills && <p className="text-danger text-sm mb-2">{errors.skills.message}</p>}

                  <div className="space-y-4">
                    {formData.skills.length === 0 ? (
                      <p className="text-sm text-default-500">
                        No skills added yet. Add your technical and soft skills above.
                      </p>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {formData.skills.map((skill, index) => (
                          <Chip
                            key={index}
                            variant="flat"
                            className="px-2 py-1"
                            color={
                              skill.level === "Beginner"
                                ? "primary"
                                : skill.level === "Intermediate"
                                  ? "warning"
                                  : "success"
                            }
                            endContent={
                              <button
                                type="button"
                                onClick={() => removeSkill(index)}
                                className="ml-1 text-default-500 hover:text-default-700"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            }
                          >
                            {skill.name}
                            <span className="ml-1 text-xs opacity-70">{skill.level}</span>
                          </Chip>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            />
          </div>
        </CardBody>
      </Card>
    </form>
  )
}


// "use client"

// import { useState } from "react"
// import { useForm, Controller } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { z } from "zod"
// import { Plus, X, Sparkles } from "lucide-react"
// import { Button, Input, Textarea, Card, CardBody, Chip, Select, SelectItem } from "@nextui-org/react"

// const formSchema = z.object({
//   objective: z.string().min(10, { message: "Career objective must be at least 10 characters." }),
//   skills: z
//     .array(
//       z.object({
//         name: z.string().min(1, { message: "Skill name is required." }),
//         level: z.enum(["Beginner", "Intermediate", "Expert"]),
//       }),
//     )
//     .min(1, { message: "Add at least one skill." }),
// })

// export default function ProfessionalSummaryForm({ data, onNext }) {
//   const [newSkill, setNewSkill] = useState("")
//   const [newSkillLevel, setNewSkillLevel] = useState("Intermediate")

//   const {
//     control,
//     handleSubmit,
//     setValue,
//     getValues,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       objective: data?.professionalSummary?.objective || "",
//       skills: data?.professionalSummary?.skills || [],
//     },
//   })

//   function onSubmit(values) {
//     onNext({ professionalSummary: values })
//   }

//   const addSkill = () => {
//     if (newSkill.trim()) {
//       const currentSkills = getValues("skills") || []
//       setValue("skills", [...currentSkills, { name: newSkill, level: newSkillLevel }])
//       setNewSkill("")
//     }
//   }

//   const removeSkill = (index) => {
//     const currentSkills = getValues("skills") || []
//     setValue(
//       "skills",
//       currentSkills.filter((_, i) => i !== index),
//     )
//   }

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" && newSkill.trim()) {
//       e.preventDefault()
//       addSkill()
//     }
//   }

//   return (
//     <form id="form-step-2" onSubmit={handleSubmit(onSubmit)} className="space-y-8">
//       <Card>
//         <CardBody className="p-6">
//           <Controller
//             control={control}
//             name="objective"
//             render={({ field }) => (
//               <Textarea
//                 {...field}
//                 label="Career Objective"
//                 placeholder="Describe your career goals and what you're looking for..."
//                 minRows={4}
//                 isInvalid={!!errors.objective}
//                 errorMessage={errors.objective?.message}
//                 description="Write a concise statement about your career goals and what you bring to the table."
//               />
//             )}
//           />

//           <div className="mt-8">
//             <div className="flex items-center justify-between mb-4">
//               <label className="text-sm font-medium">Skills</label>
//               <Button
//                 size="sm"
//                 variant="flat"
//                 color="primary"
//                 startContent={<Sparkles className="h-4 w-4" />}
//                 onClick={() => {
//                   setValue("skills", [
//                     ...(getValues("skills") || []),
//                     { name: "AI-suggested skill", level: "Intermediate" },
//                   ])
//                 }}
//               >
//                 Suggest Skills
//               </Button>
//             </div>

//             <div className="flex gap-3 mb-4">
//               <Input
//                 placeholder="Add a skill (e.g., JavaScript, Project Management)"
//                 value={newSkill}
//                 onChange={(e) => setNewSkill(e.target.value)}
//                 onKeyDown={handleKeyDown}
//                 className="flex-1"
//               />
//               <Select
//                 selectedKeys={[newSkillLevel]}
//                 onChange={(e) => setNewSkillLevel(e.target.value)}
//                 className="w-[180px]"
//               >
//                 <SelectItem key="Beginner" value="Beginner">
//                   Beginner
//                 </SelectItem>
//                 <SelectItem key="Intermediate" value="Intermediate">
//                   Intermediate
//                 </SelectItem>
//                 <SelectItem key="Expert" value="Expert">
//                   Expert
//                 </SelectItem>
//               </Select>
//               <Button isIconOnly onClick={addSkill}>
//                 <Plus className="h-4 w-4" />
//               </Button>
//             </div>

//             <Controller
//               control={control}
//               name="skills"
//               render={({ field }) => (
//                 <div>
//                   {errors.skills && <p className="text-danger text-sm mb-2">{errors.skills.message}</p>}

//                   <div className="space-y-4">
//                     {getValues("skills")?.length === 0 ? (
//                       <p className="text-sm text-default-500">
//                         No skills added yet. Add your technical and soft skills above.
//                       </p>
//                     ) : (
//                       <div className="flex flex-wrap gap-2">
//                         {getValues("skills")?.map((skill, index) => (
//                           <Chip
//                             key={index}
//                             variant="flat"
//                             className="px-2 py-1"
//                             color={
//                               skill.level === "Beginner"
//                                 ? "primary"
//                                 : skill.level === "Intermediate"
//                                   ? "warning"
//                                   : "success"
//                             }
//                             endContent={
//                               <button
//                                 type="button"
//                                 onClick={() => removeSkill(index)}
//                                 className="ml-1 text-default-500 hover:text-default-700"
//                               >
//                                 <X className="h-3 w-3" />
//                               </button>
//                             }
//                           >
//                             {skill.name}
//                             <span className="ml-1 text-xs opacity-70">{skill.level}</span>
//                           </Chip>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}
//             />
//           </div>
//         </CardBody>
//       </Card>
//     </form>
//   )
// }

