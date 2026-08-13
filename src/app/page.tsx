"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { FaVideo, FaChartLine, FaPenFancy, FaGlobe, FaXTwitter, FaDownload } from "react-icons/fa6";
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
    { text: "FIFA: Led YouTube publishing strategy for the 2026 FIFA World Cup as part of Global Publishing, managing HBS delivery workflows and international media assets.", icon: <FaVideo /> },
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
    { text: "Authored 20,000+ football articles across global platforms.", icon: <FaPenFancy /> },
    { text: "Only Indian columnist at RousingTheKop (Liverpool FC fan site).", icon: <FaGlobe /> },
    { text: "Built a readership of 500,000+ with in-depth football analysis.", icon: <FaChartLine /> },
  ],
};

const impactData = [
  {
    client: "FIFA",
    logo: "/fifa.png",
    stats: [
      { value: "35.3M", label: "Subscribers" },
      { value: "127M+", label: "Total Views" },
      { value: "64.9M", label: "Hours Watched" }
    ]
  },
  {
    client: "FanCode",
    logo: "/fancode.png",
    stats: [
      { value: "Daily", label: "Content Output" },
      { value: "Multi", label: "League Ops (ISL, La Liga)" },
      { value: "Weekly", label: "Strategy Reports" }
    ]
  },
  {
    client: "Hyderabad FC",
    logo: "/hfc.png",
    stats: [
      { value: "+35%", label: "YoY Engagement" },
      { value: "2", label: "Docuseries Seasons" },
      { value: "Tier 1", label: "Brand Collabs" }
    ]
  }
];

const projects = [
  { 
    title: "Future Is Us | Disney+ Hotstar", 
    description: "Produced and scripted a highly-acclaimed two-season sports documentary series following the journey of Hyderabad FC.", 
    image: "/future-is-us.jpg" 
  },
  { 
    title: "FIFA World Cup 2026 Growth", 
    description: "Led the YouTube publishing strategy resulting in a channel milestone of 35.33M subscribers and over 64M hours of watch time.", 
    image: "/fifa-graph.jpg" 
  },
  { 
    title: "ISL 'Circle of Parity'", 
    description: "Developed a creative visual content piece for the Indian Super League highlighting league unpredictability.", 
    image: "/isl-parity.jpg" 
  },
  { 
    title: "2026 Masters Tournament", 
    description: "Coordinated promotional graphics and tune-in visual packaging for FanCode's coverage of the legendary golf major.", 
    image: "/masters-golf.jpg" 
  },
  { 
    title: "Corporate Cricket Champions", 
    description: "Managed digital launch materials, creating website copy, social media posts, and marketing fliers.", 
    image: "/ccc-launch.jpg" 
  },
  { 
    title: "Odisha T20 League Strategy", 
    description: "Compiled a 12-day operational framework outlining digital distribution logistics on FanCode and FMCG brand parameters.", 
    image: "/odisha-t20.jpg" 
  },
];

const skills = [
  "Content Strategy",
  "Video Production",
  "Sports Analytics",
  "Editorial Leadership",
  "Social Media Growth",
  "Storytelling",
  "Digital Marketing",
  "SEO & SEM",
  "Data Visualization",
  "Brand Management",
  "Media Relations",
  "Public Speaking",
];

// ---------- Typewriter ----------
function useTypewriter(words: string[], speed = 80, pause = 1200) {
  const [i, setI] = useState(0);
  const [sub, setSub] = useState(0);
  const [del, setDel] = useState(false);
  const [txt, setTxt] = useState("");

  useEffect(() => {
    const word = words[i % words.length];
    let t = setTimeout(() => {
      if (!del && sub < word.length) {
        setTxt(word.substring(0, sub + 1));
        setSub((s) => s + 1);
      } else if (del && sub > 0) {
        setTxt(word.substring(0, sub - 1));
        setSub((s) => s - 1);
      } else if (!del && sub === word.length) {
        setDel(true);
        clearTimeout(t);
        t = setTimeout(() => setDel(true), pause);
      } else if (del && sub === 0) {
        setDel(false);
        setI((x) => x + 1);
      }
    }, del ? speed / 2 : speed);
    return () => clearTimeout(t);
  }, [sub, i, del, words, speed, pause]);

  return txt;
}

// ---------- Dynamic Glass Background ----------
function GlassBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#fafcff]">
      <motion.div 
        animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-teal-300/30 rounded-full blur-[120px]"
      />
      <motion.div 
        animate={{ x: [0, -100, 0], y: [0, 100, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-pink-300/20 rounded-full blur-[150px]"
      />
      <motion.div 
        animate={{ x: [0, 50, 0], y: [0, 50, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[40%] left-[20%] w-[30vw] h-[30vw] bg-amber-200/20 rounded-full blur-[100px]"
      />
    </div>
  );
}

// ---------- Main ----------
export default function Page() {
  const [active, setActive] = useState("about");

  const aboutRef = useRef<HTMLElement>(null);
  const impactRef = useRef<HTMLElement>(null);
  const experienceRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const refs = useMemo(() => ({
    about: aboutRef,
    impact: impactRef,
    experience: experienceRef,
    projects: projectsRef,
    skills: skillsRef,
    contact: contactRef,
  }), []);

  const [progress, setProgress] = useState(0);
  const typeText = useTypewriter(
    ["Media Manager", "Content Creator", "Sports Analyst"],
    70,
    1000
  );

  useEffect(() => {
    const onScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress((window.scrollY / height) * 100);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );
    Object.values(refs).forEach((r) => r.current && observer.observe(r.current));
    return () => observer.disconnect();
  }, [refs]);

  const scrollTo = (r: React.RefObject<HTMLElement>) =>
    r.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen text-gray-800 font-sans selection:bg-teal-500 selection:text-white">
      <GlassBackground />

      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1.5 z-50 bg-white/20 backdrop-blur-sm">
        <div
          className="h-full bg-gradient-to-r from-teal-400 via-pink-400 to-amber-400 rounded-r-full shadow-[0_0_10px_rgba(45,212,191,0.5)]"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Navbar (Glass) */}
      <header className="sticky top-4 z-50 px-4">
        <div className="max-w-4xl mx-auto flex justify-center gap-1 sm:gap-2 rounded-full bg-white/50 backdrop-blur-xl px-2 sm:px-6 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.04)] border border-white/60 overflow-x-auto no-scrollbar">
          {Object.keys(refs).map((key) => (
            <button
              key={key}
              onClick={() => scrollTo(refs[key as keyof typeof refs])}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                active === key
                  ? "bg-teal-500 text-white shadow-[0_4px_14px_rgba(20,184,166,0.4)] scale-105"
                  : "text-gray-600 hover:bg-white/80 hover:text-teal-700 hover:shadow-sm"
              }`}
            >
              {key[0].toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10 space-y-32 relative">
        {/* Hero Section */}
        <section id="about" ref={refs.about} className="min-h-[85vh] flex items-center justify-center pt-20 md:pt-0">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center w-full">
            <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-8">
              <motion.div 
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-full shadow-[0_20px_50px_rgba(20,184,166,0.2)] overflow-hidden flex-shrink-0 border-4 border-white/80 backdrop-blur-sm p-1"
              >
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image src="/profile.jpg" alt="Aakarsh Bommakanti" fill className="object-cover" />
                </div>
              </motion.div>

              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-700 to-teal-400 tracking-tight pb-2">
                  Aakarsh Bommakanti
                </h1>
                <p className="text-xl sm:text-2xl font-bold text-gray-600 h-8 mt-2">
                  {typeText}
                  <span className="inline-block w-1 h-6 bg-pink-400 animate-pulse ml-1 align-middle rounded-full"></span>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center md:justify-start pt-2">
                <motion.div className="relative group w-full sm:w-auto" onClick={() => scrollTo(refs.experience)} whileTap={{ scale: 0.95 }}>
                  <button className="w-full bg-gradient-to-r from-teal-500 to-teal-400 text-white px-8 py-3.5 rounded-full shadow-[0_8px_20px_rgba(20,184,166,0.3)] font-semibold transition-all group-hover:shadow-[0_8px_25px_rgba(20,184,166,0.5)] flex items-center justify-center gap-2">
                    Explore more ↓
                  </button>
                </motion.div>
                <motion.div className="relative group w-full sm:w-auto" whileTap={{ scale: 0.95 }}>
                  <a href="/AakarshBommakanti-Resume.pdf" download="AakarshBommakanti-Resume.pdf" className="w-full flex items-center justify-center gap-2 bg-white/60 backdrop-blur-md text-teal-600 px-8 py-3.5 rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.04)] border border-white/60 font-semibold transition-all group-hover:bg-white group-hover:text-teal-500">
                    <FaDownload />
                    Download CV
                  </a>
                </motion.div>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-lg leading-relaxed text-gray-800 space-y-6 text-left bg-white/40 backdrop-blur-2xl p-8 sm:p-10 rounded-[2rem] shadow-[0_8px_32px_rgba(0,0,0,0.06)] border border-white/60 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/40 blur-2xl rounded-full"></div>
              <p className="relative z-10 font-medium">For over a decade, I&apos;ve worked at the intersection of sport, media and storytelling, helping bring fans closer to the teams, players and moments they care about.</p>
              <p className="relative z-10 font-medium">As a media manager and content creator, I&apos;ve built fan communities from the ground up, scripted a two-season documentary series for Disney+ Hotstar, and led YouTube publishing for the 2026 FIFA World Cup as part of FIFA Global Publishing.</p>
              <p className="relative z-10 font-medium">I&apos;m a hands-on leader who combines tactical analysis, data and creative storytelling to make sports content that people actually want to watch, share and come back to. Along the way, that approach has helped drive significant growth in social engagement and website traffic.</p>
              <div className="relative z-10 p-5 bg-gradient-to-r from-teal-500/10 to-transparent rounded-2xl border-l-4 border-teal-500">
                <p className="font-bold text-teal-800">At the heart of everything I do is a simple idea: great sports content should make fans feel closer to the game.</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Impact / By The Numbers Section (Client Specific) */}
        <section id="impact" ref={refs.impact} className="scroll-mt-24 relative z-10">
          <h3 className="text-4xl font-extrabold mb-12 text-center md:text-left text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600">Client Impact</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {impactData.map((clientData, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col bg-white/50 hover:bg-white/70 backdrop-blur-xl rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_40px_rgba(20,184,166,0.1)] border border-white/60 transition-all duration-300 overflow-hidden"
              >
                {/* Top Section with Logo */}
                <div className="bg-white/40 flex items-center justify-center p-8 border-b border-white/50">
                  <div className="relative w-24 h-24 bg-white rounded-2xl shadow-sm p-4 flex items-center justify-center">
                    <Image src={clientData.logo} alt={clientData.client} fill className="object-contain p-2" />
                  </div>
                </div>
                
                {/* Bottom Section with Stats */}
                <div className="p-8 flex-1 flex flex-col justify-center space-y-6">
                  {clientData.stats.map((stat, sIdx) => (
                    <div key={sIdx} className="text-center">
                      <h4 className="text-3xl font-black text-teal-600 mb-1">{stat.value}</h4>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Experience & Achievements Section */}
        <section id="experience" ref={refs.experience} className="scroll-mt-24 relative z-10">
          <h3 className="text-4xl font-extrabold mb-12 text-center md:text-left text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600">Experience</h3>
          <div className="space-y-12">
            {experience.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative p-6 sm:p-10 bg-white/50 backdrop-blur-xl rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-white/60 flex flex-col md:flex-row gap-8 lg:gap-12 items-start overflow-hidden group hover:shadow-[0_20px_40px_rgba(20,184,166,0.15)] hover:-translate-y-2 transition-all duration-500"
              >
                <div className="absolute top-0 left-0 h-full w-2 bg-gradient-to-b from-teal-400 via-pink-400 to-amber-400 opacity-80"></div>
                
                {/* Left Side */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left w-full md:w-1/3 flex-shrink-0 pt-2 z-10">
                  <div className="relative w-28 h-28 sm:w-36 sm:h-36 bg-white/80 backdrop-blur-md rounded-3xl border border-white shadow-lg p-5 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-500">
                    <Image src={item.logo} alt={`${item.org} logo`} fill className="object-contain p-4" />
                  </div>
                  <h4 className="text-3xl font-extrabold text-gray-900 leading-tight mb-2">{item.role}</h4>
                  <p className="text-xl font-bold text-teal-600 mb-5">{item.org}</p>
                  <span className="inline-block px-5 py-2 bg-white/80 text-gray-700 text-sm font-bold rounded-full tracking-wide shadow-sm border border-gray-100">{item.period}</span>

                  {item.clients && (
                    <div className="mt-8 w-full bg-white/30 p-5 rounded-2xl border border-white/50">
                      <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-4 text-center md:text-left">Key Clients Managed</p>
                      <div className="flex flex-wrap justify-center md:justify-start gap-4">
                        {item.clients.map((client, cIdx) => (
                          <div key={cIdx} className="relative group/client flex items-center justify-center cursor-help">
                            <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-2xl border border-white shadow-md flex items-center justify-center transition-transform hover:-translate-y-1 hover:shadow-lg">
                              <Image src={client.logo} alt={client.name} fill className="object-contain p-3" />
                            </div>
                            <div className="absolute -bottom-10 opacity-0 group-hover/client:opacity-100 transition-opacity bg-gray-900/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap z-20 pointer-events-none shadow-xl">
                              {client.name}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Side */}
                <div className="w-full md:w-2/3 flex flex-col justify-center h-full z-10">
                  <h5 className="text-sm font-black text-teal-700/50 uppercase tracking-widest mb-6 pb-2 border-b border-teal-500/10">Key Contributions</h5>
                  <div className="grid sm:grid-cols-2 gap-5">
                    {achievements[item.role]?.map((a, i) => (
                      <div key={i} className="flex items-start gap-4 p-5 bg-white/60 hover:bg-white/90 backdrop-blur-sm rounded-2xl transition-all duration-300 border border-white/50 shadow-sm hover:shadow-md">
                        <div className="text-teal-500 text-2xl mt-0.5 flex-shrink-0 bg-teal-50 w-10 h-10 flex items-center justify-center rounded-xl">{a.icon}</div>
                        <p className="text-sm text-gray-700 leading-relaxed font-semibold">{a.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Selected Works Gallery Section */}
        <section id="projects" ref={refs.projects} className="scroll-mt-24 relative z-10">
          <h3 className="text-4xl font-extrabold mb-12 text-center md:text-left text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600">Selected Works</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative h-[350px] bg-white/50 backdrop-blur-xl rounded-[2rem] shadow-lg border border-white/60 overflow-hidden cursor-pointer"
              >
                {/* Fallback color block if image is missing */}
                <div className="absolute inset-0 bg-gray-200">
                  <Image src={project.image} alt={project.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                {/* Overlay that fades in on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 w-full p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h4 className="text-xl font-bold mb-2">{project.title}</h4>
                  <p className="text-sm text-gray-200 line-clamp-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">{project.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section id="skills" ref={refs.skills} className="scroll-mt-24 relative z-10">
          <h3 className="text-4xl font-extrabold mb-10 text-gray-900">Core Skills</h3>
          <div className="flex flex-wrap gap-4 p-8 bg-white/40 backdrop-blur-xl rounded-[2rem] border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            {skills.map((skill, index) => (
              <span key={index} className="px-6 py-3 bg-white/80 backdrop-blur-md rounded-xl shadow-sm border border-white text-sm font-bold text-teal-800 hover:-translate-y-1 hover:shadow-md hover:text-teal-600 transition-all cursor-default">
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" ref={refs.contact} className="pb-20 scroll-mt-24 relative z-10">
          <div className="bg-gradient-to-br from-teal-600 to-teal-800 rounded-[3rem] p-10 sm:p-16 text-white shadow-2xl relative overflow-hidden border border-teal-500/30">
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/10 backdrop-blur-3xl rounded-full"></div>
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-teal-400/20 backdrop-blur-3xl rounded-full"></div>
            
            <h3 className="text-4xl font-extrabold mb-10 relative z-10">Let&apos;s Connect</h3>
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
                <span className="w-12 h-12 flex items-center justify-center bg-white text-teal-700 rounded-xl text-2xl shadow-lg">
                  <FaXTwitter />
                </span>
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
