import { Link } from 'react-router-dom';
import { Badge } from '../../components/Badge';
import { trainingBenchmarks } from '../../data/training';

export function TrainingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-10">
        <Badge variant="red" className="mb-4">Training</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-3" style={{ color: 'var(--color-text-primary)' }}>
          Strength Benchmarks
        </h1>
        <p className="text-lg max-w-2xl" style={{ color: 'var(--color-text-secondary)' }}>
          Milestone-based programs with the programming, technique cues, and periodization to get there.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {trainingBenchmarks.map(({ id, title, description, lift, targetKg, timelineWeeks, slug }) => (
          <Link key={id} to={`/training/${slug}`}>
            <div
              className="rounded-[14px] border p-6 flex flex-col gap-4 group transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-lg cursor-pointer"
              style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--color-text-muted)' }}>
                    {lift}
                  </div>
                  <h2 className="text-xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
                    {title}
                  </h2>
                </div>
                <div className="tabular-nums text-right shrink-0">
                  <div className="text-3xl font-extrabold" style={{ color: 'var(--color-signal-red)' }}>
                    {targetKg}
                  </div>
                  <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>kg target</div>
                </div>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                {description}
              </p>
              <div className="flex items-center gap-4 text-sm tabular-nums" style={{ color: 'var(--color-text-muted)' }}>
                <span>{timelineWeeks}-week timeline</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
