// app/page.tsx
import ModelViewer from "@/3d-viewer/ModelViewer";
import markersData from "@/data/markers.json";

export default function Home() {
  return (
    <main style={{ padding: "40px", background: "#0a0a0a", minHeight: "100vh" }}>
      <h1 style={{ color: "#fff", fontFamily: "monospace", marginBottom: 24 }}>
        3D Model Viewer
      </h1>
      <ModelViewer
        modelUrl="/models/india_Sat_hybrid.glb"
        markers={markersData}
        height={600}
        autoRotate
      />
    </main>
  );
}