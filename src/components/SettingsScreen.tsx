import React from 'react';
import { Settings } from '../types';

interface SettingsScreenProps {
  settings: Settings;
  onUpdateSettings: (settings: Settings) => void;
  onClose: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  settings,
  onUpdateSettings,
  onClose,
}) => {
  const handleToggle = (key: keyof Settings) => {
    onUpdateSettings({
      ...settings,
      [key]: !settings[key],
    });
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateSettings({
      ...settings,
      volume: parseFloat(e.target.value),
    });
  };

  const handleInputMethodChange = (method: 'keyboard' | 'buttons' | 'both') => {
    onUpdateSettings({
      ...settings,
      inputMethod: method,
    });
  };

  const handleThemeChange = (theme: 'light' | 'dark') => {
    onUpdateSettings({
      ...settings,
      theme,
    });
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>⚙️ 설정</h2>
          <button style={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        </div>

        <div style={styles.content}>
          {/* 사운드 설정 */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>🔊 사운드</h3>
            
            <div style={styles.settingRow}>
              <label style={styles.label}>효과음</label>
              <button
                style={{
                  ...styles.toggleButton,
                  ...(settings.soundEnabled ? styles.toggleButtonOn : styles.toggleButtonOff),
                }}
                onClick={() => handleToggle('soundEnabled')}
              >
                {settings.soundEnabled ? 'ON' : 'OFF'}
              </button>
            </div>

            <div style={styles.settingRow}>
              <label style={styles.label}>배경음악</label>
              <button
                style={{
                  ...styles.toggleButton,
                  ...(settings.musicEnabled ? styles.toggleButtonOn : styles.toggleButtonOff),
                }}
                onClick={() => handleToggle('musicEnabled')}
              >
                {settings.musicEnabled ? 'ON' : 'OFF'}
              </button>
            </div>

            <div style={styles.settingRow}>
              <label style={styles.label}>볼륨</label>
              <div style={styles.volumeContainer}>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={settings.volume}
                  onChange={handleVolumeChange}
                  style={styles.volumeSlider}
                />
                <span style={styles.volumeValue}>{Math.round(settings.volume * 100)}%</span>
              </div>
            </div>
          </div>

          {/* 입력 방식 */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>⌨️ 입력 방식</h3>
            <div style={styles.radioGroup}>
              <button
                style={{
                  ...styles.radioButton,
                  ...(settings.inputMethod === 'keyboard' ? styles.radioButtonActive : {}),
                }}
                onClick={() => handleInputMethodChange('keyboard')}
              >
                키보드만
              </button>
              <button
                style={{
                  ...styles.radioButton,
                  ...(settings.inputMethod === 'buttons' ? styles.radioButtonActive : {}),
                }}
                onClick={() => handleInputMethodChange('buttons')}
              >
                버튼만
              </button>
              <button
                style={{
                  ...styles.radioButton,
                  ...(settings.inputMethod === 'both' ? styles.radioButtonActive : {}),
                }}
                onClick={() => handleInputMethodChange('both')}
              >
                둘 다
              </button>
            </div>
          </div>

          {/* 게임 옵션 */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>🎮 게임 옵션</h3>
            
            <div style={styles.settingRow}>
              <label style={styles.label}>힌트 표시</label>
              <button
                style={{
                  ...styles.toggleButton,
                  ...(settings.hintsEnabled ? styles.toggleButtonOn : styles.toggleButtonOff),
                }}
                onClick={() => handleToggle('hintsEnabled')}
              >
                {settings.hintsEnabled ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>

          {/* 테마 */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>🎨 테마</h3>
            <div style={styles.radioGroup}>
              <button
                style={{
                  ...styles.radioButton,
                  ...(settings.theme === 'light' ? styles.radioButtonActive : {}),
                }}
                onClick={() => handleThemeChange('light')}
              >
                ☀️ 밝게
              </button>
              <button
                style={{
                  ...styles.radioButton,
                  ...(settings.theme === 'dark' ? styles.radioButtonActive : {}),
                }}
                onClick={() => handleThemeChange('dark')}
              >
                🌙 어둡게
              </button>
            </div>
          </div>

          {/* 정보 */}
          <div style={styles.infoBox}>
            <p style={styles.infoText}>
              💡 <strong>팁:</strong> 키보드 숫자 키와 Enter를 사용하면 더 빠르게 답을 입력할 수 있어요!
            </p>
          </div>
        </div>

        <button style={styles.backButton} onClick={onClose}>
          완료
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
    maxWidth: '600px',
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
  settingRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px',
    background: '#f5f5f5',
    borderRadius: '12px',
    marginBottom: '10px',
  },
  label: {
    fontSize: '16px',
    color: '#333',
    fontWeight: '500',
  },
  toggleButton: {
    minWidth: '60px',
    border: 'none',
    borderRadius: '8px',
    padding: '8px 16px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  toggleButtonOn: {
    background: '#4caf50',
    color: 'white',
  },
  toggleButtonOff: {
    background: '#e0e0e0',
    color: '#666',
  },
  volumeContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  volumeSlider: {
    width: '120px',
    cursor: 'pointer',
  },
  volumeValue: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#667eea',
    minWidth: '45px',
  },
  radioGroup: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
    gap: '10px',
  },
  radioButton: {
    background: '#f0f0f0',
    border: '2px solid transparent',
    borderRadius: '12px',
    padding: '15px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    color: '#333',
  },
  radioButtonActive: {
    background: '#667eea',
    color: 'white',
    border: '2px solid #5568d3',
  },
  infoBox: {
    background: '#e3f2fd',
    border: '2px solid #2196f3',
    borderRadius: '12px',
    padding: '15px',
    marginTop: '20px',
  },
  infoText: {
    margin: 0,
    fontSize: '14px',
    color: '#333',
    lineHeight: '1.6',
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


