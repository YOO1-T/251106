import React from 'react';
import { GameState, Statistics } from '../types';
import { GAME_CONFIG } from '../constants';

interface ResultScreenProps {
  gameState: GameState;
  statistics: Statistics;
  onRestart: () => void;
  onMainMenu: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  gameState,
  statistics,
  onRestart,
  onMainMenu,
}) => {
  const totalAnswers = gameState.correctAnswers + gameState.wrongAnswers;
  const accuracy = totalAnswers > 0 ? Math.round((gameState.correctAnswers / totalAnswers) * 100) : 0;
  const playTime = gameState.endTime && gameState.startTime 
    ? Math.round((gameState.endTime - gameState.startTime) / 1000)
    : 0;

  const getStars = (): number => {
    if (accuracy >= 90) return 3;
    if (accuracy >= 70) return 2;
    if (accuracy >= 50) return 1;
    return 0;
  };

  const stars = getStars();

  const getTitle = (): string => {
    if (stars === 3) return '완벽해요! 🏆';
    if (stars === 2) return '잘했어요! 🎉';
    if (stars === 1) return '좋아요! 👍';
    return '다시 도전해봐요! 💪';
  };

  const getMessage = (): string => {
    if (gameState.mode === 'stage' && gameState.currentStage > GAME_CONFIG.MIN_STAGE) {
      return `${gameState.currentStage - 1}단까지 클리어!`;
    }
    if (gameState.mode === 'practice') {
      return `${gameState.currentStage}단 연습 완료!`;
    }
    if (gameState.mode === 'challenge') {
      return '챌린지 모드 완료!';
    }
    return '게임 종료';
  };

  // 최고 기록 확인
  const isNewHighScore = (): boolean => {
    if (gameState.mode === 'practice') {
      const prevHigh = statistics.highScores.practice[gameState.currentStage] || 0;
      return gameState.score > prevHigh;
    }
    if (gameState.mode === 'stage') {
      return gameState.score > statistics.highScores.stage;
    }
    if (gameState.mode === 'challenge') {
      return gameState.score > statistics.highScores.challenge;
    }
    return false;
  };

  const newHighScore = isNewHighScore();

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {/* 제목 */}
        <h1 style={styles.title}>{getTitle()}</h1>
        <p style={styles.message}>{getMessage()}</p>

        {/* 별 표시 */}
        <div style={styles.starsContainer}>
          {[1, 2, 3].map((i) => (
            <span
              key={i}
              style={{
                ...styles.star,
                opacity: i <= stars ? 1 : 0.3,
              }}
            >
              ⭐
            </span>
          ))}
        </div>

        {/* 최고 기록 */}
        {newHighScore && (
          <div style={styles.newHighScore}>
            🎊 새로운 최고 기록! 🎊
          </div>
        )}

        {/* 통계 */}
        <div style={styles.statsContainer}>
          <div style={styles.statBox}>
            <div style={styles.statLabel}>최종 점수</div>
            <div style={styles.statValue}>{gameState.score}</div>
          </div>

          <div style={styles.statBox}>
            <div style={styles.statLabel}>정확도</div>
            <div style={styles.statValue}>{accuracy}%</div>
          </div>

          <div style={styles.statBox}>
            <div style={styles.statLabel}>정답 / 전체</div>
            <div style={styles.statValue}>
              {gameState.correctAnswers} / {totalAnswers}
            </div>
          </div>

          <div style={styles.statBox}>
            <div style={styles.statLabel}>최고 콤보</div>
            <div style={styles.statValue}>{gameState.maxCombo}</div>
          </div>

          <div style={styles.statBox}>
            <div style={styles.statLabel}>플레이 시간</div>
            <div style={styles.statValue}>{playTime}초</div>
          </div>
        </div>

        {/* 평가 메시지 */}
        <div style={styles.feedback}>
          {accuracy >= 90 && '완벽한 실력이에요! 다음 단계에 도전해보세요! 🚀'}
          {accuracy >= 70 && accuracy < 90 && '아주 잘하고 있어요! 조금만 더 연습하면 완벽해질 거예요! 💪'}
          {accuracy >= 50 && accuracy < 70 && '좋은 시작이에요! 계속 연습하면 더 잘할 수 있어요! 📚'}
          {accuracy < 50 && '괜찮아요! 다시 도전해서 더 좋은 결과를 만들어봐요! 🌟'}
        </div>

        {/* 버튼 */}
        <div style={styles.buttons}>
          <button style={styles.restartButton} onClick={onRestart}>
            🔄 다시 하기
          </button>
          <button style={styles.menuButton} onClick={onMainMenu}>
            🏠 메인 메뉴
          </button>
        </div>
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
    padding: '20px',
  },
  content: {
    background: 'white',
    borderRadius: '30px',
    padding: '40px',
    maxWidth: '600px',
    width: '100%',
    boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
    textAlign: 'center',
  },
  title: {
    fontSize: '48px',
    fontWeight: 'bold',
    color: '#333',
    margin: '0 0 10px 0',
  },
  message: {
    fontSize: '20px',
    color: '#666',
    margin: '0 0 30px 0',
  },
  starsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '20px',
  },
  star: {
    fontSize: '60px',
    transition: 'opacity 0.3s ease',
  },
  newHighScore: {
    background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
    color: '#ff6b6b',
    fontSize: '20px',
    fontWeight: 'bold',
    padding: '15px',
    borderRadius: '15px',
    marginBottom: '20px',
    animation: 'pulse 1s ease-in-out infinite',
  },
  statsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
    gap: '15px',
    marginBottom: '30px',
  },
  statBox: {
    background: '#f5f5f5',
    borderRadius: '15px',
    padding: '20px 10px',
  },
  statLabel: {
    fontSize: '12px',
    color: '#666',
    marginBottom: '8px',
  },
  statValue: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#667eea',
  },
  feedback: {
    background: '#f0f7ff',
    border: '2px solid #667eea',
    borderRadius: '15px',
    padding: '20px',
    fontSize: '16px',
    color: '#333',
    marginBottom: '30px',
    lineHeight: '1.6',
  },
  buttons: {
    display: 'flex',
    gap: '15px',
    flexWrap: 'wrap',
  },
  restartButton: {
    flex: 1,
    minWidth: '150px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    border: 'none',
    borderRadius: '15px',
    padding: '18px',
    fontSize: '18px',
    fontWeight: 'bold',
    color: 'white',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
    transition: 'transform 0.2s ease',
  },
  menuButton: {
    flex: 1,
    minWidth: '150px',
    background: '#e0e0e0',
    border: 'none',
    borderRadius: '15px',
    padding: '18px',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
  },
};


