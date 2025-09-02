"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaVideo, FaChartLine, FaPenFancy, FaGlobe, FaXTwitter, FaDownload } from "react-icons/fa6";
import Image from "next/image";

// ---------- Data ----------
const experience = [
  { role: "Media Manager", org: "Hyderabad FC", period: "2020–2025" },
  { role: "Content Analyst", org: "Microsoft (Bing Sports)", period: "2018–2020" },
  { role: "Editor", org: "The 4th Official", period: "2016–2018" },
  { role: "Freelance Writer", org: "Multiple Outlets", period: "2014–2020" },
];

const achievements: Record<string, { text: string; icon: React.ReactNode }[]> = {
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
        setTxt(word.substring(0, s - 1));
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
  const achievementsRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const refs = {
    about: aboutRef,
    experience: experienceRef,
    achievements: achievementsRef,
    skills: skillsRef,
    contact: contactRef,
  };

  const [progress, setProgress] = useState(0);
  const [achTab, setAchTab] = useState<keyof typeof achievements>("Media Manager");
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
    <div className="min-h-screen text-gray-800">
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
        <div className="max-w-6xl mx-auto flex justify-center gap-4 rounded-full bg-white/80 backdrop-blur-md px-6 py-3 shadow">
          {Object.keys(refs).map((key) => (
            <button
              key={key}
              onClick={() => scrollTo(refs[key as keyof typeof refs])}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                active === key
                  ? "bg-teal-500 text-white shadow-lg"
                  : "hover:bg-gray-100"
              }`}
            >
              {key[0].toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10 space-y-32 relative">
        {/* Hero */}
        <section
          id="about"
          ref={refs.about}
          className="min-h-screen flex flex-col items-center justify-center text-center space-y-8 pt-20 md:pt-0"
        >
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full shadow-lg overflow-hidden mb-6">
            <Image src="/profile.jpg" alt="Profile" fill className="object-cover" />
          </div>

          <div className="space-y-4 max-w-2xl">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-teal-600">Aakarsh Bommakanti</h1>
            <p className="text-xl sm:text-2xl font-semibold text-gray-700 h-8">
              {typeText}
              <span className="inline-block w-1 h-6 bg-teal-500 animate-pulse ml-1"></span>
            </p>
            <p className="text-md sm:text-lg leading-relaxed text-gray-700">
              I&apos;ve spent over a decade working to bring fans closer to the sports they love. As a media manager and content creator, I&apos;ve had the unique opportunity to build a fan culture from the ground up, scripting a two-season documentary series for Disney+ Hotstar. I&apos;m a hands-on leader who uses tactical analysis and data to create content that truly connects with a sports audience, leading to significant growth in social media engagement and website traffic.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <motion.div
              className="relative group"
              onClick={() => scrollTo(refs.experience)}
              whileTap={{ scale: 0.95 }}
            >
              <button className="bg-teal-500 text-white px-6 py-3 rounded-full shadow-lg transition-colors group-hover:bg-white group-hover:text-teal-500">
                Explore more ↓
              </button>
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-teal-500 z-[-1]"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              />
            </motion.div>
            <motion.div
              className="relative group"
              whileTap={{ scale: 0.95 }}
            >
              <a href="/AakarshBommakanti-Resume.pdf" download="AakarshBommakanti-Resume.pdf" className="flex items-center gap-2 bg-white text-teal-500 px-6 py-3 rounded-full shadow-lg border-2 border-teal-500 transition-colors group-hover:bg-teal-500 group-hover:text-white">
                <FaDownload />
                Download CV
              </a>
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-teal-500 z-[-1]"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              />
            </motion.div>
          </div>
        </section>

        {/* Experience Timeline */}
        <section id="experience" ref={refs.experience}>
          <h3 className="text-2xl font-bold mb-6">Experience</h3>
          <div className="space-y-6">
            {experience.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative p-6 bg-white rounded-xl shadow-md overflow-hidden before:absolute before:top-0 before:left-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-teal-400 before:to-pink-400"
              >
                <h4 className="flex items-center mb-1 text-xl font-semibold text-gray-900">
                  {item.role} <span className="text-base text-gray-500 ml-2 font-normal">at {item.org}</span>
                </h4>
                <p className="block mb-2 text-sm font-normal leading-none text-gray-500">
                  {item.period}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Achievements */}
        <section id="achievements" ref={refs.achievements}>
          <h3 className="text-2xl font-bold mb-6">Achievements</h3>

          {/* Tabs */}
          <div className="flex gap-3 mb-6 flex-wrap">
            {Object.keys(achievements).map((tab) => (
              <button
                key={tab}
                onClick={() => setAchTab(tab as keyof typeof achievements)}
                className={`px-4 py-2 rounded-full transition ${
                  achTab === tab
                    ? "bg-teal-500 text-white shadow"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {achievements[achTab].map((a, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-white shadow rounded-xl">
                <div className="text-teal-500 text-xl mt-1">
                  {a.icon}
                </div>
                <p className="text-sm">{a.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section id="skills" ref={refs.skills}>
          <h3 className="text-2xl font-bold mb-6">Skills</h3>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-white rounded-full shadow text-sm font-medium text-teal-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" ref={refs.contact} className="pb-20">
          <h3 className="text-2xl font-bold mb-6">Contact</h3>
          <p className="flex items-center gap-2 mb-2">
            <span className="w-5 h-5 flex items-center justify-center">📧</span>
            <a href="mailto:aakarshbommakanti@gmail.com" className="text-teal-600 hover:underline">aakarshbommakanti@gmail.com</a>
          </p>
          <p className="flex items-center gap-2 mb-2">
            <span className="w-5 h-5 flex items-center justify-center">📱</span>
            <span>+91 81214 02101</span>
          </p>
          <p className="flex items-center gap-2 mb-2">
            <span className="w-5 h-5 flex items-center justify-center text-lg">
              <FaXTwitter />
            </span>
            <a href="https://twitter.com/aakarsh_ab" className="text-teal-600 hover:underline">@aakarsh_ab</a>
          </p>
          <p className="flex items-center gap-2">
            <span className="w-5 h-5 flex items-center justify-center">📍</span>
            <span>Hyderabad, India</span>
          </p>
        </section>
      </main>
    </div>
  );
}
