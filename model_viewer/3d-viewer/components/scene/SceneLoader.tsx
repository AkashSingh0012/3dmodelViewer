"use client";

// components/scene/SceneLoader.tsx
// Suspense fallback rendered inside the Canvas while the GLTF is fetching.
// Uses drei <Html> so it appears in 3D space at the canvas centre.

import { Html } from "@react-three/drei";

export default function SceneLoader() {
  return (
    <Html center>
      <p
        style={{
          color: "#fff",
          fontFamily: "monospace",
          fontSize: 13,
          opacity: 0.6,
          margin: 0,
          letterSpacing: "0.08em",
        }}
      >
        Loading model…
      </p>
    </Html>
  );
}