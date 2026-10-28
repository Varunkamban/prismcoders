export interface ServiceCardData {
  title: string;
  description: string;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServicePageData {
  slug: string;
  title: string;
  category: string;
  eyebrow: string;
  headline: string;
  intro: string;
  overview: string;
  cardDescription: string;
  problems: ServiceCardData[];
  solutions: ServiceCardData[];
  benefits: string[];
  deliverables: ServiceCardData[];
  faqs: ServiceFaq[];
}

export const services: ServicePageData[] = [
  {
    slug: "website-design-development",
    title: "Website Design & Development",
    category: "Web development",
    eyebrow: "Websites built around your business",
    headline: "A clearer first impression. A more useful website.",
    intro: "Design and development for business websites that explain what you do, help the right people take action, and give your team a practical foundation to grow.",
    overview: "A business website needs to do more than look polished. We plan its structure around your audience and goals, then design and build responsive pages with clear navigation, useful content, and a straightforward path to getting in touch.",
    cardDescription: "Responsive business websites with clear messaging, useful navigation, and a purposeful path to enquiry.",
    problems: [
      { title: "Visitors cannot find the next step", description: "Organize important information and calls to action so visitors can understand where to go." },
      { title: "The site feels dated or hard to use", description: "Replace inconsistent layouts with a responsive experience that works across screen sizes." },
      { title: "Your team cannot update content easily", description: "Plan an editing workflow that suits the people responsible for keeping the site current." },
    ],
    solutions: [
      { title: "Business and marketing sites", description: "Present services, company information, and contact options in one cohesive experience." },
      { title: "Landing pages", description: "Focus a page around a specific audience, offer, or campaign." },
      { title: "Content and CMS integration", description: "Make routine updates manageable with a suitable content workflow." },
    ],
    benefits: ["Clearer service positioning and site structure", "Responsive layouts for desktop and mobile visitors", "Accessible, maintainable front-end implementation", "A foundation for future content and feature improvements"],
    deliverables: [
      { title: "Site plan and page structure", description: "An agreed outline of the pages, navigation, and content priorities." },
      { title: "Interface design", description: "Page designs aligned to your brand and the needs of your audience." },
      { title: "Developed and tested website", description: "Responsive pages reviewed across common screen sizes and key journeys." },
    ],
    faqs: [
      { question: "Can you redesign an existing website?", answer: "Yes. We can review the current site, identify what should be retained or improved, and agree a redesign scope before implementation." },
      { question: "Can our team update pages after launch?", answer: "The content workflow is planned to suit your needs. A CMS can be included when frequent self-service editing is important." },
    ],
  },
  {
    slug: "custom-web-applications",
    title: "Custom Web Applications",
    category: "Web development",
    eyebrow: "Software shaped around your workflows",
    headline: "A web application that fits the way your team works.",
    intro: "Plan and build browser-based tools for workflows that are difficult to support with disconnected spreadsheets or off-the-shelf software.",
    overview: "A custom application is useful when your process, users, and rules need to work together in one place. We help define the roles, data, and journeys first, then deliver a scoped application that can evolve as requirements become clearer.",
    cardDescription: "Purpose-built browser applications for operational workflows, portals, and internal tools.",
    problems: [
      { title: "Work is split across too many tools", description: "Bring a defined workflow and its information together in a purpose-built interface." },
      { title: "Manual handoffs create avoidable delays", description: "Make status, ownership, and next actions easier for the people involved to follow." },
      { title: "Generic software does not match your process", description: "Shape features around the business rules that make your workflow distinctive." },
    ],
    solutions: [
      { title: "Internal operations tools", description: "Support repeatable processes such as requests, approvals, and record keeping." },
      { title: "Customer or partner portals", description: "Give external users a clear place to submit information and review progress." },
      { title: "System integrations", description: "Connect agreed data flows with the platforms already used by your team." },
    ],
    benefits: ["Workflows designed for your actual roles and rules", "Shared records and clearer process visibility", "A browser-based experience for distributed teams", "Incremental delivery based on agreed priorities"],
    deliverables: [
      { title: "Requirements and user flows", description: "A shared view of users, permissions, workflows, and acceptance criteria." },
      { title: "Application interface", description: "A tested interaction model for the core tasks and user roles." },
      { title: "Working application", description: "The agreed features, integrations, and handover materials." },
    ],
    faqs: [
      { question: "How do you decide what should be in the first release?", answer: "We prioritize the core user journeys and business rules, then agree a realistic first scope before adding secondary features." },
      { question: "Can it connect with our existing tools?", answer: "Integration options depend on the systems and available interfaces. We review them during discovery and confirm what is feasible." },
    ],
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    category: "Application development",
    eyebrow: "Useful experiences, wherever work happens",
    headline: "Mobile apps made for real-world tasks.",
    intro: "Explore mobile product ideas and build focused app experiences for customers, field teams, or employees who need useful tools on the move.",
    overview: "Mobile projects begin with the people using the app, the tasks they need to complete, and the devices or conditions they work in. From there, we define a practical scope for the mobile experience and any supporting services.",
    cardDescription: "Mobile product design and development for customer, employee, and field workflows.",
    problems: [
      { title: "Important work happens away from a desk", description: "Give field staff access to the information and actions needed at the point of work." },
      { title: "Customers need a more convenient experience", description: "Make common account, booking, or service tasks easier to complete on a phone." },
      { title: "Paper processes are difficult to track", description: "Capture structured updates and records through a mobile-first workflow." },
    ],
    solutions: [
      { title: "Customer-facing apps", description: "Support focused journeys such as account access, requests, bookings, or updates." },
      { title: "Field team tools", description: "Help staff review assignments, capture job details, and submit progress." },
      { title: "Mobile product prototypes", description: "Test essential screens and interactions before committing to a broader build." },
    ],
    benefits: ["Journeys designed for smaller screens and touch", "Features prioritized around user context", "Clear consideration of device and platform needs", "A planned path for testing and future releases"],
    deliverables: [
      { title: "Mobile requirements", description: "User roles, target devices, core journeys, and a release outline." },
      { title: "App interface and prototype", description: "A reviewable flow for key screens and interactions." },
      { title: "Implementation and release support", description: "The agreed app functionality and a handover plan for launch." },
    ],
    faqs: [
      { question: "Do we need a mobile app or a responsive website?", answer: "It depends on how people will use the product. We compare device capabilities, usage patterns, and maintenance needs before recommending a direction." },
      { question: "Can the app work with our existing website or software?", answer: "It may be possible through APIs or other supported integrations. We assess the systems and data requirements during discovery." },
    ],
  },
  {
    slug: "e-commerce-solutions",
    title: "E-commerce Solutions",
    category: "Web development",
    eyebrow: "Online stores designed for easy buying",
    headline: "A smoother path from product discovery to checkout.",
    intro: "Create or improve an online store with product information, shopping journeys, and operational needs considered together.",
    overview: "A useful e-commerce experience connects the customer-facing store with the processes behind it. We plan the catalog, product details, checkout, and operational integrations around the way you sell and fulfill orders.",
    cardDescription: "Online stores and shopping experiences planned around customers and order operations.",
    problems: [
      { title: "Product information is difficult to compare", description: "Present catalog details consistently so customers can make informed choices." },
      { title: "Checkout creates unnecessary friction", description: "Review the purchase journey and reduce confusing or redundant steps." },
      { title: "Orders require repetitive manual updates", description: "Identify practical ways to connect storefront activity with internal operations." },
    ],
    solutions: [
      { title: "Storefront design and setup", description: "Build category, product, search, and campaign pages around your catalog." },
      { title: "Checkout and payment flow", description: "Configure a purchase experience with payment options suited to your requirements." },
      { title: "Order workflow integrations", description: "Connect agreed order information with fulfillment or business systems." },
    ],
    benefits: ["Product discovery that reflects your catalog", "A consistent buying journey across devices", "Clearer visibility into order and fulfillment handoffs", "A store structure that can support catalog growth"],
    deliverables: [
      { title: "Store requirements and catalog plan", description: "A mapped structure for products, categories, and operational needs." },
      { title: "Online store", description: "The agreed storefront and shopping workflows." },
      { title: "Launch and operations handover", description: "Configuration notes and guidance for day-to-day store management." },
    ],
    faqs: [
      { question: "Can you work with an existing e-commerce platform?", answer: "Yes. We can assess your current platform and determine whether improvements, integrations, or a different approach best fit the requirements." },
      { question: "Can you connect shipping, inventory, or accounting tools?", answer: "We can investigate integrations based on your chosen platform and the capabilities of each system." },
    ],
  },
  {
    slug: "artificial-intelligence",
    title: "Artificial Intelligence",
    category: "AI & automation",
    eyebrow: "Practical AI for specific business tasks",
    headline: "Put AI to work where it can be genuinely useful.",
    intro: "Identify suitable AI opportunities, test them against real workflows, and integrate appropriate tools with clear human oversight.",
    overview: "AI is most useful when it addresses a specific task and its limitations are understood. We help define the use case, review the data and systems involved, and plan an implementation with appropriate review and fallback steps.",
    cardDescription: "AI discovery and integrations scoped around concrete workflows and responsible use.",
    problems: [
      { title: "Teams spend time searching or summarizing", description: "Explore ways to make relevant information easier to retrieve and review." },
      { title: "Repetitive text work slows down processes", description: "Test assisted drafting or classification for tasks with clear review criteria." },
      { title: "AI ideas are hard to evaluate", description: "Turn a broad idea into a small pilot with defined users and success measures." },
    ],
    solutions: [
      { title: "AI opportunity discovery", description: "Map candidate workflows, data readiness, risks, and evaluation needs." },
      { title: "AI-assisted tools", description: "Add reviewable AI steps to an existing product or internal workflow." },
      { title: "Knowledge and search experiences", description: "Help users find information from an agreed set of trusted sources." },
    ],
    benefits: ["Use cases grounded in business tasks", "Human review included where outputs need judgment", "Clearer expectations for data and model limitations", "A pilot path before broader adoption"],
    deliverables: [
      { title: "Use-case assessment", description: "A prioritized view of opportunities, constraints, and evaluation criteria." },
      { title: "Prototype or pilot", description: "A limited implementation for validating the workflow with users." },
      { title: "Integration and usage guidance", description: "The agreed implementation plus operating and review considerations." },
    ],
    faqs: [
      { question: "Can AI outputs be guaranteed to be correct?", answer: "No. AI outputs can be incomplete or incorrect. We plan evaluation and human review appropriate to the task and its impact." },
      { question: "Can you work with our existing data?", answer: "Possibly. We first review data access, quality, permissions, privacy requirements, and whether the use case can be supported responsibly." },
    ],
  },
  {
    slug: "cloud-devops",
    title: "Cloud & DevOps",
    category: "Cloud & infrastructure",
    eyebrow: "Reliable foundations for digital products",
    headline: "Cloud and delivery practices that fit your application.",
    intro: "Plan cloud infrastructure, deployment workflows, and operational visibility around the needs and current maturity of your product.",
    overview: "Cloud decisions affect how a product is deployed, monitored, secured, and maintained. We review your application and operating needs, then define infrastructure and delivery improvements that are proportionate to your workload.",
    cardDescription: "Cloud infrastructure and deployment workflows planned for maintainability and visibility.",
    problems: [
      { title: "Releases depend on fragile manual steps", description: "Make build and deployment processes more repeatable and easier to review." },
      { title: "Infrastructure is difficult to understand", description: "Clarify environments, ownership, configuration, and operational responsibilities." },
      { title: "Issues are hard to diagnose", description: "Consider logs, alerts, and service health signals that support troubleshooting." },
    ],
    solutions: [
      { title: "Cloud environment planning", description: "Review hosting, networking, data services, and environment separation." },
      { title: "Deployment automation", description: "Establish a repeatable path from code changes to a tested release." },
      { title: "Monitoring and operations", description: "Improve visibility into service health and operational events." },
    ],
    benefits: ["A clearer operational model", "More repeatable application releases", "Infrastructure choices tied to application needs", "Better visibility for maintenance and troubleshooting"],
    deliverables: [
      { title: "Infrastructure review", description: "An overview of current services, deployment flow, and operational needs." },
      { title: "Implementation plan", description: "Prioritized changes with ownership and rollout considerations." },
      { title: "Configured workflows and handover", description: "The agreed improvements and relevant operational documentation." },
    ],
    faqs: [
      { question: "Can you improve an existing cloud setup?", answer: "Yes. We can review the current environment and agree on focused improvements without assuming a full migration is needed." },
      { question: "Which cloud provider do you use?", answer: "The provider should fit your application, constraints, and team. We discuss existing commitments and requirements before recommending options." },
    ],
  },
  {
    slug: "crm-solutions",
    title: "CRM Solutions",
    category: "Business software",
    eyebrow: "Customer information your team can use",
    headline: "A clearer view of leads, conversations, and relationships.",
    intro: "Choose, configure, or extend CRM workflows so customer and sales information is easier to maintain and act on.",
    overview: "A CRM should reflect how your team handles enquiries, follow-ups, and ongoing relationships. We map the current process, review the information you need to track, and shape a CRM setup that gives users a useful shared view.",
    cardDescription: "CRM setup and workflows for lead tracking, customer records, and follow-up.",
    problems: [
      { title: "Enquiries are tracked in separate places", description: "Create a consistent view of incoming leads and their current status." },
      { title: "Follow-ups rely on memory", description: "Make ownership, next steps, and reminders visible to the people responsible." },
      { title: "Customer records lack consistency", description: "Agree which information matters and how teams should keep it up to date." },
    ],
    solutions: [
      { title: "CRM selection and configuration", description: "Compare requirements and configure records, stages, and user access." },
      { title: "Sales and service workflows", description: "Organize enquiry handling, follow-ups, and customer handoffs." },
      { title: "CRM integrations", description: "Connect agreed sources such as forms, email, or existing business tools." },
    ],
    benefits: ["Shared visibility into customer activity", "More consistent lead and account records", "Clearer ownership for follow-up", "A configuration aligned to team workflows"],
    deliverables: [
      { title: "Process and data map", description: "A view of current customer workflows and the information to retain." },
      { title: "Configured CRM", description: "The agreed records, stages, permissions, and team workflows." },
      { title: "Adoption and handover guide", description: "Practical guidance for users and ongoing administration." },
    ],
    faqs: [
      { question: "Do we need to replace our current CRM?", answer: "Not necessarily. We first review whether configuration, integration, or process changes could address the gaps." },
      { question: "Can you help migrate existing contact data?", answer: "We can plan a migration after reviewing the data sources, quality, permissions, and the target CRM structure." },
    ],
  },
  {
    slug: "erp-solutions",
    title: "ERP Solutions",
    category: "Business software",
    eyebrow: "Connected operations and business records",
    headline: "Bring core business processes into clearer view.",
    intro: "Plan ERP selection, configuration, or integration around the processes and information your organization needs to coordinate.",
    overview: "ERP projects touch multiple teams and processes, so the first task is to understand where information is created, how work moves, and what needs to be shared. We help shape the requirements and an implementation scope that can be delivered in manageable stages.",
    cardDescription: "ERP discovery, workflow planning, and integration for connected business operations.",
    problems: [
      { title: "Departments maintain conflicting records", description: "Identify the shared data and ownership rules needed across business functions." },
      { title: "Operational handoffs are difficult to follow", description: "Map process stages and clarify what information each team needs." },
      { title: "Reporting requires manual consolidation", description: "Review how source records can support more consistent operational reporting." },
    ],
    solutions: [
      { title: "ERP requirements discovery", description: "Document processes, roles, data, constraints, and integration needs." },
      { title: "Workflow and configuration planning", description: "Translate agreed requirements into manageable system workflows." },
      { title: "System and data integration", description: "Plan supported data exchange with selected business platforms." },
    ],
    benefits: ["Clearer process ownership and requirements", "More consistent operational information", "Integration needs considered before rollout", "A staged approach to complex changes"],
    deliverables: [
      { title: "Current-state process map", description: "A documented view of the teams, workflows, and systems involved." },
      { title: "ERP scope and rollout plan", description: "Priorities, dependencies, and a proposed sequence for implementation." },
      { title: "Configuration and adoption support", description: "Agreed system workflows, user guidance, and handover materials." },
    ],
    faqs: [
      { question: "How do we know if we need an ERP?", answer: "We can assess process complexity, data duplication, reporting needs, and existing tools before deciding whether ERP is appropriate." },
      { question: "Can an ERP be introduced in phases?", answer: "A phased approach may reduce change impact, depending on dependencies and the selected platform. We define those considerations during planning." },
    ],
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    category: "Digital growth",
    eyebrow: "Digital channels with clear objectives",
    headline: "Make your online presence easier to discover and understand.",
    intro: "Plan digital marketing improvements around your audience, content, and business goals—not disconnected activity or vague metrics.",
    overview: "Digital marketing works best when the message, landing experience, and measurement support one another. We help review your current digital touchpoints and define practical work across content, search visibility, and campaign pages.",
    cardDescription: "Practical digital marketing foundations for discoverability, campaigns, and measurement.",
    problems: [
      { title: "The right audience struggles to find you", description: "Review site structure and content to improve how services are presented and discovered." },
      { title: "Campaign traffic has no clear destination", description: "Align campaign messages with focused landing pages and next steps." },
      { title: "Marketing activity is hard to evaluate", description: "Define useful measurement events and reporting questions before launch." },
    ],
    solutions: [
      { title: "Search and content foundations", description: "Improve page structure, metadata, and content organization." },
      { title: "Campaign landing experiences", description: "Build focused pages for defined offers, audiences, or campaigns." },
      { title: "Analytics and measurement setup", description: "Configure agreed events and reporting foundations for campaign evaluation." },
    ],
    benefits: ["More consistent messaging across digital touchpoints", "A clearer path from campaign to enquiry", "Measurement tied to defined business questions", "Marketing foundations your team can improve over time"],
    deliverables: [
      { title: "Digital presence review", description: "A review of selected website, content, and measurement opportunities." },
      { title: "Campaign or content plan", description: "Prioritized page and content recommendations for an agreed audience." },
      { title: "Published improvements", description: "The agreed changes and measurement setup for your digital channels." },
    ],
    faqs: [
      { question: "Can you guarantee search rankings or campaign results?", answer: "No. Rankings and campaign outcomes depend on many factors. We focus on sound implementation, clear measurement, and iterative improvement." },
      { question: "Can you work with our existing marketing team?", answer: "Yes. We can complement your team with technical implementation, landing pages, analytics, or content-structure support." },
    ],
  },
  {
    slug: "project-management",
    title: "Project Management Software",
    category: "Business software",
    eyebrow: "Projects with clearer ownership and progress",
    headline: "Give teams a shared way to plan and deliver work.",
    intro: "Configure or build project workflows that make priorities, ownership, dependencies, and progress easier to understand.",
    overview: "Project tools should support the way work is actually planned and delivered. We help teams identify the views and status information they need, then configure a suitable platform or define a focused custom workflow.",
    cardDescription: "Project workflow tools and configuration for planning, ownership, and progress tracking.",
    problems: [
      { title: "Tasks are scattered across documents and chats", description: "Create a shared home for work items, context, and ownership." },
      { title: "Project status is difficult to understand", description: "Agree useful status definitions and views for teams and stakeholders." },
      { title: "Dependencies appear late", description: "Make blockers, sequencing, and handoffs visible during planning." },
    ],
    solutions: [
      { title: "Project tool configuration", description: "Set up spaces, workflows, fields, and views for team needs." },
      { title: "Approval and request workflows", description: "Organize incoming work and decision steps with clearer ownership." },
      { title: "Portfolio and reporting views", description: "Summarize agreed progress and workload information for stakeholders." },
    ],
    benefits: ["A shared understanding of work status", "Clearer assignment and handoffs", "Workflows suited to team practices", "Less dependence on manual status summaries"],
    deliverables: [
      { title: "Workflow discovery", description: "A review of current planning, reporting, and coordination practices." },
      { title: "Configured workspace", description: "The agreed templates, views, roles, and workflow rules." },
      { title: "Team rollout guidance", description: "Usage guidance and a plan for refining the setup after adoption." },
    ],
    faqs: [
      { question: "Can you configure the project tool we already use?", answer: "Yes. We can review your current setup and identify configuration or workflow improvements before considering a platform change." },
      { question: "Will the system enforce one project method?", answer: "The setup should reflect your team's needs. We agree the right level of consistency without adding unnecessary process." },
    ],
  },
  {
    slug: "gst-billing-accounting",
    title: "GST Billing & Accounting",
    category: "Business software",
    eyebrow: "Billing workflows that fit your records",
    headline: "Make billing and business records easier to manage.",
    intro: "Plan billing and accounting workflows that help teams prepare, organize, and review business transactions using suitable tools.",
    overview: "Billing software needs to match the way your business prepares invoices, tracks payments, and shares records with accounting processes. We help define those workflows and configure or build supporting digital tools based on your requirements.",
    cardDescription: "Billing and accounting workflow software planned around business records and review.",
    problems: [
      { title: "Invoices take too long to prepare", description: "Review repeatable billing information and identify opportunities to reduce re-entry." },
      { title: "Payment status is difficult to track", description: "Create a clearer view of issued invoices, due dates, and recorded payments." },
      { title: "Business records are scattered", description: "Organize invoice and transaction information for easier retrieval and review." },
    ],
    solutions: [
      { title: "Invoice and billing workflows", description: "Support invoice creation, status tracking, and customer records." },
      { title: "Accounting system integrations", description: "Assess supported ways to transfer agreed billing information." },
      { title: "Business reporting views", description: "Present selected transaction and payment information for internal review." },
    ],
    benefits: ["More consistent billing information", "Clearer invoice status and ownership", "Reduced repetitive entry where integrations allow", "Digital records organized for review"],
    deliverables: [
      { title: "Billing workflow assessment", description: "A map of invoice creation, payment updates, and record handling." },
      { title: "Configured billing experience", description: "The agreed templates, records, and workflow steps." },
      { title: "Integration and handover notes", description: "Documented system connections and operational guidance." },
    ],
    faqs: [
      { question: "Does the software provide tax or accounting advice?", answer: "No. Software supports record keeping and workflows; tax and accounting treatment should be confirmed with a qualified professional." },
      { question: "Can it connect to our accounting system?", answer: "Integration depends on the accounting platform and its supported interfaces. We assess the options before agreeing scope." },
    ],
  },
  {
    slug: "hospital-management-system",
    title: "Hospital Management System",
    category: "Industry software",
    eyebrow: "Coordinated workflows for healthcare operations",
    headline: "Support healthcare teams with connected operational workflows.",
    intro: "Explore management software for coordinating administrative tasks, appointments, and records in line with your organization's requirements.",
    overview: "Healthcare operations involve distinct roles, sensitive information, and important process controls. We start by understanding the operational workflows and data responsibilities, then define a carefully scoped system or integration project.",
    cardDescription: "Healthcare operations software scoped around administrative workflows and information handling.",
    problems: [
      { title: "Administrative information lives in separate tools", description: "Map where operational records are created and how authorized staff need to access them." },
      { title: "Appointment coordination takes manual effort", description: "Review scheduling and communication steps for opportunities to improve consistency." },
      { title: "Teams need clearer operational handoffs", description: "Clarify how responsibilities and status move between departments." },
    ],
    solutions: [
      { title: "Administrative workflow planning", description: "Map roles and processes such as scheduling, registration, and internal coordination." },
      { title: "Operational dashboards", description: "Present agreed non-clinical status and workload information for staff." },
      { title: "Systems integration assessment", description: "Review integration needs, data boundaries, and available system interfaces." },
    ],
    benefits: ["Workflows documented around staff responsibilities", "Information access considered by role", "Operational requirements surfaced early", "A realistic scope for review and phased delivery"],
    deliverables: [
      { title: "Workflow and access discovery", description: "A view of users, process stages, information needs, and constraints." },
      { title: "Solution and integration plan", description: "A proposed scope based on existing platforms and operational requirements." },
      { title: "Agreed implementation and handover", description: "The scoped software work with documentation for relevant users." },
    ],
    faqs: [
      { question: "Can the system store clinical or patient information?", answer: "Any handling of sensitive health information requires careful requirements, security, privacy, and regulatory review before implementation." },
      { question: "Can you integrate with our existing hospital systems?", answer: "We can assess available interfaces and data requirements, then confirm feasibility and responsibilities before agreeing a scope." },
    ],
  },
  {
    slug: "lawyer-management-system",
    title: "Lawyer Management System",
    category: "Industry software",
    eyebrow: "Organized workflows for legal practices",
    headline: "Help legal teams keep matters and next steps in view.",
    intro: "Plan legal practice workflows for organizing matters, client records, documents, and key administrative tasks.",
    overview: "Legal teams need reliable ways to organize matter information and coordinate follow-up. We work with your practice to understand roles, record structures, and existing tools, then define an appropriate management workflow.",
    cardDescription: "Matter and client management workflows designed for the administrative needs of legal teams.",
    problems: [
      { title: "Matter details are spread across folders", description: "Define a consistent structure for matter records and associated information." },
      { title: "Important dates need better visibility", description: "Review how teams capture deadlines, reminders, and responsibilities." },
      { title: "Client updates are difficult to coordinate", description: "Map communication and status workflows across matter teams." },
    ],
    solutions: [
      { title: "Matter and client records", description: "Organize core information and access around agreed practice workflows." },
      { title: "Task and deadline tracking", description: "Support assignment, reminders, and matter-related next steps." },
      { title: "Document and workflow connections", description: "Assess suitable links with document storage and other practice tools." },
    ],
    benefits: ["A more consistent view of active matters", "Clearer ownership of tasks and follow-ups", "Information access considered by role", "Existing practice systems reviewed before changes"],
    deliverables: [
      { title: "Practice workflow discovery", description: "A map of matter handling, user roles, and information needs." },
      { title: "System configuration or scope", description: "An agreed approach to records, tasks, access, and integrations." },
      { title: "User guidance and handover", description: "Documentation for using and maintaining the agreed workflows." },
    ],
    faqs: [
      { question: "Can the system replace our existing case-management software?", answer: "We first compare your requirements and current platform capabilities. Replacement is only one possible option and depends on a careful review." },
      { question: "How do you approach confidential client information?", answer: "Access, data handling, and security requirements should be defined before implementation. Your professional and regulatory obligations remain central to that review." },
    ],
  },
];

export const serviceNavigation = [
  "website-design-development",
  "custom-web-applications",
  "mobile-app-development",
  "e-commerce-solutions",
  "artificial-intelligence",
  "cloud-devops",
  "crm-solutions",
  "erp-solutions",
];

export const productNavigation = [
  "project-management",
  "gst-billing-accounting",
  "hospital-management-system",
  "lawyer-management-system",
];

export function getProductLabel(slug: string, title: string) {
  if (slug === "project-management") return "Project Management";
  if (slug === "hospital-management-system") return "Hospital Management";
  if (slug === "lawyer-management-system") return "Lawyer Management";
  return title;
}

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}