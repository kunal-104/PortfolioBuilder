"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { gsap } from "gsap"
import { ArrowLeft, Download, Share, Edit, Copy, CheckCircle, Sparkles, Palette } from "lucide-react"
import { Button, Tabs, Tab, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react"
import PortfolioPreview from "@/components/preview/portfolio-preview"
import {generateText} from '../../components/gemini';
import { useContent } from "@/context/ContentContext"
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const themes = [
  { id: "minimal", name: "Minimal" },
  { id: "corporate", name: "Corporate" },
  { id: "creative", name: "Creative" },
  { id: "developer", name: "Developer" },
]

export default function PreviewPortfolio() {

  const { user, setFormsData,
    setStep2Data,
    setStep3Data,
    setStep4Data,
    setStep5Data,
    setStep6Data,
    setStep7Data, } = useContent();

    const userDetails = {
      setFormsData,
      setStep2Data,
      setStep3Data,
      setStep4Data,
      setStep5Data,
      setStep6Data,
      setStep7Data,
    };
    
    const router = useRouter()
    const [activeTheme, setActiveTheme] = useState("minimal")
    const [copied, setCopied] = useState(false)
    const [responsedata, setResponseData] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false); // Added loading state
    const previewRef = useRef(null);
    const contentRef = useRef(null);
    const sidebarRef = useRef(null); // Added ref for the sidebar
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          setIsLoading(true); // Set loading state
          const response = await generateText(userDetails);
          setResponseData(response);
          setIsLoading(false); // Clear loading state
        } catch (error) {
          console.error("Error generating text:", error);
          setIsLoading(false); // Clear loading state on error
        }
      };
    
      fetchData();
    }, []);
    
  // Mock portfolio data (in a real app, this would come from context or state management)
  const portfolioData = {
    personalInfo: {
      name: "Alex Johnson",
      title: "Senior Frontend Developer",
      bio: "Passionate frontend developer with 5+ years of experience building responsive and accessible web applications.",
      email: "alex@example.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      photo: "/placeholder.svg?height=200&width=200",
    },
    professionalSummary: {
      objective:
        "Frontend developer seeking to leverage my expertise in React and modern JavaScript to create exceptional user experiences.",
      skills: [
        { name: "React", level: "Expert" },
        { name: "JavaScript", level: "Expert" },
        { name: "TypeScript", level: "Intermediate" },
        { name: "Next.js", level: "Expert" },
        { name: "CSS/SCSS", level: "Expert" },
        { name: "UI/UX Design", level: "Intermediate" },
      ],
    },
    workExperience: [
      {
        title: "Senior Frontend Developer",
        company: "TechCorp Inc.",
        location: "San Francisco, CA",
        startDate: "Jan 2021",
        endDate: "Present",
        description: "Lead frontend development for enterprise SaaS platform.",
        achievements: [
          "Reduced load time by 40% through code optimization",
          "Implemented component library used across 5 products",
          "Mentored junior developers and led code reviews",
        ],
      },
      {
        title: "Frontend Developer",
        company: "WebSolutions",
        location: "San Francisco, CA",
        startDate: "Mar 2018",
        endDate: "Dec 2020",
        description: "Developed responsive web applications for clients.",
        achievements: [
          "Built 20+ client websites using React",
          "Implemented CI/CD pipeline reducing deployment time by 50%",
          "Received client satisfaction score of 4.9/5",
        ],
      },
    ],
    education: [
      {
        degree: "B.S. Computer Science",
        institution: "University of California, Berkeley",
        location: "Berkeley, CA",
        startYear: "2014",
        endYear: "2018",
      },
    ],
    projects: [
      {
        name: "E-commerce Platform",
        description: "A full-featured e-commerce platform with cart, checkout, and payment processing.",
        technologies: ["React", "Node.js", "MongoDB", "Stripe"],
        image: "/placeholder.svg?height=300&width=500",
        link: "https://example.com/project1",
      },
      {
        name: "Task Management App",
        description: "A collaborative task management application with real-time updates.",
        technologies: ["React", "Firebase", "Material UI"],
        image: "/placeholder.svg?height=300&width=500",
        link: "https://example.com/project2",
      },
    ],
    testimonials: [
      {
        text: "Alex is an exceptional developer who consistently delivers high-quality work on time.",
        author: "Sarah Chen",
        position: "Product Manager, TechCorp Inc.",
      },
      {
        text: "Working with Alex was a pleasure. Their technical skills and attention to detail are outstanding.",
        author: "Michael Rodriguez",
        position: "CTO, WebSolutions",
      },
    ],
    socialLinks: {
      linkedin: "https://linkedin.com/in/alexjohnson",
      github: "https://github.com/alexjohnson",
      twitter: "https://twitter.com/alexjohnson",
      website: "https://alexjohnson.dev",
    },
  }

  // Function to handle PDF download
  const handleDownloadPDF = async () => {
    if (!contentRef.current) return;
    
    try {
      setIsLoading(true);
      
      const contentElement = contentRef.current;
      
      // Use html2canvas to capture the rendered HTML as an image
      const canvas = await html2canvas(contentElement, {
        scale: 2, // Higher scale for better quality
        useCORS: true, // Enable CORS for any images
        logging: false,
        windowWidth: contentElement.scrollWidth,
        windowHeight: contentElement.scrollHeight
      });
      
      // Calculate dimensions - A4 is 210mm × 297mm
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = 0;
      
      // Add the image to the PDF (first page)
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      // Add new pages if the content is longer than one page
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      // Save the PDF
      pdf.save(`portfolio-${activeTheme}.pdf`);
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error generating PDF:', error);
      setIsLoading(false);
    }
  };

  // Modified GSAP animation for preview only, keeping sidebar static
  useEffect(() => {
    // Animate preview on load with 200ms delay
    if (previewRef.current) {
      setTimeout(() => {
        gsap.fromTo(
          previewRef.current,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }
        )
      }, 200) // 200ms delay
    }
  }, []);

  // Handle generate text
  const handleGenerateAgain = async () => {
    try {
      setIsLoading(true);
      const response = await generateText(userDetails);
      setResponseData(response);
      setIsLoading(false);
    } catch (error) {
      console.error("Error generating text:", error);
      setIsLoading(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://portfolioai.vercel.app/portfolio/alex-johnson")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-divider">
        <div className="container max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">PortfolioAI</span>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="light"
              size="sm"
              onClick={() => router.push("/create")}
              startContent={<ArrowLeft className="h-4 w-4" />}
            >
              Back to Editor
            </Button>
            <Button variant="flat" size="sm" startContent={<Edit className="h-4 w-4" />}>
              Edit Content
            </Button>
            <Dropdown>
              <DropdownTrigger>
                <Button color="primary" size="sm" startContent={<Share className="h-4 w-4" />}>
                  Share
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Share options">
                <DropdownItem
                  key="copy"
                  onClick={handleCopyLink}
                  startContent={copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                >
                  {copied ? "Copied!" : "Copy Link"}
                </DropdownItem>
                <DropdownItem key="download" startContent={<Download className="h-4 w-4" />}>
                  Download as PDF
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </header>

      <div className="container max-w-7xl mx-auto py-8 flex-1 px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Your Portfolio Preview</h1>
          <p className="text-default-500">
            Here's a preview of your portfolio. You can switch between different themes and make final edits before
            publishing.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Fixed sidebar position with z-index */}
          <div ref={sidebarRef} className="w-full md:w-64 space-y-6 relative z-10">
            <div>
              <h2 className="text-lg font-medium mb-3 flex items-center">
                <Palette className="mr-2 h-5 w-5" />
                Choose Theme
              </h2>
              <Tabs
                aria-label="Theme options"
                selectedKey={activeTheme}
                onSelectionChange={setActiveTheme}
                variant="bordered"
                classNames={{
                  tabList: "flex-col gap-2",
                  cursor: "w-full bg-primary",
                }}
                className="w-full"
              >
                {themes.map((theme) => (
                  <Tab key={theme.id} title={theme.name} />
                ))}
              </Tabs>
            </div>

            <div className="space-y-4">
              <Button color="primary" className="w-full">
                Publish Portfolio
              </Button>
              <Button 
                onPress={handleDownloadPDF}
                variant="bordered" 
                className="w-full" 
                startContent={<Download className="h-4 w-4" />}
                isLoading={isLoading}
                isDisabled={isLoading}
              >
                Download PDF
              </Button>
              <Button 
                onPress={handleGenerateAgain} 
                color="primary" 
                className="w-full"
                isLoading={isLoading}
                isDisabled={isLoading}
              >
                Generate Again
              </Button>
            </div>
          </div>

          <div ref={previewRef} className="flex-1 border rounded-lg overflow-hidden">
            <div className="bg-default-100 p-2 border-b flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-danger"></div>
                <div className="w-3 h-3 rounded-full bg-warning"></div>
                <div className="w-3 h-3 rounded-full bg-success"></div>
              </div>
              <div className="flex-1 text-center text-xs text-default-500">
                portfolioai.vercel.app/portfolio/alex-johnson
              </div>
            </div>
            <div className="bg-background p-4 h-[600px] overflow-y-auto">
              {isLoading ? (
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : (
                <div ref={contentRef} dangerouslySetInnerHTML={{ __html: responsedata || "" }} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// "use client"

// import { useState, useEffect, useRef } from "react"
// import { useRouter } from "next/navigation"
// import { gsap } from "gsap"
// import { ArrowLeft, Download, Share, Edit, Copy, CheckCircle, Sparkles, Palette } from "lucide-react"
// import { Button, Tabs, Tab, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react"
// import PortfolioPreview from "@/components/preview/portfolio-preview"
// import {generateText} from '../../components/gemini';
// import { useContent } from "@/context/ContentContext"
// import { jsPDF } from 'jspdf';
// import html2canvas from 'html2canvas';

// const themes = [
//   { id: "minimal", name: "Minimal" },
//   { id: "corporate", name: "Corporate" },
//   { id: "creative", name: "Creative" },
//   { id: "developer", name: "Developer" },
// ]

// export default function PreviewPortfolio() {

//   const { user, setFormsData,
//     setStep2Data,
//     setStep3Data,
//     setStep4Data,
//     setStep5Data,
//     setStep6Data,
//     setStep7Data, } = useContent();

//     const userDetails = {
//       setFormsData,
//       setStep2Data,
//       setStep3Data,
//       setStep4Data,
//       setStep5Data,
//       setStep6Data,
//       setStep7Data,
//     };

    
    
//     const router = useRouter()
//     const [activeTheme, setActiveTheme] = useState("minimal")
//     const [copied, setCopied] = useState(false)
//     const [responsedata, setResponseData] = useState<string | undefined>(undefined);
//     const previewRef = useRef(null);
//     const contentRef = useRef(null);
//     useEffect(() => {
//       const fetchData = async () => {
//         try {
//           const response = await generateText(userDetails); // ✅ Await the Promise
//           setResponseData(response); // ✅ Set the resolved value
//         } catch (error) {
//           console.error("Error generating text:", error);
//         }
//       };
    
//       fetchData(); // Call the async function
//     }, []);
    
//   // Mock portfolio data (in a real app, this would come from context or state management)
//   const portfolioData = {
//     personalInfo: {
//       name: "Alex Johnson",
//       title: "Senior Frontend Developer",
//       bio: "Passionate frontend developer with 5+ years of experience building responsive and accessible web applications.",
//       email: "alex@example.com",
//       phone: "+1 (555) 123-4567",
//       location: "San Francisco, CA",
//       photo: "/placeholder.svg?height=200&width=200",
//     },
//     professionalSummary: {
//       objective:
//         "Frontend developer seeking to leverage my expertise in React and modern JavaScript to create exceptional user experiences.",
//       skills: [
//         { name: "React", level: "Expert" },
//         { name: "JavaScript", level: "Expert" },
//         { name: "TypeScript", level: "Intermediate" },
//         { name: "Next.js", level: "Expert" },
//         { name: "CSS/SCSS", level: "Expert" },
//         { name: "UI/UX Design", level: "Intermediate" },
//       ],
//     },
//     workExperience: [
//       {
//         title: "Senior Frontend Developer",
//         company: "TechCorp Inc.",
//         location: "San Francisco, CA",
//         startDate: "Jan 2021",
//         endDate: "Present",
//         description: "Lead frontend development for enterprise SaaS platform.",
//         achievements: [
//           "Reduced load time by 40% through code optimization",
//           "Implemented component library used across 5 products",
//           "Mentored junior developers and led code reviews",
//         ],
//       },
//       {
//         title: "Frontend Developer",
//         company: "WebSolutions",
//         location: "San Francisco, CA",
//         startDate: "Mar 2018",
//         endDate: "Dec 2020",
//         description: "Developed responsive web applications for clients.",
//         achievements: [
//           "Built 20+ client websites using React",
//           "Implemented CI/CD pipeline reducing deployment time by 50%",
//           "Received client satisfaction score of 4.9/5",
//         ],
//       },
//     ],
//     education: [
//       {
//         degree: "B.S. Computer Science",
//         institution: "University of California, Berkeley",
//         location: "Berkeley, CA",
//         startYear: "2014",
//         endYear: "2018",
//       },
//     ],
//     projects: [
//       {
//         name: "E-commerce Platform",
//         description: "A full-featured e-commerce platform with cart, checkout, and payment processing.",
//         technologies: ["React", "Node.js", "MongoDB", "Stripe"],
//         image: "/placeholder.svg?height=300&width=500",
//         link: "https://example.com/project1",
//       },
//       {
//         name: "Task Management App",
//         description: "A collaborative task management application with real-time updates.",
//         technologies: ["React", "Firebase", "Material UI"],
//         image: "/placeholder.svg?height=300&width=500",
//         link: "https://example.com/project2",
//       },
//     ],
//     testimonials: [
//       {
//         text: "Alex is an exceptional developer who consistently delivers high-quality work on time.",
//         author: "Sarah Chen",
//         position: "Product Manager, TechCorp Inc.",
//       },
//       {
//         text: "Working with Alex was a pleasure. Their technical skills and attention to detail are outstanding.",
//         author: "Michael Rodriguez",
//         position: "CTO, WebSolutions",
//       },
//     ],
//     socialLinks: {
//       linkedin: "https://linkedin.com/in/alexjohnson",
//       github: "https://github.com/alexjohnson",
//       twitter: "https://twitter.com/alexjohnson",
//       website: "https://alexjohnson.dev",
//     },
//   }


  

// // Function to handle PDF download
// const handleDownloadPDF = async () => {
//   if (!contentRef.current) return;
  
//   try {
//     // Create a loading state if needed
//     // setIsLoading(true);
    
//     const contentElement = contentRef.current;
    
//     // Use html2canvas to capture the rendered HTML as an image
//     const canvas = await html2canvas(contentElement, {
//       scale: 2, // Higher scale for better quality
//       useCORS: true, // Enable CORS for any images
//       logging: false,
//       windowWidth: contentElement.scrollWidth,
//       windowHeight: contentElement.scrollHeight
//     });
    
//     // Calculate dimensions - A4 is 210mm × 297mm
//     const imgData = canvas.toDataURL('image/png');
//     const pdf = new jsPDF({
//       orientation: 'portrait',
//       unit: 'mm',
//       format: 'a4'
//     });
    
//     const imgWidth = 210; // A4 width in mm
//     const pageHeight = 297; // A4 height in mm
//     const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
//     let heightLeft = imgHeight;
//     let position = 0;
    
//     // Add the image to the PDF (first page)
//     pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
//     heightLeft -= pageHeight;
    
//     // Add new pages if the content is longer than one page
//     while (heightLeft > 0) {
//       position = heightLeft - imgHeight;
//       pdf.addPage();
//       pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
//       heightLeft -= pageHeight;
//     }
    
//     // Save the PDF
//     pdf.save(`portfolio-${activeTheme}.pdf`);
    
//     // Reset loading state if needed
//     // setIsLoading(false);
//   } catch (error) {
//     console.error('Error generating PDF:', error);
//     // setIsLoading(false);
//   }
// };


// useEffect(() => {
//   // Animate preview on load with 200ms delay
//   if (previewRef.current) {
//     setTimeout(() => {
//       gsap.fromTo(
//         previewRef.current,
//         { opacity: 0, scale: 0.95 },
//         { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }
//       )
//     }, 200) // 200ms delay
//   }
// }, []);


//   const handleCopyLink = () => {
//     navigator.clipboard.writeText("https://portfolioai.vercel.app/portfolio/alex-johnson")
//     setCopied(true)
//     setTimeout(() => setCopied(false), 2000)
//   }

//   return (
//     <div className="min-h-screen flex flex-col">
//       <header className="border-b border-divider">
//         <div className="container max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
//           <div className="flex items-center gap-2">
//             <Sparkles className="h-6 w-6 text-primary" />
//             <span className="text-xl font-bold">PortfolioAI</span>
//           </div>
//           <div className="flex items-center gap-4">
//             <Button
//               variant="light"
//               size="sm"
//               onClick={() => router.push("/create")}
//               startContent={<ArrowLeft className="h-4 w-4" />}
//             >
//               Back to Editor
//             </Button>
//             <Button variant="flat" size="sm" startContent={<Edit className="h-4 w-4" />}>
//               Edit Content
//             </Button>
//             <Dropdown>
//               <DropdownTrigger>
//                 <Button color="primary" size="sm" startContent={<Share className="h-4 w-4" />}>
//                   Share
//                 </Button>
//               </DropdownTrigger>
//               <DropdownMenu aria-label="Share options">
//                 <DropdownItem
//                   key="copy"
//                   onClick={handleCopyLink}
//                   startContent={copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
//                 >
//                   {copied ? "Copied!" : "Copy Link"}
//                 </DropdownItem>
//                 <DropdownItem key="download" startContent={<Download className="h-4 w-4" />}>
//                   Download as PDF
//                 </DropdownItem>
//               </DropdownMenu>
//             </Dropdown>
//           </div>
//         </div>
//       </header>

//       <div className="container max-w-7xl mx-auto py-8 flex-1 px-6">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold mb-4">Your Portfolio Preview</h1>
//           <p className="text-default-500">
//             Here's a preview of your portfolio. You can switch between different themes and make final edits before
//             publishing.
//           </p>
//         </div>

//         <div className="flex flex-col md:flex-row gap-8">
//           <div className="w-full md:w-64 space-y-6">
//             <div>
//               <h2 className="text-lg font-medium mb-3 flex items-center">
//                 <Palette className="mr-2 h-5 w-5" />
//                 Choose Theme
//               </h2>
//               <Tabs
//                 aria-label="Theme options"
//                 selectedKey={activeTheme}
//                 onSelectionChange={setActiveTheme}
//                 variant="bordered"
//                 classNames={{
//                   tabList: "flex-col gap-2",
//                   cursor: "w-full bg-primary",
//                 }}
//                 className="w-full"
//               >
//                 {themes.map((theme) => (
//                   <Tab key={theme.id} title={theme.name} />
//                 ))}
//               </Tabs>
//             </div>

//             <div className="space-y-4">
//               <Button color="primary" className="w-full">
//                 Publish Portfolio
//               </Button>
//               <Button 
//                onPress={handleDownloadPDF}
//               variant="bordered" className="w-full" startContent={<Download className="h-4 w-4" />}>
//                 Download PDF
//               </Button>
//               <Button onPress={()=>generateText(userDetails)} color="primary" className="w-full">
//                 Generate Again
//               </Button>
//             </div>
//           </div>

//           <div ref={previewRef} className="flex-1 border rounded-lg overflow-hidden">
//             <div className="bg-default-100 p-2 border-b flex items-center gap-2">
//               <div className="flex gap-1.5">
//                 <div className="w-3 h-3 rounded-full bg-danger"></div>
//                 <div className="w-3 h-3 rounded-full bg-warning"></div>
//                 <div className="w-3 h-3 rounded-full bg-success"></div>
//               </div>
//               <div className="flex-1 text-center text-xs text-default-500">
//                 portfolioai.vercel.app/portfolio/alex-johnson
//               </div>
//             </div>
//             <div  className="bg-background p-4 h-[600px] overflow-y-auto">
//             <div ref={contentRef} dangerouslySetInnerHTML={{ __html: responsedata || "" }} />
//               {/* <PortfolioPreview data={portfolioData} theme={activeTheme} /> */}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

