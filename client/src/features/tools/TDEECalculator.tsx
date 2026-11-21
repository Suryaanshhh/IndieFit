import { useState } from 'react';

type Sex = 'm' | 'f';
type ActivityLevel = 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' | 'extra_active';
type Goal = 'cut' | 'recomp' | 'maintain' | 'bulk';

const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary:         1.2,
  lightly_active:    1.375,
  moderately_active: 1.55,
  very_active:       1.725,
  extra_active:      1.9,
};

const ACTIVITY_LABELS: Record<ActivityLevel, string> = {
  sedentary:         'Sedentary (desk job, no exercise)',
  lightly_active:    'Lightly active (1–3 days/week)',
  moderately_active: 'Moderately active (3–5 days/week)',
  very_active:       'Very active (6–7 days/week)',
  extra_active:      'Extra active (athlete / physical job)',
};

const GOAL_ADJUSTMENTS: Record<Goal, number> = {
  cut:      -500,
  recomp:      0,
  maintain:    0,
  bulk:      300,
};

const GOAL_LABELS: Record<Goal, string> = {
  cut:     'Cut',
  recomp:  'Recomp',
  maintain:'Maintain',
  bulk:    'Bulk',
};

const GOAL_NOTES: Record<Goal, string> = {
  cut:     '~0.5 kg/week fat loss',
  recomp:  'Simultaneous fat loss + muscle gain',
  maintain:'Hold current weight',
  bulk:    '~0.25 kg/week muscle gain',
};

const labelStyle: React.CSSProperties = {
  fontSize: '12px',
  fontWeight: 600,
  color: 'var(--color-text-muted)',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  marginBottom: '6px',
  display: 'block',
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
  boxSizing: 'border-box',
};

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  cursor: 'pointer',
  appearance: 'none' as const,
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%237C8694' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 12px center',
  paddingRight: '36px',
};

function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  labels,
}: {
  options: T[];
  value: T;
  onChange: (v: T) => void;
  labels?: Record<string, string>;
}) {
  return (
    <div style={{ display: 'flex', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-base)' }}>
      {options.map(opt => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          style={{
            flex: 1,
            height: '44px',
            padding: '0 12px',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
            border: 'none',
            backgroundColor: value === opt ? 'var(--color-signal-red)' : 'transparent',
            color: value === opt ? '#fff' : 'var(--color-text-secondary)',
            transition: 'color 150ms, background-color 150ms',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => { if (value !== opt) e.currentTarget.style.color = 'var(--color-text-primary)'; }}
          onMouseLeave={e => { if (value !== opt) e.currentTarget.style.color = 'var(--color-text-secondary)'; }}
        >
          {labels ? labels[opt] : opt}
        </button>
      ))}
    </div>
  );
}

export function TDEECalculator() {
  const [sex, setSex]                 = useState<Sex>('m');
  const [age, setAge]                 = useState<number | ''>('');
  const [heightCm, setHeightCm]       = useState<number | ''>('');
  const [weightKg, setWeightKg]       = useState<number | ''>('');
  const [activityLevel, setActivity]  = useState<ActivityLevel>('moderately_active');
  const [goal, setGoal]               = useState<Goal>('maintain');

  const a = typeof age === 'number' ? age : 0;
  const h = typeof heightCm === 'number' ? heightCm : 0;
  const w = typeof weightKg === 'number' ? weightKg : 0;

  const hasInputs = a > 0 && h > 0 && w > 0;

  let result: {
    bmr: number; tdee: number; targetCals: number;
    protein: number; fat: number; carbs: number;
    proteinCals: number; fatCals: number; carbCals: number;
  } | null = null;

  if (hasInputs) {
    const bmr = sex === 'm'
      ? 10 * w + 6.25 * h - 5 * a + 5
      : 10 * w + 6.25 * h - 5 * a - 161;

    const tdee = bmr * ACTIVITY_MULTIPLIERS[activityLevel];
    const adjustment = GOAL_ADJUSTMENTS[goal];
    const targetCals = tdee + adjustment;

    const protein = w * (goal === 'cut' || goal === 'recomp' ? 2.0 : 1.8);
    const fat     = (targetCals * 0.25) / 9;
    const carbs   = (targetCals - protein * 4 - fat * 9) / 4;

    result = {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      targetCals: Math.round(targetCals),
      protein: Math.round(protein),
      fat: Math.round(fat),
      carbs: Math.max(0, Math.round(carbs)),
      proteinCals: Math.round(protein * 4),
      fatCals: Math.round(fat * 9),
      carbCals: Math.max(0, Math.round(Math.max(0, carbs) * 4)),
    };
  }

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
        {/* Sex */}
        <div>
          <label style={labelStyle}>Sex</label>
          <SegmentedControl<Sex>
            options={['m', 'f']}
            value={sex}
            onChange={setSex}
            labels={{ m: 'Male', f: 'Female' }}
          />
        </div>

        {/* Age + Height + Weight */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          <div>
            <label style={labelStyle}>Age</label>
            <input
              type="number"
              min={10}
              max={100}
              value={age}
              onChange={e => setAge(e.target.value === '' ? '' : parseInt(e.target.value))}
              placeholder="30"
              style={inputStyle}
              onFocus={e => { e.currentTarget.style.borderColor = 'var(--color-signal-red)'; }}
              onBlur={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
            />
          </div>
          <div>
            <label style={labelStyle}>Height (cm)</label>
            <input
              type="number"
              min={100}
              max={250}
              value={heightCm}
              onChange={e => setHeightCm(e.target.value === '' ? '' : parseFloat(e.target.value))}
              placeholder="175"
              style={inputStyle}
              onFocus={e => { e.currentTarget.style.borderColor = 'var(--color-signal-red)'; }}
              onBlur={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
            />
          </div>
          <div>
            <label style={labelStyle}>Weight (kg)</label>
            <input
              type="number"
              min={30}
              max={300}
              step={0.1}
              value={weightKg}
              onChange={e => setWeightKg(e.target.value === '' ? '' : parseFloat(e.target.value))}
              placeholder="80"
              style={inputStyle}
              onFocus={e => { e.currentTarget.style.borderColor = 'var(--color-signal-red)'; }}
              onBlur={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
            />
          </div>
        </div>

        {/* Activity level */}
        <div>
          <label style={labelStyle}>Activity level</label>
          <select
            value={activityLevel}
            onChange={e => setActivity(e.target.value as ActivityLevel)}
            style={selectStyle}
          >
            {(Object.keys(ACTIVITY_LABELS) as ActivityLevel[]).map(k => (
              <option key={k} value={k} style={{ backgroundColor: 'var(--color-card)' }}>
                {ACTIVITY_LABELS[k]}
              </option>
            ))}
          </select>
        </div>

        {/* Goal */}
        <div>
          <label style={labelStyle}>Goal</label>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {(Object.keys(GOAL_LABELS) as Goal[]).map(g => (
              <button
                key={g}
                onClick={() => setGoal(g)}
                style={{
                  height: '44px',
                  padding: '0 18px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: '1px solid',
                  borderColor: goal === g ? 'var(--color-signal-red)' : 'var(--color-border)',
                  backgroundColor: goal === g ? 'rgba(225,29,42,0.10)' : 'var(--color-base)',
                  color: goal === g ? 'var(--color-signal-red)' : 'var(--color-text-secondary)',
                  transition: 'color 150ms, background-color 150ms, border-color 150ms',
                }}
                onMouseEnter={e => { if (goal !== g) e.currentTarget.style.color = 'var(--color-text-primary)'; }}
                onMouseLeave={e => { if (goal !== g) e.currentTarget.style.color = 'var(--color-text-secondary)'; }}
              >
                {GOAL_LABELS[g]}
              </button>
            ))}
          </div>
          {goal !== 'maintain' && (
            <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '6px' }}>
              {GOAL_NOTES[goal]}
            </p>
          )}
        </div>
      </div>

      {/* Results */}
      {result ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* TDEE summary row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            <div
              style={{
                backgroundColor: 'var(--color-card)',
                border: '1px solid var(--color-border)',
                borderRadius: '14px',
                padding: '20px',
              }}
            >
              <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                Maintenance TDEE
              </p>
              <p style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-text-primary)', fontVariantNumeric: 'tabular-nums', lineHeight: 1.1 }}>
                {result.tdee.toLocaleString()}
              </p>
              <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '2px' }}>kcal / day</p>
            </div>
            <div
              style={{
                backgroundColor: goal === 'cut' ? 'rgba(225,29,42,0.07)' : 'var(--color-card)',
                border: `1px solid ${goal === 'cut' ? 'rgba(225,29,42,0.20)' : 'var(--color-border)'}`,
                borderRadius: '14px',
                padding: '20px',
              }}
            >
              <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                Target calories
              </p>
              <p style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-text-primary)', fontVariantNumeric: 'tabular-nums', lineHeight: 1.1 }}>
                {result.targetCals.toLocaleString()}
              </p>
              <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '2px' }}>kcal / day</p>
            </div>
          </div>

          {/* Macro breakdown */}
          <div
            style={{
              backgroundColor: 'var(--color-card)',
              border: '1px solid var(--color-border)',
              borderRadius: '18px',
              padding: '24px',
            }}
          >
            <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>
              Macro targets
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              {[
                { label: 'Protein', grams: result.protein, cals: result.proteinCals, color: 'var(--color-signal-red)' },
                { label: 'Fat',     grams: result.fat,     cals: result.fatCals,     color: 'var(--color-text-secondary)' },
                { label: 'Carbs',   grams: result.carbs,   cals: result.carbCals,    color: 'var(--color-text-secondary)' },
              ].map(macro => (
                <div
                  key={macro.label}
                  style={{
                    backgroundColor: 'var(--color-elevated)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '12px',
                    padding: '16px',
                  }}
                >
                  <p style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                    {macro.label}
                  </p>
                  <p style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-text-primary)', fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>
                    {macro.grams}
                    <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-text-muted)', marginLeft: '2px' }}>g</span>
                  </p>
                  <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '4px', fontVariantNumeric: 'tabular-nums' }}>
                    {macro.cals} kcal
                  </p>
                </div>
              ))}
            </div>

            {/* BMR note */}
            <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '16px', borderTop: '1px solid var(--color-border)', paddingTop: '12px' }}>
              BMR (Mifflin–St Jeor): <span style={{ fontVariantNumeric: 'tabular-nums', color: 'var(--color-text-secondary)' }}>{result.bmr.toLocaleString()} kcal</span>
              {' · '}Protein set at {goal === 'cut' || goal === 'recomp' ? '2.0' : '1.8'} g/kg bodyweight.
            </p>
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
          Fill in your details to see your TDEE and macro targets.
        </div>
      )}
    </div>
  );
}
