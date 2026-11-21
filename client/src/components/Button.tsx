import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const base = [
    'inline-flex items-center justify-center font-semibold rounded-[10px]',
    'transition-[color,background-color,transform,opacity] duration-150',
    'active:scale-[0.96]',
    'cursor-pointer select-none',
    'focus-visible:outline-2 focus-visible:outline-offset-2',
    'disabled:opacity-50 disabled:pointer-events-none',
  ].join(' ');

  const sizes: Record<string, string> = {
    sm: 'h-10 px-4 text-sm gap-1.5',
    md: 'h-11 px-5 text-sm gap-2',
    lg: 'h-12 px-6 text-base gap-2',
  };

  const variants: Record<string, string> = {
    primary: [
      'text-white focus-visible:outline-[var(--color-signal-red)]',
    ].join(' '),
    secondary: [
      'border text-[var(--color-text-primary)] focus-visible:outline-[var(--color-border)]',
    ].join(' '),
    ghost: [
      'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] focus-visible:outline-[var(--color-border)]',
    ].join(' '),
  };

  const inlineStyle: React.CSSProperties =
    variant === 'primary'
      ? { backgroundColor: 'var(--color-signal-red)' }
      : variant === 'secondary'
      ? {
          backgroundColor: 'var(--color-elevated)',
          borderColor: 'var(--color-border)',
        }
      : {};

  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      style={inlineStyle}
      onMouseEnter={(e) => {
        if (variant === 'primary') {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor =
            'var(--color-signal-red-hover)';
        }
      }}
      onMouseLeave={(e) => {
        if (variant === 'primary') {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor =
            'var(--color-signal-red)';
        }
      }}
      {...props}
    >
      {children}
    </button>
  );
}
