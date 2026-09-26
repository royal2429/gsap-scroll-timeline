import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';

type SectionHeadingProps = {
  text: string;
  className?: string;
  highlightedWords?: string[];
  highlightedClassName?: string;
};

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduce(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return reduce;
}

/** Heading whose characters slide up one by one the first time it scrolls into view. */
export function SectionHeading({
  text,
  className = '',
  highlightedWords = [],
  highlightedClassName = '',
}: SectionHeadingProps) {
  const reduceMotion = usePrefersReducedMotion();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;
    const el = headingRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reduceMotion]);

  const highlightSet = new Set(highlightedWords.map((word) => word.toLowerCase()));
  const words = text.split(' ');
  const charState = reduceMotion ? 'static' : isRevealed ? 'animated' : 'hidden';

  return (
    <h2
      ref={headingRef}
      className={['hiw-reveal', className].filter(Boolean).join(' ')}
      aria-label={text}
    >
      {words.map((word, wordIndex) => {
        const offset = words.slice(0, wordIndex).reduce((sum, w) => sum + w.length + 1, 0);
        const normalized = word.replace(/[^\p{L}\p{N}]/gu, '').toLowerCase();
        const wordClass = [
          'hiw-reveal__word',
          highlightSet.has(normalized) ? highlightedClassName : '',
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <span key={wordIndex} className={wordClass} aria-hidden>
            {word.split('').map((char, i) => (
              <span
                key={i}
                className={`hiw-reveal__char hiw-reveal__char--${charState}`}
                style={{ '--index': offset + i } as CSSProperties}
              >
                {char}
              </span>
            ))}
            {wordIndex < words.length - 1 && <span className="hiw-reveal__space"> </span>}
          </span>
        );
      })}
    </h2>
  );
}
