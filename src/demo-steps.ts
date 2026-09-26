import type { HowItWorksStep } from './how-it-works';

const img = (file: string) => `${import.meta.env.BASE_URL}images/${file}`;

/** Example content from Nomac Express Logistics — replace with your own steps. */
export const DEMO_STEPS: HowItWorksStep[] = [
  {
    title: 'Submit\nShipment Details',
    description:
      'Provide your pickup location, drop-off address, and package info. We use this to calculate your delivery fee instantly.',
    image: img('stepone.png'),
    tag: 'Booking',
  },
  {
    title: 'Agree on\nPayment Terms',
    description:
      'Decide who covers the delivery fee — the sender at pickup or the recipient at drop-off. We confirm the arrangement before dispatch.',
    image: img('steptwo.png'),
    tag: 'Payment',
  },
  {
    title: 'Driver\nDispatched',
    description: 'Once confirmed, we assign and send a driver to your pickup location promptly.',
    image: img('stepthree.png'),
    tag: 'Dispatch',
  },
  {
    title: 'Package\nPicked Up',
    description:
      'The driver collects your package at the pickup point. If payment is due at pickup, it is collected here before the driver proceeds.',
    image: img('stepfour.png'),
    tag: 'Pickup',
  },
  {
    title: 'Delivered\nto the Door',
    description:
      'Your package is dropped off at the destination. If payment was agreed at drop-off, the driver collects it from the recipient on arrival.',
    image: img('stepfive.jpg'),
    tag: 'Delivered',
  },
];
