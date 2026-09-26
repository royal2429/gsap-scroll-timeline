import { Layers2 } from 'lucide-react';
import type { HowItWorksProps } from '../how-it-works';

/**
 * Everything the section shows. Edit this object to make it yours —
 * put your images in `public/images/` and reference them as `images/<file>`.
 */
export const content: HowItWorksProps = {
  badge: 'Simple Process',
  badgeIcon: <Layers2 />,
  heading: 'How It Works',
  highlightedWords: ['Works'],
  description:
    'Arrange a pickup and our team takes care of the entire process, from collecting your package to ensuring it arrives safely at its final destination.',
  mobileDescription:
    'Arrange a pickup and our team takes care of the entire process, from collecting your package to ensuring it arrives safely.',

  steps: [
    {
      tag: 'Booking',
      title: 'Submit\nShipment Details',
      description:
        'Provide your pickup location, drop-off address, and package info. We use this to calculate your delivery fee instantly.',
      image: 'images/stepone.png',
    },
    {
      tag: 'Payment',
      title: 'Agree on\nPayment Terms',
      description:
        'Decide who covers the delivery fee — the sender at pickup or the recipient at drop-off. We confirm the arrangement before dispatch.',
      image: 'images/steptwo.png',
    },
    {
      tag: 'Dispatch',
      title: 'Driver\nDispatched',
      description: 'Once confirmed, we assign and send a driver to your pickup location promptly.',
      image: 'images/stepthree.png',
    },
    {
      tag: 'Pickup',
      title: 'Package\nPicked Up',
      description:
        'The driver collects your package at the pickup point. If payment is due at pickup, it is collected here before the driver proceeds.',
      image: 'images/stepfour.png',
    },
    {
      tag: 'Delivered',
      title: 'Delivered\nto the Door',
      description:
        'Your package is dropped off at the destination. If payment was agreed at drop-off, the driver collects it from the recipient on arrival.',
      image: 'images/stepfive.jpg',
    },
  ],

  // Where the mobile panel pins — set to your navbar height if you have a fixed navbar.
  mobileStickyTop: 0,
};
