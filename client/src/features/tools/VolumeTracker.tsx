import React, { useState, useEffect, useCallback } from 'react';
import { Badge } from '../../components/Badge';

type Muscle =
  | 'Chest' | 'Back' | 'Quads' | 'Hamstrings' | 'Shoulders'
  | 'Biceps' | 'Triceps' | 'Calves' | 'Abs';

const MUSCLES: Muscle[] = [
  'Chest', 'Back', 'Quads', 'Hamstrings', 'Shoulders',
  'Biceps', 'Triceps', 'Calves', 'Abs',
];

const MEV: Record<Muscle, number> = {
  Chest: 8, Back: 10, Quads: 8, Hamstrings: 6, Shoulders: 6,
  Biceps: 8, Triceps: 6, Calves: 8, Abs: 0,
};
const MAV: Record<Muscle, number> = {
  Chest: 12, Back: 16, Quads: 12, Hamstrings: 10, Shoulders: 10,
  Biceps: 12, Triceps: 10, Calves: 12, Abs: 16,
};
const MRV: Record<Muscle, number> = {
  Chest: 20, Back: 25, Quads: 20, Hamstrings: 16, Shoulders: 20,
  Biceps: 20, Triceps: 16, Calves: 20, Abs: 25,
};

const STORAGE_KEY = 'indiefit-volume-v1';

function loadVolume(): Record<Muscle, number> {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      const result = {} as Record<Muscle, number>;
      for (const m of MUSCLES) {
        result[m] = typeof parsed[m] === 'number' ? parsed[m] : 0;
      }
      return result;
    }
  } catch {}
  const defaults = {} as Record<Muscle, number>;
  for (const m of MUSCLES) defaults[m] = 0;
  return defaults;
}

type Status = 'below' | 'mev' | 'mav' | 'mrv';

function getStatus(muscle: Muscle, sets: number): Status {
  if (sets >= MRV[muscle]) return 'mrv';
  if (sets >= MAV[muscle]) return 'mav';
  if (sets >= MEV[muscle]) return 'mev';
  return 'below';
}

function StatusBadge({ status }: { status: Status }) {
  const labels: Record<Status, string> = {
    below: 'Below MEV',
    mev:   'MEV',
    mav:   'MAV',
    mrv:   'MRV — recover',
  };
  const variants: Record<Status, 'muted' | 'default' | 'red'> = {
    below: 'muted',
    mev:   'default',
    mav:   'red',
    mrv:   'red',
  };
  return <Badge variant={variants[status]}>{labels[status]}</Badge>;
}

function LandmarkBar({ muscle, sets }: { muscle: Muscle; sets: number }) {
  const max = MRV[muscle] + 4; // a bit of breathing room
  const clampedSets = Math.min(sets, max);
  const fillPct = max > 0 ? (clampedSets / max) * 100 : 0;

  const mevPct  = (MEV[muscle] / max) * 100;
  const mavPct  = (MAV[muscle] / max) * 100;
  const mrvPct  = (MRV[muscle] / max) * 100;

  const status = getStatus(muscle, sets);
  const fillColor =
    status === 'below' ? 'var(--color-text-muted)' :
    status === 'mev'   ? 'var(--color-text-secondary)' :
    status === 'mav'   ? 'var(--color-signal-red)' :
                         'var(--color-signal-red)';

  return (
    <div style={{ position: 'relative', height: '6px', borderRadius: '3px', backgroundColor: 'var(--color-base)', overflow: 'visible' }}>
      {/* Fill */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          height: '100%',
          width: `${Math.min(fillPct, 100)}%`,
          borderRadius: '3px',
          backgroundColor: fillColor,
          transition: 'width 200ms ease, background-color 200ms',
        }}
      />
      {/* MEV marker */}
      {MEV[muscle] > 0 && (
        <div
          title={`MEV: ${MEV[muscle]}`}
          style={{
            position: 'absolute',
            left: `${mevPct}%`,
            top: '-2px',
            width: '2px',
            height: '10px',
            borderRadius: '1px',
            backgroundColor: 'var(--color-text-muted)',
            transform: 'translateX(-50%)',
          }}
        />
      )}
      {/* MAV marker */}
      <div
        title={`MAV: ${MAV[muscle]}`}
        style={{
          position: 'absolute',
          left: `${mavPct}%`,
          top: '-2px',
          width: '2px',
          height: '10px',
          borderRadius: '1px',
          backgroundColor: 'var(--color-text-secondary)',
          transform: 'translateX(-50%)',
        }}
      />
      {/* MRV marker */}
      <div
        title={`MRV: ${MRV[muscle]}`}
        style={{
          position: 'absolute',
          left: `${mrvPct}%`,
          top: '-2px',
          width: '2px',
          height: '10px',
          borderRadius: '1px',
          backgroundColor: 'var(--color-signal-red)',
          transform: 'translateX(-50%)',
        }}
      />
    </div>
  );
}

function StepperButton({
  onClick,
  label,
  disabled,
}: {
  onClick: () => void;
  label: string;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      style={{
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '10px',
        border: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-base)',
        color: disabled ? 'var(--color-text-muted)' : 'var(--color-text-primary)',
        fontSize: '18px',
        fontWeight: 500,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        transition: 'color 150ms, background-color 150ms, border-color 150ms',
        userSelect: 'none',
        lineHeight: 1,
        flexShrink: 0,
      }}
      onMouseEnter={e => {
        if (!disabled) {
          e.currentTarget.style.backgroundColor = 'var(--color-elevated)';
          e.currentTarget.style.borderColor = 'var(--color-text-muted)';
        }
      }}
      onMouseLeave={e => {
        if (!disabled) {
          e.currentTarget.style.backgroundColor = 'var(--color-base)';
          e.currentTarget.style.borderColor = 'var(--color-border)';
        }
      }}
    >
      {label}
    </button>
  );
}

export function VolumeTracker() {
  const [volume, setVolume] = useState<Record<Muscle, number>>(loadVolume);

  const updateVolume = useCallback((muscle: Muscle, delta: number) => {
    setVolume(prev => {
      const next = { ...prev, [muscle]: Math.max(0, prev[muscle] + delta) };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const reset = () => {
    const defaults = {} as Record<Muscle, number>;
    for (const m of MUSCLES) defaults[m] = 0;
    setVolume(defaults);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults)); } catch {}
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Legend + reset */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <LegendDot color="var(--color-text-muted)" label="MEV" />
          <LegendDot color="var(--color-text-secondary)" label="MAV" />
          <LegendDot color="var(--color-signal-red)" label="MRV" />
        </div>
        <button
          onClick={reset}
          style={{
            height: '36px',
            padding: '0 14px',
            borderRadius: '8px',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            border: '1px solid var(--color-border)',
            backgroundColor: 'transparent',
            color: 'var(--color-text-muted)',
            transition: 'color 150ms, border-color 150ms',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-text-primary)'; e.currentTarget.style.borderColor = 'var(--color-text-muted)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-text-muted)'; e.currentTarget.style.borderColor = 'var(--color-border)'; }}
        >
          Reset week
        </button>
      </div>

      {/* Table panel */}
      <div
        style={{
          backgroundColor: 'var(--color-card)',
          border: '1px solid var(--color-border)',
          borderRadius: '18px',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 120px 100px',
            gap: '16px',
            padding: '12px 20px',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          {['Muscle group', 'Sets / week', 'Landmark', 'Status'].map(h => (
            <span
              key={h}
              style={{
                fontSize: '11px',
                fontWeight: 600,
                color: 'var(--color-text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {h}
            </span>
          ))}
        </div>

        {MUSCLES.map((muscle, idx) => {
          const sets   = volume[muscle];
          const status = getStatus(muscle, sets);
          const isMRV  = status === 'mrv';

          return (
            <div
              key={muscle}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto 120px 100px',
                gap: '16px',
                padding: '14px 20px',
                alignItems: 'center',
                borderBottom: idx < MUSCLES.length - 1 ? '1px solid var(--color-border)' : 'none',
                backgroundColor: isMRV ? 'rgba(225,29,42,0.05)' : 'transparent',
                transition: 'background-color 200ms',
              }}
            >
              {/* Muscle name + bar */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: 0 }}>
                <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                  {muscle}
                </span>
                <LandmarkBar muscle={muscle} sets={sets} />
                <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontVariantNumeric: 'tabular-nums' }}>
                  MEV {MEV[muscle]} · MAV {MAV[muscle]} · MRV {MRV[muscle]}
                </span>
              </div>

              {/* Stepper */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <StepperButton onClick={() => updateVolume(muscle, -1)} label="Decrease" disabled={sets === 0} />
                <span
                  style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    color: 'var(--color-text-primary)',
                    fontVariantNumeric: 'tabular-nums',
                    minWidth: '28px',
                    textAlign: 'center',
                  }}
                >
                  {sets}
                </span>
                <StepperButton onClick={() => updateVolume(muscle, 1)} label="Increase" />
              </div>

              {/* Landmark reference */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', fontVariantNumeric: 'tabular-nums' }}>
                  {sets < MEV[muscle]
                    ? `+${MEV[muscle] - sets} to MEV`
                    : sets < MAV[muscle]
                    ? `+${MAV[muscle] - sets} to MAV`
                    : sets < MRV[muscle]
                    ? `+${MRV[muscle] - sets} to MRV`
                    : `${sets - MRV[muscle]} over MRV`}
                </span>
              </div>

              {/* Status badge */}
              <div>
                <StatusBadge status={status} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Explanation */}
      <div
        style={{
          backgroundColor: 'var(--color-elevated)',
          border: '1px solid var(--color-border)',
          borderRadius: '14px',
          padding: '16px 20px',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
        }}
      >
        {[
          { label: 'MEV', desc: 'Minimum Effective Volume — least sets needed to maintain muscle.' },
          { label: 'MAV', desc: 'Maximum Adaptive Volume — optimal growth zone for most people.' },
          { label: 'MRV', desc: 'Maximum Recoverable Volume — exceeding this impairs recovery.' },
        ].map(item => (
          <div key={item.label}>
            <p style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-secondary)', marginBottom: '4px' }}>{item.label}</p>
            <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      <div style={{ width: '8px', height: '8px', borderRadius: '2px', backgroundColor: color, flexShrink: 0 }} />
      <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>{label}</span>
    </div>
  );
}
