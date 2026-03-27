'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MeshBackground } from '@/components/MeshBackground';
import { BookOpen, Info, ArrowLeft, Zap } from 'lucide-react';
import Link from 'next/link';

const morseReference = [
  { char: 'A', morse: '· —' }, { char: 'B', morse: '— · · ·' }, { char: 'C', morse: '— · — ·' },
  { char: 'D', morse: '— · ·' }, { char: 'E', morse: '·' }, { char: 'F', morse: '· · — ·' },
  { char: 'G', morse: '— — ·' }, { char: 'H', morse: '· · · ·' }, { char: 'I', morse: '· ·' },
  { char: 'J', morse: '· — — —' }, { char: 'K', morse: '— · —' }, { char: 'L', morse: '· — · ·' },
  { char: 'M', morse: '— —' }, { char: 'N', morse: '— ·' }, { char: 'O', morse: '— — —' },
  { char: 'P', morse: '· — — ·' }, { char: 'Q', morse: '— — · —' }, { char: 'R', morse: '· — ·' },
  { char: 'S', morse: '· · ·' }, { char: 'T', morse: '—' }, { char: 'U', morse: '· · —' },
  { char: 'V', morse: '· · · —' }, { char: 'W', morse: '· — —' }, { char: 'X', morse: '— · · —' },
  { char: 'Y', morse: '— · — —' }, { char: 'Z', morse: '— — · ·' },
  { char: '1', morse: '· — — — —' }, { char: '2', morse: '· · — — —' }, { char: '3', morse: '· · · — —' },
  { char: '4', morse: '· · · · —' }, { char: '5', morse: '· · · · ·' }, { char: '6', morse: '— · · · ·' },
  { char: '7', morse: '— — · · ·' }, { char: '8', morse: '— — — · ·' }, { char: '9', morse: '— — — — ·' },
  { char: '0', morse: '— — — — —' },
];

export default function LearnPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-yellow-500/30 overflow-hidden relative">
      <MeshBackground />
      <Header />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          {/* Hero Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-yellow-500 text-[10px] font-mono tracking-widest uppercase">
                <BookOpen className="w-3 h-3" /> Training Protocol
              </div>
              <h1 className="text-5xl font-bold tracking-tighter text-white">Master the <span className="text-yellow-500">Code</span>.</h1>
              <p className="text-gray-400 text-lg leading-relaxed">
                Learn the signals that powered global communication for over a century. From emergency SOS to tactical transmissions.
              </p>
              <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group">
                 <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                 Back to Dashboard
              </Link>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               <div className="p-6 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md">
                  <div className="text-3xl font-bold text-yellow-500 mb-1">·</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Dot (Dit)</div>
                  <div className="text-xs text-gray-400 mt-2">1 Unit Duration</div>
               </div>
               <div className="p-6 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md">
                  <div className="text-3xl font-bold text-yellow-500 mb-1">—</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Dash (Dah)</div>
                  <div className="text-xs text-gray-400 mt-2">3 Unit Duration</div>
               </div>
            </div>
          </div>

          {/* Technical Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {[
               { title: "Symbol Gap", desc: "Gap between dots and dashes in a character is 1 unit.", icon: <Info className="w-4 h-4" /> },
               { title: "Letter Gap", desc: "Gap between letters in a word is 3 units.", icon: <Info className="w-4 h-4" /> },
               { title: "Word Gap", desc: "Gap between words in a sentence is 7 units.", icon: <Info className="w-4 h-4" /> },
             ].map((item, i) => (
                <div key={i} className="p-6 bg-black/40 border border-white/5 rounded-2xl flex gap-4">
                   <div className="text-yellow-500">{item.icon}</div>
                   <div>
                      <h3 className="text-sm font-bold text-white mb-1 uppercase tracking-wider">{item.title}</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                   </div>
                </div>
             ))}
          </div>

          {/* Reference Chart */}
          <div className="p-8 bg-black/40 backdrop-blur-xl rounded-[2.5rem] border border-white/10 shadow-2xl space-y-8">
            <div className="flex items-center justify-between border-b border-white/5 pb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-4">
                  <span className="w-3 h-8 bg-yellow-500 rounded-full shadow-[0_0_15px_rgba(234,179,8,0.4)]" />
                  Alphanumeric Protocol
              </h2>
              <div className="text-[10px] text-yellow-500 font-mono tracking-[0.3em] uppercase opacity-60">International Morse Standard</div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {morseReference.map(({ char, morse }, idx) => (
                <motion.div
                  key={char}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.02 }}
                  className="group p-5 bg-white/5 rounded-2xl border border-white/5 hover:bg-yellow-500/10 hover:border-yellow-500/30 transition-all cursor-default text-center relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                     <Zap className="w-8 h-8 text-yellow-500" />
                  </div>
                  <div className="text-4xl font-black text-white group-hover:text-yellow-500 transition-colors mb-2">{char}</div>
                  <div className="text-sm font-mono text-yellow-500/60 group-hover:text-yellow-500 transition-colors tracking-widest">{morse}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
