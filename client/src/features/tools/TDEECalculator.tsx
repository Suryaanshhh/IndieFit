import { useRef, useState } from 'react';

/* ─────────────────────────── Constants ─────────────────────────── */

type Sex = 'm' | 'f';
type BmrMethod = 'mifflin' | 'harris' | 'katch';
type NeatLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'heavy';
type Intensity = 'light' | 'moderate' | 'intense';
type Goal = 'cut' | 'recomp' | 'maintain' | 'bulk';
type Pace = 'gentle' | 'standard' | 'aggressive';

const KCAL_PER_KG = 7700; // approximate energy in 1 kg of body weight change
const KG_PER_LB = 0.45359237;
const KCAL_PER_STEP_PER_KG = 0.0004; // net walking cost, roughly 0.5 kcal per kg per km

// NEAT = everything except sleep, food and planned exercise. Scaled to bodyweight.
// kcalPerKg = non-walking movement (standing, chores, work); steps = typical daily steps if you don't enter your own.
const NEAT_LEVELS: Record<NeatLevel, { label: string; kcalPerKg: number; steps: number }> = {
  sedentary: { label: 'Mostly seated (desk job, driving, little movement)', kcalPerKg: 2.0, steps: 4000 },
  light: { label: 'Light (some walking, teaching, shop or lab work)', kcalPerKg: 2.5, steps: 6500 },
  moderate: { label: 'Moderate (on your feet for much of the day)', kcalPerKg: 3.5, steps: 9000 },
  active: { label: 'Active (mostly standing, walking or carrying)', kcalPerKg: 5.0, steps: 12000 },
  heavy: { label: 'Very active (manual or physical labour)', kcalPerKg: 8.0, steps: 15000 },
};

// Gross METs [light, moderate, intense], rounded from the Compendium of Physical Activities.
const ACTIVITIES: Record<string, { label: string; met: [number, number, number] }> = {
  weights: { label: 'Weight training', met: [3.5, 5.0, 6.0] },
  calisthenics: { label: 'Bodyweight / calisthenics', met: [3.8, 5.0, 8.0] },
  running: { label: 'Running', met: [7.0, 9.8, 12.3] },
  cycling: { label: 'Cycling', met: [4.0, 8.0, 10.0] },
  swimming: { label: 'Swimming', met: [5.8, 7.0, 9.8] },
  hiit: { label: 'HIIT / circuit training', met: [4.3, 6.0, 8.0] },
  sports: { label: 'Sports (badminton, football…)', met: [4.5, 7.0, 10.0] },
  yoga: { label: 'Yoga', met: [2.5, 3.0, 4.0] },
};
const INTENSITY_LABELS: Record<Intensity, string> = { light: 'Light', moderate: 'Moderate', intense: 'Intense' };
const INTENSITY_INDEX: Record<Intensity, number> = { light: 0, moderate: 1, intense: 2 };

const PACE_PCT: Record<'cut' | 'bulk', Record<Pace, number>> = {
  cut: { gentle: 0.10, standard: 0.20, aggressive: 0.25 },
  bulk: { gentle: 0.05, standard: 0.08, aggressive: 0.12 },
};
const GOAL_LABELS: Record<Goal, string> = { cut: 'Cut', recomp: 'Recomp', maintain: 'Maintain', bulk: 'Bulk' };
const PROTEIN_PER_KG: Record<Goal, number> = { cut: 2.2, recomp: 2.2, maintain: 1.8, bulk: 1.8 };

type Activity = { id: number; type: string; intensity: Intensity; minutes: number | ''; days: number | '' };

/* ─────────────────────────── Calculation ─────────────────────────── */

function bmrFor(method: BmrMethod, sex: Sex, w: number, h: number, a: number, bf: number | null): number {
  if (method === 'katch' && bf !== null) return 370 + 21.6 * w * (1 - bf / 100);
  if (method === 'harris') {
    return sex === 'm'
      ? 66.5 + 13.75 * w + 5.003 * h - 6.755 * a
      : 655.1 + 9.563 * w + 1.85 * h - 4.676 * a;
  }
  return 10 * w + 6.25 * h - 5 * a + (sex === 'm' ? 5 : -161); // Mifflin-St Jeor
}

// TDEE = (BMR + NEAT + EE) / (1 − TEF)
function calcTdee(p: {
  sex: Sex; w: number; h: number; a: number; bf: number | null; method: BmrMethod;
  neat: NeatLevel; steps: number; activities: Activity[]; tefPct: number;
}) {
  const usedMethod: BmrMethod = p.method === 'katch' && p.bf === null ? 'mifflin' : p.method;
  const bmr = bmrFor(usedMethod, p.sex, p.w, p.h, p.a, p.bf);

  const lvl = NEAT_LEVELS[p.neat];
  const steps = p.steps > 0 ? p.steps : lvl.steps;
  const neat = p.w * (lvl.kcalPerKg + steps * KCAL_PER_STEP_PER_KG);

  // Net METs (MET − 1), because resting energy is already inside BMR.
  let weekly = 0;
  for (const act of p.activities) {
    const mins = Number(act.minutes) || 0;
    const days = Number(act.days) || 0;
    const met = ACTIVITIES[act.type].met[INTENSITY_INDEX[act.intensity]];
    weekly += (met - 1) * p.w * (mins / 60) * days;
  }
  const ee = weekly / 7;

  const sum = bmr + neat + ee;
  const tdee = sum / (1 - p.tefPct / 100);
  return { bmr, neat, ee, tef: tdee - sum, tdee, usedMethod, steps };
}

/* ─────────────────────────── Styles & small components ─────────────────────────── */

const labelStyle: React.CSSProperties = {
  fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)',
  textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px', display: 'block',
};
const inputStyle: React.CSSProperties = {
  height: '44px', backgroundColor: 'var(--color-base)', border: '1px solid var(--color-border)',
  borderRadius: '10px', color: 'var(--color-text-primary)', padding: '0 12px', fontSize: '14px',
  width: '100%', outline: 'none', boxSizing: 'border-box',
};
const selectStyle: React.CSSProperties = {
  ...inputStyle, cursor: 'pointer', appearance: 'none' as const,
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%237C8694' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', paddingRight: '36px',
};
const panel: React.CSSProperties = {
  backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)', borderRadius: '18px', padding: '24px',
};
const hint: React.CSSProperties = { fontSize: '12px', color: 'var(--color-text-muted)', lineHeight: 1.5 };
const ghostBtn: React.CSSProperties = {
  height: '32px', padding: '0 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer',
  border: '1px solid var(--color-border)', backgroundColor: 'transparent', color: 'var(--color-text-secondary)',
};

function Segmented<T extends string>({
  options, value, onChange, labels,
}: { options: T[]; value: T; onChange: (v: T) => void; labels: Record<string, string> }) {
  return (
    <div style={{ display: 'flex', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-base)' }}>
      {options.map(opt => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          aria-pressed={value === opt}
          style={{
            flex: 1, height: '44px', padding: '0 10px', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
            border: 'none', whiteSpace: 'nowrap',
            backgroundColor: value === opt ? 'var(--color-signal-red)' : 'transparent',
            color: value === opt ? '#fff' : 'var(--color-text-secondary)',
            transition: 'color 150ms, background-color 150ms',
          }}
        >
          {labels[opt]}
        </button>
      ))}
    </div>
  );
}

function NumField({
  label, value, onChange, placeholder, min, max, step,
}: {
  label: string; value: number | ''; onChange: (v: number | '') => void;
  placeholder?: string; min?: number; max?: number; step?: number;
}) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <input
        type="number" inputMode="decimal" min={min} max={max} step={step}
        value={value} placeholder={placeholder}
        onChange={e => onChange(e.target.value === '' ? '' : parseFloat(e.target.value))}
        style={inputStyle}
        onFocus={e => { e.currentTarget.style.borderColor = 'var(--color-signal-red)'; }}
        onBlur={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
      />
    </div>
  );
}

const num = (v: number | '') => (typeof v === 'number' && !Number.isNaN(v) ? v : 0);
const fmt = (n: number) => Math.round(n).toLocaleString();

/* ─────────────────────────── Component ─────────────────────────── */

export function TDEECalculator() {
  const nextId = useRef(2);

  const [sex, setSex] = useState<Sex>('m');
  const [age, setAge] = useState<number | ''>('');
  const [wUnit, setWUnit] = useState<'kg' | 'lb'>('kg');
  const [weight, setWeight] = useState<number | ''>('');
  const [hUnit, setHUnit] = useState<'cm' | 'ftin'>('cm');
  const [heightCm, setHeightCm] = useState<number | ''>('');
  const [feet, setFeet] = useState<number | ''>('');
  const [inches, setInches] = useState<number | ''>('');
  const [bodyFat, setBodyFat] = useState<number | ''>('');
  const [method, setMethod] = useState<BmrMethod>('mifflin');

  const [neatLevel, setNeatLevel] = useState<NeatLevel>('light');
  const [steps, setSteps] = useState<number | ''>('');
  const [tefPct, setTefPct] = useState<number | ''>(10);

  const [activities, setActivities] = useState<Activity[]>([
    { id: 1, type: 'weights', intensity: 'moderate', minutes: 60, days: 3 },
  ]);

  const [goal, setGoal] = useState<Goal>('maintain');
  const [pace, setPace] = useState<Pace>('standard');

  const [aIntake, setAIntake] = useState<number | ''>('');
  const [aDir, setADir] = useState<'loss' | 'gain'>('loss');
  const [aChange, setAChange] = useState<number | ''>('');

  const updateAct = (id: number, patch: Partial<Activity>) =>
    setActivities(list => list.map(x => (x.id === id ? { ...x, ...patch } : x)));
  const addAct = () =>
    setActivities(list => [...list, { id: nextId.current++, type: 'running', intensity: 'moderate', minutes: 30, days: 2 }]);
  const copyAct = (id: number) =>
    setActivities(list => {
      const src = list.find(x => x.id === id);
      return src ? [...list, { ...src, id: nextId.current++ }] : list;
    });
  const removeAct = (id: number) => setActivities(list => list.filter(x => x.id !== id));

  // Convert to metric
  const w = wUnit === 'kg' ? num(weight) : num(weight) * KG_PER_LB;
  const h = hUnit === 'cm' ? num(heightCm) : (num(feet) * 12 + num(inches)) * 2.54;
  const a = num(age);
  const bfNum = num(bodyFat);
  const bf = bfNum >= 5 && bfNum <= 60 ? bfNum : null;
  const tef = Math.min(20, Math.max(0, tefPct === '' ? 10 : tefPct));
  const ready = a > 0 && h > 0 && w > 0;

  const r = ready
    ? calcTdee({ sex, w, h, a, bf, method, neat: neatLevel, steps: num(steps), activities, tefPct: tef })
    : null;

  // Targets & macros
  let t: null | {
    target: number; weekly: number; hitFloor: boolean; lowCarb: boolean;
    protein: number; carbs: number; fat: number;
  } = null;
  if (r) {
    let pct = 0;
    if (goal === 'cut') pct = -PACE_PCT.cut[pace];
    if (goal === 'bulk') pct = PACE_PCT.bulk[pace];
    let target = r.tdee * (1 + pct);
    const floor = sex === 'm' ? 1500 : 1200;
    const hitFloor = target < floor;
    if (hitFloor) target = floor;
    const protein = Math.min(w * PROTEIN_PER_KG[goal], (target * 0.4) / 4);
    let fat = Math.max(0.7 * w, (target * 0.25) / 9);
    let carbs = (target - protein * 4 - fat * 9) / 4;
    let lowCarb = false;
    if (carbs < 0) {
      fat = Math.max(0.6 * w, (target - protein * 4) / 9);
      carbs = Math.max(0, (target - protein * 4 - fat * 9) / 4);
      lowCarb = true;
    }
    t = { target, weekly: ((target - r.tdee) * 7) / KCAL_PER_KG, hitFloor, lowCarb, protein, carbs, fat };
  }

  // Actual TDEE from tracking
  let actual: number | null = null;
  if (r && num(aIntake) > 0 && aChange !== '') {
    const kgPerWeek = wUnit === 'kg' ? num(aChange) : num(aChange) * KG_PER_LB;
    const dailyBalance = (kgPerWeek * KCAL_PER_KG) / 7;
    actual = aDir === 'loss' ? num(aIntake) + dailyBalance : num(aIntake) - dailyBalance;
  }

  const sub: React.CSSProperties = { ...labelStyle, color: 'var(--color-text-secondary)', marginBottom: '12px' };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '16px', alignItems: 'start' }}>
      {/* ───────── Inputs ───────── */}
      <div style={{ ...panel, display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Basics */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <p style={sub}>Basic information</p>
          <Segmented<Sex> options={['m', 'f']} value={sex} onChange={setSex} labels={{ m: 'Male', f: 'Female' }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <NumField label="Age" value={age} onChange={setAge} placeholder="25" min={14} max={100} />
            <NumField label={`Weight (${wUnit})`} value={weight} onChange={setWeight} placeholder={wUnit === 'kg' ? '75' : '165'} min={20} max={700} step={0.1} />
          </div>
          <Segmented<'kg' | 'lb'> options={['kg', 'lb']} value={wUnit} onChange={setWUnit} labels={{ kg: 'Kilograms', lb: 'Pounds' }} />
          {hUnit === 'cm' ? (
            <NumField label="Height (cm)" value={heightCm} onChange={setHeightCm} placeholder="175" min={100} max={250} />
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <NumField label="Feet" value={feet} onChange={setFeet} placeholder="5" min={3} max={8} />
              <NumField label="Inches" value={inches} onChange={setInches} placeholder="9" min={0} max={11} />
            </div>
          )}
          <Segmented<'cm' | 'ftin'> options={['cm', 'ftin']} value={hUnit} onChange={setHUnit} labels={{ cm: 'Centimetres', ftin: 'Feet & inches' }} />
        </div>

        {/* Body composition + formula */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <p style={sub}>Resting energy (BMR)</p>
          <div>
            <NumField label="Body fat % (optional)" value={bodyFat} onChange={setBodyFat} placeholder="e.g. 18" min={5} max={60} step={0.5} />
            <p style={{ ...hint, marginTop: '6px' }}>Needed for Katch–McArdle. Accuracy depends on how well you know this number.</p>
          </div>
          <div>
            <label style={labelStyle}>BMR formula</label>
            <select value={method} onChange={e => setMethod(e.target.value as BmrMethod)} style={selectStyle}>
              <option value="mifflin" style={{ backgroundColor: 'var(--color-card)' }}>Mifflin–St Jeor (recommended)</option>
              <option value="harris" style={{ backgroundColor: 'var(--color-card)' }}>Harris–Benedict (1919, tends to run high)</option>
              <option value="katch" style={{ backgroundColor: 'var(--color-card)' }}>Katch–McArdle (uses body fat %)</option>
            </select>
            {method === 'katch' && bf === null && (
              <p style={{ ...hint, marginTop: '6px', color: 'var(--color-signal-red)' }}>Enter body fat % to use this formula. Using Mifflin–St Jeor for now.</p>
            )}
          </div>
        </div>

        {/* NEAT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <p style={sub}>Daily movement (NEAT, outside workouts)</p>
          <select value={neatLevel} onChange={e => setNeatLevel(e.target.value as NeatLevel)} style={selectStyle}>
            {(Object.keys(NEAT_LEVELS) as NeatLevel[]).map(k => (
              <option key={k} value={k} style={{ backgroundColor: 'var(--color-card)' }}>{NEAT_LEVELS[k].label}</option>
            ))}
          </select>
          <div>
            <NumField label="Daily steps (optional)" value={steps} onChange={setSteps} placeholder={String(NEAT_LEVELS[neatLevel].steps)} min={0} max={60000} step={100} />
            <p style={{ ...hint, marginTop: '6px' }}>Leave blank and we assume a typical step count for your category.</p>
          </div>
        </div>

        {/* Exercise */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ ...sub, marginBottom: 0 }}>Structured exercise</p>
            <button onClick={addAct} style={{ ...ghostBtn, color: 'var(--color-signal-red)', borderColor: 'rgba(225,29,42,0.35)' }}>+ Add activity</button>
          </div>
          <p style={hint}>Don’t add walking here. Count it in your daily steps above.</p>

          {activities.length === 0 && <p style={hint}>No exercise added. Your estimate will use daily movement only.</p>}

          {activities.map(act => (
            <div key={act.id} style={{ backgroundColor: 'var(--color-elevated)', border: '1px solid var(--color-border)', borderRadius: '12px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <select value={act.type} onChange={e => updateAct(act.id, { type: e.target.value })} style={selectStyle} aria-label="Activity type">
                {Object.entries(ACTIVITIES).map(([k, v]) => (
                  <option key={k} value={k} style={{ backgroundColor: 'var(--color-card)' }}>{v.label}</option>
                ))}
              </select>
              <Segmented<Intensity> options={['light', 'moderate', 'intense']} value={act.intensity} onChange={v => updateAct(act.id, { intensity: v })} labels={INTENSITY_LABELS} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <NumField label="Minutes / session" value={act.minutes} onChange={v => updateAct(act.id, { minutes: v })} min={0} max={300} />
                <NumField label="Days / week" value={act.days} onChange={v => updateAct(act.id, { days: v })} min={0} max={7} />
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => copyAct(act.id)} style={ghostBtn}>Copy</button>
                <button onClick={() => removeAct(act.id)} style={ghostBtn}>Remove</button>
              </div>
            </div>
          ))}
          <p style={hint}>
            Light: you can chat easily. Moderate: breathing harder, short sentences. Intense: too breathless to talk.
          </p>
        </div>

        {/* Advanced */}
        <div>
          <p style={sub}>Advanced</p>
          <NumField label="Thermic effect of food (%)" value={tefPct} onChange={setTefPct} min={0} max={20} step={0.5} />
          <p style={{ ...hint, marginTop: '6px' }}>
            10% suits a mixed diet. Very high-protein diets run a little higher, very low-protein diets a little lower.
          </p>
        </div>
      </div>

      {/* ───────── Results ───────── */}
      {r && t ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ ...panel, padding: '20px', borderRadius: '14px' }}>
            <p style={{ ...labelStyle, marginBottom: '6px' }}>Maintenance calories (TDEE)</p>
            <p style={{ fontSize: '40px', fontWeight: 800, color: 'var(--color-text-primary)', fontVariantNumeric: 'tabular-nums', lineHeight: 1.05 }}>
              {fmt(r.tdee)} <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-text-muted)' }}>kcal / day</span>
            </p>
            <p style={{ ...hint, marginTop: '6px' }}>
              Likely range {fmt(r.tdee * 0.92)}–{fmt(r.tdee * 1.08)} · BMR {fmt(r.bmr)} kcal
            </p>
          </div>

          <div style={panel}>
            <p style={{ ...labelStyle, marginBottom: '14px' }}>Where your energy goes</p>
            <div style={{ display: 'flex', height: '10px', borderRadius: '5px', overflow: 'hidden', backgroundColor: 'var(--color-base)' }}>
              <div style={{ width: `${(r.bmr / r.tdee) * 100}%`, backgroundColor: 'var(--color-text-muted)' }} />
              <div style={{ width: `${(r.neat / r.tdee) * 100}%`, backgroundColor: 'var(--color-text-secondary)' }} />
              <div style={{ width: `${(r.ee / r.tdee) * 100}%`, backgroundColor: 'var(--color-signal-red)' }} />
              <div style={{ width: `${(r.tef / r.tdee) * 100}%`, backgroundColor: 'rgba(238,242,247,0.35)' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginTop: '14px' }}>
              {[
                { t: 'BMR', v: r.bmr },
                { t: 'NEAT', v: r.neat },
                { t: 'Exercise', v: r.ee },
                { t: 'Digestion', v: r.tef },
              ].map(x => (
                <div key={x.t}>
                  <p style={hint}>{x.t}</p>
                  <p style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text-primary)', fontVariantNumeric: 'tabular-nums' }}>{fmt(x.v)}</p>
                </div>
              ))}
            </div>
            <p style={{ ...hint, marginTop: '14px' }}>
              TDEE = (BMR + NEAT + exercise) ÷ (1 − {tef}% digestion). BMR from{' '}
              {r.usedMethod === 'mifflin' ? 'Mifflin–St Jeor' : r.usedMethod === 'harris' ? 'Harris–Benedict' : 'Katch–McArdle'}; NEAT uses about {fmt(r.steps)} steps a day.
            </p>
          </div>

          {/* Targets */}
          <div style={panel}>
            <p style={{ ...labelStyle, marginBottom: '12px' }}>Calorie target</p>
            <Segmented<Goal> options={['cut', 'recomp', 'maintain', 'bulk']} value={goal} onChange={setGoal} labels={GOAL_LABELS} />
            {(goal === 'cut' || goal === 'bulk') && (
              <div style={{ marginTop: '10px' }}>
                <Segmented<Pace>
                  options={['gentle', 'standard', 'aggressive']} value={pace} onChange={setPace}
                  labels={{
                    gentle: goal === 'cut' ? 'Gentle −10%' : 'Lean +5%',
                    standard: goal === 'cut' ? 'Standard −20%' : 'Standard +8%',
                    aggressive: goal === 'cut' ? 'Fast −25%' : 'Fast +12%',
                  }}
                />
              </div>
            )}
            <p style={{ fontSize: '32px', fontWeight: 800, color: 'var(--color-text-primary)', fontVariantNumeric: 'tabular-nums', marginTop: '16px', lineHeight: 1.05 }}>
              {fmt(t.target)} <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-text-muted)' }}>kcal / day</span>
            </p>
            <p style={{ ...hint, marginTop: '4px' }}>
              {Math.abs(t.weekly) < 0.02 ? 'Weight should stay stable.' : `About ${t.weekly > 0 ? '+' : '−'}${Math.abs(t.weekly).toFixed(2)} kg per week.`}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginTop: '16px' }}>
              {[
                { label: 'Protein', g: t.protein, k: 4 },
                { label: 'Carbs', g: t.carbs, k: 4 },
                { label: 'Fat', g: t.fat, k: 9 },
              ].map(m => (
                <div key={m.label} style={{ backgroundColor: 'var(--color-elevated)', border: '1px solid var(--color-border)', borderRadius: '12px', padding: '14px' }}>
                  <p style={{ ...labelStyle, fontSize: '11px', marginBottom: '6px' }}>{m.label}</p>
                  <p style={{ fontSize: '22px', fontWeight: 800, color: 'var(--color-text-primary)', fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>
                    {Math.round(m.g)}<span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--color-text-muted)', marginLeft: '2px' }}>g</span>
                  </p>
                  <p style={{ ...hint, marginTop: '4px' }}>{Math.round((m.g * m.k * 100) / t.target)}%</p>
                </div>
              ))}
            </div>
            <p style={{ ...hint, marginTop: '12px' }}>
              Protein {PROTEIN_PER_KG[goal]} g/kg · fat at least 0.7 g/kg · carbs fill the rest.
            </p>
            {t.hitFloor && (
              <p style={{ ...hint, marginTop: '8px', color: 'var(--color-signal-red)' }}>
                That pace would go below a safe minimum, so the target is held at {sex === 'm' ? '1,500' : '1,200'} kcal. Try a gentler pace.
              </p>
            )}
            {t.lowCarb && (
              <p style={{ ...hint, marginTop: '8px', color: 'var(--color-signal-red)' }}>
                Protein and fat use almost all of your calories, so carbs are very low. Consider a gentler pace.
              </p>
            )}
          </div>

          {/* Actual TDEE */}
          <div style={panel}>
            <p style={{ ...labelStyle, marginBottom: '4px' }}>Calculate your actual TDEE</p>
            <p style={{ ...hint, marginBottom: '14px' }}>
              Eat at a steady level for 2–3 weeks, log your intake, and track your weekly weight change. Then enter the averages to find what your body really needs.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <NumField label="Average calories per day" value={aIntake} onChange={setAIntake} placeholder="2500" min={0} />
              <Segmented<'loss' | 'gain'> options={['loss', 'gain']} value={aDir} onChange={setADir} labels={{ loss: 'Losing', gain: 'Gaining' }} />
              <NumField label={`Average change per week (${wUnit})`} value={aChange} onChange={setAChange} placeholder="0.5" min={0} step={0.1} />
            </div>
            {actual !== null && (
              <p style={{ fontSize: '14px', color: 'var(--color-text-primary)', marginTop: '14px', lineHeight: 1.5 }}>
                Your actual maintenance is about <strong style={{ fontVariantNumeric: 'tabular-nums' }}>{fmt(actual)} kcal</strong>, which is{' '}
                {fmt(Math.abs(actual - r.tdee))} {actual >= r.tdee ? 'above' : 'below'} the estimate. Trust it if your logging and weigh-ins were consistent.
              </p>
            )}
          </div>
        </div>
      ) : (
        <div style={{ ...panel, textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '14px' }}>
          Enter your age, weight and height to see your BMR, TDEE and calorie targets.
        </div>
      )}
    </div>
  );
}