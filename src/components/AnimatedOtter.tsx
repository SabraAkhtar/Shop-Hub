import React, { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import cuteOtterImg from '../assets/images/cute_otter_clean.png';

interface AnimatedOtterProps {
  className?: string;
  maxW?: string;
}

export const AnimatedOtter: React.FC<AnimatedOtterProps> = ({
  className = '',
  maxW = 'max-w-[420px]',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftLidRef = useRef<SVGGElement>(null);
  const rightLidRef = useRef<SVGGElement>(null);
  const leftGlintRef = useRef<SVGGElement>(null);
  const rightGlintRef = useRef<SVGGElement>(null);

  const state = useRef({
    px: 0,
    py: 0,
    tx: 0,
    ty: 0,
    tracking: false,
    reducedMotion: false,
  });

  useEffect(() => {
    // Check prefers-reduced-motion
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    state.current.reducedMotion = mql.matches;
    const handleMotionChange = (e: MediaQueryListEvent) => {
      state.current.reducedMotion = e.matches;
    };
    mql.addEventListener('change', handleMotionChange);

    let alive = true;
    let raf: number;
    const timers = new Set<ReturnType<typeof setTimeout>>();

    const later = (fn: () => void, ms: number) => {
      const id = setTimeout(() => {
        timers.delete(id);
        if (alive) fn();
      }, ms);
      timers.add(id);
    };

    // Close / Open Eyelids
    const setLids = (closed: boolean) => {
      const transformValue = closed ? 'translateY(0px)' : 'translateY(-34px)';
      if (leftLidRef.current) leftLidRef.current.style.transform = transformValue;
      if (rightLidRef.current) rightLidRef.current.style.transform = transformValue;
    };

    // Realistic blinking cycle
    const blink = () => {
      if (!alive) return;
      setLids(true); // Eyes shut
      const holdTime = 110 + Math.random() * 60; // 110-170ms hold

      later(() => {
        setLids(false); // Eyes open
        // 18% chance of immediate sweet double-blink
        if (Math.random() < 0.18) {
          later(() => {
            setLids(true);
            later(() => setLids(false), 100);
          }, 160);
        }
      }, holdTime);
    };

    const scheduleBlink = () => {
      if (!alive) return;
      // Natural randomized interval between 2.8s and 6.2s
      const delay = 2800 + Math.random() * 3400;
      later(() => {
        blink();
        scheduleBlink();
      }, delay);
    };

    // Idle looking directions (subtle 2px shifts)
    const LOOK_DIRECTIONS: [number, number][] = [
      [0, 0],       // Forward at user (sad gaze)
      [0, 0],       // Forward
      [-2.2, 0.4],  // Slightly left
      [2.2, -0.2],  // Slightly right
      [0, 2.0],     // Looking down at the ShopHub shopping bag
      [-1.4, 1.2],  // Down-left
      [1.2, 1.0],   // Down-right
    ];

    const scheduleLook = () => {
      if (!alive) return;
      const delay = 3200 + Math.random() * 4500;
      later(() => {
        if (!state.current.tracking) {
          const next = LOOK_DIRECTIONS[Math.floor(Math.random() * LOOK_DIRECTIONS.length)];
          state.current.tx = next[0];
          state.current.ty = next[1];
        }
        scheduleLook();
      }, delay);
    };

    // Animation frame loop for smooth pupil/glint lerp
    const tick = () => {
      if (!alive) return;
      const s = state.current;
      s.px += (s.tx - s.px) * 0.08;
      s.py += (s.ty - s.py) * 0.08;

      const glintTransform = `translate(${s.px}px, ${s.py}px)`;
      if (leftGlintRef.current) leftGlintRef.current.style.transform = glintTransform;
      if (rightGlintRef.current) rightGlintRef.current.style.transform = glintTransform;

      raf = requestAnimationFrame(tick);
    };

    if (!state.current.reducedMotion) {
      scheduleBlink();
      scheduleLook();
    } else {
      // Minimal blinking for reduced motion
      const slowBlink = () => {
        if (!alive) return;
        later(() => {
          setLids(true);
          later(() => {
            setLids(false);
            slowBlink();
          }, 180);
        }, 7000 + Math.random() * 5000);
      };
      slowBlink();
    }

    raf = requestAnimationFrame(tick);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      mql.removeEventListener('change', handleMotionChange);
    };
  }, []);

  // Desktop subtle mouse tracking
  useEffect(() => {
    if ('ontouchstart' in window) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (state.current.reducedMotion) return;
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width * 0.45;
      const cy = rect.top + rect.height * 0.35;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 550) {
        state.current.tracking = true;
        state.current.tx = Math.max(-2.5, Math.min(2.5, dx / 120));
        state.current.ty = Math.max(-2.0, Math.min(2.5, dy / 150));
      } else {
        state.current.tracking = false;
      }
    };

    const handleMouseLeave = () => {
      state.current.tracking = false;
      state.current.tx = 0;
      state.current.ty = 0;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative w-full ${maxW} flex flex-col items-center justify-center select-none ${className}`}>
      
      {/* Background Soft Glow Aura */}
      <div
        className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 w-[340px] h-[320px] rounded-full bg-[#D1F5EE] blur-3xl opacity-60"
        aria-hidden="true"
      />

      {/* Floating Otter Character Container */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut' }}
        className="relative w-full flex items-center justify-center z-10"
      >
        <svg
          viewBox="0 0 377 295"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto drop-shadow-[0_12px_24px_rgba(6,61,55,0.08)]"
          role="img"
          aria-label="Cute sad baby otter holding a ShopHub shopping bag, blinking and looking around"
        >
          <defs>
            {/* Eyelid Fur Gradients */}
            <linearGradient id="otter-lid-grad-left" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C49666" />
              <stop offset="60%" stopColor="#A87747" />
              <stop offset="100%" stopColor="#7E542D" />
            </linearGradient>
            <linearGradient id="otter-lid-grad-right" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#CE9E6E" />
              <stop offset="60%" stopColor="#AF7D4C" />
              <stop offset="100%" stopColor="#815730" />
            </linearGradient>

            {/* Left Eye Clip Path (covers the exact left eyeball socket) */}
            <clipPath id="left-eye-clip">
              <ellipse cx="118" cy="98" rx="14.5" ry="16" transform="rotate(-12 118 98)" />
            </clipPath>

            {/* Right Eye Clip Path (covers the exact right eyeball socket) */}
            <clipPath id="right-eye-clip">
              <ellipse cx="180" cy="80" rx="13.5" ry="14.5" transform="rotate(10 180 80)" />
            </clipPath>
          </defs>

          {/* 1. Base 3D Cute Otter Character Image */}
          <image
            href={cuteOtterImg}
            x="0"
            y="0"
            width="377"
            height="295"
            preserveAspectRatio="xMidYMid meet"
          />

          {/* 2. Interactive Left Eye Pupil Glints & Highlights */}
          <g clipPath="url(#left-eye-clip)">
            <g ref={leftGlintRef} style={{ willChange: 'transform' }}>
              {/* Primary specular highlight */}
              <circle cx="115" cy="91" r="3.2" fill="white" opacity="0.95" />
              {/* Secondary softer glint */}
              <circle cx="123" cy="89" r="1.4" fill="white" opacity="0.6" />
              {/* Eye iris micro glow */}
              <ellipse cx="118" cy="103" rx="7" ry="3.5" fill="#4FB3A8" opacity="0.18" />
            </g>

            {/* Left Eyelid (Smoothly slides down during blinks) */}
            <g
              ref={leftLidRef}
              style={{
                transform: 'translateY(-34px)',
                transition: 'transform 0.11s cubic-bezier(0.4, 0, 0.2, 1)',
                willChange: 'transform',
              }}
            >
              {/* Eyelid body */}
              <rect x="100" y="78" width="36" height="34" rx="16" fill="url(#otter-lid-grad-left)" />
              {/* Soft eyelid crease shadow */}
              <path d="M103,84 Q118,92 133,86" stroke="#5D381B" strokeWidth="1.2" fill="none" opacity="0.4" />
              {/* Eyelash edge line */}
              <path d="M102,110 Q118,114 133,108" stroke="#3A210F" strokeWidth="1.6" fill="none" strokeLinecap="round" />
            </g>
          </g>

          {/* 3. Interactive Right Eye Pupil Glints & Highlights */}
          <g clipPath="url(#right-eye-clip)">
            <g ref={rightGlintRef} style={{ willChange: 'transform' }}>
              {/* Primary specular highlight */}
              <circle cx="178" cy="74" r="3.0" fill="white" opacity="0.95" />
              {/* Secondary softer glint */}
              <circle cx="185" cy="72" r="1.3" fill="white" opacity="0.6" />
              {/* Eye iris micro glow */}
              <ellipse cx="180" cy="85" rx="6.5" ry="3.2" fill="#4FB3A8" opacity="0.18" />
            </g>

            {/* Right Eyelid (Smoothly slides down during blinks) */}
            <g
              ref={rightLidRef}
              style={{
                transform: 'translateY(-34px)',
                transition: 'transform 0.11s cubic-bezier(0.4, 0, 0.2, 1)',
                willChange: 'transform',
              }}
            >
              <rect x="163" y="62" width="34" height="34" rx="16" fill="url(#otter-lid-grad-right)" />
              <path d="M166,68 Q180,75 194,70" stroke="#5D381B" strokeWidth="1.2" fill="none" opacity="0.4" />
              <path d="M165,94 Q180,97 194,92" stroke="#3A210F" strokeWidth="1.6" fill="none" strokeLinecap="round" />
            </g>
          </g>

          {/* 4. Subtle Shimmer on Teardrops */}
          <motion.circle
            cx="109"
            cy="119"
            r="1.8"
            fill="white"
            animate={{ opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.circle
            cx="198"
            cy="95"
            r="1.6"
            fill="white"
            animate={{ opacity: [0.3, 0.85, 0.3] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
        </svg>
      </motion.div>

      {/* Dynamic Breathing Floor Shadow */}
      <motion.div
        animate={{
          scaleX: [1, 0.93, 1],
          opacity: [0.22, 0.14, 0.22],
        }}
        transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut' }}
        className="w-56 h-4 bg-[#063D37]/25 rounded-full blur-md -mt-3 z-0"
        aria-hidden="true"
      />
    </div>
  );
};
