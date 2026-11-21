import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { OneRMCalculator } from './OneRMCalculator';
import { TDEECalculator } from './TDEECalculator';
import { VolumeTracker } from './VolumeTracker';

type Tab = '1RM Calculator' | 'TDEE & Macros' | 'Volume Tracker';

const TABS: Tab[] = ['1RM Calculator', 'TDEE & Macros', 'Volume Tracker'];

const TAB_MAP: Record<string, Tab> = {
  '1rm': '1RM Calculator',
  'tdee': 'TDEE & Macros',
  'volume': 'Volume Tracker',
};

const REVERSE_TAB_MAP: Record<Tab, string> = {
  '1RM Calculator': '1rm',
  'TDEE & Macros': 'tdee',
  'Volume Tracker': 'volume',
};

const TAB_DESCRIPTIONS: Record<Tab, string> = {
  '1RM Calculator': 'Estimate your one-rep max from any set using peer-reviewed formulas.',
  'TDEE & Macros':  'Calculate your daily energy needs and macro targets based on your stats and goal.',
  'Volume Tracker': 'Track sets per muscle group against MEV, MAV, and MRV landmarks.',
};

export function ToolsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const initialTab: Tab = (tabParam && TAB_MAP[tabParam]) ? TAB_MAP[tabParam] : '1RM Calculator';
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);

  useEffect(() => {
    if (tabParam && TAB_MAP[tabParam]) {
      setActiveTab(TAB_MAP[tabParam]);
    }
  }, [tabParam]);

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setSearchParams({ tab: REVERSE_TAB_MAP[tab] });
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '48px 16px 80px' }}>
      {/* Page header */}
      <div style={{ marginBottom: '32px' }}>
        <h1
          style={{
            fontSize: 'clamp(24px, 4vw, 32px)',
            fontWeight: 800,
            color: 'var(--color-text-primary)',
            marginBottom: '8px',
            lineHeight: 1.2,
          }}
        >
          Lifting & nutrition tools
        </h1>
        <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)', maxWidth: '520px', lineHeight: 1.6 }}>
          {TAB_DESCRIPTIONS[activeTab]}
        </p>
      </div>

      {/* Tab bar */}
      <div
        style={{
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
          marginBottom: '28px',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div style={{ display: 'flex', gap: '0', minWidth: 'max-content' }}>
          {TABS.map(tab => {
            const isActive = tab === activeTab;
            return (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                style={{
                  position: 'relative',
                  padding: '0 20px 14px',
                  fontSize: '14px',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'color 150ms',
                  outline: 'none',
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = 'var(--color-text-secondary)'; }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = 'var(--color-text-muted)'; }}
              >
                {tab}
                {/* Active underline */}
                <span
                  style={{
                    position: 'absolute',
                    bottom: '-1px',
                    left: '20px',
                    right: '20px',
                    height: '2px',
                    borderRadius: '1px',
                    backgroundColor: isActive ? 'var(--color-signal-red)' : 'transparent',
                    transition: 'background-color 150ms',
                  }}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Active tool */}
      <div>
        {activeTab === '1RM Calculator' && <OneRMCalculator />}
        {activeTab === 'TDEE & Macros'  && <TDEECalculator />}
        {activeTab === 'Volume Tracker' && <VolumeTracker />}
      </div>
    </div>
  );
}
