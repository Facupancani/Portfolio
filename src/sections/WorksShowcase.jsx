// WorksShowcase.jsx
// Ejemplo de sección 'works' con estructura similar al repo que pasaste.
// - Dejar las URLs de imagen vacías (campo bg y thumb) para que las reemplaces.
// - Usa Tailwind (clases) + un pequeño CSS global que se indica más abajo.

import React, { useEffect, useRef, useState } from 'react';
import './WorksShowcase.css'; // importá el CSS global

import spideyBg from '../assets/images/spideybg.png';
import SpideyAndTheAmazingFriendsDemo from '../assets/vid/SpideyAndTheAmazingFriendsDemo.mp4';
import surfingBg from '../assets/images/surfingPixelbg.png';
import surfingThumb from '../assets/images/surfingPixelThumb.png';
import hoodiesBg from '../assets/images/hoodiesbg.png';
import hoodiesThumb from '../assets/images/hoodiesThumb.png';
import atheneaBg from '../assets/images/atheneabg.png';
import atheneaThumb from '../assets/images/atheneaThumb.png';
import lastResistanceBg from '../assets/images/lastResistancebg.png';
import cannesBg from '../assets/images/cannesbg.png';
import cannesThumb from '../assets/images/cannesThumb.png';

import MediaThumb from '../components/MediaThumb';


export default function WorksShowcase() {

    // Proyectos 
    // dentro del array projects, agregamos `link`:

    const projects = [
        {
            id: 1,
            number: '01',
            title: 'Spidey and the Amazing Friends',
            subtitle: '',
            bg: spideyBg,
            thumb: SpideyAndTheAmazingFriendsDemo,
            mediaType: 'video',
            videoMode: 'hover',
            link: 'https://facupancani.github.io/Spidey/'
        },
        {
            id: 2,
            number: '02',
            title: 'Cannes Hotel System',
            subtitle: '',
            bg: cannesBg,
            thumb: cannesThumb,
            mediaType: 'image',
            link: 'https://github.com/Facupancani/cannes-backend'
        },
        {
            id: 3,
            number: '03',
            title: 'Surfing Pixel',
            subtitle: 'Website.',
            bg: surfingBg,
            thumb: surfingThumb,
            mediaType: 'image',
            link: 'https://facupancani.github.io/Surfing-Pixel/'
        },
        {
            id: 4,
            number: '04',
            title: 'The Last Resistance',
            subtitle: 'Botjam winner.',
            bg: lastResistanceBg,
            thumb: "https://www.youtube.com/watch?v=m-6zfNgMCO4&ab_channel=FacuPancani",
            mediaType: "youtube",
            link: "https://www.youtube.com/@facupancani"
        },
        {
            id: 5,
            number: '05',
            title: 'Hoodies',
            subtitle: 'E-commerce.',
            bg: hoodiesBg,
            thumb: hoodiesThumb,
            mediaType: 'image',
            link: 'https://github.com/Facupancani/TPE_API'
        },
        {
            id: 6,
            number: '06',
            title: 'Athenea',
            subtitle: 'Restaurant website.',
            bg: atheneaThumb,
            thumb: atheneaBg,
            mediaType: 'image',
            link: 'https://facupancani.github.io/athenea/'
        },
    ];


    // Estado: índice del proyecto activo
    const [active, setActive] = useState(0);

    // Estado: mostrar descripción (para animar la aparición)
    const [showDescription] = useState(false);

    // Refs para manipular DOM: fondo apilado + thumbnails pequeños
    const bgRefs = useRef([]); // imgs de fondo
    const thumbRefs = useRef([]); // thumbnails pequeñas que tienen parallax
    const observerRef = useRef(null);
    const rightContainerRef = useRef(null);

    // ----------------- Intersection Observer: marca el proyecto activo -----------------
    useEffect(() => {

        // threshold determines when to trigger the observer 
        const ioOptions = { root: null, rootMargin: '0px', threshold: 0.55 };

        observerRef.current = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const idx = Number(entry.target.dataset.index);
                    setActive(idx);
                }
            });
        }, ioOptions);

        // Observamos cada "spacer" del lado derecho (cada bloque de proyecto)
        const items = rightContainerRef.current.querySelectorAll('.project-spacer');
        items.forEach((el) => observerRef.current.observe(el));

        return () => observerRef.current && observerRef.current.disconnect();
    }, []);

    // ----------------- Al cambiar active -> manejo de clases/opacidad de los fondos -----------------
    useEffect(() => {
        bgRefs.current.forEach((el, idx) => {
            if (!el) return;
            if (idx === active) {
                el.classList.add('active');
                el.style.zIndex = projects.length + 1; // el fondo activo arriba
            } else {
                el.classList.remove('active');
                el.style.zIndex = projects.length - idx;
            }
        });
    }, [active, projects.length]);



    // ----------------- Render -----------------
    return (
        <section id='projects' className="works h-auto">

            {/* MOBILE: cards simples */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:hidden overflow-x-hidden pb-[4.2rem]">
                {projects.map((p) => (
                    <div
                        key={p.id}
                        className="relative w-full flex flex-col rounded-2xl overflow-hidden shadow-lg"
                    >
                        {/* Fondo */}
                        <div className="absolute inset-0">
                            <img
                                src={p.bg}
                                alt={p.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50" /> {/* overlay */}
                        </div>

                        {/* Contenido */}
                        <div className="relative z-10 flex flex-col items-center p-6 w-full">

                            {/* Thumbnail con proporción */}
                            <div className="item-picture__thumbnail w-full max-w-[320px] mx-auto text-left">
                                <div className="item-picture__thumbnail-inner">
                                    <MediaThumb project={p} isMobile={true} />
                                </div>
                            </div>


                            {/* Título + número */}
                            <div className="mt-6 flex flex-col items-center gap-2 w-full">
                                <div className="item-title__wrapper w-full flex flex-col">
                                    <div className="item-title__container flex flex-row w-full items-center">
                                        <h2
                                            className="pr-4"
                                            style={{
                                                fontFamily: "Neue-Montreal, sans-serif",
                                                fontSize: "3rem",
                                                textAlign: "left",
                                                width: "100%",
                                                fontWeight: 400,
                                                letterSpacing: "-0.04em",
                                                lineHeight: 0.9,
                                                color: "#e0dfdf",
                                                margin: 0,
                                                overflowWrap: "break-word",
                                                WebkitFontSmoothing: "antialiased",
                                                fontVariantLigatures: "none",
                                                textRendering: "optimizeLegibility",
                                                textSizeAdjust: "none",
                                                WebkitTapHighlightColor: "transparent",
                                                boxSizing: "border-box",
                                                paddingBottom: "4.2rem"
                                            }}
                                        >
                                            {p.title}
                                        </h2>
                                        <p
                                            className="ml-auto uppercase"
                                            style={{
                                                fontFamily: "Neue-Montreal, sans-serif",
                                                fontSize: "1rem",
                                                fontWeight: 400,
                                                letterSpacing: "0",
                                                lineHeight: 1,
                                                color: "#e0dfdf",
                                                margin: 0,
                                                overflowWrap: "break-word",
                                                WebkitFontSmoothing: "antialiased",
                                                fontVariantLigatures: "none",
                                                textRendering: "optimizeLegibility",
                                                textSizeAdjust: "none",
                                                WebkitTapHighlightColor: "transparent",
                                                boxSizing: "border-box"
                                            }}
                                        >
                                            N.{p.number}
                                        </p>
                                    </div>

                                    <button
                                        className="btn-arrow p-l btn-modal c-light-grey w-full"
                                        onClick={() => window.open(p.link, "_blank")}
                                    >
                                        <span
                                            style={{
                                                fontFamily: "Neue-Montreal, sans-serif",
                                                fontSize: "1.2rem",
                                                fontWeight: 400,
                                                letterSpacing: 0,
                                                lineHeight: 1,
                                                color: "currentColor",
                                                margin: 0,
                                                boxSizing: "border-box",
                                                WebkitFontSmoothing: "antialiased",
                                                textSizeAdjust: "none",
                                                WebkitTapHighlightColor: "transparent"
                                            }}
                                        >
                                            View More
                                        </span>
                                        <span className="arrow btn-arrow__icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33 32" fill="none" stroke="currentColor">
                                                <path d="m28 12 3.9 3.9v.1L28 20" strokeWidth="2" />
                                                <path d="M1.1 16h30.8" strokeWidth="2" />
                                            </svg>
                                        </span>
                                        <span className="btn-arrow__border-wrapper">
                                            <span className="btn-arrow__border"></span>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* DESKTOP: layout con parallax */}
            <div className="hidden lg:block">

                <div className="works-wrapper h-auto w-full flex">

                    {/* LEFT: visual area */}
                    <div className="works-display side-60 w-4/5 relative">
                        {/* contenedor sticky que mantiene la zona visual fija */}
                        <div className="works-display__bg w-full sticky top-0 h-screen overflow-hidden">
                            {/* Capa negra semitransparente sobre el fondo */}
                            <div className='bg-black opacity-60 w-full h-full absolute inset-0 z-15'></div>

                            {/* Fondos apilados */}
                            {projects.map((p, i) => (
                                <img
                                    key={`bg-${p.id}`}
                                    ref={(el) => (bgRefs.current[i] = el)}
                                    src={p.bg || 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='}
                                    alt={p.title}
                                    className={`item-bg img-full absolute inset-0 object-cover w-full transition-opacity duration-700 ease-[cubic-bezier(.22,.9,.05,1)] ${i === active ? 'opacity-100' : 'opacity-0'}`}
                                    loading="lazy"
                                    aria-hidden={i === active ? 'false' : 'true'}
                                />
                            ))}
                        </div>

                        {/* Thumbnails con efecto parallax */}
                        <div className="thumbnails-container absolute inset-0 z-30">
                            {projects.map((p, i) => (
                                <div
                                    key={`thumb-${p.id}`}
                                    ref={(el) => (thumbRefs.current[i] = el)}
                                    className="works-display__item relative w-[40vw] h-[40vw] left-1/2 top-[75vh] -translate-x-1/2 mb-[25vh]"
                                >
                                    <MediaThumb project={p} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: texto / lista */}
                    <div className="sticky-block side-40 h-full relative bg-black">
                        <div className="sticky top-10 z-20 flex flex-col justify-between h-screen p-8" style={{ width: '38vw' }}>
                            {/* HEADER: lista de proyectos */}
                            <div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <ul className="works-list">
                                            {projects.map((p, i) => (
                                                <li key={p.id} className={`${i === active ? 'active' : ''}`}>
                                                    <button
                                                        className={`works-list-button ${i === active ? 'active' : ''}`}
                                                        onClick={() => {
                                                            const target = rightContainerRef.current.querySelector(`[data-index='${i}']`);
                                                            target && target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                                        }}
                                                    >
                                                        <div className="flex items-center">
                                                            <p className="works-list-item mr-3">N.{p.number}</p>
                                                            <p className="works-list-item">{p.title}</p>
                                                        </div>
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Número grande */}
                                    <div className="absolute right-[2rem] top-[-2rem] ml-6 text-gray-300 text-[10rem] font-medium select-none flex">
                                        {projects[active]?.number}
                                    </div>
                                </div>
                                <span className="relative flex left-0 h-[1px] w-full bg-white opacity-30 top-10"></span>
                            </div>

                            {/* DESCRIPCIÓN animada */}
                            <div
                                className={`overflow-hidden transition-all duration-500 mt-4 ${showDescription ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}
                            >
                                <p className="text-gray-400 max-w-md">{projects[active].subtitle}</p>
                            </div>

                            {/* FOOTER: título + botón */}
                            <div className="flex flex-col mb-8">
                                <button
                                    className="btn-viewmore relative w-full flex items-center justify-between mb-5 p-2 cursor-pointer bg-transparent group"
                                    onClick={() => {
                                        const link = projects[active]?.link;
                                        if (link) window.open(link, "_blank");
                                    }}
                                >
                                    <span className="text-white font-normal">View More</span>
                                    <span className="ml-2 w-6 h-6 flex-shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33 32" fill="none" stroke="currentColor">
                                            <path d="m28 12 3.9 3.9v.1L28 20" strokeWidth="2" />
                                            <path d="M1.1 16h30.8" strokeWidth="2" />
                                        </svg>
                                    </span>
                                    <span className="absolute bottom-0 left-0 h-[1px] w-full bg-white opacity-30"></span>
                                    <span className="absolute bottom-0 left-0 h-[1px] w-full bg-white scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></span>
                                </button>

                                <h2 className="project-title mb-4">{projects[active].title}</h2>
                                <h3 className="project-subtitle mb-4">{projects[active].subtitle}</h3>
                            </div>
                        </div>

                        {/* Spacer para IntersectionObserver */}
                        <div ref={rightContainerRef} className="sticky-block__content">
                            {projects.map((p, i) => (
                                <div key={p.id} data-index={i} className="project-spacer min-h-screen"></div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );

}
