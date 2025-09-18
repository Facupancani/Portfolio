import { useState } from "react";
import "./App.css";

import Navbar from "./sections/navBar";
import Hero from "./sections/hero";
import ParticlesBackground from "./components/ParticlesBackground";
import MainContent from "./sections/MainContent";

function App() {

  return (
    <>
      <Navbar />
      <ParticlesBackground />
      <Hero />
      <MainContent />
    </>
  );
}

export default App;
