import { motion } from "framer-motion";
import ParticlesBackground from "../components/ParticlesBackground";
import { TypeAnimation } from "react-type-animation";

export default function Hero() {
  return (
    <section id="home" className="relative w-full min-h-[95vh] flex items-center justify-left overflow-hidden">
      <ParticlesBackground />
      <div className="relative z-10 max-w-5xl w-full ml-0 lg:ml-40 px-6 text-left">
        <h1
  className="font-elza font-medium m-0
  [--headline-hero-font-size:clamp(36px,5vw,80px)]
  text-[length:var(--headline-hero-font-size)]
  leading-[1] tracking-normal flex flex-col uppercase h-fit max-w-full break-words"
>
  {/* MAKE IT + línea */}
  <span className="grid font-light grid-cols-[auto_1fr] items-center gap-4 max-w-full">
    <span className="inline-block">make it</span>
    <span className="inline-block w-16 sm:w-20 h-1.5 origin-[center_left] bg-blue-400/60">
      <div className="bg-secondary h-[3px] w-full"></div>
    </span>
  </span>

  {/* Texto cambiante */}
  <span className="inline-block font-semibold mt-4 text-[length:var(--headline-hero-font-size)] max-w-full break-words">
    <TypeAnimation
      sequence={[
        "innovative", 2000,
        "functional", 2000,
        "easy", 2000,
        "yours.", 2000,
      ]}
      wrapper="span"
      speed={200}
      deletionSpeed={180}
      repeat={Infinity}
      className="inline-block pr-1"
    />
  </span>
</h1>


        {/* Subtítulo */}
        <p className="mt-6 text-lg text-gray-400 font-elza max-w-2xl">
          Greetings, i’m Facundo Pancani, a web developer and designer who builds modern, visually appealing and clean websites.
        </p>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-[4vh] bg-gradient-to-b from-transparent to-black pointer-events-none" />
    </section>
  );
}
