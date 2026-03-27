'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Keyboard, Info, RotateCcw, Volume2, Settings, Zap, X, Sliders } from 'lucide-react';
import { textToMorse, morseToText } from '../utils/morse-logic';
import { useMorseAudio } from '../hooks/use-morse-audio';
import { useMorseInput } from '../hooks/use-morse-input';
import { VisualFlasher } from './VisualFlasher';

interface DashboardProps {
  activeMode: 'encode' | 'decode' | 'tapper';
  onModeChange: (mode: 'encode' | 'decode' | 'tapper') => void;
}

const Dashboard = ({ activeMode, onModeChange }: DashboardProps) => {
  const [inputText, setInputText] = useState('');
  const [morseInput, setMorseInput] = useState('');
  const { 
    playMorse, stopAudio, isPlaying, activeElement, startManualTone, stopManualTone,
    volume, setVolume, frequency, setFrequency, wpm, setWpm 
  } = useMorseAudio();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const { currentMorse, decodedText, isPressed, clear: clearManual } = useMorseInput({
    onPress: startManualTone,
    onRelease: stopManualTone
  });

  const morseOutput = textToMorse(inputText);
  const textOutput = morseToText(morseInput);

  useEffect(() => {
    if (isSettingsOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSettingsOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsSettingsOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const handlePlay = () => {
    if (activeMode === 'encode' && morseOutput) playMorse(morseOutput);
    if (activeMode === 'decode' && morseInput) playMorse(morseInput);
  };


  return (
    <div className="flex flex-col min-h-[calc(100vh-12rem)] max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Top Section: Switcher & Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 shadow-xl">
        <div className="flex space-x-2 bg-black/40 p-1.5 rounded-2xl border border-white/5">
          <button
            onClick={() => onModeChange('encode')}
            className={`px-6 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
              activeMode === 'encode' ? 'bg-cyan-500 text-black shadow-[0_0_20px_rgba(6,182,212,0.4)]' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Send className="w-4 h-4" />
            Encode
          </button>
          <button
            onClick={() => onModeChange('decode')}
            className={`px-6 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
              activeMode === 'decode' ? 'bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.4)]' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Zap className="w-4 h-4" />
            Decode
          </button>
          <button
            onClick={() => onModeChange('tapper')}
            className={`px-6 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
              activeMode === 'tapper' ? 'bg-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Keyboard className="w-4 h-4" />
            Tapper
          </button>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 text-gray-400 text-sm group relative">
             <Volume2 className="w-4 h-4 group-hover:text-cyan-400 transition-colors" />
             <div className="w-32 h-1.5 bg-gray-800 rounded-full overflow-hidden relative cursor-pointer">
                <div 
                  className="absolute inset-y-0 left-0 bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)] transition-all duration-150" 
                  style={{ width: `${volume * 100}%` }}
                />
                <input 
                  type="range" 
                  min="0" 
                  max="1" 
                  step="0.01" 
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
             </div>
          </div>
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all hover:scale-105 active:scale-95 text-gray-400 hover:text-cyan-400 border border-white/5"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Input/Translation Panel */}
        <div className="space-y-6">
          {activeMode === 'encode' && (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-8 bg-black/40 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                    <span className="w-2 h-6 bg-cyan-500 rounded-full" />
                    Encode Message
                </h2>
                <div className="text-xs text-cyan-400 font-mono tracking-widest opacity-60">ENG → MORSE</div>
              </div>
              
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type English message here..."
                className="w-full h-40 bg-zinc-900/50 border border-white/5 rounded-2xl p-6 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all text-lg font-light resize-none"
              />

              <div className="flex gap-4">
                <button
                  onClick={handlePlay}
                  disabled={!inputText || isPlaying}
                  className="flex-1 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold py-4 rounded-2xl shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-3"
                >
                   <Zap className={`w-5 h-5 ${isPlaying ? 'animate-bounce' : ''}`} />
                   {isPlaying ? 'TRANSMITTING...' : 'SEND SIGNAL'}
                </button>
                <button
                  onClick={() => setInputText('')}
                  className="p-4 bg-white/5 hover:bg-red-500/20 rounded-2xl text-gray-400 hover:text-red-400 transition-all border border-white/5"
                >
                   <RotateCcw className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {activeMode === 'decode' && (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-8 bg-black/40 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                    <span className="w-2 h-6 bg-emerald-500 rounded-full" />
                    Decode Morse
                </h2>
                <div className="text-xs text-emerald-400 font-mono tracking-widest opacity-60">MORSE → ENG</div>
              </div>
              
              <textarea
                value={morseInput}
                onChange={(e) => setMorseInput(e.target.value)}
                placeholder="Paste Morse code here (use spaces between letters and / between words)..."
                className="w-full h-40 bg-zinc-900/50 border border-white/5 rounded-2xl p-6 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-lg font-mono resize-none"
              />

              <div className="flex gap-4">
                <button
                  onClick={handlePlay}
                  disabled={!morseInput || isPlaying}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold py-4 rounded-2xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-3"
                >
                   <Zap className={`w-5 h-5 ${isPlaying ? 'animate-bounce' : ''}`} />
                   {isPlaying ? 'TRANSMITTING...' : 'SEND SIGNAL'}
                </button>
                <button
                  onClick={() => setMorseInput('')}
                  className="p-4 bg-white/5 hover:bg-red-500/20 rounded-2xl text-gray-400 hover:text-red-400 transition-all border border-white/5"
                >
                   <RotateCcw className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {activeMode === 'tapper' && (
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               className="p-8 bg-black/40 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                    <span className="w-2 h-6 bg-purple-500 rounded-full" />
                    Manual Tapper
                </h2>
                <div className="text-xs text-purple-400 font-mono tracking-widest opacity-60">TAP → ENG</div>
              </div>

              <div className="h-40 bg-zinc-900/50 border border-white/5 rounded-2xl p-6 flex flex-col justify-between">
                <div className="text-gray-600 text-sm font-mono mb-2">OUTPUT LOG</div>
                <div className="text-2xl text-white font-bold tracking-wider truncate">
                  {decodedText || <span className="text-gray-700 animate-pulse">Waiting for input...</span>}
                </div>
                <div className="mt-4 text-purple-400 font-mono text-xl tracking-[1em]">
                   {currentMorse || "— — —"}
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-1 flex items-center justify-center bg-purple-900/20 border border-purple-500/30 rounded-2xl text-purple-300 font-mono text-sm py-4">
                   {isPressed ? 'SIGNAL ACTIVE' : 'PRESS SPACEBAR'}
                </div>
                <button
                  onClick={clearManual}
                  className="p-4 bg-white/5 hover:bg-red-500/20 rounded-2xl text-gray-400 hover:text-red-400 transition-all border border-white/5"
                >
                   <RotateCcw className="w-5 h-5" />
                </button>
              </div>
              <p className="text-[10px] text-gray-500 italic text-center uppercase tracking-widest">
                 DURATIONS [ DOT: &lt;200ms / DASH: &gt;200ms ]
              </p>
            </motion.div>
          )}


          {/* Visualization of Translation */}
          <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
             <div className="text-[10px] text-gray-500 font-mono uppercase tracking-[0.3em] mb-4">Live Translation Stream</div>
             <div className="text-2xl font-mono text-cyan-500 tracking-[0.5em] h-12 flex items-center overflow-x-auto whitespace-nowrap custom-scrollbar">
                {activeMode === 'encode' ? (morseOutput || "...") : (activeMode === 'decode' ? (textOutput || "...") : (decodedText || "..."))}
             </div>
          </div>
        </div>

        {/* Real-time Indicator Panel */}
        <div className="sticky top-8">
           <VisualFlasher 
             isActive={isPlaying ? activeElement !== null : isPressed} 
             type={isPlaying ? activeElement?.type : (isPressed ? null : null)} 
           />
           
           <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                 <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Frequency</div>
                 <div className="text-lg text-white font-mono">600 Hz</div>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                 <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Base Speed</div>
                 <div className="text-lg text-white font-mono">100 ms</div>
              </div>
           </div>
        </div>
      </div>
      <AnimatePresence>
        {isSettingsOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSettingsOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-zinc-900 border border-white/10 rounded-[2.5rem] p-8 shadow-2xl overflow-hidden"
            >
              {/* Background Glow */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/10 blur-[60px] rounded-full" />
              
              <div className="flex items-center justify-between mb-8 cursor-default">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/5 rounded-xl border border-white/10">
                    <Sliders className="w-5 h-5 text-cyan-400" />
                  </div>
                  <h2 className="text-xl font-bold text-white tracking-tight">Signal Parameters</h2>
                </div>
                <button 
                  onClick={() => setIsSettingsOpen(false)}
                  className="relative z-[110] p-3 hover:bg-white/10 rounded-full transition-colors text-gray-500 hover:text-white group"
                  aria-label="Close Settings"
                >
                  <X className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </button>
              </div>

              <div className="space-y-8">
                {/* WPM Setting */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                       Speed <span className="text-[10px] bg-cyan-500/10 text-cyan-400 px-1.5 py-0.5 rounded border border-cyan-500/20">WPM</span>
                    </label>
                    <span className="text-lg font-mono font-bold text-white">{wpm}</span>
                  </div>
                  <input 
                    type="range" 
                    min="5" 
                    max="40" 
                    value={wpm}
                    onChange={(e) => setWpm(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-gray-800 rounded-full appearance-none cursor-pointer accent-cyan-500"
                  />
                  <div className="flex justify-between text-[10px] text-gray-600 font-mono uppercase tracking-widest px-1">
                    <span>Tactical (5)</span>
                    <span>Expert (40)</span>
                  </div>
                </div>

                {/* Pitch Setting */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                       Pitch <span className="text-[10px] bg-purple-500/10 text-purple-400 px-1.5 py-0.5 rounded border border-purple-500/20">HZ</span>
                    </label>
                    <span className="text-lg font-mono font-bold text-white">{frequency}</span>
                  </div>
                  <input 
                    type="range" 
                    min="300" 
                    max="1000" 
                    step="10"
                    value={frequency}
                    onChange={(e) => setFrequency(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-gray-800 rounded-full appearance-none cursor-pointer accent-purple-500"
                  />
                  <div className="flex justify-between text-[10px] text-gray-600 font-mono uppercase tracking-widest px-1">
                    <span>Low (300)</span>
                    <span>High (1000)</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setIsSettingsOpen(false)}
                className="w-full mt-10 py-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl text-white font-medium transition-all hover:border-cyan-500/30"
              >
                CLOSE PROTOCOL
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
