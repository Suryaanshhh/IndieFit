import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from './Button';

const NAV_LINKS = [
  { label: 'Tools', to: '/tools' },
  { label: 'Guides', to: '/guides' },
  { label: 'Knowledge', to: '/knowledge' },
  { label: 'Training', to: '/training' },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header
        className="sticky top-0 z-50 w-full"
        style={{
          backgroundColor: 'var(--color-base)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img
              src="/assets/logo-indiefit.png"
              alt="IndieFit"
              className="h-11 w-auto"
            />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  [
                    'h-10 px-4 flex items-center rounded-[10px] text-sm font-medium',
                    'transition-[color,background-color] duration-150',
                    isActive
                      ? 'text-[var(--color-text-primary)] bg-[var(--color-elevated)]'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-elevated)]',
                  ].join(' ')
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          {/* Desktop CTA + Mobile menu toggle */}
          <div className="flex items-center gap-3">
            <Link to="/tools" className="hidden md:block">
              <Button size="sm">Explore Tools</Button>
            </Link>

            {/* Mobile hamburger */}
            <button
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((v) => !v)}
              className={[
                'md:hidden h-10 w-10 flex items-center justify-center rounded-[10px]',
                'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]',
                'transition-[color,background-color] duration-150 hover:bg-[var(--color-elevated)]',
                'active:scale-[0.96]',
              ].join(' ')}
            >
              {menuOpen ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="absolute top-16 left-0 right-0 shadow-2xl"
            style={{
              backgroundColor: 'var(--color-elevated)',
              borderBottom: '1px solid var(--color-border)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col p-4 gap-1">
              {NAV_LINKS.map(({ label, to }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    [
                      'h-11 px-4 flex items-center rounded-[10px] text-sm font-medium',
                      'transition-[color,background-color] duration-150',
                      isActive
                        ? 'text-[var(--color-text-primary)] bg-[var(--color-card)]'
                        : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-card)]',
                    ].join(' ')
                  }
                >
                  {label}
                </NavLink>
              ))}
              <div className="pt-2 mt-1" style={{ borderTop: '1px solid var(--color-border)' }}>
                <Link to="/tools" onClick={() => setMenuOpen(false)}>
                  <Button className="w-full justify-center">Explore Tools</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
