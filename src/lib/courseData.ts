export const COURSE_DATA = {
  id: "build-standout-website",
  title: "Build a Standout Website",
  slug: "build-standout-website",
  shortDescription: [
    {
      _type: "block",
      children: [
        {
          _type: "span",
          text: "Learn to build modern, production-ready web applications with React, Next.js, Tailwind CSS, Sanity Studio, and Stripe.",
        },
      ],
    },
  ],
  techs: [
    { name: "React", logo: { asset: { url: "/images/gatsby-icon.png" } } },
    { name: "Next.js", logo: { asset: { url: "/images/logo.png" } } },
    { name: "Tailwind CSS", logo: { asset: { url: "/images/favicon.png" } } },
    { name: "Sanity CMS", logo: { asset: { url: "/images/logo.png" } } },
  ],
  productPrice: {
    content: {
      _id: "prod_standout_website",
      slug: { current: "build-standout-website" },
      priceMonthly: "35",
      priceRecurring: "9",
    },
  },
  curriculum: [
    {
      title: "Module 1: Introduction & Environment Setup",
      _rawBody: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "Get started with modern development tools, Git, GitHub, and setting up your workspace.",
            },
          ],
        },
      ],
      doc: [
        {
          title: "Welcome to the Course",
          slug: { current: "welcome-to-the-course" },
          summary: "Introduction to course goals, community, and repository.",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          contentHtml: `
            <h2>Welcome to Build a Standout Website</h2>
            <p>Welcome to <strong>Build a Standout Website</strong>! In this course, you will learn step-by-step how to design, build, and deploy production-grade web applications.</p>
            <h3>Course Overview:</h3>
            <ul>
              <li><strong>Frontend Foundations:</strong> React, Next.js App Router, TypeScript, and Tailwind CSS.</li>
              <li><strong>Content Management:</strong> Sanity Studio v3 and Sveltia CMS for dynamic content.</li>
              <li><strong>Monetization & API:</strong> Stripe Checkout, API routes, and user authentication.</li>
              <li><strong>Deployment:</strong> Continuous integration and hosting on Netlify/Vercel.</li>
            </ul>
          `,
        },
        {
          title: "Setting up Development Environment",
          slug: { current: "dev-environment-setup" },
          summary: "Install Node.js, VS Code, Git, and essential extensions.",
          contentHtml: `
            <h2>Setting Up Your Local Workspace</h2>
            <p>Before writing code, we will set up a fast, modern web development environment on macOS, Windows, or Linux.</p>
            <h3>Required Tools:</h3>
            <ol>
              <li>Node.js (v18+ LTS or v20+)</li>
              <li>Visual Studio Code with ESLint & Prettier extensions</li>
              <li>Git version control</li>
            </ol>
          `,
        },
        {
          title: "Version Control with Git & GitHub",
          slug: { current: "git-github-basics" },
          summary: "Initialize git repositories and push to GitHub.",
          contentHtml: `
            <h2>Version Control Fundamentals</h2>
            <p>Learn how to track changes using Git commits, branches, and push your codebase securely to GitHub.</p>
          `,
        },
      ],
    },
    {
      title: "Module 2: Frontend Foundation & React",
      _rawBody: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "Master component architecture, responsive Tailwind styling, and modern React hooks.",
            },
          ],
        },
      ],
      doc: [
        {
          title: "Modern React & Component Architecture",
          slug: { current: "modern-react-components" },
          summary: "Master JSX, state management, and custom hooks.",
          contentHtml: `
            <h2>React Component Patterns</h2>
            <p>Understand state management, props, component lifecycles, and custom React hooks for scalable applications.</p>
          `,
        },
        {
          title: "Styling with Tailwind CSS",
          slug: { current: "styling-with-tailwind-css" },
          summary: "Build responsive UI layouts using utility-first CSS.",
          contentHtml: `
            <h2>Tailwind CSS Design System</h2>
            <p>Utilize modern utility classes, dark mode tokens, and CSS Grid for fast responsive layouts.</p>
          `,
        },
        {
          title: "Responsive Web Design Patterns",
          slug: { current: "responsive-design-patterns" },
          summary: "Design mobile-first interfaces for all viewports.",
          contentHtml: `
            <h2>Mobile-First Layout Strategy</h2>
            <p>Implement flexbox, container queries, and breakpoint-specific styles for flawless cross-device display.</p>
          `,
        },
      ],
    },
    {
      title: "Module 3: Content Management & APIs",
      _rawBody: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "Headless CMS integration with Sanity Studio and building Next.js serverless API routes.",
            },
          ],
        },
      ],
      doc: [
        {
          title: "Sanity Studio Setup & Schemas",
          slug: { current: "sanity-studio-setup" },
          summary: "Configure headless CMS schema definitions.",
          contentHtml: `
            <h2>Headless CMS Infrastructure</h2>
            <p>Set up Sanity Studio v3, define document schemas, and model structured content for blogs and products.</p>
          `,
        },
        {
          title: "Dynamic Content Fetching",
          slug: { current: "dynamic-content-fetching" },
          summary: "Query Sanity using GROQ and render PortableText.",
          contentHtml: `
            <h2>GROQ Queries & PortableText</h2>
            <p>Query your Sanity dataset with GROQ and render rich structured text elements seamlessly.</p>
          `,
        },
        {
          title: "Building API Routes in Next.js",
          slug: { current: "api-routes-nextjs" },
          summary: "Create serverless API endpoints.",
          contentHtml: `
            <h2>Serverless API Routes</h2>
            <p>Create secure Next.js API handlers for processing newsletter subscriptions, user tokens, and webhooks.</p>
          `,
        },
      ],
    },
    {
      title: "Module 4: Authentication & Payments",
      _rawBody: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "User login, JWT tokens, Stripe payment collection, and production deployment.",
            },
          ],
        },
      ],
      doc: [
        {
          title: "User Authentication & JWTs",
          slug: { current: "user-authentication" },
          summary: "Implement secure user logins and protected routes.",
          contentHtml: `
            <h2>User Authentication</h2>
            <p>Secure student access using JWT tokens, local storage persistence, and protected module routes.</p>
          `,
        },
        {
          title: "Stripe Checkout & Subscriptions",
          slug: { current: "stripe-checkout-subscriptions" },
          summary: "Accept payments and manage recurring subscriptions.",
          contentHtml: `
            <h2>Stripe Integration</h2>
            <p>Collect payments securely via Stripe Checkout and handle automated subscription webhooks.</p>
          `,
        },
        {
          title: "Deploying to Production",
          slug: { current: "deploying-to-production" },
          summary: "Deploy your full-stack website to Netlify/Vercel.",
          contentHtml: `
            <h2>Production Deployment</h2>
            <p>Deploy your Next.js application to production, set up custom domain DNS, and configure SSL certificates.</p>
          `,
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Who is this course for?",
      answer: "This course is designed for web developers, freelancers, and software engineers who want to build and deploy production-ready websites using React, Next.js, Sanity CMS, and Stripe.",
    },
    {
      question: "Do I get lifetime access to course updates?",
      answer: "Yes! Enrolling gives you full access to all course modules, updates, and community discussion.",
    },
  ],
  testimonials: [
    {
      quote: "Taimoor's course made full-stack web development crystal clear. Highly recommended!",
      author: "Alex Rivers",
      role: "Frontend Engineer",
    },
  ],
}
