"use client";

// components/ui/RotateToggle.tsx
// Small overlay button at the bottom-centre of the viewer
// that pauses / resumes auto-rotation.

interface RotateToggleProps {
  isRotating: boolean;
  onToggle: () => void;
}

export default function RotateToggle({ isRotating, onToggle }: RotateToggleProps) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 16,
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      <button
        onClick={onToggle}
        style={{
          padding: "6px 16px",
          borderRadius: 6,
          border: "1px solid rgba(255,255,255,0.2)",
          background: "rgba(0,0,0,0.5)",
          color: "#fff",
          fontSize: 12,
          letterSpacing: "0.08em",
          cursor: "pointer",
          backdropFilter: "blur(6px)",
        }}
      >
        {isRotating ? "⏸ Pause" : "▶ Rotate"}
      </button>
    </div>
  );
}