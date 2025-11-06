import React from 'react';
import { Statistics } from '../types';
import { GAME_CONFIG } from '../constants';

interface StatisticsScreenProps {
  statistics: Statistics;
  onClose: () => void;
}

export const StatisticsScreen: React.FC<StatisticsScreenProps> = ({
  statistics,
  onClose,
}) => {
  const totalAnswers = statistics.totalCorrectAnswers + statistics.totalWrongAnswers;
  const overallAccuracy = totalAnswers > 0 
    ? Math.round((statistics.totalCorrectAnswers / totalAnswers) * 100) 
    : 0;

  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>📊 학습 통계</h2>
          <button style={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        </div>

        <div style={styles.content}>
          {/* 전체 통계 */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>전체 기록</h3>
            <div style={styles.statsGrid}>
              <div style={styles.statCard}>
                <div style={styles.statIcon}>🎮</div>
                <div style={styles.statLabel}>총 게임 수</div>
                <div style={styles.statValue}>{statistics.totalGamesPlayed}</div>
              </div>

              <div style={styles.statCard}>
                <div style={styles.statIcon}>✅</div>
                <div style={styles.statLabel}>총 정답</div>
                <div style={styles.statValue}>{statistics.totalCorrectAnswers}</div>
              </div>

              <div style={styles.statCard}>
                <div style={styles.statIcon}>📈</div>
                <div style={styles.statLabel}>정확도</div>
                <div style={styles.statValue}>{overallAccuracy}%</div>
              </div>
            </div>
          </div>

          {/* 최고 점수 */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>최고 점수</h3>
            <div style={styles.highScoresContainer}>
              <div style={styles.highScoreItem}>
                <span style={styles.highScoreLabel}>스테이지 모드</span>
                <span style={styles.highScoreValue}>
                  {statistics.highScores.stage > 0 ? statistics.highScores.stage : '-'}
                </span>
              </div>
              <div style={styles.highScoreItem}>
                <span style={styles.highScoreLabel}>챌린지 모드</span>
                <span style={styles.highScoreValue}>
                  {statistics.highScores.challenge > 0 ? statistics.highScores.challenge : '-'}
                </span>
              </div>
            </div>
          </div>

          {/* 단별 진행 상황 */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>단별 연습 모드 최고 점수</h3>
            <div style={styles.stageProgressGrid}>
              {Array.from(
                { length: GAME_CONFIG.MAX_STAGE - GAME_CONFIG.MIN_STAGE + 1 },
                (_, i) => i + GAME_CONFIG.MIN_STAGE
              ).map((stage) => {
                const score = statistics.highScores.practice[stage] || 0;
                return (
                  <div key={stage} style={styles.stageProgressItem}>
                    <div style={styles.stageName}>{stage}단</div>
                    <div style={styles.stageScore}>
                      {score > 0 ? score : '-'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 배지 */}
          {statistics.badges.length > 0 && (
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>획득한 배지</h3>
              <div style={styles.badgesContainer}>
                {statistics.badges.map((badge) => (
                  <div key={badge} style={styles.badge}>
                    {badge}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 약점 문제 */}
          {statistics.weakProblems.length > 0 && (
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>더 연습이 필요한 문제</h3>
              <div style={styles.weakProblemsContainer}>
                {statistics.weakProblems.slice(0, 5).map((item, index) => (
                  <div key={index} style={styles.weakProblemItem}>
                    <span style={styles.problemText}>{item.problem}</span>
                    <span style={styles.wrongCount}>틀린 횟수: {item.wrongCount}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <button style={styles.backButton} onClick={onClose}>
          돌아가기
        </button>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    padding: '20px',
  },
  container: {
    background: 'white',
    borderRadius: '20px',
    maxWidth: '800px',
    width: '100%',
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 30px',
    borderBottom: '2px solid #f0f0f0',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#333',
    margin: 0,
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#666',
    padding: '5px 10px',
  },
  content: {
    flex: 1,
    overflowY: 'auto',
    padding: '30px',
  },
  section: {
    marginBottom: '30px',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '15px',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '15px',
  },
  statCard: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '15px',
    padding: '20px',
    textAlign: 'center',
    color: 'white',
  },
  statIcon: {
    fontSize: '32px',
    marginBottom: '10px',
  },
  statLabel: {
    fontSize: '14px',
    opacity: 0.9,
    marginBottom: '8px',
  },
  statValue: {
    fontSize: '28px',
    fontWeight: 'bold',
  },
  highScoresContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  highScoreItem: {
    background: '#f5f5f5',
    borderRadius: '12px',
    padding: '15px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  highScoreLabel: {
    fontSize: '16px',
    color: '#333',
    fontWeight: '500',
  },
  highScoreValue: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#667eea',
  },
  stageProgressGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '10px',
  },
  stageProgressItem: {
    background: '#f5f5f5',
    borderRadius: '12px',
    padding: '15px',
    textAlign: 'center',
  },
  stageName: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '8px',
  },
  stageScore: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#667eea',
  },
  badgesContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
  },
  badge: {
    background: '#ffd700',
    borderRadius: '20px',
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: 'bold',
    boxShadow: '0 2px 8px rgba(255, 215, 0, 0.3)',
  },
  weakProblemsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  weakProblemItem: {
    background: '#fff3e0',
    border: '2px solid #ff9800',
    borderRadius: '12px',
    padding: '15px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  problemText: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
  },
  wrongCount: {
    fontSize: '14px',
    color: '#ff5722',
  },
  backButton: {
    margin: '0 30px 30px 30px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    border: 'none',
    borderRadius: '12px',
    padding: '15px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: 'white',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
  },
};


