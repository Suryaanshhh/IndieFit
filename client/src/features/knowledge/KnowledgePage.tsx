import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Badge } from '../../components/Badge';
import { knowledgeTopics } from '../../data/knowledge';

const CATEGORY_LABEL: Record<string, string> = {
  physiology: 'Physiology',
  programming: 'Programming',
  monitoring: 'Monitoring',
  nutrition: 'Nutrition',
};

export function KnowledgePage() {
  const categories = [...new Set(knowledgeTopics.map((t) => t.category))];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-10">
        <Badge variant="red" className="mb-4">Knowledge Base</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-3" style={{ color: 'var(--color-text-primary)' }}>
          Understand the mechanisms
        </h1>
        <p className="text-lg max-w-2xl" style={{ color: 'var(--color-text-secondary)' }}>
          Physiology, programming, and monitoring — explained at the mechanism level.
        </p>
      </div>

      {categories.map((cat) => {
        const topics = knowledgeTopics.filter((t) => t.category === cat);
        return (
          <div key={cat} className="mb-10">
            <h2
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: 'var(--color-text-muted)' }}
            >
              {CATEGORY_LABEL[cat]}
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {topics.map(({ id, title, description, slug }) => (
                <Link key={id} to={`/knowledge/${slug}`}>
                  <div
                    className="rounded-[14px] border px-4 py-3.5 flex items-start gap-3 group transition-[background-color] duration-150 hover:bg-[var(--color-elevated)] cursor-pointer"
                    style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold mb-0.5" style={{ color: 'var(--color-text-primary)' }}>
                        {title}
                      </div>
                      <div className="text-xs leading-snug" style={{ color: 'var(--color-text-muted)' }}>
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
          </div>
        );
      })}
    </div>
  );
}
