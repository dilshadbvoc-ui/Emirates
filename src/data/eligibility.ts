export interface EligibilityCard {
  icon: string;
  title: string;
  salary: string;
  description: string;
  link?: string;
  linkLabel?: string;
}

export const eligibilityCards: EligibilityCard[] = [
  {
    icon: 'heart',
    title: 'Spouse',
    salary: 'AED 4,000/mo +',
    description: 'Salary AED 4,000/month (or AED 3,000 + employer accommodation). Needs an attested marriage certificate.',
  },
  {
    icon: 'baby',
    title: 'Children',
    salary: 'AED 4,000/mo +',
    description: 'Sons up to 25, unmarried daughters (no age limit). Same salary threshold. Attested birth certificate required.',
  },
  {
    icon: 'users',
    title: 'Parents',
    salary: 'AED 10,000/mo +',
    description: 'Both sponsored together. Salary AED 10,000/month, 2-bedroom tenancy minimum, plus proof of dependency.',
  },
  {
    icon: 'briefcase',
    title: 'Maid',
    salary: 'AED 25,000/mo household',
    description: 'Household income AED 25,000/month. Separate visa type.',
    link: '/maid-visa',
    linkLabel: 'See maid visa',
  },
];

export interface GoldenEligibilityCard {
  icon: string;
  title: string;
  requirement: string;
  description: string;
}

export const goldenEligibilityCards: GoldenEligibilityCard[] = [
  {
    icon: 'building',
    title: 'Property Owner',
    requirement: 'AED 2M+',
    description: 'Own UAE property (single or combined) worth AED 2 million or more.',
  },
  {
    icon: 'briefcase',
    title: 'Company Owner',
    requirement: 'AED 2M',
    description: 'Shareholder in a UAE company with capital or a personal share worth AED 2 million or more.',
  },
  {
    icon: 'user',
    title: 'Manager / Executive',
    requirement: 'AED 30k salary',
    description: 'GM, director or skilled professional earning AED 30,000+ a month.',
  },
  {
    icon: 'landmark',
    title: 'Fixed Deposit',
    requirement: 'AED 2M deposit',
    description: 'Place a 2-year cash deposit of AED 2 million in a UAE-accredited bank.',
  },
  {
    icon: 'users',
    title: 'Family Dependent',
    requirement: 'via a holder',
    description: 'A Golden Visa holder can grant the same 10-year residency to family.',
  },
];
