import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Home, ShoppingBag } from 'lucide-react';
import { ActionPrimaryButton, ActionSecondaryButton } from '../components/AnimatedButtons';
import { AnimatedOtter } from '../components/AnimatedOtter';

/* ═══════════════════════════════════════════════════════════════════════════
   Stagger animation variants for clean page load
═══════════════════════════════════════════════════════════════════════════ */
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

/* ═══════════════════════════════════════════════════════════════════════════
   NotFoundPage
═══════════════════════════════════════════════════════════════════════════ */
export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="w-full min-h-[92vh] bg-[#F7FCFB] relative flex flex-col items-center justify-center overflow-hidden px-4 py-12 sm:py-16 select-none">
      
      {/* ────────────────────────────────────────────────────────────────────
          BACKGROUND LAYER — subtle decorative elements matching reference
      ──────────────────────────────────────────────────────────────────── */}

      {/* Soft radial ambient aura */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-[#D1F5EE] blur-[130px] opacity-45"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-36 -right-36 w-[520px] h-[520px] rounded-full bg-[#078F83]/8 blur-[110px]"
        aria-hidden="true"
      />

      {/* Dot-grid background pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[radial-gradient(#063D37_1px,transparent_1px)] [background-size:28px_28px]"
        aria-hidden="true"
      />

      {/* Decorative subtle circles matching reference */}
      <div className="pointer-events-none absolute top-12 left-10 sm:left-20 opacity-30" aria-hidden="true">
        <div className="w-14 h-14 rounded-full border border-[#0D7E73]/40" />
      </div>
      <div className="pointer-events-none absolute bottom-16 left-1/3 opacity-25" aria-hidden="true">
        <div className="w-9 h-9 rounded-full border border-[#0D7E73]/30" />
      </div>
      <div className="pointer-events-none absolute top-20 right-12 sm:right-24 opacity-25" aria-hidden="true">
        <div className="w-12 h-12 rounded-full border border-[#063D37]/30" />
      </div>

      {/* Small scattered teal accent dots */}
      <div className="pointer-events-none absolute left-8 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 opacity-20" aria-hidden="true">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#0D7E73]" />
        ))}
      </div>

      {/* ────────────────────────────────────────────────────────────────────
          MAIN CONTENT CONTAINER
      ──────────────────────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center gap-8 lg:gap-6 lg:flex-row lg:items-center lg:justify-between">

        {/* ─── LEFT COLUMN: Text Content & Actions ─── */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-[500px] lg:max-w-[460px] w-full">

          {/* 404 Error pill badge */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={mounted ? 'visible' : 'hidden'}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF8F5] border border-[#7DD8CF]/60 text-[#0D7E73] text-[11px] font-bold tracking-[0.12em] uppercase mb-4 shadow-xs"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#0D7E73] animate-pulse" />
            <span>404 Error</span>
          </motion.div>

          {/* Bold 404 number display */}
          <motion.div
            custom={0.08}
            variants={fadeUp}
            initial="hidden"
            animate={mounted ? 'visible' : 'hidden'}
            className="font-black leading-none tracking-tight text-[#063D37] mb-3"
            style={{ fontSize: 'clamp(68px, 12vw, 110px)' }}
          >
            <span className="text-[#0D7E73]">4</span>
            <span>0</span>
            <span className="text-[#0D7E73]">4</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            custom={0.16}
            variants={fadeUp}
            initial="hidden"
            animate={mounted ? 'visible' : 'hidden'}
            className="font-extrabold text-[#063D37] tracking-tight leading-[1.15] mb-3.5"
            style={{ fontSize: 'clamp(24px, 4vw, 36px)' }}
          >
            Looks Like This Page<br className="hidden sm:block" /> Is{' '}
            <span className="text-[#0D7E73]">Out of Stock!</span>
          </motion.h1>

          {/* Supporting explanation */}
          <motion.p
            custom={0.24}
            variants={fadeUp}
            initial="hidden"
            animate={mounted ? 'visible' : 'hidden'}
            className="text-[#5A6E6A] text-[14.5px] sm:text-[15.5px] leading-relaxed mb-7 max-w-[430px]"
          >
            We couldn&apos;t find the page you&apos;re looking for. It may have moved,
            been removed, or the link might be incorrect. Let&apos;s get you back
            to&nbsp;ShopHub.
          </motion.p>

          {/* Dual Action Buttons */}
          <motion.div
            custom={0.32}
            variants={fadeUp}
            initial="hidden"
            animate={mounted ? 'visible' : 'hidden'}
            className="flex flex-wrap items-center gap-3 justify-center lg:justify-start"
          >
            <ActionPrimaryButton
              onClick={() => navigate('/')}
              size="md"
              icon={<Home className="w-4 h-4" />}
              aria-label="Back to ShopHub homepage"
            >
              Back to Home
            </ActionPrimaryButton>

            <ActionSecondaryButton
              onClick={() => navigate('/products')}
              size="md"
              aria-label="Browse all products"
            >
              <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
              Browse Products
            </ActionSecondaryButton>
          </motion.div>

          {/* Quick links footer row */}
          <motion.div
            custom={0.4}
            variants={fadeUp}
            initial="hidden"
            animate={mounted ? 'visible' : 'hidden'}
            className="mt-8 pt-5 border-t border-[#DDF0EB] w-full flex flex-wrap gap-x-5 gap-y-2 justify-center lg:justify-start"
          >
            <span className="text-[#8BA5A0] text-[12px] font-medium">Quick links:</span>
            {[
              { label: 'Smartphones', path: '/products?category=smartphones' },
              { label: 'Laptops', path: '/products?category=laptops' },
              { label: 'Audio', path: '/products?category=audio' },
            ].map(({ label, path }) => (
              <button
                key={label}
                onClick={() => navigate(path)}
                className="text-[12px] font-semibold text-[#0D7E73] hover:text-[#063D37] underline underline-offset-2 decoration-[#0D7E73]/40 hover:decoration-[#063D37] transition-colors cursor-pointer"
              >
                {label}
              </button>
            ))}
          </motion.div>

        </div>

        {/* ─── RIGHT COLUMN: Realistic Animated Cute Otter ─── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="w-full max-w-[360px] sm:max-w-[420px] lg:max-w-[460px] flex items-center justify-center"
        >
          <AnimatedOtter />
        </motion.div>

      </div>
    </div>
  );
};
