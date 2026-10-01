'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';

/**
 * React Bits — Blur Text (motion variant).
 * Text starts blurred then crisply resolves word-by-word (or letter-by-letter)
 * as it scrolls into view. Coral/teal safe: inherits parent text color.
 */
const BlurText = ({
  text = '',
  delay = 40,
  className = '',
  animateBy = 'words',
  direction = 'top',
  onAnimationComplete
}) => {
  const segments = useMemo(() => {
    if (animateBy === 'letters') return text.split('');
    return text.split(' ');
  }, [text, animateBy]);

  const fromY = direction === 'top' ? -14 : 14;

  return (
    <p className={className} aria-label={text}>
      {segments.map((segment, i) => (
        <motion.span
          key={`${segment}-${i}`}
          aria-hidden="true"
          initial={{ opacity: 0, filter: 'blur(10px)', y: fromY }}
          whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          viewport={{ once: true, margin: '-8% 0px' }}
          transition={{ duration: 0.55, delay: (i * delay) / 1000, ease: [0.22, 1, 0.36, 1] }}
          onAnimationComplete={
            i === segments.length - 1 && onAnimationComplete ? onAnimationComplete : undefined
          }
          style={{ display: 'inline-block', willChange: 'opacity, filter, transform' }}
        >
          {animateBy === 'letters' ? (segment === ' ' ? '\u00A0' : segment) : segment}
          {animateBy === 'words' && i < segments.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </p>
  );
};

export default BlurText;
