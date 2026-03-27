'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Zap } from 'lucide-react';

export const Header = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentMode = searchParams.get('mode') || 'encode';

  const isActive = (path: string, mode?: string) => {
    if (mode) {
      return pathname === path && currentMode === mode;
    }
    return pathname === path && !searchParams.get('mode');
  };

  return (
    <header className="relative z-10 p-8 flex items-center justify-between border-b border-white/5 backdrop-blur-sm">
      <Link href="/" className="flex items-center gap-3 group cursor-pointer text-inherit no-underline">
         <div className="w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.4)] group-hover:scale-110 transition-transform">
            <Zap className="text-black w-6 h-6 fill-black" />
         </div>
         <div>
            <h1 className="text-2xl font-bold tracking-tighter text-white">MORSE<span className="text-cyan-400">MEE</span></h1>
            <p className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">Protocol v2.4.0</p>
         </div>
      </Link>
      
      <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
         <Link 
           href="/?mode=decode"
           className={`transition-colors ${isActive('/', 'decode') ? 'text-emerald-400' : 'text-gray-400 hover:text-emerald-400'}`}
         >
           DECODE
         </Link>
         <Link 
           href="/?mode=encode"
           className={`transition-colors ${isActive('/', 'encode') ? 'text-cyan-400' : 'text-gray-400 hover:text-cyan-400'}`}
         >
           ENCODE
         </Link>
         <Link 
           href="/learn"
           className={`transition-colors ${pathname === '/learn' ? 'text-yellow-400' : 'text-gray-400 hover:text-yellow-400'}`}
         >
           LEARN
         </Link>
      </nav>

      <div className="flex items-center gap-4">
         <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
         <span className="text-[10px] font-mono text-green-500 tracking-widest uppercase">System Online</span>
      </div>
    </header>
  );
};
