"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { FaVideo, FaChartLine, FaPenFancy, FaGlobe, FaXTwitter, FaDownload, FaMoon, FaSun } from "react-icons/fa6";
import Image from "next/image";

// ---------- Data ----------
const experience = [
  { 
    role: "Digital Content Manager", 
    org: "Red Lantern Digital Media", 
    period: "2026-current", 
    logo: "/redlantern.png",
    clients: [
      { name: "FIFA", logo: "/fifa.png" },
      { name: "FanCode", logo: "/fancode.png" },
      { name: "Premier League India", logo: "/pl-india.png" },
      { name: "Liverpool India", logo: "/lfc-india.png" }
    ]
  },
  { role: "Media Manager", org: "Hyderabad FC", period: "2020–2025", logo: "/hfc.png" },
  { role: "Content Analyst", org: "Microsoft (Bing Sports)", period: "2018–2020", logo: "/microsoft.png" },
  { role: "Editor", org: "The 4th Official", period: "2016–2018", logo: "/4th-official.png" },
  { role: "Freelance Writer", org: "Multiple Outlets", period: "2014–2020", logo: "/freelance.png" },
];

const achievements: Record<string, { text: string; icon: React.ReactNode }[]> = {
  "Digital Content Manager": [
    { text: "FIFA: Oversaw the best year in FIFA YouTube history, leading the publishing strategy for the 2026 FIFA World Cup and managing HBS delivery workflows.", icon: <FaVideo /> },
    { text: "FIFA: Managed daily global publishing operations throughout the entirety of 2026, ensuring consistent content delivery across international markets.", icon: <FaGlobe /> },
    { text: "FIFA: Directed thumbnail design and visual packaging for the complete 2026 FIFA World Cup content slate, maximizing click-through rates.", icon: <FaPenFancy /> },
    { text: "FIFA: Grew channel subscribers from 27.18 million to 35.33 million and increased watch time to 64.95 million hours within a single reporting period.", icon: <FaChartLine /> },
    { text: "FanCode: Managed daily social media content publishing for major sports leagues including the ISL and La Liga.", icon: <FaGlobe /> },
    { text: "FanCode: Formulated comprehensive weekly content plans and performance reports to drive engagement strategy.", icon: <FaChartLine /> },
    { text: "FanCode: Produced and edited high-performing social media content utilizing raw broadcast assets.", icon: <FaVideo /> },
  ],
  "Media Manager": [
    { text: "Directed media strategy, increasing engagement by 35% YoY.", icon: <FaVideo /> },
    { text: "Produced and scripted a two-season documentary on Disney+ Hotstar.", icon: <FaVideo /> },
    { text: "Managed daily content across social platforms and live coverage.", icon: <FaGlobe /> },
    { text: "Created fan campaigns that boosted stadium attendance and loyalty.", icon: <FaChartLine /> },
    { text: "Collabs with the biggest celebrities and influencers to increase engagement.", icon: <FaVideo /> },
    { text: "Co-ordinating sponsorships from the biggest global brands like Hummel, EA Sports and more.", icon: <FaVideo /> },
  ],
  "Content Analyst": [
    { text: "Built predictive models for Premier League & Champions League outcomes.", icon: <FaChartLine /> },
    { text: "Enhanced Bing Sports UX with improved live coverage and personalization.", icon: <FaGlobe /> },
    { text: "Streamlined API integrations for real-time match data.", icon: <FaChartLine /> },
  ],
  Editor: [
    { text: "Led a team of 10 writers, publishing 20+ articles daily.", icon: <FaPenFancy /> },
    { text: "Strengthened workflows for quick and reliable match-day coverage.", icon: <FaPenFancy /> },
    { text: "Expanded reach through consistent, high-quality analysis.", icon: <FaGlobe /> },
  ],
  "Freelance Writer": [
    { text: "Authored 15,000+ football articles across global platforms.", icon: <FaPenFancy /> },
    { text: "Only Indian columnist at RousingTheKop (Liverpool FC fan site).", icon: <FaGlobe /> },
    { text: "Built a readership of 500,000+ with in-depth football analysis.", icon: <FaChartLine /> },
  ],
};

const impactData = [
  { client: "FIFA", logo: "/fifa.png", stats: [{ value: "35.3M", label: "Subscribers" }, { value: "127M+", label: "Total Views" }, { value: "64.9M", label: "Hours Watched" }] },
  { client: "FanCode", logo: "/fancode.png", stats: [{ value: "Daily", label: "Content Output" }, { value: "Multi", label: "League Ops (ISL, La Liga)" }, { value: "Weekly", label: "Strategy Reports" }] },
  { client: "Hyderabad FC", logo: "/hfc.png", stats: [{ value: "+35%", label: "YoY Engagement" }, { value: "2", label: "Docuseries Seasons" }, { value: "Tier 1", label: "Brand Collabs" }] }
];

const projects = [
  { title: "FIFA YT Publishing", description: "Oversaw the best year in FIFA YouTube history, driving record-breaking subscriber growth and watch time during the 2026 World Cup.", image: "/fifa-yt.jpg" },
  { title: "FanCode ISL & LALIGA", description: "Produced and managed everyday social media content on FanCode for top-tier global football leagues.", image: "/fancode-content.jpg" },
  { title: "Future Is Us Docuseries", description: "First-of-its-kind sports docuseries following the journey of Hyderabad FC, aired on Disney+ Hotstar.", image: "/future-is-us.jpg" },
  { title: "Hyderabad FC Trophy Win", description: "Led the digital media strategy and coverage as Media Manager when Hyderabad FC won the ISL championship.", image: "/hfc-trophy.jpg" },
  { title: "Microsoft Bing UI", description: "Helped improve the Bing homepage user interface and user experience for real-time sports searches.", image: "/bing-ui.jpg" },
  { title: "Sports Writer & Editor", description: "Wrote and published over 15,000 articles across global platforms, building a readership of half a million.", image: "/writer.jpg" },
];

const skills = ["Content Strategy", "Video Production", "Sports Analytics", "Editorial Leadership", "Social Media Growth", "Storytelling", "Digital Marketing", "SEO & SEM", "Data Visualization", "Brand Management", "Media Relations", "Public Speaking"];

// ---------- Typewriter Engine ----------
function useTypewriter(words: string[], speed = 80, pause = 1200) {
  const [i, setI] = useState(0);
  const [sub, setSub] = useState(0);
  const [del, setDel] = useState(false);
  const [txt, setTxt] = useState("");

  useEffect(() => {
    const word = words[i % words.length];
    let t = setTimeout(() => {
      if (!del && sub < word.length) { setTxt(word.substring(0, sub + 1)); setSub((s) => s + 1); } 
      else if (del && sub > 0) { setTxt(word.substring(0, sub - 1)); setSub((s) => s - 1); } 
      else if (!del && sub === word.length) { setDel(true); clearTimeout(t); t = setTimeout(() => setDel(true), pause); } 
      else if (del && sub === 0) { setDel(false); setI((x) => x + 1); }
    }, del ? speed / 2 : speed);
    return () => clearTimeout(t);
  }, [sub, i, del, words, speed, pause]);
  return txt;
}

// ---------- Main Page Component ----------
export default function Page() {
  const [isDark, setIsDark] = useState(true);
  const [active, setActive] = useState("about");
  const [progress, setProgress] = useState(0);

  const aboutRef = useRef<HTMLElement>(null);
  const impactRef = useRef<HTMLElement>(null);
  const experienceRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const refs = useMemo(() => ({
    about: aboutRef, impact: impactRef, experience: experienceRef, projects: projectsRef, skills: skillsRef, contact: contactRef,
  }), []);

  const typeText = useTypewriter(["Media Manager", "Content Creator", "Sports Analyst"], 70, 1000);

  useEffect(() => {
    const onScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress((window.scrollY / height) * 100);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: "-40% 0px -40% 0px" });
    Object.values(refs).forEach((r) => r.current && observer.observe(r.current));
    return () => observer.disconnect();
  }, [refs]);

  const scrollTo = (r: React.RefObject<HTMLElement>) => r.current?.scrollIntoView({ behavior: "smooth" });

  // Glassmorphism Theme Classes
  const tBg = isDark ? "bg-[#050a14] text-gray-100" : "bg-[#fafcff] text-gray-800";
  const tCard = isDark 
    ? "bg-white/[0.04] backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:bg-white/[0.07]" 
    : "bg-white/50 backdrop-blur-2xl border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] hover:bg-white/70";
  const tNav = isDark ? "bg-gray-900/60 backdrop-blur-2xl border-white/10 text-gray-300" : "bg-white/60 backdrop-blur-2xl border-white/60 text-gray-700";
  const tHead = isDark ? "text-white" : "text-gray-900";
  const tSub = isDark ? "text-gray-300" : "text-gray-700";
  const tBadge = isDark ? "bg-gray-800/80 border-gray-700 text-gray-300" : "bg-white/80 border-gray-100 text-gray-700";
  const tClient = isDark ? "bg-white/[0.02] border-white/5 backdrop-blur-md" : "bg-white/30 border-white/50 backdrop-blur-md";
  const tIconBox = isDark ? "bg-teal-500/10 text-teal-400" : "bg-teal-50 text-teal-500";

  return (
    <div className={`min-h-screen font-sans selection:bg-teal-500 selection:text-white transition-colors duration-700 ${tBg}`}>
      
      {/* Background Animated Light Orbs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.1, 1] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} className={`absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full blur-[140px] transition-colors duration-700 ${isDark ? 'bg-teal-500/15' : 'bg-teal-300/30'}`} />
        <motion.div animate={{ x: [0, -100, 0], y: [0, 100, 0], scale: [1, 1.2, 1] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} className={`absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full blur-[160px] transition-colors duration-700 ${isDark ? 'bg-pink-600/10' : 'bg-pink-300/20'}`} />
        <motion.div animate={{ x: [0, 50, 0], y: [0, 50, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} className={`absolute top-[40%] left-[20%] w-[30vw] h-[30vw] rounded-full blur-[120px] transition-colors duration-700 ${isDark ? 'bg-amber-500/10' : 'bg-amber-200/20'}`} />
      </div>

      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1.5 z-50 bg-white/10 backdrop-blur-sm">
        <div className="h-full bg-gradient-to-r from-teal-400 via-pink-400 to-amber-400 rounded-r-full shadow-[0_0_10px_rgba(45,212,191,0.5)]" style={{ width: `${progress}%` }} />
      </div>

      {/* Navbar with Theme Toggle */}
      <header className="sticky top-4 z-50 px-4">
        <div className={`max-w-4xl mx-auto flex justify-between items-center rounded-full px-4 sm:px-6 py-3 transition-colors duration-500 shadow-lg ${tNav}`}>
          <div className="flex gap-1 sm:gap-2 overflow-x-auto no-scrollbar">
            {Object.keys(refs).map((key) => (
              <button key={key} onClick={() => scrollTo(refs[key as keyof typeof refs])} className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 whitespace-nowrap ${active === key ? "bg-teal-500 text-white shadow-[0_4px_14px_rgba(20,184,166,0.4)] scale-105" : "hover:text-teal-500 hover:bg-white/10"}`}>
                {key === "projects" ? "Selected Works" : key[0].toUpperCase() + key.slice(1)}
              </button>
            ))}
          </div>
          <button onClick={() => setIsDark(!isDark)} className="ml-4 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-teal-400 transition-all shadow-inner">
            {isDark ? <FaSun className="text-amber-300" /> : <FaMoon className="text-teal-600" />}
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10 space-y-32 relative">
        
        {/* Hero Section */}
        <section id="about" ref={refs.about} className="min-h-[85vh] flex items-center justify-center pt-20 md:pt-0">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center w-full">
            <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-8">
              <motion.div animate={{ y: [-5, 5, -5] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-full shadow-[0_20px_50px_rgba(20,184,166,0.2)] overflow-hidden flex-shrink-0 border-4 border-white/20 backdrop-blur-sm p-1">
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image src="/profile.jpg" alt="Aakarsh Bommakanti" fill className="object-cover" />
                </div>
              </motion.div>

              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-200 tracking-tight pb-2">
                  Aakarsh Bommakanti
                </h1>
                <p className="text-xl sm:text-2xl font-bold h-8 mt-2 text-teal-500">
                  {typeText}
                  <span className="inline-block w-1 h-6 bg-pink-400 animate-pulse ml-1 align-middle rounded-full"></span>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center md:justify-start pt-2">
                <motion.div className="relative group w-full sm:w-auto" onClick={() => scrollTo(refs.experience)} whileTap={{ scale: 0.95 }}>
                  <button className="w-full bg-gradient-to-r from-teal-500 to-teal-400 text-white px-8 py-3.5 rounded-full shadow-[0_8px_20px_rgba(20,184,166,0.3)] font-semibold transition-all group-hover:shadow-[0_8px_25px_rgba(20,184,166,0.5)] flex items-center justify-center gap-2">Explore more ↓</button>
                </motion.div>
                <motion.div className="relative group w-full sm:w-auto" whileTap={{ scale: 0.95 }}>
                  <a href="/AakarshBommakanti-Resume.pdf" download="AakarshBommakanti-Resume.pdf" className={`w-full flex items-center justify-center gap-2 px-8 py-3.5 rounded-full shadow-lg border font-semibold transition-all group-hover:bg-teal-500 group-hover:text-white group-hover:border-teal-500 ${isDark ? 'bg-white/10 border-white/20 text-teal-400' : 'bg-white/60 border-white/60 text-teal-600'}`}>
                    <FaDownload /> Download CV
                  </a>
                </motion.div>
              </div>
            </div>

            <div className={`p-8 sm:p-10 rounded-[2rem] transition-all duration-500 relative overflow-hidden ${tCard}`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 blur-3xl rounded-full pointer-events-none"></div>
              <p className={`relative z-10 font-medium mb-6 ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>For over a decade, I&apos;ve worked at the intersection of sport, media and storytelling, helping bring fans closer to the teams, players and moments they care about.</p>
              <p className={`relative z-10 font-medium mb-6 ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>As a media manager and content creator, I&apos;ve built fan communities from the ground up, scripted a two-season documentary series for Disney+ Hotstar, and led YouTube publishing for the 2026 FIFA World Cup.</p>
              <p className={`relative z-10 font-medium mb-6 ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>I&apos;m a hands-on leader who combines tactical analysis, data and creative storytelling to make sports content that people actually want to watch, share and come back to.</p>
              <div className={`relative z-10 p-5 rounded-2xl border-l-4 border-teal-500 ${isDark ? 'bg-teal-500/10' : 'bg-teal-50'}`}>
                <p className="font-bold text-teal-400">At the heart of everything I do is a simple idea: great sports content should make fans feel closer to the game.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Impact / By The Numbers Section */}
        <section id="impact" ref={refs.impact} className="scroll-mt-24 relative z-10">
          <div className="text-center md:text-left mb-10">
            <span className="text-xs font-black text-teal-400 uppercase tracking-widest block mb-2">Quantifiable Results</span>
            <h3 className={`text-4xl font-extrabold ${tHead}`}>Track Record & Scale</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {impactData.map((clientData, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className={`flex flex-col rounded-[2rem] transition-all duration-300 overflow-hidden ${tCard}`}>
                <div className="bg-white/5 flex items-center justify-center p-8 border-b border-white/10">
                  <div className="relative w-24 h-24 bg-white/80 backdrop-blur-md rounded-2xl shadow-sm p-4 flex items-center justify-center"><Image src={clientData.logo} alt={clientData.client} fill className="object-contain p-2" /></div>
                </div>
                <div className="p-8 flex-1 flex flex-col justify-center space-y-6">
                  {clientData.stats.map((stat, sIdx) => (
                    <div key={sIdx} className="text-center">
                      <h4 className="text-3xl font-black text-teal-400 mb-1">{stat.value}</h4>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" ref={refs.experience} className="scroll-mt-24 relative z-10">
          <div className="text-center md:text-left mb-10">
            <span className="text-xs font-black text-teal-400 uppercase tracking-widest block mb-2">Career Journey</span>
            <h3 className={`text-4xl font-extrabold ${tHead}`}>Professional Experience</h3>
          </div>
          <div className="space-y-12">
            {experience.map((item, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                <div className={`rounded-[2rem] p-6 sm:p-10 flex flex-col md:flex-row gap-8 lg:gap-12 items-start group transition-all duration-500 relative overflow-hidden ${tCard}`}>
                  <div className="absolute top-0 left-0 h-full w-2 bg-gradient-to-b from-teal-400 via-pink-400 to-amber-400 opacity-80"></div>
                  
                  {/* Left Side */}
                  <div className="flex flex-col items-center md:items-start text-center md:text-left w-full md:w-1/3 flex-shrink-0 pt-2 z-10">
                    <div className="relative w-28 h-28 sm:w-36 sm:h-36 bg-white/80 backdrop-blur-md rounded-3xl shadow-lg p-5 flex items-center justify-center mb-6"><Image src={item.logo} alt={`${item.org} logo`} fill className="object-contain p-4" /></div>
                    <h4 className={`text-2xl sm:text-3xl font-extrabold leading-tight mb-2 ${tHead}`}>{item.role}</h4>
                    <p className="text-xl font-bold text-teal-400 mb-5">{item.org}</p>
                    <span className={`inline-block px-5 py-2 text-sm font-bold rounded-full tracking-wide border ${tBadge}`}>{item.period}</span>

                    {item.clients && (
                      <div className={`mt-8 w-full p-5 rounded-2xl border ${tClient}`}>
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 text-center md:text-left">Key Clients</p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4">
                          {item.clients.map((client, cIdx) => (
                            <div key={cIdx} className="relative group/client flex items-center justify-center cursor-help">
                              <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-2xl border border-white shadow-md flex items-center justify-center transition-transform hover:-translate-y-1"><Image src={client.logo} alt={client.name} fill className="object-contain p-3" /></div>
                              <div className="absolute -bottom-10 opacity-0 group-hover/client:opacity-100 transition-opacity bg-gray-900/90 text-white text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap z-20">{client.name}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Side */}
                  <div className="w-full md:w-2/3 flex flex-col justify-center h-full z-10">
                    <h5 className="text-sm font-black text-teal-500/60 uppercase tracking-widest mb-6 pb-2 border-b border-teal-500/10">Key Contributions</h5>
                    <div className="grid sm:grid-cols-2 gap-5">
                      {achievements[item.role]?.map((a, i) => (
                        <div key={i} className={`flex items-start gap-4 p-5 rounded-2xl border transition-all shadow-sm hover:shadow-md ${isDark ? 'bg-white/[0.03] border-white/5 hover:bg-white/[0.07]' : 'bg-white/60 border-white/50 hover:bg-white/90'}`}>
                          <div className={`text-2xl mt-0.5 flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl ${tIconBox}`}>{a.icon}</div>
                          <p className={`text-sm leading-relaxed font-semibold ${tSub}`}>{a.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Selected Works Gallery Section (Vertical / Portrait Aspect Ratio) */}
        <section id="projects" ref={refs.projects} className="scroll-mt-24 relative z-10">
          <div className="text-center md:text-left mb-10">
            <span className="text-xs font-black text-teal-400 uppercase tracking-widest block mb-2">Portfolio Showcase</span>
            <h3 className={`text-4xl font-extrabold ${tHead}`}>Selected Works & Highlights</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div key={index} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                <div className={`h-[480px] rounded-[2rem] overflow-hidden cursor-pointer group relative flex flex-col justify-end ${tCard}`}>
                  <div className="absolute inset-0 bg-gray-900">
                    <Image src={project.image} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  {/* Subtle gradient overlay to ensure text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-300"></div>
                  <div className="relative z-10 p-8 text-white transform transition-transform duration-300">
                    <h4 className="text-2xl font-bold mb-3">{project.title}</h4>
                    <p className="text-sm text-gray-300 leading-relaxed">{project.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section id="skills" ref={refs.skills} className="scroll-mt-24 relative z-10">
          <div className="text-center md:text-left mb-10">
            <span className="text-xs font-black text-teal-400 uppercase tracking-widest block mb-2">Expertise</span>
            <h3 className={`text-4xl font-extrabold ${tHead}`}>Core Skills</h3>
          </div>
          <div className={`flex flex-wrap gap-4 p-8 rounded-[2rem] ${tCard}`}>
            {skills.map((skill, index) => (
              <span key={index} className={`px-6 py-3 backdrop-blur-md rounded-xl shadow-sm border text-sm font-bold hover:-translate-y-1 hover:shadow-md transition-all cursor-default ${isDark ? 'bg-white/5 border-white/10 text-teal-400' : 'bg-white/80 border-white text-teal-800 hover:text-teal-600'}`}>{skill}</span>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" ref={refs.contact} className="pb-20 scroll-mt-24 relative z-10">
          <div className="bg-gradient-to-br from-teal-600 to-teal-950 rounded-[3rem] p-10 sm:p-16 text-white shadow-2xl relative overflow-hidden border border-teal-500/30">
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/10 backdrop-blur-3xl rounded-full pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-teal-400/20 backdrop-blur-3xl rounded-full pointer-events-none"></div>
            
            <div className="mb-10 relative z-10">
              <span className="text-xs font-black text-teal-300 uppercase tracking-widest block mb-2">Get In Touch</span>
              <h3 className="text-4xl font-extrabold">Let&apos;s Connect</h3>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-8 relative z-10">
              <a href="mailto:aakarshbommakanti@gmail.com" className="flex items-center gap-5 bg-white/10 hover:bg-white/20 backdrop-blur-md p-5 rounded-2xl transition-all border border-white/10 hover:border-white/30">
                <span className="w-12 h-12 flex items-center justify-center bg-white text-teal-700 rounded-xl text-2xl shadow-lg">📧</span>
                <span className="font-bold text-lg truncate">aakarshbommakanti@gmail.com</span>
              </a>
              <div className="flex items-center gap-5 bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/5">
                <span className="w-12 h-12 flex items-center justify-center bg-white text-teal-700 rounded-xl text-2xl shadow-lg">📱</span>
                <span className="font-bold text-lg">+91 81214 02101</span>
              </div>
              <a href="https://twitter.com/aakarsh_ab" target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 bg-white/10 hover:bg-white/20 backdrop-blur-md p-5 rounded-2xl transition-all border border-white/10 hover:border-white/30">
                <span className="w-12 h-12 flex items-center justify-center bg-white text-teal-700 rounded-xl text-2xl shadow-lg"><FaXTwitter /></span>
                <span className="font-bold text-lg">@aakarsh_ab</span>
              </a>
              <div className="flex items-center gap-5 bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/5">
                <span className="w-12 h-12 flex items-center justify-center bg-white text-teal-700 rounded-xl text-2xl shadow-lg">📍</span>
                <span className="font-bold text-lg">Hyderabad, India</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
