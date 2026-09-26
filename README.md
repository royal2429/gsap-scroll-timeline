# How It Works — scroll section

A scroll-driven "how it works" section for React. The section pins to the viewport while the page scrolls through each step: the text slides up, the image cross-fades, and a timeline fills in. On mobile it switches to stacked image cards with a segmented progress bar.

Built with React and [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/).

## Run the demo

```bash
pnpm install
pnpm dev
```

## Make it yours

All the text, images and settings live in one object in **`src/data/content.tsx`**. Edit it and the section updates, with no need to touch the component. Put your images in `public/images/` and reference them as `images/<file>`.

## Use it in your project

1. Install the only runtime dependency:

   ```bash
   npm install gsap
   ```

2. Copy the `src/how-it-works/` folder into your project.

3. Render it with your own steps:

   ```tsx
   import { HowItWorks } from './how-it-works';

   const steps = [
     {
       title: 'Book a pickup',
       description: 'Tell us where to collect your package and where it is going.',
       image: '/images/step-1.jpg',
       tag: 'Booking',
     },
     // ...
   ];

   export default function Page() {
     return <HowItWorks steps={steps} description="Four steps from pickup to delivery." />;
   }
   ```

**Next.js (App Router):** add `'use client';` to the top of `HowItWorks.tsx` and `SectionHeading.tsx`.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `steps` | `HowItWorksStep[]` | — | `{ title, description, image, tag, imageAlt? }`. Use `\n` in `title` to break the line on mobile. |
| `badge` | `string` | `'Simple Process'` | Text in the pill above the heading. |
| `badgeIcon` | `ReactNode` | dot | Icon inside the pill (e.g. a `lucide-react` icon). |
| `heading` | `string` | `'How It Works'` | Section heading, revealed character by character. |
| `highlightedWords` | `string[]` | `['Works']` | Heading words shown in the accent color. |
| `description` | `string` | — | Paragraph under the heading. |
| `mobileDescription` | `string` | `description` | Shorter paragraph for mobile. |
| `stepScroll` | `number` | `600` | Pixels of scroll spent on each step. |
| `stickyTopOffset` | `number` | header height | How far (px) the desktop panel is pulled above the viewport while pinned. By default the header scrolls away and only the steps stay pinned. |
| `mobileStickyTop` | `number` | `80` | Where the mobile panel pins (e.g. your navbar height). |
| `timelineMaxVisual` | `number` | `0.7` | Fraction of the timeline rail the fill reaches at the end. |
| `className` | `string` | — | Extra class on the root element. |

## Theming

Override these custom properties on `.hiw` (or on a `className` you pass in):

```css
.hiw {
  --hiw-accent: #2563eb;
  --hiw-font: inherit;
  --hiw-heading-color: #0f172a;
  --hiw-muted-color: #64748b;
  --hiw-bg: linear-gradient(180deg, #eef6ff 0%, #e0efff 50%, #f0f7ff 100%);
}
```

## Credits

Originally built for [Nomac Express Logistics](https://nomacexpresslogistics.com). The demo content and images are theirs; replace them with your own.

## License

[MIT](./LICENSE)
