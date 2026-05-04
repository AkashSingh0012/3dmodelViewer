"use client";

// components/ui/MarkerLegend.tsx
// Overlay panel (top-right) listing every marker as a clickable button.
// Clicking a button selects / deselects that marker, mirroring the in-scene sphere click.

import type { MarkerData } from "../../types";

interface MarkerLegendProps {
  markers: MarkerData[];
  activeId: string | null;
  onSelect: (id: string | null) => void;
}

export default function MarkerLegend({ markers, activeId, onSelect }: MarkerLegendProps) {
  if (markers.length === 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: 16,
        right: 16,
        display: "flex",
        flexDirection: "column",
        gap: 6,
      }}
    >
      {markers.map((m) => {
        const isActive = activeId === m.id;
        return (
          <button
            key={m.id}
            onClick={() => onSelect(isActive ? null : m.id)}
            style={{
              padding: "5px 12px",
              borderRadius: 5,
              border: `1px solid ${isActive ? "rgba(255,100,100,0.6)" : "rgba(255,255,255,0.12)"}`,
              background: isActive ? "rgba(255,68,68,0.2)" : "rgba(0,0,0,0.5)",
              color: isActive ? "#ff9999" : "#ccc",
              fontSize: 11,
              letterSpacing: "0.06em",
              cursor: "pointer",
              backdropFilter: "blur(6px)",
              textAlign: "left",
              transition: "all 0.15s",
            }}
          >
            ● {m.name}
          </button>
        );
      })}
    </div>
  );
}