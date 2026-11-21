import { Link } from 'react-router-dom';

const FOOTER_LINKS = [
  {
    heading: 'Tools',
    links: [
      { label: '1RM Calculator', to: '/tools' },
      { label: 'TDEE & Macros', to: '/tools' },
      { label: 'Volume Tracker', to: '/tools' },
    ],
  },
  {
    heading: 'Guides',
    links: [
      { label: 'Body Recomposition', to: '/guides' },
      { label: 'Lean Bulk', to: '/guides' },
      { label: 'Cutting', to: '/guides' },
      { label: 'Peak Week', to: '/guides' },
    ],
  },
  {
    heading: 'Knowledge',
    links: [
      { label: 'Hypertrophy', to: '/knowledge' },
      { label: 'Cardio', to: '/knowledge' },
      { label: 'Hormones', to: '/knowledge' },
      { label: 'Programs', to: '/knowledge' },
    ],
  },
  {
    heading: 'Training',
    links: [
      { label: 'Bench 100 kg', to: '/training' },
      { label: 'Bench 200 kg+', to: '/training' },
    ],
  },
];

export function Footer() {
  return (
    <footer
      className="mt-auto"
      style={{
        backgroundColor: 'var(--color-elevated)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-flex items-center mb-3">
              <img
                src="/assets/logo-indiefit.png"
                alt="IndieFit"
                className="h-7 w-auto"
              />
            </Link>
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              Science-based lifting and nutrition — no fluff.
            </p>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map(({ heading, links }) => (
            <div key={heading}>
              <h3
                className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {heading}
              </h3>
              <ul className="flex flex-col gap-2">
                {links.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-sm transition-colors duration-150 hover:text-[var(--color-text-primary)]"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: '1px solid var(--color-border)' }}
        >
          <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
            © {new Date().getFullYear()} IndieFit. All rights reserved.
          </span>
          <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
            Evidence-based. Independently built.
          </span>
        </div>
      </div>
    </footer>
  );
}
