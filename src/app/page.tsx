// ... existing code ...
const projects = [
  { title: "FIFA YT Publishing", description: "Oversaw the best year in FIFA YouTube history, driving record-breaking subscriber growth and watch time during the 2026 World Cup.", image: "/fifa-yt.jpg", layout: "horizontal", link: "https://youtube.com/@fifa" },
  { title: "FanCode ISL & LALIGA", description: "Produced and managed everyday social media content on FanCode for top-tier global football leagues.", image: "/fancode-content.jpg", layout: "vertical", link: "https://fancode.com" },
  { title: "Future Is Us Docuseries", description: "First-of-its-kind sports docuseries following the journey of Hyderabad FC, scripted and produced for Disney+ Hotstar.", image: "/future-is-us.jpg", layout: "vertical", link: "https://hotstar.com" },
  { title: "Hyderabad FC Trophy Win", description: "Led the digital media strategy and coverage as Media Manager when Hyderabad FC won the ISL championship.", image: "/hfc-trophy.jpg", layout: "horizontal", link: "https://hyderabadfc.co.in" },
  { title: "Microsoft Bing UI", description: "Helped improve the Bing homepage user interface and user experience for real-time sports searches.", image: "/bing-ui.jpg", layout: "vertical", link: "https://bing.com" },
  { title: "Sports Writer & Editor", description: "Wrote and published over 15,000 articles across global platforms, building a readership of half a million.", image: "/writer.jpg", layout: "vertical", link: "#" },
];

const skills = ["Content Strategy", "Video Production", "Sports Analytics", "Editorial Leadership", "Social Media Growth", "Storytelling", "Digital Marketing", "SEO & SEM", "Data Visualization", "Brand Management", "Media Relations", "Public Speaking"];
// ... existing code ...
        {/* Highlights Gallery Section with Interactive Preview Links */}
        <section id="highlights" ref={refs.highlights} className="scroll-mt-28 relative z-10">
          <div className="text-center md:text-left mb-8 sm:mb-10">
            <span className="text-xs font-black text-teal-500 uppercase tracking-widest block mb-2">Portfolio Showcase</span>
            <h3 className={`text-3xl sm:text-4xl font-extrabold ${tHead}`}>Highlights</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {projects.map((project, index) => {
              const isHorizontal = project.layout === "horizontal";
              return (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, scale: 0.95 }} 
                  whileInView={{ opacity: 1, scale: 1 }} 
                  viewport={{ once: true }} 
                  transition={{ delay: index * 0.1 }}
                  className={`${isHorizontal ? "md:col-span-2" : "md:col-span-1"}`}
                >
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className={`rounded-[2rem] overflow-hidden flex flex-col h-full group ${tCard} block relative`}>
                    <div className={`w-full relative p-4 bg-transparent flex items-center justify-center ${isHorizontal ? "h-[280px] sm:h-[400px]" : "h-[380px] sm:h-[440px]"}`}>
                      <Image src={project.image} alt={project.title} fill className="object-contain p-2 bg-transparent group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-teal-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                        <FaArrowUpRightFromSquare className="text-sm" />
                      </div>
                    </div>
                    <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                      <h4 className={`text-xl font-bold mb-2 ${tHead}`}>
                        {project.title}
                      </h4>
                      <p className={`text-xs sm:text-sm leading-relaxed opacity-80 ${tSub}`}>{project.description}</p>
                    </div>
                  </a>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Skills */}
// ... existing code ...
```eof
