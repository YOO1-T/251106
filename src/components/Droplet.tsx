import React from 'react';
import { Droplet as DropletType } from '../types';

interface DropletProps {
  droplet: DropletType;
}

export const Droplet: React.FC<DropletProps> = ({ droplet }) => {
  return (
    <div
      style={{
        ...styles.droplet,
        left: `${droplet.x}%`,
        top: `${droplet.y}%`,
      }}
    >
      <div style={styles.problem}>
        {droplet.multiplier1} × {droplet.multiplier2}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  droplet: {
    position: 'absolute',
    width: '80px',
    height: '80px',
    background: 'linear-gradient(135deg, #42a5f5 0%, #478ed1 100%)',
    borderRadius: '50% 50% 50% 0',
    transform: 'rotate(45deg)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    animation: 'wobble 2s ease-in-out infinite',
    transition: 'top 0.05s linear, left 0.05s linear',
  },
  problem: {
    transform: 'rotate(-45deg)',
    fontSize: '20px',
    fontWeight: 'bold',
    color: 'white',
    textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
    userSelect: 'none',
  },
};


