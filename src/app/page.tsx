'use client';

import { useState } from "react";
import Dashboard from "@/components/Dashboard";
import { Zap, Shield, Laptop, BookOpen } from "lucide-react";

export default function Home() {
  const [mode, setMode] = useState<'encode' | 'decode' | 'tapper' | 'learn'>('encode');

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-cyan-500/30 overflow-hidden relative">
      {/* Mesh Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-cyan-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-purple-500/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      <header className="relative z-10 p-8 flex items-center justify-between border-b border-white/5 backdrop-blur-sm">
        <div className="flex items-center gap-3 group cursor-default">
           <div className="w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.4)] group-hover:scale-110 transition-transform">
              <Zap className="text-black w-6 h-6 fill-black" />
           </div>
           <div>
              <h1 className="text-2xl font-bold tracking-tighter text-white">MORSE<span className="text-cyan-400">MEE</span></h1>
              <p className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">Protocol v2.4.0</p>
           </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
           <button 
             onClick={() => setMode('decode')}
             className={`transition-colors ${mode === 'decode' ? 'text-emerald-400' : 'text-gray-400 hover:text-emerald-400'}`}
           >
             DECODE
           </button>
           <button 
             onClick={() => setMode('encode')}
             className={`transition-colors ${mode === 'encode' ? 'text-cyan-400' : 'text-gray-400 hover:text-cyan-400'}`}
           >
             ENCODE
           </button>
           <button 
             onClick={() => setMode('learn')}
             className={`transition-colors ${mode === 'learn' ? 'text-yellow-400' : 'text-gray-400 hover:text-yellow-400'}`}
           >
             LEARN
           </button>
        </nav>

        <div className="flex items-center gap-4">
           <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
           <span className="text-[10px] font-mono text-green-500 tracking-widest uppercase">System Online</span>
        </div>
      </header>

      <Dashboard activeMode={mode} onModeChange={setMode} />

      <footer className="relative z-10 border-t border-white/5 py-8 mt-12 bg-black/40 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="flex items-center gap-6 text-[10px] text-gray-600 font-mono tracking-widest uppercase">
              <div className="flex items-center gap-2">
                 <Shield className="w-3 h-3" /> Encrypted
              </div>
              <div className="flex items-center gap-2">
                 <Laptop className="w-3 h-3" /> P2P Ready
              </div>
           </div>
           <div className="text-[10px] text-gray-700 font-mono tracking-widest uppercase">
              © 2026 NXRts. ALL SIGNALS SECURED.
           </div>
        </div>
      </footer>
    </main>
  );
}
