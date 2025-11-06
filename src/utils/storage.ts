import { Statistics, Settings } from '../types';
import { DEFAULT_SETTINGS, STORAGE_KEYS } from '../constants';

// 통계 데이터 저장
export const saveStatistics = (stats: Statistics): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.STATISTICS, JSON.stringify(stats));
  } catch (error) {
    console.error('Failed to save statistics:', error);
  }
};

// 통계 데이터 불러오기
export const loadStatistics = (): Statistics => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.STATISTICS);
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Failed to load statistics:', error);
  }
  
  // 기본 통계 반환
  return {
    stageProgress: {},
    totalGamesPlayed: 0,
    totalCorrectAnswers: 0,
    totalWrongAnswers: 0,
    highScores: {
      practice: {},
      stage: 0,
      challenge: 0,
    },
    badges: [],
    weakProblems: [],
  };
};

// 설정 저장
export const saveSettings = (settings: Settings): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save settings:', error);
  }
};

// 설정 불러오기
export const loadSettings = (): Settings => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (data) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(data) };
    }
  } catch (error) {
    console.error('Failed to load settings:', error);
  }
  
  return DEFAULT_SETTINGS;
};


