import { useState } from 'react';

/* ─────────────────────────── Types & constants ─────────────────────────── */

type Sex = 'm' | 'f';
type Units = 'metric' | 'imperial';
type Exp = 'lt1' | '1to3' | 'gt3';
type Goal = 'muscle' | 'lean' | 'happy';
type Rec = 'recomp' | 'bulk' | 'cut' | 'either';

const KG_PER_LB = 0.45359237;

// Practical guidelines, not hard limits.
// ffmi: average trained-natural reference (raw FFMI). cutTo/bulkTo: the working body-fat range.
// low: below this a bulk is clearly right. high: above this, fat loss comes first.
const BANDS: Record<Sex, { ffmi: number; cutTo: number; bulkTo: number; low: number; high: number; veryLow: number }> = {
    m: { ffmi: 22, cutTo: 10, bulkTo: 17, low: 12, high: 25, veryLow: 8 },
    f: { ffmi: 19, cutTo: 18, bulkTo: 27, low: 20, high: 32, veryLow: 16 },
};

// Rule-of-thumb monthly gain rates as % of bodyweight, by lifting experience.
const GAIN_PCT: Record<Exp, [number, number]> = { lt1: [1, 1.5], '1to3': [0.5, 1], gt3: [0.25, 0.5] };
const EXP_LABEL: Record<Exp, string> = { lt1: 'Under 1 year', '1to3': '1–3 years', gt3: '3+ years' };

/* ─────────────────────────── Analysis ─────────────────────────── */

function analyse(sex: Sex, hM: number, wKg: number, bf: number, exp: Exp) {
    const b = BANDS[sex];
    const lbm = wKg * (1 - bf / 100);
    const ffmi = lbm / (hM * hM);
    const nffmi = ffmi + 6.1 * (1.8 - hM);                       // height-normalised (Kouri et al., 1995)
    const refLbm = (b.ffmi - 6.1 * (1.8 - hM)) * hM * hM;         // lean mass at the reference FFMI
    const ratio = lbm / refLbm;
    const bmi = wKg / (hM * hM);

    // Recomposition is most realistic for newer lifters, or intermediates with plenty of room to grow,
    // and only when body fat is neither very low nor very high.
    const recomp =
        (exp === 'lt1' || (exp === '1to3' && ratio < 0.85)) && bf >= b.low && bf <= b.high;

    let rec: Rec;
    if (recomp) rec = 'recomp';
    else if (bf < b.low) rec = 'bulk';
    else if (bf > b.bulkTo) rec = 'cut';
    else rec = 'either';

    return { b, lbm, ffmi, nffmi, refLbm, ratio, bmi, rec };
}

/* ─────────────────────────── Styles & helpers ─────────────────────────── */

const labelStyle: React.CSSProperties = {
    fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)',
    textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px', display: 'block',
};
const inputStyle: React.CSSProperties = {
    height: '44px', backgroundColor: 'var(--color-base)', border: '1px solid var(--color-border)',
    borderRadius: '10px', color: 'var(--color-text-primary)', padding: '0 12px', fontSize: '14px',
    width: '100%', outline: 'none', boxSizing: 'border-box',
};
const panel: React.CSSProperties = {
    backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)', borderRadius: '18px', padding: '24px',
};
const hint: React.CSSProperties = { fontSize: '12px', color: 'var(--color-text-muted)', lineHeight: 1.5 };

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
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/* ─────────────────────────── Component ─────────────────────────── */

export function StrategyPlanner({ onOpenBodyFat }: { onOpenBodyFat?: () => void }) {
    const [sex, setSex] = useState<Sex>('m');
    const [units, setUnits] = useState<Units>('metric');
    const [heightCm, setHeightCm] = useState<number | ''>('');
    const [feet, setFeet] = useState<number | ''>('');
    const [inches, setInches] = useState<number | ''>('');
    const [weight, setWeight] = useState<number | ''>('');
    const [bodyFat, setBodyFat] = useState<number | ''>('');
    const [exp, setExp] = useState<Exp>('1to3');
    const [goal, setGoal] = useState<Goal>('muscle');

    const metric = units === 'metric';
    const heightCmVal = metric ? num(heightCm) : (num(feet) * 12 + num(inches)) * 2.54;
    const wKg = metric ? num(weight) : num(weight) * KG_PER_LB;
    const bf = num(bodyFat);
    const ready = heightCmVal >= 120 && heightCmVal <= 230 && wKg >= 30 && bf >= 3 && bf <= 60;

    const a = ready ? analyse(sex, heightCmVal / 100, wKg, bf, exp) : null;

    const mu = metric ? 'kg' : 'lb';
    const show = (kg: number) => (metric ? kg : kg / KG_PER_LB).toFixed(1);

    /* Plan text */
    let title = '';
    let reason = '';
    let steps: string[] = [];
    const notes: string[] = [];

    if (a) {
        const { b } = a;
        const fatToLose = (target: number) => wKg - a.lbm / (1 - target / 100);

        if (a.rec === 'recomp') {
            title = 'Body recomposition';
            reason = `You still have room to build muscle (${Math.round(a.ratio * 100)}% of the reference) and enough body fat to lose some. Studies show muscle gain and fat loss can happen together, most reliably in newer lifters and those with room to grow (Barakat et al., 2020).`;
        } else if (a.rec === 'bulk') {
            title = 'Lean bulk';
            reason = 'Your body fat is low enough to eat in a small surplus and build muscle without adding much fat.';
        } else if (a.rec === 'cut') {
            title = 'Cut first';
            reason = bf > b.high
                ? 'Your body fat is high enough that losing fat comes first. Keep lifting hard, and you will hold or even build muscle while you do it.'
                : 'Your body fat is above the range where a bulk works well. A cut will bring it back into the working range.';
        } else {
            title = 'Lean bulk or cut, depending on your goal';
            reason = 'Your body fat sits in the middle of the working range, so either direction is reasonable. Pick the goal below.';
        }

        if (goal === 'happy') {
            steps = ['Eat at maintenance, keep training, and hold your physique. No bulk or cut needed.'];
            if (bf > b.high) steps.push('Your body fat is above the usual health range, so a gradual cut would still be worth considering.');
            if (bf < b.veryLow) steps.push('Your body fat is very low. Make sure you can hold it comfortably and recover well.');
        } else if (goal === 'muscle') {
            if (a.rec === 'recomp') {
                steps = [
                    'Eat around maintenance (up to about 10% below if you want faster fat loss) with protein near 2 g/kg.',
                    'Train each muscle at least twice a week and add weight or reps over time.',
                    `Check progress monthly with your strength, waist and weight trend. Move to a lean bulk if progress stalls or body fat falls below about ${b.low}%.`,
                ];
            } else if (a.rec === 'cut') {
                steps = [
                    `Cut to roughly ${b.low}% body fat, which is about ${show(Math.max(0, fatToLose(b.low)))} ${mu} of fat to lose.`,
                    `Then run a lean bulk until about ${b.bulkTo}%, and repeat the cycle.`,
                ];
            } else {
                const [lo, hi] = GAIN_PCT[exp];
                steps = [
                    `Lean bulk until about ${b.bulkTo}% body fat, then cut to about ${b.cutTo}%, and repeat.`,
                    `Aim for about ${show((wKg * lo) / 100)}–${show((wKg * hi) / 100)} ${mu} per month (a rule of thumb for ${EXP_LABEL[exp].toLowerCase()} of lifting), eating roughly 5–10% above maintenance.`,
                ];
            }
            steps.push('Stay inside the working range so most of the weight you gain is muscle and most of what you lose is fat.');
        } else {
            // lean
            const target = b.cutTo;
            if (bf - target < 2) {
                steps = [`You are already close to the lean end of the usual range (${target}%). Deeper cuts are hard to hold, so consider maintenance or a short, mild cut.`];
            } else {
                const kg = fatToLose(target);
                const wLo = Math.max(1, Math.round(kg / (wKg * 0.01)));
                const wHi = Math.max(wLo, Math.round(kg / (wKg * 0.005)));
                steps = [
                    `Cut to about ${target}% body fat, which is roughly ${show(kg)} ${mu} of fat (assuming you keep your muscle).`,
                    `At 0.5–1% of bodyweight per week, that takes about ${wLo}–${wHi} weeks. Slower is better for keeping muscle.`,
                    'Keep protein high, keep lifting heavy, and use the TDEE tab for your calorie target.',
                ];
            }
        }

        if (a.ratio > 1.05) notes.push('You are above the average trained-natural reference. That means great genetics, enhanced training, or a body-fat reading that is too low. Check it with a DEXA scan if you can.');
        if (bf < b.veryLow) notes.push('Your body fat is very low. Bulking or maintaining is usually healthier than cutting further.');
        notes.push('The reference is an average for trained natural lifters, not a ceiling. Kouri et al. (1995) found natural athletes reaching normalised FFMI values up to about 25.');
        notes.push('FFMI depends on your body-fat number, so any error in body fat shifts every result here. A DEXA scan is the best check.');
        if (sex === 'f') notes.push('The female reference (FFMI 19) rests on less research than the male one, so treat it as rougher.');
        notes.push('These references come mainly from Western studies, so treat the numbers as a guide rather than a verdict.');
    }

    const zones = [
        { w: 85, t: 'Recomp zone' },
        { w: 15, t: 'Bulk / cut' },
        { w: 20, t: 'Above ref.' },
    ];
    const barMax = 120;
    const markerPct = a ? clamp((a.ratio * 100 / barMax) * 100, 0, 100) : 0;

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '16px', alignItems: 'start' }}>
            {/* ───────── Inputs ───────── */}
            <div style={{ ...panel, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                    <label style={labelStyle}>Sex</label>
                    <Segmented<Sex> options={['m', 'f']} value={sex} onChange={setSex} labels={{ m: 'Male', f: 'Female' }} />
                </div>

                <div>
                    <label style={labelStyle}>Units</label>
                    <Segmented<Units> options={['metric', 'imperial']} value={units} onChange={setUnits} labels={{ metric: 'cm / kg', imperial: 'ft·in / lb' }} />
                </div>

                {metric ? (
                    <NumField label="Height (cm)" value={heightCm} onChange={setHeightCm} placeholder="175" min={120} max={230} />
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <NumField label="Height (ft)" value={feet} onChange={setFeet} placeholder="5" min={3} max={8} />
                        <NumField label="Height (in)" value={inches} onChange={setInches} placeholder="9" min={0} max={11} />
                    </div>
                )}

                <NumField label={`Weight (${mu})`} value={weight} onChange={setWeight} placeholder={metric ? '75' : '165'} step={0.1} />

                <div>
                    <NumField label="Body fat %" value={bodyFat} onChange={setBodyFat} placeholder="e.g. 15" min={3} max={60} step={0.5} />
                    <p style={{ ...hint, marginTop: '6px' }}>
                        Don’t know it?{' '}
                        {onOpenBodyFat ? (
                            <button
                                onClick={onOpenBodyFat}
                                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'var(--color-signal-red)', fontSize: '12px', fontWeight: 600 }}
                            >
                                Estimate it with the Body Fat tab
                            </button>
                        ) : (
                            'Estimate it with the Body Fat tool.'
                        )}
                    </p>
                </div>

                <div>
                    <label style={labelStyle}>Lifting experience</label>
                    <Segmented<Exp> options={['lt1', '1to3', 'gt3']} value={exp} onChange={setExp} labels={EXP_LABEL} />
                    <p style={{ ...hint, marginTop: '6px' }}>Serious, structured training. Newer lifters respond faster and can recomp more easily.</p>
                </div>
            </div>

            {/* ───────── Results ───────── */}
            {!a ? (
                <div style={{ ...panel, textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '14px' }}>
                    Enter your height, weight and body fat to get a recommendation.
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {/* Recommendation */}
                    <div style={panel}>
                        <p style={{ ...labelStyle, marginBottom: '6px' }}>Recommendation</p>
                        <p style={{ fontSize: '26px', fontWeight: 800, color: 'var(--color-text-primary)', lineHeight: 1.2 }}>{title}</p>
                        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginTop: '10px' }}>{reason}</p>
                    </div>

                    {/* Goal + plan */}
                    <div style={panel}>
                        <p style={{ ...labelStyle, marginBottom: '10px' }}>What is your goal right now?</p>
                        <Segmented<Goal>
                            options={['muscle', 'lean', 'happy']} value={goal} onChange={setGoal}
                            labels={{ muscle: 'Build muscle', lean: 'Get leaner', happy: 'Happy as I am' }}
                        />
                        <ul style={{ margin: '16px 0 0', paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: 1.55 }}>
                            {steps.map((s, i) => <li key={i}>{s}</li>)}
                        </ul>
                    </div>

                    {/* Lean mass analysis */}
                    <div style={panel}>
                        <p style={{ ...labelStyle, marginBottom: '14px' }}>Your lean mass analysis</p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            {[
                                { t: 'Lean body mass', v: `${show(a.lbm)} ${mu}` },
                                { t: 'Reference lean mass', v: `${show(a.refLbm)} ${mu}` },
                                { t: 'Distance to reference', v: `${show(Math.max(0, a.refLbm - a.lbm))} ${mu}` },
                                { t: 'BMI', v: a.bmi.toFixed(1) },
                                { t: 'FFMI', v: a.ffmi.toFixed(1) },
                                { t: 'Normalised FFMI', v: a.nffmi.toFixed(1) },
                            ].map(x => (
                                <div key={x.t} style={{ backgroundColor: 'var(--color-elevated)', border: '1px solid var(--color-border)', borderRadius: '12px', padding: '12px 14px' }}>
                                    <p style={{ ...hint, marginBottom: '4px' }}>{x.t}</p>
                                    <p style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text-primary)', fontVariantNumeric: 'tabular-nums' }}>{x.v}</p>
                                </div>
                            ))}
                        </div>

                        <div style={{ marginTop: '20px' }}>
                            <div style={{ position: 'relative' }}>
                                <div style={{ display: 'flex', height: '10px', borderRadius: '5px', overflow: 'hidden', gap: '2px' }}>
                                    {zones.map((z, i) => (
                                        <div
                                            key={z.t}
                                            style={{
                                                flex: z.w,
                                                backgroundColor: i === 2 ? 'rgba(225,29,42,0.45)' : `rgba(238,242,247,${0.12 + i * 0.1})`,
                                            }}
                                        />
                                    ))}
                                </div>
                                <div
                                    aria-hidden
                                    style={{
                                        position: 'absolute', top: '-4px', left: `${markerPct}%`, width: '3px', height: '18px', borderRadius: '2px',
                                        backgroundColor: 'var(--color-text-primary)', transform: 'translateX(-50%)', transition: 'left 200ms ease',
                                    }}
                                />
                            </div>
                            <div style={{ display: 'flex', gap: '2px', marginTop: '8px' }}>
                                {zones.map(z => (
                                    <span key={z.t} style={{ flex: z.w, fontSize: '10px', textAlign: 'center', color: 'var(--color-text-muted)' }}>{z.t}</span>
                                ))}
                            </div>
                            <p style={{ ...hint, marginTop: '10px' }}>
                                You have {Math.round(a.ratio * 100)}% of the average trained-natural reference lean mass (FFMI {a.b.ffmi}).
                            </p>
                        </div>
                    </div>

                    {/* Notes + method */}
                    <div style={{ ...panel, padding: '18px 20px', borderRadius: '14px' }}>
                        <ul style={{ ...hint, paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            {notes.map((n, i) => <li key={i}>{n}</li>)}
                        </ul>
                        <details style={{ marginTop: '14px', borderTop: '1px solid var(--color-border)', paddingTop: '12px' }}>
                            <summary style={{ cursor: 'pointer', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
                                How this is calculated
                            </summary>
                            <ul style={{ ...hint, marginTop: '10px', paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <li>Lean mass = weight × (1 − body fat ÷ 100).</li>
                                <li>FFMI = lean mass ÷ height² (in metres). Normalised FFMI adds 6.1 × (1.8 − height).</li>
                                <li>Reference lean mass = (reference FFMI − 6.1 × (1.8 − height)) × height², with a reference FFMI of {a.b.ffmi} for your sex.</li>
                                <li>Recomp is suggested for newer lifters, or intermediates under 85% of the reference, when body fat is between {a.b.low}% and {a.b.high}%.</li>
                                <li>Otherwise: below {a.b.low}% points to a lean bulk, above {a.b.bulkTo}% points to a cut, and in between either works.</li>
                            </ul>
                        </details>
                    </div>
                </div>
            )}
        </div>
    );
}