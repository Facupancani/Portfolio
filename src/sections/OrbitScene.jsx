import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function OrbitScene() {
    const mountRef = useRef(null);

    // ===== Configuración ajustable =====
    const config = {
        starCount: 18000,              // cantidad de estrellas
        galaxyRadius: 40,              // radio máximo de la galaxia
        branches: 3,                   // cantidad de brazos
        starSize: 0.15,                // tamaño de cada estrella
        rotationSpeed: 0.1,            // velocidad general de rotación
        swirlStrength: 2,              // cuanto “se enroscan” los brazos
        verticalSpread: 0.6,           // dispersión vertical
        verticalSpeedFactor: 0.5,      // velocidad vertical individual
        position: { x: 0, y: 0, z: 0 },
        cameraPosition: { x: 6, y: 6, z: 20 },
        colors: { inside: "#ffa575", outside: "#311599" },
    };

    useEffect(() => {
        const scene = new THREE.Scene();
        scene.background = null;

        const camera = new THREE.PerspectiveCamera(
            50,
            mountRef.current.clientWidth / mountRef.current.clientHeight,
            0.1,
            100
        );
        camera.position.set(
            config.cameraPosition.x,
            config.cameraPosition.y,
            config.cameraPosition.z
        );

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        mountRef.current.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.minDistance = 0.1;
        controls.maxDistance = 50;

        // Luz
        scene.add(new THREE.AmbientLight(0xffffff, 0.7));
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        // ===== Galaxia =====
        const geometry = new THREE.BufferGeometry();
        const positions = [];
        const colorsArray = [];

        const starData = [];

        for (let i = 0; i < config.starCount; i++) {
            const radius = Math.pow(Math.random(), 1.5) * config.galaxyRadius;
            const branchAngle = Math.floor(Math.random() * config.branches) * (2 * Math.PI / config.branches);
            const baseAngle = branchAngle + Math.random() * config.swirlStrength;

            const x = Math.cos(baseAngle) * radius + config.position.x;
            const y = (Math.random() - 0.5) * config.verticalSpread + config.position.y;
            const z = Math.sin(baseAngle) * radius + config.position.z;

            positions.push(x, y, z);

            const color = new THREE.Color();
            color.lerpColors(
                new THREE.Color(config.colors.inside),
                new THREE.Color(config.colors.outside),
                radius / config.galaxyRadius
            );
            colorsArray.push(color.r, color.g, color.b);

            // Guardamos datos para animación
            starData.push({
                radius,
                baseAngle,
                speed: (1 - radius / config.galaxyRadius) * config.rotationSpeed, // rotación horizontal
                verticalSpeed: (Math.random() - 0.5) * config.verticalSpeedFactor, // velocidad vertical aleatoria
                yOffset: y // posición vertical inicial
            });
        }

        geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute("color", new THREE.Float32BufferAttribute(colorsArray, 3));

        // Textura circular para estrellas
        const size = 64;
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
        ctx.fill();
        const texture = new THREE.CanvasTexture(canvas);

        const material = new THREE.PointsMaterial({
            size: config.starSize,
            vertexColors: true,
            blending: THREE.AdditiveBlending,
            transparent: true,
            map: texture,
        });

        const stars = new THREE.Points(geometry, material);
        scene.add(stars);

        // ===== Animación =====
        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();

            const positions = stars.geometry.getAttribute("position");
            const time = performance.now() * 0.001;

            for (let i = 0; i < config.starCount; i++) {
                const data = starData[i];

                // Movimiento horizontal
                const angle = data.baseAngle + time * data.speed * 5;
                const radialNoise = Math.sin(time * 2 + data.radius * 10) * 0.05;
                const radius = data.radius + radialNoise;

                positions.setX(i, Math.cos(angle) * radius + config.position.x);

                // Movimiento vertical controlable
                const yNoise = Math.sin(time * 3 + i) * config.verticalSpread * 0.5;
                positions.setY(i, data.yOffset + yNoise + data.verticalSpeed * time);

                positions.setZ(i, Math.sin(angle) * radius + config.position.z);
            }

            positions.needsUpdate = true;
            renderer.render(scene, camera);
        };

        animate();

        // Resize
        const handleResize = () => {
            camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, []);

    return (
        <div
            ref={mountRef}
            className="relative z-20 w-full h-[80vh] flex items-center"
        />
    );
}
