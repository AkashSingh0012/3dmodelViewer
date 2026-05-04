"use client";

// components/ui/ErrorOverlay.tsx
// Full-canvas overlay shown when the model fails to load.
// Displays the error message and a dismiss button that falls back to PlaceholderBox.

interface ErrorOverlayProps {
  message: string;
  onDismiss: () => void;
}

export default function ErrorOverlay({ message, onDismiss }: ErrorOverlayProps) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(10,10,10,0.85)",
        backdropFilter: "blur(6px)",
        zIndex: 10,
        fontFamily: "monospace",
        gap: 12,
        padding: 24,
      }}
    >
      <span style={{ fontSize: 32 }}>⚠️</span>

      <p style={{ color: "#ff6666", fontSize: 13, fontWeight: "bold", margin: 0 }}>
        Failed to load model
      </p>

      <p
        style={{
          color: "#888",
          fontSize: 11,
          textAlign: "center",
          maxWidth: 360,
          lineHeight: 1.6,
          wordBreak: "break-all",
          margin: 0,
        }}
      >
        {message}
      </p>

      <p style={{ color: "#555", fontSize: 10, textAlign: "center", lineHeight: 1.6, margin: 0 }}>
        Place your <code style={{ color: "#aaa" }}>.glb</code> file in{" "}
        <code style={{ color: "#aaa" }}>public/models/</code> and update the{" "}
        <code style={{ color: "#aaa" }}>modelUrl</code> prop.
      </p>

      <button
        onClick={onDismiss}
        style={{
          marginTop: 8,
          padding: "6px 18px",
          borderRadius: 6,
          border: "1px solid rgba(255,255,255,0.15)",
          background: "rgba(255,255,255,0.05)",
          color: "#aaa",
          fontSize: 11,
          cursor: "pointer",
          letterSpacing: "0.08em",
        }}
      >
        Dismiss &amp; show placeholder
      </button>
    </div>
  );
}