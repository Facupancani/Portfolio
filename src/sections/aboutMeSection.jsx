import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import photo from "../assets/images/me.png";


export default function AboutMeSection() {
  const { scrollYProgress } = useScroll();
  const [isMobile, setIsMobile] = useState(false);
  // offsets responsivos para los ejes X de los párrafos
  const [offsets, setOffsets] = useState({ xSecond: 0, xThird: 0 });


  // Parallax
  const yText = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const yImg = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const scaleImg = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Blur y opacidad del fondo
  const opacityBg = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const blurBg = useTransform(scrollYProgress, [0, 0.2], ["20px", "0px"]);

  // Cursor state
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e) => {
    setCursor({ x: e.clientX, y: e.clientY });
  };

  const getOffsets = (width) => {
    if (width < 768) return { xSecond: 0, xThird: 0 };      // mobile
    if (width < 1024) return { xSecond: 20, xThird: 40 };   // tablets / md
    return { xSecond: 50, xThird: 150 };                    // desktop
  };

  useEffect(() => {
    const handleResize = () => setOffsets(getOffsets(window.innerWidth));
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { xSecond, xThird } = offsets;


  return (
    <section
      id="about-me"
      className="relative min-h-[100vh] top-[2rem] flex flex-col justify-center overflow-visible bg-neutral-950 text-neutral-100 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Divider */}
      <motion.div
        initial={{ opacity: 0, width: 0 }}
        whileInView={{ opacity: 1, width: "100%" }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 1 }}
        viewport={{ once: false }}
        className="relative mb-16 flex items-center justify-center w-full"
      >
        <div className="w-full h-px bg-neutral-700" />
        <span className="absolute px-4 bg-neutral-950 text-neutral-300 text-sm uppercase tracking-widest">
          About Me • As developer
        </span>
      </motion.div>

      {/* Fondo dinámico */}
      <motion.div
        style={{ opacity: opacityBg, backdropFilter: blurBg }}
        className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-900 to-neutral-950 z-0"
      />

      {/* Spotlight cursor */}
      <div
        className="pointer-events-none absolute -inset-px z-0"
        style={{
          background: `radial-gradient(500px at ${cursor.x}px ${cursor.y}px, rgba(255,255,255,0.08), transparent 80%)`,
        }}
      />

      {/* Glow parallax */}
      <motion.div
        className="hidden absolute left-1/3 top-1/4 w-[100%] h-[500px] rounded-full bg-purple-500/20 blur-3xl -z-10 sm:w-[300px] sm:h-[300px]"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 120]) }}
      />

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-6 relative z-20 max-w-7xl mx-auto">
        {/* Texto */}
        <motion.div
          style={{ y: yText }}
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col space-y-6 text-left z-20"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: false }}
            className="text-base sm:text-lg md:text-xl leading-relaxed text-neutral-300"
          >
            Hi, I’m{" "}
            <span className="text-[#D27D46] font-semibold">Facundo Pancani</span> — a{" "}
            <span className="text-white">Software Developer</span> with a{" "}
            <span className="text-[#D27D46]">technical degree</span> in Application Development,
            currently advancing my{" "}
            <span className="text-white">Systems Engineering</span> studies.
          </motion.p>

          {/* Segundo párrafo */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0, x: xSecond }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: false }}
            className="text-base sm:text-lg md:text-xl leading-relaxed text-neutral-300"
          >
            I specialize in{" "}
            <span className="text-white">user-centered solutions</span> with strong
            attention to <span className="text-[#D27D46]">{`detail`}</span> and{" "}
            <span className="text-white">{`usability`}</span>. I enjoy{" "}
            <span className="text-[#D27D46]">{`collaborating in teams`}</span>, bringing
            {` fresh ideas`} and leveraging{" "}
            <span className="text-white">problem-solving</span> to craft{" "}
            <span className="text-[#D27D46]">impactful applications</span>.
          </motion.p>

          {/* Tercer párrafo */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0, x: xThird }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: false }}
            className="text-base sm:text-lg md:text-xl leading-relaxed text-neutral-300"
          >
            Passionate about{" "}
            <span className="text-white">{`continuous learning`}</span> and{" "}
            <span className="text-[#D27D46]">emerging technologies</span>, I strive to
            deliver <span className="text-white">scalable solutions</span> that create{" "}
            <span className="text-[#D27D46]">{`real value`}</span> in{" "}
            <span className="text-white">fast-paced environments</span>.
          </motion.p>

        </motion.div>

        {/* Imagen */}
        <motion.div
          style={{ y: yImg, scale: scaleImg }}
          className="hidden md:flex justify-center relative z-10"
        >
          <motion.img
            src={photo}
            alt="Facundo Pancani"
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="rounded shadow-2xl max-w-sm w-full object-cover grayscale
                     mx-auto mb-8 
                     md:mx-0 md:mb-0 md:-translate-x-10
                     sm:-translate-y-10"
          />
        </motion.div>
      </div>
    </section>
  );


}
