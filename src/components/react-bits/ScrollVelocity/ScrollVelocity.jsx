'use client';

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity
} from 'motion/react';
import { useRef } from 'react';

const wrap = (min, max, v) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

/**
 * React Bits — Scroll Velocity (width-calibrated).
 * A seamless infinite marquee whose speed is defined in real pixels/second,
 * so it feels identical on any screen width. Every copy is identical
 * (text + separator), and the loop travels exactly one copy width —
 * no jumps, no gaps, edge to edge. Scroll velocity adds a temporary boost
 * and flips direction when scrolling up.
 */
function VelocityRow({
  children,
  pxPerSecond = 40,
  damping = 50,
  stiffness = 400,
  numCopies = 6,
  separator
}) {
  const baseX = useMotionValue(0);
  const trackRef = useRef(null);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping, stiffness });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 2.5], { clamp: false });
  const directionFactor = useRef(1);
  const copyPct = 100 / numCopies;
  const x = useTransform(baseX, v => `${wrap(0, -copyPct, v)}%`);

  useAnimationFrame((_, delta) => {
    const track = trackRef.current;
    if (!track) return;
    const width = track.scrollWidth || 1;
    const vf = velocityFactor.get();
    if (vf < 0) directionFactor.current = -1;
    else if (vf > 0) directionFactor.current = 1;
    const boost = 1 + Math.min(Math.abs(vf), 3);
    const movePx = directionFactor.current * pxPerSecond * boost * (delta / 1000);
    baseX.set(baseX.get() + (movePx / width) * 100);
  });

  return (
    <div className="flex w-max whitespace-nowrap will-change-transform">
      <motion.div ref={trackRef} className="flex w-max items-center whitespace-nowrap" style={{ x }}>
        {Array.from({ length: numCopies }).map((_, copy) => (
          <span
            key={copy}
            className="flex w-max items-center whitespace-nowrap"
            aria-hidden={copy > 0}
          >
            {children}
            {separator}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

const DefaultSeparator = (
  <span
    aria-hidden="true"
    className="mx-7 inline-block h-3 w-3 shrink-0 rounded-full bg-gradient-to-r from-coral-400 to-teal-400 sm:mx-9 sm:h-3.5 sm:w-3.5"
  />
);

const ScrollVelocity = ({
  texts = [],
  velocity = 40,
  className = '',
  damping = 50,
  stiffness = 400,
  numCopies = 6,
  rowClassName = '',
  separator = DefaultSeparator
}) => {
  const perRowClass = index =>
    Array.isArray(rowClassName) ? rowClassName[index % rowClassName.length] : rowClassName;
  return (
    <div className={`overflow-hidden ${className}`}>
      {texts.map((text, i) => (
        <VelocityRow
          key={i}
          pxPerSecond={i % 2 === 0 ? velocity : -velocity}
          damping={damping}
          stiffness={stiffness}
          numCopies={numCopies}
          separator={separator}
        >
          <span className={perRowClass(i)}>{text}</span>
        </VelocityRow>
      ))}
    </div>
  );
};

export default ScrollVelocity;
