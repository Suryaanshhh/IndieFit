import { useState, useCallback, useEffect, useMemo } from 'react';
import { Badge } from '../../components/Badge';

/* ─────────────────────────── Data ─────────────────────────── */

type Muscle =
  | 'Chest' | 'Back' | 'Quads' | 'Hamstrings' | 'Shoulders'
  | 'Biceps' | 'Triceps' | 'Calves' | 'Abs';

const MUSCLES: Muscle[] = [
  'Chest', 'Back', 'Quads', 'Hamstrings', 'Shoulders',
  'Biceps', 'Triceps', 'Calves', 'Abs',
];

type Landmarks = { mv: number; mev: number; mav: number; mrv: number };

// Baseline = intermediate lifter, weekly hard sets, training each muscle ~2x/week.
// These are coaching-derived estimates, not lab-measured thresholds.
const BASE: Record<Muscle, Landmarks> = {
  Chest: { mv: 6, mev: 8, mav: 12, mrv: 20 },
  Back: { mv: 6, mev: 10, mav: 16, mrv: 25 },
  Quads: { mv: 6, mev: 8, mav: 12, mrv: 20 },
  Hamstrings: { mv: 4, mev: 6, mav: 10, mrv: 16 },
  Shoulders: { mv: 6, mev: 6, mav: 10, mrv: 20 },
  Biceps: { mv: 4, mev: 8, mav: 12, mrv: 20 },
  Triceps: { mv: 4, mev: 6, mav: 10, mrv: 16 },
  Calves: { mv: 6, mev: 8, mav: 12, mrv: 20 },
  Abs: { mv: 0, mev: 0, mav: 16, mrv: 25 },
};

type Level = 'beginner' | 'intermediate' | 'advanced';
type Recovery = 'poor' | 'okay' | 'good';

// Beginners grow on less and recover from less; advanced lifters need more to keep progressing.
const LEVEL_SCALE: Record<Level, { mv: number; mev: number; mav: number; mrv: number }> = {
  beginner: { mv: 0.8, mev: 0.75, mav: 0.8, mrv: 0.85 },
  intermediate: { mv: 1, mev: 1, mav: 1, mrv: 1 },
  advanced: { mv: 1, mev: 1.15, mav: 1.1, mrv: 1.1 },
};

function getLandmarks(muscle: Muscle, level: Level): Landmarks {
  const b = BASE[muscle];
  const s = LEVEL_SCALE[level];
  return {
    mv: Math.round(b.mv * s.mv),
    mev: Math.round(b.mev * s.mev),
    mav: Math.round(b.mav * s.mav),
    mrv: Math.round(b.mrv * s.mrv),
  };
}

/* ─────────────────────────── Storage ─────────────────────────── */

const STORAGE_KEY = 'indiefit-volume-v2';
const LEGACY_KEY = 'indiefit-volume-v1';

type SavedState = { volume: Record<Muscle, number>; level: Level; recovery: Recovery };

const emptyVolume = () => {
  const v = {} as Record<Muscle, number>;
  for (const m of MUSCLES) v[m] = 0;
  return v;
};

function readVolume(raw: any): Record<Muscle, number> {
  const v = emptyVolume();
  if (raw && typeof raw === 'object') {
    for (const m of MUSCLES) if (typeof raw[m] === 'number' && raw[m] >= 0) v[m] = raw[m];
  }
  return v;
}

function loadState(): SavedState {
  const fallback: SavedState = { volume: emptyVolume(), level: 'intermediate', recovery: 'okay' };
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const p = JSON.parse(saved);
      return {
        volume: readVolume(p.volume),
        level: ['beginner', 'intermediate', 'advanced'].includes(p.level) ? p.level : 'intermediate',
        recovery: ['poor', 'okay', 'good'].includes(p.recovery) ? p.recovery : 'okay',
      };
    }
    // Migrate sets from the old version of the tracker
    const legacy = localStorage.getItem(LEGACY_KEY);
    if (legacy) return { ...fallback, volume: readVolume(JSON.parse(legacy)) };
  } catch { }
  return fallback;
}

/* ─────────────────────────── Logic ─────────────────────────── */

type Status = 'below' | 'mev' | 'mav' | 'high' | 'mrv';

function getStatus(sets: number, lm: Landmarks): Status {
  if (sets >= lm.mrv) return 'mrv';
  if (sets >= lm.mav && sets >= lm.mrv - 2) return 'high'; // within 2 sets of your ceiling
  if (sets >= lm.mav) return 'mav';
  if (sets >= lm.mev && sets > 0) return 'mev';
  return 'below';
}

// Mesocycle logic: start at MEV, add sets while recovery allows, deload at the ceiling
// or when recovery is poor and volume is already high.
function getAdvice(sets: number, lm: Landmarks, recovery: Recovery): string {
  const deload = Math.max(lm.mv, Math.round(sets * 0.5));
  if (sets >= lm.mrv) return `Deload → ${deload}`;
  if (recovery === 'poor') return sets >= lm.mav ? `Deload → ${deload}` : `Hold at ${sets}`;
  if (sets === 0 && lm.mev > 0) return `Start → ${lm.mev}`;
  if (sets < lm.mev) return `Build → ${Math.min(lm.mev, sets + 2)}`;
  const step = recovery === 'good' ? 2 : 1;
  return `Add → ${Math.min(lm.mrv, sets + step)}`;
}

/* ─────────────────────────── UI pieces ─────────────────────────── */

function StatusBadge({ status }: { status: Status }) {
  const labels: Record<Status, string> = {
    below: 'Below MEV',
    mev: 'Growing',
    mav: 'Optimal',
    high: 'Near limit',
    mrv: 'At MRV',
  };
  const variants: Record<Status, 'muted' | 'default' | 'red'> = {
    below: 'muted',
    mev: 'default',
    mav: 'red',
    high: 'red',
    mrv: 'red',
  };
  return <Badge variant={variants[status]}>{labels[status]}</Badge>;
}

function LandmarkBar({ lm, sets, status }: { lm: Landmarks; sets: number; status: Status }) {
  const max = lm.mrv + 4;
  const fillPct = Math.min((sets / max) * 100, 100);
  const fillColor =
    status === 'below' ? 'var(--color-text-muted)' :
      status === 'mev' ? 'var(--color-text-secondary)' :
        'var(--color-signal-red)';

  const marker = (value: number, color: string, label: string) => (
    <div
      title={`${label}: ${value}`}
      style={{
        position: 'absolute',
        left: `${(value / max) * 100}%`,
        top: '-2px',
        width: '2px',
        height: '10px',
        borderRadius: '1px',
        backgroundColor: color,
        transform: 'translateX(-50%)',
      }}
    />
  );

  return (
    <div style={{ position: 'relative', height: '6px', borderRadius: '3px', backgroundColor: 'var(--color-base)' }}>
      <div
        style={{
          position: 'absolute', left: 0, top: 0, height: '100%',
          width: `${fillPct}%`, borderRadius: '3px', backgroundColor: fillColor,
          transition: 'width 200ms ease, background-color 200ms',
        }}
      />
      {lm.mev > 0 && marker(lm.mev, 'var(--color-text-muted)', 'MEV')}
      {marker(lm.mav, 'var(--color-text-secondary)', 'MAV')}
      {marker(lm.mrv, 'var(--color-signal-red)', 'MRV')}
    </div>
  );
}

function StepperButton({
  onClick, label, symbol, disabled,
}: { onClick: () => void; label: string; symbol: string; disabled?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      style={{
        width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: '10px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-base)',
        color: disabled ? 'var(--color-text-muted)' : 'var(--color-text-primary)',
        fontSize: '20px', fontWeight: 500, cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1, transition: 'color 150ms, background-color 150ms, border-color 150ms',
        userSelect: 'none', lineHeight: 1, flexShrink: 0, padding: 0,
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
      {symbol}
    </button>
  );
}

function Segmented<T extends string>({
  label, value, options, onChange,
}: { label: string; value: T; options: { value: T; text: string }[]; onChange: (v: T) => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {label}
      </span>
      <div
        role="group"
        aria-label={label}
        style={{ display: 'flex', padding: '3px', gap: '2px', borderRadius: '10px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-base)' }}
      >
        {options.map(o => {
          const active = o.value === value;
          return (
            <button
              key={o.value}
              aria-pressed={active}
              onClick={() => onChange(o.value)}
              style={{
                height: '32px', padding: '0 14px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                fontSize: '13px', fontWeight: 600,
                backgroundColor: active ? 'var(--color-card)' : 'transparent',
                color: active ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                transition: 'color 150ms, background-color 150ms',
              }}
            >
              {o.text}
            </button>
          );
        })}
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

/* ─────────────────────────── Main ─────────────────────────── */

export function VolumeTracker() {
  const [state, setState] = useState<SavedState>(loadState);
  const { volume, level, recovery } = state;

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { }
  }, [state]);

  const landmarks = useMemo(() => {
    const out = {} as Record<Muscle, Landmarks>;
    for (const m of MUSCLES) out[m] = getLandmarks(m, level);
    return out;
  }, [level]);

  const updateVolume = useCallback((muscle: Muscle, delta: number) => {
    setState(prev => ({
      ...prev,
      volume: { ...prev.volume, [muscle]: Math.max(0, prev.volume[muscle] + delta) },
    }));
  }, []);

  const reset = () => setState(prev => ({ ...prev, volume: emptyVolume() }));

  const colTemplate = '1fr auto 120px 100px';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Settings */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'flex-end' }}>
        <Segmented<Level>
          label="Training experience"
          value={level}
          onChange={v => setState(prev => ({ ...prev, level: v }))}
          options={[
            { value: 'beginner', text: 'Beginner' },
            { value: 'intermediate', text: 'Intermediate' },
            { value: 'advanced', text: 'Advanced' },
          ]}
        />
        <Segmented<Recovery>
          label="Recovery this week"
          value={recovery}
          onChange={v => setState(prev => ({ ...prev, recovery: v }))}
          options={[
            { value: 'poor', text: 'Poor' },
            { value: 'okay', text: 'Okay' },
            { value: 'good', text: 'Good' },
          ]}
        />
      </div>

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
            height: '36px', padding: '0 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 600,
            cursor: 'pointer', border: '1px solid var(--color-border)', backgroundColor: 'transparent',
            color: 'var(--color-text-muted)', transition: 'color 150ms, border-color 150ms',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-text-primary)'; e.currentTarget.style.borderColor = 'var(--color-text-muted)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-text-muted)'; e.currentTarget.style.borderColor = 'var(--color-border)'; }}
        >
          Reset week
        </button>
      </div>

      {/* Table panel */}
      <div style={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)', borderRadius: '18px', overflow: 'hidden' }}>
        <div
          style={{
            display: 'grid', gridTemplateColumns: colTemplate, gap: '16px',
            padding: '12px 20px', borderBottom: '1px solid var(--color-border)',
          }}
        >
          {['Muscle group', 'Sets / week', 'Next week', 'Status'].map(h => (
            <span key={h} style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {h}
            </span>
          ))}
        </div>

        {MUSCLES.map((muscle, idx) => {
          const sets = volume[muscle];
          const lm = landmarks[muscle];
          const status = getStatus(sets, lm);

          return (
            <div
              key={muscle}
              style={{
                display: 'grid', gridTemplateColumns: colTemplate, gap: '16px',
                padding: '14px 20px', alignItems: 'center',
                borderBottom: idx < MUSCLES.length - 1 ? '1px solid var(--color-border)' : 'none',
                backgroundColor: status === 'mrv' ? 'rgba(225,29,42,0.05)' : 'transparent',
                transition: 'background-color 200ms',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: 0 }}>
                <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)' }}>{muscle}</span>
                <LandmarkBar lm={lm} sets={sets} status={status} />
                <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontVariantNumeric: 'tabular-nums' }}>
                  MEV {lm.mev} · MAV {lm.mav} · MRV {lm.mrv}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <StepperButton onClick={() => updateVolume(muscle, -1)} label={`Decrease ${muscle} sets`} symbol="−" disabled={sets === 0} />
                <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text-primary)', fontVariantNumeric: 'tabular-nums', minWidth: '36px', textAlign: 'center' }}>
                  {sets}
                </span>
                <StepperButton onClick={() => updateVolume(muscle, 1)} label={`Increase ${muscle} sets`} symbol="+" />
              </div>

              <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)', fontVariantNumeric: 'tabular-nums' }}>
                {getAdvice(sets, lm, recovery)}
              </span>

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
          backgroundColor: 'var(--color-elevated)', border: '1px solid var(--color-border)', borderRadius: '14px',
          padding: '16px 20px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px',
        }}
      >
        {[
          { label: 'MEV', desc: 'Minimum Effective Volume: the fewest weekly sets that still drive muscle growth.' },
          { label: 'MAV', desc: 'Maximum Adaptive Volume: the range where most people grow best.' },
          { label: 'MRV', desc: 'Maximum Recoverable Volume: the most you can recover from. Beyond it, progress stalls.' },
        ].map(item => (
          <div key={item.label}>
            <p style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-secondary)', marginBottom: '4px' }}>{item.label}</p>
            <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>{item.desc}</p>
          </div>
        ))}
      </div>

      <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
        Landmarks are evidence-informed starting estimates (popularised by Renaissance Periodization), not exact limits.
        Count hard sets taken close to failure. Adjust to your own progress, sleep and recovery.
      </p>
    </div>
  );
}