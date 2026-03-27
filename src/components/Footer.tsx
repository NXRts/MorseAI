'use client';

import React from 'react';
import { Shield, Laptop } from 'lucide-react';

export const Footer = () => {
  return (
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
  );
};
