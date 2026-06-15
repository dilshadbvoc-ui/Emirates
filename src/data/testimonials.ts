export interface Testimonial {
  initials: string;
  name: string;
  timeAgo: string;
  rating: number;
  text: string;
}

export const testimonials: Testimonial[] = [
  {
    initials: 'AS',
    name: 'Ahmed S.',
    timeAgo: '2 weeks ago',
    rating: 5,
    text: 'Highly recommend. The team handled my parents\' visa from start to finish. The calculator helped me budget before starting — zero surprises.',
  },
  {
    initials: 'PV',
    name: 'Priya V.',
    timeAgo: '1 month ago',
    rating: 5,
    text: 'Did my wife\'s visa renewal entirely on WhatsApp — never visited any office. Medical and Emirates ID centres were booked closest to my apartment.',
  },
  {
    initials: 'MA',
    name: 'Mohammed A.',
    timeAgo: '3 weeks ago',
    rating: 5,
    text: 'Used the calculator first to compare quotes — EmiratesVisa.ae was the most honest about government fee vs service charge. Son\'s visa in 6 days.',
  },
];
