// CursorTarget.jsx
import { useCursor } from "./CursorContext";

export default function CursorTarget({ children }) {
  const { setIsHovering } = useCursor();

  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{ display: "inline-block" }}
    >
      {children}
    </div>
  );
}
