import { useEffect, useRef } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionHeading } from './SectionHeading';
import './how-it-works.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export type HowItWorksStep = {
  /** Use `\n` to force a line break on mobile. */
  title: string;
  description: string;
  image: string;
  /** Short label shown on the image and above the title, e.g. "Pickup". */
  tag: string;
  imageAlt?: string;
};

export type HowItWorksProps = {
  steps: HowItWorksStep[];
  badge?: string;
  /** Icon shown inside the top badge. Falls back to a dot. */
  badgeIcon?: ReactNode;
  heading?: string;
  /** Words in `heading` rendered in the accent color. */
  highlightedWords?: string[];
  description?: string;
  /** Shorter description for the mobile layout. Defaults to `description`. */
  mobileDescription?: string;
  /** Pixels of page scroll spent on each step. */
  stepScroll?: number;
  /**
   * Desktop sticky `top` is negative so the block sits slightly above the pin line (navbar overlap).
   * The panel's min-height adds this many px back so the background reaches the viewport bottom.
   */
  stickyTopOffset?: number;
  /** Distance from the top of the viewport where the mobile panel pins (e.g. your navbar height). */
  mobileStickyTop?: number;
  /**
   * Timeline fill + dot only use this fraction of the rail (0–1). Scroll progress still runs 0→1,
   * but the line stops early so it never reads "complete" before you leave the section.
   */
  timelineMaxVisual?: number;
  className?: string;
};

const pad = (n: number) => String(n).padStart(2, '0');

export function HowItWorks({
  steps,
  badge = 'Simple Process',
  badgeIcon,
  heading = 'How It Works',
  highlightedWords = ['Works'],
  description,
  mobileDescription = description,
  stepScroll = 600,
  stickyTopOffset = 170,
  mobileStickyTop = 80,
  timelineMaxVisual = 0.7,
  className = '',
}: HowItWorksProps) {
  const total = steps.length;
  const spacerRef = useRef<HTMLDivElement>(null);

  // Desktop refs
  const timelineFillRef = useRef<HTMLDivElement>(null);
  const timelineDotRef = useRef<HTMLDivElement>(null);
  const leftLayerRefs = useRef<HTMLDivElement[]>([]);
  const rightLayerRefs = useRef<HTMLDivElement[]>([]);

  // Mobile refs
  const mobileLayerRefs = useRef<HTMLDivElement[]>([]);
  const mobileStepBarRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const spacer = spacerRef.current;
    if (!spacer) return;

    const triggers: ScrollTrigger[] = [];
    const totalScroll = total * stepScroll;

    // ─── DESKTOP ANIMATION ───────────────────────────────────────────
    const fill = timelineFillRef.current;
    const dot = timelineDotRef.current;

    if (fill && dot) {
      for (let i = 0; i < total; i++) {
        const left = leftLayerRefs.current[i];
        const right = rightLayerRefs.current[i];
        if (!left || !right) continue;
        if (i === 0) {
          gsap.set([left, right], { opacity: 1, y: 0 });
        } else {
          gsap.set(left, { opacity: 0, y: '100%' });
          gsap.set(right, { opacity: 0, y: 0 });
        }
      }

      for (let i = 1; i < total; i++) {
        const prevLeft = leftLayerRefs.current[i - 1];
        const prevRight = rightLayerRefs.current[i - 1];
        const currLeft = leftLayerRefs.current[i];
        const currRight = rightLayerRefs.current[i];
        if (!prevLeft || !prevRight || !currLeft || !currRight) continue;

        triggers.push(
          ScrollTrigger.create({
            trigger: spacer,
            start: `top+=${i * stepScroll - stepScroll * 0.5} top`,
            end: `top+=${i * stepScroll} top`,
            scrub: 0.8,
            onUpdate(self) {
              const p = self.progress;
              gsap.set(prevLeft, { opacity: 1 - p, y: `${-40 * p}%` });
              gsap.set(currLeft, { opacity: p, y: `${100 * (1 - p)}%` });
              gsap.set(prevRight, { opacity: 1 - p });
              gsap.set(currRight, { opacity: p });
            },
          }),
        );
      }

      triggers.push(
        ScrollTrigger.create({
          trigger: spacer,
          start: 'top top',
          end: `top+=${totalScroll} top`,
          scrub: 1,
          onUpdate(self) {
            const v = self.progress * timelineMaxVisual;
            gsap.set(fill, { height: `calc((100% - 8px) * ${v})` });
            gsap.set(dot, { top: `calc((100% - 16px) * ${v})` });
          },
        }),
      );
    }

    // ─── MOBILE ANIMATION ────────────────────────────────────────────
    const setMobileStepBar = (progress: number) => {
      const activeIndex = Math.min(total - 1, Math.floor(progress * total));
      mobileStepBarRefs.current.forEach((el, i) => {
        if (!el) return;
        el.dataset.state = i < activeIndex ? 'done' : i === activeIndex ? 'active' : 'pending';
      });
    };

    if (mobileLayerRefs.current[0]) {
      for (let i = 0; i < total; i++) {
        const layer = mobileLayerRefs.current[i];
        if (!layer) continue;
        gsap.set(layer, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : '100%' });
      }

      setMobileStepBar(0);

      for (let i = 1; i < total; i++) {
        const prev = mobileLayerRefs.current[i - 1];
        const curr = mobileLayerRefs.current[i];
        if (!prev || !curr) continue;

        triggers.push(
          ScrollTrigger.create({
            trigger: spacer,
            start: `top+=${i * stepScroll - stepScroll * 0.5} top`,
            end: `top+=${i * stepScroll} top`,
            scrub: 0.8,
            onUpdate(self) {
              const p = self.progress;
              gsap.set(prev, { opacity: 1 - p, y: `${-30 * p}%` });
              gsap.set(curr, { opacity: p, y: `${100 * (1 - p)}%` });
            },
          }),
        );
      }

      triggers.push(
        ScrollTrigger.create({
          trigger: spacer,
          start: 'top top',
          end: `top+=${totalScroll} top`,
          scrub: 1,
          onUpdate(self) {
            setMobileStepBar(self.progress);
          },
        }),
      );
    }

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [total, stepScroll, timelineMaxVisual]);

  const header = (
    <>
      <div className="hiw-badge">
        <span className="hiw-badge__icon" aria-hidden>
          {badgeIcon ?? <span className="hiw-badge__dot" />}
        </span>
        <p className="hiw-badge__text">{badge}</p>
      </div>
      <SectionHeading
        text={heading}
        className="hiw-heading"
        highlightedWords={highlightedWords}
        highlightedClassName="hiw-heading__accent"
      />
    </>
  );

  return (
    <div
      ref={spacerRef}
      className={['hiw', className].filter(Boolean).join(' ')}
      style={
        {
          '--hiw-steps': total,
          '--hiw-step-scroll': `${stepScroll}px`,
          '--hiw-sticky-offset': `${stickyTopOffset}px`,
          '--hiw-mobile-top': `${mobileStickyTop}px`,
        } as CSSProperties
      }
    >
      {/* ── DESKTOP layout ── */}
      <div className="hiw-sticky">
        <div className="hiw-timeline-wrap" aria-hidden>
          <div ref={timelineFillRef} className="hiw-timeline-fill" />
          <div ref={timelineDotRef} className="hiw-timeline-dot" />
        </div>

        <div className="hiw-inner">
          <div className="hiw-header">
            {header}
            {description && <p className="hiw-lead">{description}</p>}
          </div>

          <div className="hiw-body">
            {/* LEFT: text layers */}
            <div className="hiw-col">
              {steps.map((step, i) => (
                <div
                  key={i}
                  ref={(el) => {
                    if (el) leftLayerRefs.current[i] = el;
                  }}
                  className="hiw-layer hiw-layer--text"
                >
                  <div className="hiw-step">
                    <div className="hiw-step__count">
                      <span className="hiw-step__number">{pad(i + 1)}</span>
                      <span>/</span>
                      <span>{pad(total)}</span>
                    </div>
                    <div>
                      <span className="hiw-tag">
                        <span className="hiw-tag__dot" />
                        {step.tag}
                      </span>
                      <h3 className="hiw-step__title">{step.title}</h3>
                      <p className="hiw-step__description">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CENTER: divider */}
            <div className="hiw-divider">
              <div className="hiw-divider__line" />
            </div>

            {/* RIGHT: image layers */}
            <div className="hiw-col">
              {steps.map((step, i) => (
                <div
                  key={i}
                  ref={(el) => {
                    if (el) rightLayerRefs.current[i] = el;
                  }}
                  className="hiw-layer hiw-layer--image"
                >
                  <div className="hiw-image">
                    <img src={step.image} alt={step.imageAlt ?? step.tag} />
                    <div className="hiw-image__overlay" />
                    <div className="hiw-image__tag">
                      <span className="hiw-image__tag-dot" />
                      <span className="hiw-image__tag-text">{step.tag}</span>
                    </div>
                    <div className="hiw-image__count">
                      {pad(i + 1)} / {pad(total)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── MOBILE layout ── */}
      <div className="hiw-mobile-sticky">
        <div className="hiw-mobile-inner">
          <div className="hiw-mobile-header">
            {header}
            {mobileDescription && <p className="hiw-mobile-lead">{mobileDescription}</p>}
          </div>

          <div className="hiw-mobile-body">
            <div className="hiw-mobile-card-col">
              {steps.map((step, i) => (
                <div
                  key={i}
                  ref={(el) => {
                    if (el) mobileLayerRefs.current[i] = el;
                  }}
                  className="hiw-mobile-layer"
                >
                  <img src={step.image} alt={step.imageAlt ?? step.tag} />
                  <div className="hiw-mobile-layer__overlay" />
                  <div className="hiw-image__count hiw-image__count--mobile">
                    {pad(i + 1)} / {pad(total)}
                  </div>
                  <div className="hiw-mobile-layer__text">
                    <h3 className="hiw-mobile-layer__title">{step.title}</h3>
                    <p className="hiw-mobile-layer__description">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="hiw-mobile-step-bar" aria-hidden>
              {steps.map((_, i) => (
                <div
                  key={i}
                  ref={(el) => {
                    if (el) mobileStepBarRefs.current[i] = el;
                  }}
                  className="hiw-mobile-step-seg"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
