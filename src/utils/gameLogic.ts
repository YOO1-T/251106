import { Droplet, GameState } from '../types';
import { GAME_CONFIG } from '../constants';

// 랜덤 곱셈 문제 생성
export const generateProblem = (stage?: number): { multiplier1: number; multiplier2: number; answer: number } => {
  let multiplier1: number;
  let multiplier2: number;
  
  if (stage !== undefined) {
    // 특정 단 (연습 모드 또는 스테이지 모드)
    multiplier1 = stage;
    multiplier2 = Math.floor(Math.random() * 9) + 1;
  } else {
    // 랜덤 (챌린지 모드)
    multiplier1 = Math.floor(Math.random() * 8) + 2; // 2-9
    multiplier2 = Math.floor(Math.random() * 9) + 1; // 1-9
  }
  
  return {
    multiplier1,
    multiplier2,
    answer: multiplier1 * multiplier2,
  };
};

// 새 물방울 생성
export const createDroplet = (id: number, stage: number | undefined, speed: number): Droplet => {
  const problem = generateProblem(stage);
  
  return {
    id,
    ...problem,
    x: Math.random() * 90 + 5, // 5-95% (양쪽 여백 고려)
    y: -10, // 화면 위에서 시작
    speed,
    createdAt: Date.now(),
  };
};

// 물방울 위치 업데이트
export const updateDroplets = (droplets: Droplet[], deltaTime: number): Droplet[] => {
  return droplets.map(droplet => ({
    ...droplet,
    y: droplet.y + (droplet.speed * deltaTime / 1000) * 100, // 초당 speed% 이동
  }));
};

// 바닥에 닿은 물방울 필터링
export const filterDroppedDroplets = (droplets: Droplet[]): { remaining: Droplet[]; dropped: Droplet[] } => {
  const remaining: Droplet[] = [];
  const dropped: Droplet[] = [];
  
  droplets.forEach(droplet => {
    if (droplet.y >= 100) {
      dropped.push(droplet);
    } else {
      remaining.push(droplet);
    }
  });
  
  return { remaining, dropped };
};

// 점수 계산
export const calculateScore = (
  baseScore: number,
  combo: number,
  _timeElapsed: number,
  dropletCreatedAt: number
): number => {
  let score = baseScore;
  
  // 콤보 보너스
  const comboBonus = GAME_CONFIG.SCORE.COMBO_BONUS;
  if (combo >= 15) score += comboBonus[15];
  else if (combo >= 10) score += comboBonus[10];
  else if (combo >= 5) score += comboBonus[5];
  
  // 속도 보너스 (빠르게 답할수록)
  const answerTime = (Date.now() - dropletCreatedAt) / 1000; // 초 단위
  const speedBonus = Math.max(0, Math.min(GAME_CONFIG.SCORE.SPEED_BONUS_MAX, 5 - answerTime));
  score += Math.floor(speedBonus);
  
  return score;
};

// 배지 체크
export const checkBadgeUnlock = (state: GameState, badgeId: string): boolean => {
  switch (badgeId) {
    case 'first-stage':
      return state.mode === 'stage' && state.currentStage > 2;
    
    case 'stage-2-master':
      return state.mode === 'practice' && state.currentStage === 2 && state.combo >= 30;
    
    case 'stage-5-master':
      return state.mode === 'practice' && state.currentStage === 5 && state.combo >= 30;
    
    case 'stage-9-master':
      return state.mode === 'practice' && state.currentStage === 9 && state.combo >= 30;
    
    case 'perfectionist':
      return state.wrongAnswers === 0 && state.correctAnswers >= GAME_CONFIG.STAGE_CLEAR_REQUIREMENT;
    
    case 'combo-king':
      return state.maxCombo >= 50;
    
    default:
      return false;
  }
};

// 스테이지 클리어 체크
export const isStageClear = (correctAnswers: number): boolean => {
  return correctAnswers >= GAME_CONFIG.STAGE_CLEAR_REQUIREMENT;
};


