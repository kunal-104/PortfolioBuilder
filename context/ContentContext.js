"use client"; // Ensure it's client-side
import { createContext, useContext, useState, useEffect } from "react";

// Create Context
const ContentContext = createContext();

// Provider Component
export const ContentProvider = ({ children, User }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [category, setCategory] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(User);
  const [formsData, setFormsData] = useState({
    personalInfo: {},
    professionalSummary: {},
    workExperience: [],
    education: [],
    projects: [],
    testimonials: [],
    socialLinks: {},
  });
  const [step2data, setStep2Data] = useState(
    {
      objective: "",
      skills: []
    }
  );

  const [step3data, setStep3Data] = useState([]);
  const [step4data, setStep4Data] = useState([]);
  const [step5data, setStep5Data] = useState([]);
  const [step6data, setStep6Data] = useState({
    references: [],
    testimonials: [],
  });
  const [step7data, setStep7Data] = useState({
 });
  return (
    <ContentContext.Provider
      value={{
        user,
        title,
        setTitle,
        description,
        setDescription,
        tags,
        setTags,
        category,
        setCategory,
        videoURL,
        setVideoURL,
        isLoggedIn, 
        setIsLoggedIn,
        setFormsData,
        setStep2Data,
        setStep3Data,
        setStep4Data,
        setStep5Data,
        setStep6Data,
        setStep7Data,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

// Custom hook to use Context
export const useContent = () => {
  return useContext(ContentContext);
};
