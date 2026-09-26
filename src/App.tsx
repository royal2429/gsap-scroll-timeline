import { HowItWorks } from './how-it-works';
import { content } from './data/content';

export default function App() {
  return (
    <main>
      <section className="demo-intro">
        <h1>How It Works</h1>
        <p>A scroll-driven, pinned step-by-step section for React. Scroll down ↓</p>
      </section>

      <HowItWorks {...content} />

      <section className="demo-intro">
        <p>End of section.</p>
      </section>
    </main>
  );
}
