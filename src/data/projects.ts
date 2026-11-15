export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  demoUrl?: string;
  imagePath: string;
  features: string[];
  challenges: string[];
  solutions: string[];
  screenshots?: string[];
  category?: string;
}

export const projects: Project[] = [
  {
    "id": "1",
    "title": "NLP-to-SQL Database Management System",
    "category": "AI-Powered Full Stack Application",
    "description": "Built a natural-language interface that enables users to query and modify SQL databases using plain English. Developed a FastAPI backend with REST endpoints and a React + Vite frontend. Integrated Google Gemini API and supported multiple database contexts.",
    "tags": [
      "Python",
      "FastAPI",
      "React",
      "Vite",
      "PostgreSQL",
      "SQLite",
      "REST APIs",
      "JWT",
      "Google Gemini API"
    ],
    "githubUrl": "https://github.com/K-Santhoshkumar/Excel-Analysis-Platform",
    "demoUrl": "",
    "imagePath": "/NLP_to_SQL_Database_Management_System_Screenshots/Screenshot 01.png",
    "features": [
      "Plain-English natural language conversion to parameterized, syntactically verified SQL queries",
      "Automated database schema extraction and dynamic dialect support across PostgreSQL & SQLite",
      "FastAPI backend with high-throughput asynchronous REST endpoints and JWT security",
      "Interactive React + Vite frontend with live execution results, query inspection, and tabular data views",
      "AI safety guardrails to validate queries and prevent unauthorized destructive execution"
    ],
    "challenges": [
      "Mapping ambiguous natural-language prompts to exact foreign key relationships",
      "Preventing SQL injection and unsafe destructive operations through AI-generated queries",
      "Maintaining low latency while chaining LLM inferences with schema introspection"
    ],
    "solutions": [
      "Designed prompt engineering pipelines with strict schema context and typing boundaries",
      "Implemented AST-based SQL query parsing and read-only validation layers",
      "Cached database metadata and utilized asynchronous FastAPI request workers"
    ],
    "screenshots": [
      "/NLP_to_SQL_Database_Management_System_Screenshots/Screenshot 01.png",
      "/NLP_to_SQL_Database_Management_System_Screenshots/Screenshot 02.png",
      "/NLP_to_SQL_Database_Management_System_Screenshots/Screenshot 03.png",
      "/NLP_to_SQL_Database_Management_System_Screenshots/Screenshot 04.png",
      "/NLP_to_SQL_Database_Management_System_Screenshots/Screenshot 05.png",
      "/NLP_to_SQL_Database_Management_System_Screenshots/Screenshot 06.png",
      "/NLP_to_SQL_Database_Management_System_Screenshots/Screenshot 07.png",
      "/NLP_to_SQL_Database_Management_System_Screenshots/Screenshot 08.png",
      "/NLP_to_SQL_Database_Management_System_Screenshots/Screenshot 09.png",
      "/NLP_to_SQL_Database_Management_System_Screenshots/Screenshot 10.png",
      "/NLP_to_SQL_Database_Management_System_Screenshots/Screenshot 11.png",
      "/NLP_to_SQL_Database_Management_System_Screenshots/Screenshot 12.png",
      "/NLP_to_SQL_Database_Management_System_Screenshots/Screenshot 13.png",
      "/NLP_to_SQL_Database_Management_System_Screenshots/Screenshot 14.png",
      "/NLP_to_SQL_Database_Management_System_Screenshots/Screenshot 15.png",
      "/NLP_to_SQL_Database_Management_System_Screenshots/Screenshot 16.png",
      "/NLP_to_SQL_Database_Management_System_Screenshots/Screenshot 17.png",
      "/NLP_to_SQL_Database_Management_System_Screenshots/Screenshot 18.png",
      "/NLP_to_SQL_Database_Management_System_Screenshots/Screenshot 19.png",
      "/NLP_to_SQL_Database_Management_System_Screenshots/Screenshot 20.png"
    ]
  },
  {
    "id": "2",
    "title": "Realtime Spotify Clone",
    "category": "Full Stack Real-Time Application",
    "description": "Engineered a real-time music streaming application with interactive playback controls, responsive UI, live chat, online/offline presence, and shared now-playing activity across concurrent users. Built an admin dashboard for album and song management.",
    "tags": [
      "React",
      "TypeScript",
      "Vite",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Socket.IO",
      "Cloudinary",
      "Clerk",
      "Tailwind CSS"
    ],
    "githubUrl": "https://github.com/K-Santhoshkumar/MSA",
    "demoUrl": "https://music-streaming-app-r75c.onrender.com/",
    "imagePath": "/Music Streaming App/Screenshot 2026-02-04 210623.png",
    "features": [
      "Full client-side playback controls with queue management, track scrubbing, and volume persistence",
      "Real-time online/offline user presence tracking and live shared now-playing activity stream",
      "Interactive synchronized chat room for listeners powered by Socket.IO WebSockets",
      "Comprehensive administration dashboard for uploading songs, managing albums, and tracking analytics",
      "Clerk-based authentication with role-based access control and Cloudinary media optimization"
    ],
    "challenges": [
      "Delivering smooth, low-latency playback across concurrent clients",
      "Synchronizing playback state and presence in real time across active sessions",
      "Efficiently storing and streaming audio assets with fast buffering"
    ],
    "solutions": [
      "Engineered Socket.IO event buses for bidirectional state sync and presence events",
      "Served audio assets via Cloudinary CDN with chunked streaming and client-side caching",
      "Leveraged Clerk middleware for secure user authentication and session token validation"
    ],
    "screenshots": [
      "/Music Streaming App/Screenshot 2026-02-04 210623.png",
      "/Music Streaming App/Screenshot 2026-02-04 210735.png",
      "/Music Streaming App/Screenshot 2026-02-04 210751.png",
      "/Music Streaming App/Screenshot 2026-02-04 210926.png",
      "/Music Streaming App/Screenshot 2026-02-04 210937.png",
      "/Music Streaming App/Screenshot 2026-02-04 210953.png",
      "/Music Streaming App/Screenshot 2026-02-04 211011.png",
      "/Music Streaming App/Screenshot 2026-02-04 211030.png",
      "/Music Streaming App/Screenshot 2026-02-04 211105.png",
      "/Music Streaming App/Screenshot 2026-02-04 211139.png",
      "/Music Streaming App/Screenshot 2026-02-04 211156.png",
      "/Music Streaming App/Screenshot 2026-02-04 211212.png",
      "/Music Streaming App/Screenshot 2026-02-04 211223.png"
    ]
  },
  {
    "id": "3",
    "title": "Blog Platform",
    "category": "Full Stack Web Application",
    "description": "Architected a full-stack blogging platform with separate administration and user interfaces. Developed JWT-secured REST APIs, AI content generation, cloud image optimization, category filtering, and a moderated comment system.",
    "tags": [
      "React.js",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT",
      "ImageKit",
      "Google Gemini AI"
    ],
    "githubUrl": "https://github.com/K-Santhoshkumar/Blog-App",
    "demoUrl": "https://ksrblogging-platform.netlify.app/",
    "imagePath": "/Blog_app_Screenshots/Screenshot 2025-07-09 163812.png",
    "features": [
      "Dual-portal architecture: clean reading portal and dedicated administrative publishing studio",
      "AI-assisted content generation, automated excerpt drafting, and keyword extraction via Gemini AI",
      "Cloud image upload, compression, and responsive transformation pipeline via ImageKit",
      "Dynamic category filtering, rich text post editing, and live markdown preview",
      "Moderated comment discussion system with nested replies and user authentication"
    ],
    "challenges": [
      "Implementing robust role-based authentication and secure session lifecycle",
      "Optimizing image delivery and cloud media bandwidth for rich blog posts",
      "Ensuring clean SEO metadata and fast server response times for article reading"
    ],
    "solutions": [
      "Used JWT stored in HTTP-only cookies with bcrypt password hashing",
      "Integrated ImageKit SDK for automated WebP formatting and responsive breakpoints",
      "Applied structured OpenGraph meta tags and semantic HTML elements"
    ],
    "screenshots": [
      "/Blog_app_Screenshots/Screenshot 2025-07-09 163812.png",
      "/Blog_app_Screenshots/Screenshot 2025-07-09 163454.png",
      "/Blog_app_Screenshots/Screenshot 2025-07-09 163523.png",
      "/Blog_app_Screenshots/Screenshot 2025-07-09 163534.png"
    ]
  },
  {
    "id": "4",
    "title": "SocioPedia - Social Media App",
    "category": "Full Stack Social Application",
    "description": "A Next.js‑based social media platform with posts, images, likes, comments, and follow functionality.",
    "tags": [
      "Next.js",
      "TypeScript",
      "Prisma",
      "Clerk",
      "Tailwind CSS",
      "UploadThing",
      "Neon",
      "Shadcn"
    ],
    "githubUrl": "https://github.com/K-Santhoshkumar/SocioPedia",
    "demoUrl": "https://socio-pedia-black.vercel.app/",
    "imagePath": "/SocioPedia_Screenshots/Screenshot 2025-07-09 165546.png",
    "features": [
      "Create and share posts with optional image attachments",
      "Like and unlike posts with optimistic UI updates",
      "Comment on posts and delete your own posts",
      "Follow/unfollow suggested users",
      "Authentication & authorization via Clerk",
      "Secure file uploads with UploadThing",
      "Responsive mobile-first design using Tailwind CSS & Shadcn"
    ],
    "challenges": [
      "Implementing optimistic UI for likes and comments",
      "Integrating UploadThing securely for user-generated images",
      "Balancing server and client components for caching and revalidation",
      "Managing dynamic routes and access control with Clerk"
    ],
    "solutions": [
      "Leveraged React state hooks and Next.js server actions for optimistic updates",
      "Added server-side validation and UploadThing middleware for secure uploads",
      "Utilized Next.js App Router features for efficient data fetching and caching",
      "Configured Clerk middleware and Prisma models for role-based access control"
    ],
    "screenshots": [
      "/SocioPedia_Screenshots/Screenshot 2025-07-09 165546.png"
    ]
  },
  {
    "id": "5",
    "title": "Excel Analysis Platform",
    "category": "Data Analytics Platform",
    "description": "A web platform for uploading, analyzing, and visualizing Excel data with interactive charts and downloadable reports.",
    "tags": [
      "React.js",
      "Node.js",
      "Express.js",
      "xlsx",
      "Chart.js",
      "SheetJS",
      "Tailwind CSS",
      "JWT"
    ],
    "githubUrl": "https://github.com/K-Santhoshkumar/Excel-Analysis-Platform",
    "demoUrl": "https://excel-analysis-platforom.netlify.app/",
    "imagePath": "/Excel_analysis_platform_Screenshots/Screenshot 2025-07-09 165138.png",
    "features": [
      "Upload Excel files and parse data client-side",
      "Visualize data with interactive charts (Chart.js)",
      "Download processed data and reports",
      "Responsive dashboard UI with Tailwind CSS",
      "Data validation and error handling for uploads"
    ],
    "challenges": [
      "Parsing and validating complex Excel files in-browser",
      "Rendering large datasets efficiently",
      "Ensuring cross-browser compatibility for file uploads"
    ],
    "solutions": [
      "Used xlsx library for robust Excel parsing",
      "Optimized chart rendering and lazy loading",
      "Tested and polyfilled file APIs for compatibility"
    ],
    "screenshots": [
      "/Excel_analysis_platform_Screenshots/Screenshot 2025-07-09 165138.png"
    ]
  },
  {
    "id": "6",
    "title": "Chatify App — Real-Time Chat Platform",
    "category": "Real-Time Communication",
    "description": "A responsive real-time chat application featuring user presence, message history, typing indicators, clear-chat functionality, and accurate UTC timestamps.",
    "tags": [
      "React",
      "TailwindCSS",
      "Socket.IO (client)",
      "Flask",
      "Flask-SocketIO",
      "MongoDB",
      "PyMongo"
    ],
    "githubUrl": "https://github.com/K-Santhoshkumar/live-wire-chat",
    "demoUrl": "",
    "imagePath": "/Real Time Chat App/Screenshot 2026-02-04 225847.png",
    "features": [
      "Real-time messaging with typing indicators and message history",
      "User presence (online/offline) and clear chat functionality",
      "UTC-accurate timestamps and responsive design for all devices"
    ],
    "challenges": [
      "Ensuring message ordering and timestamp accuracy across timezones",
      "Scaling real-time connections and storing chat history"
    ],
    "solutions": [
      "Used Flask-SocketIO on the server and Socket.IO on the client",
      "Stored messages in MongoDB and used UTC timestamps (datetime.utcnow)",
      "Implemented lightweight presence tracking and efficient event handling"
    ],
    "screenshots": [
      "/Real Time Chat App/Screenshot 2026-02-04 225733.png",
      "/Real Time Chat App/Screenshot 2026-02-04 225847.png"
    ]
  },
  {
    "id": "7",
    "title": "Recipe App – Cooking Blog",
    "category": "Full Stack Web Application",
    "description": "A full-stack web application to browse, search, and submit food recipes with image attachments and a responsive, dynamic UI.",
    "tags": [
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "EJS",
      "Tailwind CSS",
      "express-fileupload"
    ],
    "githubUrl": "https://github.com/K-Santhoshkumar/Recipe-App",
    "demoUrl": "https://recipe-app-xfal.onrender.com/",
    "imagePath": "/Recipe_app_Screenshots/Screenshot 2025-07-09 164418.png",
    "features": [
      "Homepage showcasing latest recipes and top categories",
      "Browse all categories and filter recipes by category",
      "Full-text search over recipe name & description using MongoDB text indexes",
      "Submit new recipes via form with image upload and flash feedback",
      "Responsive layout with express-ejs-layouts and Tailwind CSS"
    ],
    "challenges": [
      "Implementing full-text search with MongoDB",
      "Handling file uploads securely",
      "Maintaining a clean, responsive UI with EJS and Tailwind"
    ],
    "solutions": [
      "Used MongoDB text indexes for efficient search",
      "Applied express-fileupload and server-side validation for uploads",
      "Leveraged Tailwind CSS for modern, responsive design"
    ],
    "screenshots": [
      "/Recipe_app_Screenshots/Screenshot 2025-07-09 164418.png"
    ]
  },
  {
    "id": "8",
    "title": "Car Rental System",
    "category": "Web Application",
    "description": "A responsive website for a car rental service, enabling users to explore available vehicles, check details, and make bookings seamlessly.",
    "tags": [
      "HTML",
      "CSS",
      "JavaScript",
      "PHP",
      "MySQL"
    ],
    "githubUrl": "https://github.com/K-Santhoshkumar/Car-Rental-System",
    "demoUrl": "",
    "imagePath": "/Car_rental_system_Screenshots/Screenshot 2025-07-14 220825.png",
    "features": [
      "Fleet showcase with vehicle specifications and pricing",
      "Booking enquiry workflow with vehicle availability checking",
      "Responsive layout across desktop and mobile screens"
    ],
    "challenges": [
      "Creating an intuitive vehicle catalog and booking workflow"
    ],
    "solutions": [
      "Built structured relational schema and responsive grid layout"
    ],
    "screenshots": [
      "/Car_rental_system_Screenshots/Screenshot 2025-07-14 220825.png",
      "/Car_rental_system_Screenshots/Screenshot 2025-07-14 220848.png",
      "/Car_rental_system_Screenshots/Screenshot 2025-07-14 220919.png"
    ]
  },
  {
    "id": "9",
    "title": "Digital Marketing for Branded Watches",
    "category": "Commercial Showcase",
    "description": "A digital marketing website for branded watches, showcasing various models with images, descriptions, and pricing.",
    "tags": [
      "PHP",
      "HTML",
      "CSS",
      "JavaScript",
      "Supabase"
    ],
    "githubUrl": "https://github.com/K-Santhoshkumar/Digital-marketing-for-branded-watches",
    "demoUrl": "",
    "imagePath": "/Branded_watch_web_Screenshots/WhatsApp Image 2025-07-09 at 20.11.37_315a3841.jpg",
    "features": [
      "Product gallery for branded watches",
      "Detailed product descriptions and pricing",
      "Responsive website design"
    ],
    "challenges": [
      "Showcasing products in an engaging and informative way"
    ],
    "solutions": [
      "Used modern web technologies and responsive design principles"
    ],
    "screenshots": [
      "/Branded_watch_web_Screenshots/WhatsApp Image 2025-07-09 at 20.11.37_315a3841.jpg"
    ]
  },
  {
    "id": "10",
    "title": "Currency Converter",
    "category": "Frontend Utility",
    "description": "A fast and intuitive currency conversion tool with live exchange rates, country flag previews, and instant calculations.",
    "tags": [
      "HTML",
      "CSS",
      "JavaScript",
      "ExchangeRate API"
    ],
    "githubUrl": "https://github.com/K-Santhoshkumar/Currency-Convertor-",
    "demoUrl": "",
    "imagePath": "/Currency_convertor_Screenshots/Screenshot 2025-07-10 125450.png",
    "features": [
      "Live exchange rates for 150+ world currencies",
      "Instant conversion calculation with reverse rate switcher",
      "Dynamic country flag updates based on selected currency"
    ],
    "challenges": [
      "Handling API rate limits and providing smooth currency switching"
    ],
    "solutions": [
      "Cached exchange rates locally and debounced user input"
    ],
    "screenshots": [
      "/Currency_convertor_Screenshots/Screenshot 2025-07-10 125450.png",
      "/Currency_convertor_Screenshots/Screenshot 2025-07-10 125501.png"
    ]
  },
  {
    "id": "11",
    "title": "BMI Health Tracker",
    "category": "Health Calculator",
    "description": "A clean health assessment tool that calculates Body Mass Index (BMI) and provides tailored category indicators.",
    "tags": [
      "HTML",
      "CSS",
      "JavaScript"
    ],
    "githubUrl": "https://github.com/K-Santhoshkumar/BMI-Calculator",
    "demoUrl": "",
    "imagePath": "/BMI_Screenshots/Screenshot 2025-07-08 201749.png",
    "features": [
      "Metric and imperial measurement input options",
      "Real-time BMI calculation with visual health category scale",
      "Clean, distraction-free card design"
    ],
    "challenges": [
      "Creating an intuitive visual representation of health ranges"
    ],
    "solutions": [
      "Implemented color-coded status bar and clear recommendations"
    ],
    "screenshots": [
      "/BMI_Screenshots/Screenshot 2025-07-08 201749.png",
      "/BMI_Screenshots/Screenshot 2025-07-08 201817.png"
    ]
  },
  {
    "id": "12",
    "title": "Weather App",
    "category": "API Integration",
    "description": "A real-time weather forecasting application providing current conditions, temperature, humidity, and wind speed for any city.",
    "tags": [
      "HTML",
      "CSS",
      "JavaScript",
      "OpenWeatherMap API"
    ],
    "githubUrl": "https://github.com/K-Santhoshkumar/Weather-App",
    "demoUrl": "",
    "imagePath": "/Weather_app_Screenshots/Screenshot 2025-07-10 122234.png",
    "features": [
      "Instant city weather lookup with OpenWeatherMap API",
      "Displays temperature, humidity, wind speed, and weather condition icons",
      "Responsive card layout with smooth status feedback"
    ],
    "challenges": [
      "Handling invalid city searches and API error responses gracefully"
    ],
    "solutions": [
      "Added user-friendly error banners and input sanitization"
    ],
    "screenshots": [
      "/Weather_app_Screenshots/Screenshot 2025-07-10 122234.png",
      "/Weather_app_Screenshots/Screenshot 2025-07-10 122243.png",
      "/Weather_app_Screenshots/Screenshot 2025-07-10 122255.png"
    ]
  },
  {
    "id": "13",
    "title": "Food Cart",
    "category": "E-Commerce Frontend",
    "description": "An interactive restaurant food ordering front-end interface featuring item catalogs, quantity selectors, cart calculations, and responsive checkout layout.",
    "tags": [
      "HTML",
      "CSS",
      "JavaScript"
    ],
    "githubUrl": "https://github.com/K-Santhoshkumar/FoodCart",
    "demoUrl": "",
    "imagePath": "/Foodcart_Screenshots/Screenshot 2025-07-10 130304.png",
    "features": [
      "Interactive dish catalog with categorization",
      "Dynamic shopping cart with quantity adjustments and tax calculation",
      "Mobile-friendly checkout flow"
    ],
    "challenges": [
      "Synchronizing cart state across category tabs without external libraries"
    ],
    "solutions": [
      "Used modular vanilla JavaScript state management and local storage"
    ],
    "screenshots": [
      "/Foodcart_Screenshots/Screenshot 2025-07-10 130304.png",
      "/Foodcart_Screenshots/Screenshot 2025-07-10 130315.png"
    ]
  },
  {
    "id": "14",
    "title": "CRUD Operations with React",
    "category": "State Management Demo",
    "description": "A demo project showcasing Create, Read, Update, and Delete operations using React for front-end state management and user interface.",
    "tags": [
      "React.js",
      "TypeScript",
      "CSS",
      "HTML"
    ],
    "githubUrl": "https://github.com/K-Santhoshkumar/CRUD-operations-with-React",
    "demoUrl": "",
    "imagePath": "/React_CRUD_Screenshots/Screenshot 2025-07-10 124103.png",
    "features": [
      "Add, edit, and delete user records with instant UI updates",
      "Form validation and empty-state handling",
      "Clean modular component architecture"
    ],
    "challenges": [
      "Managing local state without unnecessary re-renders"
    ],
    "solutions": [
      "Used React useState and useMemo hooks for optimized rendering"
    ],
    "screenshots": [
      "/React_CRUD_Screenshots/Screenshot 2025-07-10 124103.png"
    ]
  }
];
