import React, { useState, useEffect, useCallback } from 'react';
import { GameState } from '../types';
import { Droplet } from './Droplet';

interface GameScreenProps {
  gameState: GameState;
  onSubmitAnswer: (answer: number) => boolean;
  onPause: () => void;
  onResume: () => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({
  gameState,
  onSubmitAnswer,
  onPause,
  onResume,
}) => {
  const [input, setInput] = useState<string>('');
  const [feedback, setFeedback] = useState<{ message: string; type: 'correct' | 'wrong' } | null>(null);

  // 키보드 입력 처리
  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (gameState.isPaused) return;

      if (e.key >= '0' && e.key <= '9') {
        setInput((prev) => {
          const newInput = prev + e.key;
          return newInput.length <= 2 ? newInput : prev;
        });
      } else if (e.key === 'Backspace') {
        setInput((prev) => prev.slice(0, -1));
      } else if (e.key === 'Enter' && input) {
        handleSubmit();
      }
    },
    [gameState.isPaused, input]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const handleNumberClick = (num: number) => {
    setInput((prev) => {
      const newInput = prev + num.toString();
      return newInput.length <= 2 ? newInput : prev;
    });
  };

  const handleBackspace = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  const handleSubmit = () => {
    if (!input) return;

    const answer = parseInt(input, 10);
    const isCorrect = onSubmitAnswer(answer);

    // 피드백 표시
    setFeedback({
      message: isCorrect ? '정답! 🎉' : '다시 생각해봐요 💭',
      type: isCorrect ? 'correct' : 'wrong',
    });

    // 입력 초기화
    setInput('');

    // 피드백 자동 제거
    setTimeout(() => setFeedback(null), 800);
  };

  const handlePauseToggle = () => {
    if (gameState.isPaused) {
      onResume();
    } else {
      onPause();
    }
  };

  return (
    <div style={styles.container}>
      {/* 상단 정보 바 */}
      <div style={styles.topBar}>
        <div style={styles.infoItem}>
          <span style={styles.infoLabel}>점수</span>
          <span style={styles.infoValue}>{gameState.score}</span>
        </div>

        <div style={styles.infoItem}>
          <span style={styles.infoLabel}>생명</span>
          <span style={styles.infoValue}>
            {'❤️'.repeat(gameState.lives)}
          </span>
        </div>

        {gameState.mode !== 'challenge' && (
          <div style={styles.infoItem}>
            <span style={styles.infoLabel}>현재 단</span>
            <span style={styles.infoValue}>{gameState.currentStage}단</span>
          </div>
        )}

        {gameState.mode === 'practice' && (
          <div style={styles.infoItem}>
            <span style={styles.infoLabel}>정답</span>
            <span style={styles.infoValue}>{gameState.correctAnswers}</span>
          </div>
        )}

        {gameState.mode === 'stage' && (
          <div style={styles.infoItem}>
            <span style={styles.infoLabel}>진행</span>
            <span style={styles.infoValue}>
              {gameState.correctAnswers} / 10
            </span>
          </div>
        )}

        <button style={styles.pauseButton} onClick={handlePauseToggle}>
          {gameState.isPaused ? '▶️' : '⏸️'}
        </button>
      </div>

      {/* 콤보 표시 */}
      {gameState.combo >= 5 && (
        <div style={styles.comboDisplay}>
          🔥 {gameState.combo} COMBO!
        </div>
      )}

      {/* 게임 영역 */}
      <div style={styles.gameArea}>
        {gameState.droplets.map((droplet) => (
          <Droplet key={droplet.id} droplet={droplet} />
        ))}

        {/* 피드백 메시지 */}
        {feedback && (
          <div
            style={{
              ...styles.feedback,
              ...(feedback.type === 'correct' ? styles.feedbackCorrect : styles.feedbackWrong),
            }}
          >
            {feedback.message}
          </div>
        )}

        {/* 일시정지 오버레이 */}
        {gameState.isPaused && (
          <div style={styles.pauseOverlay}>
            <div style={styles.pauseModal}>
              <h2 style={styles.pauseTitle}>일시정지</h2>
              <p style={styles.pauseText}>계속하려면 ▶️ 버튼을 누르세요</p>
            </div>
          </div>
        )}
      </div>

      {/* 입력 영역 */}
      <div style={styles.inputArea}>
        <div style={styles.inputDisplay}>
          {input || '?'}
        </div>

        <div style={styles.numberPad}>
          <div style={styles.numberGrid}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                style={styles.numberButton}
                onClick={() => handleNumberClick(num)}
                disabled={gameState.isPaused}
              >
                {num}
              </button>
            ))}
            <button
              style={styles.numberButton}
              onClick={handleBackspace}
              disabled={gameState.isPaused}
            >
              ⌫
            </button>
            <button
              style={styles.numberButton}
              onClick={() => handleNumberClick(0)}
              disabled={gameState.isPaused}
            >
              0
            </button>
            <button
              style={{...styles.numberButton, ...styles.submitButton}}
              onClick={handleSubmit}
              disabled={gameState.isPaused || !input}
            >
              ✓
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: 'linear-gradient(180deg, #87CEEB 0%, #E0F6FF 100%)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    position: 'relative',
    overflow: 'hidden',
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '15px',
    background: 'rgba(255,255,255,0.9)',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    flexWrap: 'wrap',
    gap: '10px',
  },
  infoItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: '80px',
  },
  infoLabel: {
    fontSize: '12px',
    color: '#666',
    marginBottom: '4px',
  },
  infoValue: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
  },
  pauseButton: {
    background: '#667eea',
    border: 'none',
    borderRadius: '8px',
    padding: '8px 15px',
    fontSize: '16px',
    cursor: 'pointer',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
  },
  comboDisplay: {
    position: 'absolute',
    top: '80px',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#ff6b6b',
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
    animation: 'pulse 0.5s ease-in-out infinite',
    zIndex: 100,
  },
  gameArea: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  feedback: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '36px',
    fontWeight: 'bold',
    padding: '20px 40px',
    borderRadius: '20px',
    zIndex: 200,
    animation: 'fadeInOut 0.8s ease-in-out',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
  },
  feedbackCorrect: {
    background: '#4caf50',
    color: 'white',
  },
  feedbackWrong: {
    background: '#ff9800',
    color: 'white',
  },
  pauseOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 300,
  },
  pauseModal: {
    background: 'white',
    padding: '40px',
    borderRadius: '20px',
    textAlign: 'center',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
  },
  pauseTitle: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#333',
    margin: '0 0 20px 0',
  },
  pauseText: {
    fontSize: '16px',
    color: '#666',
    margin: 0,
  },
  inputArea: {
    background: 'rgba(255,255,255,0.95)',
    padding: '20px',
    boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
  },
  inputDisplay: {
    background: '#f5f5f5',
    borderRadius: '15px',
    padding: '20px',
    fontSize: '48px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '15px',
    minHeight: '80px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#333',
    border: '3px solid #667eea',
  },
  numberPad: {
    maxWidth: '400px',
    margin: '0 auto',
  },
  numberGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '10px',
  },
  numberButton: {
    background: 'white',
    border: '2px solid #ddd',
    borderRadius: '12px',
    padding: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    color: '#333',
  },
  submitButton: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
  },
};


