// pages/index.tsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import Head from "next/head";

// ─── Intersection Observer Hook ───
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── Countdown Ring ───
function CountdownRing({
  value,
  max,
  label,
}: {
  value: number;
  max: number;
  label: string;
}) {
  const radius = 40;
  const stroke = 2; // thinner for premium feel
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (value / max) * circumference;

  return (
    <div className="flex flex-col items-center">
      {/* Desktop size */}
      <div className="relative hidden sm:block" style={{ width: 80, height: 80 }}>
        <svg
          width="80"
          height="80"
          viewBox="0 0 96 96"
          className="transform -rotate-90"
        >
          <circle cx="48" cy="48" r={radius} fill="none" stroke="rgba(44,44,29,0.06)" strokeWidth={stroke} />
          <circle cx="48" cy="48" r={radius} fill="none" stroke="#2c2c1d" strokeWidth={stroke} strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={progress} style={{ transition: "stroke-dashoffset 0.6s ease" }} />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold tracking-tight text-primary font-heading">
            {String(value).padStart(2, "0")}
          </span>
        </div>
      </div>
      {/* Mobile size */}
      <div className="relative sm:hidden" style={{ width: 64, height: 64 }}>
        <svg
          width="64"
          height="64"
          viewBox="0 0 64 64"
          className="transform -rotate-90"
        >
          <circle cx="32" cy="32" r={26} fill="none" stroke="rgba(44,44,29,0.06)" strokeWidth={1.5} />
          <circle cx="32" cy="32" r={26} fill="none" stroke="#2c2c1d" strokeWidth={1.5} strokeLinecap="round" strokeDasharray={2 * Math.PI * 26} strokeDashoffset={2 * Math.PI * 26 - (value / max) * 2 * Math.PI * 26} style={{ transition: "stroke-dashoffset 0.6s ease" }} />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold tracking-tight text-primary font-heading">
            {String(value).padStart(2, "0")}
          </span>
        </div>
      </div>
      <span className="mt-1.5 sm:mt-2 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-neutral-grey font-sans">
        {label}
      </span>
    </div>
  );
}

// ─── Feature Card ───
function FeatureCard({
  category,
  title,
  description,
  badge,
  delay,
  icon,
}: {
  category: string;
  title: string;
  description: string;
  badge: string;
  delay: number;
  icon: React.ReactNode;
}) {
  const { ref, inView } = useInView(0.2);
  return (
    <div
      ref={ref}
      className="group rounded-3xl bg-white border border-primary/5 p-8 flex flex-col justify-between h-full hover:border-primary/15 hover:shadow-md transition-all duration-500"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(30px)",
        transitionDelay: `${delay}ms`,
        transitionDuration: "700ms",
      }}
    >
      <div>
        <div className="flex justify-between items-start mb-6">
          <span className="text-[10px] tracking-[0.2em] font-sans font-bold uppercase text-accent-green">
            {category}
          </span>
          <div className="text-primary/70 group-hover:text-primary transition-colors duration-300">
            {icon}
          </div>
        </div>
        <h3 className="text-2xl font-bold tracking-tight mb-3 font-heading text-primary">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-neutral-grey font-sans font-normal mb-8">
          {description}
        </p>
      </div>
      <div className="flex">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-sans font-semibold uppercase tracking-wider bg-primary/5 text-primary border border-primary/5">
          {badge}
        </span>
      </div>
    </div>
  );
}

// ─── Section Reveal Wrapper ───
function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const { ref, inView } = useInView(0.15);
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// ─── Main Page ───
// ═══════════════════════════════════════════════════════════
export default function Home() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    setMounted(true);

    const targetDate = new Date("2027-07-01T00:00:00");
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      if (difference > 0) {
        setDays(Math.floor(difference / (1000 * 60 * 60 * 24)));
        setHours(
          Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        );
        setMinutes(Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)));
        setSeconds(Math.floor((difference % (1000 * 60)) / 1000));
      }
    }, 1000);

    const handleScroll = () => {
      const sections = ["home", "about", "features", "creators", "testimonials", "contact"];
      const scrollPosition = window.scrollY + 150;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000);
  };

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setIsMenuOpen(false);
  }, []);

  return (
    <div className="overflow-x-hidden bg-cream text-primary font-sans antialiased">
      <Head>
        <title>Ananka — Plan Your Better Wedding</title>
        <meta
          name="description"
          content="Ananka is coming soon! The ultimate platform for hiring wedding vendors. Launching in 2027."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* ─── Navigation ─── */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl transition-all duration-500">
        <div className="bg-white/70 backdrop-blur-xl border border-primary/10 px-6 py-3.5 rounded-full shadow-lg flex justify-between items-center">
          <div
            className="cursor-pointer flex items-center gap-0"
            onClick={() => scrollToSection("home")}
          >
            <img
              src="/images/logo_ananka.png"
              alt="Ananka Logo"
              className="h-6 w-auto brightness-0"
            />
            <span className="text-xl font-bold tracking-tight text-primary font-heading leading-none ml-[-2px]">
              nanka
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {["home", "about", "features", "creators", "testimonials", "contact"].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`relative capitalize text-xs tracking-wider font-semibold font-sans transition-all duration-300 ${
                  activeSection === section ? "text-primary" : "text-neutral-grey hover:text-primary"
                }`}
              >
                {section}
                {activeSection === section && (
                  <span className="absolute -bottom-1 left-0 w-full h-[1.5px] bg-primary rounded-full" />
                )}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center">
            <button
              onClick={() => scrollToSection("contact")}
              className="bg-primary text-cream px-5 py-2 rounded-full text-xs font-semibold hover:bg-primary/90 transition-all duration-300 shadow-sm"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-6 h-6 gap-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span
              className={`block w-5 h-[1.5px] bg-primary transition-all duration-300 ${
                isMenuOpen ? "rotate-45 translate-y-[5px]" : ""
              }`}
            />
            <span
              className={`block w-5 h-[1.5px] bg-primary transition-all duration-300 ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block w-5 h-[1.5px] bg-primary transition-all duration-300 ${
                isMenuOpen ? "-rotate-45 -translate-y-[5px]" : ""
              }`}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mt-2 mx-4 bg-white/95 backdrop-blur-xl border border-primary/10 rounded-2xl p-4 shadow-xl flex flex-col gap-3 md:hidden">
            {["home", "about", "features", "creators", "testimonials", "contact"].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`text-left capitalize text-sm tracking-wide font-sans py-1.5 px-3 rounded-lg transition-all duration-300 ${
                  activeSection === section ? "bg-primary/5 text-primary font-semibold" : "text-neutral-grey hover:bg-primary/5"
                }`}
              >
                {section}
              </button>
            ))}
            <button
              onClick={() => scrollToSection("contact")}
              className="bg-primary text-cream py-2.5 rounded-xl text-center text-sm font-semibold hover:bg-primary/90 transition-all duration-300 mt-2"
            >
              Get Started
            </button>
          </div>
        )}
      </nav>

      {/* ─── Hero Section ─── */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-6 md:px-12 grid-bg overflow-hidden"
      >
        {/* Subtle radial overlay for grid fading at edges */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, transparent 20%, #fafaf7 90%)",
          }}
        />

        {/* Floating 3D graphics */}
        <div className="absolute left-[5%] top-[25%] w-28 sm:w-36 md:w-56 pointer-events-none animate-float-slow hidden lg:block z-0">
          <img
            src="/images/ananka_3d_clay_pink.png"
            alt="Pink clay shape"
            className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(233,177,189,0.25)]"
          />
        </div>
        <div className="absolute right-[5%] bottom-[20%] w-28 sm:w-36 md:w-56 pointer-events-none animate-float-delayed hidden lg:block z-0">
          <img
            src="/images/ananka_3d_clay_purple.png"
            alt="Purple clay shape"
            className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(205,189,220,0.25)]"
          />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center">
          {/* Tagline */}
          <div
            className="mb-8"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s ease 0.2s",
            }}
          >
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs uppercase tracking-[0.2em] font-sans font-bold"
              style={{
                color: "#4f7257",
                border: `1px solid rgba(79,114,87,0.2)`,
                background: "rgba(79,114,87,0.06)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
              Coming 2027
            </span>
          </div>

          {/* Heading */}
          <h1
            className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold mb-6 tracking-tight leading-[0.95] font-heading text-primary"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s ease 0.4s",
            }}
          >
            Plan Your <br />
            <span className="text-accent-yellow italic font-normal">Better</span> Wedding
          </h1>

          {/* Subheading */}
          <p
            className="text-base sm:text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed text-neutral-grey font-sans font-normal"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s ease 0.6s",
            }}
          >
            The ultimate platform for discovering, vetting, and booking the perfect
            wedding vendors — beautifully simple.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-16 px-4 sm:px-0"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s ease 0.8s",
            }}
          >
            <button
              onClick={() => scrollToSection("contact")}
              className="group px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide flex items-center justify-center gap-2 bg-primary text-cream hover:bg-primary/95 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Get Notified
              <span className="text-xs transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 border border-primary/20 text-primary hover:bg-primary/5"
            >
              Learn More
            </button>
          </div>

          {/* Countdown Timer */}
          <div
            className="w-full max-w-md bg-white/40 backdrop-blur-md border border-primary/5 rounded-3xl p-6 sm:p-8 shadow-sm"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s ease 1s",
            }}
          >
            <p className="text-xs uppercase tracking-[0.25em] mb-6 font-bold text-neutral-grey font-sans">
              Launching in
            </p>
            <div className="flex justify-center gap-6 sm:gap-8">
              <CountdownRing value={days} max={365} label="Days" />
              <CountdownRing value={hours} max={24} label="Hours" />
              <CountdownRing value={minutes} max={60} label="Min" />
              <CountdownRing value={seconds} max={60} label="Sec" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── About Section ─── */}
      <section
        id="about"
        className="relative py-24 sm:py-32 px-6 md:px-12 bg-white/30"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <Reveal>
                <span className="text-xs uppercase tracking-[0.25em] text-accent-green font-sans font-bold mb-4 block">
                  Our Purpose
                </span>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight font-heading leading-tight text-primary">
                  We match you with the <span className="text-accent-green italic font-normal">perfect</span> wedding creators.
                </h2>
              </Reveal>
            </div>

            <div className="lg:col-span-7 space-y-6 md:space-y-8">
              <Reveal delay={150}>
                <h3 className="text-xl md:text-2xl font-bold font-heading text-primary">
                  Simplifying Wedding Planning, Seamlessly
                </h3>
              </Reveal>
              <Reveal delay={250}>
                <p className="text-sm sm:text-base leading-relaxed text-neutral-grey font-sans font-normal">
                  Ananka is designed to be your all-in-one partner for discovering, vetting, and booking premium wedding vendors. We eliminate the friction of finding the right photographer, florists, caterers, or venues, connecting you directly with verified professionals who bring your vision to life.
                </p>
              </Reveal>
              <Reveal delay={350}>
                <p className="text-sm sm:text-base leading-relaxed text-neutral-grey font-sans font-normal">
                  Our platform serves both couples and creative small businesses, building a seamless interface that reduces planning stress, automates contracting, and secures transactions. We believe organizing your special day should be just as joyful as the day itself.
                </p>
              </Reveal>
              
              <Reveal delay={450}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-6 border-t border-primary/10">
                  <button
                    onClick={() => scrollToSection("features")}
                    className="group inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent-green transition-all duration-300"
                  >
                    Explore Our Features
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </button>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-neutral-grey font-sans font-semibold">
                      Crafted by <span className="text-primary font-bold">I Putu Andika Putra</span>
                    </span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Features Section ─── */}
      <section
        id="features"
        className="relative py-24 sm:py-32 px-6 md:px-12 grid-bg"
      >
        <div className="max-w-6xl mx-auto relative z-10">
          <Reveal>
            <div className="mb-16">
              <span className="text-xs uppercase tracking-[0.25em] text-accent-green font-sans font-bold mb-4 block">
                Features
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 font-heading text-primary">
                What to <span className="text-accent-green italic font-normal">Expect</span>
              </h2>
              <p className="text-sm sm:text-base max-w-lg text-neutral-grey font-sans font-normal">
                Ananka will revolutionize the wedding planning experience with these innovative features built for modern couples.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              delay={0}
              category="Discovery"
              icon={
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              }
              title="Vendor Match"
              description="Browse through a curated, vetted selection of top-rated wedding vendors in your area, with detailed visual portfolios and authentic reviews."
              badge="Instant Match"
            />
            <FeatureCard
              delay={150}
              category="Planning"
              icon={
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              }
              title="Intelligent Tools"
              description="Stay completely organized with smart collaborative tools, including direct client-vendor chat, timeline builds, and visual moodboards."
              badge="Real-time Sync"
            />
            <FeatureCard
              delay={300}
              category="Payments"
              icon={
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              }
              title="Secure Contracts"
              description="Book vendor packages with absolute confidence using escrowed payment systems, split payments, and digital contract signatures."
              badge="Escrow Protected"
            />
          </div>
        </div>
      </section>

      {/* ─── Creators Section ─── */}
      <section id="creators" className="relative py-24 sm:py-32 px-6 md:px-12 bg-white/30">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="mb-16">
              <span className="text-xs uppercase tracking-[0.25em] text-accent-green font-sans font-bold mb-4 block">
                The Team
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 font-heading text-primary">
                The Creators Behind <span className="text-accent-pink italic font-normal">Ananka</span>
              </h2>
              <p className="text-sm sm:text-base max-w-lg text-neutral-grey font-sans font-normal">
                A dedicated group of designers, technologists, and industry experts building the future of wedding planning.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Putu Andika */}
            <Reveal delay={0}>
              <div className="group rounded-3xl bg-accent-purple/5 border border-accent-purple/20 p-8 h-full flex flex-col justify-between transition-all duration-500 hover:-translate-y-1 hover:shadow-md">
                <div>
                  <div className="w-24 h-24 rounded-2xl overflow-hidden mb-6 border-2 border-accent-purple/30 bg-accent-purple/10">
                    <img
                      src="/images/ceo_ananka.jpg"
                      alt="I Putu Andika Putra"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-2xl font-bold font-heading text-primary tracking-tight mb-1">
                    I Putu Andika Putra
                  </h3>
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent-purple block mb-4">
                    Founder & Lead Architect
                  </span>
                  <p className="text-sm text-neutral-grey leading-relaxed font-sans font-normal">
                    Software engineer and creative developer building high-quality, elegant marketplace solutions to streamline wedding organization.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-accent-purple/10 flex justify-between items-center text-xs text-neutral-grey font-sans font-medium">
                  <span>Bali, ID</span>
                  <span className="text-accent-purple font-semibold">Lead Developer</span>
                </div>
              </div>
            </Reveal>

            {/* Card 2: Ni Wayan Sari */}
            <Reveal delay={150}>
              <div className="group rounded-3xl bg-accent-pink/5 border border-accent-pink/20 p-8 h-full flex flex-col justify-between transition-all duration-500 hover:-translate-y-1 hover:shadow-md">
                <div>
                  <div className="w-24 h-24 rounded-2xl overflow-hidden mb-6 border-2 border-accent-pink/30 bg-accent-pink/20 flex items-center justify-center font-heading text-2xl font-bold text-accent-pink">
                    X
                  </div>
                  <h3 className="text-2xl font-bold font-heading text-primary tracking-tight mb-1">
                    X
                  </h3>
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent-pink block mb-4">
                    Co-Founder & Art Director
                  </span>
                  <p className="text-sm text-neutral-grey leading-relaxed font-sans font-normal">
                    Designer and brand strategist crafting modern aesthetics and interactive user experiences tailored for wedding couples.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-accent-pink/10 flex justify-between items-center text-xs text-neutral-grey font-sans font-medium">
                  <span>Bali, ID</span>
                  <span className="text-accent-pink font-semibold">Design Lead</span>
                </div>
              </div>
            </Reveal>

            {/* Card 3: Ketut Budi */}
            <Reveal delay={300}>
              <div className="group rounded-3xl bg-accent-green/5 border border-accent-green/20 p-8 h-full flex flex-col justify-between transition-all duration-500 hover:-translate-y-1 hover:shadow-md">
                <div>
                  <div className="w-24 h-24 rounded-2xl overflow-hidden mb-6 border-2 border-accent-green/30 bg-accent-green/20 flex items-center justify-center font-heading text-2xl font-bold text-accent-green">
                    X
                  </div>
                  <h3 className="text-2xl font-bold font-heading text-primary tracking-tight mb-1">
                    X
                  </h3>
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent-green block mb-4">
                    Head of Operations
                  </span>
                  <p className="text-sm text-neutral-grey leading-relaxed font-sans font-normal">
                    Operations specialist focused on vendor network expansion, contract validation, and customer success management.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-accent-green/10 flex justify-between items-center text-xs text-neutral-grey font-sans font-medium">
                  <span>Jakarta, ID</span>
                  <span className="text-accent-green font-semibold">Operations</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── Testimonials Section ─── */}
      <section id="testimonials" className="relative py-24 sm:py-32 px-6 md:px-12 grid-bg">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <span className="text-xs uppercase tracking-[0.25em] text-accent-green font-sans font-bold mb-4 block">
                Testimonials
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 font-heading text-primary">
                Trusted by <span className="text-accent-yellow italic font-normal">Creative</span> Couples
              </h2>
              <p className="text-sm sm:text-base max-w-lg mx-auto text-neutral-grey font-sans font-normal">
                Here is what early testers and wedding professionals say about the Ananka ecosystem.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Testimonial 1 */}
            <Reveal delay={0}>
              <div className="bg-white border border-primary/5 rounded-3xl p-8 flex flex-col justify-between h-full hover:border-primary/15 transition-all duration-300">
                <p className="text-sm sm:text-base leading-relaxed text-primary font-sans font-medium italic mb-6">
                  &ldquo;Finding trustworthy vendors in Bali used to take hours of manual DMs. Ananka simplifies the matching process in a way that feels premium and transparent.&rdquo;
                </p>
                <div>
                  <h4 className="text-base font-bold font-heading text-primary">Made & Gede</h4>
                  <span className="text-xs text-neutral-grey font-sans">Married in Ubud, 2026</span>
                </div>
              </div>
            </Reveal>

            {/* Testimonial 2 */}
            <Reveal delay={150}>
              <div className="bg-white border border-primary/5 rounded-3xl p-8 flex flex-col justify-between h-full hover:border-primary/15 transition-all duration-300">
                <p className="text-sm sm:text-base leading-relaxed text-primary font-sans font-medium italic mb-6">
                  &ldquo;As a wedding photographer, Ananka helps me list my packages clearly without administrative hassle. It gives couples exact prices without hidden fees.&rdquo;
                </p>
                <div>
                  <h4 className="text-base font-bold font-heading text-primary">Alex Tan</h4>
                  <span className="text-xs text-neutral-grey font-sans">Professional Photographer</span>
                </div>
              </div>
            </Reveal>

            {/* Testimonial 3 */}
            <Reveal delay={300}>
              <div className="bg-white border border-primary/5 rounded-3xl p-8 flex flex-col justify-between h-full hover:border-primary/15 transition-all duration-300">
                <p className="text-sm sm:text-base leading-relaxed text-primary font-sans font-medium italic mb-6">
                  &ldquo;The milestone-based payment and escrow system is a game changer. It gives both couples and vendors complete peace of mind throughout the booking process.&rdquo;
                </p>
                <div>
                  <h4 className="text-base font-bold font-heading text-primary">Siti & Rian</h4>
                  <span className="text-xs text-neutral-grey font-sans">Planning for 2027</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── Newsletter Section ─── */}
      <section
        className="relative py-24 sm:py-32 px-6 md:px-12 bg-white/30"
      >
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.25em] text-accent-green font-sans font-bold mb-4 block">
              Newsletter
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 font-heading text-primary">
              Stay in the <span className="text-accent-pink italic font-normal">Loop</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-sm sm:text-base mb-10 text-neutral-grey font-sans font-normal max-w-md mx-auto">
              Subscribe to get updates on our development path, design showcases, and early beta access.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-grow px-6 py-3.5 rounded-full text-sm font-sans focus:outline-none transition-all duration-300 bg-white border border-primary/10 text-primary placeholder-primary/30 focus:border-primary/30"
                required
              />
              <button
                type="submit"
                className="group px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide bg-primary text-cream hover:bg-primary/95 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Notify Me
                <span className="text-xs transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
            </form>

            {subscribed && (
              <div
                className="mt-6 px-6 py-2.5 rounded-full text-xs font-semibold inline-block bg-accent-green/10 border border-accent-green/20 text-accent-green font-sans animate-bounce"
              >
                ✓ Thanks! We will keep you updated.
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* ─── Contact Section ─── */}
      <section
        id="contact"
        className="relative py-24 sm:py-32 px-6 md:px-12 grid-bg"
      >
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.25em] text-accent-green font-sans font-bold mb-4 block">
              Contact
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 font-heading text-primary">
              Let&apos;s Build <span className="text-accent-yellow italic font-normal">Together</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-sm sm:text-base mb-10 text-neutral-grey font-sans font-normal max-w-md mx-auto">
              Have vendor feedback, business inquires, or just want to chat about weddings? Connect with our team.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="flex justify-center gap-4 mb-10">
              {[
                {
                  href: "#",
                  label: "Facebook",
                  path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
                },
                {
                  href: "#",
                  label: "Twitter",
                  path: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z",
                },
                {
                  href: "#",
                  label: "Instagram",
                  path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z",
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-12 h-12 rounded-full flex items-center justify-center border border-primary/10 bg-white/50 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-primary/20 hover:bg-white"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={400}>
            <p className="text-sm text-neutral-grey font-sans">
              Email us at{" "}
              <a
                href="mailto:info@ananka.id"
                className="font-semibold text-primary border-b border-primary/20 hover:border-primary transition-all duration-300 pb-0.5"
              >
                info@ananka.id
              </a>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer
        className="relative py-8 px-6 md:px-12"
        style={{
          zIndex: 1,
          borderTop: "1px solid rgba(44, 44, 29, 0.08)",
        }}
      >
        <div className="max-w-5xl mx-auto flex justify-center items-center">
          <p className="text-xs tracking-wide text-neutral-grey font-sans">
            © {new Date().getFullYear()} Ananka. All rights reserved.
          </p>
        </div>
      </footer>

      {/* ─── Global Styles ─── */}
      <style jsx global>{`
        ::selection {
          background: rgba(44, 44, 29, 0.08);
          color: #2c2c1d;
        }

        ::placeholder {
          color: rgba(44, 44, 29, 0.3) !important;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: #fafaf7;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(44, 44, 29, 0.1);
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(44, 44, 29, 0.2);
        }
      `}</style>
    </div>
  );
}
