"use client";

import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

type Lang = "en" | "ar";
type Localized = { en: string; ar: string };

const copy = {
  en: {
    about: "About",
    projects: "Projects",
    experience: "Experience",
    contact: "Contact",
    available: "Available for work",
    cairo: "Cairo, Egypt",
    role: "Backend .NET Developer",
    eyebrow: "I design the logic behind reliable products.",
    firstName: "AHMED",
    lastName: "ABD ELAAL",
    heroBody:
      "Building secure, testable backend systems with C#, ASP.NET Core, EF Core, and SQL Server.",
    explore: "Explore projects",
    download: "Download CV",
    scroll: "Scroll to discover",
    portraitAlt: "Ahmed Mohamed Abd ElAal",
    portraitNote: "Backend engineer · Cairo",
    homeLabel: "Ahmed Mohamed Abd ElAal, home",
    navigationLabel: "Main navigation",
    stackLabel: "Technology stack",
    starsLabel: "5 out of 5 stars",
    aboutLabel: "About",
    moreThan: "MORE THAN ENDPOINTS.",
    manifestoLead: "I turn business rules into",
    manifestoOutline: "systems people can trust.",
    bio: "I’m a Backend .NET Developer and Computer Science & Artificial Intelligence graduate focused on building secure, maintainable systems. My goal is to join a global technology company where I can contribute to real products, learn from high-performing teams, and grow into a world-class backend engineer.",
    graduate: "B.Sc. Graduate",
    gpa: "GPA",
    language: "Native · English working proficiency",
    selected: "Selected projects",
    systemsBuilt: "Systems built",
    toHoldUp: "to hold up.",
    myRole: "My role",
    viewRepo: "View repository",
    experienceLabel: "Experience",
    codeContent: "Code · Content",
    leadership: "& leadership.",
    testimonialLabel: "Verified client review",
    testimonialQuote:
      "Thank you, Engineer Ahmed. Excellent, fast, and outstanding work. I recommend working with him.",
    testimonialSource: "Verified 5-star review · Khamsat",
    viewReview: "View original review",
    education: "Computer Science & Artificial Intelligence",
    graduated: "Graduated 2026",
    training:
      "Training: Back-End .NET — Eraa Soft · PHP & WordPress — ITI · Front-End Development — ITI",
    contactLabel: "Contact",
    contactIntro: "Have a backend problem worth solving?",
    letsBuild: "Let’s build",
    somethingSolid: "something solid.",
    backToTop: "Back to top",
    switchLabel: "عرض الموقع بالعربية",
  },
  ar: {
    about: "نبذة عني",
    projects: "المشاريع",
    experience: "الخبرات",
    contact: "تواصل معي",
    available: "متاح لفرص العمل",
    cairo: "القاهرة، مصر",
    role: "مطور Backend .NET",
    eyebrow: "أحوّل منطق الأعمال إلى أنظمة موثوقة.",
    firstName: "أحمد",
    lastName: "عبدالعال",
    heroBody:
      "أبني أنظمة خلفية آمنة وقابلة للاختبار باستخدام C# وASP.NET Core وEF Core وSQL Server.",
    explore: "استعرض المشاريع",
    download: "تحميل السيرة الذاتية",
    scroll: "اكتشف المزيد",
    portraitAlt: "أحمد محمد عبدالعال",
    portraitNote: "مهندس Backend · القاهرة",
    homeLabel: "أحمد محمد عبدالعال، الصفحة الرئيسية",
    navigationLabel: "التنقل الرئيسي",
    stackLabel: "التقنيات المستخدمة",
    starsLabel: "خمس نجوم من خمس",
    aboutLabel: "نبذة عني",
    moreThan: "أكثر من مجرد API.",
    manifestoLead: "أحوّل قواعد العمل إلى",
    manifestoOutline: "أنظمة يمكن الوثوق بها.",
    bio: "أنا مطور Backend .NET وخريج علوم الحاسب والذكاء الاصطناعي، أركز على بناء أنظمة آمنة وقابلة للتطوير والصيانة. هدفي الانضمام إلى شركة تقنية عالمية أساهم فيها في تطوير منتجات حقيقية، وأتعلم من فرق قوية، وأتطور إلى مهندس Backend على مستوى عالمي.",
    graduate: "بكالوريوس 2026",
    gpa: "التقدير التراكمي",
    language: "لغة أم · الإنجليزية جيدة",
    selected: "أبرز المشاريع",
    systemsBuilt: "أنظمة صُممت",
    toHoldUp: "لتعمل بثبات.",
    myRole: "دوري في المشروع",
    viewRepo: "عرض المشروع على GitHub",
    experienceLabel: "الخبرات",
    codeContent: "برمجة · محتوى",
    leadership: "وقيادة.",
    testimonialLabel: "تقييم عميل موثّق",
    testimonialQuote:
      "شكرًا يا بشمهندس أحمد، عمل رائع وسريع ومتميز. أنصح بالتعامل معه.",
    testimonialSource: "تقييم موثّق بخمس نجوم · خمسات",
    viewReview: "عرض التقييم الأصلي",
    education: "علوم الحاسب والذكاء الاصطناعي",
    graduated: "تخرجت عام 2026",
    training:
      "التدريب: Back-End .NET — Eraa Soft · PHP وWordPress — ITI · Front-End Development — ITI",
    contactLabel: "تواصل معي",
    contactIntro: "هل لديك تحدٍ تقني يستحق الحل؟",
    letsBuild: "لنبنِ",
    somethingSolid: "شيئًا قويًا.",
    backToTop: "العودة للأعلى",
    switchLabel: "View site in English",
  },
} as const;

const projects: Array<{
  index: string;
  title: Localized;
  subtitle: Localized;
  description: Localized;
  role: Localized;
  href: string;
  image: string;
  imageAlt: Localized;
  tech: string[];
  stats: Array<[string, Localized]>;
}> = [
  {
    index: "01",
    title: {
      en: "University Admission System",
      ar: "نظام القبول الجامعي",
    },
    subtitle: {
      en: "Bilingual admissions, built for deterministic decisions.",
      ar: "منصة قبول ثنائية اللغة مبنية لقرارات توزيع دقيقة.",
    },
    description: {
      en: "A rule-driven ASP.NET Core MVC platform that handles applications, document safety, allocation, and high-volume Excel imports without sacrificing traceability.",
      ar: "منصة مبنية بـASP.NET Core MVC لإدارة طلبات التقديم، والتحقق الآمن من الملفات، والتوزيع القائم على قواعد ثابتة، واستيراد بيانات Excel بأحجام كبيرة.",
    },
    role: {
      en: "Co-engineered the system in a two-developer team. I contributed to the deterministic allocation workflow, file-safety validation, transactional Excel bulk importer, and the automated xUnit test suite.",
      ar: "شاركت في تطوير النظام ضمن فريق من مطورين، وساهمت في منطق التوزيع القائم على قواعد ثابتة، والتحقق الآمن من الملفات، واستيراد Excel بشكل Transactional، واختبارات xUnit الآلية.",
    },
    href: "https://github.com/3ab3al11/University-Admission-System",
    image: "/project-admission.webp",
    imageAlt: {
      en: "University Admission System dashboard presentation",
      ar: "واجهة نظام القبول الجامعي",
    },
    tech: ["ASP.NET Core MVC", "EF Core", "SQL Server", "xUnit"],
    stats: [
      ["15", { en: "SQL tables", ar: "جدول SQL" }],
      ["56", { en: "controller actions", ar: "إجراء Controller" }],
      ["129", { en: "automated tests", ar: "اختبار آلي" }],
    ],
  },
  {
    index: "02",
    title: { en: "Clinic Flow", ar: "نظام Clinic Flow" },
    subtitle: {
      en: "A secure workflow for patients, doctors, and admins.",
      ar: "تجربة آمنة ومتكاملة للمرضى والأطباء والإدارة.",
    },
    description: {
      en: "A role-aware clinic platform with six appointment states, protected patient data, server-side validation, and conflict prevention at the heart of the booking flow.",
      ar: "منصة لإدارة العيادات تدعم ثلاثة أدوار وست حالات للمواعيد، مع حماية بيانات المرضى، والتحقق على الخادم، ومنع تعارض الحجوزات.",
    },
    role: {
      en: "Co-developed the platform in a two-developer team. I worked on role-based workflows, appointment-state handling, double-booking prevention, patient-data authorization, and server-side validation.",
      ar: "شاركت في تطوير المنصة ضمن فريق من مطورين، وعملت على تدفقات الصلاحيات، وحالات المواعيد، ومنع الحجز المزدوج، وحماية بيانات المرضى، والتحقق على الخادم.",
    },
    href: "https://github.com/3ab3al11/Clinic_Flow",
    image: "/project-clinic.webp",
    imageAlt: {
      en: "Clinic Flow administration dashboard",
      ar: "لوحة تحكم نظام Clinic Flow",
    },
    tech: ["ASP.NET Core MVC", "C#", "EF Core", "SQLite"],
    stats: [
      ["3", { en: "user roles", ar: "أدوار مستخدمين" }],
      ["10", { en: "domain entities", ar: "كيانات للنظام" }],
      ["67", { en: "controller actions", ar: "إجراء Controller" }],
    ],
  },
  {
    index: "03",
    title: {
      en: "Football Field Booking",
      ar: "نظام حجز ملاعب كرة القدم",
    },
    subtitle: {
      en: "Concurrency-aware reservations that stay consistent.",
      ar: "حجوزات تمنع التعارض وتحافظ على اتساق البيانات.",
    },
    description: {
      en: "A two-role booking system with timed reservation holds, conflict detection, simulated payments, refunds, reminders, and security across every write action.",
      ar: "نظام حجز بدورين يتضمن حجزًا مؤقتًا، واكتشاف التعارضات، وطرق دفع تجريبية، واسترداد الأموال، والتذكيرات، وحماية عمليات الكتابة.",
    },
    role: {
      en: "Co-developed the system in a two-developer team. I implemented booking conflict controls, 10-minute reservation holds, payment and refund workflows, reminders, CSRF protection, and defined test cases.",
      ar: "شاركت في تطوير النظام ضمن فريق من مطورين، ونفذت منع تعارض الحجوزات، والحجز المؤقت لمدة 10 دقائق، وتدفقات الدفع والاسترداد، والتذكيرات، وحماية CSRF، وحالات الاختبار.",
    },
    href: "https://github.com/3ab3al11/Football-Field-Booking-System",
    image: "/project-football.webp",
    imageAlt: {
      en: "Football Field Booking dashboard presentation",
      ar: "واجهة نظام حجز ملاعب كرة القدم",
    },
    tech: ["ASP.NET Core MVC", "C#", "EF Core", "SQLite"],
    stats: [
      ["10m", { en: "reservation hold", ar: "حجز مؤقت" }],
      ["53", { en: "controller actions", ar: "إجراء Controller" }],
      ["24", { en: "CSRF-safe posts", ar: "عملية POST محمية" }],
    ],
  },
];

const capabilities: Array<{
  number: string;
  title: Localized;
  text: Localized;
}> = [
  {
    number: "01",
    title: { en: "Backend systems", ar: "أنظمة Backend" },
    text: {
      en: "Structured APIs and MVC applications built with clear boundaries, dependency injection, and maintainable business logic.",
      ar: "تطبيقات API وMVC منظمة بحدود واضحة وDependency Injection ومنطق أعمال سهل الصيانة.",
    },
  },
  {
    number: "02",
    title: { en: "Data & workflows", ar: "البيانات وتدفقات العمل" },
    text: {
      en: "Reliable relational models, EF Core migrations, bulk imports, state machines, and transactional operations.",
      ar: "نماذج بيانات موثوقة، وEF Core Migrations، واستيراد جماعي، وحالات عمل، وعمليات Transactional.",
    },
  },
  {
    number: "03",
    title: { en: "Security by design", ar: "الأمان من البداية" },
    text: {
      en: "Identity, RBAC, JWT, validation, CORS, file-safety checks, and authorization applied where the data lives.",
      ar: "تطبيق Identity وRBAC وJWT والتحقق وCORS وأمان الملفات والصلاحيات في طبقات النظام الصحيحة.",
    },
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

const experience: Array<{
  date: Localized;
  role: Localized;
  company: Localized;
  copy: Localized;
}> = [
  {
    date: { en: "JUL 2026 — NOW", ar: "يوليو 2026 — الآن" },
    role: {
      en: "Freelance ASP.NET Core Developer",
      ar: "مطور ASP.NET Core مستقل",
    },
    company: { en: "Khamsat", ar: "خمسات" },
    copy: {
      en: "Diagnosed and resolved a production application issue for a paid client, earning a 5-star rating.",
      ar: "شخّصت وحللت مشكلة في تطبيق لعميل مدفوع، وحصلت على تقييم خمس نجوم.",
    },
  },
  {
    date: { en: "2025 — NOW", ar: "2025 — الآن" },
    role: {
      en: "Social Media & Content Specialist",
      ar: "أخصائي محتوى وتواصل اجتماعي",
    },
    company: { en: "Sahab Real Estate", ar: "سحاب للتطوير العقاري" },
    copy: {
      en: "Develop campaign content, promotional assets, and coordinated publishing plans in collaboration with the wider team.",
      ar: "أصمم محتوى الحملات والمواد الدعائية وخطط النشر بالتنسيق مع فريق العمل.",
    },
  },
  {
    date: { en: "2022 — 2026", ar: "2022 — 2026" },
    role: {
      en: "Student Union President",
      ar: "رئيس اتحاد طلاب الجامعة",
    },
    company: {
      en: "Assiut National University",
      ar: "جامعة أسيوط الأهلية",
    },
    copy: {
      en: "Led university-wide student teams after serving as Faculty Student Union President and earning institutional recognition.",
      ar: "قدت فرقًا طلابية على مستوى الجامعة بعد رئاسة اتحاد الكلية وتحقيق تقدير مؤسسي للأنشطة القيادية.",
    },
  },
];

function AnimatedStat({ value }: { value: string }) {
  const initialValue = value.match(/^(\d+)(.*)$/);
  const [displayValue, setDisplayValue] = useState(
    initialValue ? `0${initialValue[2]}` : value,
  );
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const match = value.match(/^(\d+)(.*)$/);
    if (!match) return;

    const target = Number(match[1]);
    const suffix = match[2];
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let animationFrame = 0;

    if (prefersReducedMotion) {
      animationFrame = requestAnimationFrame(() => setDisplayValue(value));
      return () => cancelAnimationFrame(animationFrame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        const startedAt = performance.now();
        const duration = 900;

        const update = (now: number) => {
          const progress = Math.min((now - startedAt) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplayValue(`${Math.round(target * eased)}${suffix}`);

          if (progress < 1) {
            animationFrame = requestAnimationFrame(update);
          }
        };

        animationFrame = requestAnimationFrame(update);
        observer.disconnect();
      },
      { threshold: 0.65 },
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrame);
    };
  }, [value]);

  return (
    <strong ref={elementRef} aria-label={value}>
      {displayValue}
    </strong>
  );
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [introVisible, setIntroVisible] = useState(true);
  const [languageTransitioning, setLanguageTransitioning] = useState(false);
  const languageTimer = useRef<number | null>(null);
  const t = copy[lang];
  const localize = (value: Localized) => value[lang];

  useEffect(() => {
    const timer = window.setTimeout(() => setIntroVisible(false), 3400);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const saved = window.localStorage.getItem("portfolio-language");
    let frame = 0;

    if (saved === "ar" || saved === "en") {
      frame = window.requestAnimationFrame(() => setLang(saved));
    }

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    window.localStorage.setItem("portfolio-language", lang);
  }, [lang]);

  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;

    const updatePointer = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        root.style.setProperty("--pointer-x", `${event.clientX}px`);
        root.style.setProperty("--pointer-y", `${event.clientY}px`);

        if (
          window.matchMedia("(pointer: fine)").matches &&
          !window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
          const x = event.clientX / window.innerWidth - 0.5;
          const y = event.clientY / window.innerHeight - 0.5;
          root.style.setProperty("--parallax-x", `${x * 14}px`);
          root.style.setProperty("--parallax-y", `${y * 10}px`);
          root.style.setProperty("--parallax-soft-x", `${x * -8}px`);
          root.style.setProperty("--parallax-soft-y", `${y * -6}px`);
        }
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

  useEffect(
    () => () => {
      if (languageTimer.current !== null) {
        window.clearTimeout(languageTimer.current);
      }
    },
    [],
  );

  const switchLanguage = () => {
    if (languageTransitioning) return;

    const nextLanguage: Lang = lang === "en" ? "ar" : "en";
    setLanguageTransitioning(true);
    languageTimer.current = window.setTimeout(() => {
      setLang(nextLanguage);
      requestAnimationFrame(() => setLanguageTransitioning(false));
    }, 170);
  };

  const moveMagnet = (event: ReactPointerEvent<HTMLAnchorElement>) => {
    if (
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * 0.14;
    const y = (event.clientY - rect.top - rect.height / 2) * 0.2;
    event.currentTarget.style.setProperty("--magnet-x", `${x}px`);
    event.currentTarget.style.setProperty("--magnet-y", `${y}px`);
  };

  const resetMagnet = (event: ReactPointerEvent<HTMLAnchorElement>) => {
    event.currentTarget.style.setProperty("--magnet-x", "0px");
    event.currentTarget.style.setProperty("--magnet-y", "0px");
  };

  return (
    <>
      {introVisible && (
        <div className="site-intro" aria-hidden="true">
          <span>PORTFOLIO · 2026</span>
          <strong>
            Ahmed Mohamed <i>Abd ElAal</i>
          </strong>
          <div>
            <span />
          </div>
        </div>
      )}

      <div className="scroll-progress" aria-hidden="true" />
      <div className="pointer-glow" aria-hidden="true" />

      <header className="site-header">
        <a className="logo" href="#top" aria-label={t.homeLabel}>
          A<span>.</span>A
        </a>
        <nav aria-label={t.navigationLabel}>
          <a href="#about">{t.about}</a>
          <a href="#work">{t.projects}</a>
          <a href="#experience">{t.experience}</a>
          <a href="#contact">{t.contact}</a>
        </nav>
        <div className="header-actions">
          <button
            className="language-toggle"
            type="button"
            onClick={switchLanguage}
            aria-label={t.switchLabel}
          >
            <span>{lang === "en" ? "AR" : "EN"}</span>
            <i aria-hidden="true">↔</i>
          </button>
          <a
            className="header-availability"
            href="mailto:ahmed.moh.abdelaal.dev@gmail.com"
          >
            <span />
            {t.available}
          </a>
        </div>
      </header>

      <main
        className={`${lang === "ar" ? "arabic-site" : "english-site"}${
          languageTransitioning ? " language-transitioning" : ""
        }`}
        lang={lang}
        dir={lang === "ar" ? "rtl" : "ltr"}
      >
      <section className="hero" id="top">
        <div className="hero-noise" aria-hidden="true" />
        <div className="orbit orbit-one" aria-hidden="true">
          <span />
        </div>
        <div className="orbit orbit-two" aria-hidden="true">
          <span />
        </div>

        <div className="hero-kicker">
          <span>{t.cairo}</span>
          <span className="kicker-line" />
          <span>{t.role}</span>
        </div>

        <div className="hero-copy">
          <p className="eyebrow">{t.eyebrow}</p>
          <h1 className={lang === "ar" ? "arabic-name" : ""}>
            <span className="hero-name-solid">{t.firstName}</span>
            <span className="hero-name-outline">{t.lastName}</span>
          </h1>
          <div className="hero-bottom">
            <p>{t.heroBody}</p>
            <div className="hero-actions">
              <a
                className="button button-primary magnetic"
                href="#work"
                onPointerMove={moveMagnet}
                onPointerLeave={resetMagnet}
              >
                {t.explore} <span>↘</span>
              </a>
              <a
                className="button button-ghost magnetic"
                href="/Ahmed_Mohamed_AbdelAal_CV.pdf"
                download
                onPointerMove={moveMagnet}
                onPointerLeave={resetMagnet}
              >
                {t.download}
              </a>
            </div>
          </div>
        </div>

        <figure className="hero-portrait">
          {/* The source is already resized and compressed for this exact layout. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/ahmed-portrait.webp"
            alt={t.portraitAlt}
            width="900"
            height="1255"
            fetchPriority="high"
            decoding="async"
          />
          <figcaption>
            <span>{t.portraitNote}</span>
            <strong>Ahmed Mohamed Abd ElAal</strong>
          </figcaption>
        </figure>

        <a className="scroll-cue" href="#about">
          {t.scroll} <span>↓</span>
        </a>
      </section>

      <section className="manifesto" id="about">
        <div className="section-label reveal">
          <span>01</span>
          <span>{t.aboutLabel}</span>
        </div>
        <div className="manifesto-copy reveal">
          <p className="manifesto-small">{t.moreThan}</p>
          <h2>
            {t.manifestoLead}{" "}
            <span className="text-outline">{t.manifestoOutline}</span>
          </h2>
          <div className="manifesto-detail">
            <p>{t.bio}</p>
            <div className="manifesto-facts">
              <span>
                <strong>2026</strong> {t.graduate}
              </span>
              <span>
                <strong>3.16</strong> {t.gpa}
              </span>
              <span>
                <strong>{lang === "ar" ? "العربية" : "Arabic"}</strong>{" "}
                {t.language}
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
              <h3>{localize(item.title)}</h3>
              <p>{localize(item.text)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="work" id="work">
        <div className="section-heading reveal">
          <div className="section-label">
            <span>02</span>
            <span>{t.selected}</span>
          </div>
          <h2>
            {t.systemsBuilt}
            <span>{t.toHoldUp}</span>
          </h2>
        </div>

        <div className="projects-list">
          {projects.map((project, index) => (
            <article
              className="project-card reveal"
              key={project.index}
              style={{ zIndex: index + 1 }}
            >
              <div className="project-copy">
                <div className="project-index">{project.index}</div>
                <p className="project-subtitle">
                  {localize(project.subtitle)}
                </p>
                <h3>{localize(project.title)}</h3>
                <p className="project-description">
                  {localize(project.description)}
                </p>
                <div className="project-role">
                  <span>{t.myRole}</span>
                  <p>{localize(project.role)}</p>
                </div>
                <div className="tech-list">
                  {project.tech.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
                <a href={project.href} target="_blank" rel="noreferrer">
                  {t.viewRepo} <span>↗</span>
                </a>
              </div>
              <div className="project-showcase">
                <figure className="project-image-wrap">
                  {/* Project artwork is pre-compressed and served at its native ratio. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image}
                    alt={localize(project.imageAlt)}
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption>
                    <span>{localize(project.title)}</span>
                    <span>ASP.NET CORE</span>
                  </figcaption>
                </figure>
                <div className="project-stats">
                  {project.stats.map(([value, label]) => (
                    <div key={label.en}>
                      <AnimatedStat value={value} />
                      <span>{localize(label)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="stack-section" aria-label={t.stackLabel}>
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
            <span>{t.experienceLabel}</span>
          </div>
          <h2>
            {t.codeContent}
            {" "}
            <span>{t.leadership}</span>
          </h2>
        </div>

        <div className="experience-layout">
          <div className="timeline">
            {experience.map((item, index) => (
              <article className="timeline-item reveal" key={item.role.en}>
                <span className="timeline-dot">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="timeline-date">{localize(item.date)}</p>
                <div>
                  <h3>{localize(item.role)}</h3>
                  <p className="timeline-company">
                    {localize(item.company)}
                  </p>
                  <p className="timeline-copy">{localize(item.copy)}</p>
                  {index === 0 && (
                    <a
                      className="testimonial-card"
                      href="https://khamsat.com/user/a7med3ab3al/reviews/1142928"
                      target="_blank"
                      rel="noreferrer"
                      aria-label={t.viewReview}
                    >
                      <div className="testimonial-head">
                        <span
                          className="testimonial-stars"
                          role="img"
                          aria-label={t.starsLabel}
                        >
                          ★★★★★
                        </span>
                        <span>{t.testimonialLabel}</span>
                      </div>
                      <blockquote>“{t.testimonialQuote}”</blockquote>
                      <div className="testimonial-source">
                        <span>{t.testimonialSource}</span>
                        <span>{t.viewReview} ↗</span>
                      </div>
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>

          <aside className="education-card reveal">
            <span className="education-mark">B.Sc.</span>
            <p>{t.education}</p>
            <h3>
              {lang === "ar"
                ? "جامعة أسيوط الأهلية"
                : "Assiut National University"}
            </h3>
            <div>
              <span>{t.graduated}</span>
              <span>{t.gpa} 3.16</span>
            </div>
            <small>{t.training}</small>
          </aside>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="contact-orb" aria-hidden="true" />
        <div className="section-label reveal">
          <span>04</span>
          <span>{t.contactLabel}</span>
        </div>
        <div className="contact-copy reveal">
          <p>{t.contactIntro}</p>
          <h2>
            {t.letsBuild}
            <span>{t.somethingSolid}</span>
          </h2>
          <a
            className="contact-mail ltr"
            href="mailto:ahmed.moh.abdelaal.dev@gmail.com"
          >
            ahmed.moh.abdelaal.dev@gmail.com <span>↗</span>
          </a>
          <a className="contact-phone ltr" href="tel:+201021470391">
            +201021470391 <span>↗</span>
          </a>
        </div>
        <div className="contact-footer">
          <div className="social-links ltr">
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
            <a href="tel:+201021470391">+201021470391</a>
          </div>
          <p>© {new Date().getFullYear()} Ahmed Mohamed Abd ElAal</p>
          <a href="#top">{t.backToTop} ↑</a>
        </div>
      </section>
      </main>
    </>
  );
}
