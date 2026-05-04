"use client";

// ModelViewer.tsx
// Root component — composes the Canvas, scene pieces, and UI overlays.
// All logic lives in the sub-components; this file only wires state together.

import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

// Scene
import Model          from "./components/scene/Model";
import PlaceholderBox from "./components/scene/PlaceholderBox";
import SceneLoader    from "./components/scene/SceneLoader";

// Markers
import MarkerLayer    from "./components/markers/MarkerLayer";

// UI overlays
import ErrorOverlay   from "./components/ui/ErrorOverlay";
import RotateToggle   from "./components/ui/RotateToggle";
import MarkerLegend   from "./components/ui/MarkerLegend";

// Types
import type { ModelViewerProps } from "./types";

export default function ModelViewer({
  modelUrl,
  markers = [],
  width = "100%",
  height = 500,
  autoRotate = true,
  environmentPreset = "studio",
  background = "#111111",
}: ModelViewerProps) {
  const [isRotating,     setIsRotating]     = useState(autoRotate);
  const [activeMarkerId, setActiveMarkerId] = useState<string | null>(null);
  const [loadError,      setLoadError]      = useState<string | null>(null);
  const [errorDismissed, setErrorDismissed] = useState(false);

  const modelFailed  = loadError !== null;
  const showModel    = !modelFailed;          // swap to PlaceholderBox once an error fires
  const showOverlay  = modelFailed && !errorDismissed;

  return (
    <div
      style={{
        width,
        height,
        background,
        borderRadius: 12,
        overflow: "hidden",
        position: "relative",
        fontFamily: "monospace",
      }}
    >
      {/* ── Error overlay (DOM, above the canvas) ── */}
      {showOverlay && (
        <ErrorOverlay
          message={loadError!}
          onDismiss={() => setErrorDismissed(true)}
        />
      )}

      {/* ── Three.js canvas ── */}
      <Canvas
        camera={{ position: [0, 1.5, 4], fov: 45, near: 0.1, far: 1000 }}
        shadows
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
        onClick={() => setActiveMarkerId(null)}   // deselect marker on empty click
      >
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight castShadow position={[5, 8, 5]} intensity={1.5} />

        {/* Environment & shadows */}
        <Environment preset={environmentPreset} />
        <ContactShadows position={[0, -1.5, 0]} opacity={0.6} scale={10} blur={2} far={4} />

        {/* Model or placeholder */}
        <Suspense fallback={<SceneLoader />}>
          {showModel ? (
            <Model
              url={modelUrl}
              onError={setLoadError}
            />
          ) : (
            <PlaceholderBox autoRotate={isRotating} />
          )}
        </Suspense>

        {/* Markers */}
        <MarkerLayer
          markers={markers}
          activeId={activeMarkerId}
          onSelect={setActiveMarkerId}
        />

        {/* Camera controls */}
        <OrbitControls
          enablePan
          enableZoom
          enableRotate
          minDistance={1}
          maxDistance={20}
          onStart={() => setIsRotating(false)}  // pause rotation while orbiting
        />
      </Canvas>

      {/* ── DOM overlays ── */}
      <RotateToggle
        isRotating={isRotating}
        onToggle={() => setIsRotating((r) => !r)}
      />

      <MarkerLegend
        markers={markers}
        activeId={activeMarkerId}
        onSelect={setActiveMarkerId}
      />
    </div>
  );
}