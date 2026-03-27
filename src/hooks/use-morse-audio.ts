import { useState, useCallback, useRef } from 'react';

export type MorseElement = {
  type: 'dot' | 'dash' | 'space' | 'word-space';
  duration: number;
};

export const useMorseAudio = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeElement, setActiveElement] = useState<MorseElement | null>(null);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const dotDuration = 100; // ms
  const dashDuration = dotDuration * 3;
  const elementSpace = dotDuration;
  const characterSpace = dotDuration * 3;
  const wordSpace = dotDuration * 7;
  const frequency = 600;

  const initAudio = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      gainNodeRef.current = audioContextRef.current.createGain();
      gainNodeRef.current.connect(audioContextRef.current.destination);
      gainNodeRef.current.gain.value = 0;
    }
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
  };

  const playBeep = (duration: number) => {
    return new Promise<void>((resolve) => {
      initAudio();
      const ctx = audioContextRef.current!;
      const gain = gainNodeRef.current!;

      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      osc.connect(gain);
      
      const startTime = ctx.currentTime;
      const endTime = startTime + duration / 1000;

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.2, startTime + 0.005);
      gain.gain.setValueAtTime(0.2, endTime - 0.005);
      gain.gain.linearRampToValueAtTime(0, endTime);

      osc.start(startTime);
      osc.stop(endTime);

      setTimeout(() => {
        osc.disconnect();
        resolve();
      }, duration);
    });
  };

  const playMorse = async (morse: string) => {
    if (isPlaying) return;
    setIsPlaying(true);
    initAudio();

    const words = morse.split(' / ');
    for (let i = 0; i < words.length; i++) {
      const characters = words[i].split(' ');
      for (let j = 0; j < characters.length; j++) {
        const symbols = characters[j].split('');
        for (let k = 0; k < symbols.length; k++) {
          const symbol = symbols[k];
          const type = symbol === '.' ? 'dot' : 'dash';
          const duration = symbol === '.' ? dotDuration : dashDuration;
          
          setActiveElement({ type, duration });
          await playBeep(duration);
          setActiveElement(null);
          
          if (k < symbols.length - 1) {
            await new Promise(r => setTimeout(r, elementSpace));
          }
        }
        if (j < characters.length - 1) {
          await new Promise(r => setTimeout(r, characterSpace));
        }
      }
      if (i < words.length - 1) {
        await new Promise(r => setTimeout(r, wordSpace));
      }
    }

    setIsPlaying(false);
  };

  const stopAudio = () => {
    setIsPlaying(false);
    setActiveElement(null);
    if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
    }
  };

  const manualOscRef = useRef<OscillatorNode | null>(null);

  const startManualTone = () => {
    initAudio();
    const ctx = audioContextRef.current!;
    const gain = gainNodeRef.current!;

    if (manualOscRef.current) return;

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    osc.connect(gain);
    
    gain.gain.cancelScheduledValues(ctx.currentTime);
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.005);

    osc.start();
    manualOscRef.current = osc;
  };

  const stopManualTone = () => {
    if (!manualOscRef.current || !audioContextRef.current) return;
    const ctx = audioContextRef.current;
    const gain = gainNodeRef.current!;
    const osc = manualOscRef.current;

    gain.gain.cancelScheduledValues(ctx.currentTime);
    gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.005);

    setTimeout(() => {
      osc.stop();
      osc.disconnect();
      if (manualOscRef.current === osc) {
        manualOscRef.current = null;
      }
    }, 10);
  };

  return { playMorse, stopAudio, isPlaying, activeElement, startManualTone, stopManualTone };
};
