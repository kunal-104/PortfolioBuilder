"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, Bot, User, Sparkles } from "lucide-react";
import { Button, Input, Card, CardBody, CardHeader, CardFooter } from "@nextui-org/react";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Move API configuration outside the component
const API_KEY = "AIzaSyCtcXpKqIpyp2rd2Felgq2d8GEK90oVLQI";
const genAI = new GoogleGenerativeAI(API_KEY);

// Move generateText function outside the component
async function generateText(userInput) {
  const prompt = `
    reply in context of helping in writing good quality of data in a portfolio, and keep the reply in less than 50 words in normal talk
    ${JSON.stringify({ userInput }, null, 2)}
  `;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent({ contents: [{ parts: [{ text: prompt }] }] });
    return result.response.text() || "No response received.";
  } catch (error) {
    console.error("Error generating response:", error);
    return "Error fetching response.";
  }
}

export default function AIChatbot({ onClose }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi there! I'm your AI assistant. I can help you create a better portfolio. What would you like help with?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: input }]);

    // Clear input
    setInput("");

    // Set loading state
    setIsLoading(true);

    try {
      // Call Gemini API with just the input text
      const response = await generateText(input);
      
      // Add AI response to chat
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, I encountered an error. Please try again." }]);
    }

    // Remove loading state
    setIsLoading(false);
  };

  return (
    <Card className="fixed bottom-4 right-4 w-80 md:w-96 h-96 shadow-lg flex flex-col z-50">
      <CardHeader className="py-3 px-4 border-b flex flex-row items-center justify-between">
        <div className="flex items-center">
          <Sparkles className="h-5 w-5 text-primary mr-2" />
          <h3 className="font-medium">AI Assistant</h3>
        </div>
        <Button isIconOnly variant="light" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </CardHeader>
      <CardBody className="p-4 overflow-y-auto flex-1">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}>
              <div
                className={`flex items-start gap-2 max-w-[80%] ${
                  message.role === "assistant" ? "flex-row" : "flex-row-reverse"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === "assistant" ? "bg-primary/10" : "bg-default-100"
                  }`}
                >
                  {message.role === "assistant" ? (
                    <Bot className="h-4 w-4 text-primary" />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                </div>
                <div
                  className={`p-3 rounded-lg ${
                    message.role === "assistant" ? "bg-default-100" : "bg-primary text-white"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-start gap-2 max-w-[80%]">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="p-3 rounded-lg bg-default-100">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-default-400 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="w-2 h-2 rounded-full bg-default-400 animate-bounce" style={{ animationDelay: "150ms" }}></div>
                    <div className="w-2 h-2 rounded-full bg-default-400 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </CardBody>
      <CardFooter className="p-3 border-t">
        <form onSubmit={handleSendMessage} className="flex w-full gap-2">
          <Input
            placeholder="Ask for portfolio advice..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" isIconOnly color="primary" isDisabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}


// "use client"

// import { useState, useRef, useEffect } from "react"
// import { X, Send, Bot, User, Sparkles } from "lucide-react"
// import { Button, Input, Card, CardBody, CardHeader, CardFooter } from "@nextui-org/react"

// export default function AIChatbot({ onClose }) {
//   const [messages, setMessages] = useState([
//     {
//       role: "assistant",
//       content:
//         "Hi there! I'm your AI assistant. I can help you create a better portfolio. What would you like help with?",
//     },
//   ])
//   const [input, setInput] = useState("")
//   const [isLoading, setIsLoading] = useState(false)
//   const messagesEndRef = useRef(null)

//   useEffect(() => {
//     scrollToBottom()
//   }, [messages])

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
//   }

//   const handleSendMessage = (e) => {
//     e.preventDefault()
//     if (!input.trim()) return

//     // Add user message
//     setMessages((prev) => [...prev, { role: "user", content: input }])

//     // Clear input
//     setInput("")

//     // Simulate AI response
//     setIsLoading(true)
//     setTimeout(() => {
//       let response

//       if (input.toLowerCase().includes("bio") || input.toLowerCase().includes("about me")) {
//         response =
//           "For a great bio, focus on your unique value proposition. Start with your current role, then highlight your expertise, achievements, and what drives you professionally. Keep it concise (3-5 sentences) and add a personal touch at the end."
//       } else if (input.toLowerCase().includes("project") || input.toLowerCase().includes("portfolio")) {
//         response =
//           "When describing projects, use this structure: 1) Problem you solved, 2) Your approach/solution, 3) Technologies used, 4) Results/impact. Quantify achievements when possible (e.g., 'Increased performance by 40%')."
//       } else if (input.toLowerCase().includes("skill")) {
//         response =
//           "For your skills section, prioritize relevance over quantity. List your strongest technical skills first, followed by soft skills. Consider grouping them by category (e.g., 'Frontend', 'Backend', 'Design') for better readability."
//       } else if (input.toLowerCase().includes("experience") || input.toLowerCase().includes("job")) {
//         response =
//           "When describing work experience, focus on achievements rather than responsibilities. Use action verbs and quantify results when possible. For example, instead of 'Responsible for website maintenance', write 'Optimized website performance, reducing load time by 30%'."
//       } else {
//         response =
//           "I'd be happy to help with that! Could you provide more details about what specific aspect of your portfolio you'd like assistance with?"
//       }

//       setMessages((prev) => [...prev, { role: "assistant", content: response }])
//       setIsLoading(false)
//     }, 1000)
//   }

//   return (
//     <Card className="fixed bottom-4 right-4 w-80 md:w-96 h-96 shadow-lg flex flex-col z-50">
//       <CardHeader className="py-3 px-4 border-b flex flex-row items-center justify-between">
//         <div className="flex items-center">
//           <Sparkles className="h-5 w-5 text-primary mr-2" />
//           <h3 className="font-medium">AI Assistant</h3>
//         </div>
//         <Button isIconOnly variant="light" size="sm" onClick={onClose}>
//           <X className="h-4 w-4" />
//           <span className="sr-only">Close</span>
//         </Button>
//       </CardHeader>
//       <CardBody className="p-4 overflow-y-auto flex-1">
//         <div className="space-y-4">
//           {messages.map((message, index) => (
//             <div key={index} className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}>
//               <div
//                 className={`flex items-start gap-2 max-w-[80%] ${
//                   message.role === "assistant" ? "flex-row" : "flex-row-reverse"
//                 }`}
//               >
//                 <div
//                   className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
//                     message.role === "assistant" ? "bg-primary/10" : "bg-default-100"
//                   }`}
//                 >
//                   {message.role === "assistant" ? (
//                     <Bot className="h-4 w-4 text-primary" />
//                   ) : (
//                     <User className="h-4 w-4" />
//                   )}
//                 </div>
//                 <div
//                   className={`p-3 rounded-lg ${
//                     message.role === "assistant" ? "bg-default-100" : "bg-primary text-white"
//                   }`}
//                 >
//                   <p className="text-sm">{message.content}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//           {isLoading && (
//             <div className="flex justify-start">
//               <div className="flex items-start gap-2 max-w-[80%]">
//                 <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
//                   <Bot className="h-4 w-4 text-primary" />
//                 </div>
//                 <div className="p-3 rounded-lg bg-default-100">
//                   <div className="flex space-x-1">
//                     <div
//                       className="w-2 h-2 rounded-full bg-default-400 animate-bounce"
//                       style={{ animationDelay: "0ms" }}
//                     ></div>
//                     <div
//                       className="w-2 h-2 rounded-full bg-default-400 animate-bounce"
//                       style={{ animationDelay: "150ms" }}
//                     ></div>
//                     <div
//                       className="w-2 h-2 rounded-full bg-default-400 animate-bounce"
//                       style={{ animationDelay: "300ms" }}
//                     ></div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//           <div ref={messagesEndRef} />
//         </div>
//       </CardBody>
//       <CardFooter className="p-3 border-t">
//         <form onSubmit={handleSendMessage} className="flex w-full gap-2">
//           <Input
//             placeholder="Ask for portfolio advice..."
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             disabled={isLoading}
//             className="flex-1"
//           />
//           <Button type="submit" isIconOnly color="primary" isDisabled={isLoading || !input.trim()}>
//             <Send className="h-4 w-4" />
//           </Button>
//         </form>
//       </CardFooter>
//     </Card>
//   )
// }

