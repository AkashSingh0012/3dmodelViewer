"use client";

// components/markers/MarkerLayer.tsx
// Iterates over the markers array and renders a MarkerPin for each entry.
// Lives inside the Canvas so it's part of the Three.js scene graph.

import MarkerPin from "./MarkerPin";
import type { MarkerData } from "../../types";

interface MarkerLayerProps {
  markers: MarkerData[];
  activeId: string | null;
  onSelect: (id: string | null) => void;
}

export default function MarkerLayer({ markers, activeId, onSelect }: MarkerLayerProps) {
  return (
    <>
      {markers.map((marker) => (
        <MarkerPin
          key={marker.id}
          marker={marker}
          isActive={activeId === marker.id}
          onSelect={onSelect}
        />
      ))}
    </>
  );
}