import { useState, useEffect, useCallback } from 'react';
import { Statistics, Settings, GameMode, Difficulty } from './types';
import { loadStatistics, saveStatistics, loadSettings, saveSettings } from './utils/storage';
import { useGameState } from './hooks/useGameState';
import { useSound } from './hooks/useSound';
import { MainMenu } from './components/MainMenu';
import { GameScreen } from './components/GameScreen';
import { ResultScreen } from './components/ResultScreen';
import { StatisticsScreen } from './components/StatisticsScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { BADGES } from './constants';
import { checkBadgeUnlock } from './utils/gameLogic';

type Screen = 'menu' | 'game' | 'result' | 'statistics' | 'settings';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('menu');
  const [statistics, setStatistics] = useState<Statistics>(loadStatistics());
  const [settings, setSettings] = useState<Settings>(loadSettings());
  
  const { gameState, startGame, pauseGame, resumeGame, submitAnswer, resetGame, goToMenu } = useGameState();
  const { playSound } = useSound(settings);

  // 게임 상태 변화 감지
  useEffect(() => {
    if (gameState.mode === 'result' && currentScreen !== 'result') {
      setCurrentScreen('result');
      updateStatistics();
      playSound('gameOver');
    }
  }, [gameState.mode]);

  // 통계 업데이트
  const updateStatistics = useCallback(() => {
    setStatistics((prev) => {
      const newStats = { ...prev };
      
      // 총 게임 수 증가
      newStats.totalGamesPlayed += 1;
      newStats.totalCorrectAnswers += gameState.correctAnswers;
      newStats.totalWrongAnswers += gameState.wrongAnswers;
      
      // 최고 점수 업데이트
      if (gameState.mode === 'practice') {
        const currentHigh = newStats.highScores.practice[gameState.currentStage] || 0;
        if (gameState.score > currentHigh) {
          newStats.highScores.practice[gameState.currentStage] = gameState.score;
        }
      } else if (gameState.mode === 'stage') {
        if (gameState.score > newStats.highScores.stage) {
          newStats.highScores.stage = gameState.score;
        }
      } else if (gameState.mode === 'challenge') {
        if (gameState.score > newStats.highScores.challenge) {
          newStats.highScores.challenge = gameState.score;
        }
      }
      
      // 배지 체크
      BADGES.forEach((badge) => {
        if (!newStats.badges.includes(badge.id) && checkBadgeUnlock(gameState, badge.id)) {
          newStats.badges.push(badge.id);
        }
      });
      
      // 약점 문제 분석 (틀린 문제 기록)
      // 이 부분은 실제로는 게임 중에 틀린 문제를 추적해야 하지만, 
      // 간단한 구현을 위해 생략
      
      saveStatistics(newStats);
      return newStats;
    });
  }, [gameState]);

  // 설정 업데이트
  const handleUpdateSettings = useCallback((newSettings: Settings) => {
    setSettings(newSettings);
    saveSettings(newSettings);
  }, []);

  // 게임 시작
  const handleStartGame = useCallback((mode: GameMode, stage?: number, difficulty?: Difficulty) => {
    startGame(mode, stage, difficulty);
    setCurrentScreen('game');
  }, [startGame]);

  // 정답 제출 (사운드 추가)
  const handleSubmitAnswer = useCallback((answer: number): boolean => {
    const isCorrect = submitAnswer(answer);
    
    if (isCorrect) {
      playSound('correct');
      if (gameState.combo >= 5) {
        playSound('combo');
      }
    } else {
      playSound('wrong');
    }
    
    return isCorrect;
  }, [submitAnswer, playSound, gameState.combo]);

  // 게임 재시작
  const handleRestart = useCallback(() => {
    resetGame();
    setCurrentScreen('game');
  }, [resetGame]);

  // 메인 메뉴로
  const handleGoToMenu = useCallback(() => {
    goToMenu();
    setCurrentScreen('menu');
  }, [goToMenu]);

  // 화면 렌더링
  const renderScreen = () => {
    switch (currentScreen) {
      case 'menu':
        return (
          <MainMenu
            onStartGame={handleStartGame}
            onShowSettings={() => setCurrentScreen('settings')}
            onShowStats={() => setCurrentScreen('statistics')}
            highScores={statistics.highScores}
          />
        );
      
      case 'game':
        return (
          <GameScreen
            gameState={gameState}
            onSubmitAnswer={handleSubmitAnswer}
            onPause={pauseGame}
            onResume={resumeGame}
          />
        );
      
      case 'result':
        return (
          <ResultScreen
            gameState={gameState}
            statistics={statistics}
            onRestart={handleRestart}
            onMainMenu={handleGoToMenu}
          />
        );
      
      case 'statistics':
        return (
          <StatisticsScreen
            statistics={statistics}
            onClose={() => setCurrentScreen('menu')}
          />
        );
      
      case 'settings':
        return (
          <SettingsScreen
            settings={settings}
            onUpdateSettings={handleUpdateSettings}
            onClose={() => setCurrentScreen('menu')}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="App">
      {renderScreen()}
    </div>
  );
}

export default App;

