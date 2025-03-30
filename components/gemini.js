import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyCtcXpKqIpyp2rd2Felgq2d8GEK90oVLQI";
const genAI = new GoogleGenerativeAI(API_KEY);

export async function generateText(userDetails) {
  const prompt = `
Generate a **visually stunning, premium-quality professional portfolio page** using **ONLY pure HTML and CSS** (no JavaScript, no Tailwind, no external libraries or frameworks).

### 🌟 DESIGN PRINCIPLES:
- Implement a **pixel-perfect, magazine-style layout** with exquisite attention to detail
- Create a **deeply immersive visual hierarchy** that guides the eye naturally
- Use **purposeful white space** to create breathing room and emphasize important elements
- Apply **sophisticated micro-interactions** and subtle animations using pure CSS
- Ensure **impeccable typography** with perfect line height, letter spacing, and font pairing
- Design with a **consistent visual language** throughout all components

### 📱 RESPONSIVE REQUIREMENTS:
- Implement a **true mobile-first approach** with progressive enhancement
- Create **distinct breakpoint experiences** for mobile (320-480px), tablet (481-1024px), and desktop (1025px+)
- Use **fluid typography** that scales proportionally across all screen sizes
- Ensure **touch-friendly tap targets** (minimum 44×44px) on mobile devices
- Implement **strategic content reordering** for different device contexts

### 🎨 COLOR & STYLING:
- Use a **refined color palette** with primary, secondary, accent, and neutral tones
- Implement **elegant color transitions** between sections
- Apply **subtle gradients** for depth without appearing dated
- Ensure **WCAG AA+ color contrast** for exceptional readability
- Use **strategic shadows and highlights** to create depth

### 📐 LAYOUT SPECIFICATIONS:
- Implement an **asymmetric grid system** for visual interest
- Use **CSS Grid for main layout** and **Flexbox for component alignment**
- Create **intentional negative space** to frame content areas
- Apply **golden ratio proportions** (1:1.618) where appropriate
- Implement **scroll-triggered CSS animations** on section entry

### 📄 REQUIRED SECTIONS:
1. **Hero Section**
   - Full viewport height with gradient background
   - Professional headshot with subtle border animation
   - Bold, attention-grabbing headline with profession
   - Brief tagline that captures expertise
   - Smooth scroll call-to-action to next section

2. **About Section**
   - Two-column layout (desktop) with image and bio
   - Use https://static.vecteezy.com/system/resources/previews/037/336/395/non_2x/user-profile-flat-illustration-avatar-person-icon-gender-neutral-silhouette-profile-picture-free-vector.jpg online profile image for portfolio profile picture
   - Custom styled bullet points for key achievements
   - Eye-catching pull quotes or testimonials
   - Careful paragraph spacing for maximum readability
   - Background pattern or texture for visual interest

3. **Skills Section**
   - Interactive skill bars or hexagonal skill grid
   - Organized skill categories with visual differentiation
   - Progress indicators with custom styling
   - Clean visual hierarchy between skill types
   - Strategic use of icons to represent skill areas

4. **Portfolio/Projects**
   - Masonry grid layout for project thumbnails
   - Custom hover states with project details overlay
   - Consistent card styling with elegant shadows
   - Featured project highlighting with special treatment
   - Visual indicators for project categories

5. **Testimonials**
   - Custom styled quotation marks and testimonial cards
   - Avatar presentation with circular cropping and border
   - Company logos with appropriate styling
   - Star ratings with custom CSS implementation
   - Elegant typography for attribution

6. **Contact Section**
   - Visually engaging contact form styling (for display purposes)
   - Social media links with unique hover effects
   - Contact details with subtle icon integration
   - Map or location styling if applicable
   - Final call-to-action with emphasized styling

### 👨‍💻 USER DETAILS FOR PERSONALIZATION:
${JSON.stringify(userDetails, null, 2)}

### ⚠️ CRITICAL REQUIREMENTS:
- Return ONLY a complete, valid HTML document with embedded CSS in <style> tags
- Do NOT use any external resources, CDNs, or frameworks
- Do NOT include any JavaScript whatsoever
- Implement ONLY pure CSS animations and transitions
- Include thorough CSS resets and normalization
- Ensure the code functions correctly in all modern browsers
- Implement proper meta tags for SEO and viewport configuration
- Use semantic HTML5 elements throughout (header, nav, section, article, etc.)
- Ensure valid HTML structure with proper indentation
- Do NOT provide commentary, explanation or markdown - ONLY output the HTML/CSS code
- Do not give any text message, other than the HTML/CSS code
- Dont give any note or caution, only provide html css code
-use this template and fill the user details in the template and you can use different color patterns and styles but the template should be same and the content should be same as the user details provided:
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Portfolio</title>
</head>
<body style="font-family: 'Helvetica Neue', Arial, sans-serif; margin: 0; padding: 0; color: #333; line-height: 1.6; background-color: #f5f5f5;">
    <!-- Header Section -->
    <header style="background-color: #2c3e50; color: white; padding: 100px 0 60px; text-align: center;">
        <div style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
            <h1 style="font-size: 48px; margin-bottom: 16px; font-weight: 700;">Your Name</h1>
            <p style="font-size: 24px; margin: 0; opacity: 0.9;">Web Developer & Designer</p>
            <div style="margin-top: 30px;">
                <a href="#contact" style="display: inline-block; background-color: #3498db; color: white; padding: 12px 30px; text-decoration: none; border-radius: 4px; font-weight: 600; margin-right: 10px; transition: background-color 0.3s;">Contact Me</a>
                <a href="#projects" style="display: inline-block; background-color: transparent; color: white; padding: 12px 30px; text-decoration: none; border: 2px solid white; border-radius: 4px; font-weight: 600; transition: background-color 0.3s, color 0.3s;">View Work</a>
            </div>
        </div>
    </header>

    <!-- About Section -->
    <section style="padding: 80px 0; background-color: white;">
        <div style="max-width: 1000px; margin: 0 auto; padding: 0 20px;">
            <h2 style="font-size: 36px; margin-bottom: 20px; text-align: center; color: #2c3e50;">About Me</h2>
            <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between;">
                <div style="flex: 1; min-width: 300px; padding: 20px;">
                    <img src="/api/placeholder/400/400" alt="Profile Photo" style="width: 100%; max-width: 350px; border-radius: 50%; display: block; margin: 0 auto;">
                </div>
                <div style="flex: 2; min-width: 300px; padding: 20px;">
                    <p style="font-size: 18px; margin-bottom: 20px;">Hello! I'm a passionate web developer and designer with expertise in creating beautiful, functional websites. I focus on clean code, responsive design, and user experience that makes an impact.</p>
                    <p style="font-size: 18px; margin-bottom: 20px;">With over 5 years of experience in the industry, I've worked with various clients from startups to established businesses, helping them achieve their digital goals.</p>
                    <div style="margin-top: 30px;">
                        <a href="#" style="display: inline-block; background-color: #2c3e50; color: white; padding: 12px 30px; text-decoration: none; border-radius: 4px; font-weight: 600; margin-right: 10px;">Download Resume</a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Skills Section -->
    <section style="padding: 80px 0; background-color: #f9f9f9;">
        <div style="max-width: 1000px; margin: 0 auto; padding: 0 20px;">
            <h2 style="font-size: 36px; margin-bottom: 50px; text-align: center; color: #2c3e50;">My Skills</h2>
            <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 40px;">
                <div style="text-align: center; width: 150px;">
                    <div style="background-color: #3498db; width: 100px; height: 100px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto; color: white; font-size: 36px;">
                        HTML
                    </div>
                    <h3 style="margin-top: 15px; font-size: 18px;">HTML5</h3>
                </div>
                <div style="text-align: center; width: 150px;">
                    <div style="background-color: #e74c3c; width: 100px; height: 100px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto; color: white; font-size: 36px;">
                        CSS
                    </div>
                    <h3 style="margin-top: 15px; font-size: 18px;">CSS3</h3>
                </div>
                <div style="text-align: center; width: 150px;">
                    <div style="background-color: #f1c40f; width: 100px; height: 100px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto; color: white; font-size: 36px;">
                        JS
                    </div>
                    <h3 style="margin-top: 15px; font-size: 18px;">JavaScript</h3>
                </div>
                <div style="text-align: center; width: 150px;">
                    <div style="background-color: #27ae60; width: 100px; height: 100px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto; color: white; font-size: 36px;">
                        React
                    </div>
                    <h3 style="margin-top: 15px; font-size: 18px;">React</h3>
                </div>
                <div style="text-align: center; width: 150px;">
                    <div style="background-color: #9b59b6; width: 100px; height: 100px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto; color: white; font-size: 36px;">
                        UI/UX
                    </div>
                    <h3 style="margin-top: 15px; font-size: 18px;">UI/UX Design</h3>
                </div>
            </div>
        </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" style="padding: 80px 0; background-color: white;">
        <div style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
            <h2 style="font-size: 36px; margin-bottom: 20px; text-align: center; color: #2c3e50;">My Projects</h2>
            <p style="text-align: center; margin-bottom: 50px; max-width: 700px; margin-left: auto; margin-right: auto; color: #7f8c8d;">Here are some of my recent projects. Each one represents a unique challenge and solution.</p>
            
            <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 30px;">
                <!-- Project 1 -->
                <div style="width: 100%; max-width: 350px; background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1); transition: transform 0.3s;">
                    <img src="https://assets-global.website-files.com/637e5892fb4b6db88a62cc0a/65bbe1bcdb9598ba3b2104ef_project.jpg" alt="Project 1" style="width: 100%; height: 200px; object-fit: cover;">
                    <div style="padding: 25px;">
                        <h3 style="margin-top: 0; color: #2c3e50; font-size: 22px;">E-commerce Website</h3>
                        <p style="color: #7f8c8d; margin-bottom: 20px;">A fully responsive e-commerce website with user authentication and payment processing.</p>
                        <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                            <span style="background-color: #eee; padding: 5px 10px; border-radius: 30px; font-size: 14px;">React</span>
                            <span style="background-color: #eee; padding: 5px 10px; border-radius: 30px; font-size: 14px;">Node.js</span>
                            <span style="background-color: #eee; padding: 5px 10px; border-radius: 30px; font-size: 14px;">MongoDB</span>
                        </div>
                        <a href="#" style="color: #3498db; text-decoration: none; font-weight: 600; display: inline-block;">View Project →</a>
                    </div>
                </div>

                <!-- Project 2 -->
                <div style="width: 100%; max-width: 350px; background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1); transition: transform 0.3s;">
                    <img src="https://assets-global.website-files.com/637e5892fb4b6db88a62cc0a/65bbe1bcdb9598ba3b2104ef_project.jpg" alt="Project 2" style="width: 100%; height: 200px; object-fit: cover;">
                    <div style="padding: 25px;">
                        <h3 style="margin-top: 0; color: #2c3e50; font-size: 22px;">Portfolio Website</h3>
                        <p style="color: #7f8c8d; margin-bottom: 20px;">A custom portfolio website for a photographer with gallery features and contact form.</p>
                        <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                            <span style="background-color: #eee; padding: 5px 10px; border-radius: 30px; font-size: 14px;">HTML5</span>
                            <span style="background-color: #eee; padding: 5px 10px; border-radius: 30px; font-size: 14px;">CSS3</span>
                            <span style="background-color: #eee; padding: 5px 10px; border-radius: 30px; font-size: 14px;">JavaScript</span>
                        </div>
                        <a href="#" style="color: #3498db; text-decoration: none; font-weight: 600; display: inline-block;">View Project →</a>
                    </div>
                </div>

                <!-- Project 3 -->
                <div style="width: 100%; max-width: 350px; background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1); transition: transform 0.3s;">
                    <img src="https://assets-global.website-files.com/637e5892fb4b6db88a62cc0a/65bbe1bcdb9598ba3b2104ef_project.jpg" alt="Project 3" style="width: 100%; height: 200px; object-fit: cover;">
                    <div style="padding: 25px;">
                        <h3 style="margin-top: 0; color: #2c3e50; font-size: 22px;">Task Management App</h3>
                        <p style="color: #7f8c8d; margin-bottom: 20px;">A task management application with user accounts, task categories, and reminder notifications.</p>
                        <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                            <span style="background-color: #eee; padding: 5px 10px; border-radius: 30px; font-size: 14px;">React</span>
                            <span style="background-color: #eee; padding: 5px 10px; border-radius: 30px; font-size: 14px;">Firebase</span>
                            <span style="background-color: #eee; padding: 5px 10px; border-radius: 30px; font-size: 14px;">CSS</span>
                        </div>
                        <a href="#" style="color: #3498db; text-decoration: none; font-weight: 600; display: inline-block;">View Project →</a>
                    </div>
                </div>
            </div>
            
            <div style="text-align: center; margin-top: 50px;">
                <a href="#" style="display: inline-block; background-color: #2c3e50; color: white; padding: 12px 30px; text-decoration: none; border-radius: 4px; font-weight: 600;">View All Projects</a>
            </div>
        </div>
    </section>

    <!-- Testimonials Section -->
    <section style="padding: 80px 0; background-color: #2c3e50; color: white;">
        <div style="max-width: 1000px; margin: 0 auto; padding: 0 20px;">
            <h2 style="font-size: 36px; margin-bottom: 50px; text-align: center;">What Clients Say</h2>
            <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 30px;">
                <!-- Testimonial 1 -->
                <div style="width: 100%; max-width: 450px; padding: 30px; background-color: rgba(255,255,255,0.1); border-radius: 8px;">
                    <p style="font-style: italic; margin-bottom: 20px; font-size: 18px;">"Working with this developer was a fantastic experience. They delivered the project on time and exceeded our expectations with the final product."</p>
                    <div style="display: flex; align-items: center;">
                        <img src="/api/placeholder/60/60" alt="Client" style="width: 60px; height: 60px; border-radius: 50%; margin-right: 15px;">
                        <div>
                            <h4 style="margin: 0; font-size: 18px;">Jane Smith</h4>
                            <p style="margin: 0; opacity: 0.7;">CEO at TechStart</p>
                        </div>
                    </div>
                </div>
                
                <!-- Testimonial 2 -->
                <div style="width: 100%; max-width: 450px; padding: 30px; background-color: rgba(255,255,255,0.1); border-radius: 8px;">
                    <p style="font-style: italic; margin-bottom: 20px; font-size: 18px;">"Incredibly talented and professional. Their attention to detail and creative solutions helped our business grow significantly."</p>
                    <div style="display: flex; align-items: center;">
                        <img src="/api/placeholder/60/60" alt="Client" style="width: 60px; height: 60px; border-radius: 50%; margin-right: 15px;">
                        <div>
                            <h4 style="margin: 0; font-size: 18px;">John Davis</h4>
                            <p style="margin: 0; opacity: 0.7;">Marketing Director</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" style="padding: 80px 0; background-color: white;">
        <div style="max-width: 800px; margin: 0 auto; padding: 0 20px;">
            <h2 style="font-size: 36px; margin-bottom: 20px; text-align: center; color: #2c3e50;">Get In Touch</h2>
            <p style="text-align: center; margin-bottom: 40px; max-width: 600px; margin-left: auto; margin-right: auto; color: #7f8c8d;">Have a project in mind or want to know more? Feel free to reach out!</p>
            
            <form style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div style="grid-column: span 1;">
                    <label for="name" style="display: block; margin-bottom: 8px; font-weight: 500; color: #2c3e50;">Name</label>
                    <input type="text" id="name" style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 4px; font-size: 16px;">
                </div>
                <div style="grid-column: span 1;">
                    <label for="email" style="display: block; margin-bottom: 8px; font-weight: 500; color: #2c3e50;">Email</label>
                    <input type="email" id="email" style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 4px; font-size: 16px;">
                </div>
                <div style="grid-column: span 2;">
                    <label for="subject" style="display: block; margin-bottom: 8px; font-weight: 500; color: #2c3e50;">Subject</label>
                    <input type="text" id="subject" style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 4px; font-size: a16px;">
                </div>
                <div style="grid-column: span 2;">
                    <label for="message" style="display: block; margin-bottom: 8px; font-weight: 500; color: #2c3e50;">Message</label>
                    <textarea id="message" rows="6" style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 4px; font-size: 16px; resize: vertical;"></textarea>
                </div>
                <div style="grid-column: span 2; text-align: center; margin-top: 20px;">
                    <button type="submit" style="background-color: #3498db; color: white; border: none; padding: 14px 30px; font-size: 16px; border-radius: 4px; cursor: pointer; font-weight: 600; transition: background-color 0.3s;">Send Message</button>
                </div>
            </form>
        </div>
    </section>

    <!-- Footer -->
    <footer style="background-color: #2c3e50; color: white; padding: 50px 0 20px;">
        <div style="max-width: 1200px; margin: 0 auto; padding: 0 20px; display: flex; flex-wrap: wrap; justify-content: space-between;">
            <div style="flex: 1; min-width: 250px; margin-bottom: 30px;">
                <h3 style="font-size: 24px; margin-bottom: 20px;">Your Name</h3>
                <p style="opacity: 0.8; line-height: 1.8;">A passionate web developer focused on creating beautiful and functional websites.</p>
            </div>
            <div style="flex: 1; min-width: 250px; margin-bottom: 30px;">
                <h3 style="font-size: 20px; margin-bottom: 20px;">Contact</h3>
                <p style="margin-bottom: 10px; opacity: 0.8;"><strong>Email:</strong> your.email@example.com</p>
                <p style="margin-bottom: 10px; opacity: 0.8;"><strong>Phone:</strong> +1 (555) 123-4567</p>
                <p style="opacity: 0.8;"><strong>Location:</strong> San Francisco, CA</p>
            </div>
            <div style="flex: 1; min-width: 250px; margin-bottom: 30px;">
                <h3 style="font-size: 20px; margin-bottom: 20px;">Follow Me</h3>
                <div style="display: flex; gap: 15px;">
                    <a href="#" style="color: white; font-size: 24px; opacity: 0.8; transition: opacity 0.3s;">GitHub</a>
                    <a href="#" style="color: white; font-size: 24px; opacity: 0.8; transition: opacity 0.3s;">LinkedIn</a>
                    <a href="#" style="color: white; font-size: 24px; opacity: 0.8; transition: opacity 0.3s;">Twitter</a>
                </div>
            </div>
        </div>
        <div style="max-width: 1200px; margin: 0 auto; padding: 20px; text-align: center; opacity: 0.6; border-top: 1px solid rgba(255,255,255,0.1); margin-top: 30px;">
            <p>© 2025 Your Name. All Rights Reserved.</p>
        </div>
    </footer>

    <script>
        // Simple JavaScript to add some interactivity
        document.addEventListener('DOMContentLoaded', function() {
            // Smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    document.querySelector(this.getAttribute('href')).scrollIntoView({
                        behavior: 'smooth'
                    });
                });
            });

            // Add hover effect to project cards
            const projectCards = document.querySelectorAll('#projects [style*="max-width: 350px"]');
            projectCards.forEach(card => {
                card.addEventListener('mouseenter', () => {
                    card.style.transform = 'translateY(-10px)';
                });
                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'translateY(0)';
                });
            });
        });
    </script>
</body>
</html>

### 📈 CODE QUALITY STANDARDS:
- Maintain BEM (Block Element Modifier) naming convention for all CSS classes
- Include appropriate CSS custom properties (variables) for colors, spacing, etc.
- Implement proper fallbacks for advanced CSS features
- Ensure clean, maintainable code structure
- Use descriptive class names that reflect component purpose
- Implement a logical CSS organization (reset, typography, layout, components)
`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        topP: 0.9,
        topK: 40,
        maxOutputTokens: 8192,
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
      ],
    });
    
    return result.response.text();
  } catch (error) {
    console.error("Error generating response:", error);
    return "Error fetching response from Gemini API.";
  }
}

// import { GoogleGenerativeAI } from "@google/generative-ai";

// const API_KEY = "AIzaSyCtcXpKqIpyp2rd2Felgq2d8GEK90oVLQI";
// const genAI = new GoogleGenerativeAI(API_KEY);

// export async function generateText(userDetails) {
//   const prompt = `
// Generate a **visually appealing, modern, and highly professional portfolio page** using **pure HTML and CSS only** (no Tailwind, no external libraries).  

// ### **✨ Design & Layout Requirements:**  
// - **Full-screen, minimalistic, and well-structured design** covering the entire viewport  
// - **Responsive layout using CSS media queries** for mobile, tablet, and desktop  
// - **Balanced typography, whitespace, and alignment** for a polished look  
// - **Subtle hover effects, smooth transitions, and clean UI**  
// - **Professional color palette with soft gradients and contrast**  

// ### **🎨 Sections to Include:**  
// 1️⃣ **Header (Full Name, Profile Picture, Job Title)** – Centered & elegantly styled  
// 2️⃣ **About Section (Professional Bio)** – Clean, readable font with appropriate spacing  
// 3️⃣ **Skills Section (Badges or Cards)** – Grid/Flexbox layout with hover effects  
// 4️⃣ **Projects (Title, Description, Link)** – Neatly arranged with card-style hover effects  
// 5️⃣ **Contact (Email, LinkedIn, GitHub, etc.)** – Icons with stylish links  

// ### **🎨 Styling Guidelines:**  
// - **Use CSS Grid and Flexbox** for alignment and spacing  
// - **Apply a modern color palette** (e.g., deep blues, grays, and soft gradients)  
// - **Ensure smooth transitions & hover effects** (e.g., opacity, slight scaling)  
// - **Use CSS media queries** to adapt to mobile, tablet, and desktop  
// - **Ensure a full-screen experience** using \`height: 100vh;\`  

// ### **📌 User Data for Personalization:**  
// ${JSON.stringify(userDetails, null, 2)}

// ### **⚠️ Important Rules:**  
// - **Return only a valid HTML document** with inline or embedded CSS  
// - **Do NOT use JavaScript, Tailwind CSS, or any external framework**  
// - **No additional comments or explanations**  
// `;

//   try {
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//     const result = await model.generateContent({ contents: [{ parts: [{ text: prompt }] }] });
//     return result.response.candidates[0]?.content?.parts[0]?.text || "No response received.";
//   } catch (error) {
//     console.error("Error generating response:", error);
//     return "Error fetching response.";
//   }
// }








// import { GoogleGenerativeAI } from "@google/generative-ai";

// // const API_KEY = "AIzaSyBXEmoFfIdzhs262NAqjYtlqtrc4TbJlDU"; 
// // mistral key= hmvmCepE1cLLBd2V75RdaVE14GMouWZK
// const API_KEY = "AIzaSyCtcXpKqIpyp2rd2Felgq2d8GEK90oVLQI";
// const genAI = new GoogleGenerativeAI(API_KEY);

// export async function generateText(prompt) {
//   try {
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//     // const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
//     const result = await model.generateContent({ contents: [{ parts: [{ text: prompt }] }] });
//     // return result.response.text();
//     return result.response.candidates[0]?.content?.parts[0]?.text || "No response received.";
//   } catch (error) {
//     console.error("Error generating response:", error);
//     return "Error fetching response.";
//   }
// }
