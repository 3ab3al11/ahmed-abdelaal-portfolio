"use client";

import { useEffect } from "react";

const projects = [
  {
    index: "01",
    title: "University Admission System",
    subtitle: "Bilingual admissions, built for deterministic decisions.",
    description:
      "A rule-driven ASP.NET Core MVC platform that handles applications, document safety, allocation, and high-volume Excel imports without sacrificing traceability.",
    href: "https://github.com/3ab3al11/University-Admission-System",
    tech: ["ASP.NET Core MVC", "EF Core", "SQL Server", "xUnit"],
    stats: [
      ["15", "SQL tables"],
      ["56", "controller actions"],
      ["129", "automated tests"],
    ],
    visual: "admission",
  },
  {
    index: "02",
    title: "Clinic Flow",
    subtitle: "A secure workflow for patients, doctors, and admins.",
    description:
      "A role-aware clinic platform with six appointment states, protected patient data, server-side validation, and conflict prevention at the heart of the booking flow.",
    href: "https://github.com/3ab3al11/Clinic_Flow",
    tech: ["ASP.NET Core MVC", "C#", "EF Core", "SQLite"],
    stats: [
      ["3", "user roles"],
      ["10", "domain entities"],
      ["67", "controller actions"],
    ],
    visual: "clinic",
  },
  {
    index: "03",
    title: "Football Field Booking",
    subtitle: "Concurrency-aware reservations that stay consistent.",
    description:
      "A two-role booking system with timed reservation holds, conflict detection, simulated payments, refunds, reminders, and security across every write action.",
    href: "https://github.com/3ab3al11/Football-Field-Booking-System",
    tech: ["ASP.NET Core MVC", "C#", "EF Core", "SQLite"],
    stats: [
      ["10m", "reservation hold"],
      ["53", "controller actions"],
      ["24", "CSRF-safe posts"],
    ],
    visual: "booking",
  },
];

const capabilities = [
  {
    number: "01",
    title: "Backend systems",
    text: "Structured APIs and MVC applications built with clear boundaries, dependency injection, and maintainable business logic.",
  },
  {
    number: "02",
    title: "Data & workflows",
    text: "Reliable relational models, EF Core migrations, bulk imports, state machines, and transactional operations.",
  },
  {
    number: "03",
    title: "Security by design",
    text: "Identity, RBAC, JWT, validation, CORS, file-safety checks, and authorization applied where the data lives.",
  },
];

const stack = [
  "C#",
  "ASP.NET Core",
  "Web API",
  "EF Core",
  "SQL Server",
  "REST",
  "xUnit",
  "JWT",
  "Dapper",
  "SignalR",
  "Git",
];

const experience = [
  {
    date: "JUL 2026 — NOW",
    role: "Freelance ASP.NET Core Developer",
    company: "Khamsat",
    copy: "Diagnosed and resolved a production application issue for a paid client, earning a 5-star rating.",
  },
  {
    date: "2025 — NOW",
    role: "Social Media & Content Specialist",
    company: "Sahab Real Estate",
    copy: "Create campaign content, promotional assets, and coordinated publishing plans with the wider team.",
  },
  {
    date: "2022 — 2026",
    role: "Student Union President",
    company: "Assiut National University",
    copy: "Led university-wide student teams after serving as Faculty Student Union President and earning institutional recognition.",
  },
];

function ProjectVisual({ type }: { type: string }) {
  if (type === "admission") {
    return (
      <div className="project-visual admission-visual" aria-hidden="true">
        <div className="visual-topline">
          <span>ALLOCATION ENGINE</span>
          <span>LIVE</span>
        </div>
        <div className="allocation-grid">
          <div className="allocation-score">
            <small>Candidate score</small>
            <strong>94.8</strong>
            <span>Eligible</span>
          </div>
          <div className="allocation-rules">
            <span className="rule-pass">01 · Documents verified</span>
            <span className="rule-pass">02 · Rules evaluated</span>
            <span className="rule-pass">03 · Seat allocated</span>
          </div>
        </div>
        <div className="visual-log">
          <span>5,000 rows / batch</span>
          <span>transaction committed</span>
        </div>
      </div>
    );
  }

  if (type === "clinic") {
    return (
      <div className="project-visual clinic-visual" aria-hidden="true">
        <div className="visual-topline">
          <span>CLINIC FLOW</span>
          <span>08:30</span>
        </div>
        <div className="clinic-columns">
          <div>
            <small>Doctor</small>
            <strong>Available</strong>
          </div>
          <div className="appointment-line">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <div>
            <small>Next patient</small>
            <strong>09:00</strong>
          </div>
        </div>
        <div className="clinic-safe">
          <span>NO CONFLICTS</span>
          <span>ROLE CHECKED</span>
        </div>
      </div>
    );
  }

  return (
    <div className="project-visual booking-visual" aria-hidden="true">
      <div className="visual-topline">
        <span>RESERVATION #041</span>
        <span>HOLDING</span>
      </div>
      <div className="booking-clock">
        <span>TIME REMAINING</span>
        <strong>09:42</strong>
      </div>
      <div className="booking-track">
        <span />
      </div>
      <div className="booking-meta">
        <span>Conflict check: passed</span>
        <span>Payment: pending</span>
      </div>
    </div>
  );
}

export default function Home() {
  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;

    const updatePointer = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        root.style.setProperty("--pointer-x", `${event.clientX}px`);
        root.style.setProperty("--pointer-y", `${event.clientY}px`);
      });
    };

    const updateScroll = () => {
      const available =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = available > 0 ? window.scrollY / available : 0;
      root.style.setProperty("--scroll-progress", `${progress}`);
    };

    updateScroll();
    window.addEventListener("pointermove", updatePointer, { passive: true });
    window.addEventListener("scroll", updateScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("scroll", updateScroll);
    };
  }, []);

  return (
    <main>
      <div className="scroll-progress" aria-hidden="true" />
      <div className="pointer-glow" aria-hidden="true" />

      <header className="site-header">
        <a className="logo" href="#top" aria-label="Ahmed AbdelAal, home">
          A<span>.</span>A
        </a>
        <nav aria-label="Main navigation">
          <a href="#about">About</a>
          <a href="#work">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="header-availability" href="mailto:ahmed.moh.abdelaal.dev@gmail.com">
          <span />
          Available for work
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-noise" aria-hidden="true" />
        <div className="orbit orbit-one" aria-hidden="true">
          <span />
        </div>
        <div className="orbit orbit-two" aria-hidden="true">
          <span />
        </div>

        <div className="hero-kicker">
          <span>Cairo, Egypt</span>
          <span className="kicker-line" />
          <span>Backend .NET Developer</span>
        </div>

        <div className="hero-copy">
          <p className="eyebrow">I design the logic behind reliable products.</p>
          <h1>
            AHMED
            <span>ABD ELAAL</span>
          </h1>
          <div className="hero-bottom">
            <p>
              Building secure, testable backend systems with C#, ASP.NET Core,
              EF Core, and SQL Server.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">
                Explore projects <span>↘</span>
              </a>
              <a
                className="button button-ghost"
                href="/Ahmed_Mohamed_AbdelAal_CV.pdf"
                download
              >
                Download CV
              </a>
            </div>
          </div>
        </div>

        <div className="hero-console" aria-hidden="true">
          <div className="console-bar">
            <span />
            <span />
            <span />
            <small>system.status</small>
          </div>
          <pre>
            <code>
              <span className="code-muted">{"// current focus"}</span>
              {"\n"}services.AddScoped&lt;
              <span className="code-accent">IReliableSystem</span>
              &gt;();{"\n\n"}
              <span className="code-muted">{"// result"}</span>
              {"\n"}
              <span className="code-success">✓</span> secure
              {"\n"}
              <span className="code-success">✓</span> testable
              {"\n"}
              <span className="code-success">✓</span> maintainable
            </code>
          </pre>
        </div>

        <a className="scroll-cue" href="#about">
          SCROLL TO DISCOVER <span>↓</span>
        </a>
      </section>

      <section className="manifesto" id="about">
        <div className="section-label reveal">
          <span>01</span>
          <span>About</span>
        </div>
        <div className="manifesto-copy reveal">
          <p className="manifesto-small">MORE THAN ENDPOINTS.</p>
          <h2>
            I turn business rules into{" "}
            <span className="text-outline">systems people can trust.</span>
          </h2>
          <div className="manifesto-detail">
            <p>
              Computer Science and Artificial Intelligence graduate focused on
              backend .NET development. I care about the parts users never see:
              data integrity, authorization, predictable workflows, and code
              the next developer can understand.
            </p>
            <div className="manifesto-facts">
              <span>
                <strong>2026</strong> B.Sc. Graduate
              </span>
              <span>
                <strong>3.16</strong> GPA
              </span>
              <span>
                <strong>Arabic</strong> Native · English Professional
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="capabilities">
        <div className="capability-grid">
          {capabilities.map((item) => (
            <article className="capability-card reveal" key={item.number}>
              <span className="capability-number">{item.number}</span>
              <div className="capability-icon" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="work" id="work">
        <div className="section-heading reveal">
          <div className="section-label">
            <span>02</span>
            <span>Selected projects</span>
          </div>
          <h2>
            SYSTEMS BUILT
            <span>TO HOLD UP.</span>
          </h2>
        </div>

        <div className="projects-list">
          {projects.map((project) => (
            <article className="project-card reveal" key={project.index}>
              <div className="project-copy">
                <div className="project-index">{project.index}</div>
                <p className="project-subtitle">{project.subtitle}</p>
                <h3>{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="tech-list">
                  {project.tech.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
                <a href={project.href} target="_blank" rel="noreferrer">
                  View repository <span>↗</span>
                </a>
              </div>
              <div className="project-showcase">
                <ProjectVisual type={project.visual} />
                <div className="project-stats">
                  {project.stats.map(([value, label]) => (
                    <div key={label}>
                      <strong>{value}</strong>
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="stack-section" aria-label="Technology stack">
        <div className="stack-marquee">
          {[...stack, ...stack].map((item, index) => (
            <span key={`${item}-${index}`}>
              {item} <i>✦</i>
            </span>
          ))}
        </div>
      </section>

      <section className="experience" id="experience">
        <div className="section-heading reveal">
          <div className="section-label">
            <span>03</span>
            <span>Experience</span>
          </div>
          <h2>
            CODE, CONTENT
            <span>& LEADERSHIP.</span>
          </h2>
        </div>

        <div className="experience-layout">
          <div className="timeline">
            {experience.map((item, index) => (
              <article className="timeline-item reveal" key={item.role}>
                <span className="timeline-dot">{String(index + 1).padStart(2, "0")}</span>
                <p className="timeline-date">{item.date}</p>
                <div>
                  <h3>{item.role}</h3>
                  <p className="timeline-company">{item.company}</p>
                  <p className="timeline-copy">{item.copy}</p>
                </div>
              </article>
            ))}
          </div>

          <aside className="education-card reveal">
            <span className="education-mark">B.Sc.</span>
            <p>Computer Science & Artificial Intelligence</p>
            <h3>Assiut National University</h3>
            <div>
              <span>Graduated 2026</span>
              <span>GPA 3.16</span>
            </div>
            <small>Back-End .NET — Eraa Soft · PHP & WordPress — ITI · Front-End — ITI</small>
          </aside>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="contact-orb" aria-hidden="true" />
        <div className="section-label reveal">
          <span>04</span>
          <span>Contact</span>
        </div>
        <div className="contact-copy reveal">
          <p>Have a backend problem worth solving?</p>
          <h2>
            LET&apos;S BUILD
            <span>SOMETHING SOLID.</span>
          </h2>
          <a
            className="contact-mail"
            href="mailto:ahmed.moh.abdelaal.dev@gmail.com"
          >
            ahmed.moh.abdelaal.dev@gmail.com <span>↗</span>
          </a>
        </div>
        <div className="contact-footer">
          <div className="social-links">
            <a href="https://github.com/3ab3al11" target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
            <a
              href="https://linkedin.com/in/ahmed-mohamed-web-dev"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn ↗
            </a>
            <a href="tel:+201021470391">+20 102 147 0391</a>
          </div>
          <p>© {new Date().getFullYear()} Ahmed Mohamed Abd Elaal</p>
          <a href="#top">Back to top ↑</a>
        </div>
      </section>
    </main>
  );
}
