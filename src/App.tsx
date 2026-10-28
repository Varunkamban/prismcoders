import { useEffect, useState } from "react";
import PerspectiveTunnelHero from "@/components/ui/perspective-tunnel-hero";
import HalftoneWordmarkFooter, { type FooterColumn } from "@/components/ui/halftone-wordmark-footer";
import { AboutPage, ContactPage, HomePage, ServicePage, SitemapPage } from "./Pages";
import { getProductLabel, getServiceBySlug, productNavigation, serviceNavigation } from "./service-pages";

const siteOrigin = "https://prismcoders.com";

function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const services = serviceNavigation.map((slug) => getServiceBySlug(slug)).filter((service) => service !== undefined);
  const products = productNavigation.map((slug) => getServiceBySlug(slug)).filter((service) => service !== undefined);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <a className="brand" href="/" aria-label="Prism Coders home">
          <img className="brand-logo" src="/prism-coders-logo.png" alt="Prism Coders — Ideas / Code / Reality" />
        </a>
        <button
          className="site-nav-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span>{menuOpen ? "Close" : "Menu"}</span>
          <span className="site-nav-toggle-icon" aria-hidden="true">{menuOpen ? "−" : "+"}</span>
        </button>
        <nav id="primary-navigation" className={`site-navigation${menuOpen ? " is-open" : ""}`} aria-label="Main navigation">
          <a className="site-nav-link" href="/" onClick={closeMenu}>Home</a>
          <details className="site-nav-menu">
            <summary>Services <span aria-hidden="true">⌄</span></summary>
            <div className="site-nav-dropdown site-nav-dropdown-services">
              {services.map((service) => (
                <a href={`/${service.slug}`} key={service.slug} onClick={closeMenu}>{service.title}</a>
              ))}
            </div>
          </details>
          <details className="site-nav-menu">
            <summary>Products <span aria-hidden="true">⌄</span></summary>
            <div className="site-nav-dropdown">
              {products.map((product) => (
                <a href={`/${product.slug}`} key={product.slug} onClick={closeMenu}>{getProductLabel(product.slug, product.title)}</a>
              ))}
            </div>
          </details>
          <a className="site-nav-link" href="/digital-marketing" onClick={closeMenu}>Digital Marketing</a>
          <a className="site-nav-link" href="/about" onClick={closeMenu}>About</a>
          <a className="site-nav-link site-nav-contact" href="/contact" onClick={closeMenu}>Contact <span aria-hidden="true">↗</span></a>
        </nav>
      </div>
    </header>
  );
}

function SiteFooter() {
  const columns: FooterColumn[] = [
    {
      title: "Explore",
      links: [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "Sitemap", href: "/sitemap" },
      ],
    },
    {
      title: "Services",
      links: serviceNavigation.flatMap((slug) => {
        const service = getServiceBySlug(slug);
        return service ? [{ label: service.title, href: `/${slug}` }] : [];
      }),
    },
    {
      title: "Products",
      links: productNavigation.flatMap((slug) => {
        const product = getServiceBySlug(slug);
        return product ? [{ label: getProductLabel(slug, product.title), href: `/${slug}` }] : [];
      }),
    },
    {
      title: "Digital Marketing",
      links: [{ label: "Digital Marketing", href: "/digital-marketing" }],
    },
  ];

  return (
    <HalftoneWordmarkFooter
      wordmark="prismcoders"
      label="Prismcoders"
      meta={`© ${new Date().getFullYear()} · Ideas / Code / Reality.`}
      columns={columns}
    />
  );
}

function App() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  const service = getServiceBySlug(path.slice(1));
  const search = new URLSearchParams(window.location.search);
  const serviceForContact = search.get("service") || "";

  useEffect(() => {
    let title = "Prismcoders — Ideas into digital reality";
    let description = "We design and develop websites, applications, AI-powered solutions, and business software that help businesses work smarter and grow with confidence.";

    if (path === "/about") {
      title = "About Prismcoders — Technology with purpose";
      description = "Learn about Prismcoders' people-first approach to practical, maintainable digital solutions.";
    } else if (path === "/contact") {
      title = "Contact Prismcoders — Discuss your project";
      description = "Tell Prismcoders about your business challenge, website, application, or digital product idea.";
    } else if (path === "/sitemap") {
      title = "Sitemap — Prismcoders";
      description = "Browse Prismcoders pages, services, and products.";
    } else if (service) {
      title = `${service.title} | Prismcoders`;
      description = service.intro;
    }

    document.title = title;
    const descriptionTag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    descriptionTag?.setAttribute("content", description);

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.append(canonical);
    }
    canonical.href = `${siteOrigin}${path === "/" ? "/" : path}`;
  }, [path, service]);

  let page;
  if (path === "/") {
    page = <><PerspectiveTunnelHero /><HomePage /></>;
  } else if (path === "/about") {
    page = <AboutPage />;
  } else if (path === "/contact") {
    page = <ContactPage initialService={serviceForContact} />;
  } else if (path === "/sitemap") {
    page = <SitemapPage />;
  } else if (service) {
    page = <ServicePage service={service} />;
  } else {
    page = (
      <main className="not-found-page">
        <p className="eyebrow">404 — Page not found</p>
        <h1>That page isn&apos;t here.</h1>
        <p>Try returning home or browse our services.</p>
        <a className="button button-lime" href="/">Back to home <span aria-hidden="true">↗</span></a>
      </main>
    );
  }

  return (
    <>
      <SiteHeader />
      <main>{page}</main>
      <SiteFooter />
    </>
  );
}

export default App;
