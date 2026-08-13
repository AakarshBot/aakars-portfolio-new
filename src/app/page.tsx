"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { FaVideo, FaChartLine, FaPenFancy, FaGlobe, FaXTwitter, FaDownload } from "react-icons/fa6";
import Image from "next/image";

// ---------- Data ----------
const experience = [
  { role: "Head Of YouTube Publishing", org: "FIFA", period: "2025–2026", logo: "/fifa.png" },
  { role: "Media Manager", org: "Hyderabad FC", period: "2020–2025", logo: "/hfc.png" },
  { role: "Content Analyst", org: "Microsoft (Bing Sports)", period: "2018–2020", logo: "/microsoft.png" },
  { role: "Editor", org: "The 4th Official", period: "2016–2018", logo: "/4th-official.png" },
  { role: "Freelance Writer", org: "Multiple Outlets", period: "2014–2020", logo: "/freelance.png" },
];

const achievements: Record<string, { text: string; icon: React.ReactNode }[]> = {
  "Head Of YouTube Publishing": [
    { text: "Led YouTube publishing strategy for the 2026 FIFA World Cup as part of Global Publishing, managing HBS delivery workflows and international media assets.", icon: <FaVideo /> },
    { text: "Grew channel views from 66.18 million to 127.33 million and increased watch time to 4.95 million hours within a single reporting period.", icon: <FaChartLine /> },
    { text: "Executed comprehensive metadata optimization and A/B testing projects for archival football videos.", icon: <FaGlobe /> },
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

// ---------- Background ----------
function BackgroundTexture() {
  return (
    <div
      className="fixed inset-0 -z-10 bg-[#fafafa]"
      style={{
        backgroundImage:
          "radial-gradient(#ddd 1px, transparent 1px), radial-gradient(#ddd 1px, transparent 1px)",
        backgroundSize: "20px 20px",
        backgroundPosition: "0 0,10px 10px",
      }}
    />
  );
}

// ---------- Main ----------
export default function Page() {
  const [active, setActive] = useState("about");

  const aboutRef = useRef<HTMLElement>(null);
  const experienceRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const refs = useMemo(() => ({
    about: aboutRef,
    experience: experienceRef,
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
    <div className="min-h-screen text-gray-800 font-sans">
      <BackgroundTexture />

      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50">
        <div
          className="h-1 bg-gradient-to-r from-teal-400 via-pink-400 to-amber-400"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Navbar */}
      <header className="sticky top-3 z-50 px-4">
        <div className="max-w-4xl mx-auto flex justify-center gap-4 rounded-full bg-white/90 backdrop-blur-md px-6 py-3 shadow border border-gray-100">
          {Object.keys(refs).map((key) => (
            <button
              key={key}
              onClick={() => scrollTo(refs[key as keyof typeof refs])}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                active === key
                  ? "bg-teal-500 text-white shadow-md scale-105"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              {key[0].toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10 space-y-32 relative">
        {/* Hero Section (2-Column Layout) */}
        <section
          id="about"
          ref={refs.about}
          className="min-h-[85vh] flex items-center justify-center pt-20 md:pt-0"
        >
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center w-full">
            {/* Left Column: Profile & Title */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6">
              <div className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-full shadow-2xl overflow-hidden flex-shrink-0 border-4 border-white">
                <Image src="/profile.jpg" alt="Aakarsh Bommakanti" fill className="object-cover" />
              </div>

              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-teal-600 tracking-tight">
                  Aakarsh Bommakanti
                </h1>
                <p className="text-xl sm:text-2xl font-semibold text-gray-700 h-8 mt-3">
                  {typeText}
                  <span className="inline-block w-1 h-6 bg-teal-500 animate-pulse ml-1 align-middle"></span>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center md:justify-start pt-4">
                <motion.div
                  className="relative group w-full sm:w-auto"
                  onClick={() => scrollTo(refs.experience)}
                  whileTap={{ scale: 0.95 }}
                >
                  <button className="w-full bg-teal-500 text-white px-8 py-3.5 rounded-full shadow-lg font-medium transition-colors group-hover:bg-white group-hover:text-teal-500 flex items-center justify-center gap-2">
                    Explore more ↓
                  </button>
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-teal-500 z-[-1]"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  />
                </motion.div>
                
                <motion.div
                  className="relative group w-full sm:w-auto"
                  whileTap={{ scale: 0.95 }}
                >
                  <a href="/AakarshBommakanti-Resume.pdf" download="AakarshBommakanti-Resume.pdf" className="w-full flex items-center justify-center gap-2 bg-white text-teal-500 px-8 py-3.5 rounded-full shadow-lg border-2 border-teal-500 font-medium transition-colors group-hover:bg-teal-500 group-hover:text-white">
                    <FaDownload />
                    Download CV
                  </a>
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-teal-500 z-[-1]"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  />
                </motion.div>
              </div>
            </div>

            {/* Right Column: Bio Details */}
            <div className="text-base sm:text-lg leading-relaxed text-gray-700 space-y-5 text-left bg-white/50 backdrop-blur-sm p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100">
              <p>
                For over a decade, I&apos;ve worked at the intersection of sport, media and storytelling, helping bring fans closer to the teams, players and moments they care about.
              </p>
              <p>
                As a media manager and content creator, I&apos;ve built fan communities from the ground up, scripted a two-season documentary series for Disney+ Hotstar, and led YouTube publishing for the 2026 FIFA World Cup as part of FIFA Global Publishing.
              </p>
              <p>
                I&apos;m a hands-on leader who combines tactical analysis, data and creative storytelling to make sports content that people actually want to watch, share and come back to. Along the way, that approach has helped drive significant growth in social engagement and website traffic.
              </p>
              <p className="font-semibold text-teal-700">
                At the heart of everything I do is a simple idea: great sports content should make fans feel closer to the game.
              </p>
            </div>
          </div>
        </section>

        {/* Experience & Achievements Section */}
        <section id="experience" ref={refs.experience} className="scroll-mt-24">
          <h3 className="text-3xl font-extrabold mb-10 text-center md:text-left text-gray-900">Experience & Achievements</h3>
          <div className="space-y-12">
            {experience.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative p-6 sm:p-8 bg-white rounded-3xl shadow-lg border border-gray-100 flex flex-col md:flex-row gap-8 lg:gap-12 items-start before:absolute before:top-0 before:left-0 before:h-full before:w-1.5 before:bg-gradient-to-b before:from-teal-400 before:to-pink-400 overflow-hidden"
              >
                {/* Left Side: Logo & Role Info */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left w-full md:w-1/3 flex-shrink-0 pt-2">
                  <div className="relative w-24 h-24 sm:w-32 sm:h-32 bg-gray-50 rounded-2xl border border-gray-100 p-4 flex items-center justify-center mb-5 shadow-inner">
                    <Image src={item.logo} alt={`${item.org} logo`} fill className="object-contain p-3" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 leading-tight mb-1">
                    {item.role}
                  </h4>
                  <p className="text-xl font-semibold text-teal-600 mb-4">
                    {item.org}
                  </p>
                  <span className="inline-block px-4 py-1.5 bg-gray-100 text-gray-600 text-sm font-bold rounded-full tracking-wide">
                    {item.period}
                  </span>
                </div>

                {/* Right Side: Achievements Grid */}
                <div className="w-full md:w-2/3 flex flex-col justify-center h-full">
                  <h5 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">Key Contributions</h5>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {achievements[item.role]?.map((a, i) => (
                      <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 hover:bg-teal-50/40 rounded-2xl transition-colors duration-300 border border-transparent hover:border-teal-100">
                        <div className="text-teal-500 text-xl mt-0.5 flex-shrink-0">
                          {a.icon}
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed font-medium">{a.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section id="skills" ref={refs.skills} className="scroll-mt-24">
          <h3 className="text-3xl font-extrabold mb-8 text-gray-900">Core Skills</h3>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="px-5 py-2.5 bg-white rounded-full shadow-sm border border-gray-200 text-sm font-semibold text-teal-700 hover:shadow-md hover:border-teal-300 transition-all cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" ref={refs.contact} className="pb-20 scroll-mt-24">
          <div className="bg-teal-600 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
            {/* Decorative background circle */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-teal-500 rounded-full opacity-50 blur-3xl"></div>
            
            <h3 className="text-3xl font-extrabold mb-8 relative z-10">Let&apos;s Connect</h3>
            <div className="grid sm:grid-cols-2 gap-6 relative z-10">
              <a href="mailto:aakarshbommakanti@gmail.com" className="flex items-center gap-4 bg-teal-700/50 p-4 rounded-2xl hover:bg-teal-700 transition-colors">
                <span className="w-10 h-10 flex items-center justify-center bg-white text-teal-600 rounded-full text-xl shadow-sm">📧</span>
                <span className="font-medium truncate">aakarshbommakanti@gmail.com</span>
              </a>
              <div className="flex items-center gap-4 bg-teal-700/50 p-4 rounded-2xl">
                <span className="w-10 h-10 flex items-center justify-center bg-white text-teal-600 rounded-full text-xl shadow-sm">📱</span>
                <span className="font-medium">+91 81214 02101</span>
              </div>
              <a href="https://twitter.com/aakarsh_ab" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-teal-700/50 p-4 rounded-2xl hover:bg-teal-700 transition-colors">
                <span className="w-10 h-10 flex items-center justify-center bg-white text-teal-600 rounded-full text-xl shadow-sm">
                  <FaXTwitter />
                </span>
                <span className="font-medium">@aakarsh_ab</span>
              </a>
              <div className="flex items-center gap-4 bg-teal-700/50 p-4 rounded-2xl">
                <span className="w-10 h-10 flex items-center justify-center bg-white text-teal-600 rounded-full text-xl shadow-sm">📍</span>
                <span className="font-medium">Hyderabad, India</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
