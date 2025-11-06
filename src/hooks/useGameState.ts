import { useState, useCallback, useEffect, useRef } from 'react';
import { GameState, Droplet, Difficulty, GameMode } from '../types';
import { GAME_CONFIG, ANIMATION_CONFIG } from '../constants';
import {
  createDroplet,
  updateDroplets,
  filterDroppedDroplets,
  calculateScore,
  isStageClear,
} from '../utils/gameLogic';

interface UseGameStateReturn {
  gameState: GameState;
  startGame: (mode: GameMode, stage?: number, difficulty?: Difficulty) => void;
  pauseGame: () => void;
  resumeGame: () => void;
  submitAnswer: (answer: number) => boolean;
  resetGame: () => void;
  goToMenu: () => void;
}

const initialState: GameState = {
  mode: 'menu',
  difficulty: 'normal',
  currentStage: 2,
  score: 0,
  lives: 3,
  combo: 0,
  maxCombo: 0,
  correctAnswers: 0,
  wrongAnswers: 0,
  totalQuestions: 0,
  droplets: [],
  isPaused: false,
  startTime: null,
  endTime: null,
};

export const useGameState = (): UseGameStateReturn => {
  const [gameState, setGameState] = useState<GameState>(initialState);
  const dropletIdCounter = useRef(0);
  const animationFrameRef = useRef<number>();
  const lastUpdateTimeRef = useRef<number>(Date.now());
  const spawnTimerRef = useRef<number>();

  // 게임 루프
  const gameLoop = useCallback(() => {
    if (gameState.isPaused || gameState.mode === 'menu' || gameState.mode === 'result') {
      return;
    }

    const now = Date.now();
    const deltaTime = now - lastUpdateTimeRef.current;
    lastUpdateTimeRef.current = now;

    setGameState(prev => {
      // 물방울 위치 업데이트
      const updatedDroplets = updateDroplets(prev.droplets, deltaTime);
      
      // 바닥에 닿은 물방울 필터링
      const { remaining, dropped } = filterDroppedDroplets(updatedDroplets);
      
      // 생명 감소
      const newLives = prev.lives - dropped.length;
      const newCombo = dropped.length > 0 ? 0 : prev.combo;
      
      // 게임 오버 체크
      if (newLives <= 0) {
        return {
          ...prev,
          lives: 0,
          combo: newCombo,
          droplets: remaining,
          mode: 'result',
          endTime: Date.now(),
        };
      }
      
      return {
        ...prev,
        droplets: remaining,
        lives: newLives,
        combo: newCombo,
      };
    });

    animationFrameRef.current = requestAnimationFrame(gameLoop);
  }, [gameState.isPaused, gameState.mode]);

  // 물방울 생성
  const spawnDroplet = useCallback(() => {
    if (gameState.isPaused || gameState.mode === 'menu' || gameState.mode === 'result') {
      return;
    }

    setGameState(prev => {
      const config = GAME_CONFIG.DIFFICULTY[prev.difficulty];
      
      // 최대 물방울 수 체크
      if (prev.droplets.length >= config.maxDroplets) {
        return prev;
      }
      
      // 스테이지 설정 (챌린지 모드는 undefined)
      const stage = prev.mode === 'challenge' ? undefined : prev.currentStage;
      
      const newDroplet = createDroplet(
        dropletIdCounter.current++,
        stage,
        config.dropSpeed
      );
      
      return {
        ...prev,
        droplets: [...prev.droplets, newDroplet],
        totalQuestions: prev.totalQuestions + 1,
      };
    });
  }, [gameState.isPaused, gameState.mode]);

  // 게임 시작
  const startGame = useCallback((mode: GameMode, stage: number = 2, difficulty: Difficulty = 'normal') => {
    const config = GAME_CONFIG.DIFFICULTY[difficulty];
    
    setGameState({
      ...initialState,
      mode,
      difficulty,
      currentStage: stage,
      lives: config.lives,
      startTime: Date.now(),
    });
    
    dropletIdCounter.current = 0;
    lastUpdateTimeRef.current = Date.now();
  }, []);

  // 일시정지
  const pauseGame = useCallback(() => {
    setGameState(prev => ({ ...prev, isPaused: true }));
  }, []);

  // 재개
  const resumeGame = useCallback(() => {
    setGameState(prev => ({ ...prev, isPaused: false }));
    lastUpdateTimeRef.current = Date.now();
  }, []);

  // 정답 제출
  const submitAnswer = useCallback((answer: number): boolean => {
    let isCorrect = false;
    
    setGameState(prev => {
      // 정답인 물방울 찾기
      const dropletIndex = prev.droplets.findIndex(d => d.answer === answer);
      
      if (dropletIndex === -1) {
        // 오답
        return {
          ...prev,
          wrongAnswers: prev.wrongAnswers + 1,
          combo: 0,
        };
      }
      
      // 정답
      isCorrect = true;
      const droplet = prev.droplets[dropletIndex];
      const newCombo = prev.combo + 1;
      const newMaxCombo = Math.max(prev.maxCombo, newCombo);
      const earnedScore = calculateScore(
        GAME_CONFIG.SCORE.BASE_POINTS,
        newCombo,
        Date.now() - (prev.startTime || Date.now()),
        droplet.createdAt
      );
      
      // 물방울 제거
      const newDroplets = prev.droplets.filter((_, index) => index !== dropletIndex);
      
      const newCorrectAnswers = prev.correctAnswers + 1;
      
      // 스테이지 클리어 체크 (스테이지 모드)
      if (prev.mode === 'stage' && isStageClear(newCorrectAnswers)) {
        const isLastStage = prev.currentStage >= GAME_CONFIG.MAX_STAGE;
        
        if (isLastStage) {
          // 모든 스테이지 클리어
          return {
            ...prev,
            score: prev.score + earnedScore + GAME_CONFIG.SCORE.PERFECT_STAGE_BONUS,
            combo: newCombo,
            maxCombo: newMaxCombo,
            correctAnswers: newCorrectAnswers,
            droplets: newDroplets,
            mode: 'result',
            endTime: Date.now(),
          };
        } else {
          // 다음 스테이지로
          return {
            ...prev,
            score: prev.score + earnedScore + GAME_CONFIG.SCORE.PERFECT_STAGE_BONUS,
            combo: newCombo,
            maxCombo: newMaxCombo,
            correctAnswers: 0, // 스테이지 정답 카운트 리셋
            currentStage: prev.currentStage + 1,
            droplets: [], // 물방울 초기화
          };
        }
      }
      
      return {
        ...prev,
        score: prev.score + earnedScore,
        combo: newCombo,
        maxCombo: newMaxCombo,
        correctAnswers: newCorrectAnswers,
        droplets: newDroplets,
      };
    });
    
    return isCorrect;
  }, []);

  // 게임 리셋
  const resetGame = useCallback(() => {
    setGameState(prev => ({
      ...initialState,
      mode: prev.mode,
      difficulty: prev.difficulty,
      currentStage: prev.currentStage,
      lives: GAME_CONFIG.DIFFICULTY[prev.difficulty].lives,
      startTime: Date.now(),
    }));
    dropletIdCounter.current = 0;
  }, []);

  // 메뉴로 돌아가기
  const goToMenu = useCallback(() => {
    setGameState(initialState);
  }, []);

  // 게임 루프 시작/정지
  useEffect(() => {
    if (gameState.mode !== 'menu' && gameState.mode !== 'result' && !gameState.isPaused) {
      lastUpdateTimeRef.current = Date.now();
      animationFrameRef.current = requestAnimationFrame(gameLoop);
      
      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }
  }, [gameState.mode, gameState.isPaused, gameLoop]);

  // 물방울 생성 타이머
  useEffect(() => {
    if (gameState.mode !== 'menu' && gameState.mode !== 'result' && !gameState.isPaused) {
      const config = GAME_CONFIG.DIFFICULTY[gameState.difficulty];
      
      spawnTimerRef.current = window.setInterval(() => {
        spawnDroplet();
      }, config.spawnInterval);
      
      // 첫 물방울 즉시 생성
      spawnDroplet();
      
      return () => {
        if (spawnTimerRef.current) {
          clearInterval(spawnTimerRef.current);
        }
      };
    }
  }, [gameState.mode, gameState.isPaused, gameState.difficulty, spawnDroplet]);

  return {
    gameState,
    startGame,
    pauseGame,
    resumeGame,
    submitAnswer,
    resetGame,
    goToMenu,
  };
};


