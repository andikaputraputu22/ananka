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

// ─── Particle Canvas Background ───
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      o: number;
    }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const COUNT = 60;
    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5,
        o: Math.random() * 0.4 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212,175,130,${p.o})`;
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(212,175,130,${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
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
  const stroke = 3;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (value / max) * circumference;

  return (
    <div className="flex flex-col items-center">
      {/* Desktop size */}
      <div className="relative hidden sm:block" style={{ width: 96, height: 96 }}>
        <svg
          width="96"
          height="96"
          viewBox="0 0 96 96"
          className="transform -rotate-90"
        >
          <circle cx="48" cy="48" r={radius} fill="none" stroke="rgba(212,175,130,0.12)" strokeWidth={stroke} />
          <circle cx="48" cy="48" r={radius} fill="none" stroke="url(#gold-gradient)" strokeWidth={stroke} strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={progress} style={{ transition: "stroke-dashoffset 0.6s ease" }} />
          <defs>
            <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d4af82" />
              <stop offset="100%" stopColor="#e8c9a0" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-light tracking-tight" style={{ color: "#e8ddd0", fontFamily: "'Inter', sans-serif" }}>
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
          <circle cx="32" cy="32" r={26} fill="none" stroke="rgba(212,175,130,0.12)" strokeWidth={2} />
          <circle cx="32" cy="32" r={26} fill="none" stroke="url(#gold-gradient-sm)" strokeWidth={2} strokeLinecap="round" strokeDasharray={2 * Math.PI * 26} strokeDashoffset={2 * Math.PI * 26 - (value / max) * 2 * Math.PI * 26} style={{ transition: "stroke-dashoffset 0.6s ease" }} />
          <defs>
            <linearGradient id="gold-gradient-sm" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d4af82" />
              <stop offset="100%" stopColor="#e8c9a0" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-light tracking-tight" style={{ color: "#e8ddd0", fontFamily: "'Inter', sans-serif" }}>
            {String(value).padStart(2, "0")}
          </span>
        </div>
      </div>
      <span
        className="mt-1.5 sm:mt-2 text-[10px] sm:text-xs uppercase tracking-[0.2em]"
        style={{
          color: "rgba(212,175,130,0.6)",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {label}
      </span>
    </div>
  );
}

// ─── Feature Card ───
function FeatureCard({
  icon,
  title,
  description,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}) {
  const { ref, inView } = useInView(0.2);
  return (
    <div
      ref={ref}
      className="group relative rounded-2xl p-[1px] transition-all duration-700"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transitionDelay: `${delay}ms`,
        background:
          "linear-gradient(135deg, rgba(212,175,130,0.3), rgba(212,175,130,0.05))",
      }}
    >
      <div
        className="relative rounded-2xl p-6 sm:p-8 h-full transition-all duration-500"
        style={{
          background: "rgba(18,15,12,0.7)",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Hover glow */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "radial-gradient(circle at 50% 0%, rgba(212,175,130,0.08) 0%, transparent 60%)",
          }}
        />
        <div className="relative z-10">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110"
            style={{
              background:
                "linear-gradient(135deg, rgba(212,175,130,0.15), rgba(212,175,130,0.05))",
              border: "1px solid rgba(212,175,130,0.15)",
            }}
          >
            {icon}
          </div>
          <h3
            className="text-lg font-medium mb-3"
            style={{ color: "#e8ddd0", fontFamily: "'Inter', sans-serif" }}
          >
            {title}
          </h3>
          <p
            className="text-sm leading-relaxed"
            style={{
              color: "rgba(200,190,180,0.6)",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {description}
          </p>
        </div>
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
  const [scrollY, setScrollY] = useState(0);
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
      setScrollY(window.scrollY);
      const sections = ["home", "about", "features", "contact"];
      const scrollPosition = window.scrollY + 100;
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
    if (element) element.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  }, []);

  // Color palette constants
  const GOLD = "#d4af82";
  const GOLD_LIGHT = "#e8c9a0";
  const TEXT_PRIMARY = "#e8ddd0";
  const TEXT_SECONDARY = "rgba(200,190,180,0.6)";
  const BG_DARK = "#0c0a08";

  return (
    <div
      className="overflow-x-hidden"
      style={{
        background: BG_DARK,
        color: TEXT_PRIMARY,
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <Head>
        <title>Ananka — Plan Your Better Wedding</title>
        <meta
          name="description"
          content="Ananka is coming soon! The ultimate platform for hiring wedding vendors. Launching in 2027."
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Inter:wght@300;400;500;600&family=Outfit:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <ParticleCanvas />

      {/* ─── Navigation ─── */}
      <nav
        className="fixed top-0 w-full z-50 transition-all duration-500"
        style={{
          background: scrollY > 50 ? "rgba(12,10,8,0.85)" : "transparent",
          backdropFilter: scrollY > 50 ? "blur(20px)" : "none",
          borderBottom:
            scrollY > 50
              ? "1px solid rgba(212,175,130,0.08)"
              : "1px solid transparent",
          padding: scrollY > 50 ? "16px 0" : "28px 0",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-8 flex justify-between items-center">
          <div
            className="cursor-pointer transition-all duration-300 hover:opacity-80 flex items-center gap-0"
            onClick={() => scrollToSection("home")}
          >
            <img
              src="/images/logo_ananka.png"
              alt="Ananka Logo"
              className="h-8 md:h-9 w-auto"
              style={{
                filter: "brightness(0) invert(92%) sepia(10%) saturate(300%) hue-rotate(15deg) brightness(1.02)",
              }}
            />
            <span
              className="text-2xl md:text-3xl font-semibold tracking-wide lowercase"
              style={{ color: TEXT_PRIMARY, fontFamily: "'Outfit', sans-serif", marginLeft: "-1px" }}
            >
              nanka
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {["home", "about", "features", "contact"].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="relative capitalize text-sm tracking-wide transition-all duration-300"
                style={{
                  color: activeSection === section ? GOLD : TEXT_SECONDARY,
                  fontWeight: activeSection === section ? 500 : 400,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {section}
                <span
                  className="absolute -bottom-1 left-0 h-[1px] transition-all duration-300"
                  style={{
                    width: activeSection === section ? "100%" : "0%",
                    background: `linear-gradient(90deg, ${GOLD}, transparent)`,
                  }}
                />
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span
              className="block w-6 h-[1px] transition-all duration-300"
              style={{
                background: GOLD,
                transform: isMenuOpen
                  ? "rotate(45deg) translate(3px, 3px)"
                  : "none",
              }}
            />
            <span
              className="block w-6 h-[1px] transition-all duration-300"
              style={{
                background: GOLD,
                opacity: isMenuOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-6 h-[1px] transition-all duration-300"
              style={{
                background: GOLD,
                transform: isMenuOpen
                  ? "rotate(-45deg) translate(3px, -3px)"
                  : "none",
              }}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className="md:hidden overflow-hidden transition-all duration-400"
          style={{
            maxHeight: isMenuOpen ? "320px" : "0",
            background: "rgba(12,10,8,0.95)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div className="px-6 py-6 flex flex-col gap-4">
            {["home", "about", "features", "contact"].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="text-left capitalize text-sm tracking-wide transition-all duration-300"
                style={{
                  color: activeSection === section ? GOLD : TEXT_SECONDARY,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {section}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ─── Hero Section ─── */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center px-6 md:px-12"
        style={{ zIndex: 1 }}
      >
        {/* Subtle radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 40%, rgba(212,175,130,0.06) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          {/* Tagline */}
          <div
            className="mb-6"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s ease 0.2s",
            }}
          >
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs uppercase tracking-[0.25em]"
              style={{
                color: GOLD,
                border: `1px solid rgba(212,175,130,0.2)`,
                background: "rgba(212,175,130,0.05)",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Coming 2027
            </span>
          </div>

          {/* Heading */}
          <h1
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-normal mb-6 leading-[1.1]"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: TEXT_PRIMARY,
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s ease 0.4s",
            }}
          >
            Plan Your{" "}
            <span
              className="italic"
              style={{
                background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Better
            </span>
            <br />
            Wedding
          </h1>

          {/* Subheading */}
          <p
            className="text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed"
            style={{
              color: TEXT_SECONDARY,
              fontFamily: "'Inter', sans-serif",
              fontWeight: 300,
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s ease 0.6s",
            }}
          >
            The ultimate platform for discovering and booking the perfect
            wedding vendors — beautifully simple.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12 sm:mb-16 px-4 sm:px-0"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s ease 0.8s",
            }}
          >
            <button
              onClick={() => scrollToSection("contact")}
              className="group relative px-8 py-3.5 rounded-full text-sm font-medium tracking-wide overflow-hidden transition-all duration-500"
              style={{
                background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
                color: BG_DARK,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              <span className="relative z-10">Get Notified</span>
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(135deg, ${GOLD_LIGHT}, ${GOLD})`,
                }}
              />
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="px-8 py-3.5 rounded-full text-sm font-medium tracking-wide transition-all duration-500 hover:bg-[rgba(212,175,130,0.08)]"
              style={{
                color: GOLD,
                border: `1px solid rgba(212,175,130,0.25)`,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Learn More
            </button>
          </div>

          {/* Countdown Timer */}
          <div
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s ease 1s",
            }}
          >
            <p
              className="text-xs uppercase tracking-[0.25em] mb-6"
              style={{
                color: TEXT_SECONDARY,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Launching in
            </p>
            <div className="flex justify-center gap-4 sm:gap-6 md:gap-10">
              <CountdownRing value={days} max={365} label="Days" />
              <CountdownRing value={hours} max={24} label="Hours" />
              <CountdownRing value={minutes} max={60} label="Min" />
              <CountdownRing value={seconds} max={60} label="Sec" />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          style={{
            opacity: mounted ? 1 : 0,
            transition: "opacity 1s ease 1.5s",
          }}
        >
          <div
            className="flex flex-col items-center gap-2 animate-bounce"
            style={{ animationDuration: "2s" }}
          >
            <span
              className="text-[10px] uppercase tracking-[0.2em]"
              style={{ color: TEXT_SECONDARY }}
            >
              Scroll
            </span>
            <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
              <rect
                x="0.5"
                y="0.5"
                width="15"
                height="23"
                rx="7.5"
                stroke="rgba(212,175,130,0.3)"
              />
              <circle
                cx="8"
                cy="8"
                r="2"
                fill="rgba(212,175,130,0.5)"
                className="animate-scroll-dot"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* ─── About Section ─── */}
      <section
        id="about"
        className="relative py-16 sm:py-24 md:py-32 px-5 sm:px-6 md:px-12"
        style={{ zIndex: 1 }}
      >
        {/* Section divider */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-20"
          style={{
            background: `linear-gradient(to bottom, transparent, rgba(212,175,130,0.2), transparent)`,
          }}
        />

        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <span
                className="text-xs uppercase tracking-[0.3em] mb-4 block"
                style={{ color: GOLD, fontFamily: "'Inter', sans-serif" }}
              >
                Our Story
              </span>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: TEXT_PRIMARY,
                }}
              >
                About{" "}
                <span className="italic" style={{ color: GOLD }}>
                  Ananka
                </span>
              </h2>
            </div>
          </Reveal>

          <div className="max-w-2xl mx-auto space-y-6">
            <Reveal delay={100}>
              <h3
                className="text-xl md:text-2xl font-normal"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: TEXT_PRIMARY,
                }}
              >
                Simplifying Wedding Planning
              </h3>
            </Reveal>
            <Reveal delay={200}>
              <p
                className="text-sm leading-[1.8]"
                style={{
                  color: TEXT_SECONDARY,
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 300,
                }}
              >
                Ananka will be your all-in-one solution for finding, vetting,
                and booking the perfect wedding vendors. From photographers to
                florists, caterers to venues — we connect you with the best
                professionals in the industry.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <p
                className="text-sm leading-[1.8]"
                style={{
                  color: TEXT_SECONDARY,
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 300,
                }}
              >
                Our platform is designed with both couples and vendors in mind,
                creating a seamless experience that saves time, reduces stress,
                and ensures your special day is everything you&apos;ve dreamed
                of.
              </p>
            </Reveal>
            <Reveal delay={400}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 pt-4">
                <button
                  onClick={() => scrollToSection("features")}
                  className="group inline-flex items-center gap-2 text-sm tracking-wide transition-all duration-300"
                  style={{ color: GOLD, fontFamily: "'Inter', sans-serif" }}
                >
                  Explore Features
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path
                      d="M6 12L10 8L6 4"
                      stroke={GOLD}
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {/* Creator signature — subtle inline */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-6 h-[1px]"
                    style={{ background: "rgba(212,175,130,0.2)" }}
                  />
                  <span
                    className="text-xs tracking-wide"
                    style={{
                      color: TEXT_SECONDARY,
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    by{" "}
                    <span style={{ color: GOLD_LIGHT }}>
                      I Putu Andika Putra
                    </span>
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── Features Section ─── */}
      <section
        id="features"
        className="relative py-16 sm:py-24 md:py-32 px-5 sm:px-6 md:px-12"
        style={{ zIndex: 1 }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(212,175,130,0.03) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-5xl mx-auto relative z-10">
          <Reveal>
            <div className="text-center mb-10 sm:mb-16">
              <span
                className="text-xs uppercase tracking-[0.3em] mb-4 block"
                style={{ color: GOLD, fontFamily: "'Inter', sans-serif" }}
              >
                Features
              </span>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal mb-4"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: TEXT_PRIMARY,
                }}
              >
                What to{" "}
                <span className="italic" style={{ color: GOLD }}>
                  Expect
                </span>
              </h2>
              <p
                className="text-sm max-w-lg mx-auto leading-relaxed"
                style={{
                  color: TEXT_SECONDARY,
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 300,
                }}
              >
                Ananka will revolutionize the wedding planning experience with
                these innovative features.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            <FeatureCard
              delay={0}
              icon={
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke={GOLD}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              }
              title="Vendor Discovery"
              description="Browse through a curated selection of top-rated wedding vendors in your area, with detailed profiles, portfolios, and reviews."
            />
            <FeatureCard
              delay={150}
              icon={
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke={GOLD}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              }
              title="Planning Tools"
              description="Stay organized with comprehensive planning tools, including budget trackers, timeline builders, and vendor management."
            />
            <FeatureCard
              delay={300}
              icon={
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke={GOLD}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              }
              title="Secure Booking"
              description="Book vendors with confidence through our secure payment system and transparent contracts, all managed within the platform."
            />
          </div>
        </div>
      </section>

      {/* ─── Newsletter Section ─── */}
      <section
        className="relative py-16 sm:py-24 md:py-32 px-5 sm:px-6 md:px-12"
        style={{ zIndex: 1 }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <Reveal>
            <span
              className="text-xs uppercase tracking-[0.3em] mb-4 block"
              style={{ color: GOLD, fontFamily: "'Inter', sans-serif" }}
            >
              Stay Updated
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-normal mb-4"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: TEXT_PRIMARY,
              }}
            >
              Be the First to{" "}
              <span className="italic" style={{ color: GOLD }}>
                Know
              </span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p
              className="text-sm mb-10 leading-relaxed"
              style={{
                color: TEXT_SECONDARY,
                fontFamily: "'Inter', sans-serif",
                fontWeight: 300,
              }}
            >
              Sign up for our newsletter to get updates on our progress and
              early access when we launch.
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
                className="flex-grow px-5 py-3 rounded-full text-sm focus:outline-none transition-all duration-300"
                style={{
                  background: "rgba(212,175,130,0.06)",
                  border: "1px solid rgba(212,175,130,0.15)",
                  color: TEXT_PRIMARY,
                  fontFamily: "'Inter', sans-serif",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "rgba(212,175,130,0.4)";
                  e.currentTarget.style.background = "rgba(212,175,130,0.08)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "rgba(212,175,130,0.15)";
                  e.currentTarget.style.background = "rgba(212,175,130,0.06)";
                }}
                required
              />
              <button
                type="submit"
                className="px-7 py-3 rounded-full text-sm font-medium tracking-wide transition-all duration-500 hover:shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
                  color: BG_DARK,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Notify Me
              </button>
            </form>

            {subscribed && (
              <div
                className="mt-6 px-5 py-3 rounded-full text-sm inline-block"
                style={{
                  background: "rgba(212,175,130,0.08)",
                  border: "1px solid rgba(212,175,130,0.2)",
                  color: GOLD_LIGHT,
                  fontFamily: "'Inter', sans-serif",
                  animation: "fadeIn 0.5s ease",
                }}
              >
                ✓ Thank you for subscribing! We&apos;ll keep you updated.
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* ─── Contact Section ─── */}
      <section
        id="contact"
        className="relative py-16 sm:py-24 md:py-32 px-5 sm:px-6 md:px-12"
        style={{ zIndex: 1 }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <Reveal>
            <span
              className="text-xs uppercase tracking-[0.3em] mb-4 block"
              style={{ color: GOLD, fontFamily: "'Inter', sans-serif" }}
            >
              Contact
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-normal mb-4"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: TEXT_PRIMARY,
              }}
            >
              Get in{" "}
              <span className="italic" style={{ color: GOLD }}>
                Touch
              </span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p
              className="text-sm mb-10 leading-relaxed"
              style={{
                color: TEXT_SECONDARY,
                fontFamily: "'Inter', sans-serif",
                fontWeight: 300,
              }}
            >
              Have questions or feedback? We&apos;d love to hear from you.
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
                  className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{
                    border: "1px solid rgba(212,175,130,0.15)",
                    background: "rgba(212,175,130,0.04)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(212,175,130,0.12)";
                    e.currentTarget.style.borderColor = "rgba(212,175,130,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(212,175,130,0.04)";
                    e.currentTarget.style.borderColor =
                      "rgba(212,175,130,0.15)";
                  }}
                >
                  <svg className="w-4 h-4" fill={GOLD} viewBox="0 0 24 24">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={400}>
            <p
              className="text-sm"
              style={{
                color: TEXT_SECONDARY,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Email us at{" "}
              <a
                href="mailto:info@ananka.id"
                className="transition-all duration-300 hover:opacity-80"
                style={{
                  color: GOLD,
                  borderBottom: `1px solid rgba(212,175,130,0.3)`,
                }}
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
          borderTop: "1px solid rgba(212,175,130,0.06)",
        }}
      >
        <div className="max-w-5xl mx-auto flex justify-center items-center">
          <p
            className="text-xs tracking-wide"
            style={{ color: TEXT_SECONDARY, fontFamily: "'Inter', sans-serif" }}
          >
            © {new Date().getFullYear()} Ananka. All rights reserved.
          </p>
        </div>
      </footer>

      {/* ─── Global Styles ─── */}
      <style jsx global>{`
        ::selection {
          background: rgba(212, 175, 130, 0.3);
          color: #e8ddd0;
        }

        ::placeholder {
          color: rgba(200, 190, 180, 0.35) !important;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Scrollbar */
        ::-webkit-scrollbar {
          width: 4px;
        }
        ::-webkit-scrollbar-track {
          background: #0c0a08;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(212, 175, 130, 0.2);
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(212, 175, 130, 0.4);
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scroll-dot {
          0% {
            cy: 7;
            opacity: 1;
          }
          50% {
            cy: 14;
            opacity: 0.3;
          }
          100% {
            cy: 7;
            opacity: 1;
          }
        }

        .animate-scroll-dot {
          animation: scroll-dot 2s ease-in-out infinite;
        }

        /* Override dark mode colors from globals.css */
        body {
          background: #0c0a08 !important;
        }
      `}</style>
    </div>
  );
}
