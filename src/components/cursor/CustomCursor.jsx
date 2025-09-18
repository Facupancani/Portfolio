// CustomCursor.jsx
import { motion } from "framer-motion";
import { useCursor } from "./CursorContext";

export default function CustomCursor({ yOffset = 0 }) {
  const { cursorPos, isHovering } = useCursor();

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 40,
        height: 40,
        borderRadius: "50%",
        pointerEvents: "none",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 9999,
        mixBlendMode: "difference",
      }}
      animate={{
        x: cursorPos.x - 20, // centrar el círculo
        y: cursorPos.y - 20 + yOffset,
        scale: isHovering ? 1.5 : 1,
        backgroundColor: isHovering
          ? "rgba(255, 0, 0, 0.5)"
          : "rgba(0, 0, 0, 0.5)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    />
  );
}
