"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  GraduationCap,
  MessageSquare,
  User,
  Code,
  Award,
  LinkIcon,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { Button, Progress } from "@nextui-org/react";
import PersonalInfoForm from "@/components/create/personal-info-form";
import ProfessionalSummaryForm from "@/components/create/professional-summary-form";
import WorkExperienceForm from "@/components/create/work-experience-form";
import EducationForm from "@/components/create/education-form";
import ProjectsForm from "@/components/create/projects-form";
import TestimonialsForm from "@/components/create/testimonials-form";
import SocialLinksForm from "@/components/create/social-links-form";
import ReviewForm from "@/components/create/review-form";
import AIChatbot from "@/components/create/ai-chatbot";
import { useContent } from "@/context/ContentContext";

const steps = [
  { id: 1, title: "Personal Information", icon: User, component: PersonalInfoForm },
  { id: 2, title: "Professional Summary & Skills", icon: Sparkles, component: ProfessionalSummaryForm },
  { id: 3, title: "Work Experience", icon: Briefcase, component: WorkExperienceForm },
  { id: 4, title: "Education", icon: GraduationCap, component: EducationForm },
  { id: 5, title: "Projects & Portfolio Work", icon: Code, component: ProjectsForm },
  { id: 6, title: "Testimonials & References", icon: Award, component: TestimonialsForm },
  { id: 7, title: "Social Links & Additional Info", icon: LinkIcon, component: SocialLinksForm },
  { id: 8, title: "Review & Generate Portfolio", icon: CheckCircle, component: ReviewForm },
];

export default function CreatePortfolio() {
  const { setFormsData } = useContent();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    personalInfo: {},
    professionalSummary: {},
    workExperience: [],
    education: [],
    projects: [],
    testimonials: [],
    socialLinks: {},
  });
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const formRef = useRef(null);

  const CurrentStepComponent = steps.find((step) => step.id === currentStep)?.component;
  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(formRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 });
    }
  }, [currentStep]);

  const handleNext = (stepData) => {
    setFormData((prev) => ({
      ...prev,
      [Object.keys(stepData)[0]]: stepData[Object.keys(stepData)[0]],
    }));

    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
      router.push("/preview");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const updateFormData = () => {
    setFormsData(formData);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-divider">
        <div className="container max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">PortfolioAI</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="light" size="sm" onClick={() => router.push("/")}>Cancel</Button>
            <Button
              color="primary"
              size="sm"
              onClick={() => setIsChatbotOpen(!isChatbotOpen)}
              startContent={<MessageSquare className="h-4 w-4" />}
            >
              AI Assistant
            </Button>
          </div>
        </div>
      </header>

      <div className="container max-w-7xl mx-auto py-8 flex-1 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-2xl font-bold">
                Step {currentStep}: {steps.find((step) => step.id === currentStep)?.title}
              </h1>
              <span className="text-sm text-default-500">
                {currentStep} of {steps.length}
              </span>
            </div>
            <Progress value={progress} className="h-2" color="primary" aria-label="Form progress" />
          </div>

          <div ref={formRef}>
            {CurrentStepComponent && <CurrentStepComponent data={formData} onNext={handleNext} />}
            {formData.personalInfo.image && (
              <img src={URL.createObjectURL(formData.personalInfo.image)} alt="Uploaded" className="mt-4 w-full h-auto rounded-lg shadow" />
            )}
          </div>

          <div className="flex justify-between mt-8">
            <Button
              variant="flat"
              onClick={handleBack}
              isDisabled={currentStep === 1}
              startContent={<ArrowLeft className="h-4 w-4" />}
            >
              Back
            </Button>

            {currentStep < steps.length && (
              <Button
                type="submit"
                form={`form-step-${currentStep}`}
                color="primary"
                endContent={<ArrowRight className="h-4 w-4" />}
                onPress={updateFormData}
              >
                Next
              </Button>
            )}
          </div>
        </div>
      </div>

      {isChatbotOpen && <AIChatbot onClose={() => setIsChatbotOpen(false)} />}
    </div>
  );
}