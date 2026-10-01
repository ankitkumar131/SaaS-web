'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * React Bits — Scroll Reveal.
 * Words gently unblur and resolve as the block scrubs through the viewport,
 * with a subtle container rotation settling to zero. Coral/teal safe:
 * inherits parent text color via `textClassName`.
 */
const ScrollReveal = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.12,
  baseRotation = 3,
  blurStrength = 5,
  containerClassName = '',
  textClassName = '',
  rotationEnd = 'bottom bottom',
  wordAnimationEnd = 'bottom 55%'
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (typeof children !== 'string') return;

    const scroller =
      scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : undefined;

    const wordEls = el.querySelectorAll('.scroll-reveal-word');
    if (!wordEls.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { rotate: baseRotation, transformOrigin: '50% 50%' },
        {
          rotate: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            scroller,
            start: 'top bottom',
            end: rotationEnd,
            scrub: 0.6
          }
        }
      );

      gsap.fromTo(
        wordEls,
        { opacity: baseOpacity, filter: enableBlur ? `blur(${blurStrength}px)` : 'blur(0px)' },
        {
          opacity: 1,
          filter: 'blur(0px)',
          ease: 'none',
          stagger: 0.06,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: 'top bottom',
            end: wordAnimationEnd,
            scrub: 0.6
          }
        }
      );
    }, el);

    return () => ctx.revert();
  }, [
    children,
    scrollContainerRef,
    enableBlur,
    baseOpacity,
    baseRotation,
    blurStrength,
    rotationEnd,
    wordAnimationEnd
  ]);

  if (typeof children !== 'string') {
    return <div ref={containerRef} className={containerClassName}>{children}</div>;
  }

  return (
    <div ref={containerRef} className={containerClassName}>
      <p className={textClassName} aria-label={children}>
        {children.split(' ').map((word, i) => (
          <span key={i} className="scroll-reveal-word" aria-hidden="true" style={{ display: 'inline-block', willChange: 'opacity, filter' }}>
            {word}
            {i < children.split(' ').length - 1 ? '\u00A0' : ''}
          </span>
        ))}
      </p>
    </div>
  );
};

export default ScrollReveal;
