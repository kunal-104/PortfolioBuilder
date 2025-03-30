"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Mail, Phone, MapPin, Linkedin, Github, Twitter, Globe } from "lucide-react"
import { Chip } from "@nextui-org/react"

export default function PortfolioPreview({ data, theme }) {
  const [activeSection, setActiveSection] = useState("about")
  const sectionRefs = {
    about: useRef(null),
    experience: useRef(null),
    education: useRef(null),
    projects: useRef(null),
    testimonials: useRef(null),
  }

  useEffect(() => {
    // Animate section change
    if (sectionRefs[activeSection]?.current) {
      gsap.fromTo(
        sectionRefs[activeSection].current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
      )
    }
  }, [activeSection])

  const renderMinimalTheme = () => (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="py-12 px-6 text-center">
        {data.personalInfo.photo && (
          <div className="mx-auto mb-6">
            <img
              src={data.personalInfo.photo || "/placeholder.svg"}
              alt={data.personalInfo.name}
              className="w-32 h-32 rounded-full object-cover mx-auto"
            />
          </div>
        )}
        <h1 className="text-3xl font-bold mb-2">{data.personalInfo.name}</h1>
        <p className="text-xl text-default-500 mb-4">{data.personalInfo.title}</p>
        <div className="flex justify-center space-x-4 mb-6">
          {data.socialLinks?.linkedin && (
            <a
              href={data.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-default-500 hover:text-primary"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          )}
          {data.socialLinks?.github && (
            <a
              href={data.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-default-500 hover:text-primary"
            >
              <Github className="h-5 w-5" />
            </a>
          )}
          {data.socialLinks?.twitter && (
            <a
              href={data.socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-default-500 hover:text-primary"
            >
              <Twitter className="h-5 w-5" />
            </a>
          )}
          {data.socialLinks?.website && (
            <a
              href={data.socialLinks.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-default-500 hover:text-primary"
            >
              <Globe className="h-5 w-5" />
            </a>
          )}
        </div>
        <div className="flex justify-center flex-wrap gap-4">
          {data.personalInfo.email && (
            <div className="flex items-center text-sm">
              <Mail className="h-4 w-4 mr-2" />
              <span>{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo.phone && (
            <div className="flex items-center text-sm">
              <Phone className="h-4 w-4 mr-2" />
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo.location && (
            <div className="flex items-center text-sm">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{data.personalInfo.location}</span>
            </div>
          )}
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-y py-4">
        <ul className="flex justify-center space-x-8">
          <li>
            <button
              onClick={() => setActiveSection("about")}
              className={`text-sm font-medium ${activeSection === "about" ? "text-primary" : "text-default-500 hover:text-foreground"}`}
            >
              About
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection("experience")}
              className={`text-sm font-medium ${activeSection === "experience" ? "text-primary" : "text-default-500 hover:text-foreground"}`}
            >
              Experience
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection("education")}
              className={`text-sm font-medium ${activeSection === "education" ? "text-primary" : "text-default-500 hover:text-foreground"}`}
            >
              Education
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection("projects")}
              className={`text-sm font-medium ${activeSection === "projects" ? "text-primary" : "text-default-500 hover:text-foreground"}`}
            >
              Projects
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection("testimonials")}
              className={`text-sm font-medium ${activeSection === "testimonials" ? "text-primary" : "text-default-500 hover:text-foreground"}`}
            >
              Testimonials
            </button>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto py-12 px-6">
        {activeSection === "about" && (
          <section ref={sectionRefs.about}>
            <h2 className="text-2xl font-bold mb-6">About Me</h2>
            <p className="mb-8">{data.personalInfo.bio}</p>

            {data.professionalSummary?.objective && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Professional Summary</h3>
                <p>{data.professionalSummary.objective}</p>
              </div>
            )}

            {data.professionalSummary?.skills && data.professionalSummary.skills.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {data.professionalSummary.skills.map((skill, index) => (
                    <Chip
                      key={index}
                      variant="flat"
                      color={
                        skill.level === "Beginner" ? "primary" : skill.level === "Intermediate" ? "warning" : "success"
                      }
                    >
                      {skill.name}
                      <span className="ml-1 text-xs opacity-70">{skill.level}</span>
                    </Chip>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {activeSection === "experience" && (
          <section ref={sectionRefs.experience}>
            <h2 className="text-2xl font-bold mb-6">Work Experience</h2>
            <div className="space-y-8">
              {data.workExperience?.map((job, index) => (
                <div key={index} className="border-l-2 border-default-200 pl-6 relative">
                  <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1.5"></div>
                  <h3 className="text-xl font-semibold">{job.title}</h3>
                  <p className="text-default-500 mb-2">
                    {job.company}
                    {job.location ? `, ${job.location}` : ""} | {job.startDate} -{" "}
                    {job.current ? "Present" : job.endDate}
                  </p>
                  <p className="mb-4">{job.description}</p>
                  {job.achievements && job.achievements.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Key Achievements:</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {job.achievements.map((achievement, i) => (
                          <li key={i}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {activeSection === "education" && (
          <section ref={sectionRefs.education}>
            <h2 className="text-2xl font-bold mb-6">Education</h2>
            <div className="space-y-8">
              {data.education?.map((edu, index) => (
                <div key={index} className="border-l-2 border-default-200 pl-6 relative">
                  <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1.5"></div>
                  <h3 className="text-xl font-semibold">{edu.degree}</h3>
                  <p className="text-default-500 mb-2">
                    {edu.institution}
                    {edu.location ? `, ${edu.location}` : ""} | {edu.startYear} -{" "}
                    {edu.current ? "Present" : edu.endYear}
                  </p>
                  {edu.description && <p>{edu.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {activeSection === "projects" && (
          <section ref={sectionRefs.projects}>
            <h2 className="text-2xl font-bold mb-6">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.projects?.map((project, index) => (
                <div key={index} className="border rounded-lg overflow-hidden">
                  {project.image && (
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.name}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{project.name}</h3>
                    <p className="text-sm mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies?.map((tech, i) => (
                        <Chip key={i} variant="flat" size="sm">
                          {tech}
                        </Chip>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline"
                        >
                          View Project
                        </a>
                      )}
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline flex items-center"
                        >
                          <Github className="h-3 w-3 mr-1" />
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeSection === "testimonials" && (
          <section ref={sectionRefs.testimonials}>
            <h2 className="text-2xl font-bold mb-6">Testimonials</h2>
            <div className="space-y-6">
              {data.testimonials?.map((testimonial, index) => (
                <div key={index} className="bg-default-100 p-6 rounded-lg">
                  <blockquote className="text-lg italic mb-4">"{testimonial.text}"</blockquote>
                  <div className="flex items-center">
                    <div>
                      <p className="font-medium">{testimonial.author}</p>
                      <p className="text-sm text-default-500">
                        {testimonial.position}
                        {testimonial.company ? `, ${testimonial.company}` : ""}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )

  const renderCorporateTheme = () => (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="bg-primary text-white py-16 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8">
          {data.personalInfo.photo && (
            <div className="flex-shrink-0">
              <img
                src={data.personalInfo.photo || "/placeholder.svg"}
                alt={data.personalInfo.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-white"
              />
            </div>
          )}
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2">{data.personalInfo.name}</h1>
            <p className="text-xl mb-4">{data.personalInfo.title}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              {data.personalInfo.email && (
                <div className="flex items-center text-sm">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>{data.personalInfo.email}</span>
                </div>
              )}
              {data.personalInfo.phone && (
                <div className="flex items-center text-sm">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>{data.personalInfo.phone}</span>
                </div>
              )}
              {data.personalInfo.location && (
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{data.personalInfo.location}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-default-100 sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto">
          <ul className="flex overflow-x-auto">
            <li>
              <button
                onClick={() => setActiveSection("about")}
                className={`px-4 py-3 text-sm font-medium border-b-2 ${
                  activeSection === "about"
                    ? "border-primary text-primary"
                    : "border-transparent text-default-500 hover:text-foreground"
                }`}
              >
                About
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection("experience")}
                className={`px-4 py-3 text-sm font-medium border-b-2 ${
                  activeSection === "experience"
                    ? "border-primary text-primary"
                    : "border-transparent text-default-500 hover:text-foreground"
                }`}
              >
                Experience
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection("education")}
                className={`px-4 py-3 text-sm font-medium border-b-2 ${
                  activeSection === "education"
                    ? "border-primary text-primary"
                    : "border-transparent text-default-500 hover:text-foreground"
                }`}
              >
                Education
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection("projects")}
                className={`px-4 py-3 text-sm font-medium border-b-2 ${
                  activeSection === "projects"
                    ? "border-primary text-primary"
                    : "border-transparent text-default-500 hover:text-foreground"
                }`}
              >
                Projects
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection("testimonials")}
                className={`px-4 py-3 text-sm font-medium border-b-2 ${
                  activeSection === "testimonials"
                    ? "border-primary text-primary"
                    : "border-transparent text-default-500 hover:text-foreground"
                }`}
              >
                Testimonials
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto py-12 px-6">
        {activeSection === "about" && (
          <section ref={sectionRefs.about}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold mb-6 border-b pb-2">About Me</h2>
                <p className="mb-8">{data.personalInfo.bio}</p>

                {data.professionalSummary?.objective && (
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4">Professional Summary</h3>
                    <p>{data.professionalSummary.objective}</p>
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 border-b pb-2">Skills</h3>
                {data.professionalSummary?.skills && (
                  <div className="space-y-4">
                    {data.professionalSummary.skills.map((skill, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">{skill.name}</span>
                          <span className="text-xs text-default-500">{skill.level}</span>
                        </div>
                        <div className="w-full bg-default-200 rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{
                              width:
                                skill.level === "Beginner" ? "33%" : skill.level === "Intermediate" ? "66%" : "100%",
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4 border-b pb-2">Connect</h3>
                  <div className="flex flex-wrap gap-3">
                    {data.socialLinks?.linkedin && (
                      <a
                        href={data.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-default-100 p-2 rounded-full hover:bg-primary hover:text-white transition-colors"
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                    )}
                    {data.socialLinks?.github && (
                      <a
                        href={data.socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-default-100 p-2 rounded-full hover:bg-primary hover:text-white transition-colors"
                      >
                        <Github className="h-5 w-5" />
                      </a>
                    )}
                    {data.socialLinks?.twitter && (
                      <a
                        href={data.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-default-100 p-2 rounded-full hover:bg-primary hover:text-white transition-colors"
                      >
                        <Twitter className="h-5 w-5" />
                      </a>
                    )}
                    {data.socialLinks?.website && (
                      <a
                        href={data.socialLinks.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-default-100 p-2 rounded-full hover:bg-primary hover:text-white transition-colors"
                      >
                        <Globe className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeSection === "experience" && (
          <section ref={sectionRefs.experience}>
            <h2 className="text-2xl font-bold mb-6 border-b pb-2">Work Experience</h2>
            <div className="space-y-8">
              {data.workExperience?.map((job, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:text-right">
                    <p className="font-medium">
                      {job.startDate} - {job.current ? "Present" : job.endDate}
                    </p>
                    <p className="text-sm text-default-500">{job.location}</p>
                  </div>
                  <div className="md:col-span-3">
                    <h3 className="text-xl font-semibold">{job.title}</h3>
                    <p className="text-primary font-medium mb-2">{job.company}</p>
                    <p className="mb-4">{job.description}</p>
                    {job.achievements && job.achievements.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2">Key Achievements:</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {job.achievements.map((achievement, i) => (
                            <li key={i}>{achievement}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeSection === "education" && (
          <section ref={sectionRefs.education}>
            <h2 className="text-2xl font-bold mb-6 border-b pb-2">Education</h2>
            <div className="space-y-8">
              {data.education?.map((edu, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:text-right">
                    <p className="font-medium">
                      {edu.startYear} - {edu.current ? "Present" : edu.endYear}
                    </p>
                    <p className="text-sm text-default-500">{edu.location}</p>
                  </div>
                  <div className="md:col-span-3">
                    <h3 className="text-xl font-semibold">{edu.degree}</h3>
                    <p className="text-primary font-medium mb-2">{edu.institution}</p>
                    {edu.description && <p>{edu.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeSection === "projects" && (
          <section ref={sectionRefs.projects}>
            <h2 className="text-2xl font-bold mb-6 border-b pb-2">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {data.projects?.map((project, index) => (
                <div key={index} className="border rounded-lg overflow-hidden shadow-sm">
                  {project.image && (
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.name}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                    <p className="mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies?.map((tech, i) => (
                        <Chip key={i} variant="flat" size="sm">
                          {tech}
                        </Chip>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                        >
                          View Project
                        </a>
                      )}
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm bg-default-100 px-4 py-2 rounded-md hover:bg-default-200 transition-colors flex items-center"
                        >
                          <Github className="h-4 w-4 mr-2" />
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeSection === "testimonials" && (
          <section ref={sectionRefs.testimonials}>
            <h2 className="text-2xl font-bold mb-6 border-b pb-2">Testimonials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.testimonials?.map((testimonial, index) => (
                <div key={index} className="bg-default-100 p-6 rounded-lg">
                  <blockquote className="text-lg italic mb-4">"{testimonial.text}"</blockquote>
                  <div className="flex items-center">
                    <div>
                      <p className="font-medium">{testimonial.author}</p>
                      <p className="text-sm text-default-500">
                        {testimonial.position}
                        {testimonial.company ? `, ${testimonial.company}` : ""}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )

  // Render the appropriate theme based on the theme prop
  switch (theme) {
    case "corporate":
      return renderCorporateTheme()
    case "creative":
    case "developer":
      // For demo purposes, we're just using the minimal theme for these
      return renderMinimalTheme()
    case "minimal":
    default:
      return renderMinimalTheme()
  }
}

