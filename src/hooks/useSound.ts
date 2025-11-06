import { useCallback, useEffect, useRef } from 'react';
import { Settings } from '../types';

export type SoundType = 'correct' | 'wrong' | 'drop' | 'combo' | 'gameOver';

export const useSound = (settings: Settings) => {
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Web Audio API 초기화 (실제 사운드 파일 없이 비프음 생성)
    if (typeof window !== 'undefined' && settings.soundEnabled) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [settings.soundEnabled]);

  const playSound = useCallback((type: SoundType) => {
    if (!settings.soundEnabled || !audioContextRef.current) return;

    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    // 볼륨 설정
    gainNode.gain.value = settings.volume * 0.3;

    // 사운드 타입별 주파수와 길이 설정
    switch (type) {
      case 'correct':
        // 정답: 상승하는 톤
        oscillator.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        oscillator.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.1); // G5
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.15);
        break;

      case 'wrong':
        // 오답: 하강하는 톤
        oscillator.frequency.setValueAtTime(392.00, ctx.currentTime); // G4
        oscillator.frequency.exponentialRampToValueAtTime(196.00, ctx.currentTime + 0.2); // G3
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.25);
        break;

      case 'drop':
        // 물방울 떨어짐: 낮은 톤
        oscillator.frequency.setValueAtTime(130.81, ctx.currentTime); // C3
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.3);
        break;

      case 'combo':
        // 콤보: 빠른 연속음
        oscillator.frequency.setValueAtTime(659.25, ctx.currentTime); // E5
        oscillator.frequency.exponentialRampToValueAtTime(1046.50, ctx.currentTime + 0.08); // C6
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.1);
        break;

      case 'gameOver':
        // 게임 오버: 하강하는 긴 톤
        oscillator.frequency.setValueAtTime(440.00, ctx.currentTime); // A4
        oscillator.frequency.exponentialRampToValueAtTime(110.00, ctx.currentTime + 0.5); // A2
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.6);
        break;
    }
  }, [settings.soundEnabled, settings.volume]);

  return { playSound };
};


