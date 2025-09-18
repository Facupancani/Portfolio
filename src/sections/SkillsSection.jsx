import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import image from '../assets/darkdesk.jpg'
import { MouseParallaxContainer, MouseParallaxChild } from "react-parallax-mouse";


function SkillsSection() {


  const { scrollY } = useScroll()  // valor de scroll en píxeles
  // Aquí, la imagen se moverá 0 a 100px mientras scrollY va de 0 a 500px
  const y = useTransform(scrollY, [0, 100], [0, 100])



  return (

    // Contenedor principal, contiene el espacio para el desplazamiento vertical (Podria darle un degrade de opacidad para no ver el corte de la imagen de arriba)
    <div className="relative w-full h-[1250vh] flex overflow-hidden px-6 bg-black">

      {/* Título sección */}
      <h2 className="relative top-10 left-50 text-5xl font-elza font-medium">
        Skills
      </h2>


      {/* Efecto parallax con el ratón */}
      <MouseParallaxContainer globalFactorX={0.1} globalFactorY={0.1} className=" relative left-250">
        <MouseParallaxChild factorX={0.9} factorY={0.95}>

          {/* Imagen desplazable */}
          <motion.img
            src={image}
            alt="Skills"
            className="w-auto h-auto scale-125 opacity-10"
            style={{ y }} // aplicamos la animación de scroll
          />

        </MouseParallaxChild>

      </MouseParallaxContainer>


    </div>
  )
}

export default SkillsSection
