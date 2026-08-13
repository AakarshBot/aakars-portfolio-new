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
    { text: "Led YouTube publishing strategy for the 2026 FIFA World Cup as part of Global Publishing, managing HBS delivery workflows and international media assets.", icon: <FaVideo/> },
    { text: "Grew channel views from 66.18 million to 127.33 million and increased watch time to 4.95 million hours within a single reporting period.", icon: <FaChartLine/> },
    { text: "Executed comprehensive metadata optimization and A/B testing projects for archival football videos.", icon: <FaGlobe/> },
  ],
  "Media Manager": [
    { text: "Directed media strategy, increasing engagement by 35% YoY.", icon: <FaVideo/> },
    { text: "Produced and scripted a two-season documentary on Disney+ Hotstar.", icon: <FaVideo/> },
    { text: "Managed daily content across social platforms and live coverage.", icon: <FaGlobe/> },
    { text: "Created fan campaigns that boosted stadium attendance and loyalty.", icon: <FaChartLine/> },
    { text: "Collabs with the biggest celebrities and influencers to increase engagement.", icon: <FaVideo/> },
    { text: "Co-ordinating sponsorships from the biggest global brands like Hummel, EA Sports and more.", icon: <FaVideo/> },
  ],
  "Content Analyst": [
    { text: "Built predictive models for Premier League & Champions League outcomes.", icon: <FaChartLine/> },
    { text: "Enhanced Bing Sports UX with improved live coverage and personalization.", icon: <FaGlobe/> },
    { text: "Streamlined API integrations for real-time match data.", icon: <FaChartLine/> },
  ],
  Editor: [
    { text: "Led a team of 10 writers, publishing 20+ articles daily.", icon: <FaPenFancy/> },
    { text: "Strengthened workflows for quick and reliable match-day coverage.", icon: <FaPenFancy/> },
    { text: "Expanded reach through consistent, high-quality analysis.", icon: <FaGlobe/> },
  ],
  "Freelance Writer": [
    { text: "Authored 20,000+ football articles across global platforms.", icon: <FaPenFancy/> },
    { text: "Only Indian columnist at RousingTheKop (Liverpool FC fan site).", icon: <FaGlobe/> },
    { text: "Built a readership of 500,000+ with in-depth football analysis.", icon: <FaChartLine/> },
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
  const achievementsRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const refs = useMemo(() => ({
    about: aboutRef,
    experience: experienceRef,
    achievements: achievementsRef,
    skills: skillsRef,
    contact: contactRef,
  }), []);

  const [progress, setProgress] = useState(0);
  const [achTab, setAchTab] = useState<keyof typeof achievements>("Head Of YouTube Publishing");
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
      <BackgroundTexture/>

      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50">
        <div
          className="h-1 bg
