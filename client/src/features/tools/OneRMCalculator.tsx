import { useState } from 'react';

type Unit = 'kg' | 'lbs';
type Formula = 'epley' | 'brzycki' | 'lombardi';

const PCT_TABLE = [
  { pct: 95, label: 'Heavy single', repRange: '1–2', rir: '0–1' },
  { pct: 85, label: 'Strength',     repRange: '3–5', rir: '1–2' },
  { pct: 75, label: 'Hypertrophy',  repRange: '8–12', rir: '2–3' },
  { pct: 65, label: 'Volume / technique', repRange: '12–15', rir: '3–4' },
];

function calcOneRM(w: number, r: number, formula: Formula): number {
  if (r === 1 || w <= 0) return w;
  switch (formula) {
    case 'epley':    return w * (1 + r / 30);
    case 'brzycki':  return w * (36 / (37 - r));
    case 'lombardi': return w * Math.pow(r, 0.1);
  }
}

const FORMULA_LABELS: Record<Formula, string> = {
  epley:    'Epley',
  brzycki:  'Brzycki',
  lombardi: 'Lombardi',
};

const inputStyle: React.CSSProperties = {
  height: '44px',
  backgroundColor: 'var(--color-base)',
  border: '1px solid var(--color-border)',
  borderRadius: '10px',
  color: 'var(--color-text-primary)',
  padding: '0 12px',
  fontSize: '14px',
  width: '100%',
  outline: 'none',
  transition: 'border-color 150ms',
};

export function OneRMCalculator() {
  const [weight, setWeight] = useState<number | ''>('');
  const [reps, setReps]     = useState<number>(5);
  const [unit, setUnit]     = useState<Unit>('kg');
  const [formula, setFormula] = useState<Formula>('epley');

  const w = typeof weight === 'number' ? weight : 0;
  const oneRM = w > 0 ? calcOneRM(w, reps, formula) : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Input panel */}
      <div
        style={{
          backgroundColor: 'var(--color-card)',
          border: '1px solid var(--color-border)',
          borderRadius: '18px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        {/* Weight + unit */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Weight lifted
          </label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="number"
              min={0}
              step={0.5}
              value={weight}
              onChange={e => setWeight(e.target.value === '' ? '' : parseFloat(e.target.value))}
              placeholder="e.g. 100"
              style={{ ...inputStyle, flex: 1 }}
              onFocus={e => { e.currentTarget.style.borderColor = 'var(--color-signal-red)'; }}
              onBlur={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
            />
            {/* Unit toggle */}
            <div style={{ display: 'flex', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-base)' }}>
              {(['kg', 'lbs'] as Unit[]).map(u => (
                <button
                  key={u}
                  onClick={() => setUnit(u)}
                  style={{
                    height: '44px',
                    minWidth: '44px',
                    padding: '0 14px',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    border: 'none',
                    backgroundColor: unit === u ? 'var(--color-signal-red)' : 'transparent',
                    color: unit === u ? '#fff' : 'var(--color-text-secondary)',
                    transition: 'color 150ms, background-color 150ms',
                  }}
                  onMouseEnter={e => { if (unit !== u) e.currentTarget.style.color = 'var(--color-text-primary)'; }}
                  onMouseLeave={e => { if (unit !== u) e.currentTarget.style.color = 'var(--color-text-secondary)'; }}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Reps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Reps performed
            </label>
            <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-primary)', fontVariantNumeric: 'tabular-nums' }}>
              {reps}
            </span>
          </div>
          <input
            type="range"
            min={1}
            max={15}
            value={reps}
            onChange={e => setReps(parseInt(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--color-signal-red)', cursor: 'pointer' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>1</span>
            <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>15</span>
          </div>
        </div>

        {/* Formula tabs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Formula
          </label>
          <div style={{ display: 'flex', gap: '6px' }}>
            {(Object.keys(FORMULA_LABELS) as Formula[]).map(f => (
              <button
                key={f}
                onClick={() => setFormula(f)}
                style={{
                  height: '44px',
                  padding: '0 16px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: '1px solid',
                  borderColor: formula === f ? 'var(--color-signal-red)' : 'var(--color-border)',
                  backgroundColor: formula === f ? 'rgba(225,29,42,0.10)' : 'var(--color-base)',
                  color: formula === f ? 'var(--color-signal-red)' : 'var(--color-text-secondary)',
                  transition: 'color 150ms, background-color 150ms, border-color 150ms',
                }}
                onMouseEnter={e => { if (formula !== f) e.currentTarget.style.color = 'var(--color-text-primary)'; }}
                onMouseLeave={e => { if (formula !== f) e.currentTarget.style.color = 'var(--color-text-secondary)'; }}
              >
                {FORMULA_LABELS[f]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Result */}
      {oneRM !== null ? (
        <div
          style={{
            backgroundColor: 'var(--color-card)',
            border: '1px solid var(--color-border)',
            borderRadius: '18px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <div>
            <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
              Estimated 1RM
            </p>
            <p style={{ fontSize: '36px', fontWeight: 800, color: 'var(--color-text-primary)', fontVariantNumeric: 'tabular-nums', lineHeight: 1.1 }}>
              {oneRM.toFixed(1)} <span style={{ fontSize: '18px', fontWeight: 500, color: 'var(--color-text-secondary)' }}>{unit}</span>
            </p>
          </div>

          {/* Percentage table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr>
                  {['%', 'Zone', 'Target weight', 'Rep range', 'RIR'].map(h => (
                    <th
                      key={h}
                      style={{
                        textAlign: 'left',
                        paddingBottom: '8px',
                        paddingRight: '16px',
                        fontSize: '11px',
                        fontWeight: 600,
                        color: 'var(--color-text-muted)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        borderBottom: '1px solid var(--color-border)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PCT_TABLE.map(row => {
                  const target = (oneRM * row.pct) / 100;
                  return (
                    <tr key={row.pct}>
                      <td style={{ padding: '10px 16px 10px 0', color: 'var(--color-text-primary)', fontVariantNumeric: 'tabular-nums', fontWeight: 700, borderBottom: '1px solid var(--color-border)', whiteSpace: 'nowrap' }}>
                        {row.pct}%
                      </td>
                      <td style={{ padding: '10px 16px 10px 0', color: 'var(--color-text-secondary)', borderBottom: '1px solid var(--color-border)', whiteSpace: 'nowrap' }}>
                        {row.label}
                      </td>
                      <td style={{ padding: '10px 16px 10px 0', color: 'var(--color-text-primary)', fontVariantNumeric: 'tabular-nums', fontWeight: 600, borderBottom: '1px solid var(--color-border)', whiteSpace: 'nowrap' }}>
                        {target.toFixed(1)} {unit}
                      </td>
                      <td style={{ padding: '10px 16px 10px 0', color: 'var(--color-text-muted)', borderBottom: '1px solid var(--color-border)', whiteSpace: 'nowrap' }}>
                        {row.repRange}
                      </td>
                      <td style={{ padding: '10px 0 10px 0', color: 'var(--color-text-muted)', borderBottom: '1px solid var(--color-border)', whiteSpace: 'nowrap' }}>
                        {row.rir}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div
          style={{
            backgroundColor: 'var(--color-card)',
            border: '1px solid var(--color-border)',
            borderRadius: '18px',
            padding: '24px',
            textAlign: 'center',
            color: 'var(--color-text-muted)',
            fontSize: '14px',
          }}
        >
          Enter a weight to see your 1RM estimate.
        </div>
      )}
    </div>
  );
}
