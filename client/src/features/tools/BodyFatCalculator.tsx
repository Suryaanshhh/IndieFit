import { useState } from 'react';

/* ─────────────────────────── Types & constants ─────────────────────────── */

type Sex = 'm' | 'f';
type Units = 'metric' | 'imperial';

const KG_PER_LB = 0.45359237;
const CM_PER_IN = 2.54;

// American Council on Exercise ranges, used as a common reference scale (not a diagnosis).
// Boundaries: lower limit of the scale, then the start of each next band.
const SCALE: Record<Sex, number[]> = {
    m: [2, 6, 14, 18, 25, 45],
    f: [10, 14, 21, 25, 32, 55],
};
const BANDS = ['Essential', 'Athletic', 'Fit', 'Average', 'Higher'];

/* ─────────────────────────── Formulas ─────────────────────────── */

// U.S. Navy circumference method (Hodgdon & Beckett), all lengths in cm.
function navyBodyFat(sex: Sex, height: number, neck: number, waist: number, hip: number): number | null {
    if (sex === 'm') {
        if (waist <= neck) return null;
        return 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
    }
    if (waist + hip <= neck) return null;
    return 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.221 * Math.log10(height)) - 450;
}

// Deurenberg et al. (1991): BMI, age and sex.
function deurenberg(sex: Sex, bmi: number, age: number): number {
    return 1.2 * bmi + 0.23 * age - 10.8 * (sex === 'm' ? 1 : 0) - 5.4;
}

// CUN-BAE (Gómez-Ambrosi et al., 2012): BMI, age and sex (men = 0, women = 1).
function cunBae(sex: Sex, bmi: number, age: number): number {
    const s = sex === 'f' ? 1 : 0;
    return (
        -44.988 + 0.503 * age + 10.689 * s + 3.172 * bmi - 0.026 * bmi * bmi +
        0.181 * bmi * s - 0.02 * bmi * age - 0.005 * bmi * bmi * s + 0.00021 * bmi * bmi * age
    );
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

export function BodyFatCalculator() {
    const [sex, setSex] = useState<Sex>('m');
    const [units, setUnits] = useState<Units>('metric');
    const [heightCm, setHeightCm] = useState<number | ''>('');
    const [feet, setFeet] = useState<number | ''>('');
    const [inches, setInches] = useState<number | ''>('');
    const [neck, setNeck] = useState<number | ''>('');
    const [waist, setWaist] = useState<number | ''>('');
    const [hip, setHip] = useState<number | ''>('');
    const [age, setAge] = useState<number | ''>('');
    const [weight, setWeight] = useState<number | ''>('');

    const metric = units === 'metric';
    const len = metric ? 'cm' : 'in';
    const toCm = (v: number) => (metric ? v : v * CM_PER_IN);

    const height = metric ? num(heightCm) : (num(feet) * 12 + num(inches)) * CM_PER_IN;
    const neckCm = toCm(num(neck));
    const waistCm = toCm(num(waist));
    const hipCm = toCm(num(hip));
    const weightKg = metric ? num(weight) : num(weight) * KG_PER_LB;
    const ageNum = num(age);

    const needsHip = sex === 'f';
    const haveMeasures = height > 0 && neckCm > 0 && waistCm > 0 && (!needsHip || hipCm > 0);

    const navy = haveMeasures ? navyBodyFat(sex, height, neckCm, waistCm, hipCm) : null;
    const measureProblem = haveMeasures && (navy === null || !Number.isFinite(navy) || navy < 2 || navy > 60);
    const bf = navy !== null && !measureProblem ? navy : null;

    const haveBmi = weightKg > 0 && height > 0;
    const bmi = haveBmi ? weightKg / Math.pow(height / 100, 2) : null;
    const canCompare = bmi !== null && ageNum >= 18;
    const cun = canCompare ? clamp(cunBae(sex, bmi as number, ageNum), 2, 65) : null;
    const deu = canCompare ? clamp(deurenberg(sex, bmi as number, ageNum), 2, 65) : null;

    // Category on the reference scale
    const edges = SCALE[sex];
    let bandIndex = 0;
    if (bf !== null) {
        for (let i = 1; i < BANDS.length; i++) if (bf >= edges[i]) bandIndex = i;
    }
    const scaleMin = edges[0];
    const scaleMax = edges[edges.length - 1];
    const markerPct = bf === null ? 0 : clamp(((bf - scaleMin) / (scaleMax - scaleMin)) * 100, 0, 100);
    const belowScale = bf !== null && bf < scaleMin;

    // Mass split
    const fatKg = bf !== null && weightKg > 0 ? (weightKg * bf) / 100 : null;
    const leanKg = fatKg !== null ? weightKg - fatKg : null;
    const massUnit = metric ? 'kg' : 'lb';
    const showMass = (kg: number) => (metric ? kg : kg / KG_PER_LB).toFixed(1);

    const disagreement = bf !== null && cun !== null ? Math.abs(bf - cun) : 0;
    const underweight = bmi !== null && bmi < 18.5;

    const fmt1 = (n: number) => n.toFixed(1);

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '16px', alignItems: 'start' }}>
            {/* ───────── Inputs ───────── */}
            <div style={{ ...panel, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                        <label style={labelStyle}>Sex</label>
                        <Segmented<Sex> options={['m', 'f']} value={sex} onChange={setSex} labels={{ m: 'Male', f: 'Female' }} />
                    </div>
                    <div>
                        <label style={labelStyle}>Units</label>
                        <Segmented<Units> options={['metric', 'imperial']} value={units} onChange={setUnits} labels={{ metric: 'cm / kg', imperial: 'in / lb' }} />
                    </div>
                </div>

                {metric ? (
                    <NumField label="Height (cm)" value={heightCm} onChange={setHeightCm} placeholder="175" min={100} max={250} />
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <NumField label="Height (ft)" value={feet} onChange={setFeet} placeholder="5" min={3} max={8} />
                        <NumField label="Height (in)" value={inches} onChange={setInches} placeholder="9" min={0} max={11} />
                    </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: needsHip ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)', gap: '12px' }}>
                    <NumField label={`Neck (${len})`} value={neck} onChange={setNeck} placeholder={metric ? '38' : '15'} step={0.1} />
                    <NumField label={`Waist (${len})`} value={waist} onChange={setWaist} placeholder={metric ? '85' : '33'} step={0.1} />
                    {needsHip && <NumField label={`Hip (${len})`} value={hip} onChange={setHip} placeholder={metric ? '98' : '38'} step={0.1} />}
                </div>

                <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '16px' }}>
                    <p style={{ ...hint, marginBottom: '12px' }}>
                        Optional: add age and weight for a cross-check, plus your fat and lean mass.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <NumField label="Age" value={age} onChange={setAge} placeholder="25" min={18} max={100} />
                        <NumField label={`Weight (${massUnit})`} value={weight} onChange={setWeight} placeholder={metric ? '75' : '165'} step={0.1} />
                    </div>
                </div>

                <details style={{ borderTop: '1px solid var(--color-border)', paddingTop: '14px' }}>
                    <summary style={{ cursor: 'pointer', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
                        How to measure accurately
                    </summary>
                    <ul style={{ ...hint, marginTop: '10px', paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <li>Measure in the morning, before food and training, and use the same landmarks every time.</li>
                        <li>Use a soft tape, snug but not pressing into the skin. Take 2–3 readings and average them.</li>
                        <li>Stand relaxed. Don’t flex or suck in your stomach.</li>
                        <li>Height: barefoot and standing straight.</li>
                        <li>Neck: just below the Adam’s apple, head level.</li>
                        <li>Waist: men at the navel, women at the narrowest point of the natural waist.</li>
                        <li>Hip (women): the widest part of the hips and buttocks.</li>
                    </ul>
                </details>
            </div>

            {/* ───────── Results ───────── */}
            {!haveMeasures ? (
                <div style={{ ...panel, textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '14px' }}>
                    Enter your height, neck and waist{needsHip ? ' and hip' : ''} to estimate your body fat.
                </div>
            ) : measureProblem ? (
                <div style={{ ...panel, borderColor: 'rgba(225,29,42,0.3)', backgroundColor: 'rgba(225,29,42,0.06)' }}>
                    <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '6px' }}>
                        Those measurements don’t give a believable result
                    </p>
                    <p style={{ ...hint, fontSize: '13px' }}>
                        {sex === 'm'
                            ? 'The waist has to be larger than the neck, and the numbers must be realistic.'
                            : 'Check that waist and hip are larger than the neck, and that the numbers are realistic.'}{' '}
                        Check the units, then re-measure and try again.
                    </p>
                </div>
            ) : (
                bf !== null && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {/* Main result */}
                        <div style={panel}>
                            <p style={{ ...labelStyle, marginBottom: '6px' }}>Estimated body fat (US Navy)</p>
                            <p style={{ fontSize: '48px', fontWeight: 800, color: 'var(--color-text-primary)', fontVariantNumeric: 'tabular-nums', lineHeight: 1.05 }}>
                                {fmt1(bf)}<span style={{ fontSize: '22px', fontWeight: 600, color: 'var(--color-text-muted)' }}>%</span>
                            </p>
                            <p style={{ ...hint, marginTop: '6px' }}>
                                Likely range {fmt1(Math.max(2, bf - 4))}–{fmt1(bf + 4)}%. This method is typically within 3–5 points of lab scans.
                            </p>

                            {/* Scale */}
                            <div style={{ marginTop: '20px' }}>
                                <div style={{ position: 'relative' }}>
                                    <div style={{ display: 'flex', height: '10px', borderRadius: '5px', overflow: 'hidden', gap: '2px' }}>
                                        {BANDS.map((b, i) => (
                                            <div
                                                key={b}
                                                style={{
                                                    flex: edges[i + 1] - edges[i],
                                                    backgroundColor: i === BANDS.length - 1 ? 'rgba(225,29,42,0.45)' : `rgba(238,242,247,${0.1 + i * 0.07})`,
                                                    opacity: i === bandIndex ? 1 : 0.55,
                                                }}
                                            />
                                        ))}
                                    </div>
                                    <div
                                        aria-hidden
                                        style={{
                                            position: 'absolute', top: '-4px', left: `${markerPct}%`, width: '3px', height: '18px',
                                            borderRadius: '2px', backgroundColor: 'var(--color-text-primary)', transform: 'translateX(-50%)',
                                            transition: 'left 200ms ease',
                                        }}
                                    />
                                </div>
                                <div style={{ display: 'flex', gap: '2px', marginTop: '8px' }}>
                                    {BANDS.map((b, i) => (
                                        <span
                                            key={b}
                                            style={{
                                                flex: edges[i + 1] - edges[i], fontSize: '10px', textAlign: 'center',
                                                color: i === bandIndex ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                                                fontWeight: i === bandIndex ? 700 : 500,
                                            }}
                                        >
                                            {b}
                                        </span>
                                    ))}
                                </div>
                                <p style={{ ...hint, marginTop: '10px' }}>
                                    {belowScale ? 'Below the usual essential-fat range for your sex. Re-check your measurements.' : `Reference band: ${BANDS[bandIndex]}.`}{' '}
                                    Bands are a general guide, not a medical diagnosis.
                                </p>
                            </div>
                        </div>

                        {/* Mass split */}
                        {fatKg !== null && leanKg !== null && (
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                {[
                                    { t: 'Fat mass', v: fatKg },
                                    { t: 'Lean mass', v: leanKg },
                                ].map(x => (
                                    <div key={x.t} style={{ ...panel, padding: '18px', borderRadius: '14px' }}>
                                        <p style={{ ...labelStyle, marginBottom: '6px' }}>{x.t}</p>
                                        <p style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-text-primary)', fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>
                                            {showMass(x.v)}<span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-text-muted)', marginLeft: '3px' }}>{massUnit}</span>
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Cross-check */}
                        {cun !== null && deu !== null && (
                            <div style={panel}>
                                <p style={{ ...labelStyle, marginBottom: '12px' }}>Cross-check with BMI-based methods</p>
                                {[
                                    { n: 'US Navy (your tape)', v: bf },
                                    { n: 'CUN-BAE (BMI, age, sex)', v: cun },
                                    { n: 'Deurenberg (BMI, age, sex)', v: deu },
                                ].map((m, i) => (
                                    <div
                                        key={m.n}
                                        style={{
                                            display: 'flex', justifyContent: 'space-between', padding: '10px 0',
                                            borderTop: i === 0 ? 'none' : '1px solid var(--color-border)', fontSize: '14px',
                                        }}
                                    >
                                        <span style={{ color: 'var(--color-text-secondary)' }}>{m.n}</span>
                                        <span style={{ color: 'var(--color-text-primary)', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{fmt1(m.v)}%</span>
                                    </div>
                                ))}
                                <p style={{ ...hint, marginTop: '10px' }}>
                                    {disagreement > 8
                                        ? 'These estimates are far apart. BMI cannot tell muscle from fat, so muscular people often read high on BMI methods. If you are not very muscular, re-check your tape measurements.'
                                        : disagreement > 4
                                            ? 'The estimates differ somewhat, which is normal. Trust the tape-based Navy value more if you carry a lot of muscle.'
                                            : 'The methods agree closely, which makes the estimate more reliable.'}
                                </p>
                            </div>
                        )}

                        {/* Notes */}
                        <div style={{ ...panel, padding: '18px 20px', borderRadius: '14px' }}>
                            <ul style={{ ...hint, paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <li>Best use: repeat the same measurements every 2–4 weeks and follow the trend, not a single number.</li>
                                {underweight && <li>Your BMI is under 18.5. Tape-based and BMI-based estimates are less reliable at very low weight.</li>}
                                {canCompare && <li>Research shows South Asians tend to carry more body fat than other groups at the same BMI, so BMI-based values may read low for you.</li>}
                                <li>Fat and lean mass are only as accurate as the percentage. A DEXA scan is the better option if you need precision.</li>
                            </ul>
                            <p style={{ ...hint, marginTop: '10px' }}>
                                Entering this percentage in the TDEE calculator switches it to the Katch–McArdle formula.
                            </p>
                        </div>
                    </div>
                )
            )}
        </div>
    );
}