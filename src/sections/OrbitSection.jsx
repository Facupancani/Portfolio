// OrbitSection.jsx
import React from 'react';
import OrbitScene from './OrbitScene';
import { motion } from 'framer-motion';

function OrbitSection() {
    return (
        <div className='w-full flex items-center justify-center bg-gradient-to-b from-black via-neutral-900 to-black py-20'>
            <div className='w-[60vw] h-[40vh] overflow-hidden rounded-lg border border-neutral-800'>
                <OrbitScene />
            </div>      
        </div>
    );
}

export default OrbitSection;
