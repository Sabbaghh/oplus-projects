import React from 'react';

type Props = {
  children: React.ReactNode;
  size?: 'x-small' | 'small' | 'medium' | 'large' | 'medium-large';
  className?: string;
};
function Title({ children, size = 'medium', className }: Props) {
  const fontSize = (): string => {
    switch (size) {
      case 'x-small':
        return 'text-xs';
      case 'small':
        return 'text-sm';
      case 'medium-large':
        return 'text-2xl';
      case 'medium':
        return 'md:text-xl text-base';
      case 'large':
        return 'text-6xl';
      default:
        return 'text-6xl';
    }
  };
  return (
    <h1
      className={`font-[family-name:var(--poppins)] ${fontSize()} ${className}`}
    >
      {children}
    </h1>
  );
}

export default Title;
