import { useState, type FormEvent } from "react";
import {
  getServiceBySlug,
  getProductLabel,
  productNavigation,
  serviceNavigation,
  services,
  type ServicePageData,
} from "./service-pages";

const projectSteps = [
  {
    title: "Discover",
    description: "Discuss your business, users, objectives, constraints, and requirements.",
  },
  {
    title: "Plan and design",
    description: "Define the scope, priorities, user experience, technology, and milestones.",
  },
  {
    title: "Build and test",
    description: "Implement the agreed functionality and review it against requirements.",
  },
  {
    title: "Launch and improve",
    description: "Prepare the release, share relevant documentation, and plan future improvements.",
  },
];

function PageHero({
  eyebrow,
  title,
  description,
  primaryHref = "/contact",
  primaryLabel = "Discuss your project",
  secondaryHref,
  secondaryLabel,
}: {
  eyebrow: string;
  title: string;
  description: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <section className="content-hero">
      <div className="container content-hero-inner">
        <p className="eyebrow"><span className="status-dot" aria-hidden="true" />{eyebrow}</p>
        <h1>{title}</h1>
        <p className="content-hero-description">{description}</p>
        <div className="content-hero-actions">
          <a className="button button-lime" href={primaryHref}>{primaryLabel}<span aria-hidden="true">↗</span></a>
          {secondaryHref && secondaryLabel && (
            <a className="button button-quiet" href={secondaryHref}>{secondaryLabel}<span aria-hidden="true">↓</span></a>
          )}
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="content-section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {description && <p className="content-intro">{description}</p>}
    </div>
  );
}

function ServiceDirectory({ items = services }: { items?: ServicePageData[] }) {
  return (
    <div className="service-directory">
      {items.map((service, index) => (
        <a className="directory-card" href={`/${service.slug}`} key={service.slug}>
          <span className="directory-meta">{String(index + 1).padStart(2, "0")} / {service.category}</span>
          <h3>{service.title}</h3>
          <p>{service.cardDescription}</p>
          <span className="directory-link">Explore service <span aria-hidden="true">↗</span></span>
        </a>
      ))}
    </div>
  );
}

function StepsGrid() {
  return (
    <div className="content-card-grid content-card-grid-four">
      {projectSteps.map((step, index) => (
        <article className="content-card" key={step.title}>
          <span className="content-card-icon">{String(index + 1).padStart(2, "0")}</span>
          <h3>{step.title}</h3>
          <p>{step.description}</p>
        </article>
      ))}
    </div>
  );
}

export function HomePage() {
  return (
    <>
      <PageHero
        eyebrow="Ideas · Code · Reality"
        title="Ideas into digital reality."
        description="We design and develop websites, applications, AI-powered solutions, and business software that help businesses work smarter, serve customers better, and grow with confidence."
        primaryLabel="Discuss your project"
        secondaryHref="#services"
        secondaryLabel="Explore our services"
      />

      <section className="content-section content-section-paper" id="services">
        <div className="container">
          <SectionHeading
            eyebrow="Technology built around your business"
            title="The right tools for the challenge in front of you."
            description="Every business has different challenges. We help turn those challenges into practical digital solutions, from your first website to custom software that supports everyday operations."
          />
          <ServiceDirectory />
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          <SectionHeading
            eyebrow="How we work"
            title="From a business challenge to a working solution."
            description="We begin by understanding your goals, identifying the right approach, and defining a realistic scope. From there, the focus is on thoughtful design, development, testing, and a clear path to launch."
          />
          <StepsGrid />
        </div>
      </section>

      <section className="content-cta">
        <div className="container content-cta-inner">
          <div>
            <p className="eyebrow">Have an idea worth building?</p>
            <h2>Let&apos;s make the next step clear.</h2>
            <p>Whether you need a new website, a business application, or a more efficient digital workflow, let&apos;s discuss what you have in mind.</p>
          </div>
          <a className="button button-lime" href="/contact">Start a conversation <span aria-hidden="true">↗</span></a>
        </div>
      </section>
    </>
  );
}

export function ServicePage({ service }: { service: ServicePageData }) {
  const contactHref = `/contact?service=${encodeURIComponent(service.title)}#contact`;
  const related = services
    .filter((item) => item.slug !== service.slug)
    .sort((a, b) => Number(b.category === service.category) - Number(a.category === service.category))
    .slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={service.eyebrow}
        title={service.headline}
        description={service.intro}
        primaryHref={contactHref}
        primaryLabel="Discuss your requirements"
        secondaryHref="#service-details"
        secondaryLabel="Explore the service"
      />

      <section className="content-section content-section-paper" id="service-details">
        <div className="container content-split">
          <div>
            <p className="eyebrow eyebrow-dark">Understanding your needs</p>
            <h2>The challenge is different. <span>Your solution should be too.</span></h2>
          </div>
          <div className="content-copy">
            <p>{service.overview}</p>
            <p>Every project begins with a conversation about your goals, users, existing systems, constraints, and priorities. This helps establish a realistic scope before development begins.</p>
            <a className="text-link text-link-dark" href={contactHref}>Discuss your requirements <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          <SectionHeading
            eyebrow="The business challenge"
            title="Problems worth solving."
            description="A good technology project starts by identifying where time, information, or customer experience can be improved."
          />
          <div className="content-card-grid">
            {service.problems.map((item, index) => (
              <article className="content-card" key={item.title}>
                <span className="content-card-icon" aria-hidden="true">{["↗", "◇", "◎"][index % 3]}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section content-section-soft">
        <div className="container">
          <SectionHeading
            eyebrow="Our capabilities"
            title="What we can help you build."
            description="The exact features and deliverables are defined according to your requirements and the scope agreed for your project."
          />
          <div className="content-card-grid">
            {service.solutions.map((item, index) => (
              <article className="content-card" key={item.title}>
                <span className="content-card-icon" aria-hidden="true">{["⌘", "◎", "↗"][index % 3]}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section content-section-paper">
        <div className="container content-split content-benefits">
          <div>
            <p className="eyebrow eyebrow-dark">Business value</p>
            <h2>Designed around <span>useful outcomes.</span></h2>
            <p className="content-intro">We focus on the practical improvements your solution is intended to support, rather than adding features without a clear purpose.</p>
          </div>
          <ul className="content-check-list">
            {service.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
          </ul>
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          <SectionHeading eyebrow="Project deliverables" title="From planning to launch." />
          <div className="content-card-grid">
            {service.deliverables.map((item, index) => (
              <article className="content-card" key={item.title}>
                <span className="content-card-icon">{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section content-section-soft">
        <div className="container">
          <SectionHeading eyebrow="Our approach" title="A clear process. One step at a time." />
          <StepsGrid />
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          <SectionHeading eyebrow="Frequently asked questions" title={`Questions about ${service.title}.`} />
          <div className="faq-list">
            {service.faqs.map((faq, index) => (
              <details className="faq-item" key={faq.question} open={index === 0}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section content-section-paper">
        <div className="container">
          <SectionHeading eyebrow="Explore more" title="Related services." />
          <ServiceDirectory items={related} />
        </div>
      </section>

      <section className="content-cta">
        <div className="container content-cta-inner">
          <div>
            <p className="eyebrow">Your next move</p>
            <h2>Let&apos;s talk about {service.title.toLowerCase()}.</h2>
            <p>Tell us what you want to improve. We&apos;ll help you work out a useful next step.</p>
          </div>
          <a className="button button-lime" href={contactHref}>Start a conversation <span aria-hidden="true">↗</span></a>
        </div>
      </section>
    </>
  );
}

export function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Prismcoders"
        title="Technology with purpose. Solutions built around people."
        description="We turn business ideas and operational challenges into practical digital experiences, applications, and software."
        secondaryHref="#about-values"
        secondaryLabel="What guides our work"
      />

      <section className="content-section content-section-paper">
        <div className="container content-split">
          <div>
            <p className="eyebrow eyebrow-dark">Who we are</p>
            <h2>Turning complex challenges into <span>clear solutions.</span></h2>
          </div>
          <div className="content-copy">
            <p>Prismcoders is a technology brand focused on helping businesses make better use of digital tools. From websites and web applications to AI integrations and business management systems, our focus is on solving problems through thoughtful technology.</p>
            <p>We believe every project should begin with understanding the people who will use the solution, the challenges they face, and the results the business wants to achieve.</p>
            <p>Rather than adding complexity for its own sake, we aim to create useful, maintainable solutions that can evolve alongside business needs.</p>
          </div>
        </div>
      </section>

      <section className="content-section" id="about-values">
        <div className="container">
          <SectionHeading eyebrow="What we believe" title="Good technology starts with good thinking." />
          <div className="content-card-grid">
            <article className="content-card"><span className="content-card-icon">◎</span><h3>Understand the problem</h3><p>We start with business goals, user needs, and existing workflows before recommending a technical approach.</p></article>
            <article className="content-card"><span className="content-card-icon">⌘</span><h3>Keep it practical</h3><p>We focus on appropriate technology, useful functionality, and a scope that fits the project.</p></article>
            <article className="content-card"><span className="content-card-icon">↗</span><h3>Build for the future</h3><p>Maintainability, performance, security, and future improvements should be considered from the beginning.</p></article>
            <article className="content-card"><span className="content-card-icon">＋</span><h3>Communicate clearly</h3><p>We establish scope, milestones, responsibilities, and next steps so everyone understands the work.</p></article>
          </div>
        </div>
      </section>

      <section className="content-section content-section-soft">
        <div className="container content-split">
          <div><p className="eyebrow">Our mission</p><h2>Make useful technology <span>more accessible.</span></h2><p className="content-intro">Transform ideas into digital products and workflows that address real business problems.</p></div>
          <div><p className="eyebrow">Our vision</p><h2>Technology that creates <span>meaningful value.</span></h2><p className="content-intro">Build long-term relationships through practical innovation and dependable delivery.</p></div>
        </div>
      </section>

      <section className="content-section content-section-paper">
        <div className="container">
          <SectionHeading eyebrow="Our expertise" title="One partner for your digital journey." description="Explore the services that can support your next project." />
          <ServiceDirectory />
        </div>
      </section>

      <section className="content-cta">
        <div className="container content-cta-inner">
          <div><p className="eyebrow">Start with a conversation</p><h2>What would you like to make possible?</h2><p>Share the challenge or idea you&apos;re working through, and we can discuss a practical next step.</p></div>
          <a className="button button-lime" href="/contact">Contact Prismcoders <span aria-hidden="true">↗</span></a>
        </div>
      </section>
    </>
  );
}

export function SitemapPage() {
  const groupedServiceLinks = serviceNavigation.map((slug) => getServiceBySlug(slug)).filter((service) => service !== undefined);
  const groupedProductLinks = productNavigation.map((slug) => getServiceBySlug(slug)).filter((service) => service !== undefined);
  const digitalMarketing = getServiceBySlug("digital-marketing");

  return (
    <>
      <PageHero
        eyebrow="Explore Prismcoders"
        title="Find your way around."
        description="Browse our main pages, services, and products."
        secondaryHref="#site-map"
        secondaryLabel="View all links"
      />
      <section className="content-section content-section-paper" id="site-map">
        <div className="container">
          <div className="content-section-heading">
            <p className="eyebrow eyebrow-dark">Site directory</p>
            <h2>Explore the site.</h2>
          </div>
          <div className="sitemap-groups">
            <section className="sitemap-group" aria-labelledby="sitemap-main-pages">
              <h2 id="sitemap-main-pages">Prismcoders</h2>
              <a href="/">Home <span aria-hidden="true">↗</span></a>
              <a href="/about">About <span aria-hidden="true">↗</span></a>
              <a href="/contact">Contact <span aria-hidden="true">↗</span></a>
              <a href="/sitemap.xml">XML sitemap <span aria-hidden="true">↗</span></a>
            </section>
            <section className="sitemap-group" aria-labelledby="sitemap-services">
              <h2 id="sitemap-services">Services</h2>
              {groupedServiceLinks.map((service) => (
                <a href={`/${service.slug}`} key={service.slug}>{service.title}<span aria-hidden="true">↗</span></a>
              ))}
            </section>
            <section className="sitemap-group" aria-labelledby="sitemap-products">
              <h2 id="sitemap-products">Products</h2>
              {groupedProductLinks.map((service) => (
                <a href={`/${service.slug}`} key={service.slug}>{getProductLabel(service.slug, service.title)}<span aria-hidden="true">↗</span></a>
              ))}
            </section>
            {digitalMarketing && (
              <section className="sitemap-group" aria-labelledby="sitemap-marketing">
                <h2 id="sitemap-marketing">Digital marketing</h2>
                <a href={`/${digitalMarketing.slug}`}>{digitalMarketing.title}<span aria-hidden="true">↗</span></a>
              </section>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export function ContactPage({ initialService = "" }: { initialService?: string }) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const subject = `Project enquiry from ${formData.get("name")}`;
    const body = [
      `Name: ${formData.get("name")}`,
      `Email: ${formData.get("email")}`,
      `Company: ${formData.get("company") || "Not provided"}`,
      `Service: ${formData.get("service")}`,
      "",
      String(formData.get("message") || "No project details provided."),
    ].join("\n");
    window.location.href = `mailto:hello@yourcompany.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  }

  return (
    <>
      <PageHero
        eyebrow="Let's talk"
        title="Have an idea? Let's make it happen."
        description="Tell us about your business, the challenge you want to solve, or the product you want to build. Let's explore the next steps together."
        secondaryHref="#contact"
        secondaryLabel="Start an inquiry"
      />

      <section className="content-section content-section-paper" id="contact">
        <div className="container content-split contact-page-layout">
          <div>
            <p className="eyebrow eyebrow-dark">Start a conversation</p>
            <h2>Every great project starts with <span>a conversation.</span></h2>
            <p className="content-intro">Whether you have a detailed specification or just the beginning of an idea, share what you know. We can use that information to understand your needs and discuss an appropriate approach.</p>
            <h3 className="contact-discuss-heading">What can we discuss?</h3>
            <ul className="content-check-list">
              <li>Website design and development</li>
              <li>Custom applications and mobile apps</li>
              <li>AI, automation, and cloud infrastructure</li>
              <li>CRM, ERP, and business management software</li>
              <li>Digital marketing and online growth</li>
            </ul>
            <div className="contact-help-card"><span className="content-card-icon">↗</span><h3>Not sure what you need?</h3><p>Describe the problem you&apos;re trying to solve. You don&apos;t need to know the technical solution before starting the conversation.</p></div>
          </div>

          <form className="contact-page-form" onSubmit={handleSubmit}>
            <p className="eyebrow eyebrow-dark">Project inquiry</p>
            <h2>Tell us about your project.</h2>
            <p className="contact-form-intro">Fields marked with * are required.</p>
            <div className="contact-page-form-grid">
              <div className="contact-page-field"><label htmlFor="project-name">Your name *</label><input id="project-name" name="name" autoComplete="name" required maxLength={100} placeholder="Your name" /></div>
              <div className="contact-page-field"><label htmlFor="project-email">Email address *</label><input id="project-email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@company.com" /></div>
              <div className="contact-page-field contact-page-field-full"><label htmlFor="project-company">Company name</label><input id="project-company" name="company" autoComplete="organization" maxLength={150} placeholder="Your company (optional)" /></div>
              <div className="contact-page-field contact-page-field-full"><label htmlFor="project-service">Service of interest *</label><select id="project-service" name="service" required defaultValue={initialService}><option value="" disabled>Select a service</option>{services.map((service) => <option value={service.title} key={service.slug}>{service.title}</option>)}<option value="Other / Need guidance">Other / Need guidance</option></select></div>
              <div className="contact-page-field contact-page-field-full"><label htmlFor="project-message">Project details *</label><textarea id="project-message" name="message" required minLength={10} maxLength={5000} rows={5} placeholder="What are you looking to build? What problem should it solve?" /></div>
              <div className="contact-page-field contact-page-field-full"><button className="button button-lime" type="submit">Send project inquiry <span aria-hidden="true">↗</span></button><p className="contact-form-status" role="status" aria-live="polite">{submitted ? "Your email app should open with a draft inquiry." : ""}</p><p className="contact-form-intro">Submitting opens a draft email in your email app. Please don&apos;t include passwords or confidential personal information.</p></div>
            </div>
          </form>
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          <SectionHeading eyebrow="What happens next?" title="A straightforward path to getting started." />
          <div className="content-card-grid content-card-grid-three">
            <article className="content-card"><span className="content-card-icon">01</span><h3>Share your idea</h3><p>Tell us about your goals, current challenges, and what you want to achieve.</p></article>
            <article className="content-card"><span className="content-card-icon">02</span><h3>Discuss the requirements</h3><p>Clarify the functionality, priorities, constraints, and possible approaches.</p></article>
            <article className="content-card"><span className="content-card-icon">03</span><h3>Plan the next steps</h3><p>Establish an appropriate scope, estimated timeline, and proposed deliverables.</p></article>
          </div>
        </div>
      </section>
    </>
  );
}