"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { User, Mail, Phone, MapPin, Upload } from "lucide-react"
import { Input, Textarea, Card, CardBody } from "@nextui-org/react"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  title: z.string().min(2, { message: "Professional title is required." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  location: z.string().optional(),
  bio: z
    .string()
    .min(10, { message: "Bio must be at least 10 characters." })
    .max(500, { message: "Bio must not exceed 500 characters." }),
  photo: z.string().optional(),
})

export default function PersonalInfoForm({ data, onNext }) {
  const [photoPreview, setPhotoPreview] = useState(data?.personalInfo?.photo || null)

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.personalInfo?.name || "",
      title: data?.personalInfo?.title || "",
      email: data?.personalInfo?.email || "",
      phone: data?.personalInfo?.phone || "",
      location: data?.personalInfo?.location || "",
      bio: data?.personalInfo?.bio || "",
      photo: data?.personalInfo?.photo || "",
    },
  })

  function onSubmit(values) {
    onNext({ personalInfo: { ...values, photo: photoPreview || values.photo } })
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you would upload this to a server and get a URL back
      // For this demo, we'll just use a placeholder
      setPhotoPreview("/placeholder.svg?height=200&width=200")
      setValue("photo", "/placeholder.svg?height=200&width=200")
    }
  }

  return (
    <form id="form-step-1" onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <Card>
        <CardBody className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-default-100 flex items-center justify-center">
                    {photoPreview ? (
                      <img
                        src={photoPreview || "/placeholder.svg"}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="h-16 w-16 text-default-400" />
                    )}
                  </div>
                  <label
                    htmlFor="photo-upload"
                    className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer"
                  >
                    <Upload className="h-4 w-4" />
                    <span className="sr-only">Upload photo</span>
                  </label>
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoChange}
                  />
                </div>
                <p className="text-sm text-default-500 text-center">
                  Upload a professional photo
                  <br />
                  (Recommended: 400x400px)
                </p>
              </div>
            </div>

            <div className="md:col-span-2 space-y-6">
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Full Name"
                    placeholder="John Doe"
                    isInvalid={!!errors.name}
                    errorMessage={errors.name?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="title"
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Professional Title"
                    placeholder="Frontend Developer"
                    isInvalid={!!errors.title}
                    errorMessage={errors.title?.message}
                    description="Your current role or the role you're seeking"
                  />
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Controller
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Email"
                      placeholder="you@example.com"
                      isInvalid={!!errors.email}
                      errorMessage={errors.email?.message}
                      startContent={<Mail className="text-default-400 h-4 w-4" />}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="phone"
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Phone (Optional)"
                      placeholder="+1 (555) 123-4567"
                      isInvalid={!!errors.phone}
                      errorMessage={errors.phone?.message}
                      startContent={<Phone className="text-default-400 h-4 w-4" />}
                    />
                  )}
                />
              </div>

              <Controller
                control={control}
                name="location"
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Location (Optional)"
                    placeholder="San Francisco, CA"
                    isInvalid={!!errors.location}
                    errorMessage={errors.location?.message}
                    startContent={<MapPin className="text-default-400 h-4 w-4" />}
                  />
                )}
              />
            </div>
          </div>

          <div className="mt-6">
            <Controller
              control={control}
              name="bio"
              render={({ field }) => (
                <Textarea
                  {...field}
                  label="Professional Bio"
                  placeholder="Write a brief introduction about yourself and your professional background..."
                  minRows={4}
                  isInvalid={!!errors.bio}
                  errorMessage={errors.bio?.message}
                  description="Write a concise, engaging summary of your professional background and goals."
                />
              )}
            />
          </div>
        </CardBody>
      </Card>
    </form>
  )
}

