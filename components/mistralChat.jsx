import React, { useState } from "react";
import { getMistralResponse } from "../utils/mistralApi";

const PortfolioGenerator = () => {
  const [response, setResponse] = useState("");

  const handleGenerate = async () => {
    console.log("clicked");
    const userDetails = {
      name: "John Doe",
      jobTitle: "Full Stack Developer",
      bio: "Passionate about building scalable web applications.",
      education: "B.Sc. Computer Science, XYZ University",
      skills: ["JavaScript", "React", "Next.js", "Tailwind CSS"],
      projects: [
        { name: "Portfolio Website", description: "Personal portfolio", link: "https://johndoe.com" }
      ],
      contact: { email: "john@example.com", linkedIn: "linkedin.com/in/johndoe" }
    };

    const htmlResponse = await getMistralResponse(userDetails);
    setResponse(htmlResponse);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Portfolio Generator</h2>
      <button
        onClick={handleGenerate}
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Generate Portfolio
      </button>

      <div className="mt-6 border border-gray-300 p-4 rounded-md">
        <h3 className="text-lg font-semibold mb-2">Generated Portfolio:</h3>
        <div dangerouslySetInnerHTML={{ __html: response }} />
      </div>
    </div>
  );
};

export default PortfolioGenerator;


// import React, { useState } from "react";
// import { getMistralResponse } from "../utils/mistralApi";

// const MistralChat = () => {
//   const [input, setInput] = useState("");
//   const [response, setResponse] = useState("");

//   const handleSend = async () => {
//     const userDetails = {
//       name: "John Doe",
//       jobTitle: "Full Stack Developer",
//       bio: "Passionate about building scalable web applications.",
//       education: "B.Sc. Computer Science, XYZ University",
//       skills: ["JavaScript", "React", "Next.js", "Tailwind CSS"],
//       projects: [
//         { name: "Portfolio Website", description: "Personal portfolio", link: "https://johndoe.com" }
//       ],
//       contact: { email: "john@example.com", linkedIn: "linkedin.com/in/johndoe" }
//     };

//     const generatedComponent = await getMistralResponse(userDetails);
//     setResponse(generatedComponent);
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Mistral AI Chat</h2>
//       <button
//         onClick={handleSend}
//         className="px-4 py-2 bg-blue-500 text-white rounded-md"
//       >
//         Generate Portfolio
//       </button>

//       <div className="mt-6 border border-gray-300 p-4 rounded-md">
//         <h3 className="text-lg font-semibold mb-2">Generated Portfolio:</h3>
//         <div dangerouslySetInnerHTML={{ __html: response }} />
//       </div>
//     </div>
//   );
// };

// export default MistralChat;








// import React, { useState } from "react";
// import { getMistralResponse } from "../utils/mistralApi";
// import { jsx } from "react/jsx-runtime";

// const MistralChat = () => {
//   const [portfolioComponent, setPortfolioComponent] = useState("");

//   const handleGeneratePortfolio = async () => {
//     const userDetails = {
//       name: "John Doe",
//       title: "Full Stack Developer",
//       bio: "Passionate developer with expertise in React, Next.js, and Tailwind CSS.",
//       education: [
//         { degree: "B.Sc. Computer Science", school: "XYZ University", year: "2022" },
//       ],
//       skills: ["JavaScript", "React", "Next.js", "Tailwind CSS"],
//       projects: [
//         { name: "Portfolio Website", description: "Personal portfolio built with Next.js", link: "https://johndoe.com" },
//       ],
//       contact: { email: "john@example.com", linkedin: "linkedin.com/in/johndoe" }
//     };

//     const jsxComponent = await getMistralResponse(userDetails);
//     console.log("jsxjsx:: ", jsxComponent);
//     setPortfolioComponent(jsxComponent);

//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Generate Portfolio</h2>
//       <button 
//         onClick={handleGeneratePortfolio} 
//         className="px-4 py-2 bg-blue-500 text-white rounded"
//       >
//         Generate Portfolio Component
//       </button>
//       <div className="mt-6">
//         <h3 className="text-xl font-semibold mb-2">Generated Component:</h3>
//         <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
//           {portfolioComponent}
//         </pre>
//       </div>
//     </div>
//   );
// };

// export default MistralChat;






// import React, { useState } from "react";
// import { getMistralResponse } from "../utils/mistralApi";
// // 
// const MistralChat = () => {
//   const [input, setInput] = useState("");
//   const [response, setResponse] = useState("");

//   const handleSend = async () => {
//     if (!input.trim()) return;
//     const reply = await getMistralResponse(input);
//     setResponse(reply);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
//       <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
//         <h2 className="text-xl font-semibold text-center mb-4">Mistral AI Chat</h2>
        
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Ask something..."
//           className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />
        
//         <button 
//           onClick={handleSend}
//           className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition"
//         >
//           Send
//         </button>
        
//         {response && (
//           <div className="mt-4 p-3 bg-gray-200 rounded-lg">
//             <p className="text-gray-700"><strong>Response:</strong> {response}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MistralChat;
