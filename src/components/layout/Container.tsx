import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

/**
 * Container component for consistent layout across pages
 * Implements mobile-first responsive design with max-width and padding
 * 
 * Requirements: 6.1, 6.2
 */
function Container({ children, className = '', size = 'lg' }: ContainerProps) {
  // Define max-width based on size prop
  const sizeClasses = {
    sm: 'max-w-3xl',   // 768px
    md: 'max-w-5xl',   // 1024px
    lg: 'max-w-7xl',   // 1280px
    xl: 'max-w-screen-2xl', // 1536px
    full: 'max-w-full',
  };

  return (
    <div
      className={`
        mx-auto
        w-full
        px-4
        sm:px-6
        md:px-8
        lg:px-12
        ${sizeClasses[size]}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
    >
      {children}
    </div>
  );
}

export default Container;
