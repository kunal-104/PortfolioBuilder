"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle, Edit, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ReviewForm({ data, onNext }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("preview")

  const handleSubmit = (e) => {
    e.preventDefault()
    onNext(data)
    router.push("/preview")
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-primary" />
        </div>
      </div>

      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Your Portfolio is Ready!</h2>
        <p className="text-muted-foreground">Review your information before generating your portfolio.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="preview">
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </TabsTrigger>
          <TabsTrigger value="edit">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </TabsTrigger>
        </TabsList>
        <TabsContent value="preview" className="mt-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-6">
                  {data.personalInfo?.photo && (
                    <div className="flex-shrink-0">
                      <img
                        src={data.personalInfo.photo || "/placeholder.svg"}
                        alt={data.personalInfo?.name || "Profile"}
                        className="w-24 h-24 rounded-full object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="text-xl font-bold">{data.personalInfo?.name || "Your Name"}</h3>
                    <p className="text-muted-foreground">{data.personalInfo?.title || "Your Title"}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
                      {data.personalInfo?.email && <p className="text-sm">Email: {data.personalInfo.email}</p>}
                      {data.personalInfo?.phone && <p className="text-sm">Phone: {data.personalInfo.phone}</p>}
                      {data.personalInfo?.location && <p className="text-sm">Location: {data.personalInfo.location}</p>}
                    </div>
                    {data.personalInfo?.bio && <p className="mt-4 text-sm">{data.personalInfo.bio}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Professional Summary & Skills</CardTitle>
              </CardHeader>
              <CardContent>
                {data.professionalSummary?.objective && <p className="mb-4">{data.professionalSummary.objective}</p>}

                {data.professionalSummary?.skills && data.professionalSummary.skills.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {data.professionalSummary.skills.map((skill, index) => (
                        <div key={index} className="px-3 py-1 bg-muted rounded-full text-sm flex items-center gap-2">
                          {skill.name}
                          <span
                            className={`text-xs px-1.5 py-0.5 rounded-full ${
                              skill.level === "Beginner"
                                ? "bg-blue-100 text-blue-800"
                                : skill.level === "Intermediate"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-green-100 text-green-800"
                            }`}
                          >
                            {skill.level}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Additional sections would be added here for work experience, education, projects, etc. */}

            <div className="flex justify-center">
              <Button size="lg" onClick={handleSubmit}>
                Generate My Portfolio
              </Button>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="edit" className="mt-6">
          <div className="space-y-4">
            <p className="text-center text-muted-foreground">
              To edit any section, go back to the specific step using the navigation buttons below.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="outline" onClick={() => router.push("/create")}>
                Edit Personal Information
              </Button>
              <Button variant="outline" onClick={() => router.push("/create")}>
                Edit Professional Summary
              </Button>
              <Button variant="outline" onClick={() => router.push("/create")}>
                Edit Work Experience
              </Button>
              <Button variant="outline" onClick={() => router.push("/create")}>
                Edit Education
              </Button>
              <Button variant="outline" onClick={() => router.push("/create")}>
                Edit Projects
              </Button>
              <Button variant="outline" onClick={() => router.push("/create")}>
                Edit Testimonials
              </Button>
              <Button variant="outline" onClick={() => router.push("/create")}>
                Edit Social Links
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <form id="form-step-8" onSubmit={handleSubmit} className="hidden">
        {/* Hidden form for the step navigation to work */}
      </form>
    </div>
  )
}

