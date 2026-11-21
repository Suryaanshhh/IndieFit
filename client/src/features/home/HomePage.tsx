import { Link } from 'react-router-dom';
import { ArrowRight, Dumbbell, Calculator, BarChart3, ChevronRight } from 'lucide-react';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { guides } from '../../data/guides';
import { knowledgeTopics } from '../../data/knowledge';
import { trainingBenchmarks, tools } from '../../data/training';

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  Dumbbell,
  Calculator,
  BarChart3,
};

// Baseline metrics for the Hero card
const BASELINE_METRICS = [
  { label: 'Bench Press', value: '80', unit: 'kg', note: '5 × 5' },
  { label: 'Squat', value: '100', unit: 'kg', note: '3 × 5' },
  { label: 'Deadlift', value: '120', unit: 'kg', note: '1 × 5' },
  { label: 'OHP', value: '55', unit: 'kg', note: '5 × 5' },
];

export function HomePage() {
  return (
    <div style={{ backgroundColor: 'var(--color-base)' }}>
      {/* ─── HERO ──────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-16 md:pt-28 md:pb-24">
        <div className="grid md:grid-cols-[1fr_auto] gap-10 md:gap-14 items-start">
          {/* Left: copy */}
          <div className="max-w-xl">
            <Badge variant="red" className="mb-5">Science-based lifting &amp; nutrition</Badge>
            <h1
              className="text-4xl sm:text-5xl font-extrabold leading-[1.08] tracking-tight mb-5"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Train with numbers,<br />not vibes.
            </h1>
            <p
              className="text-lg leading-relaxed mb-8"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Calculators, evidence-based guides, and training benchmarks — built for people who want to know the
              mechanism, not just the result.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/guides">
                <Button size="lg">
                  Explore Guides
                  <ArrowRight size={16} strokeWidth={2} />
                </Button>
              </Link>
              <Link to="/tools">
                <Button size="lg" variant="secondary">
                  Lifting Calculators
                </Button>
              </Link>
            </div>
          </div>

          {/* Right: training baseline card */}
          <div className="w-full md:w-72 shrink-0">
            <Card elevated className="p-0 overflow-hidden">
              {/* Card header */}
              <div
                className="px-5 py-3.5 flex items-center justify-between"
                style={{ borderBottom: '1px solid var(--color-border)' }}
              >
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>
                  Strength Baseline
                </span>
                <Badge variant="red">Intermediate</Badge>
              </div>

              {/* Metrics */}
              <div className="divide-y" style={{ borderColor: 'var(--color-border)' }}>
                {BASELINE_METRICS.map(({ label, value, unit, note }) => (
                  <div
                    key={label}
                    className="px-5 py-3.5 flex items-center justify-between gap-4"
                  >
                    <div>
                      <div className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
                        {label}
                      </div>
                      <div className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                        {note}
                      </div>
                    </div>
                    <div
                      className="tabular-nums text-right"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      <span className="text-xl font-bold">{value}</span>
                      <span className="text-xs ml-1" style={{ color: 'var(--color-text-muted)' }}>{unit}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Card footer */}
              <div className="px-5 py-3" style={{ borderTop: '1px solid var(--color-border)' }}>
                <Link
                  to="/training"
                  className="flex items-center gap-1.5 text-xs font-medium transition-colors duration-150 hover:text-[var(--color-text-primary)]"
                  style={{ color: 'var(--color-signal-red)' }}
                >
                  View training benchmarks <ChevronRight size={13} strokeWidth={2.5} />
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* ─── TOOLS PREVIEW ─────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--color-signal-red)' }}>
              Calculators
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
              Tools that do the math
            </h2>
          </div>
          <Link
            to="/tools"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium shrink-0 transition-colors duration-150 hover:text-[var(--color-text-primary)]"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            All tools <ChevronRight size={15} strokeWidth={2} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {tools.map(({ id, title, description, icon, slug }) => {
            const Icon = ICON_MAP[icon] ?? Dumbbell;
            return (
              <Link key={id} to={`/tools?tab=${slug}`}>
                <Card hover className="h-full flex flex-col gap-4">
                  {/* Icon container: outer card is rounded-[14px] p-5, icon bg needs inner radius */}
                  <div
                    className="w-10 h-10 flex items-center justify-center rounded-[6px]"
                    style={{
                      backgroundColor: 'rgba(225, 29, 42, 0.12)',
                      color: 'var(--color-signal-red)',
                    }}
                  >
                    <Icon size={18} strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <h3
                      className="text-base font-semibold mb-1.5"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      {title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                      {description}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-medium" style={{ color: 'var(--color-signal-red)' }}>
                    Open calculator <ArrowRight size={12} strokeWidth={2.5} />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ─── GUIDES GRID ───────────────────────────────────────────────── */}
      <section
        className="py-16"
        style={{ backgroundColor: 'var(--color-elevated)' }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--color-signal-red)' }}>
                Guides
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
                Pick your protocol
              </h2>
            </div>
            <Link
              to="/guides"
              className="hidden sm:flex items-center gap-1.5 text-sm font-medium shrink-0 transition-colors duration-150 hover:text-[var(--color-text-primary)]"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              All guides <ChevronRight size={15} strokeWidth={2} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {guides.map(({ id, title, description, slug }) => (
              <Link key={id} to={`/guides/${slug}`}>
                <div
                  className="rounded-[14px] p-5 border h-full flex flex-col gap-3 group transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-lg cursor-pointer"
                  style={{
                    backgroundColor: 'var(--color-card)',
                    borderColor: 'var(--color-border)',
                  }}
                >
                  <h3
                    className="text-base font-semibold transition-colors duration-150 group-hover:text-[var(--color-text-primary)]"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--color-text-secondary)' }}>
                    {description}
                  </p>
                  <div
                    className="flex items-center gap-1.5 text-xs font-medium"
                    style={{ color: 'var(--color-signal-red)' }}
                  >
                    Read guide <ChevronRight size={13} strokeWidth={2.5} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── KNOWLEDGE & TRAINING HUB ──────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid md:grid-cols-[1fr_auto] gap-14">
          {/* Knowledge */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--color-signal-red)' }}>
              Knowledge Base
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold mb-7" style={{ color: 'var(--color-text-primary)' }}>
              Understand the mechanisms
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {knowledgeTopics.map(({ id, title, description, slug }) => (
                <Link key={id} to={`/knowledge/${slug}`}>
                  <div
                    className="rounded-[14px] px-4 py-3.5 border flex items-start gap-3 group transition-[background-color,transform] duration-150 hover:bg-[var(--color-elevated)] active:scale-[0.98]"
                    style={{
                      backgroundColor: 'var(--color-card)',
                      borderColor: 'var(--color-border)',
                    }}
                  >
                    <div className="flex-1 min-w-0">
                      <div
                        className="text-sm font-semibold mb-0.5 transition-colors duration-150 group-hover:text-[var(--color-text-primary)]"
                        style={{ color: 'var(--color-text-primary)' }}
                      >
                        {title}
                      </div>
                      <div className="text-xs leading-snug line-clamp-2" style={{ color: 'var(--color-text-muted)' }}>
                        {description}
                      </div>
                    </div>
                    <ChevronRight
                      size={14}
                      strokeWidth={2}
                      className="mt-0.5 shrink-0 opacity-50 group-hover:opacity-100 transition-opacity duration-150"
                      style={{ color: 'var(--color-text-secondary)' }}
                    />
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-5">
              <Link to="/knowledge">
                <Button variant="secondary" size="sm">
                  Browse all topics <ArrowRight size={14} strokeWidth={2} />
                </Button>
              </Link>
            </div>
          </div>

          {/* Training milestones */}
          <div className="w-full md:w-64 shrink-0">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--color-signal-red)' }}>
              Training Milestones
            </p>
            <h2 className="text-2xl font-bold mb-7" style={{ color: 'var(--color-text-primary)' }}>
              Set a target
            </h2>
            <div className="flex flex-col gap-4">
              {trainingBenchmarks.map(({ id, title, description, targetKg, timelineWeeks, slug }) => (
                <Link key={id} to={`/training/${slug}`}>
                  <Card hover className="flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                        {title}
                      </span>
                      <span
                        className="tabular-nums text-xl font-extrabold"
                        style={{ color: 'var(--color-signal-red)' }}
                      >
                        {targetKg}<span className="text-xs font-medium ml-0.5" style={{ color: 'var(--color-text-muted)' }}>kg</span>
                      </span>
                    </div>
                    <p className="text-xs leading-snug" style={{ color: 'var(--color-text-secondary)' }}>
                      {description}
                    </p>
                    <div className="flex items-center justify-between text-xs" style={{ color: 'var(--color-text-muted)' }}>
                      <span className="tabular-nums">{timelineWeeks}w timeline</span>
                      <span
                        className="flex items-center gap-1 font-medium transition-colors duration-150 hover:text-[var(--color-text-primary)]"
                        style={{ color: 'var(--color-signal-red)' }}
                      >
                        View plan <ChevronRight size={12} strokeWidth={2.5} />
                      </span>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
