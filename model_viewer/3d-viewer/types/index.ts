// types/index.ts
// All shared types for the 3D viewer. Import from here everywhere else.

export interface MarkerData {
  id: string;
  name: string;
  x: number;
  y: number;
  z: number;
}

export interface ModelViewerProps {
  modelUrl: string;
  markers?: MarkerData[];
  width?: string | number;
  height?: string | number;
  autoRotate?: boolean;
  environmentPreset?: EnvironmentPreset;
  background?: string;
}

export type EnvironmentPreset =
  | "apartment"
  | "city"
  | "dawn"
  | "forest"
  | "lobby"
  | "night"
  | "park"
  | "studio"
  | "sunset"
  | "warehouse";