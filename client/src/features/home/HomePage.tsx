import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Dumbbell, Calculator, BarChart3, ChevronRight } from 'lucide-react';
import { Button } from '../../components/Button';
import { guides } from '../../data/guides';
import { knowledgeTopics } from '../../data/knowledge';
import { trainingBenchmarks, tools } from '../../data/training';

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  Dumbbell,
  Calculator,
  BarChart3,
};

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));
const toPlate = (kg: number) => Math.round(kg / 2.5) * 2.5; // nearest loadable 2.5 kg

/* ─── Section heading: serif title, quiet link on the right ─────────── */
function SectionHead({ title, note, to, linkLabel }: { title: string; note?: string; to: string; linkLabel: string }) {
  return (
    <div className="flex items-end justify-between gap-6 mb-10">
      <div className="max-w-lg">
        <h2 className="font-display text-3xl sm:text-4xl leading-[1.1]" style={{ color: 'var(--color-text-primary)' }}>
          {title}
        </h2>
        {note && (
          <p className="mt-3 text-base" style={{ color: 'var(--color-text-secondary)' }}>
            {note}
          </p>
        )}
      </div>
      <Link
        to={to}
        className="hidden sm:flex items-center gap-1.5 text-sm font-medium shrink-0 hover:text-[var(--color-text-primary)] transition-colors duration-150"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        {linkLabel} <ChevronRight size={15} strokeWidth={2} />
      </Link>
    </div>
  );
}

/* ─── Live 1RM estimator: the hero's working "numbers" moment ───────── */
function OneRepMaxCard() {
  const [weight, setWeight] = useState(80);
  const [reps, setReps] = useState(5);

  // Epley: 1RM = w × (1 + reps / 30)
  const oneRm = reps === 1 ? weight : weight * (1 + reps / 30);
  const loadFor = (n: number) => (n === 1 ? oneRm : oneRm / (1 + n / 30));

  const inputClass =
    'w-full h-11 rounded-[10px] px-3 text-base tabular-nums bg-transparent border outline-none ' +
    'focus-visible:ring-2 focus-visible:ring-[var(--color-signal-red)]';

  return (
    <div
      className="absolute inset-x-4 bottom-4 rounded-[14px] border backdrop-blur-md p-4"
      style={{ backgroundColor: 'rgba(17,19,23,0.72)', borderColor: 'rgba(255,255,255,0.12)' }}
    >
      <p className="text-sm font-medium mb-3" style={{ color: 'var(--color-text-primary)' }}>
        Estimate your one-rep max
      </p>

      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Weight lifted (kg)</span>
          <input
            type="number"
            inputMode="decimal"
            min={1}
            max={500}
            value={weight}
            onChange={(e) => setWeight(clamp(Number(e.target.value) || 0, 0, 500))}
            className={inputClass + ' mt-1'}
            style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-primary)' }}
          />
        </label>
        <label className="block">
          <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Reps (1–12)</span>
          <input
            type="number"
            inputMode="numeric"
            min={1}
            max={12}
            value={reps}
            onChange={(e) => setReps(clamp(Math.round(Number(e.target.value)) || 1, 1, 12))}
            className={inputClass + ' mt-1'}
            style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-primary)' }}
          />
        </label>
      </div>

      <div className="flex items-end justify-between mt-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div>
          <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Estimated 1RM</div>
          <div className="tabular-nums" style={{ color: 'var(--color-text-primary)' }}>
            <span className="font-display text-4xl">{Math.round(oneRm)}</span>
            <span className="text-sm ml-1" style={{ color: 'var(--color-text-muted)' }}>kg</span>
          </div>
        </div>
        <dl className="text-xs tabular-nums space-y-1 text-right" style={{ color: 'var(--color-text-secondary)' }}>
          {[3, 5, 8].map((n) => (
            <div key={n} className="flex justify-end gap-3">
              <dt style={{ color: 'var(--color-text-muted)' }}>{n} reps</dt>
              <dd className="w-14">{toPlate(loadFor(n))} kg</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

export function HomePage() {
  const [featured, ...otherGuides] = guides;

  return (
    <div style={{ backgroundColor: 'var(--color-base)' }}>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-14 pb-20 md:pt-20 md:pb-28 overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 top-10 w-[520px] h-[520px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(225,29,42,0.20), transparent 70%)' }}
        />

        <div className="relative grid md:grid-cols-[1fr_360px] gap-14 md:gap-20 items-center">
          <div>
            <p className="text-sm mb-6" style={{ color: 'var(--color-text-muted)' }}>
              Lifting and nutrition, backed by evidence
            </p>

            <h1
              className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.05] mb-7"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Train with{' '}
              <span style={{ color: 'var(--color-signal-red)' }}>numbers,</span>
              <br />
              not vibes.
            </h1>

            <p className="text-lg leading-relaxed mb-10 max-w-md" style={{ color: 'var(--color-text-secondary)' }}>
              Calculators, guides and benchmarks for lifters who want to know why a plan works, not just that it does.
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <Link to="/guides">
                <Button size="lg">
                  Read the guides
                  <ArrowRight size={16} strokeWidth={2} />
                </Button>
              </Link>

              <Link
                to="/tools"
                className="group flex items-center gap-3 text-sm font-medium"
                style={{ color: 'var(--color-text-primary)' }}
              >
                <span
                  className="w-11 h-11 rounded-full border flex items-center justify-center transition-colors duration-200 group-hover:bg-[var(--color-signal-red)] group-hover:border-transparent"
                  style={{ borderColor: 'var(--color-border)' }}
                >
                  <ArrowRight size={16} strokeWidth={1.75} />
                </span>
                Open all calculators
              </Link>
            </div>
          </div>

          {/* Arch with the working calculator */}
          <div className="w-full max-w-[360px] mx-auto">
            <div className="hero-arch relative h-[540px] overflow-hidden">
              <svg
                aria-hidden
                viewBox="0 0 200 200"
                className="absolute left-1/2 top-[8%] w-[74%] -translate-x-1/2"
              >
                <circle cx="100" cy="100" r="96" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="1.5" />
                <circle cx="100" cy="100" r="78" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                <circle cx="100" cy="100" r="54" fill="none" stroke="rgba(225,29,42,0.6)" strokeWidth="1.5" />
                <circle cx="100" cy="100" r="14" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.2)" />
              </svg>
              <OneRepMaxCard />
            </div>
          </div>
        </div>
      </section>

      {/* ─── TOOLS: ruled list, not a card grid ───────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <SectionHead
          title="Calculators that show their working"
          note="Enter your numbers, get a result and the formula behind it."
          to="/tools"
          linkLabel="All calculators"
        />

        <ul style={{ borderTop: '1px solid var(--color-border)' }}>
          {tools.map(({ id, title, description, icon, slug }) => {
            const Icon = ICON_MAP[icon] ?? Dumbbell;
            return (
              <li key={id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                <Link
                  to={`/tools?tab=${slug}`}
                  className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 py-6 px-2 transition-colors duration-150 hover:bg-[var(--color-elevated)]"
                >
                  <span
                    className="w-11 h-11 flex items-center justify-center rounded-[10px]"
                    style={{ backgroundColor: 'rgba(225,29,42,0.12)', color: 'var(--color-signal-red)' }}
                  >
                    <Icon size={18} strokeWidth={2} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                      {title}
                    </h3>
                    <p className="text-sm mt-1 max-w-xl" style={{ color: 'var(--color-text-secondary)' }}>
                      {description}
                    </p>
                  </div>
                  <ArrowUpRight
                    size={20}
                    strokeWidth={1.75}
                    className="opacity-50 group-hover:opacity-100 transition-opacity duration-150"
                    style={{ color: 'var(--color-text-primary)' }}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ─── GUIDES: one lead guide, the rest as a reading list ── */}
      <section className="py-20" style={{ backgroundColor: 'var(--color-elevated)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHead
            title="Guides by goal"
            note="Pick the outcome you want and follow the protocol."
            to="/guides"
            linkLabel="All guides"
          />

          <div className="grid md:grid-cols-[1.2fr_1fr] gap-6">
            {featured && (
              <Link
                to={`/guides/${featured.slug}`}
                className="group relative rounded-[18px] border p-8 md:p-10 flex flex-col justify-end min-h-[320px] overflow-hidden"
                style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}
              >
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'radial-gradient(90% 70% at 100% 100%, rgba(225,29,42,0.22), transparent 65%)' }}
                />
                <div className="relative">
                  <h3 className="font-display text-3xl leading-tight mb-3" style={{ color: 'var(--color-text-primary)' }}>
                    {featured.title}
                  </h3>
                  <p className="text-base max-w-md mb-6" style={{ color: 'var(--color-text-secondary)' }}>
                    {featured.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium" style={{ color: 'var(--color-signal-red)' }}>
                    Read the guide <ChevronRight size={15} strokeWidth={2.5} />
                  </span>
                </div>
              </Link>
            )}

            <ul style={{ borderTop: '1px solid var(--color-border)' }}>
              {otherGuides.slice(0, 4).map(({ id, title, description, slug }) => (
                <li key={id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <Link to={`/guides/${slug}`} className="group flex items-start gap-4 py-5">
                    <div className="flex-1 min-w-0">
                      <h3
                        className="text-base font-semibold mb-1"
                        style={{ color: 'var(--color-text-primary)' }}
                      >
                        {title}
                      </h3>
                      <p className="text-sm line-clamp-2" style={{ color: 'var(--color-text-secondary)' }}>
                        {description}
                      </p>
                    </div>
                    <ChevronRight
                      size={16}
                      strokeWidth={2}
                      className="mt-1 shrink-0 opacity-40 group-hover:opacity-100 transition-opacity duration-150"
                      style={{ color: 'var(--color-text-primary)' }}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── KNOWLEDGE + MILESTONES ───────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid lg:grid-cols-[1fr_340px] gap-16">
          <div>
            <SectionHead
              title="Understand the mechanisms"
              note="Short explainers on how muscle, fuel and recovery actually work."
              to="/knowledge"
              linkLabel="Browse all topics"
            />
            <ul className="grid sm:grid-cols-2 gap-x-10" style={{ borderTop: '1px solid var(--color-border)' }}>
              {knowledgeTopics.map(({ id, title, description, slug }) => (
                <li key={id} className="sm:[&:nth-child(2)]:border-t-0" style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <Link to={`/knowledge/${slug}`} className="group flex items-start gap-3 py-4">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold mb-0.5" style={{ color: 'var(--color-text-primary)' }}>
                        {title}
                      </div>
                      <div className="text-xs leading-snug line-clamp-2" style={{ color: 'var(--color-text-muted)' }}>
                        {description}
                      </div>
                    </div>
                    <ChevronRight
                      size={14}
                      strokeWidth={2}
                      className="mt-0.5 shrink-0 opacity-40 group-hover:opacity-100 transition-opacity duration-150"
                      style={{ color: 'var(--color-text-secondary)' }}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-3xl leading-[1.1] mb-3" style={{ color: 'var(--color-text-primary)' }}>
              Set a target
            </h2>
            <p className="text-base mb-10" style={{ color: 'var(--color-text-secondary)' }}>
              Milestones with a weight and a timeline.
            </p>
            <ul style={{ borderTop: '1px solid var(--color-border)' }}>
              {trainingBenchmarks.map(({ id, title, description, targetKg, timelineWeeks, slug }) => (
                <li key={id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <Link to={`/training/${slug}`} className="group block py-5">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                        {title}
                      </span>
                      <span className="tabular-nums" style={{ color: 'var(--color-signal-red)' }}>
                        <span className="font-display text-2xl">{targetKg}</span>
                        <span className="text-xs ml-1" style={{ color: 'var(--color-text-muted)' }}>kg</span>
                      </span>
                    </div>
                    <p className="text-xs leading-snug mt-1.5" style={{ color: 'var(--color-text-secondary)' }}>
                      {description}
                    </p>
                    <p className="text-xs mt-2 tabular-nums" style={{ color: 'var(--color-text-muted)' }}>
                      {timelineWeeks} weeks
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── CLOSING CTA ──────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
        <div
          className="relative overflow-hidden rounded-[22px] border px-8 py-14 md:px-16 md:py-20 text-center"
          style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}
        >
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(70% 90% at 50% 120%, rgba(225,29,42,0.35), transparent 65%)' }}
          />
          <div className="relative">
            <h2 className="font-display text-3xl sm:text-5xl leading-[1.1] mb-4" style={{ color: 'var(--color-text-primary)' }}>
              Start with your own numbers.
            </h2>
            <p className="text-base mb-8 mx-auto max-w-md" style={{ color: 'var(--color-text-secondary)' }}>
              Work out your max, your calories and your targets in a couple of minutes.
            </p>
            <Link to="/tools">
              <Button size="lg">
                Open the calculators
                <ArrowRight size={16} strokeWidth={2} />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}