"use client";

// components/markers/MarkerPin.tsx
// A single interactive marker rendered in 3D space at (x, y, z).
// Consists of:
//   - A clickable sphere (pulses when active, highlights on hover)
//   - A short vertical stem line below the sphere
//   - An always-visible name label via drei <Html>
//   - A coordinate tooltip that appears only when the marker is active

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import type { MarkerData } from "../../types";

interface MarkerPinProps {
  marker: MarkerData;
  isActive: boolean;
  onSelect: (id: string | null) => void;
}

export default function MarkerPin({ marker, isActive, onSelect }: MarkerPinProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  // Pulse animation when active; subtle scale-up on hover
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const scale = isActive
      ? 1 + Math.sin(clock.getElapsedTime() * 4) * 0.1
      : hovered
      ? 1.15
      : 1;
    meshRef.current.scale.setScalar(scale);
  });

  const color      = isActive ? "#ff4444" : hovered ? "#ff9933" : "#ffffff";
  const emissive   = isActive ? "#ff2222" : hovered ? "#ff6600" : "#888888";
  const stemColor  = isActive ? "#ff4444" : "#aaaaaa";
  const labelBg    = isActive ? "rgba(255,68,68,0.92)" : "rgba(10,10,10,0.78)";
  const labelBorder = isActive ? "#ff6666" : "rgba(255,255,255,0.15)";

  return (
    <group position={[marker.x, marker.y, marker.z]}>

      {/* ── Clickable sphere ── */}
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(isActive ? null : marker.id);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
      >
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={isActive ? 1.2 : 0.5}
          roughness={0.2}
          metalness={0.5}
        />
      </mesh>

      {/* ── Stem line ── */}
      <line>
        <bufferGeometry
          onUpdate={(self) =>
            self.setFromPoints([
              new THREE.Vector3(0, 0, 0),
              new THREE.Vector3(0, -0.18, 0),
            ])
          }
        />
        <lineBasicMaterial color={stemColor} />
      </line>

      {/* ── Always-visible name label ── */}
      <Html
        position={[0.1, 0.1, 0]}
        distanceFactor={4}
        occlude
        style={{ pointerEvents: "none" }}
      >
        <div
          style={{
            background: labelBg,
            color: "#fff",
            padding: "4px 10px",
            borderRadius: 5,
            fontSize: 11,
            fontFamily: "monospace",
            letterSpacing: "0.06em",
            whiteSpace: "nowrap",
            border: `1px solid ${labelBorder}`,
            backdropFilter: "blur(4px)",
            userSelect: "none",
          }}
        >
          {marker.name}
        </div>
      </Html>

      {/* ── Active tooltip showing X / Y / Z ── */}
      {isActive && (
        <Html position={[0.12, -0.28, 0]} distanceFactor={4}>
          <div
            style={{
              background: "rgba(10,10,10,0.92)",
              color: "#eee",
              padding: "8px 12px",
              borderRadius: 6,
              fontSize: 11,
              fontFamily: "monospace",
              border: "1px solid rgba(255,100,100,0.4)",
              minWidth: 160,
              backdropFilter: "blur(6px)",
              userSelect: "none",
            }}
          >
            <p style={{ color: "#ff6666", margin: "0 0 6px", fontWeight: "bold" }}>
              {marker.name}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 2, opacity: 0.7, fontSize: 10 }}>
              <span>X: {marker.x.toFixed(3)}</span>
              <span>Y: {marker.y.toFixed(3)}</span>
              <span>Z: {marker.z.toFixed(3)}</span>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}