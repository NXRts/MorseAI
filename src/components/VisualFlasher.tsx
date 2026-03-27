'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface VisualFlasherProps {
  isActive: boolean;
  type?: 'dot' | 'dash' | 'space' | 'word-space' | null;
}

export const VisualFlasher = ({ isActive, type }: VisualFlasherProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-black/40 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        <motion.div
          animate={{
            scale: isActive ? [1, 1.2, 1] : 1,
            boxShadow: isActive 
              ? [
                  "0 0 0px rgba(0, 255, 255, 0)",
                  "0 0 50px rgba(0, 255, 255, 0.6)",
                  "0 0 20px rgba(0, 255, 255, 0.3)"
                ] 
              : "0 0 0px rgba(0, 255, 255, 0)",
          }}
          transition={{
            duration: type === 'dot' ? 0.1 : 0.3,
            ease: "easeInOut",
          }}
          className={`w-32 h-32 rounded-full flex items-center justify-center transition-colors duration-200 ${
            isActive ? 'bg-cyan-400' : 'bg-gray-800'
          }`}
        >
           <div className={`w-28 h-28 rounded-full border-4 border-white/20 flex items-center justify-center`}>
              <div className={`w-4 h-4 rounded-full ${isActive ? 'bg-white animate-pulse' : 'bg-white/10'}`} />
           </div>
        </motion.div>
      </div>

      <div className="mt-6 text-xs font-mono tracking-[0.5em] text-cyan-400 uppercase opacity-60">
        {isActive ? (type === 'dot' ? 'DOT' : 'DASH') : 'SIGNAL IDLE'}
      </div>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-4 right-4 text-cyan-300 font-bold text-2xl"
          >
            {type === 'dot' ? '•' : '—'}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
