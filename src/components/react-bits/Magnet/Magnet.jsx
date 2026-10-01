'use client';

import { useEffect, useRef } from 'react';

/**
 * React Bits — Magnet (perf-tuned).
 * Pulls its child toward the cursor within `padding` px. Uses direct DOM
 * transforms inside a single rAF-throttled listener — no React re-renders
 * on mousemove, so magnetized CTAs stay at 60fps.
 */
const Magnet = ({
  children,
  padding = 100,
  disabled = false,
  magnetStrength = 2,
  activeTransition = 'transform 0.25s ease-out',
  inactiveTransition = 'transform 0.45s ease-in-out',
  wrapperClassName = '',
  innerClassName = '',
  ...props
}) => {
  const magnetRef = useRef(null);
  const innerRef = useRef(null);
  const rafRef = useRef(0);
  const pendingRef = useRef(null);
  const activeRef = useRef(false);

  useEffect(() => {
    if (disabled) {
      if (innerRef.current) innerRef.current.style.transform = 'translate3d(0,0,0)';
      return;
    }

    const apply = () => {
      rafRef.current = 0;
      const pending = pendingRef.current;
      pendingRef.current = null;
      const inner = innerRef.current;
      const wrap = magnetRef.current;
      if (!pending || !inner || !wrap) return;

      const { left, top, width, height } = wrap.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const distX = Math.abs(centerX - pending.x);
      const distY = Math.abs(centerY - pending.y);

      if (distX < width / 2 + padding && distY < height / 2 + padding) {
        if (!activeRef.current) {
          activeRef.current = true;
          inner.style.transition = activeTransition;
        }
        const offsetX = (pending.x - centerX) / magnetStrength;
        const offsetY = (pending.y - centerY) / magnetStrength;
        inner.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
      } else if (activeRef.current) {
        activeRef.current = false;
        inner.style.transition = inactiveTransition;
        inner.style.transform = 'translate3d(0, 0, 0)';
      }
    };

    const handleMouseMove = e => {
      pendingRef.current = { x: e.clientX, y: e.clientY };
      if (!rafRef.current) rafRef.current = requestAnimationFrame(apply);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [padding, disabled, magnetStrength, activeTransition, inactiveTransition]);

  return (
    <div
      ref={magnetRef}
      className={wrapperClassName}
      style={{ position: 'relative', display: 'inline-block' }}
      {...props}
    >
      <div
        ref={innerRef}
        className={innerClassName}
        style={{ transform: 'translate3d(0, 0, 0)', willChange: 'transform' }}
      >
        {children}
      </div>
    </div>
  );
};

export default Magnet;
