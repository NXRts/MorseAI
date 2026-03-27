import { useState, useEffect, useRef, useCallback } from 'react';
import { REVERSE_MORSE_MAP } from '../utils/morse-logic';

export const useMorseInput = () => {
  const [currentMorse, setCurrentMorse] = useState('');
  const [decodedText, setDecodedText] = useState('');
  const [isPressed, setIsPressed] = useState(false);
  
  const pressStartTime = useRef<number | null>(null);
  const lastReleaseTime = useRef<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const dotThreshold = 200; // ms
  const charBreak = 600; // ms
  const wordBreak = 1500; // ms

  const handlePress = useCallback(() => {
    if (isPressed) return;
    setIsPressed(true);
    pressStartTime.current = performance.now();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, [isPressed]);

  const handleRelease = useCallback(() => {
    if (!isPressed || pressStartTime.current === null) return;
    
    const duration = performance.now() - pressStartTime.current;
    const symbol = duration < dotThreshold ? '.' : '-';
    
    setCurrentMorse(prev => prev + symbol);
    setIsPressed(false);
    pressStartTime.current = null;
    lastReleaseTime.current = performance.now();

    // Set timeout to decode character
    timeoutRef.current = setTimeout(() => {
      decodeCharacter();
    }, charBreak);
  }, [isPressed]);

  const decodeCharacter = useCallback(() => {
    setCurrentMorse(prev => {
      if (!prev) return prev;
      const char = REVERSE_MORSE_MAP[prev] || '?';
      setDecodedText(t => t + char);
      return '';
    });
    
    // Set timeout for word break (space)
    timeoutRef.current = setTimeout(() => {
        setDecodedText(t => t.endsWith(' ') ? t : t + ' ');
    }, wordBreak - charBreak);
  }, [REVERSE_MORSE_MAP, wordBreak, charBreak]);

  const clear = () => {
    setCurrentMorse('');
    setDecodedText('');
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !e.repeat) {
        e.preventDefault();
        handlePress();
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        handleRelease();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [handlePress, handleRelease]);

  return { currentMorse, decodedText, isPressed, clear };
};
