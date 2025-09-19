import { useState, useRef } from 'react';
import { SquareMousePointer } from 'lucide-react';

function MediaThumb({ project, isMobile }) {

    const [hovered, setHovered] = useState(false);
    const videoRef = useRef(null);

    const handleMouseEnter = () => {
        if (!isMobile && project.videoMode === 'hover' && videoRef.current) {
            setHovered(true);
            videoRef.current.currentTime = 0;
            videoRef.current.play();
        }
    };

    const handleMouseLeave = () => {
        if (!isMobile && project.videoMode === 'hover' && videoRef.current) {
            setHovered(false);
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };

    // --------------------- VIDEOS ---------------------
    if (project.mediaType === 'video') {
        if (project.videoMode === 'loop') {
            return (
                <video
                    src={project.thumb}
                    className="item-thumbnail-img img-full block w-[40vw] h-[40vw] rounded-md shadow-lg object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                />
            );
        } else if (project.videoMode === 'click' || isMobile) {
            // Hover videos en mobile se comportan como click
            return (
                <video
                    src={project.thumb}
                    className="item-thumbnail-img img-full block w-[40vw] h-[40vw] rounded-md shadow-lg object-cover"
                    controls
                    playsInline
                />
            );
        } else if (project.videoMode === 'hover') {
            return (
                <div
                    className="item-thumbnail-img img-full relative"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <video
                        ref={videoRef}
                        src={project.thumb}
                        className="w-full h-full object-cover"
                        muted
                        playsInline
                    />
                    {!isMobile && (
                        <div
                            className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-500 ${hovered ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'}`}
                        >
                            <SquareMousePointer className="w-12 h-12 text-white" />
                        </div>
                    )}
                </div>
            );
        }
    }

    // --------------------- YOUTUBE ---------------------
    if (project.mediaType === 'youtube') {
        const videoId = project.thumb.split('v=')[1]?.split('&')[0];
        if (!videoId) return null;

        return (
            <div className="item-thumbnail-img img-full w-[40vw] h-[40vw] rounded-md shadow-lg overflow-hidden">
                <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${videoId}?rel=0&showinfo=0&autoplay=0`}
                    title={project.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="object-cover w-full h-full"
                ></iframe>
            </div>
        );
    }

    // --------------------- IMAGEN ---------------------
    return (
        <img
            src={project.thumb}
            alt={project.title}
            className="item-thumbnail-img img-full block w-[40vw] h-[40vw] rounded-md shadow-lg object-cover z-99"
        />
    );
}

export default MediaThumb;
