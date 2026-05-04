"use client";

// components/scene/Model.tsx
// Loads a .glb / .gltf file and optionally auto-rotates it.
// Throws a Promise for Suspense while loading, calls onError on failure.

import { useRef } from "react";
import { useGLTF, Center } from "@react-three/drei";
import * as THREE from "three";

interface ModelProps {
  url: string;
  onError: (message: string) => void;
}

export default function Model({ url, onError }: ModelProps) {
  // useGLTF suspends (throws Promise) while loading — Suspense handles that.
  // A real error (404, parse failure) is caught and forwarded via onError.
  let gltf: ReturnType<typeof useGLTF>;
  try {
    gltf = useGLTF(url);
  } catch (e: unknown) {
    if (e instanceof Promise) throw e; // let Suspense handle loading state
    onError(e instanceof Error ? e.message : String(e));
    return null;
  }

  // Clone so the same asset can be mounted more than once safely
  const cloned = gltf.scene.clone(true);

  return (
    <Center>
      <primitive object={cloned} />
    </Center>
  );
}