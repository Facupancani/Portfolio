import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaArrowUp, FaLinkedin, FaGithub } from "react-icons/fa";
import { BsArrowDownRight } from "react-icons/bs";
import OrbitSection from "./OrbitSection";
import OrbitScene from "./OrbitScene";

export default function Footer() {
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setCursorPos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer id="contact" className="relative bg-neutral-950 text-neutral-300 h-[90vh] overflow-hidden flex flex-col justify-center">
            <OrbitScene />

            {/* Parallax glow */}
            <motion.div
                className="absolute w-[600px] h-auto rounded-full bg-neutral-800/20 blur-3xl"
                animate={{ x: cursorPos.x - 300, y: cursorPos.y - 300 }}
                transition={{ type: "spring", stiffness: 50, damping: 20 }}
            />

            {/* Divider superior */}
            <motion.div
                initial={{ opacity: 0, width: 0 }}
                whileInView={{ opacity: 1, width: "100%" }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="relative mb-12 flex items-center justify-center w-full"
            >
                <div className="w-full h-px bg-neutral-700" />
                <span className="absolute px-4 bg-neutral-950 text-neutral-400 text-sm uppercase tracking-widest">
                    *
                </span>
            </motion.div>

            {/* Contenido central */}
            <div className="relative z-30 flex flex-col items-center text-center space-y-10 px-6">
                {/* CTA principal */}
                <div className="flex flex-col items-center space-y-4">
                    <h2 className="text-4xl md:text-6xl font-bold text-white">
                        Let's talk
                    </h2>
                    <motion.div
                        initial={{ y: -10, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="flex items-center space-x-3 text-neutral-400"
                    >
                    </motion.div>
                </div>

                {/* Email grande */}
                <a
                    href="mailto:facupancani@gmail.com"
                    className="text-3xl md:text-4xl font-semibold text-white hover:text-neutral-400 transition-colors"
                >
                    facupancani@gmail.com
                </a>

                {/* Redes sociales */}
                <div className="flex space-x-8 text-3xl">
                    <a
                        href="https://www.linkedin.com/in/facundopancani/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors"
                    >
                        <FaLinkedin />
                    </a>
                    <a
                        href="https://github.com/Facupancani"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors"
                    >
                        <FaGithub />
                    </a>
                </div>
            </div>

            {/* Divider inferior */}
            <motion.div
                initial={{ opacity: 0, width: 0 }}
                whileInView={{ opacity: 1, width: "100%" }}
                transition={{ duration: 1, delay: 0.3 }}
                viewport={{ once: true }}
                className="relative mt-16 flex items-center justify-center w-full"
            >
                <div className="w-full h-px bg-neutral-700" />
            </motion.div>

            {/* Back to top */}
            <div className="relative z-10 mt-8 mb-8 flex justify-center">
                <button
                    onClick={scrollToTop}
                    className="flex items-center space-x-2 border border-neutral-700 px-4 py-2 rounded-full text-sm text-neutral-400 hover:bg-neutral-800 hover:text-white transition"
                >
                    <FaArrowUp /> <span>Back to top</span>
                </button>
            </div>
        </footer>
    );
}
