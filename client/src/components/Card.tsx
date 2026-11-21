import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  elevated?: boolean;
  hover?: boolean;
}

export function Card({ children, className = '', elevated = false, hover = false }: CardProps) {
  return (
    <div
      className={[
        'rounded-[14px] p-5',
        'border',
        hover
          ? 'transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-lg cursor-pointer'
          : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        backgroundColor: elevated ? 'var(--color-elevated)' : 'var(--color-card)',
        borderColor: 'var(--color-border)',
      }}
    >
      {children}
    </div>
  );
}
