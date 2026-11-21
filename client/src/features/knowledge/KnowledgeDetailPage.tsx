import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Search } from 'lucide-react';
import { useState } from 'react';
import { knowledgeContents } from '../../data/knowledgeContent';
import { Badge } from '../../components/Badge';

export function KnowledgeDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const topic = knowledgeContents.find((t) => t.slug === slug);
  const [search, setSearch] = useState('');

  if (!topic) return <Navigate to="/knowledge" replace />;

  const isGlossary = topic.slug === 'glossary';
  const filteredGlossary = topic.glossary?.filter(
    (g) =>
      g.term.toLowerCase().includes(search.toLowerCase()) ||
      g.definition.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <Link
        to="/knowledge"
        className="inline-flex items-center gap-1.5 text-sm mb-8 transition-colors duration-150 hover:text-[var(--color-text-primary)]"
        style={{ color: 'var(--color-text-muted)' }}
      >
        <ArrowLeft size={15} strokeWidth={2} /> Knowledge base
      </Link>

      <div className="mb-10">
        <Badge variant="muted" className="mb-4">{topic.category}</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-3" style={{ color: 'var(--color-text-primary)' }}>
          {topic.title}
        </h1>
        <p className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>{topic.tagline}</p>
      </div>

      {/* Glossary search */}
      {isGlossary && (
        <div className="mb-8">
          <div
            className="flex items-center gap-3 rounded-[10px] border px-4 h-11"
            style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}
          >
            <Search size={16} strokeWidth={1.5} style={{ color: 'var(--color-text-muted)' }} />
            <input
              type="text"
              placeholder="Search terms"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent text-sm outline-none"
              style={{ color: 'var(--color-text-primary)' }}
            />
          </div>
          <div
            className="rounded-[14px] border mt-4 overflow-hidden divide-y"
            style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-card)' }}
          >
            {filteredGlossary?.map((g, i) => (
              <div key={i} className="px-5 py-3.5">
                <div className="text-sm font-semibold mb-1" style={{ color: 'var(--color-text-primary)' }}>
                  {g.term}
                </div>
                <div className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  {g.definition}
                </div>
              </div>
            ))}
            {filteredGlossary?.length === 0 && (
              <div className="px-5 py-6 text-sm text-center" style={{ color: 'var(--color-text-muted)' }}>
                No terms match "{search}"
              </div>
            )}
          </div>
        </div>
      )}

      {/* Table of contents */}
      {topic.sections.length > 0 && (
        <nav
          className="rounded-[14px] p-5 mb-10 border"
          style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--color-text-muted)' }}>
            Contents
          </p>
          <ol className="flex flex-col gap-1.5">
            {topic.sections.map((s, i) => (
              <li key={i}>
                <a
                  href={`#section-${i}`}
                  className="inline-flex items-center gap-1.5 text-sm transition-colors duration-150 hover:text-[var(--color-text-primary)]"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  <ChevronRight size={13} strokeWidth={2} style={{ color: 'var(--color-signal-red)' }} />
                  {s.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}

      {/* Sections */}
      <div className="flex flex-col gap-12">
        {topic.sections.map((section, i) => (
          <section key={i} id={`section-${i}`}>
            <h2
              className="text-xl font-bold mb-4"
              style={{
                color: 'var(--color-text-primary)',
                borderBottom: '1px solid var(--color-border)',
                paddingBottom: '12px',
              }}
            >
              {section.heading}
            </h2>
            <div className="flex flex-col gap-3 mb-5">
              {section.body.map((para, j) => (
                <p key={j} className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  {para}
                </p>
              ))}
            </div>
            {section.metrics && section.metrics.length > 0 && (
              <div className="rounded-[14px] border overflow-hidden" style={{ borderColor: 'var(--color-border)' }}>
                {section.metrics.map((m, k) => (
                  <div
                    key={k}
                    className="px-5 py-3.5 flex items-center justify-between gap-4"
                    style={{
                      backgroundColor: k % 2 === 0 ? 'var(--color-card)' : 'var(--color-elevated)',
                      borderBottom: k < section.metrics!.length - 1 ? '1px solid var(--color-border)' : 'none',
                    }}
                  >
                    <div>
                      <div className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{m.label}</div>
                      {m.note && <div className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{m.note}</div>}
                    </div>
                    <div className="tabular-nums text-right">
                      <span className="text-lg font-bold" style={{ color: 'var(--color-signal-red)' }}>{m.value}</span>
                      {m.unit && <span className="text-xs ml-1" style={{ color: 'var(--color-text-muted)' }}>{m.unit}</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
