import React from 'react';
import { cn } from '@/lib/utils';
interface RetroWrapperProps {
  children: React.ReactNode;
  className?: string;
}
export function RetroWrapper({ children, className }: RetroWrapperProps): JSX.Element {
  return (
    <div className={cn(
      "relative flex h-screen w-screen items-center justify-center bg-background p-4 sm:p-8 md:p-12 perspective-[1000px] overflow-hidden",
      className
    )}>
      {/* CRT Screen Effect */}
      <div className="absolute inset-0 scanlines vignette pointer-events-none z-10" />
      {/* Glare Effect */}
      <div className="absolute top-0 left-0 h-1/2 w-full bg-gradient-to-b from-white/10 to-transparent opacity-50 pointer-events-none z-20" />
      {/* Content with 3D transform for curvature */}
      <div className="w-full h-full transform-gpu rotate-x-[1deg] scale-[1.02]">
        {children}
      </div>
    </div>
  );
}