interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'red' | 'muted';
  className?: string;
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const variants = {
    default: {
      backgroundColor: 'var(--color-elevated)',
      color: 'var(--color-text-secondary)',
      borderColor: 'var(--color-border)',
    },
    red: {
      backgroundColor: 'rgba(225, 29, 42, 0.12)',
      color: 'var(--color-signal-red)',
      borderColor: 'rgba(225, 29, 42, 0.25)',
    },
    muted: {
      backgroundColor: 'transparent',
      color: 'var(--color-text-muted)',
      borderColor: 'var(--color-border)',
    },
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-[6px] text-xs font-medium border ${className}`}
      style={variants[variant]}
    >
      {children}
    </span>
  );
}
