import { Difficulty, Settings } from '../types';

// 게임 설정
export const GAME_CONFIG = {
  MIN_STAGE: 2,
  MAX_STAGE: 9,
  STAGE_CLEAR_REQUIREMENT: 10, // 스테이지 클리어에 필요한 정답 수
  
  // 난이도별 설정
  DIFFICULTY: {
    easy: {
      dropSpeed: 0.3, // 초당 이동 거리 (%)
      maxDroplets: 2,
      lives: 5,
      spawnInterval: 3000, // ms
    },
    normal: {
      dropSpeed: 0.5,
      maxDroplets: 3,
      lives: 3,
      spawnInterval: 2500,
    },
    hard: {
      dropSpeed: 0.8,
      maxDroplets: 5,
      lives: 3,
      spawnInterval: 2000,
    },
  } as Record<Difficulty, {
    dropSpeed: number;
    maxDroplets: number;
    lives: number;
    spawnInterval: number;
  }>,
  
  // 점수 시스템
  SCORE: {
    BASE_POINTS: 10,
    COMBO_BONUS: {
      5: 20,
      10: 50,
      15: 100,
    },
    SPEED_BONUS_MAX: 5,
    PERFECT_STAGE_BONUS: 200,
  },
};

// 애니메이션 설정
export const ANIMATION_CONFIG = {
  FRAME_INTERVAL: 16, // ~60fps
  DROPLET_SIZE: 80, // px
};

// 배지 정의
export const BADGES = [
  {
    id: 'first-stage',
    name: '구구단 초보',
    description: '첫 스테이지 클리어',
    icon: '🌱',
  },
  {
    id: 'stage-2-master',
    name: '2단 마스터',
    description: '2단 연습모드 30문제 연속 정답',
    icon: '🥉',
  },
  {
    id: 'stage-5-master',
    name: '5단 마스터',
    description: '5단 연습모드 30문제 연속 정답',
    icon: '🥈',
  },
  {
    id: 'stage-9-master',
    name: '9단 마스터',
    description: '9단 연습모드 30문제 연속 정답',
    icon: '🥇',
  },
  {
    id: 'all-master',
    name: '구구단 천재',
    description: '모든 단 마스터',
    icon: '🏆',
  },
  {
    id: 'perfectionist',
    name: '완벽주의자',
    description: '한 스테이지 무실수 클리어',
    icon: '💎',
  },
  {
    id: 'combo-king',
    name: '집중력 왕',
    description: '50콤보 달성',
    icon: '🔥',
  },
];

// 기본 설정
export const DEFAULT_SETTINGS: Settings = {
  soundEnabled: true,
  musicEnabled: true,
  volume: 0.7,
  inputMethod: 'both',
  hintsEnabled: false,
  theme: 'light',
};

// 로컬 스토리지 키
export const STORAGE_KEYS = {
  STATISTICS: 'multiplication-rain-stats',
  SETTINGS: 'multiplication-rain-settings',
  HIGH_SCORES: 'multiplication-rain-high-scores',
};


