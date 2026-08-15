"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

const achievements: Record<string, { text: string; icon: React.ReactNode; clientLogo?: string }[]> = {
  "Digital Content Manager": [
    { text: "FIFA: Oversaw the best year in FIFA YouTube history, leading the publishing strategy for the 2026 FIFA World Cup and managing HBS delivery workflows.", icon: <FaVideo />, clientLogo: "/fifa.png" },
    { text: "FIFA: Managed daily global publishing operations throughout the entirety of 2026, ensuring consistent content delivery across international markets.", icon: <FaGlobe />, clientLogo: "/fifa.png" },
    { text: "FIFA: Directed thumbnail design and visual packaging for the complete 2026 FIFA World Cup content slate, maximizing click-through rates.", icon: <FaPenFancy />, clientLogo: "/fifa.png" },
    { text: "FIFA: Grew channel subscribers from 27.18 million to 35.33 million and increased watch time to 64.95 million hours within a single reporting period.", icon: <FaChartLine />, clientLogo: "/fifa.png" },
    { text: "FanCode: Managed daily social media content publishing for major sports leagues including the ISL and La Liga.", icon: <FaGlobe />, clientLogo: "/fancode.png" },
    { text: "FanCode: Formulated comprehensive weekly content plans and performance reports to drive engagement strategy.", icon: <FaChartLine />, clientLogo: "/fancode.png" },
    { text: "FanCode: Produced and edited high-performing social media content utilizing raw broadcast assets.", icon: <FaVideo />, clientLogo: "/fancode.png" },
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
  { client: "FIFA", logo: "/fifa.png", stats: [{ value: "+8M", label: "Subscribers (40 Days)" }, { value: "4.4B", label: "Total Views (40 Days)" }, { value: "61.8M", label: "Hours Watch Time (40 Days)" }] },
  { client: "FanCode", logo: "/fancode.png", stats: [{ value: "Daily", label: "Content Output" }, { value: "Live Digital", label: "Coverage of top leagues" }, { value: "Weekly", label: "Strategy Reports" }] },
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
  const [isDark, setIsDark] = useState(false);
  const [showModeModal, setShowModeModal] = useState(true);
  const [active, setActive] = useState("about");
  const [progress, setProgress] = useState(0);

  const aboutRef = useRef<HTMLElement>(null);
  const impactRef = useRef<HTMLElement>(null);
  const experienceRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const refs = useMemo(() => ({
    about: aboutRef, impact: impactRef, experience: experienceRef, highlights: projectsRef, skills: skillsRef, contact: contactRef,
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

  // Glassmorphism Theme Classes with professional gradient background
  const tBg = isDark 
    ? "bg-gradient-to-br from-[#050a14] via-[#091224] to-[#03060c] text-gray-100" 
    : "bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] text-gray-800";
    
  const tCard = isDark 
    ? "bg-white/[0.04] backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:bg-white/[0.07]" 
    : "bg-white/60 backdrop-blur-2xl border border-white/70 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] hover:bg-white/80";
    
  const tNav = isDark 
    ? "bg-gray-900/70 backdrop-blur-2xl border-white/10 text-gray-300" 
    : "bg-white/70 backdrop-blur-2xl border-white/70 text-gray-700 shadow-sm";
    
  const tHead = isDark ? "text-white" : "text-gray-900";
  const tSub = isDark ? "text-gray-300" : "text-gray-700";
  const tBadge = isDark ? "bg-gray-800/80 border-gray-700 text-gray-300" : "bg-white/80 border-gray-200 text-gray-700";
  const tClient = isDark ? "bg-white/[0.02] border-white/5 backdrop-blur-md" : "bg-white/40 border-white/60 backdrop-blur-md";
  const tIconBox = isDark ? "bg-teal-500/10 text-teal-400" : "bg-teal-50 text-teal-600";

  return (
    <div className={`min-h-screen font-sans selection:bg-teal-500 selection:text-white transition-colors duration-700 ${tBg}`}>
      
      {/* Mode Selection Pop-up on First Load */}
      <AnimatePresence>
        {showModeModal && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} 
              animate={{ scale: 1, y: 0 }} 
              exit={{ scale: 0.9, y: 20 }}
              className={`max-w-md w-full p-8 rounded-[2.5rem] shadow-2xl border text-center ${isDark ? 'bg-gray-900 border-white/10 text-white' : 'bg-white border-gray-100 text-gray-900'}`}
            >
              <h3 className="text-2xl font-black mb-3">Welcome to My Portfolio</h3>
              <p className="text-sm opacity-70 mb-8">Please choose your preferred viewing mode to get started.</p>
              
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => { setIsDark(false); setShowModeModal(false); }}
                  className="flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-gray-200 hover:border-teal-500 hover:bg-teal-50/5 transition-all group shadow-sm"
                >
                  <FaSun className="text-3xl text-amber-500 mb-3 group-hover:scale-110 transition-transform" />
                  <span className="font-bold text-sm">Light Mode</span>
                </button>

                <button 
                  onClick={() => { setIsDark(true); setShowModeModal(false); }}
                  className="flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-gray-800 hover:border-teal-400 hover:bg-white/5 transition-all group shadow-sm bg-gray-950 text-white"
                >
                  <FaMoon className="text-3xl text-teal-400 mb-3 group-hover:scale-110 transition-transform" />
                  <span className="font-bold text-sm">Dark Mode</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Animated Light Orbs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.1, 1] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} className={`absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full blur-[140px] transition-colors duration-700 ${isDark ? 'bg-teal-500/15' : 'bg-teal-400/10'}`} />
        <motion.div animate={{ x: [0, -100, 0], y: [0, 100, 0], scale: [1, 1.2, 1] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} className={`absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full blur-[160px] transition-colors duration-700 ${isDark ? 'bg-pink-600/10' : 'bg-blue-400/10'}`} />
      </div>

      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1.5 z-50 bg-white/15 backdrop-blur-sm">
        <div className="h-full bg-gradient-to-r from-teal-400 via-pink-400 to-amber-400 rounded-r-full shadow-[0_0_10px_rgba(45,212,191,0.5)]" style={{ width: `${progress}%` }} />
      </div>

      {/* Navbar with Theme Toggle */}
      <header className="sticky top-4 z-40 px-2 sm:px-4">
        <div className={`max-w-5xl mx-auto flex flex-wrap justify-between items-center rounded-2xl sm:rounded-full px-4 py-3 gap-3 transition-colors duration-500 shadow-lg ${tNav}`}>
          <div className="flex flex-wrap justify-center items-center gap-1.5 sm:gap-4 w-full sm:w-auto flex-1">
            {Object.keys(refs).map((key) => (
              <button key={key} onClick={() => scrollTo(refs[key as keyof typeof refs])} className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${active === key ? "bg-teal-500 text-white shadow-[0_4px_14px_rgba(20,184,166,0.4)] scale-105" : "hover:text-teal-500 hover:bg-white/10"}`}>
                {key === "highlights" ? "Highlights" : key[0].toUpperCase() + key.slice(1)}
              </button>
            ))}
          </div>
          <button onClick={() => setIsDark(!isDark)} className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-teal-400 transition-all shadow-inner flex-shrink-0 mx-auto sm:mx-0">
            {isDark ? <FaSun className="text-amber-300" /> : <FaMoon className="text-teal-600" />}
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10 space-y-20 sm:space-y-32 relative">
        
        {/* Hero Section */}
        <section id="about" ref={refs.about} className="min-h-[85vh] flex items-center justify-center pt-10 md:pt-0">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center w-full">
            <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6 sm:space-y-8">
              <motion.div animate={{ y: [-5, 5, -5] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="relative w-48 h-48 sm:w-72 sm:h-72 rounded-full shadow-[0_20px_50px_rgba(20,184,166,0.2)] overflow-hidden flex-shrink-0 border-4 border-white/20 backdrop-blur-sm p-1">
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image src="/profile.jpg" alt="Aakarsh Bommakanti" fill className="object-cover" />
                </div>
              </motion.div>

              <div>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-teal-700 tracking-tight pb-2">
                  Aakarsh Bommakanti
                </h1>
                <p className="text-lg sm:text-2xl font-bold h-8 mt-2" style={{ color: isDark ? '#ffffff' : '#000000' }}>
                  {typeText}
                  <span className="inline-block w-1 h-5 sm:h-6 bg-pink-400 animate-pulse ml-1 align-middle rounded-full"></span>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center md:justify-start pt-2">
                <motion.div className="relative group w-full sm:w-auto" onClick={() => scrollTo(refs.experience)} whileTap={{ scale: 0.95 }}>
                  <button className="w-full bg-gradient-to-r from-teal-500 to-teal-400 text-white px-8 py-3.5 rounded-full shadow-[0_8px_20px_rgba(20,184,166,0.3)] font-semibold transition-all group-hover:shadow-[0_8px_25px_rgba(20,184,166,0.5)] flex items-center justify-center gap-2">Explore more ↓</button>
                </motion.div>
                <motion.div className="relative group w-full sm:w-auto" whileTap={{ scale: 0.95 }}>
                  <a href="/AakarshBommakanti-Resume.pdf" download="AakarshBommakanti-Resume.pdf" className={`w-full flex items-center justify-center gap-2 px-8 py-3.5 rounded-full shadow-lg border font-semibold transition-all group-hover:bg-teal-500 group-hover:text-white group-hover:border-teal-500 ${isDark ? 'bg-white/10 border-white/20 text-teal-400' : 'bg-white/80 border-white/80 text-teal-700'}`}>
                    <FaDownload /> Download CV
                  </a>
                </motion.div>
              </div>
            </div>

            <div className={`p-6 sm:p-10 rounded-[2rem] transition-all duration-500 relative overflow-hidden ${tCard}`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 blur-3xl rounded-full pointer-events-none"></div>
              <p className={`relative z-10 text-sm sm:text-base font-medium mb-5 sm:mb-6 ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>For over a decade, I&apos;ve worked at the intersection of sport, media and storytelling, helping bring fans closer to the teams, players and moments they care about.</p>
              <p className={`relative z-10 text-sm sm:text-base font-medium mb-5 sm:mb-6 ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>As a media manager and content creator, I&apos;ve built fan communities from the ground up, scripted a two-season documentary series for Disney+ Hotstar, and led YouTube publishing for the 2026 FIFA World Cup.</p>
              <p className={`relative z-10 text-sm sm:text-base font-medium mb-5 sm:mb-6 ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>I&apos;m a hands-on leader who combines tactical analysis, data and creative storytelling to make sports content that people actually want to watch, share and come back to.</p>
              <div className={`relative z-10 p-4 sm:p-5 rounded-2xl border-l-4 border-teal-500 ${isDark ? 'bg-teal-500/10' : 'bg-teal-100/50'}`}>
                <p className={`text-sm sm:text-base font-bold ${isDark ? 'text-teal-400' : 'text-teal-800'}`}>At the heart of everything I do is a simple idea: great sports content should make fans feel closer to the game.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Numbers Section */}
        <section id="impact" ref={refs.impact} className="scroll-mt-24 relative z-10">
          <div className="text-center md:text-left mb-8 sm:mb-10">
            <span className="text-xs font-black text-teal-500 uppercase tracking-widest block mb-2">Quantifiable Results</span>
            <h3 className={`text-3xl sm:text-4xl font-extrabold ${tHead}`}>Key Numbers</h3>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {impactData.map((clientData, idx) => (
              <motion.div 
                key={idx} 
                onClick={() => scrollTo(refs.experience)}
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: idx * 0.1 }} 
                className={`flex flex-col rounded-[2rem] transition-all duration-300 overflow-hidden cursor-pointer hover:scale-[1.02] ${tCard}`}
              >
                <div className="bg-white/5 flex items-center justify-center p-6 sm:p-8 border-b border-white/10">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-white/80 backdrop-blur-md rounded-2xl shadow-sm p-4 flex items-center justify-center"><Image src={clientData.logo} alt={clientData.client} fill className="object-contain p-2" /></div>
                </div>
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-center space-y-5 sm:space-y-6">
                  {clientData.stats.map((stat, sIdx) => (
                    <div key={sIdx} className="text-center">
                      <h4 className="text-2xl sm:text-3xl font-black text-teal-500 mb-1">{stat.value}</h4>
                      <p className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" ref={refs.experience} className="scroll-mt-24 relative z-10">
          <div className="text-center md:text-left mb-8 sm:mb-10">
            <span className="text-xs font-black text-teal-500 uppercase tracking-widest block mb-2">Career Journey</span>
            <h3 className={`text-3xl sm:text-4xl font-extrabold ${tHead}`}>Professional Experience</h3>
          </div>
          <div className="space-y-8 sm:space-y-12">
            {experience.map((item, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                <div className={`rounded-[2rem] p-6 sm:p-10 flex flex-col md:flex-row gap-8 lg:gap-12 items-start group transition-all duration-500 relative overflow-hidden ${tCard}`}>
                  <div className="absolute top-0 left-0 h-full w-2 bg-gradient-to-b from-teal-400 via-pink-400 to-amber-400 opacity-80"></div>
                  
                  {/* Left Side */}
                  <div className="flex flex-col items-center md:items-start text-center md:text-left w-full md:w-1/3 flex-shrink-0 pt-2 z-10">
                    <div className="relative w-24 h-24 sm:w-36 sm:h-36 bg-white/80 backdrop-blur-md rounded-3xl shadow-lg p-5 flex items-center justify-center mb-5 sm:mb-6"><Image src={item.logo} alt={`${item.org} logo`} fill className="object-contain p-4" /></div>
                    <h4 className={`text-xl sm:text-3xl font-extrabold leading-tight mb-2 ${tHead}`}>{item.role}</h4>
                    <p className="text-lg sm:text-xl font-bold text-teal-500 mb-4 sm:mb-5">{item.org}</p>
                    <span className={`inline-block px-4 py-1.5 sm:px-5 sm:py-2 text-xs sm:text-sm font-bold rounded-full tracking-wide border ${tBadge}`}>{item.period}</span>

                    {item.clients && (
                      <div className={`mt-6 sm:mt-8 w-full p-4 sm:p-5 rounded-2xl border ${tClient}`}>
                        <p className={`text-xs font-black uppercase tracking-widest mb-3 sm:mb-4 text-center md:text-left ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Key Clients</p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-3 sm:gap-4">
                          {item.clients.map((client, cIdx) => (
                            <div key={cIdx} className="relative group/client flex items-center justify-center cursor-help">
                              <div className="relative w-14 h-14 sm:w-20 sm:h-20 bg-white rounded-2xl border border-white shadow-md flex items-center justify-center transition-transform hover:-translate-y-1"><Image src={client.logo} alt={client.name} fill className="object-contain p-2 sm:p-3" /></div>
                              <div className="absolute -bottom-10 opacity-0 group-hover/client:opacity-100 transition-opacity bg-gray-900/90 text-white text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap z-20">{client.name}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Side */}
                  <div className="w-full md:w-2/3 flex flex-col justify-center h-full z-10">
                    <h5 className="text-xs sm:text-sm font-black text-teal-600/70 uppercase tracking-widest mb-4 sm:mb-6 pb-2 border-b border-teal-500/10">Key Contributions</h5>
                    <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                      {achievements[item.role]?.map((a, i) => (
                        <div key={i} className={`flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl border transition-all shadow-sm hover:shadow-md ${isDark ? 'bg-white/[0.03] border-white/5 hover:bg-white/[0.07]' : 'bg-white/70 border-white/60 hover:bg-white/90'}`}>
                          {a.clientLogo ? (
                            <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 bg-white rounded-xl shadow-sm p-1.5 flex items-center justify-center">
                              <Image src={a.clientLogo} alt="client logo" fill className="object-contain p-1" />
                            </div>
                          ) : (
                            <div className={`text-xl sm:text-2xl mt-0.5 flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl ${tIconBox}`}>{a.icon}</div>
                          )}
                          <p className={`text-xs sm:text-sm leading-relaxed font-semibold ${tSub}`}>{a.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Highlights Gallery Section (Clean images without text blocks) */}
        <section id="highlights" ref={refs.highlights} className="scroll-mt-24 relative z-10">
          <div className="text-center md:text-left mb-8 sm:mb-10">
            <span className="text-xs font-black text-teal-500 uppercase tracking-widest block mb-2">Portfolio Showcase</span>
            <h3 className={`text-3xl sm:text-4xl font-extrabold ${tHead}`}>Highlights</h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {projects.map((project, index) => (
              <motion.div key={index} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                <div className={`h-[420px] sm:h-[480px] rounded-[2rem] overflow-hidden group relative flex flex-col justify-end ${tCard}`}>
                  <div className="absolute inset-0 bg-gray-900">
                    <Image src={project.image} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section id="skills" ref={refs.skills} className="scroll-mt-24 relative z-10">
          <div className="text-center md:text-left mb-8 sm:mb-10">
            <span className="text-xs font-black text-teal-500 uppercase tracking-widest block mb-2">Expertise</span>
            <h3 className={`text-3xl sm:text-4xl font-extrabold ${tHead}`}>Core Skills</h3>
          </div>
          <div className={`flex flex-wrap gap-2.5 sm:gap-4 p-6 sm:p-8 rounded-[2rem] ${tCard}`}>
            {skills.map((skill, index) => (
              <span key={index} className={`px-4 py-2 sm:px-6 sm:py-3 backdrop-blur-md rounded-xl shadow-sm border text-xs sm:text-sm font-bold hover:-translate-y-1 hover:shadow-md transition-all cursor-default ${isDark ? 'bg-white/5 border-white/10 text-teal-400' : 'bg-white/80 border-white text-teal-800 hover:text-teal-600'}`}>{skill}</span>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" ref={refs.contact} className="pb-20 scroll-mt-24 relative z-10">
          <div className="bg-gradient-to-br from-teal-600 to-teal-950 rounded-[2.5rem] sm:rounded-[3rem] p-8 sm:p-16 text-white shadow-2xl relative overflow-hidden border border-teal-500/30">
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/10 backdrop-blur-3xl rounded-full pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-teal-400/20 backdrop-blur-3xl rounded-full pointer-events-none"></div>
            
            <div className="mb-8 sm:mb-10 relative z-10">
              <span className="text-xs font-black text-teal-300 uppercase tracking-widest block mb-2">Get In Touch</span>
              <h3 className="text-3xl sm:text-4xl font-extrabold">Let&apos;s Connect</h3>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-8 relative z-10">
              <a href="mailto:aakarshbommakanti@gmail.com" className="flex items-center gap-4 sm:gap-5 bg-white/10 hover:bg-white/20 backdrop-blur-md p-4 sm:p-5 rounded-2xl transition-all border border-white/10 hover:border-white/30">
                <span className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white text-teal-700 rounded-xl text-xl sm:text-2xl shadow-lg flex-shrink-0">📧</span>
                <span className="font-bold text-sm sm:text-lg truncate">aakarshbommakanti@gmail.com</span>
              </a>
              <div className="flex items-center gap-4 sm:gap-5 bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/5">
                <span className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white text-teal-700 rounded-xl text-xl sm:text-2xl shadow-lg flex-shrink-0">📱</span>
                <span className="font-bold text-sm sm:text-lg">+91 81214 02101</span>
              </div>
              <a href="https://twitter.com/aakarsh_ab" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 sm:gap-5 bg-white/10 hover:bg-white/20 backdrop-blur-md p-4 sm:p-5 rounded-2xl transition-all border border-white/10 hover:border-white/30">
                <span className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white text-teal-700 rounded-xl text-xl sm:text-2xl shadow-lg flex-shrink-0"><FaXTwitter /></span>
                <span className="font-bold text-sm sm:text-lg">@aakarsh_ab</span>
              </a>
              <div className="flex items-center gap-4 sm:gap-5 bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/5">
                <span className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white text-teal-700 rounded-xl text-xl sm:text-2xl shadow-lg flex-shrink-0">📍</span>
                <span className="font-bold text-lg">Hyderabad, India</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
