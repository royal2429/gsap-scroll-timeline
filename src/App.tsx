import { Layers2 } from 'lucide-react';
import { HowItWorks } from './how-it-works';
import { DEMO_STEPS } from './demo-steps';

export default function App() {
  return (
    <main>
      <section className="demo-intro">
        <h1>How It Works</h1>
        <p>A scroll-driven, pinned step-by-step section for React. Scroll down ↓</p>
      </section>

      <HowItWorks
        steps={DEMO_STEPS}
        badgeIcon={<Layers2 />}
        description="Arrange a pickup and our team takes care of the entire process, from collecting your package to ensuring it arrives safely at its final destination."
        mobileDescription="Arrange a pickup and our team takes care of the entire process, from collecting your package to ensuring it arrives safely."
        stickyTopOffset={0}
        mobileStickyTop={0}
      />

      <section className="demo-intro">
        <p>End of section.</p>
      </section>
    </main>
  );
}
