'use client';

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Dashboard from "@/components/Dashboard";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MeshBackground } from "@/components/MeshBackground";

function DashboardContent() {
  const searchParams = useSearchParams();
  const mode = (searchParams.get('mode') as 'encode' | 'decode' | 'tapper') || 'encode';

  return (
    <Dashboard 
      activeMode={mode} 
      onModeChange={(newMode) => {
        const url = new URL(window.location.href);
        url.searchParams.set('mode', newMode);
        window.history.pushState({}, '', url.toString());
      }} 
    />
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-cyan-500/30 overflow-hidden relative">
      <MeshBackground />
      
      <Suspense fallback={null}>
        <Header />
      </Suspense>

      <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-cyan-500 font-mono">INITIALIZING PROTOCOL...</div>}>
        <DashboardContent />
      </Suspense>

      <Footer />
    </main>
  );
}
