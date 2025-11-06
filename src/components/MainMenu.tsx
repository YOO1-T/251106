import React from 'react';
import { GameMode, Difficulty } from '../types';
import { GAME_CONFIG } from '../constants';

interface MainMenuProps {
  onStartGame: (mode: GameMode, stage?: number, difficulty?: Difficulty) => void;
  onShowSettings: () => void;
  onShowStats: () => void;
  highScores: {
    practice: { [key: number]: number };
    stage: number;
    challenge: number;
  };
}

export const MainMenu: React.FC<MainMenuProps> = ({
  onStartGame,
  onShowSettings,
  onShowStats,
  highScores,
}) => {
  const [selectedMode, setSelectedMode] = React.useState<'practice' | 'stage' | 'challenge' | null>(null);
  const [selectedStage, setSelectedStage] = React.useState<number>(2);
  const [selectedDifficulty, setSelectedDifficulty] = React.useState<Difficulty>('normal');

  const handleModeSelect = (mode: 'practice' | 'stage' | 'challenge') => {
    setSelectedMode(mode);
  };

  const handleStart = () => {
    if (!selectedMode) return;

    if (selectedMode === 'practice') {
      onStartGame('practice', selectedStage, selectedDifficulty);
    } else if (selectedMode === 'stage') {
      onStartGame('stage', 2, selectedDifficulty);
    } else {
      onStartGame('challenge', undefined, 'hard');
    }
  };

  const handleBack = () => {
    setSelectedMode(null);
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {/* 타이틀 */}
        <div style={styles.titleContainer}>
          <h1 style={styles.title}>🌧️ 구구단 산성비 🌧️</h1>
          <p style={styles.subtitle}>Multiplication Rain</p>
        </div>

        {!selectedMode ? (
          // 모드 선택 화면
          <div style={styles.menuContainer}>
            <button
              style={styles.modeButton}
              onClick={() => handleModeSelect('practice')}
            >
              <div style={styles.modeIcon}>📚</div>
              <div style={styles.modeTitle}>연습 모드</div>
              <div style={styles.modeDescription}>원하는 단을 선택해서 연습하세요</div>
            </button>

            <button
              style={styles.modeButton}
              onClick={() => handleModeSelect('stage')}
            >
              <div style={styles.modeIcon}>🎯</div>
              <div style={styles.modeTitle}>스테이지 모드</div>
              <div style={styles.modeDescription}>2단부터 9단까지 순서대로 도전!</div>
              {highScores.stage > 0 && (
                <div style={styles.highScore}>최고 점수: {highScores.stage}</div>
              )}
            </button>

            <button
              style={styles.modeButton}
              onClick={() => handleModeSelect('challenge')}
            >
              <div style={styles.modeIcon}>🔥</div>
              <div style={styles.modeTitle}>챌린지 모드</div>
              <div style={styles.modeDescription}>랜덤 문제로 최고 점수에 도전!</div>
              {highScores.challenge > 0 && (
                <div style={styles.highScore}>최고 점수: {highScores.challenge}</div>
              )}
            </button>

            <div style={styles.bottomButtons}>
              <button style={styles.smallButton} onClick={onShowStats}>
                📊 통계 보기
              </button>
              <button style={styles.smallButton} onClick={onShowSettings}>
                ⚙️ 설정
              </button>
            </div>
          </div>
        ) : (
          // 세부 설정 화면
          <div style={styles.settingsContainer}>
            <h2 style={styles.settingsTitle}>
              {selectedMode === 'practice' && '📚 연습 모드'}
              {selectedMode === 'stage' && '🎯 스테이지 모드'}
              {selectedMode === 'challenge' && '🔥 챌린지 모드'}
            </h2>

            {selectedMode === 'practice' && (
              <div style={styles.settingGroup}>
                <label style={styles.label}>단 선택</label>
                <div style={styles.stageGrid}>
                  {Array.from(
                    { length: GAME_CONFIG.MAX_STAGE - GAME_CONFIG.MIN_STAGE + 1 },
                    (_, i) => i + GAME_CONFIG.MIN_STAGE
                  ).map((stage) => (
                    <button
                      key={stage}
                      style={{
                        ...styles.stageButton,
                        ...(selectedStage === stage ? styles.stageButtonActive : {}),
                      }}
                      onClick={() => setSelectedStage(stage)}
                    >
                      {stage}단
                      {highScores.practice[stage] > 0 && (
                        <div style={styles.stageScore}>{highScores.practice[stage]}</div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {selectedMode !== 'challenge' && (
              <div style={styles.settingGroup}>
                <label style={styles.label}>난이도</label>
                <div style={styles.difficultyContainer}>
                  <button
                    style={{
                      ...styles.difficultyButton,
                      ...(selectedDifficulty === 'easy' ? styles.difficultyButtonActive : {}),
                    }}
                    onClick={() => setSelectedDifficulty('easy')}
                  >
                    😊 쉬움
                  </button>
                  <button
                    style={{
                      ...styles.difficultyButton,
                      ...(selectedDifficulty === 'normal' ? styles.difficultyButtonActive : {}),
                    }}
                    onClick={() => setSelectedDifficulty('normal')}
                  >
                    😐 보통
                  </button>
                  <button
                    style={{
                      ...styles.difficultyButton,
                      ...(selectedDifficulty === 'hard' ? styles.difficultyButtonActive : {}),
                    }}
                    onClick={() => setSelectedDifficulty('hard')}
                  >
                    😤 어려움
                  </button>
                </div>
              </div>
            )}

            <div style={styles.actionButtons}>
              <button style={styles.backButton} onClick={handleBack}>
                ← 뒤로
              </button>
              <button style={styles.startButton} onClick={handleStart}>
                게임 시작! 🚀
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: '100%',
    height: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  content: {
    maxWidth: '600px',
    width: '90%',
    padding: '20px',
  },
  titleContainer: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  title: {
    fontSize: '48px',
    fontWeight: 'bold',
    color: 'white',
    margin: '0',
    textShadow: '3px 3px 6px rgba(0,0,0,0.3)',
  },
  subtitle: {
    fontSize: '20px',
    color: 'rgba(255,255,255,0.9)',
    margin: '10px 0 0 0',
  },
  menuContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  modeButton: {
    background: 'white',
    border: 'none',
    borderRadius: '20px',
    padding: '30px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
    textAlign: 'center',
  },
  modeIcon: {
    fontSize: '48px',
    marginBottom: '10px',
  },
  modeTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '8px',
  },
  modeDescription: {
    fontSize: '14px',
    color: '#666',
  },
  highScore: {
    fontSize: '12px',
    color: '#667eea',
    fontWeight: 'bold',
    marginTop: '8px',
  },
  bottomButtons: {
    display: 'flex',
    gap: '10px',
    marginTop: '10px',
  },
  smallButton: {
    flex: 1,
    background: 'rgba(255,255,255,0.9)',
    border: 'none',
    borderRadius: '15px',
    padding: '15px',
    fontSize: '14px',
    cursor: 'pointer',
    fontWeight: 'bold',
    color: '#333',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  settingsContainer: {
    background: 'white',
    borderRadius: '20px',
    padding: '30px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
  },
  settingsTitle: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '30px',
    textAlign: 'center',
  },
  settingGroup: {
    marginBottom: '30px',
  },
  label: {
    display: 'block',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '15px',
  },
  stageGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '10px',
  },
  stageButton: {
    background: '#f0f0f0',
    border: '2px solid transparent',
    borderRadius: '12px',
    padding: '15px 10px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    position: 'relative',
  },
  stageButtonActive: {
    background: '#667eea',
    color: 'white',
    border: '2px solid #5568d3',
  },
  stageScore: {
    fontSize: '10px',
    marginTop: '4px',
    opacity: 0.8,
  },
  difficultyContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '10px',
  },
  difficultyButton: {
    background: '#f0f0f0',
    border: '2px solid transparent',
    borderRadius: '12px',
    padding: '15px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  difficultyButtonActive: {
    background: '#667eea',
    color: 'white',
    border: '2px solid #5568d3',
  },
  actionButtons: {
    display: 'flex',
    gap: '10px',
    marginTop: '20px',
  },
  backButton: {
    flex: 1,
    background: '#e0e0e0',
    border: 'none',
    borderRadius: '12px',
    padding: '15px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    color: '#333',
  },
  startButton: {
    flex: 2,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    border: 'none',
    borderRadius: '12px',
    padding: '15px',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    color: 'white',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
  },
};


