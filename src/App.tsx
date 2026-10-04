import { useEffect, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent as ReactKeyboardEvent } from "react";

const CONTACT_EMAIL = "info@rawsolutions.in";
const CONTACT_PHONE_1 = "+91 90141 96568";
const CONTACT_PHONE_2 = "+91 63003 77455";
const CONTACT_PHONE_3 = "+91 93916 80846";
const CONTACT_LINK = `mailto:${CONTACT_EMAIL}?subject=Lighting%20design%20enquiry`;

const audiences = [
  {
    id: "homeowners",
    label: "Homeowners",
    title: "A home that feels like you.",
    description:
      "Layered light for slow mornings, lively dinners, and everything in between. Thoughtful room-by-room design makes your home feel more considered at every hour.",
    image:
      "https://images.pexels.com/photos/8134760/pexels-photo-8134760.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1500",
    alt: "Warmly lit contemporary living room with natural wood and a sculptural sofa",
    caption: "A softer landing at the end of the day",
  },
  {
    id: "real-estate",
    label: "Real estate",
    title: "Let the space do the talking.",
    description:
      "Bring out a property's character with a consistent lighting language. We help homes, show properties, and shared spaces make a thoughtful first impression.",
    image:
      "https://images.pexels.com/photos/7031402/pexels-photo-7031402.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1500",
    alt: "Open-plan modern home with a warmly illuminated kitchen and staircase",
    caption: "A considered first impression",
  },
  {
    id: "builders",
    label: "Builders",
    title: "Design intent, made buildable.",
    description:
      "Clear layouts, fixture schedules, and control notes give the whole team something practical to work from, without losing the feeling behind the design.",
    image:
      "https://images.pexels.com/photos/35021550/pexels-photo-35021550.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1500",
    alt: "Minimal modern kitchen with warm timber cabinetry and precise architectural lighting",
    caption: "Details that work on site",
  },
  {
    id: "smart-homes",
    label: "Home automation",
    title: "A whole new mood, at a touch.",
    description:
      "Plan lighting scenes and dimming from the start. We coordinate the design intent with your automation team so the controls feel as natural as the light.",
    image:
      "https://images.pexels.com/photos/12294089/pexels-photo-12294089.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1500",
    alt: "Refined contemporary kitchen with ambient architectural lighting",
    caption: "Lighting and controls, in sync",
  },
] as const;

const services = [
  {
    number: "01",
    title: "Lighting concepts & layouts",
    description:
      "A room-by-room plan for ambient, task, and accent light, shaped around the architecture and the way you use it.",
  },
  {
    number: "02",
    title: "Fixture curation & specification",
    description:
      "Considered recommendations for beam, colour temperature, finish, and performance, with a clear schedule to follow.",
  },
  {
    number: "03",
    title: "Controls & automation intent",
    description:
      "Useful lighting scenes and intuitive switching planned early, ready to coordinate with your electrician or integration team.",
  },
  {
    number: "04",
    title: "Build-team coordination",
    description:
      "Practical drawing notes and design guidance help translate the original idea from plan to finished space.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Start with the space",
    description:
      "We learn how you live, what you are building, and what the plans need to do.",
  },
  {
    number: "02",
    title: "Shape the light",
    description:
      "Layers, fittings, and controls come together in a clear, coordinated design.",
  },
  {
    number: "03",
    title: "Bring it to life",
    description:
      "Your team gets the detail and direction to carry the lighting through to install.",
  },
];

const testimonials = [
  {
    quote:
      "The house finally feels calm in the evening. Every light has a reason to be there, and the whole space feels more like us.",
    byline: "Homeowner",
    detail: "Whole-home lighting design",
  },
  {
    quote:
      "The drawings gave our site team the clarity they needed, without losing any of the feeling behind the design.",
    byline: "Residential builder",
    detail: "New-build collaboration",
  },
  {
    quote:
      "Moving from work to wind-down in one touch feels effortless. The thoughtful planning is what makes it work.",
    byline: "Smart-home client",
    detail: "Scenes & controls",
  },
];

const pricingScopes = [
  {
    number: "01",
    title: "A single room",
    description: "A focused plan for the space that needs a new rhythm.",
    deliverables: "Room layout / layered-light direction / fixture guidance",
  },
  {
    number: "02",
    title: "A whole residence",
    description: "One considered lighting language, mapped room by room.",
    deliverables: "Lighting plans / fixture schedule / control intent",
  },
  {
    number: "03",
    title: "A development or build",
    description: "A repeatable design approach, made practical for delivery.",
    deliverables: "Unit types / specification support / team coordination",
  },
];

const faqs = [
  {
    question: "When should I bring in a lighting designer?",
    answer:
      "As early as you can, ideally while layouts and electrical plans are still flexible. We can also help with a room refresh or an existing home; the scope simply starts from what is already in place.",
  },
  {
    question: "What will I receive as part of a lighting design?",
    answer:
      "Your scope can include room-by-room lighting layouts, layered-light guidance, a considered fixture schedule, and notes for switching or controls. We agree the exact deliverables with you before the design begins.",
  },
  {
    question: "Can you work with my architect, interior designer, or builder?",
    answer:
      "Absolutely. Lighting works best as part of the wider design conversation. We coordinate with your project team and tailor the drawings and guidance to the information they need.",
  },
  {
    question: "Can lighting be designed around a home-automation system?",
    answer:
      "Yes. We plan scenes, dimming intent, and the relationship between fittings and controls, then coordinate that design intent with your chosen automation specialist.",
  },
  {
    question: "How is the design fee worked out?",
    answer:
      "Every project is different, so we start with a short conversation about the plans and level of detail you need. You receive a clear, fixed-fee proposal with the scope and deliverables before any design work starts.",
  },
  {
    question: "Do you work with projects remotely?",
    answer:
      "Many projects can be developed remotely from drawings, references, and a conversation about the space. We will agree the right way to collaborate based on your project and location.",
  },
];

function ArrowIcon({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="arrow-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {diagonal ? (
        <>
          <path d="M7 17 17 7" />
          <path d="M7 7h10v10" />
        </>
      ) : (
        <>
          <path d="M4.5 12h14" />
          <path d="m12.5 5.5 6.5 6.5-6.5 6.5" />
        </>
      )}
    </svg>
  );
}

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <img
        src="/images/raw-logo.svg"
        alt="RAW Lighting Solution logo"
        className="brand-logo-image"
      />
    </span>
  );
}

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeAudience, setActiveAudience] = useState<(typeof audiences)[number]["id"]>(
    "homeowners",
  );
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      targets.forEach((target) => target.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -35px 0px" },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const selectedAudience = audiences.find((item) => item.id === activeAudience) ?? audiences[0];

  const handleTabKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex = index;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % audiences.length;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + audiences.length) % audiences.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = audiences.length - 1;

    if (nextIndex !== index) {
      event.preventDefault();
      setActiveAudience(audiences[nextIndex].id);
      tabRefs.current[nextIndex]?.focus();
    }
  };

  const moveTestimonial = (direction: -1 | 1) => {
    setActiveTestimonial((current) => (current + direction + testimonials.length) % testimonials.length);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className={`site-header ${scrolled ? "is-scrolled" : ""} ${menuOpen ? "menu-is-open" : ""}`}>
        <div className="header-inner">
          <a className="brand-lockup" href="#top" onClick={closeMenu} aria-label="RAW Lighting Solution home">
            <BrandMark />
            <span className="brand-name">
              <strong>RAW</strong>
              <span>LIGHTING<br />SOLUTION</span>
            </span>
          </a>

          <nav className={`primary-nav ${menuOpen ? "nav-is-open" : ""}`} aria-label="Main navigation">
            <a href="#services" onClick={closeMenu}>What we do</a>
            <a href="#audiences" onClick={closeMenu}>Who we help</a>
            <a href="#process" onClick={closeMenu}>Our approach</a>
            <a href="#faq" onClick={closeMenu}>FAQs</a>
            <a className="mobile-contact" href={CONTACT_LINK} onClick={closeMenu}>
              Start a project <ArrowIcon />
            </a>
          </nav>

          <a className="header-cta" href={CONTACT_LINK}>
            <span>Plan your lighting</span>
            <ArrowIcon diagonal />
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="menu-toggle-lines" aria-hidden="true"><span /><span /></span>
          </button>
        </div>
        <div id="mobile-navigation" className={`mobile-nav-shell ${menuOpen ? "is-open" : ""}`}>
          <nav aria-label="Mobile navigation">
            <a href="#services" onClick={closeMenu}>What we do <ArrowIcon /></a>
            <a href="#audiences" onClick={closeMenu}>Who we help <ArrowIcon /></a>
            <a href="#process" onClick={closeMenu}>Our approach <ArrowIcon /></a>
            <a href="#faq" onClick={closeMenu}>FAQs <ArrowIcon /></a>
            <a className="mobile-nav-contact" href={CONTACT_LINK} onClick={closeMenu}>Start a project <ArrowIcon diagonal /></a>
          </nav>
        </div>
      </header>

      <main id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <img
            className="hero-photo"
            src="/images/raw-hero.jpg"
            alt="A calm, contemporary living space brought to life with warm layered architectural lighting"
            fetchPriority="high"
          />
          <div className="hero-shade" aria-hidden="true" />
          <div className="hero-content page-width">
            <p className="hero-eyebrow">Lighting design, considered.</p>
            <h1 className="hero-title" id="hero-title">
              <span className="hero-word">RAW</span>
              <span className="hero-subbrand"><i /> Lighting Solution</span>
            </h1>
            <p className="hero-copy">
              Lighting design for the way you live, build, and move through a space.
            </p>
            <div className="hero-actions">
              <a className="button button-light" href={CONTACT_LINK}>
                Start your lighting plan <ArrowIcon />
              </a>
              <a className="text-link text-link-light" href="#services">
                See what we do <span className="text-link-arrow"><ArrowIcon /></span>
              </a>
            </div>
          </div>
          <div className="hero-bottom-line page-width" aria-hidden="true">
            <span>Make room for better light</span>
            <span className="hero-line-rule" />
            <span>01 / 07</span>
          </div>
        </section>

        <section className="audience-strip" aria-labelledby="audience-strip-title">
          <div className="page-width audience-strip-inner">
            <p className="eyebrow reveal" id="audience-strip-title">Good light moves with a space.</p>
            <div className="audience-types">
              {[
                "Homeowners",
                "Real estate",
                "Builders",
                "Home automation",
              ].map((item, index) => (
                <span className="audience-type reveal" key={item} style={{ "--delay": `${index * 80}ms` } as CSSProperties}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="services-section section-space" id="services" aria-labelledby="services-title">
          <div className="page-width services-grid">
            <div className="section-intro reveal">
              <p className="eyebrow section-index"><span>01</span> / What we do</p>
              <h2 className="section-heading" id="services-title">The right light is never just about the fitting.</h2>
              <p className="section-copy">
                It is the feeling of a room, the way a detail comes forward, and how easily the space works after dark.
              </p>
              <a className="text-link dark-link" href={CONTACT_LINK}>
                Talk through your project <span className="text-link-arrow"><ArrowIcon /></span>
              </a>
            </div>

            <div className="service-list" role="list">
              {services.map((service, index) => (
                <article className="service-row reveal" role="listitem" key={service.number} style={{ "--delay": `${index * 90}ms` } as CSSProperties}>
                  <span className="row-number">{service.number}</span>
                  <div className="service-row-content">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>
                  <a className="round-arrow" href={CONTACT_LINK} aria-label={`Enquire about ${service.title}`}>
                    <ArrowIcon diagonal />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="audience-section section-space" id="audiences" aria-labelledby="audience-title">
          <div className="page-width">
            <div className="audience-section-header reveal">
              <div>
                <p className="eyebrow section-index"><span>02</span> / Made for your next move</p>
                <h2 className="section-heading" id="audience-title">One point of view.<br />Every kind of space.</h2>
              </div>
              <p className="section-copy">
                A considered lighting plan can make a home more personal, a property more compelling, and a build easier to bring together.
              </p>
            </div>

            <div className="audience-showcase reveal">
              <div className="audience-tabs" role="tablist" aria-label="Choose a project type">
                {audiences.map((item, index) => (
                  <button
                    ref={(element) => { tabRefs.current[index] = element; }}
                    className={`audience-tab ${activeAudience === item.id ? "is-active" : ""}`}
                    id={`audience-tab-${item.id}`}
                    type="button"
                    role="tab"
                    aria-selected={activeAudience === item.id}
                    aria-controls="audience-panel"
                    tabIndex={activeAudience === item.id ? 0 : -1}
                    key={item.id}
                    onClick={() => setActiveAudience(item.id)}
                    onKeyDown={(event) => handleTabKeyDown(event, index)}
                  >
                    <span className="audience-tab-label">{item.label}</span>
                    <span className="audience-tab-arrow"><ArrowIcon /></span>
                  </button>
                ))}
                <p className="tab-note">Select a project type to explore</p>
              </div>

              <div
                className="audience-detail"
                id="audience-panel"
                role="tabpanel"
                tabIndex={0}
                aria-labelledby={`audience-tab-${selectedAudience.id}`}
                key={selectedAudience.id}
              >
                <div className="audience-detail-copy">
                  <p className="eyebrow">{selectedAudience.label}</p>
                  <h3>{selectedAudience.title}</h3>
                  <p>{selectedAudience.description}</p>
                  <a className="text-link dark-link" href={CONTACT_LINK}>
                    Design for your space <span className="text-link-arrow"><ArrowIcon /></span>
                  </a>
                </div>
                <figure className="audience-image-wrap">
                  <img className="audience-image" src={selectedAudience.image} alt={selectedAudience.alt} loading="lazy" />
                  <figcaption className="image-caption">
                    <span>Designed around the feeling</span>
                    <span className="image-caption-line" />
                    <span>{selectedAudience.caption}</span>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </section>

        <section className="benefits-section" aria-labelledby="benefits-title">
          <div className="benefits-orbit" aria-hidden="true" />
          <div className="page-width benefits-grid">
            <div className="benefits-intro reveal">
              <p className="eyebrow section-index"><span>03</span> / Why thoughtful light</p>
              <h2 id="benefits-title">More than beautiful.<br /><em>Better by design.</em></h2>
              <p>
                The most memorable lighting rarely asks for attention. It simply makes a space feel right, from first light to last.
              </p>
            </div>
            <div className="benefit-list">
              {[
                ["Comfort", "A softer, more natural rhythm for everyday life."],
                ["Character", "Texture, art, and architecture in their best light."],
                ["Clarity", "A practical plan your project team can understand."],
                ["Control", "The right scene for the moment, without the fuss."],
              ].map(([title, description], index) => (
                <div className="benefit-row reveal" key={title} style={{ "--delay": `${index * 85}ms` } as CSSProperties}>
                  <span className="benefit-number">0{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="process-section section-space" id="process" aria-labelledby="process-title">
          <div className="page-width">
            <div className="process-heading reveal">
              <div>
                <p className="eyebrow section-index"><span>04</span> / A clear process</p>
                <h2 className="section-heading" id="process-title">From first sketch<br />to final feeling.</h2>
              </div>
              <p className="section-copy">
                Good design should feel exciting, not complicated. We make every step considered, collaborative, and clear.
              </p>
            </div>
            <div className="process-steps">
              {processSteps.map((step, index) => (
                <article className="process-step reveal" key={step.number} style={{ "--delay": `${index * 110}ms` } as CSSProperties}>
                  <span className="process-number">{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="testimonial-section" aria-labelledby="testimonial-title">
          <div className="page-width testimonial-grid">
            <div className="testimonial-intro reveal">
              <p className="eyebrow section-index"><span>05</span> / The difference, in their words</p>
              <h2 id="testimonial-title">Good design is felt, long after it is seen.</h2>
            </div>
            <div className="testimonial-content reveal">
              <div className="quote-mark" aria-hidden="true">“</div>
              <blockquote key={activeTestimonial} className="testimonial-quote" aria-live="polite">
                {testimonials[activeTestimonial].quote}
              </blockquote>
              <div className="testimonial-bottom">
                <div className="testimonial-byline" key={`byline-${activeTestimonial}`}>
                  <strong>{testimonials[activeTestimonial].byline}</strong>
                  <span>{testimonials[activeTestimonial].detail}</span>
                </div>
                <div className="quote-controls" aria-label="Testimonial controls">
                  <button type="button" className="quote-control" aria-label="Previous testimonial" onClick={() => moveTestimonial(-1)}>
                    <ArrowIcon />
                  </button>
                  <span className="quote-count" aria-live="polite">0{activeTestimonial + 1} <i>/</i> 0{testimonials.length}</span>
                  <button type="button" className="quote-control quote-control-next" aria-label="Next testimonial" onClick={() => moveTestimonial(1)}>
                    <ArrowIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pricing-section section-space" id="pricing" aria-labelledby="pricing-title">
          <div className="page-width pricing-grid">
            <div className="pricing-intro reveal">
              <p className="eyebrow section-index"><span>06</span> / A thoughtful investment</p>
              <h2 className="section-heading" id="pricing-title">A clear scope.<br />A fee agreed up front.</h2>
              <p className="section-copy">
                Every project is different. After a short conversation, you receive a fixed-fee proposal shaped around your plans and the level of detail you need.
              </p>
              <a className="button button-dark" href={CONTACT_LINK}>
                Request a project quote <ArrowIcon />
              </a>
              <p className="pricing-footnote">No off-the-shelf packages. No surprises once we begin.</p>
            </div>
            <div className="pricing-scopes" role="list" aria-label="Lighting design project scopes">
              {pricingScopes.map((scope, index) => (
                <article className="pricing-row reveal" role="listitem" key={scope.number} style={{ "--delay": `${index * 90}ms` } as CSSProperties}>
                  <span className="row-number">{scope.number}</span>
                  <div className="pricing-row-copy">
                    <h3>{scope.title}</h3>
                    <p>{scope.description}</p>
                    <span>{scope.deliverables}</span>
                  </div>
                  <a href={CONTACT_LINK} className="pricing-arrow" aria-label={`Ask for pricing for ${scope.title}`}><ArrowIcon diagonal /></a>
                </article>
              ))}
              <p className="pricing-note reveal">Your proposal sets out the scope, deliverables, and fee before any design work starts.</p>
            </div>
          </div>
        </section>

        <section className="faq-section section-space" id="faq" aria-labelledby="faq-title">
          <div className="page-width faq-grid">
            <div className="faq-intro reveal">
              <p className="eyebrow section-index"><span>07</span> / A few good questions</p>
              <h2 className="section-heading" id="faq-title">Before we<br />switch on.</h2>
              <p className="section-copy">Have something else in mind? We would love to hear about your project.</p>
              <a className="text-link dark-link" href={CONTACT_LINK}>
                Ask us directly <span className="text-link-arrow"><ArrowIcon /></span>
              </a>
            </div>
            <div className="faq-list">
              {faqs.map((faq, index) => (
                <details className="faq-item reveal" key={faq.question} style={{ "--delay": `${index * 55}ms` } as CSSProperties}>
                  <summary>
                    <span>{faq.question}</span>
                    <span className="faq-toggle" aria-hidden="true"><span /><span /></span>
                  </summary>
                  <div className="faq-answer"><p>{faq.answer}</p></div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="closing-section" id="contact" aria-labelledby="closing-title">
          <div className="closing-light" aria-hidden="true" />
          <div className="page-width closing-content reveal">
            <p className="eyebrow">Make the next space feel different.</p>
            <h2 id="closing-title">Good light.<br /><em>Good living.</em></h2>
            <p>Tell us what you are planning. We will help you see what it could become.</p>
            <div className="closing-actions">
              <a className="button button-light" href={CONTACT_LINK}>
                Tell us about your project <ArrowIcon />
              </a>
              <span className="closing-email">Or email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></span>
            </div>
            <div className="closing-contacts" style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "1.5rem" }}>
              <a href={`tel:${CONTACT_PHONE_1.replace(/\s+/g, "")}`}>{CONTACT_PHONE_1}</a>
              <a href={`tel:${CONTACT_PHONE_2.replace(/\s+/g, "")}`}>{CONTACT_PHONE_2}</a>
              <a href={`tel:${CONTACT_PHONE_3.replace(/\s+/g, "")}`}>{CONTACT_PHONE_3}</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="page-width">
          <div className="footer-main">
            <div className="footer-brand-column">
              <a className="brand-lockup footer-brand" href="#top" aria-label="RAW Lighting Solution home">
                <BrandMark />
                <span className="brand-name">
                  <strong>RAW</strong>
                  <span>LIGHTING<br />SOLUTION</span>
                </span>
              </a>
              <p>Thoughtful lighting design, from the first plan to the final detail.</p>
            </div>
            <div className="footer-nav-column">
              <p className="footer-label">Explore</p>
              <a href="#services">What we do</a>
              <a href="#audiences">Who we help</a>
              <a href="#process">Our approach</a>
              <a href="#pricing">Pricing</a>
            </div>
            <div className="footer-nav-column">
              <p className="footer-label">Made for</p>
              <a href="#audiences" onClick={() => setActiveAudience("homeowners")}>Homeowners</a>
              <a href="#audiences" onClick={() => setActiveAudience("real-estate")}>Real estate</a>
              <a href="#audiences" onClick={() => setActiveAudience("builders")}>Builders</a>
              <a href="#audiences" onClick={() => setActiveAudience("smart-homes")}>Home automation</a>
            </div>
            <div className="footer-contact-column">
              <p className="footer-label">Start a conversation</p>
              <a className="footer-email" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}<ArrowIcon diagonal /></a>
              <a className="footer-email" href={`tel:${CONTACT_PHONE_1.replace(/\s+/g, "")}`}>{CONTACT_PHONE_1}</a>
              <a className="footer-email" href={`tel:${CONTACT_PHONE_2.replace(/\s+/g, "")}`}>{CONTACT_PHONE_2}</a>
              <a className="footer-email" href={`tel:${CONTACT_PHONE_3.replace(/\s+/g, "")}`}>{CONTACT_PHONE_3}</a>
              <a className="footer-top-link" href="#top">Back to top <span className="back-arrow"><ArrowIcon /></span></a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} RAW Lighting Solution</span>
            <span>Light, with intention.</span>
            <a href="#top" className="footer-mark" aria-label="Back to top"><BrandMark /></a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;