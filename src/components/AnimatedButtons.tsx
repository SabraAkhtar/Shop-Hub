import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

// =========================================================================
// 1. PRIMARY BUTTON ("Shop Products" — Gliding Circle Animation)
// =========================================================================
interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const ActionPrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  size = 'md',
  icon,
  className = '',
  disabled = false,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [travelDistance, setTravelDistance] = useState(0);

  // Geometric sizes calculation
  const config = {
    sm: {
      btnClasses: 'min-h-[36px] text-xs py-1.5',
      paddingLeft: 34,
      paddingRight: 34,
      circleSize: 22,
      inset: 5,
      iconClass: 'w-3 h-3',
    },
    md: {
      btnClasses: 'min-h-[44px] text-xs sm:text-sm py-2 sm:py-2.5',
      paddingLeft: 42,
      paddingRight: 42,
      circleSize: 28,
      inset: 6,
      iconClass: 'w-3.5 h-3.5 sm:w-4 sm:h-4',
    },
    lg: {
      btnClasses: 'min-h-[52px] text-sm sm:text-base py-3',
      paddingLeft: 50,
      paddingRight: 50,
      circleSize: 34,
      inset: 7,
      iconClass: 'w-4 h-4 sm:w-4.5 sm:h-4.5',
    },
  }[size];

  // Circle travel distance dynamically calculate karta hai (Width - Circle - 2*Inset)
  const updateDistance = useCallback(() => {
    if (btnRef.current) {
      const btnWidth = btnRef.current.offsetWidth;
      const dist = btnWidth - config.circleSize - 2 * config.inset;
      setTravelDistance(Math.max(0, dist));
    }
  }, [config.circleSize, config.inset]);

  useEffect(() => {
    updateDistance();
    if (typeof ResizeObserver !== 'undefined' && btnRef.current) {
      const observer = new ResizeObserver(() => updateDistance());
      observer.observe(btnRef.current);
      return () => observer.disconnect();
    }
  }, [updateDistance, children]);

  return (
    <button
      ref={btnRef}
      disabled={disabled}
      onMouseEnter={() => {
        updateDistance();
        setIsHovered(true);
      }}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        paddingLeft: `${config.paddingLeft}px`,
        paddingRight: `${config.paddingRight}px`,
      }}
      className={`
        relative inline-flex items-center justify-center rounded-full
        bg-[#0D7E73] text-white border-2 border-[#0D7E73]
        shadow-[0_4px_14px_rgba(13,126,115,0.22)] hover:shadow-[0_6px_24px_rgba(13,126,115,0.32)]
        font-bold cursor-pointer select-none active:scale-[0.98] overflow-hidden whitespace-nowrap
        ${config.btnClasses} ${disabled ? 'opacity-60 cursor-not-allowed' : ''} ${className}
      `}
      {...props}
    >
      {/* 1. White Background Layer (Hover par fade in hota hai) */}
      <span
        style={{
          opacity: isHovered ? 1 : 0,
          transition: isHovered
            ? 'opacity 250ms ease-out 380ms'
            : 'opacity 180ms ease-in 0ms',
        }}
        className="absolute inset-0 bg-white z-0 pointer-events-none rounded-full"
      />

      {/* 2. Gliding White Circle jisme arrow glide karta hai */}
      <span
        style={{
          width: `${config.circleSize}px`,
          height: `${config.circleSize}px`,
          left: `${config.inset}px`,
          top: '50%',
          transform: isHovered && travelDistance > 0
            ? `translate3d(${travelDistance}px, -50%, 0)`
            : 'translate3d(0, -50%, 0)',
          transition: isHovered
            ? 'transform 400ms cubic-bezier(0.22, 1, 0.36, 1) 0ms'
            : 'transform 380ms cubic-bezier(0.22, 1, 0.36, 1) 100ms',
        }}
        className="absolute z-20 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm pointer-events-none will-change-transform"
      >
        <span className="text-[#0D7E73] flex items-center justify-center">
          {icon || <ArrowRight className={`${config.iconClass} stroke-[2.5] text-[#0D7E73]`} />}
        </span>
      </span>

      {/* 3. Invisible Anchor (Button ka size fix rakhne ke liye Zero Layout Shift) */}
      <span className="invisible pointer-events-none font-bold whitespace-nowrap select-none">
        {children}
      </span>

      {/* 4. Default State Text (White Text on Green) */}
      <span
        style={{
          opacity: isHovered ? 0 : 1,
          transform: isHovered ? 'translate3d(4px, -50%, 0)' : 'translate3d(0, -50%, 0)',
          transition: isHovered
            ? 'opacity 130ms ease-in, transform 130ms ease-in'
            : 'opacity 200ms ease-out 250ms, transform 200ms ease-out 250ms',
        }}
        className="absolute top-1/2 left-0 right-0 flex items-center justify-center pointer-events-none font-bold text-white whitespace-nowrap px-4 z-10"
      >
        {children}
      </span>

      {/* 5. Hover State Text (Dark Green Text on White) */}
      <span
        style={{
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? 'translate3d(0, -50%, 0)' : 'translate3d(-4px, -50%, 0)',
          transition: isHovered
            ? 'opacity 240ms ease-out 380ms, transform 240ms ease-out 380ms'
            : 'opacity 120ms ease-in 0ms, transform 120ms ease-in 0ms',
        }}
        className="absolute top-1/2 left-0 right-0 flex items-center justify-center pointer-events-none font-black text-[#042F2C] whitespace-nowrap px-4 z-10"
      >
        {children}
      </span>
    </button>
  );
};

// =========================================================================
// 2. SECONDARY BUTTON ("Get a Quote ↗" — Underline & Diagonal Arrow)
// =========================================================================
interface SecondaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  showArrow?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const ActionSecondaryButton: React.FC<SecondaryButtonProps> = ({
  children,
  showArrow = true,
  size = 'md',
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'text-xs py-1.5 px-3 rounded-lg',
    md: 'text-xs sm:text-sm py-2.5 px-4 rounded-xl',
    lg: 'text-sm sm:text-base py-3 px-5 rounded-xl',
  }[size];

  return (
    <button
      {...props}
      className={`
        relative inline-flex items-center justify-center gap-2 font-bold 
        transition-all duration-300 cursor-pointer group select-none
        border border-transparent hover:border-[#CCFBF1] hover:bg-[#F0FDFA]/70
        text-[#042F2C] hover:text-[#0D7E73]
        ${sizeClasses} ${className}
      `}
    >
      {/* Text label with slight slide */}
      <span className="relative z-10 whitespace-nowrap transition-transform duration-300 ease-out group-hover:translate-x-0.5">
        {children}
      </span>

      {/* Diagonal Arrow (45° Angle) — hovers up & right */}
      {showArrow && (
        <span className="relative z-10 flex items-center justify-center transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-0.5 shrink-0 text-[#0D7E73]">
          <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
        </span>
      )}

      {/* Expanding Underline Effect (Left to Right) */}
      <span
        className="absolute bottom-1 left-3 right-3 h-[1.5px] rounded-full transition-all duration-300 ease-out origin-left scale-x-0 group-hover:scale-x-100 bg-[#0D7E73]"
      />
    </button>
  );
};
