export interface ProcessStep {
  number: number;
  title: string;
  description: string;
  details?: string[];
}

export interface DocumentItem {
  icon: string;
  title: string;
  description: string;
}

export const newVisaSteps: ProcessStep[] = [
  {
    number: 1,
    title: 'Documentation',
    description: 'Gather the sponsor and dependent documents. Foreign certificates must be attested before anything else can start.',
  },
  {
    number: 2,
    title: 'Family file opening',
    description: 'A one-time family file is opened in the immigration system under your sponsorship. Required before any dependent can be added.',
  },
  {
    number: 3,
    title: 'Entry permit',
    description: 'Application filed with GDRFA Dubai or ICP. Once approved, immigration issues an e-visa (electronic entry permit).',
    details: ['60-day deadline: the dependent must enter the UAE within 60 days of e-visa issuance, or the permit expires.'],
  },
  {
    number: 4,
    title: 'Arrival or change of status',
    description: 'Two paths, depending on where the dependent is when the e-visa is issued:',
    details: [
      'Outside the UAE: Dependent enters the UAE using the new e-visa.',
      'Already inside: Exit and re-enter, or apply for a change of status to switch without leaving.',
      '60 days to finish stamping from this point — steps 5, 6 and 7 must complete inside this window.',
    ],
  },
  {
    number: 5,
    title: 'Medical',
    description: 'Fitness test at an approved medical centre. Children under 18 are exempt.',
    details: ['18+ only', 'Medical application', 'Screening at an approved centre', 'Fitness report issued'],
  },
  {
    number: 6,
    title: 'Emirates ID',
    description: 'Emirates ID application plus biometrics where required.',
    details: ['Emirates ID application', 'Biometrics — one-time per person, skipped if given before', '15+ only'],
  },
  {
    number: 7,
    title: 'Visa stamping',
    description: 'Final immigration step — the residence visa is stamped electronically.',
  },
  {
    number: 8,
    title: 'Emirates ID delivery',
    description: 'The card is printed and delivered to your home by Emirates Post, usually within a few working days. Once you have it, the process is complete.',
  },
];

export const renewVisaSteps: ProcessStep[] = [
  {
    number: 1,
    title: 'Documentation',
    description: 'Collect the documents above. No new entry permit is needed since the dependent already has a residence file.',
  },
  {
    number: 2,
    title: 'Medical',
    description: 'A fresh medical fitness test is required at renewal, booked at the nearest approved centre.',
    details: ['18+ only', 'Medical application', 'Screening at an approved centre', 'New fitness report issued'],
  },
  {
    number: 3,
    title: 'Emirates ID renewal',
    description: 'Filed in parallel with the residence renewal to save time.',
    details: ['Emirates ID renewal application', 'Biometrics — only if not already on file', '15+ only'],
  },
  {
    number: 4,
    title: 'Visa stamping',
    description: 'Insurance arranged where required. Immigration reviews the file, and the new residence visa is stamped digitally.',
  },
  {
    number: 5,
    title: 'Emirates ID delivery',
    description: 'The renewed card is printed and delivered to your home by Emirates Post. The renewal is complete once you have it.',
  },
];

export const goldenVisaSteps: ProcessStep[] = [
  {
    number: 1,
    title: 'Typing center visit',
    description: 'Initial application submitted through an authorized typing center with all required documents.',
  },
  {
    number: 2,
    title: 'Medical fitness test',
    description: 'Medical screening at an approved health centre. Required for all applicants 18+.',
  },
  {
    number: 3,
    title: 'Emirates ID biometrics',
    description: 'Emirates ID application and biometrics appointment at an authorized centre.',
  },
  {
    number: 4,
    title: 'Entry permit / status change',
    description: 'If converting from another visa, a status change is processed. Otherwise, an entry permit is issued.',
  },
  {
    number: 5,
    title: 'Visa stamping',
    description: 'The 10-year Golden Visa is stamped on your passport electronically.',
  },
  {
    number: 6,
    title: 'Insurance',
    description: 'Health insurance is arranged as required by UAE law for all residents.',
  },
  {
    number: 7,
    title: 'Emirates ID delivery',
    description: 'Your Emirates ID card is printed and delivered. The Golden Visa process is now complete.',
  },
];

export const sponsorDocuments: DocumentItem[] = [
  { icon: 'file-text', title: 'Passport copy', description: 'Sponsor passport — validity not strictly checked' },
  { icon: 'credit-card', title: 'Emirates ID copy', description: 'Front and back, clear digital scan' },
  { icon: 'briefcase', title: 'Labour contract', description: 'Confirms your salary meets the threshold' },
];

export const dependentDocuments: DocumentItem[] = [
  { icon: 'file-text', title: 'Passport copy', description: 'Minimum 6 months validity' },
  { icon: 'camera', title: 'Recent photo', description: 'Passport-size, white background' },
  { icon: 'heart', title: 'Attested marriage certificate', description: 'For a spouse — attested by issuing country & UAE MOFA' },
  { icon: 'baby', title: 'Attested birth certificate', description: 'For each child — attested & translated if needed' },
];

export const renewDocuments: DocumentItem[] = [
  { icon: 'credit-card', title: 'Sponsor Emirates ID', description: 'Front and back, clear digital copy' },
  { icon: 'credit-card', title: 'Dependent Emirates ID', description: 'Or current residence visa copy' },
  { icon: 'file-text', title: 'Dependent passport copy', description: 'Minimum 6 months validity' },
  { icon: 'camera', title: 'Recent photo', description: 'Passport-size, white background' },
  { icon: 'heart', title: 'Attested relationship certificate', description: 'Marriage cert (spouse) or birth cert (children)' },
];
