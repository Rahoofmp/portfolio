"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import SplitType from "split-type";
import { ArrowUpRight, CodeXml, Layers, Boxes, Workflow, Database, Sparkles, Star, ExternalLink, Mail, Phone, MapPin, Laptop, Layout, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const PHOTO_URL = "/AR.png";

export default function Portfolio() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const photoRef = useRef(null);
  const cursorDot = useRef(null);
  const cursorRing = useRef(null);

  const titles = [
    { text: "ABDU", className: "text-white uppercase" },
    { text: "RAHOOF", className: "gradient-text uppercase" },
    { text: "MP", className: "font-serif-italic font-normal text-white/80 lowercase" }
  ];
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    if (!loading) {
      const interval = setInterval(() => {
        setTitleIndex((prev) => (prev + 1) % titles.length);
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [loading]);

  useEffect(() => {
    // Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    lenis.on('scroll', ScrollTrigger.update);

    // Loader
    let p = 0;
    const interval = setInterval(() => {
      p += 2;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setTimeout(() => setLoading(false), 400);
      }
    }, 30);

    // Custom Cursor
    const moveCursor = (e) => {
      gsap.to(cursorDot.current, { x: e.clientX, y: e.clientY, duration: 0.1 });
      gsap.to(cursorRing.current, { x: e.clientX - 12, y: e.clientY - 12, duration: 0.5 });
    };
    window.addEventListener("mousemove", moveCursor);

    const handleHover = () => {
      gsap.to(cursorRing.current, { scale: 1.5, borderColor: "rgba(240, 171, 252, 0.8)", duration: 0.3 });
    };
    const handleLeave = () => {
      gsap.to(cursorRing.current, { scale: 1, borderColor: "rgba(255, 255, 255, 0.6)", duration: 0.3 });
    };

    document.querySelectorAll("a, button, .hover-trigger, .group").forEach(el => {
      el.addEventListener("mouseenter", handleHover);
      el.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      lenis.destroy();
      window.removeEventListener("mousemove", moveCursor);
      document.querySelectorAll("a, button, .hover-trigger, .group").forEach(el => {
        el.removeEventListener("mouseenter", handleHover);
        el.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      setTimeout(() => ScrollTrigger.refresh(), 100);

      // Hero Animations
      gsap.to(photoRef.current, {
        yPercent: -15, ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top', end: 'bottom top', scrub: true,
        },
      });

      // About Scrub Reveal
      gsap.utils.toArray('.about-line').forEach(el => {
        const split = new SplitType(el, { types: 'words' });
        gsap.from(split.words, {
          opacity: 0.1, y: 20, stagger: 0.04,
          scrollTrigger: { trigger: el, start: 'top 80%', end: 'top 30%', scrub: true },
        });
      });

      // Experience Cards Reveal
      gsap.utils.toArray('.exp-item').forEach((card) => {
        gsap.from(card, {
          opacity: 0, y: 50, duration: 0.8,
          scrollTrigger: { trigger: card, start: 'top 85%' }
        });
      });

      // Stack Reveal
      gsap.utils.toArray('.stack-item').forEach((item) => {
        gsap.from(item, {
          opacity: 0, y: 20, duration: 0.5,
          scrollTrigger: { trigger: item, start: 'top 90%' }
        });
      });

      // Projects Reveal
      gsap.utils.toArray('.project-card').forEach((card) => {
        gsap.from(card, {
          opacity: 0, y: 60, duration: 0.8,
          scrollTrigger: { trigger: card, start: 'top 85%' }
        });
      });

      // Cleanup
      return () => {
        // Any GSAP specific reverting if needed
      };
    }
  }, [loading]);

  return (
    <>
      <div className="grain relative">
        <div ref={cursorDot} className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white pointer-events-none z-[200] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block"></div>
        <div ref={cursorRing} className="fixed top-0 left-0 rounded-full border border-white/60 pointer-events-none z-[199] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block transition-all duration-300 w-8 h-8"></div>

        {loading && (
          <div className="fixed inset-0 z-[300] bg-[#08070a] flex items-end justify-between px-8 pb-8 transition-transform duration-700">
            <div className="font-display text-[18vw] leading-none gradient-text">{(progress < 100 ? "0" : "") + (progress < 10 ? "0" : "") + progress}</div>
            <div className="text-xs uppercase tracking-[0.4em] text-white/60 self-end pb-6">Loading Experience</div>
          </div>
        )}

        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4 bg-[#08070a]/80 backdrop-blur-md border-b border-white/10">
          <a href="#home" className="font-display text-xl font-bold tracking-tight">AR/<span className="text-fuchsia-400">.</span></a>
          <div className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest">
            <a href="#work" className="hover:text-fuchsia-300 transition-colors">Work</a>
            <a href="#about" className="hover:text-fuchsia-300 transition-colors">About</a>
            <a href="#experience" className="hover:text-fuchsia-300 transition-colors">Experience</a>
            <a href="#contact" className="hover:text-fuchsia-300 transition-colors">Contact</a>
          </div>
          <a href="#contact" className="group flex items-center gap-2 text-sm uppercase tracking-widest px-4 py-2 rounded-full border border-white/20 hover:border-fuchsia-400 hover:bg-fuchsia-500/10 transition-all">
            Let's Talk <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
          </a>
        </nav>

        <section id="home" ref={heroRef} className="relative min-h-[65vh] md:min-h-[80vh] flex flex-col justify-between pb-10 px-6 md:px-10 overflow-hidden">
          <div className="aurora-bg"></div>
          <div className="noise-overlay"></div>
          <div className="relative z-10 flex-1 flex flex-col justify-start pt-32 pb-48 md:pb-0 md:justify-center md:pt-0">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs uppercase tracking-[0.4em] text-white/60">Available for projects · 2026</span>
            </div>
            <h1 className="font-display font-bold leading-[0.85] text-[16vw] md:text-[14vw] lg:text-[12vw] tracking-tighter h-[1.1em] relative overflow-hidden flex items-end">
              <AnimatePresence mode="wait">
                <motion.span
                  key={titleIndex}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className={`absolute left-0 bottom-0 ${titles[titleIndex].className}`}
                >
                  {titles[titleIndex].text}
                </motion.span>
              </AnimatePresence>
            </h1>
            <div className="mt-10 grid md:grid-cols-3 gap-8 items-end">
              <div className="md:col-span-2 max-w-2xl text-lg md:text-2xl text-white/70 leading-snug">
                Full-Stack Developer crafting <span className="text-white">scalable digital experiences</span> with <span className="text-fuchsia-300">PHP</span>, <span className="text-cyan-300">Laravel</span>, <span className="text-violet-300">Next.js</span> & <span className="text-pink-300">Blockchain</span>.
              </div>
              <div className="flex items-center gap-4 md:justify-end">
              </div>
            </div>
          </div>
          <div ref={photoRef} className="absolute right-4 md:right-10 bottom-10 w-40 h-52 md:w-64 md:h-80 rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-fuchsia-900/40 z-[5]">
            <Image src={PHOTO_URL} alt="Abdu Rahoof MP" fill priority unoptimized className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-fuchsia-900/40 via-transparent to-transparent"></div>
          </div>
          <div className="relative z-10 flex items-end justify-between text-xs uppercase tracking-[0.3em]">
            <div className="text-cyan-300/90">Kerala, India · UTC+5:30</div>
            <div className="hidden md:block text-fuchsia-300/90">3+ Years · 25+ Projects</div>
            <div className="text-emerald-300/90">Scroll ↓</div>
          </div>
        </section>

        <div className="relative py-10 border-y border-white/10 overflow-hidden bg-black/40">
          <div className="marquee-track gap-12 text-5xl md:text-7xl font-display font-bold text-white/40 hover:text-white/80 transition-colors">
            {[...Array(3)].map((_, i) => (
              <span key={i} className="flex gap-12 shrink-0">
                <span>Laravel</span><span>✦</span>
                <span>Next.js</span><span>✦</span>
                <span>Blockchain</span><span>✦</span>
                <span>CRM/ERP</span><span>✦</span>
                <span>Smart Contracts</span><span>✦</span>
                <span>E-Commerce</span><span>✦</span>
                <span>Angular</span><span>✦</span>
                <span>PHP</span><span>✦</span>
              </span>
            ))}
          </div>
        </div>

        <section id="about" className="relative py-15 px-6 md:px-10 overflow-hidden">
          <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-10">
            <div className="md:col-span-3">
              <div className="text-xs uppercase tracking-[0.4em] text-fuchsia-300 mb-3">(About)</div>
              <div className="sticky top-32">
                <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden border border-white/10">
                  <Image src={PHOTO_URL} alt="Abdu" fill priority unoptimized className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-sm font-display">
                    Abdu Rahoof MP<br /><span className="text-white/60 text-xs">Software Engineer</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-span-9 space-y-6">
              <p className="about-line font-display text-3xl md:text-5xl leading-[1.1] tracking-tight">
                I'm a <span className="split-gradient">results-driven</span> full-stack developer with 3+ years building scalable web platforms — from <em className="font-serif-italic font-normal">e-commerce</em> and <em className="font-serif-italic font-normal">MLM systems</em> to <em className="font-serif-italic font-normal">blockchain</em> applications and enterprise <em className="font-serif-italic font-normal">CRM/ERP</em> suites.
              </p>
              <p className="about-line text-lg md:text-xl text-white/60 leading-relaxed max-w-3xl">
                I integrate payment gateways, ship smart contracts, design robust REST APIs, and craft admin dashboards that feel as good as they perform. I write clean, efficient code — and I collaborate like I'm the last line of defense.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10">
                <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-fuchsia-400/40 transition-all">
                  <div className="font-display text-4xl gradient-text">3+</div>
                  <div className="text-xs uppercase tracking-widest text-white/50 mt-2">Years of Experience</div>
                </div>
                <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-fuchsia-400/40 transition-all">
                  <div className="font-display text-4xl gradient-text">25+</div>
                  <div className="text-xs uppercase tracking-widest text-white/50 mt-2">Projects Shipped</div>
                </div>
                <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-fuchsia-400/40 transition-all">
                  <div className="font-display text-4xl gradient-text">10+</div>
                  <div className="text-xs uppercase tracking-widest text-white/50 mt-2">Tech Stacks Mastered</div>
                </div>
                <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-fuchsia-400/40 transition-all">
                  <div className="font-display text-4xl gradient-text">∞</div>
                  <div className="text-xs uppercase tracking-widest text-white/50 mt-2">Cups of Chai</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="relative py-15 px-6 md:px-10 dotted-bg">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-16">
              <div>
                <div className="text-xs uppercase tracking-[0.4em] text-fuchsia-300 mb-3">(Career)</div>
                <h2 className="font-display text-6xl md:text-8xl font-bold tracking-tighter">The <span className="gradient-text">Journey</span></h2>
              </div>
              <div className="hidden md:block text-sm text-cyan-300/80 max-w-xs text-right">From CodeIgniter foundations to Next.js & blockchain frontiers.</div>
            </div>
            <div className="space-y-6">
              <div className="exp-item group relative p-6 md:p-10 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent hover:border-fuchsia-400/40 transition-all overflow-hidden">
                <div className="absolute -inset-px bg-gradient-to-r from-fuchsia-500/0 via-fuchsia-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl"></div>
                <div className="relative grid md:grid-cols-12 gap-6 items-start">
                  <div className="md:col-span-3 flex items-center gap-4">
                    <div className="p-3 rounded-full border border-white/10 bg-white/5 text-fuchsia-300">
                      <Laptop className="w-5 h-5" />
                    </div>
                    <div className="text-xs uppercase tracking-[0.3em] text-white/80 mt-1">2026 — Now</div>
                  </div>
                  <div className="md:col-span-6">
                    <h3 className="font-display text-2xl md:text-4xl font-semibold tracking-tight mb-3 group-hover:text-fuchsia-200 transition-colors">PHP Laravel & Next.js Developer</h3>
                    <p className="text-white/60 leading-relaxed">Architecting custom CRM, ERP, project management tools, and blockchain-driven platforms. Building dynamic Next.js frontends paired with robust Laravel RESTful APIs and powerful admin dashboards.</p>
                  </div>
                  <div className="md:col-span-3 flex flex-wrap gap-2 md:justify-end">
                    <span className="px-3 py-1 text-xs rounded-full border border-white/15 bg-white/5">Laravel</span>
                    <span className="px-3 py-1 text-xs rounded-full border border-white/15 bg-white/5">Next.js</span>
                    <span className="px-3 py-1 text-xs rounded-full border border-white/15 bg-white/5">CRM/ERP</span>
                    <span className="px-3 py-1 text-xs rounded-full border border-white/15 bg-white/5">Blockchain</span>
                  </div>
                </div>
                <ArrowUpRight className="absolute top-6 right-6 w-6 h-6 text-white/30 group-hover:text-fuchsia-300 group-hover:rotate-45 transition-all" />
              </div>
              <div className="exp-item group relative p-6 md:p-10 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent hover:border-fuchsia-400/40 transition-all overflow-hidden">
                <div className="absolute -inset-px bg-gradient-to-r from-fuchsia-500/0 via-fuchsia-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl"></div>
                <div className="relative grid md:grid-cols-12 gap-6 items-start">
                  <div className="md:col-span-3 flex items-center gap-4">
                    <div className="p-3 rounded-full border border-white/10 bg-white/5 text-cyan-300">
                      <Layout className="w-5 h-5" />
                    </div>
                    <div className="text-xs uppercase tracking-[0.3em] text-white/80 mt-1">2025 — 2026</div>
                  </div>
                  <div className="md:col-span-6">
                    <h3 className="font-display text-2xl md:text-4xl font-semibold tracking-tight mb-3 group-hover:text-fuchsia-200 transition-colors">PHP Laravel & Angular Developer</h3>
                    <p className="text-white/60 leading-relaxed">Delivered CMS-based websites with Angular frontends and Laravel REST APIs. Shipped full admin dashboards enabling non-technical teams to manage products, services & site content.</p>
                  </div>
                  <div className="md:col-span-3 flex flex-wrap gap-2 md:justify-end">
                    <span className="px-3 py-1 text-xs rounded-full border border-white/15 bg-white/5">Laravel</span>
                    <span className="px-3 py-1 text-xs rounded-full border border-white/15 bg-white/5">Angular</span>
                    <span className="px-3 py-1 text-xs rounded-full border border-white/15 bg-white/5">REST API</span>
                    <span className="px-3 py-1 text-xs rounded-full border border-white/15 bg-white/5">CMS</span>
                  </div>
                </div>
                <ArrowUpRight className="absolute top-6 right-6 w-6 h-6 text-white/30 group-hover:text-fuchsia-300 group-hover:rotate-45 transition-all" />
              </div>
              <div className="exp-item group relative p-6 md:p-10 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent hover:border-fuchsia-400/40 transition-all overflow-hidden">
                <div className="absolute -inset-px bg-gradient-to-r from-fuchsia-500/0 via-fuchsia-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl"></div>
                <div className="relative grid md:grid-cols-12 gap-6 items-start">
                  <div className="md:col-span-3 flex items-center gap-4">
                    <div className="p-3 rounded-full border border-white/10 bg-white/5 text-purple-400">
                      <Terminal className="w-5 h-5" />
                    </div>
                    <div className="text-xs uppercase tracking-[0.3em] text-white/80 mt-1">2023 — 2025</div>
                  </div>
                  <div className="md:col-span-6">
                    <h3 className="font-display text-2xl md:text-4xl font-semibold tracking-tight mb-3 group-hover:text-fuchsia-200 transition-colors">PHP CodeIgniter Developer</h3>
                    <p className="text-white/60 leading-relaxed">Built and maintained dynamic web apps in PHP & MySQL. Collaborated on smart contract creation, multi-currency payment processing, and rigorous API testing with Postman.</p>
                  </div>
                  <div className="md:col-span-3 flex flex-wrap gap-2 md:justify-end">
                    <span className="px-3 py-1 text-xs rounded-full border border-white/15 bg-white/5">CodeIgniter</span>
                    <span className="px-3 py-1 text-xs rounded-full border border-white/15 bg-white/5">PHP</span>
                    <span className="px-3 py-1 text-xs rounded-full border border-white/15 bg-white/5">MySQL</span>
                    <span className="px-3 py-1 text-xs rounded-full border border-white/15 bg-white/5">Smart Contracts</span>
                  </div>
                </div>
                <ArrowUpRight className="absolute top-6 right-6 w-6 h-6 text-white/30 group-hover:text-fuchsia-300 group-hover:rotate-45 transition-all" />
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-24 px-6 md:px-10 overflow-hidden border-y border-white/10">
          <div className="max-w-7xl mx-auto mb-12">
            <div className="text-xs uppercase tracking-[0.4em] text-fuchsia-300 mb-3">(Stack)</div>
            <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tighter">Tools of the <span className="gradient-text">trade</span></h2>
          </div>
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div className="stack-item group relative p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-gradient-to-br hover:from-fuchsia-500/10 hover:to-cyan-500/10 hover:border-fuchsia-400/40 transition-all">
              <CodeXml className="w-6 h-6 text-fuchsia-300 mb-3 group-hover:text-white transition-colors" />
              <div className="font-display font-medium text-lg">PHP</div>
            </div>
            <div className="stack-item group relative p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-gradient-to-br hover:from-fuchsia-500/10 hover:to-cyan-500/10 hover:border-fuchsia-400/40 transition-all">
              <Layers className="w-6 h-6 text-fuchsia-300 mb-3 group-hover:text-white transition-colors" />
              <div className="font-display font-medium text-lg">Laravel</div>
            </div>
            <div className="stack-item group relative p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-gradient-to-br hover:from-fuchsia-500/10 hover:to-cyan-500/10 hover:border-fuchsia-400/40 transition-all">
              <Boxes className="w-6 h-6 text-fuchsia-300 mb-3 group-hover:text-white transition-colors" />
              <div className="font-display font-medium text-lg">Next.js</div>
            </div>
            <div className="stack-item group relative p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-gradient-to-br hover:from-fuchsia-500/10 hover:to-cyan-500/10 hover:border-fuchsia-400/40 transition-all">
              <Workflow className="w-6 h-6 text-fuchsia-300 mb-3 group-hover:text-white transition-colors" />
              <div className="font-display font-medium text-lg">Angular</div>
            </div>
            <div className="stack-item group relative p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-gradient-to-br hover:from-fuchsia-500/10 hover:to-cyan-500/10 hover:border-fuchsia-400/40 transition-all">
              <CodeXml className="w-6 h-6 text-fuchsia-300 mb-3 group-hover:text-white transition-colors" />
              <div className="font-display font-medium text-lg">CodeIgniter</div>
            </div>
            <div className="stack-item group relative p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-gradient-to-br hover:from-fuchsia-500/10 hover:to-cyan-500/10 hover:border-fuchsia-400/40 transition-all">
              <Database className="w-6 h-6 text-fuchsia-300 mb-3 group-hover:text-white transition-colors" />
              <div className="font-display font-medium text-lg">MySQL</div>
            </div>
            <div className="stack-item group relative p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-gradient-to-br hover:from-fuchsia-500/10 hover:to-cyan-500/10 hover:border-fuchsia-400/40 transition-all">
              <CodeXml className="w-6 h-6 text-fuchsia-300 mb-3 group-hover:text-white transition-colors" />
              <div className="font-display font-medium text-lg">JavaScript</div>
            </div>
            <div className="stack-item group relative p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-gradient-to-br hover:from-fuchsia-500/10 hover:to-cyan-500/10 hover:border-fuchsia-400/40 transition-all">
              <CodeXml className="w-6 h-6 text-fuchsia-300 mb-3 group-hover:text-white transition-colors" />
              <div className="font-display font-medium text-lg">jQuery</div>
            </div>
            <div className="stack-item group relative p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-gradient-to-br hover:from-fuchsia-500/10 hover:to-cyan-500/10 hover:border-fuchsia-400/40 transition-all">
              <Workflow className="w-6 h-6 text-fuchsia-300 mb-3 group-hover:text-white transition-colors" />
              <div className="font-display font-medium text-lg">REST APIs</div>
            </div>
            <div className="stack-item group relative p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-gradient-to-br hover:from-fuchsia-500/10 hover:to-cyan-500/10 hover:border-fuchsia-400/40 transition-all">
              <Sparkles className="w-6 h-6 text-fuchsia-300 mb-3 group-hover:text-white transition-colors" />
              <div className="font-display font-medium text-lg">Blockchain</div>
            </div>
            <div className="stack-item group relative p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-gradient-to-br hover:from-fuchsia-500/10 hover:to-cyan-500/10 hover:border-fuchsia-400/40 transition-all">
              <Sparkles className="w-6 h-6 text-fuchsia-300 mb-3 group-hover:text-white transition-colors" />
              <div className="font-display font-medium text-lg">Smart Contracts</div>
            </div>
            <div className="stack-item group relative p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-gradient-to-br hover:from-fuchsia-500/10 hover:to-cyan-500/10 hover:border-fuchsia-400/40 transition-all">
              <Boxes className="w-6 h-6 text-fuchsia-300 mb-3 group-hover:text-white transition-colors" />
              <div className="font-display font-medium text-lg">Postman</div>
            </div>
          </div>
          <div className="mt-16 marquee-track gap-10 text-2xl md:text-3xl font-display text-white/50 hover:text-white/90 transition-colors">
            {[...Array(3)].map((_, i) => (
              <span key={i} className="flex gap-10 shrink-0">
                <span>Front-end & Back-end Integration</span><span>★</span>
                <span>Payment Gateway Integration</span><span>★</span>
                <span>Smart Contract Development</span><span>★</span>
                <span>E-Commerce Software</span><span>★</span>
                <span>MLM Software</span><span>★</span>
                <span>CRM & ERP Solutions</span><span>★</span>
              </span>
            ))}
          </div>
        </section>

        <section id="work" className="relative py-12 px-6 md:px-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-16">
              <div>
                <div className="text-xs uppercase tracking-[0.4em] text-fuchsia-300 mb-3">(Selected Work)</div>
                <h2 className="font-display text-6xl md:text-8xl font-bold tracking-tighter">Featured <span className="gradient-text">Projects</span></h2>
              </div>
              <div className="hidden md:flex items-center gap-2 text-xs uppercase tracking-widest text-fuchsia-300">
                <Star className="w-3 h-3" /> 2023 — 2026
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <a href="https://ausome.ae/" target="_blank" rel="noopener noreferrer" className="project-card group relative overflow-hidden rounded-3xl aspect-[4/3] cursor-pointer md:col-span-2 md:aspect-[16/7]">
                <Image src="/bg_ecommerce.png" alt="E-Commerce Background" fill unoptimized className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 noise-overlay opacity-30"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <span className="text-xs uppercase tracking-[0.3em] text-white/80 px-3 py-1 rounded-full border border-white/30 bg-black/20 backdrop-blur-sm">Full-Stack / Payments</span>
                    <ExternalLink className="w-6 h-6 text-white/80 group-hover:rotate-45 transition-transform" />
                  </div>
                  <div>
                    <h3 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white mb-3 leading-tight">Scalable E-Commerce Platform</h3>
                    <p className="text-white/80 max-w-md mb-4">High-performance multi-vendor e-commerce with integrated payment gateways, inventory and order management.</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-[10px] uppercase tracking-widest px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white">CodeIgniter</span>
                      <span className="text-[10px] uppercase tracking-widest px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white">MySQL</span>
                      <span className="text-[10px] uppercase tracking-widest px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white">Payment Gateways</span>
                    </div>
                  </div>
                </div>
              </a>
              <div className="project-card group relative overflow-hidden rounded-3xl aspect-[4/3] cursor-pointer">
                <Image src="/bg_blockchain.png" alt="Blockchain Background" fill unoptimized className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 noise-overlay opacity-30"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <span className="text-xs uppercase tracking-[0.3em] text-white/80 px-3 py-1 rounded-full border border-white/30 bg-black/20 backdrop-blur-sm">Web3 / Crypto</span>
                    <ExternalLink className="w-6 h-6 text-white/80 group-hover:rotate-45 transition-transform" />
                  </div>
                  <div>
                    <h3 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white mb-3 leading-tight">Blockchain MLM Platform</h3>
                    <p className="text-white/80 max-w-md mb-4">Multi-level marketing platform powered by smart contracts and multi-currency crypto transactions.</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-[10px] uppercase tracking-widest px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white">Laravel</span>
                      <span className="text-[10px] uppercase tracking-widest px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white">Smart Contracts</span>
                      <span className="text-[10px] uppercase tracking-widest px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white">Web3</span>
                    </div>
                  </div>
                </div>
              </div>
              <a href="https://stock-demo.clutchblue.com/" target="_blank" rel="noopener noreferrer" className="project-card group relative overflow-hidden rounded-3xl aspect-[4/3] cursor-pointer">
                <Image src="/bg_crm.jpeg" alt="CRM Background" fill unoptimized className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 noise-overlay opacity-30"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <span className="text-xs uppercase tracking-[0.3em] text-white/80 px-3 py-1 rounded-full border border-white/30 bg-black/20 backdrop-blur-sm">Enterprise SaaS</span>
                    <ExternalLink className="w-6 h-6 text-white/80 group-hover:rotate-45 transition-transform" />
                  </div>
                  <div>
                    <h3 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white mb-3 leading-tight">Custom CRM / ERP Suite</h3>
                    <p className="text-white/80 max-w-md mb-4">Modular CRM and ERP solution with rich admin dashboards, role-based access and real-time analytics.<br /><span className="text-amber-300/90 text-sm mt-1 block">Credentials: admin / 123456</span></p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-[10px] uppercase tracking-widest px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white">Laravel</span>
                      <span className="text-[10px] uppercase tracking-widest px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white">REST API</span>
                    </div>
                  </div>
                </div>
              </a>

              <a href="https://pmt.metacryptonex.com/login" target="_blank" rel="noopener noreferrer" className="project-card group relative overflow-hidden rounded-3xl aspect-[4/3] cursor-pointer">
                <Image src="/bg_pm.jpeg" alt="Project Management Background" fill unoptimized className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 noise-overlay opacity-30"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <span className="text-xs uppercase tracking-[0.3em] text-white/80 px-3 py-1 rounded-full border border-white/30 bg-black/20 backdrop-blur-sm">Productivity</span>
                    <ExternalLink className="w-6 h-6 text-white/80 group-hover:rotate-45 transition-transform" />
                  </div>
                  <div>
                    <h3 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white mb-3 leading-tight">Project Management Tool</h3>
                    <p className="text-white/80 max-w-md mb-4">Team collaboration platform with task boards, time tracking and reporting — built end-to-end.</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-[10px] uppercase tracking-widest px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white">Laravel</span>
                      <span className="text-[10px] uppercase tracking-widest px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white">WebSockets</span>
                    </div>
                  </div>
                </div>
              </a>
              <a href="http://animativebranding.clutchblue.com/" target="_blank" rel="noopener noreferrer" className="project-card group relative overflow-hidden rounded-3xl aspect-[4/3] cursor-pointer">
                <Image src="/bg_branding.jpeg" alt="Branding Website Background" fill unoptimized className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 noise-overlay opacity-30"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <span className="text-xs uppercase tracking-[0.3em] text-white/80 px-3 py-1 rounded-full border border-white/30 bg-black/20 backdrop-blur-sm">Creative / Branding</span>
                    <ExternalLink className="w-6 h-6 text-white/80 group-hover:rotate-45 transition-transform" />
                  </div>
                  <div>
                    <h3 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white mb-3 leading-tight">Branding Website</h3>
                    <p className="text-white/80 max-w-md mb-4">High-end creative portfolio and branding platform with premium animations.</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-[10px] uppercase tracking-widest px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white">Next.js</span>
                      <span className="text-[10px] uppercase tracking-widest px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white">GSAP</span>
                      <span className="text-[10px] uppercase tracking-widest px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white">Tailwind</span>
                    </div>
                  </div>
                </div>
              </a>

              <a href="https://charcole-potrait.cartend.in/" target="_blank" rel="noopener noreferrer" className="project-card group relative overflow-hidden rounded-3xl aspect-[4/3] cursor-pointer md:col-span-2 md:aspect-[16/7]">
                <Image src="/bg_charcoal.png" alt="Charcoal Portrait Portfolio Background" fill unoptimized className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 noise-overlay opacity-30"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <span className="text-xs uppercase tracking-[0.3em] text-white/80 px-3 py-1 rounded-full border border-white/30 bg-black/20 backdrop-blur-sm">Artisan Portfolio</span>
                    <ExternalLink className="w-6 h-6 text-white/80 group-hover:rotate-45 transition-transform" />
                  </div>
                  <div>
                    <h3 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white mb-3 leading-tight">Charcoal Portrait Artist</h3>
                    <p className="text-white/80 max-w-md mb-4">Elegant personal branding website showcasing fine charcoal artwork with commissions booking and live galleries.</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-[10px] uppercase tracking-widest px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white">Next.js</span>
                      <span className="text-[10px] uppercase tracking-widest px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white">Framer Motion</span>
                      <span className="text-[10px] uppercase tracking-widest px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white">Tailwind</span>
                    </div>
                  </div>
                </div>
              </a>

            </div>
          </div>
        </section>

        <section id="contact" className="relative py-12 px-6 md:px-10 overflow-hidden">
          <div className="aurora-bg opacity-60"></div>
          <div className="relative z-10 max-w-7xl mx-auto text-center">
            <div className="text-xs uppercase tracking-[0.4em] text-fuchsia-300 mb-6">(Get in Touch)</div>
            <h2 className="font-display text-[14vw] md:text-[10vw] font-bold leading-[0.85] tracking-tighter mb-10">
              Let's build <span className="font-serif-italic font-normal italic">something</span><br /><span className="gradient-text">extraordinary.</span>
            </h2>
            <a href="mailto:rahoofmp01@gmail.com" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-medium text-lg btn-shine hover:scale-105 transition-transform">
              rahoofmp01@gmail.com <ArrowUpRight className="w-5 h-5" />
            </a>
            <div className="mt-20 grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <a href="mailto:rahoofmp01@gmail.com" className="group p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-fuchsia-400/40 hover:bg-white/[0.05] transition-all text-left">
                <Mail className="w-5 h-5 text-fuchsia-300 mb-3" />
                <div className="text-xs uppercase tracking-widest text-white/40 mb-1">Email</div>
                <div className="font-display text-lg group-hover:text-fuchsia-200 transition-colors">rahoofmp01@gmail.com</div>
              </a>
              <a href="tel:+917356357436" className="group p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-fuchsia-400/40 hover:bg-white/[0.05] transition-all text-left">
                <Phone className="w-5 h-5 text-fuchsia-300 mb-3" />
                <div className="text-xs uppercase tracking-widest text-white/40 mb-1">Phone</div>
                <div className="font-display text-lg group-hover:text-fuchsia-200 transition-colors">+91 7356357436</div>
              </a>
              <a href="#" className="group p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-fuchsia-400/40 hover:bg-white/[0.05] transition-all text-left">
                <MapPin className="w-5 h-5 text-fuchsia-300 mb-3" />
                <div className="text-xs uppercase tracking-widest text-white/40 mb-1">Based in</div>
                <div className="font-display text-lg group-hover:text-fuchsia-200 transition-colors">Kerala, India</div>
              </a>
            </div>
          </div>
        </section>

        <footer className="relative px-6 md:px-10 py-10 border-t border-white/10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">
            <div>© 2026 Abdu Rahoof MP. Crafted with obsession.</div>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-fuchsia-300 transition-colors flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github w-4 h-4" aria-hidden="true"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg> GitHub
              </a>
              <a href="#" className="hover:text-fuchsia-300 transition-colors flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin w-4 h-4" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg> LinkedIn
              </a>
              <a href="#home" className="hover:text-fuchsia-300 transition-colors">Back to top ↑</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
