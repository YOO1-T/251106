// 게임 모드
export type GameMode = 'menu' | 'practice' | 'stage' | 'challenge' | 'result';

// 난이도
export type Difficulty = 'easy' | 'normal' | 'hard';

// 물방울 상태
export interface Droplet {
  id: number;
  multiplier1: number;
  multiplier2: number;
  answer: number;
  x: number; // 화면의 x 좌표 (0-100%)
  y: number; // 화면의 y 좌표 (0-100%)
  speed: number; // 떨어지는 속도
  createdAt: number; // 생성 시간
}

// 게임 상태
export interface GameState {
  mode: GameMode;
  difficulty: Difficulty;
  currentStage: number; // 현재 단 (2-9)
  score: number;
  lives: number;
  combo: number;
  maxCombo: number;
  correctAnswers: number;
  wrongAnswers: number;
  totalQuestions: number;
  droplets: Droplet[];
  isPaused: boolean;
  startTime: number | null;
  endTime: number | null;
}

// 통계
export interface Statistics {
  stageProgress: { [key: number]: number }; // 각 단별 정답률
  totalGamesPlayed: number;
  totalCorrectAnswers: number;
  totalWrongAnswers: number;
  highScores: {
    practice: { [key: number]: number };
    stage: number;
    challenge: number;
  };
  badges: string[];
  weakProblems: { problem: string; wrongCount: number }[];
}

// 설정
export interface Settings {
  soundEnabled: boolean;
  musicEnabled: boolean;
  volume: number;
  inputMethod: 'keyboard' | 'buttons' | 'both';
  hintsEnabled: boolean;
  theme: 'light' | 'dark';
}

// 배지
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: number;
}


