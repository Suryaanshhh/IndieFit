import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Badge } from '../../components/Badge';
import { guides } from '../../data/guides';

const CATEGORY_LABEL: Record<string, string> = {
  recomposition: 'Recomposition',
  bulk: 'Bulk',
  cut: 'Cut',
  peaking: 'Peaking',
  beginner: 'Beginner',
};

export function GuidesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-10">
        <Badge variant="red" className="mb-4">Guides</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-3" style={{ color: 'var(--color-text-primary)' }}>
          Training &amp; Nutrition Guides
        </h1>
        <p className="text-lg max-w-2xl" style={{ color: 'var(--color-text-secondary)' }}>
          Evidence-based protocols for every goal — structured, specific, and free of filler.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
        {guides.map(({ id, title, description, category, slug }) => (
          <Link key={id} to={`/guides/${slug}`}>
            <div
              className="rounded-[14px] border p-5 flex flex-col gap-3 h-full group transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-lg cursor-pointer"
              style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}
            >
              <div className="flex items-center justify-between gap-2">
                <Badge variant="muted">{CATEGORY_LABEL[category]}</Badge>
              </div>
              <h2 className="text-base font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                {title}
              </h2>
              <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--color-text-secondary)' }}>
                {description}
              </p>
              <div className="flex items-center gap-1 text-xs font-medium" style={{ color: 'var(--color-signal-red)' }}>
                Read guide <ChevronRight size={13} strokeWidth={2.5} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
